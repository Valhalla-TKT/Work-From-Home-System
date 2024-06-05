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

import com.kage.wfhs.dto.TeamDto;

@Service
public interface TeamService {

	TeamDto createTeam(TeamDto teamDto);
	
	TeamDto getTeamById(Long id);
	
	List<TeamDto> getAllTeam();

	void updateTeam(TeamDto teamDto);

	void deleteTeamById(Long id);

	TeamDto getTeamByName(String name);
}
