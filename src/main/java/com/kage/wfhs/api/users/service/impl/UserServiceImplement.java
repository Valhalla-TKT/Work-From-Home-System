/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.users.service.impl;

import java.util.*;
import java.util.stream.Collectors;

import com.kage.wfhs.api.departments.model.Department;
import com.kage.wfhs.api.departments.repository.DepartmentRepository;
import com.kage.wfhs.api.divisions.model.Division;
import com.kage.wfhs.api.divisions.repository.DivisionRepository;
import com.kage.wfhs.api.register_forms.model.RegisterForm;
import com.kage.wfhs.api.register_forms.repository.RegisterFormRepository;
import com.kage.wfhs.api.teams.model.Team;
import com.kage.wfhs.api.teams.repository.TeamRepository;
import com.kage.wfhs.api.user_approve_role_department.model.UserApproveRoleDepartment;
import com.kage.wfhs.api.user_approve_role_department.repository.UserApproveRoleDepartmentRepository;
import com.kage.wfhs.api.user_approve_role_division.model.UserApproveRoleDivision;
import com.kage.wfhs.api.user_approve_role_division.repository.UserApproveRoleDivisionRepository;
import com.kage.wfhs.api.user_approve_role_team.model.UserApproveRoleTeam;
import com.kage.wfhs.api.user_approve_role_team.repository.UserApproveRoleTeamRepository;
import com.kage.wfhs.api.users.model.User;
import com.kage.wfhs.api.users.repository.UserRepository;
import com.kage.wfhs.api.work_flow_orders.model.WorkFlowOrder;
import com.kage.wfhs.common.util.*;
import com.kage.wfhs.api.users.dto.UserCreationDto;
import com.kage.wfhs.api.session.dto.CurrentLoginUserDto;
import com.kage.wfhs.common.exception.EntityNotFoundException;
import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.approve_roles.repository.ApproveRoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kage.wfhs.api.users.dto.UserDto;
import com.kage.wfhs.api.users.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

	private final LogService logService;

	private final UserRepository userRepo;

	private final TeamRepository teamRepo;

    private final ApproveRoleRepository approveRoleRepo;

    private final DepartmentRepository departmentRepo;

    private final DivisionRepository divisionRepo;

	private final ModelMapper modelMapper;

	private final PasswordEncoder passwordEncoder;

	private final EmailSenderService emailSenderService;

	private final SpringTemplateEngine templateEngine;
	
	private final UserApproveRoleTeamRepository userApproveRoleTeamRepo;
	
	private final UserApproveRoleDepartmentRepository userApproveRoleDepartmentRepo;
	
	private final UserApproveRoleDivisionRepository userApproveRoleDivisionRepo;
	private final RegisterFormRepository registerFormRepository;

	@Override
    public void createUser(UserCreationDto userDto) {
		User user = new User();
		String staffId = userDto.getStaffId();
		user.setStaffId(staffId);
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPositionName(userDto.getPositionName());
		user.setPassword(passwordEncoder.encode("123@dirace"));
		String gender = staffId.startsWith("25") ? "male" : "female";
		user.setGender(gender);
		user.setProfile(determineProfile(gender));
		user.setEnabled(true);
		Team team = EntityUtil.getEntityById(teamRepo, userDto.getTeam());
		user.setTeam(team);
		Department department = EntityUtil.getEntityById(departmentRepo, userDto.getDepartment());
		user.setDepartment(department);
		Division division = EntityUtil.getEntityById(divisionRepo, userDto.getDivision());
		user.setDivision(division);
		Set<ApproveRole> approveRoles = new HashSet<>();
		ApproveRole approveRole = EntityUtil.getEntityById(approveRoleRepo, userDto.getRole());
		approveRoles.add(approveRole);
		user.setApproveRoles(approveRoles);
		EntityUtil.saveEntity(userRepo, user, "user");
    }

	private void validateUserDto(UserDto userDto) {
		if (userDto == null) {
			throw new IllegalArgumentException("UserDto cannot be null");
		}
	}

	private String determineProfile(String gender) {
		if ("male".equalsIgnoreCase(gender)) {
			return "default-male.png";
		} else if ("female".equalsIgnoreCase(gender)) {
			return "default-female.jpg";
		}
		return null;
	}

	private void setApprovalRoles(User user, Long approveRoleId) {
		if (approveRoleId > 0) {
			ApproveRole approveRole = EntityUtil.getEntityById(approveRoleRepo, approveRoleId);
            Set<ApproveRole> approveRoles = new HashSet<>();
            approveRoles.add(approveRole);
            user.setApproveRoles(approveRoles);
        }
	}

	@Transactional
	@Override
	public boolean updateUser(String staffId, UserDto userDto) {
		User user = userRepo.findByStaffId(staffId);
		if (user == null) {
			throw new EntityNotFoundException("User not found with staff ID: " + staffId);
		}

		updateUserDetails(user, userDto);

		return true;
	}

	private void updateUserDetails(User user, UserDto userDto) {
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPositionName(userDto.getPositionName());
		updateUserTeam(user, userDto);
		updateUserDepartment(user, userDto);
		updateUserDivision(user, userDto);

		EntityUtil.saveEntityWithoutReturn(userRepo, user, "user");
	}

	private void updateUserTeam(User user, UserDto userDto) {
		Team teamEntity = teamRepo.findByName(userDto.getTeamName())
				.orElseThrow(() -> new EntityNotFoundException("Team not found: " + userDto.getTeamName()));

		if (!teamEntity.equals(user.getTeam())) {
			user.setTeam(teamEntity);
		}
	}


	private void updateUserDepartment(User user, UserDto userDto) {
		Department departmentEntity = departmentRepo.findByName(userDto.getDepartmentName())
				.orElseThrow(() -> new EntityNotFoundException("Department not found: " + userDto.getDepartmentName()));
		if (!departmentEntity.equals(user.getDepartment())) {
			user.setDepartment(departmentEntity);
		}
	}

	private void updateUserDivision(User user, UserDto userDto) {
		Division divisionEntity = divisionRepo.findByName(userDto.getDivisionName())
				.orElseThrow(() -> new EntityNotFoundException("Division not found: " + userDto.getDivisionName()));
		if (!divisionEntity.equals(user.getDivision())) {
			user.setDivision(divisionEntity);
		}
	}

	@Override
	public UserDto getUserBystaffId(String staffId) {
		User user = userRepo.findByStaffId(staffId);

		List<ApproveRole> approveRoles = new ArrayList<>(user.getApproveRoles());
	    List<WorkFlowOrder> workFlowOrders = new ArrayList<>();
	    for (ApproveRole approveRole : approveRoles) {
			workFlowOrders.addAll(approveRole.getWorkFlowOrders());
	    }

		UserDto userDto = modelMapper.map(user, UserDto.class);
		userDto.setWorkFlowOrders(workFlowOrders);

		return userDto;
	}

	@Override
	public CurrentLoginUserDto getLoginUserBystaffId(String staffId) {
		User user = userRepo.findByStaffId(staffId);
		CurrentLoginUserDto userDto = modelMapper.map(user, CurrentLoginUserDto.class);
		Long userId = userDto.getId();
		if(userDto.getApproveRoles().stream().anyMatch(role -> role.getName().equals("DEPARTMENT_HEAD"))) {
			userDto.setTeams(teamRepo.findAllByDepartmentId(user.getDepartment().getId()));
		}
		if(userDto.getApproveRoles().stream().anyMatch(role -> role.getName().equals("DIVISION_HEAD"))) {
			userDto.setTeams(teamRepo.findAllByDivisionId(user.getDivision().getId()));
		}
		if(userDto.getDepartment() != null) {
			userDto.getDepartment().setTeams(teamRepo.findAllByDepartmentId(user.getDepartment().getId()));
		}
		List<UserApproveRoleTeam> userApproveRoleTeams = userApproveRoleTeamRepo.findByUserId(userId);
		List<UserApproveRoleDepartment> userApproveRoleDepartments = userApproveRoleDepartmentRepo.findByUserId(userId);
		List<UserApproveRoleDivision> userApproveRoleDivisions = userApproveRoleDivisionRepo.findByUserId(userId);

		String managedTeamName = Helper.getNames(userApproveRoleTeams, UserApproveRoleTeam::getTeam, Team::getName);
		String managedDepartmentName = Helper.getNames(userApproveRoleDepartments, UserApproveRoleDepartment::getDepartment, Department::getName);
		String managedDivisionName = Helper.getNames(userApproveRoleDivisions, UserApproveRoleDivision::getDivision, Division::getName);

		userDto.setManagedTeamName(managedTeamName);
		userDto.setManagedDepartmentName(managedDepartmentName);
		userDto.setManagedDivisionName(managedDivisionName);

		userDto.setRegisteredForThisMonth(checkRegistrationForCurrentMonth(userId));
        return userDto;
	}

	public boolean checkRegistrationForCurrentMonth(Long userId) {
		List<RegisterForm> registerForms = registerFormRepository.findByApplicantId(userId);

		Date[] monthRange = Helper.getStartAndEndOfCurrentMonth();
		Date startOfMonth = monthRange[0];
		Date endOfMonth = monthRange[1];

		Date today = new Date();

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(today);
		int todayDate = calendar.get(Calendar.DAY_OF_MONTH);

		if (todayDate >= 26) {
			return false;
		}
        return registerForms.stream()
				.anyMatch(form -> form.getSignedDate() != null &&
						form.getSignedDate().compareTo(startOfMonth) >= 0 &&
						form.getSignedDate().compareTo(endOfMonth) <= 0);
	}

	@Override
	public String createstaffId(String gender) {
		String lastId = getLastStaffId(gender);

		if (lastId == null || lastId.equals("")) {
			int firstId = 0;
			if ("male".equals(gender)) {
				lastId = String.format("25-%05d", firstId);
			} else if ("female".equals(gender)) {
				lastId = String.format("26-%05d", firstId);
			}
		}

		String[] stringData = lastId.split("-");
		String prefix, id = null;
		int dataId = 0;

		if (stringData.length >= 2) {
			prefix = stringData[0] + "-";
			dataId = Integer.parseInt(stringData[1]) + 1;
			id = String.format("%s%05d", prefix, dataId);
			return id;
		} else {
			return null;
		}
	}

	@Override
	public String getLastStaffId(String gender) {
		String lowerCaseGender = Helper.changeToSmallLetter(gender);
		return userRepo.findLastStaffIdByGender(lowerCaseGender);
	}

	public List<User> removeDefaultAdmin(List<User> users) {
		if(users == null)
			return null;
		User defaultAdmin = userRepo.findByStaffId("00-00001");
        users.remove(defaultAdmin);
        return users;
	}

	private void populateManagedEntities(UserDto userDto) {
		List<UserApproveRoleTeam> userApproveRoleTeams = userApproveRoleTeamRepo.findByUserId(userDto.getId());
		Helper.populateManagedEntity(userApproveRoleTeams, UserApproveRoleTeam::getTeam, userDto::setManagedTeams);

		List<UserApproveRoleDepartment> userApproveRoleDepartments = userApproveRoleDepartmentRepo.findByUserId(userDto.getId());
		Helper.populateManagedEntity(userApproveRoleDepartments, UserApproveRoleDepartment::getDepartment, userDto::setManagedDepartments);

		List<UserApproveRoleDivision> userApproveRoleDivisions = userApproveRoleDivisionRepo.findByUserId(userDto.getId());
		Helper.populateManagedEntity(userApproveRoleDivisions, UserApproveRoleDivision::getDivision, userDto::setManagedDivisions);
	}

	@Override
	public List<UserDto> getAllUser() {
		Sort sort = Sort.by(Sort.Direction.ASC, "createdAt");
		List<User> users = EntityUtil.getAllEntities(userRepo, sort, "user");
        List<User> retUserList = removeDefaultAdmin(users);
        List<UserDto> userDtos = DtoUtil.mapList(retUserList, UserDto.class, modelMapper);
		for(UserDto userDto : userDtos) {
			populateManagedEntities(userDto);
		}
		return userDtos;
	}

	@Override
	public boolean isDuplicated(UserDto userDto) {
		return userRepo.findByStaffId(userDto.getStaffId()) == null
				&& userRepo.findByEmail(userDto.getEmail()) == null;
	}

	@Override
	public List<UserDto> getAllTeamMember(Long id) {
		List<User> users = userRepo.findByTeamId(id);
		List<User> retUserList = removeDefaultAdmin(users);
        List<UserDto> userDtos = DtoUtil.mapList(retUserList, UserDto.class, modelMapper);
		for(UserDto userDto : userDtos) {
			populateManagedEntities(userDto);
		}
		return userDtos;		
	}

	@Override
	public List<UserDto> getAllDepartmentMember(Long id) {
		List<User> users = userRepo.findByTeamDepartmentId(id);
		List<User> retUserList = removeDefaultAdmin(users);
		List<UserDto> userDtos = DtoUtil.mapList(retUserList, UserDto.class, modelMapper);
		for(UserDto userDto : userDtos) {
			populateManagedEntities(userDto);
		}
		return userDtos;
	}

	@Override
	public List<UserDto> getAllDivisionMember(Long id) {
		List<User> users = userRepo.findByTeamDepartmentDivisionId(id);
		List<User> retUserList = removeDefaultAdmin(users);
		List<UserDto> userDtos = DtoUtil.mapList(retUserList, UserDto.class, modelMapper);
		for(UserDto userDto : userDtos) {
			populateManagedEntities(userDto);
		}
		return userDtos;
	}

	@Override
	public Set<ApproveRole> getApproveRoleByUserId(Long id) {

		return null;
	}

	@Override
	public Team getTeamIdByUserId(Long id) {
		return userRepo.findTeamByUserId(id);
	}

	// codes for live chat between Service Desk and User
//	@Override
//	public void setUserOnline(User user) {
//		user.setActiveStatus(ActiveStatus.ONLINE);
//		userRepo.save(user);
//	}
//
//	@Override
//	public void disconnect(User user) {
//		var storedUser = EntityUtil.getEntityById(userRepo, user.getId());
//        storedUser.setActiveStatus(ActiveStatus.OFFLINE);
//        userRepo.save(user);
//    }
//
//	@Override
//	public List<UserDto> findConnectedUsers() {
//		List<User> users = userRepo.findAllByActiveStatus(ActiveStatus.ONLINE);
//		List<UserDto> userList = new ArrayList<>();
//		for (User user : users) {
//			UserDto userDto = modelMapper.map(user, UserDto.class);
//			userList.add(userDto);
//		}
//		return userList;
//	}

	@Override
	public UserDto getUserById(Long id) {
		User user = EntityUtil.getEntityById(userRepo, id);
		return modelMapper.map(user, UserDto.class);
	}
	
//	@Override
//    public List<UserDto> getUpperRole(Long workFlowOrderId, Long userId) {
//        List<User> users = userRepo.findUpperRoleUser(workFlowOrderId);
//		User currentUser = EntityUtil.getEntityById(userRepo, userId);
//		ApproveRole currentUserRole = null;
//		if (currentUser.getApproveRoles() != null && !currentUser.getApproveRoles().isEmpty()) {
//			currentUserRole = currentUser.getApproveRoles().iterator().next();
//		}
//        List<UserDto> userList = new ArrayList<>();
//        for (User user : users) {
//			if(currentUserRole != null) {
//				if("APPLICANT".equalsIgnoreCase(currentUserRole.getName())) {
//					if(Objects.equals(user.getTeam().getId(), currentUser.getTeam().getId())) {
//						UserDto userDto = modelMapper.map(user, UserDto.class);
//						userList.add(userDto);
//					}
//				} else {
//					UserDto userDto = modelMapper.map(user, UserDto.class);
//					userList.add(userDto);
//				}
//			}
//        }
//        return userList;
//    }

	@Override
	public List<UserDto> getUpperRole(Long workFlowOrderId, Long userId) {
		List<User> users = userRepo.findUpperRoleUser(workFlowOrderId);
		User currentUser = EntityUtil.getEntityById(userRepo, userId);

		// Retrieve current user role
		ApproveRole currentUserRole = getCurrentUserRole(currentUser);

		// Create list of user DTOs
        return users.stream()
				.filter(user -> shouldAddUser(user, currentUser, currentUserRole))
				.map(user -> {
					UserDto userDto = modelMapper.map(user, UserDto.class);
					ApproveRole userRole = user.getApproveRoles().stream().findFirst().orElse(null);
					if (userRole != null) {
						userDto.setApproveRoleName(userRole.getName());
					}
					return userDto;
				})
				.collect(Collectors.toList());
	}

	// Helper method to retrieve the current user's role
	private ApproveRole getCurrentUserRole(User currentUser) {
		return currentUser.getApproveRoles() != null && !currentUser.getApproveRoles().isEmpty() ?
				currentUser.getApproveRoles().iterator().next() :
				null;
	}

	// Helper method to determine if a user should be added to the user list
	private boolean shouldAddUser(User user, User currentUser, ApproveRole currentUserRole) {
		if (currentUserRole == null) {
			return false;
		}

		if ("APPLICANT".equalsIgnoreCase(currentUserRole.getName())) {
			// Check if the user's team matches the current user's team
			return user.getTeam() != null && currentUser.getTeam() != null &&
					user.getTeam().getId().equals(currentUser.getTeam().getId());
		}

		if ("PROJECT_MANAGER".equalsIgnoreCase(currentUserRole.getName())) {
			// Check if the user's department matches the current user's department
			return user.getDepartment() != null && currentUser.getDepartment() != null &&
					user.getDepartment().getId().equals(currentUser.getDepartment().getId());
		}

		// Default case: include the user if no specific role-based filtering is required
		return true;
	}



	//TEAM

	// to delete
	@Override
    public List<Object[]> getUserRequestByTeamId(Long teamId) {
        return userRepo.getUserRequestByTeamId(teamId);
    }
	// to delete

	@Override
	public List<Object[]> getUserRequestByTeamIds(List<Long> teamIds) {
		return null;
	}

	@Override
	public List<Object[]> getUserRequestByManagedTeam(String managedTeamName) {
		String[] teamNames = managedTeamName.split("\\|\\s*");
		List<Long> teamIds = teamRepo.findIdsByNames(List.of(teamNames));

		Date[] monthRange = Helper.getStartAndEndOfCurrentMonth();
		Date startOfMonth = monthRange[0];
		Date endOfMonth = monthRange[1];

		return userRepo.getUserRequestByTeamIds(teamIds, startOfMonth, endOfMonth);
	}

	// to delete
	@Override
    public List<Object[]> getTotalStaffRequestByTeamId(String teamId) {
        return userRepo.getTotalStaffRequestByTeamId(teamId);
    }
	// to delete
	@Override
	public List<Object[]> getTotalStaffRequestByByManagedTeam(String managedTeamName) {
		String[] teamNames = managedTeamName.split("\\|\\s*");
		List<Long> teamIds = teamRepo.findIdsByNames(List.of(teamNames));
    System.out.println(teamIds.toString());
		return userRepo.getTotalStaffRequestByTeamIds(teamIds);
	}

	// to delete
	@Override
    public Object[] getTeamRegistrationInfo(Long teamId) {
        return userRepo.getTeamRegistrationInfo(teamId);
    }
	// to delete

	@Override
	public Object[] getTeamRegistrationInfoByManagedTeam(String managedTeamName) {
		String[] teamNames = managedTeamName.split("\\|\\s*");
		List<Long> teamIds = teamRepo.findIdsByNames(List.of(teamNames));
    System.out.println(teamIds.toString());
		return userRepo.getAggregatedTeamRegistrationInfo(teamIds);
	}

	//DEPARTMENT HEAD

	@Override
    public List<Object[]> getAllTeamRequestByDepartmentId(Long departmentId) {	    	
        return userRepo.getAllTeamRequestByDepartmentId(departmentId);
    }

	@Override
    public List<Object[]> getTotalTeamRequestByDepartmentId(String departmentId) {
        return userRepo.getTotalTeamRequestByDepartmentId(departmentId);
    }

	@Override
    public Object[] getDepartmentRegistrationInfo(Long departmentId) {
        return userRepo.getDepartmentRegistrationInfo(departmentId);
    }

	//DIVISION HEAD

	@Override
    public List<Object[]> getAllDepartmentRequestByDivisionId(Long divisionId) {
        return userRepo.getAllDepartmentRequestByDivisionId(divisionId);
    }

	@Override
    public List<Object[]> getTotalDepartmentRequestByDivisionId(String divisionId) {
        return userRepo.getTotalDepartmentRequestByDivisionId(divisionId);
    }

	@Override
    public Object[] getDivisionRegistrationInfo(Long divisionId) {
        return userRepo.getDivisionRegistrationInfo(divisionId);
    }

	//OTHERS
	@Override
    public List<Object[]> getAllUserRequests() {
        return userRepo.getAllUserRequests();
    }

	@Override
    public List<Object[]> getTotalStaffRequest() {
        return userRepo.getTotalStaffRequest();
    }

	@Override
	@Transactional
	public void createHR() {
		User user = userRepo.findByStaffId("00-00001");
		if(user == null) {
			UserDto userDto = new UserDto();
			userDto.setStaffId("00-00001");
			userDto.setName("Admin");
			userDto.setEmail("defaultAdmin@diracetechnology.com");
			userDto.setPassword(passwordEncoder.encode("123@dirace"));
			userDto.setEnabled(true);
			userDto.setGender("female");
			userDto.setProfile("default-female.jpg");
			User HR = modelMapper.map(userDto, User.class);
			ApproveRole approveRole = approveRoleRepo.findByName("HR");
			if (approveRole == null) {
				throw new EntityNotFoundException("HR role not found");
			}
			Set<ApproveRole> approveRoles = new HashSet<>();
			approveRoles.add(approveRole);
			HR.setApproveRoles(approveRoles);
			EntityUtil.saveEntity(userRepo, HR, "user");
		}
    }

	@Override
	public CurrentLoginUserDto changeFirstHRFirstLoginStatus() {
		User user = userRepo.findByStaffId("00-00001");
		user.setFirstTimeLogin(false);
		User savedUser = EntityUtil.saveEntity(userRepo, user, "user");
		return DtoUtil.map(savedUser, CurrentLoginUserDto.class, modelMapper);
	}

	@Override
	public List<UserDto> getAllUserByGender(String gender) {
		List<User> users = userRepo.findAllByGender(gender);
		List<User> retUserList = removeDefaultAdmin(users);
		List<UserDto> userDtos = DtoUtil.mapList(retUserList, UserDto.class, modelMapper);
		for(UserDto userDto : userDtos) {
			populateManagedEntities(userDto);
		}
		return userDtos;
	}

	@Override
	public List<UserDto> getAllUserByTeamIdAndGender(Long teamId, String gender) {
		List<User> users = userRepo.findAllByTeamIdAndGender(teamId, gender);
		List<User> retUserList = removeDefaultAdmin(users);
		List<UserDto> userDtos = DtoUtil.mapList(retUserList, UserDto.class, modelMapper);
		for(UserDto userDto : userDtos) {
			populateManagedEntities(userDto);
		}
		return userDtos;
	}

	@Override
	public List<UserDto> getAllUserByDepartmentIdAndGender(Long departmentId, String gender) {
		List<User> users = userRepo.findAllByDepartmentIdAndGender(departmentId, gender);
		List<User> retUserList = removeDefaultAdmin(users);
		List<UserDto> userDtos = DtoUtil.mapList(retUserList, UserDto.class, modelMapper);
		for(UserDto userDto : userDtos) {
			populateManagedEntities(userDto);
		}
		return userDtos;
	}

	@Override
	public List<UserDto> getAllUserByDivisionIdAndGender(Long divisionId, String gender) {
		List<User> users = userRepo.findAllByDivisionIdAndGender(divisionId, gender);
		List<User> retUserList = removeDefaultAdmin(users);
		List<UserDto> userDtos = DtoUtil.mapList(retUserList, UserDto.class, modelMapper);
		for(UserDto userDto : userDtos) {
			populateManagedEntities(userDto);
		}
		return userDtos;
	}

	@Override
	@Transactional
	public boolean updateApproveRole(long userId, List<Long> approveRoleIdList, List<Long> teamIds, List<Long> departmentIds, List<Long> divisionIds) {
		try {
			User user = EntityUtil.getEntityById(userRepo, userId);
			Long userIdToSearch = user.getId();
			String fromRole = rolesToString(user.getApproveRoles());
			Set<ApproveRole> approveRoles = new HashSet<>(approveRoleRepo.findAllById(approveRoleIdList));
			user.setApproveRoles(approveRoles);
			ApproveRole firstApproveRole = null;
			Long approveRoleId = null;
			if (!approveRoles.isEmpty()) {
			    firstApproveRole = approveRoles.iterator().next();
			    approveRoleId = firstApproveRole.getId();
			    if("APPLICANT".equals(firstApproveRole.getName())) {
			    	deleteApproveRoleEntities("Team", userIdToSearch);
			        deleteApproveRoleEntities("Department", userIdToSearch);
					deleteApproveRoleEntities("Division", userIdToSearch);
			    } else if("PROJECT_MANAGER".equals(firstApproveRole.getName())) {
			    	deleteApproveRoleEntities("Team", userIdToSearch);
					saveApproveRoleEntities("Team", teamIds, user, approveRoleId);
					deleteApproveRoleEntities("Department", userIdToSearch);
					deleteApproveRoleEntities("Division", userIdToSearch);
			    } else if ("DEPARTMENT_HEAD".equals(firstApproveRole.getName())) {
			        deleteApproveRoleEntities("Department", userIdToSearch);
			    	saveApproveRoleEntities("Department", departmentIds, user, approveRoleId);
			    	deleteApproveRoleEntities("Team", userIdToSearch);		       
			        deleteApproveRoleEntities("Division", userIdToSearch);
			    } else if ("DIVISION_HEAD".equals(firstApproveRole.getName())) {
			    	deleteApproveRoleEntities("Division", userIdToSearch);
			    	saveApproveRoleEntities("Division", divisionIds, user, approveRoleId);
			    	deleteApproveRoleEntities("Team", userIdToSearch);
			        deleteApproveRoleEntities("Department", userIdToSearch);
			    }
			}
			EntityUtil.saveEntity(userRepo, user, "user");
			String toRole = rolesToString(user.getApproveRoles());
			logService.logUserRoleSwitch(user.getStaffId(), user.getName(), fromRole, toRole, "default-admin");
			return true;
        } catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * Deletes the approve role entities (UserApproveRoleTeam, UserApproveRoleDepartment, UserApproveRoleDivision)
	 * associated with the given user ID based on the specified entity name.
	 *
	 * @param entityName the name of the entity type to delete ("Team", "Department", or "Division").
	 * @param userIdToSearch the ID of the user whose approve role entities are to be deleted.
	 * @throws IllegalArgumentException if the provided entity name does not match any of the expected values.
	 */
	private void deleteApproveRoleEntities(String entityName, Long userIdToSearch) {
		switch(entityName) {
			case "Team" : {
				List<UserApproveRoleTeam> existingUserApproveRoleTeam = userApproveRoleTeamRepo.findByUserId(userIdToSearch);
		    	
		    	if (existingUserApproveRoleTeam != null && !existingUserApproveRoleTeam.isEmpty()) {
		            userApproveRoleTeamRepo.deleteAll(existingUserApproveRoleTeam);
		        }
				break;
			}
			case "Department" : {
				List<UserApproveRoleDepartment> existingUserApproveRoleDepartment = userApproveRoleDepartmentRepo.findByUserId(userIdToSearch);
		        
		        if (existingUserApproveRoleDepartment != null && !existingUserApproveRoleDepartment.isEmpty()) {
		        	userApproveRoleDepartmentRepo.deleteAll(existingUserApproveRoleDepartment);
		        }
				break;
			}
			case "Division" : {
				List<UserApproveRoleDivision> existingUserApproveRoleDivision = userApproveRoleDivisionRepo.findByUserId(userIdToSearch);
		        
		        if (existingUserApproveRoleDivision != null && !existingUserApproveRoleDivision.isEmpty()) {
		        	userApproveRoleDivisionRepo.deleteAll(existingUserApproveRoleDivision);
		        }
				break;
			}
			default:
	            throw new IllegalArgumentException("Invalid entity name: " + entityName);
		}
	}
	
	/**
	 * Saves the approve role entities (UserApproveRoleTeam, UserApproveRoleDepartment, UserApproveRoleDivision)
	 * for the specified user based on the given entity name and entity ID list.
	 *
	 * @param entityName the name of the entity type to save ("Team", "Department", or "Division").
	 * @param entityIdList a list of entity IDs that correspond to the teams, departments, or divisions to be saved.
	 * @param user the user for whom the approve role entities are to be saved.
	 * @param approveRoleId the ID of the approve role associated with the entities.
	 * @throws IllegalArgumentException if the provided entity name does not match any of the expected values.
	 */
	private void saveApproveRoleEntities(String entityName, List<Long> entityIdList, User user, Long approveRoleId) {
		switch(entityName) {
			case "Team" : {
				for(Long teamId : entityIdList) {
					UserApproveRoleTeam userApproveRoleTeam = new UserApproveRoleTeam();
					userApproveRoleTeam.setTeam(EntityUtil.getEntityById(teamRepo, teamId));
					userApproveRoleTeam.setUser(user);
					userApproveRoleTeam.setApproveRole(EntityUtil.getEntityById(approveRoleRepo, approveRoleId));
					EntityUtil.saveEntity(userApproveRoleTeamRepo, userApproveRoleTeam, "UserApproveRoleTeam");
				}
				break;
			}
			case "Department" : {
				for(Long departmentId : entityIdList) {
					UserApproveRoleDepartment userApproveRoleDepartment = new UserApproveRoleDepartment();
					userApproveRoleDepartment.setDepartment(EntityUtil.getEntityById(departmentRepo, departmentId));
					userApproveRoleDepartment.setUser(user);
					userApproveRoleDepartment.setApproveRole(EntityUtil.getEntityById(approveRoleRepo, approveRoleId));
					EntityUtil.saveEntity(userApproveRoleDepartmentRepo, userApproveRoleDepartment, "UserApproveRoleDepartment");
				}
				break;
			}
			case "Division" : {
				for(Long divisionId : entityIdList) {
					UserApproveRoleDivision userApproveRoleDivision = new UserApproveRoleDivision();
					userApproveRoleDivision.setDivision(EntityUtil.getEntityById(divisionRepo, divisionId));
					userApproveRoleDivision.setUser(user);
					userApproveRoleDivision.setApproveRole(EntityUtil.getEntityById(approveRoleRepo, approveRoleId));
					EntityUtil.saveEntity(userApproveRoleDivisionRepo, userApproveRoleDivision, "UserApproveRoleDivision");
				}
				break;
			}
			default:
	            throw new IllegalArgumentException("Invalid entity name: " + entityName);
		}
	}

	private String rolesToString(Set<ApproveRole> roles) {
		return roles.stream()
				.map(ApproveRole::getName)
				.sorted()
				.collect(Collectors.joining(", "));
	}


	@Override
	public List<UserDto> getAllApprover() {
		List<User> user = userRepo.findUsersByRoleNotEqual("APPLICANT");
		return DtoUtil.mapList(user, UserDto.class, modelMapper);
	}

	@Override
	public UserDto changePosition(Long userId, String position) {
		User user = EntityUtil.getEntityById(userRepo, userId);
		user.setPositionName(position);
		User savedUser = EntityUtil.saveEntity(userRepo, user, "user");
		return DtoUtil.map(savedUser, UserDto.class, modelMapper);
	}

	public boolean sendMailToAll(String subject, String body) {
		Sort sort = Sort.by(Sort.Direction.ASC, "staffId");
		List<User> users = EntityUtil.getAllEntities(userRepo, sort, "user");
		if (users == null)
			return false;
		User defaultUser = userRepo.findByStaffId("00-00001");
		users.remove(defaultUser);

		Context context = new Context();
		context.setVariable("body", body);

		String processedBody = templateEngine.process("email-template", context);

		for (User user : users) {
			emailSenderService.sendEmail(user.getEmail(), subject, processedBody);
		}
		return true;
	}

	@Override
	public List<UserDto> getApproversByApproveRoleId(Long approveRoleId) {
		List<User> users = userRepo.findUsersByRoleId(approveRoleId);
		return DtoUtil.mapList(users, UserDto.class, modelMapper);
	}

	@Override
	public boolean deleteUserById(Long userId) {
		return false;
	}

	@Override
	public void resetPassword(String userId) {
		User user = userRepo.findByStaffId(userId);
		if(user == null) {
			throw new EntityNotFoundException("User with staff ID " + userId + " not found");
		}
		user.setResetFlag(true);
		user.setPassword(passwordEncoder.encode("123@dirace")); // Alternatively, we can change this default password to a random password using an email service.
		// If you want to make changes, uncomment the following line.
		/*
		String secureRandomPassword = Helper.generateSecureRandomPassword(8);
		user.setPassword(passwordEncoder.encode(secureRandomPassword));
		String emailBody = "<p style='color:black; font-size: 16px;'>Dear " + user.getName() + ",<br/></p>" +
				"<p style='color:black; font-size: 16px;'><span style='color:black; font-size: 16px;'>Please try using the following password to log in to the Work From Home System.</span>" + "<br/>" + "<strong>" + secureRandomPassword + "</strong>" + "</p>" +
				"<p style='color:black; font-size: 16px;'>Best Regards,<br>DAT WFHS Team</p>";
		emailSenderService.sendEmail(
				user.getEmail(),
				"Your Password Has Been Reset: Action Required",
				emailBody
		);
		*/
		EntityUtil.saveEntity(userRepo, user, "user");
	}

	@Override
	public boolean isStaffIdExist(String staffId) {
		return userRepo.existsByStaffId(staffId);
	}

	@Override
	public boolean isNameExist(String name) {
		return userRepo.existsByName(name);
	}

	@Override
	public boolean isEmailExist(String email) {
		return userRepo.existsByEmail(email);
	}
}
