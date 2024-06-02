/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.exception.EntityCreationException;
import com.kage.wfhs.model.*;
import com.kage.wfhs.repository.*;
import com.kage.wfhs.service.UserService;
import com.kage.wfhs.util.EntityUtil;
import com.kage.wfhs.util.Helper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {
	@Autowired
	private final UserRepository userRepo;

	@Autowired
	private final RoleRepository roleRepo;

	@Autowired
	private final PositionRepository positionRepo;

	@Autowired
	private final TeamRepository teamRepo;
	
	@Autowired
    private final ApproveRoleRepository approveRoleRepo;
	
	@Autowired
    private final DepartmentRepository departmentRepo;

    @Autowired
    private final DivisionRepository divisionRepo;

	@Autowired
	private final ModelMapper modelMapper;

	@Autowired
	private final PasswordEncoder passwordEncoder;

	@Override
    public UserDto createUser(UserDto userDto) {
		try {
			validateUserDto(userDto);

			User user = modelMapper.map(userDto, User.class);

			String encodePassword = passwordEncoder.encode("123@dirace");
			user.setEnabled(true);
			user.setPermanentDate(null);

			String profile = determineProfile(userDto.getGender());
        	user.setProfile(profile);
			user.setPassword(encodePassword);

			user.setPosition(EntityUtil.getEntityById(positionRepo, userDto.getPositionId()));
        	user.setRole(EntityUtil.getEntityById(roleRepo, userDto.getRoleId()));

			if (userDto.getTeamId() > 0) {
				Team team = teamRepo.findById(userDto.getTeamId())
						.orElseThrow(() -> new EntityNotFoundException("Team not found"));
				user.setTeam(team);
				user.setDepartment(team.getDepartment());
				user.setDivision(team.getDepartment().getDivision());
			}
			if (userDto.getDepartmentId() > 0) {
				Department department = departmentRepo.findById(userDto.getId())
					.orElseThrow(() -> new EntityNotFoundException("Department not found"));
				user.setDepartment(department);
				user.setDivision(department.getDivision());
			}
			if (userDto.getDivisionId() > 0) {
				Division division = divisionRepo.findById(userDto.getDivisionId())
						.orElseThrow(() -> new EntityNotFoundException("Division not found"));
				user.setDivision(division);
			}
			// ApproveRole approveRole = approveRoleRepo.findById(userDto.getApproveRoleId());
			// Set<ApproveRole> approveRoles = new HashSet<ApproveRole>();
			// approveRoles.add(approveRole);
			// if (approveRole != null) {
			// 	user.setApproveRoles(approveRoles);
			// }
			setApprovalRoles(user, userDto.getApproveRoleId());
			
			User savedUser = EntityUtil.saveEntity(userRepo, user, "user");
			return modelMapper.map(savedUser, UserDto.class);
		} catch (Exception e) {
			System.err.println("Error creating user: " + e.getMessage());
        	throw new EntityCreationException("Error creating user " + e);
		}        
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

	private void setApprovalRoles(User user, long approveRoleId) {
		if (approveRoleId > 0) {
			ApproveRole approveRole = approveRoleRepo.findById(approveRoleId);
			if (approveRole != null) {
				Set<ApproveRole> approveRoles = new HashSet<>();
				approveRoles.add(approveRole);
				user.setApproveRoles(approveRoles);
			}
		}
	}

	@Override
	public void updateUser(long id, UserDto userDto) {
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

	@Override
	public List<UserDto> getAllUser() {
		Sort sort = Sort.by(Sort.Direction.ASC, "staffId");
		List<User> users = EntityUtil.getAllEntities(userRepo, sort, "user");
		if(users == null)
			return null;		
		return users.stream()
					.map(user -> modelMapper.map(user, UserDto.class))
					.collect(Collectors.toList());
	}

	@Override
	public boolean isDuplicated(UserDto userDto) {
		return userRepo.findByStaffId(userDto.getStaffId()) == null
				&& userRepo.findByEmail(userDto.getEmail()) == null;
	}

	@Override
	public List<UserDto> getAllTeamMember(long id) {
		List<User> users = userRepo.findByTeamId(id);
		List<UserDto> userList = new ArrayList<>();
		for (User user : users) {
			UserDto userDto = modelMapper.map(user, UserDto.class);
			userList.add(userDto);
		}
		return userList;
	}

	@Override
	public List<UserDto> getAllDepartmentMember(long id) {
		List<User> users = userRepo.findByTeamDepartmentId(id);
		List<UserDto> userList = new ArrayList<>();
		for (User user : users) {
			UserDto userDto = modelMapper.map(user, UserDto.class);
			userList.add(userDto);
		}
		return userList;
	}

	@Override
	public List<UserDto> getAllDivisionMember(long id) {
		List<User> users = userRepo.findByTeamDepartmentDivisionId(id);
		List<UserDto> userList = new ArrayList<>();
		for (User user : users) {
			UserDto userDto = modelMapper.map(user, UserDto.class);
			userList.add(userDto);
		}
		return userList;
	}

	@Override
	public Set<ApproveRole> getApproveRoleByUserId(long id) {

		return null;
	}

	@Override
	public Team getTeamIdByUserId(long id) {
		return userRepo.findTeamByUserId(id);
	}

	// codes for live chat between Service Desk and User
	@Override
	public void setUserOnline(User user) {
		user.setActiveStatus(ActiveStatus.ONLINE);
		userRepo.save(user);
	}

	@Override
	public void disconnect(User user) {
		var storedUser = userRepo.findById(user.getId());
		if (storedUser != null) {
			storedUser.setActiveStatus(ActiveStatus.OFFLINE);
			userRepo.save(user);
		}
	}

	@Override
	public List<UserDto> findConnectedUsers() {
		List<User> users = userRepo.findAllByActiveStatus(ActiveStatus.ONLINE);
		List<UserDto> userList = new ArrayList<>();
		for (User user : users) {
			UserDto userDto = modelMapper.map(user, UserDto.class);
			userList.add(userDto);
		}
		return userList;
	}

	@Override
	public UserDto getUserById(long id) {
		User user = userRepo.findById(id);
		return modelMapper.map(user, UserDto.class);
	}
	
	@Override
    public List<UserDto> getUpperRole(long workFlowStatusId) {
        List<User> users = userRepo.findUpperRoleUser(workFlowStatusId);
        List<UserDto> userList = new ArrayList<>();
        for (User user : users) {
            UserDto userDto = modelMapper.map(user, UserDto.class);
            userList.add(userDto);
        }
        return userList;
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
	public boolean createHR() {
		UserDto userDto = new UserDto();
		userDto.setStaffId("00-00001");
		userDto.setName("HR");
		userDto.setEmail("hr@gmail.com");
		userDto.setPhoneNumber("000 000 000");
		userDto.setPassword(passwordEncoder.encode("123@dirace"));
		userDto.setEnabled(true);
		User HR = modelMapper.map(userDto, User.class);
		ApproveRole approveRole = approveRoleRepo.findByName("HR");
	    if (approveRole == null) {
	        return false;
	    }
	    Set<ApproveRole> approveRoles = new HashSet<>();
	    approveRoles.add(approveRole);
	    HR.setApproveRoles(approveRoles);
	    try {
	    	User savedUser = EntityUtil.saveEntity(userRepo, HR, "user");
	    	return savedUser != null;   
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}

	@Override
	public boolean changeFirstHRFirstLoginStatus() {
		User user = userRepo.findByStaffId("00-00001");
		user.setFirstTimeLogin(false);
		User savedUser = EntityUtil.saveEntity(userRepo, user, "user");
		return savedUser != null;
	}
}
