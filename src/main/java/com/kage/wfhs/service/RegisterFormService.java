/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.RegisterFormDto;

import jakarta.servlet.http.HttpServletResponse;

@Service
public interface RegisterFormService {
	void createRegisterForm(RegisterFormDto registerFormDto) throws Exception;

	RegisterFormDto getRegisterForm(Long id);

	List<RegisterFormDto> getAllRegisterForm();

	Long getFormLastId();

	List<RegisterFormDto> getAllFormSpecificTeam(Long approveRoleId, String status, Long teamId);

	List<RegisterFormDto> getAllFormSpecificDepartment(Long approveRoleId, String status, Long departmentId);

	List<RegisterFormDto> getAllFormSpecificDivision(Long approveRoleId, String status, Long divisionId);

	List<RegisterFormDto> getAllFormSpecificTeamAll(Long approveRoleId, Long teamId);

	List<RegisterFormDto> getAllFormSpecificDepartmentAll(Long approveRoleId, Long departmentId);

	List<RegisterFormDto> getAllFormSpecificDivisionAll(Long approveRoleId, Long divisionId);

	List<RegisterFormDto> getAllForm(Long approveRoleId, String status);

	List<RegisterFormDto> getFormAll(Long approveRoleId);

	void upgradeRegisterForm(Long formId, RegisterFormDto registerFormDto);

	void exportStaffIdsForOTP(List<Long> formIds, HttpServletResponse response);

	Map<String, Object> getTeamWithStatus(String status, long teamId, long userId);
}
