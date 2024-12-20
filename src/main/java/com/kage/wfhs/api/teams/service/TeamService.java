/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.teams.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.api.teams.dto.TeamDto;

@Service
public interface TeamService {

	TeamDto createTeam(TeamDto teamDto);
	
	TeamDto getTeamById(Long id);
	
	List<TeamDto> getAllTeam();

	List<TeamDto> getMyTeam();

	void updateTeam(TeamDto teamDto);

	void deleteTeamById(Long id);

	TeamDto getTeamByName(String name);

	List<TeamDto> getTeamByDepartmentId(Long departmentId);

    List<TeamDto> getTeamByDivisionId(Long divisionId);

    boolean isNameExist(String name);
}
