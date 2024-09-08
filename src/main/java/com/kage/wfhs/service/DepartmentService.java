/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import com.kage.wfhs.dto.DepartmentDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface DepartmentService {
	DepartmentDto createDepartment(DepartmentDto departmentDto);

	List<DepartmentDto> getAllDepartment();

	DepartmentDto getDepartmentById(Long id);

	void updateDepartment(DepartmentDto departmentDto);

	void deleteDepartmentById(Long id);

	DepartmentDto getDepartmentByName(String name);

    List<DepartmentDto> getDepartmentByDivisionId(Long divisionId);

    boolean isNameExist(String name);
}
