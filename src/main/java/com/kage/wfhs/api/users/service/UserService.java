/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.users.service;

import com.kage.wfhs.api.users.dto.UserCreationDto;
import com.kage.wfhs.api.users.dto.UserDto;
import com.kage.wfhs.api.session.dto.CurrentLoginUserDto;
import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.teams.model.Team;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface UserService {
	void createUser(UserCreationDto userDto);

	boolean updateUser(String staffId, UserDto userDto);

    UserDto getUserBystaffId(String staffId);

	CurrentLoginUserDto getLoginUserBystaffId(String staffId);

	String createstaffId(String gender);
    String getLastStaffId(String gender);
    List<UserDto> getAllUser();
    boolean isDuplicated(UserDto userDto);
    List<UserDto> getAllTeamMember(Long id);
    List<UserDto> getAllDepartmentMember(Long id);
    List<UserDto> getAllDivisionMember(Long id);
    Set<ApproveRole> getApproveRoleByUserId(Long id);
    Team getTeamIdByUserId(Long id);
    UserDto getUserById(Long id);
    
    // codes for live chat between Service Desk and User

	List<UserDto> getUpperRole(Long workFlowOrderId, Long userId);
	List<Object[]> getUserRequestByTeamId(Long teamId);
	List<Object[]> getUserRequestByTeamIds(List<Long> teamIds);
	List<Object[]> getUserRequestByManagedTeam(String managedTeamName);
	List<Object[]> getTotalStaffRequestByTeamId(String teamId);// to delete
	List<Object[]> getTotalStaffRequestByByManagedTeam(String managedTeamName);
	Object[] getTeamRegistrationInfo(Long teamId);// to delete
	Object[] getTeamRegistrationInfoByManagedTeam(String managedTeamName);
	List<Object[]> getAllTeamRequestByDepartmentId(Long departmentId);
	List<Object[]> getTotalTeamRequestByDepartmentId(String departmentId);
	Object[] getDepartmentRegistrationInfo(Long departmentId);
	List<Object[]> getAllDepartmentRequestByDivisionId(Long divisionId);
	List<Object[]> getTotalDepartmentRequestByDivisionId(String divisionId);
	Object[] getDivisionRegistrationInfo(Long divisionId);
	List<Object[]> getAllUserRequests();
	List<Object[]> getTotalStaffRequest();
	
	// Create HR
	void createHR();
	CurrentLoginUserDto changeFirstHRFirstLoginStatus();

    List<UserDto> getAllUserByGender(String gender);

	List<UserDto> getAllUserByTeamIdAndGender(Long teamId, String gender);
	List<UserDto> getAllUserByDepartmentIdAndGender(Long departmentId, String gender);
	List<UserDto> getAllUserByDivisionIdAndGender(Long divisionId, String gender);

    boolean updateApproveRole(long userId, List<Long> approveRoleIdList, List<Long> teamIds, List<Long> departmentIds, List<Long> divisionIds);
	List<UserDto> getAllApprover();

    UserDto changePosition(Long userId, String position);

	boolean sendMailToAll(String subject, String body);

	List<UserDto> getApproversByApproveRoleId(Long approveRoleId);

	boolean deleteUserById(Long userId);

    void resetPassword(String userId);

	boolean isStaffIdExist(String staffId);

	boolean isNameExist(String name);

	boolean isEmailExist(String email);
}
