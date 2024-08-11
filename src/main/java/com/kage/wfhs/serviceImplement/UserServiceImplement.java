/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.util.*;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.exception.EntityCreationException;
//import com.kage.wfhs.model.ActiveStatus;
import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.Department;
import com.kage.wfhs.model.Division;
import com.kage.wfhs.model.Team;
import com.kage.wfhs.model.User;
import com.kage.wfhs.model.UserApproveRoleDepartment;
import com.kage.wfhs.model.UserApproveRoleDivision;
import com.kage.wfhs.model.UserApproveRoleTeam;
import com.kage.wfhs.model.WorkFlowOrder;
import com.kage.wfhs.repository.ApproveRoleRepository;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.repository.DivisionRepository;
import com.kage.wfhs.repository.TeamRepository;
import com.kage.wfhs.repository.UserApproveRoleDepartmentRepository;
import com.kage.wfhs.repository.UserApproveRoleDivisionRepository;
import com.kage.wfhs.repository.UserApproveRoleTeamRepository;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.service.UserService;

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

	@Override
    public UserDto createUser(UserDto userDto) {
		return null;
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
			return "default-female.jfif";
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

	@Override
	public void updateUser(Long id, UserDto userDto) {
		// need to implement
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
		if(userDto.getApproveRoles().stream().anyMatch(role -> role.getName().equals("DEPARTMENT_HEAD"))) {
			userDto.setTeams(teamRepo.findAllByDepartmentId(user.getDepartment().getId()));
		}
		if(userDto.getApproveRoles().stream().anyMatch(role -> role.getName().equals("DIVISION_HEAD"))) {
			userDto.setTeams(teamRepo.findAllByDivisionId(user.getDivision().getId()));
		}
		if(userDto.getDepartment() != null) {
			userDto.getDepartment().setTeams(teamRepo.findAllByDepartmentId(user.getDepartment().getId()));
		}
		List<UserApproveRoleTeam> userApproveRoleTeams = userApproveRoleTeamRepo.findByUserId(userDto.getId());
		List<UserApproveRoleDepartment> userApproveRoleDepartments = userApproveRoleDepartmentRepo.findByUserId(userDto.getId());
		List<UserApproveRoleDivision> userApproveRoleDivisions = userApproveRoleDivisionRepo.findByUserId(userDto.getId());

		String managedTeamName = Helper.getNames(userApproveRoleTeams, UserApproveRoleTeam::getTeam, Team::getName);
		String managedDepartmentName = Helper.getNames(userApproveRoleDepartments, UserApproveRoleDepartment::getDepartment, Department::getName);
		String managedDivisionName = Helper.getNames(userApproveRoleDivisions, UserApproveRoleDivision::getDivision, Division::getName);

		userDto.setManagedTeamName(managedTeamName);
		userDto.setManagedDepartmentName(managedDepartmentName);
		userDto.setManagedDivisionName(managedDivisionName);
        return userDto;
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

	@Override
    public List<Object[]> getUserRequestByTeamId(Long teamId) {
        return userRepo.getUserRequestByTeamId(teamId);
    }

	@Override
    public List<Object[]> getTotalStaffRequestByTeamId(String teamId) {
        return userRepo.getTotalStaffRequestByTeamId(teamId);
    }

	@Override
    public Object[] getTeamRegistrationInfo(Long teamId) {
        return userRepo.getTeamRegistrationInfo(teamId);
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
			String fromRole = rolesToString(user.getApproveRoles());
			Set<ApproveRole> approveRoles = new HashSet<>(approveRoleRepo.findAllById(approveRoleIdList));
			user.setApproveRoles(approveRoles);
			ApproveRole firstApproveRole = null;
			Long approveRoleId = null;
			if (!approveRoles.isEmpty()) {
			    firstApproveRole = approveRoles.iterator().next();
			    approveRoleId = firstApproveRole.getId();
			    
			    if("PROJECT_MANAGER".equals(firstApproveRole.getName())) {
			    	List<UserApproveRoleTeam> existingUserApproveRoleTeam = userApproveRoleTeamRepo.findByUserId(user.getId());
			        
			        if (existingUserApproveRoleTeam != null && !existingUserApproveRoleTeam.isEmpty()) {
			            userApproveRoleTeamRepo.deleteAll(existingUserApproveRoleTeam);
			        }
					for(Long teamId : teamIds) {
						UserApproveRoleTeam userApproveRoleTeam = new UserApproveRoleTeam();
						userApproveRoleTeam.setTeam(EntityUtil.getEntityById(teamRepo, teamId));
						userApproveRoleTeam.setUser(user);
						userApproveRoleTeam.setApproveRole(EntityUtil.getEntityById(approveRoleRepo, approveRoleId));
						EntityUtil.saveEntity(userApproveRoleTeamRepo, userApproveRoleTeam, "UserApproveRoleTeam");
					}
			    } else if ("DEPARTMENT_HEAD".equals(firstApproveRole.getName())) {
			    	List<UserApproveRoleDepartment> existingUserApproveRoleDepartment = userApproveRoleDepartmentRepo.findByUserId(user.getId());
			        
			        if (existingUserApproveRoleDepartment != null && !existingUserApproveRoleDepartment.isEmpty()) {
			        	userApproveRoleDepartmentRepo.deleteAll(existingUserApproveRoleDepartment);
			        }
			    	for(Long departmentId : departmentIds) {
						UserApproveRoleDepartment userApproveRoleDepartment = new UserApproveRoleDepartment();
						userApproveRoleDepartment.setDepartment(EntityUtil.getEntityById(departmentRepo, departmentId));
						userApproveRoleDepartment.setUser(user);
						userApproveRoleDepartment.setApproveRole(EntityUtil.getEntityById(approveRoleRepo, approveRoleId));
						EntityUtil.saveEntity(userApproveRoleDepartmentRepo, userApproveRoleDepartment, "UserApproveRoleDepartment");
					}
			    } else if ("DIVISION_HEAD".equals(firstApproveRole.getName())) {
			    	List<UserApproveRoleDivision> existingUserApproveRoleDivision = userApproveRoleDivisionRepo.findByUserId(user.getId());
			        
			        if (existingUserApproveRoleDivision != null && !existingUserApproveRoleDivision.isEmpty()) {
			        	userApproveRoleDivisionRepo.deleteAll(existingUserApproveRoleDivision);
			        }
			    	for(Long divisionId : divisionIds) {
						UserApproveRoleDivision userApproveRoleDivision = new UserApproveRoleDivision();
						userApproveRoleDivision.setDivision(EntityUtil.getEntityById(divisionRepo, divisionId));
						userApproveRoleDivision.setUser(user);
						userApproveRoleDivision.setApproveRole(EntityUtil.getEntityById(approveRoleRepo, approveRoleId));
						EntityUtil.saveEntity(userApproveRoleDivisionRepo, userApproveRoleDivision, "UserApproveRoleDivision");
					}
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


}
