package com.kage.wfhs.serviceImplement;

import java.io.InputStream;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.kage.wfhs.util.EmailSenderService;
import com.kage.wfhs.util.Message;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kage.wfhs.repository.*;
import com.kage.wfhs.service.ExcelService;
import com.kage.wfhs.util.EntityUtil;
import com.kage.wfhs.model.*;

@Service
@RequiredArgsConstructor
public class ExcelServiceImplement implements ExcelService {

	@Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    private final DivisionRepository divisionRepository;
    private final DepartmentRepository departmentRepository;
    private final TeamRepository teamRepository;
    private final ApproveRoleRepository approveRoleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService emailService;
    
    @Override
    public boolean readExcelAndInsertIntoDatabase(InputStream inputStream, String sheetName, Workbook workbook) throws SQLException, ParseException {
        Sheet sheet = workbook.getSheet(sheetName);
        if (sheet != null) {
            createTableFromSheet(sheet);
            insertDataIntoTable(sheet);
        }
        
        return insertDataIntoUser(sheetName, workbook);
    }

    private void createTableFromSheet(Sheet sheet) throws SQLException {
        Row headerRow = sheet.getRow(3);
        List<String> columnNames = new ArrayList<>();
        for (Cell cell : headerRow) {
            if (cell.getCellType() == CellType.STRING) {
                String columnName = cell.getStringCellValue().replaceAll("[^a-zA-Z0-9]", "");
                columnNames.add(columnName);
            } else if (cell.getCellType() == CellType.NUMERIC) {
                columnNames.add("COLUMN_" + cell.getColumnIndex());
            }
        }

        String tableName = "clone";
        StringBuilder createTableQuery = new StringBuilder("CREATE TABLE IF NOT EXISTS ")
                .append(tableName)
                .append(" (");
        for (String columnName : columnNames) {
            createTableQuery.append("`").append(columnName).append("` VARCHAR(255), ");
        }
        createTableQuery.setLength(createTableQuery.length() - 2);
        createTableQuery.append(")");

        try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
             Statement statement = connection.createStatement()) {
        	System.out.println(createTableQuery.toString());
            statement.executeUpdate(createTableQuery.toString());
        }
    }

    public void insertDataIntoTable(Sheet sheet) throws SQLException {
        String tableName = "clone";
        try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
             Statement statement = connection.createStatement()) {

            Row headerRow = sheet.getRow(3);
            if (headerRow == null) {
                throw new IllegalArgumentException("Header row is missing in the sheet.");
            }

            Map<String, String> columnMap = new LinkedHashMap<>();
            for (Cell cell : headerRow) {
                String columnName = cell.toString();
                String columnType = "VARCHAR(255)";
                columnMap.put(columnName, columnType);
            }

            for (Row row : sheet) {
                if (row.getRowNum() <= 3) {
                    continue;
                }

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

                StringBuilder insertQuery = new StringBuilder("INSERT INTO ").append(tableName).append(" VALUES (");
                for (int i = 0; i < row.getLastCellNum(); i++) {
                    Cell cell = row.getCell(i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
                    String columnValue;
                    switch (cell.getCellType()) {
                        case STRING:
                            columnValue = "'" + cell.getStringCellValue().replace("'", "''") + "'";
                            break;
                        case NUMERIC:
                            if (DateUtil.isCellDateFormatted(cell)) {
                                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                                columnValue = "'" + dateFormat.format(cell.getDateCellValue()) + "'";
                            } else {
                                double numericValue = cell.getNumericCellValue();
                                columnValue = numericValue == (int) numericValue ? String.valueOf((int) numericValue) : String.valueOf(numericValue);
                            }
                            break;
                        case BOOLEAN:
                            columnValue = String.valueOf(cell.getBooleanCellValue());
                            break;
                        case FORMULA:
                            FormulaEvaluator evaluator = cell.getSheet().getWorkbook().getCreationHelper().createFormulaEvaluator();
                            CellValue cellValue = evaluator.evaluate(cell);
                            switch (cellValue.getCellType()) {
                                case NUMERIC:
                                    double numericValue = cellValue.getNumberValue();
                                    columnValue = numericValue == (int) numericValue ? String.valueOf((int) numericValue) : String.valueOf(numericValue);
                                    break;
                                case STRING:
                                    columnValue = "'" + cellValue.getStringValue() + "'";
                                    break;
                                case BOOLEAN:
                                    columnValue = String.valueOf(cellValue.getBooleanValue());
                                    break;
                                default:
                                    columnValue = "''";
                                    break;
                            }
                            break;
                        default:
                            
                            continue;
                    }
                    insertQuery.append(columnValue).append(", ");
                }

                insertQuery.setLength(insertQuery.length() - 2);
                insertQuery.append(")");

                System.out.println(insertQuery.toString());

                statement.executeUpdate(insertQuery.toString());
            }
        }
    }


    public List<List<String>> getTableRows(String currentSheetName) {
        List<List<String>> rows = new ArrayList<>();
        String url = dbUrl;
        String username = dbUsername;
        String password = dbPassword;
        String tableName = "clone";

        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement()) {
            String selectQuery = "SELECT * FROM `" + tableName + "`";
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
    private List<Integer> getColumnIndicesContainingKeyword(Map<String, Integer> columnIndices, String keyword) {
        List<Integer> indices = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : columnIndices.entrySet()) {
            if (entry.getKey().toLowerCase().contains(keyword.toLowerCase())) {
                indices.add(entry.getValue() - 1);
            }
        }
        return indices;
    }
    public Map<String, Integer> getColumnIndices(String currentSheetName) throws SQLException {
        Map<String, Integer> columnIndices = new HashMap<>();
        String url = dbUrl;
        String username = dbUsername;
        String password = dbPassword;
        String tableName = "clone";

        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement()) {
            String selectQuery = "SELECT * FROM `" + tableName + "` LIMIT 1";
            ResultSet resultSet = statement.executeQuery(selectQuery);

            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();
            for (int i = 1; i <= columnCount; i++) {
                String columnName = metaData.getColumnName(i);
                columnIndices.put(columnName, i);
            }
        } catch (SQLException ignored) {

        }

        return columnIndices;
    }

    private boolean insertDataIntoUser(String sheetName, Workbook workbook) throws SQLException, ParseException {
    	try {
    		Map<String, Integer> columnIndices = getColumnIndices(sheetName);
            List<List<String>> rows = getTableRows(sheetName);        

            List<Integer> divisionIndices = getColumnIndicesContainingKeyword(columnIndices, "Div");
            List<Integer> departmentIndices = getColumnIndicesContainingKeyword(columnIndices, "Dept");
            List<Integer> teamIndices = getColumnIndicesContainingKeyword(columnIndices, "Team");
            List<Integer> staffIDIndices = getColumnIndicesContainingKeyword(columnIndices, "Staff");
            List<Integer> nameIndices = getColumnIndicesContainingKeyword(columnIndices, "Name");
            List<Integer> genderIndices = getColumnIndicesContainingKeyword(columnIndices, "Gender");           
            List<Integer> emailIndices = getColumnIndicesContainingKeyword(columnIndices, "Email");

            for (List<String> row : rows) {
                if (!row.isEmpty()) {

                    User user = new User();

                    for (Integer divisionIndex : divisionIndices) {
                        String divisionName = row.get(divisionIndex);
                        Division division = divisionRepository.findByName(divisionName)
                                .orElseGet(() -> {
                                    Division newDivision = new Division();
                                    newDivision.setName(divisionName);
                                    divisionRepository.save(newDivision);
                                    return newDivision;
                                });
                        user.setDivision(division);
                    }

                    for (Integer departmentIndex : departmentIndices) {
                        String departmentName = row.get(departmentIndex);
                        Department department = departmentRepository.findByName(departmentName)
                                .orElseGet(() -> {
                                    Department newDepartment = new Department();
                                    newDepartment.setName(departmentName);
                                    for (Integer divisionIndex : divisionIndices) {
                                        String divisionName = row.get(divisionIndex);
                                        Division division = divisionRepository.findByName(divisionName)
                                                .orElseThrow(() -> new EntityNotFoundException("Division not found"));
                                        newDepartment.setDivision(division);
                                    }
                                    departmentRepository.save(newDepartment);
                                    return newDepartment;
                                });
                        user.setDepartment(department);
                    }

                    for (Integer teamIndex : teamIndices) {
                        String teamName = row.get(teamIndex);
                        Team team = teamRepository.findByName(teamName)
                                .orElseGet(() -> {
                                    Team newTeam = new Team();
                                    newTeam.setName(teamName);
                                    for (Integer departmentIndex : departmentIndices) {
                                        String departmentName = row.get(departmentIndex);
                                        Department department = departmentRepository.findByName(departmentName)
                                                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
                                        newTeam.setDepartment(department);
                                    }
                                    teamRepository.save(newTeam);
                                    return newTeam;
                                });
                        user.setTeam(team);
                    }

                    for (Integer staffIDIndex : staffIDIndices) {
                        user.setStaffId(row.get(staffIDIndex));
                    }

                    for (Integer nameIndex : nameIndices) {
                        user.setName(row.get(nameIndex));
                    }
                    
                    for (Integer genderIndex : genderIndices) {
                        user.setGender(row.get(genderIndex));
                    }
                    
                    for (Integer emailIndex : emailIndices) {
                        user.setEmail(row.get(emailIndex));
                    }
                    
                    String profile = null;
    				if ("M".equals(user.getGender())) {
    					profile = "default-male.png";
    				} else if ("F".equals(user.getGender())) {
    					profile = "default-female.jfif";
    				}
    				user.setProfile(profile);
    								                
                    user.setPassword(passwordEncoder.encode("123@dirace"));
                    user.setActiveStatus(ActiveStatus.OFFLINE);
                    user.setEnabled(true);
                    ApproveRole approveRole = approveRoleRepository.findByName("APPLICANT");
    				Set<ApproveRole> approveRoles = new HashSet<ApproveRole>();
    				approveRoles.add(approveRole);
    				if (approveRole != null) {
    					user.setApproveRoles(approveRoles);
    		        }
    				EntityUtil.saveEntity(userRepository, user, "user");                                        
                }
            }
            return true;
    	} catch (Exception e) {
            return false;
        }        
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
