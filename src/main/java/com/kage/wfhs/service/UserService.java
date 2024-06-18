/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.Team;
import com.kage.wfhs.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface UserService {
	UserDto createUser(UserDto userDto);
    void updateUser(Long id, UserDto userDto);
    UserDto getUserBystaffId(String staffId);

	UserDto getLoginUserBystaffId(String staffId);

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
	void setUserOnline(User user);
	void disconnect(User user);
	List<UserDto> findConnectedUsers();
	List<UserDto> getUpperRole(Long l);
	List<Object[]> getUserRequestByTeamId(Long teamId);
	List<Object[]> getTotalStaffRequestByTeamId(String teamId);
	Object[] getTeamRegistrationInfo(Long teamId);
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
	boolean changeFirstHRFirstLoginStatus();

    List<UserDto> getAllUserByGender(String gender);

	List<UserDto> getAllUserByTeamIdAndGender(Long teamId, String gender);
	List<UserDto> getAllUserByDepartmentIdAndGender(Long departmentId, String gender);
	List<UserDto> getAllUserByDivisionIdAndGender(Long divisionId, String gender);
}
