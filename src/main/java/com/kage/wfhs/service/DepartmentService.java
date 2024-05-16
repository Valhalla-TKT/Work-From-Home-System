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

	DepartmentDto getDepartmentById(long id);

	void updateDepartment(long id, DepartmentDto departmentDto);

	void deleteDepartmentById(long id);

	DepartmentDto getDepartmentByName(String name);
}
