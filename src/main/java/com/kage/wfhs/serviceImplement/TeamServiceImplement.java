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
import com.kage.wfhs.model.Department;
import com.kage.wfhs.model.Team;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.repository.TeamRepository;
import com.kage.wfhs.service.TeamService;

import jakarta.persistence.EntityNotFoundException;
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
        Department department = departmentRepo.findById(teamDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
        team.setDepartment(department);
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
    public void updateTeam(TeamDto teamDto){
        Team team = teamRepo.findById(teamDto.getId());
        if(team == null) {
            throw new EntityNotFoundException("Team not found");
        } else {
            modelMapper.map(teamDto, team);
            if(teamDto.getDepartmentId() == 0) {
                team.setDepartment(departmentRepo.findByTeamId(teamDto.getId()));                
            } else {
                Department department = departmentRepo.findById(teamDto.getId())
                        .orElseThrow(() -> new EntityNotFoundException("Department not found"));
                if(department == null) {
                    throw new EntityNotFoundException("Department not found");
                }
                team.setDepartment(department);
            }
            teamRepo.save(team);
        }
    }

    @Override
    public void  deleteTeamById(long id) {
        teamRepo.deleteById(id);
    }
}
