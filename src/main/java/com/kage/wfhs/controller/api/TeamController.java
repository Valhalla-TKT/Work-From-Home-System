package com.kage.wfhs.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kage.wfhs.dto.TeamDto;
import com.kage.wfhs.service.TeamService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/team")
public class TeamController {
    @Autowired
    private final TeamService teamService;

    @PostMapping("/create")
    public ResponseEntity<String> createTeam(@RequestBody TeamDto teamDto){
        teamService.createTeam(teamDto);
        return ResponseEntity.ok("Team Add Successful...");
    }

    @PostMapping("/teamList")
    public ResponseEntity<List<TeamDto>> getAllTeam(){
        return ResponseEntity.ok(teamService.getAllTeam());
    }

    @PostMapping("/getTeamById")
    public ResponseEntity<TeamDto> getTeam (@RequestBody Map<String, Long> request) {
        long id = request.get("teamId");
        TeamDto teamDto = teamService.getTeamById(id);
        return ResponseEntity.ok(teamDto);
    }
    @PostMapping("/getTeam")
    public ResponseEntity<TeamDto> getTeam(@RequestParam("teamId") long id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }

    @PostMapping("/editTeam")
    public ResponseEntity<String> updateTeam(@RequestParam("teamId") long id, @RequestBody TeamDto teamDto){
    	System.out.println(teamDto.getName());
        teamService.updateTeam(id, teamDto);
        return ResponseEntity.ok("Successfully Updated Team..");
    }

    @PostMapping("/deleteById")
    public ResponseEntity<String> deleteTeamById(@RequestParam("id") long id) {
        teamService.deleteTeamById(id);
        return ResponseEntity.ok("Team deleted successfully");
    }

}
