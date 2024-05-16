/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.TeamDto;
import com.kage.wfhs.model.Team;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.repository.TeamRepository;
import com.kage.wfhs.service.TeamService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TeamServiceImplement implements TeamService {
    @Autowired
    private final TeamRepository teamRepo;
    private final ModelMapper modelMapper;
    private final DepartmentRepository departmentRepo;
    @Override
    public TeamDto createTeam(TeamDto teamDto) {
        Team team = modelMapper.map(teamDto, Team.class);
        team.setDepartment(teamDto.getDepartmentId() > 0 ? departmentRepo.findById(teamDto.getDepartmentId()) : null);
        teamRepo.save(team);
        return teamDto;
    }

    @Override
    public List<TeamDto> getAllTeam() {
        List<Team> teams =  teamRepo.findAllByOrderByCodeAsc();
        List<TeamDto> teamList = new ArrayList<>();
        for(Team team : teams){
            TeamDto teamDto = modelMapper.map(team, TeamDto.class);
            teamList.add(teamDto);
        }
        return teamList;
    }

    @Override
    public TeamDto getTeamById(long id){
        Team team = teamRepo.findById(id);
        return modelMapper.map(team, TeamDto.class);
    }

    @Override
    public TeamDto getTeamByName(String name){
        Team team = teamRepo.findByName(name);
        return modelMapper.map(team, TeamDto.class);
    }

    @Override
    public void updateTeam(long id, TeamDto teamDto){
        Team team = teamRepo.findById(id);
        team.setCode(teamDto.getCode());
        team.setName(teamDto.getName());
        teamRepo.save(team);
    }

    @Override
    public void  deleteTeamById(long id) {
        teamRepo.deleteById(id);
    }
}
