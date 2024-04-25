package com.kage.wfhs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.TeamDto;

@Service
public interface TeamService {

	TeamDto createTeam(TeamDto teamDto);
	
	TeamDto getTeamById(long id);
	
	List<TeamDto> getAllTeam();

	void updateTeam(long id, TeamDto teamDto);

	void deleteTeamById(long id);

	TeamDto getTeamByName(String name);
}
