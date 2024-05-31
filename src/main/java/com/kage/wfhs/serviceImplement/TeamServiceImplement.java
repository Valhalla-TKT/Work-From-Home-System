/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.TeamDto;
import com.kage.wfhs.model.Department;
import com.kage.wfhs.model.Team;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.repository.TeamRepository;
import com.kage.wfhs.service.TeamService;
import com.kage.wfhs.util.EntityUtil;

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
        System.out.println(team);
        if(teamDto.getDepartmentId() > 0) {
            Department department = departmentRepo.findById(teamDto.getDepartmentId())
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
            team.setDepartment(department);
        } else
            team.setDepartment(null);        

        Team savedTeam = EntityUtil.saveEntity(teamRepo, team, "team");
        return modelMapper.map(savedTeam, TeamDto.class);
    }

    @Override
    public List<TeamDto> getAllTeam() {
    	Sort sort = Sort.by(Sort.Direction.ASC, "code");
        List<Team> teams =  EntityUtil.getAllEntities(teamRepo, sort, "team");
        if(teams == null)
        	return null;
        return teams.stream()
        		.map(team -> modelMapper.map(team, TeamDto.class))
        		.collect(Collectors.toList());
    }

    @Override
    public TeamDto getTeamById(long id){
        Team team = teamRepo.findById(id)
        		.orElseThrow(() -> new EntityNotFoundException("Team not found"));
        if(team.getDepartment() == null)
        	team.setDepartment(departmentRepo.findByTeamId(id));
        return modelMapper.map(team, TeamDto.class);
    }

    @Override
    public TeamDto getTeamByName(String name){
        Team team = teamRepo.findByName(name)
        		.orElseThrow(() -> new EntityNotFoundException("Team not found"));
        return modelMapper.map(team, TeamDto.class);
    }

    @Override
    public void updateTeam(TeamDto teamDto){
    	Team team = teamRepo.findById(teamDto.getId())
        		.orElseThrow(() -> new EntityNotFoundException("Team not found"));
        if(team == null) {
            throw new EntityNotFoundException("Team not found");
        } else {
            modelMapper.map(teamDto, team);
            if(teamDto.getDepartmentId() == 0) {
                team.setDepartment(departmentRepo.findByTeamId(teamDto.getId()));                
            } else {
                Department department = departmentRepo.findById(teamDto.getDepartmentId())
                        .orElseThrow(() -> new EntityNotFoundException("Department not found"));
                if(department == null) {
                    throw new EntityNotFoundException("Department not found");
                }
                System.out.println(department.getName() +" _________________");
                team.setDepartment(department);
            }
            teamRepo.save(team);
        }
    }

    @Override
    public void  deleteTeamById(long id) {
        EntityUtil.deleteEntity(teamRepo, id, "Team");
    }
}
