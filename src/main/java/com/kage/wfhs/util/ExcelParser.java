/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.util;

import com.kage.wfhs.dto.DepartmentDto;
import com.kage.wfhs.dto.DivisionDto;
import com.kage.wfhs.dto.TeamDto;
import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.model.ActiveStatus;
import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.Department;
import com.kage.wfhs.model.Division;
import com.kage.wfhs.model.Position;
import com.kage.wfhs.model.Role;
import com.kage.wfhs.model.Team;
import com.kage.wfhs.model.User;
import com.kage.wfhs.repository.ApproveRoleRepository;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.repository.DivisionRepository;
import com.kage.wfhs.repository.PositionRepository;
import com.kage.wfhs.repository.RoleRepository;
import com.kage.wfhs.repository.TeamRepository;
import com.kage.wfhs.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.apache.poi.ss.usermodel.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class ExcelParser {

	@Autowired
	private final DivisionRepository divisionRepo;

	@Autowired
	private final DepartmentRepository departmentRepo;

	@Autowired
	private final TeamRepository teamRepo;

	@Autowired
	private final PositionRepository positionRepo;

	@Autowired
	private final RoleRepository roleRepo;
	
	@Autowired
	private final ApproveRoleRepository approveRoleRepo;
	
	@Autowired
	private final UserRepository userRepo;

	@Autowired
	private final ModelMapper modelMapper;
	
	@Autowired
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	private final EmailSenderService emailService;

	@Value("${spring.datasource.url}")
	private String dbUrl;

	@Value("${spring.datasource.username}")
	private String dbUsername;

	@Value("${spring.datasource.password}")
	private String dbPassword;

	public void parse(InputStream inputStream, String sheetName, Workbook workbook) throws IOException, SQLException {
		sheetName = "01";
		Sheet sheet = workbook.getSheet(sheetName);

		Row headerRow = null;
		for (Row row : sheet) {
			Iterator<Cell> cellIterator = row.cellIterator();
			List<String> columnNames = new ArrayList<>();
			while (cellIterator.hasNext()) {
				Cell cell = cellIterator.next();
				columnNames.add(cell.toString());
			}
			if (!columnNames.stream().allMatch(String::isEmpty)) {
				headerRow = row;
				break;
			}
		}

		Map<String, String> columnMap = new LinkedHashMap<>();
		if (headerRow != null) {
			Iterator<Cell> cellIterator = headerRow.cellIterator();
			while (cellIterator.hasNext()) {
				Cell cell = cellIterator.next();
				String columnName = cell.toString();
				String columnType = "VARCHAR(255)";
				columnMap.put(columnName, columnType);
			}
		}

		StringBuilder createTableQuery = new StringBuilder("CREATE TABLE IF NOT EXISTS ").append("`").append(sheetName)
				.append("`").append(" (");

		for (Map.Entry<String, String> entry : columnMap.entrySet()) {
			createTableQuery.append("`").append(entry.getKey()).append("`").append(" ").append(entry.getValue())
					.append(", ");
		}

		createTableQuery.setLength(createTableQuery.length() - 2);
		createTableQuery.append(");");


		String url = dbUrl;
		String username = dbUsername;
		String password = dbPassword;
		try (Connection connection = DriverManager.getConnection(url, username, password);
				Statement statement = connection.createStatement()) {
			statement.executeUpdate(createTableQuery.toString());
		}

		for (Row row : sheet) {
			if (row.getRowNum() == headerRow.getRowNum()) {
				continue;
			}

			// code for end loop
			boolean isEmptyRow = true;
			for (int i = 0; i < row.getLastCellNum(); i++) {
				Cell cell = row.getCell(i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
				if (cell != null && cell.getCellType() != CellType.BLANK) {
					isEmptyRow = false;
					break;
				}
			}

			if (isEmptyRow) {
				break;
			}

			StringBuilder insertRowQuery = new StringBuilder("INSERT INTO `").append(sheetName).append("` VALUES (");
			for (int i = 0; i < row.getLastCellNum(); i++) {
				Cell cell = row.getCell(i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
				if (cell == null) {
					continue;
				}
				String columnValue;
				switch (cell.getCellType()) {
				case STRING:
					columnValue = "'" + cell.getStringCellValue() + "'";
					break;

				case NUMERIC:
					if (DateUtil.isCellDateFormatted(cell)) {
						SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
						columnValue = "'" + dateFormat.format(cell.getDateCellValue()) + "'";
					} else {
						double numericValue = cell.getNumericCellValue();
						if (numericValue == (int) numericValue) {
							columnValue = String.valueOf((int) numericValue);
						} else {
							columnValue = String.valueOf(numericValue);
						}
					}
					break;
				case BOOLEAN:
					columnValue = String.valueOf(cell.getBooleanCellValue());
					break;
				case FORMULA:
					FormulaEvaluator evaluator = cell.getSheet().getWorkbook().getCreationHelper()
							.createFormulaEvaluator();
					CellValue cellValue = evaluator.evaluate(cell);
					if (cellValue.getCellType() == CellType.NUMERIC) {
						double numericValue = cellValue.getNumberValue();
						if (numericValue == (int) numericValue) {
							columnValue = String.valueOf((int) numericValue);
						} else {
							columnValue = String.valueOf(numericValue);
						}
						System.out.println("Numeric (Formula Result)");
					} else {
						columnValue = "''";
						System.out.println("Formula (Unsupported Result Type)");
					}
					break;
				default:
					columnValue = "";
					break;
				}
				String columnName = "";
				Cell headerCell = sheet.getRow(headerRow.getRowNum()).getCell(i);
				if (headerCell != null) {
					switch (headerCell.getCellType()) {
					case STRING:
						columnName = headerCell.getStringCellValue();
						break;
					case NUMERIC:
						columnName = String.valueOf(headerCell.getNumericCellValue());

						break;
					case BOOLEAN:
						columnName = String.valueOf(headerCell.getBooleanCellValue());
						break;
					case FORMULA:
						columnName = headerCell.getCellFormula();
						break;
					default:
						columnName = "";
						break;
					}
				}
				if (columnName.isEmpty()) {
					continue;
				}
				insertRowQuery.append(columnValue).append(", ");
			}
			insertRowQuery.setLength(insertRowQuery.length() - 2);
			insertRowQuery.append(");");
			try (Connection connection = DriverManager.getConnection(url, username, password);
					Statement statement = connection.createStatement()) {
				statement.executeUpdate(insertRowQuery.toString());
			}

		}
		insertDataIntoDivision("#SupportForDivision", workbook);
		insertDataIntoDepartment("#SupportForDepartment", workbook);
		insertDataIntoTeam("#SupportForTeam", workbook);
		insertDataIntoUser("01", workbook);
		workbook.close();
	}

//    private void insertDataIntoDepartment(String sheetName) throws SQLException {
//    		//Sheet sheet = workbook.getSheet(sheetName);
//        List<String> headers = getTableHeaders(sheetName);
//
//        int deptColumnIndex = headers.indexOf("Dept");
//
//        if (deptColumnIndex != -1) {
//            List<List<String>> rows = getTableRows(sheetName);
//            Set<String> uniqueDeptNames = new HashSet<>();
//
//            for (List<String> row : rows) {
//                String deptName = row.get(deptColumnIndex);
//
//                if (uniqueDeptNames.add(deptName)) {
//                    Department department = new Department();
//                    department.setName(deptName);
//                    departmentRepo.save(department);
//                }
//            }
//        }
//    }

	private void insertDataIntoDivision(String sheetName, Workbook workbook) throws SQLException {		
		Sheet sheet = workbook.getSheet(sheetName);
		Set<String> uniqueDivisionInfo = new HashSet<>();
		for (int i = 1; i <= sheet.getLastRowNum(); i++) {

			Row row = sheet.getRow(i);
			if (row != null) {
				Cell codeCell = row.getCell(0);
				Cell nameCell = row.getCell(1);
				if (codeCell != null && nameCell != null) {
					String code = codeCell.toString().trim();
					String name = nameCell.toString().trim();

					String divisionInfo = code + "_" + name;
					uniqueDivisionInfo.add(divisionInfo);
				}
			}
		}

		for (String divisionInfo : uniqueDivisionInfo) {
			String[] parts = divisionInfo.split("_");			
			if (parts.length == 2) {
				DivisionDto divisionDto = new DivisionDto();
				divisionDto.setCode(parts[0]);
				divisionDto.setName(parts[1]);				
				divisionRepo.save(modelMapper.map(divisionDto, Division.class));
			}
		}
	}

	private void insertDataIntoDepartment(String sheetName, Workbook workbook) throws SQLException {
		Sheet sheet = workbook.getSheet(sheetName);
		Set<String> uniqueDepartmentInfo = new HashSet<>();

		for (int i = 1; i <= sheet.getLastRowNum(); i++) {
			Row row = sheet.getRow(i);
			if (row != null) {
				Cell codeCell = row.getCell(0);
				Cell nameCell = row.getCell(1);
				Cell divisionCell = row.getCell(2);

				if (codeCell != null && nameCell != null && divisionCell != null) {
					String code = codeCell.toString().trim();
					String name = nameCell.toString().trim();
					String divisionName = divisionCell.toString().trim();

					String departmentInfo = code + "_" + name + "_" + divisionName;

					uniqueDepartmentInfo.add(departmentInfo);
				}
			}
		}

		for (String departmentInfo : uniqueDepartmentInfo) {
			String[] parts = departmentInfo.split("_");
			if (parts.length == 3) {
				DepartmentDto departmentDto = new DepartmentDto();
				departmentDto.setCode(parts[0]);
				departmentDto.setName(parts[1]);
				departmentDto.setDivisionName(parts[2]);
				Division division = divisionRepo.findByName(departmentDto.getDivisionName())
                		.orElseThrow(() -> new EntityNotFoundException("Division not found"));
				departmentDto.setDivision(division);
				departmentRepo.save(modelMapper.map(departmentDto, Department.class));
			}
		}
	}

	private void insertDataIntoTeam(String sheetName, Workbook workbook) throws SQLException {
		Sheet sheet = workbook.getSheet(sheetName);
		Set<String> uniqueTeamInfo = new HashSet<>();

		for (int i = 1; i <= sheet.getLastRowNum(); i++) {
			Row row = sheet.getRow(i);
			if (row != null) {
				Cell codeCell = row.getCell(0);
				Cell nameCell = row.getCell(1);
				Cell departmentCell = row.getCell(2);

				if (codeCell != null && nameCell != null && departmentCell != null) {
					String code = codeCell.toString().trim();
					String name = nameCell.toString().trim();
					String departmentName = departmentCell.toString().trim();

					String teamInfo = code + "_" + name + "_" + departmentName;

					uniqueTeamInfo.add(teamInfo);
				}
			}
		}

		for (String teamInfo : uniqueTeamInfo) {
			String[] parts = teamInfo.split("_");
			if (parts.length == 3) {
				TeamDto teamDto = new TeamDto();
				teamDto.setCode(parts[0]);
				teamDto.setName(parts[1]);
				teamDto.setDepartmentName(parts[2]);
				Department department = departmentRepo.findByName(teamDto.getDepartmentName())
                		.orElseThrow(() -> new EntityNotFoundException("Department not found"));
				teamDto.setDepartment(department);
				teamRepo.save(modelMapper.map(teamDto, Team.class));
			}
		}
	}

	private void insertDataIntoUser(String sheetName, Workbook workbook) throws SQLException {
		List<List<String>> rows = getTableRows(sheetName);
		Set<String> uniquePositionInfo = new HashSet<>();
		Set<String> uniqueRoleInfo = new HashSet<>();
		for (List<String> row : rows) {
			if (row.size() != 0) {
				String divisionCode = row.get(1);
				String departmentName = row.get(2);
				String teamName = row.get(3);
				String staffId = row.get(4);
				String name = row.get(5);
				String gender = row.get(6);
				String positionName = row.get(7);
				if (uniquePositionInfo.add(positionName)) {
					Position position = new Position();
					position.setName(positionName);
					positionRepo.save(position);
				}
				String roleName = row.get(8);
				if (uniqueRoleInfo.add(roleName)) {
					Role role = new Role();
					role.setName(roleName);
					roleRepo.save(role);
				}
				String maritalStatus = row.get(9);
				String parents = row.get(10);
				String children = row.get(11);
				String joinDate = row.get(12);
				String permanentDate = row.get(13);
				User user = new User();
				user.setDivision(divisionRepo.findByCode(divisionCode));
				Department department = departmentRepo.findByName(departmentName)
                		.orElseThrow(() -> new EntityNotFoundException("Department not found"));
				user.setDepartment(department);
				user.setTeam(teamRepo.findByName(teamName));
				user.setStaff_id(staffId);
				user.setName(name);
				user.setGender(gender);
				String profile = null;
				if ("M".equals(gender)) {
					profile = "default-male.png";
				} else if ("F".equals(gender)) {
					profile = "default-female.jfif";
				}
				user.setProfile(profile);
				user.setPosition(positionRepo.findByName(positionName));
				user.setRole(roleRepo.findByName(roleName));
				boolean isSingle = maritalStatus.equalsIgnoreCase("Signle");
				user.setMarital_status(isSingle);
				boolean hasParent = parents.equalsIgnoreCase("Yes");
				user.setParent(hasParent);
				boolean hasChildern = children.equalsIgnoreCase("Yes");
				user.setChildren(hasChildern);
				Date joinDateObj = null;
				Date permanentDateObj = null;
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				try {
					if (joinDate != null && !joinDate.isEmpty()) {
						joinDateObj = dateFormat.parse(joinDate);
					}
					if (permanentDate != null && !permanentDate.isEmpty()) {
						permanentDateObj = dateFormat.parse(permanentDate);
					}
				} catch (ParseException e) {
					e.printStackTrace();
				}
				user.setJoin_date(joinDateObj);
				user.setPermanent_date(permanentDateObj);
				user.setEnabled(true);
				user.setPhone_number(null);
				user.setPassword(passwordEncoder.encode("password123"));
				user.setActiveStatus(ActiveStatus.OFFLINE);
				ApproveRole approveRole = approveRoleRepo.findByName("APPLICANT");
				Set<ApproveRole> approveRoles = new HashSet<ApproveRole>();
				approveRoles.add(approveRole);
				if (approveRole != null) {
					user.setApproveRoles(approveRoles);
		        }
				userRepo.save(user);			
			}
		}

	}

	public List<String> getTableHeaders(String currentSheetName) throws SQLException {
		List<String> headers = new ArrayList<>();
		String url = dbUrl;
		String username = dbUsername;
		String password = dbPassword;

		try (Connection connection = DriverManager.getConnection(url, username, password);
				Statement statement = connection.createStatement()) {
			String selectQuery = "SELECT * FROM `" + currentSheetName + "` LIMIT 1";
			ResultSet resultSet = statement.executeQuery(selectQuery);

			ResultSetMetaData metaData = resultSet.getMetaData();
			int columnCount = metaData.getColumnCount();
			for (int i = 1; i <= columnCount; i++) {
				String columnName = metaData.getColumnName(i);
				headers.add(columnName);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return headers;
	}

	public List<List<String>> getTableRows(String currentSheetName) {
		List<List<String>> rows = new ArrayList<>();
		String url = dbUrl;
		String username = dbUsername;
		String password = dbPassword;

		try (Connection connection = DriverManager.getConnection(url, username, password);
				Statement statement = connection.createStatement()) {
			String selectQuery = "SELECT * FROM `" + currentSheetName + "`";
			ResultSet resultSet = statement.executeQuery(selectQuery);

			ResultSetMetaData metaData = resultSet.getMetaData();
			int columnCount = metaData.getColumnCount();
			while (resultSet.next()) {
				List<String> row = new ArrayList<>();
				for (int i = 1; i <= columnCount; i++) {
					String cellValue = resultSet.getString(i);
					row.add(cellValue);
				}
				rows.add(row);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return rows;
	}

	public void readAndSendEmail(InputStream inputStream, String sheetName, Workbook workbook) {
		Sheet sheet = workbook.getSheet(sheetName);
		Set<String> uniqueEmailAndOTPInfo = new HashSet<>();

		for (int i = 1; i <= sheet.getLastRowNum(); i++) {
			Row row = sheet.getRow(i);
			if (row != null) {
				Cell emailCell = row.getCell(3);
				Cell otpCell = row.getCell(4);

				if (emailCell != null && otpCell != null) {
					String email = emailCell.toString().trim();
					String otp = otpCell.toString().trim();

					String emailOTPInfo = email + "_" + otp;
					
					uniqueEmailAndOTPInfo.add(emailOTPInfo);
				}
			}
		}
		for (String teamInfo : uniqueEmailAndOTPInfo) {
			String[] parts = teamInfo.split("_");
			if (parts.length == 2) {
				String email = parts[0];
				String otp = parts[1];
				String emailBodyForOTPPart1 = Message.emailBodyForOTPPart1;
				String emailBodyForOTPPart2 = Message.emailBodyForOTPPart2;
				String emailSubjectForOtp = Message.emailSubjectForOtp;
				
				emailService.sendMail(email, emailSubjectForOtp, emailBodyForOTPPart1 + otp + "\n" + emailBodyForOTPPart2);
			}
		}
		
	}
}
