/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.RegisterFormDto;

import jakarta.servlet.http.HttpServletResponse;

@Service
public interface RegisterFormService {
	void createRegisterForm(RegisterFormDto registerFormDto) throws Exception;

	RegisterFormDto getRegisterForm(long id);

	List<RegisterFormDto> getAllRegisterForm();

	long getFormLastId();

	List<RegisterFormDto> getAllFormSpecificTeam(long approveRoleId, String status, long teamId);

	List<RegisterFormDto> getAllFormSpecificDepartment(long approveRoleId, String status, long departmentId);

	List<RegisterFormDto> getAllFormSpecificDivision(long approveRoleId, String status, long divisionId);

	List<RegisterFormDto> getAllFormSpecificTeamAll(long approveRoleId, long teamId);

	List<RegisterFormDto> getAllFormSpecificDepartmentAll(long approveRoleId, long departmentId);

	List<RegisterFormDto> getAllFormSpecificDivisionAll(long approveRoleId, long divisionId);

	List<RegisterFormDto> getAllForm(long approveRoleId, String status);

	List<RegisterFormDto> getFormAll(long approveRoleId);

	void upgradeRegisterForm(long formId, RegisterFormDto registerFormDto);

	void exportStaffIdsForOTP(List<Long> formIds, HttpServletResponse response);
}
