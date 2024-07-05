/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.kage.wfhs.dto.form.FormHistoryDto;
import com.kage.wfhs.dto.form.FormListDto;
import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.RegisterFormDto;

import jakarta.servlet.http.HttpServletResponse;

@Service
public interface RegisterFormService {
	void createRegisterForm(RegisterFormDto registerFormDto) throws Exception;

	RegisterFormDto getRegisterForm(Long id);

	List<RegisterFormDto> getAllRegisterForm();

	Long getFormLastId();

	List<FormListDto> getAllFormSpecificTeam(Long approveRoleId, String status, Long teamId, Long userId);

	List<FormListDto> getAllFormSpecificDepartment(Long approveRoleId, String status, Long departmentId, Long userId);

	List<FormListDto> getAllFormSpecificDivision(Long approveRoleId, String status, Long divisionId, Long userId);

	List<FormListDto> getAllFormSpecificTeamAll(Long approveRoleId, Long teamId, Long userId);

	List<FormListDto> getAllFormSpecificDepartmentAll(Long approveRoleId, Long departmentId, Long userId);

	List<FormListDto> getAllFormSpecificDivisionAll(Long approveRoleId, Long divisionId, Long userId);

	List<RegisterFormDto> getAllForm(Long approveRoleId, String status);

	List<RegisterFormDto> getFormAll(Long approveRoleId);

	void upgradeRegisterForm(Long formId, RegisterFormDto registerFormDto);

	void exportStaffIdsForOTP(List<Long> formIds, HttpServletResponse response);

	Map<String, Object> getFormWithStatus(String status, long entityId, long userId, String entityName);

    List<FormHistoryDto> getUserHistory(long userId);

	void createCeoForm(Long userId, Date fromDate, Date toDate) throws Exception;

//	Map<String, Object> getDepartmentWithStatus(String status, long departmentId, long userId);
}
