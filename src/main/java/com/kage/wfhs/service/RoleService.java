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

import com.kage.wfhs.dto.RoleDto;

@Service
public interface RoleService {

	RoleDto createRole(RoleDto roleDto);

	List<RoleDto> getAllRole();

	RoleDto getRoleById(long id);

	void updateRole(RoleDto roleDto);

	void deleteApproverById(long id);

	RoleDto getRoleByName(String name);
}
