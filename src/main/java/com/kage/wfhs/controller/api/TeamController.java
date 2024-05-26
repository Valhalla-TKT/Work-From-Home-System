/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/")
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
    @GetMapping("/")
    public ResponseEntity<TeamDto> getTeam(@RequestParam("teamId") long id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }

    @PutMapping("/")
    public ResponseEntity<String> updateTeam(@RequestBody TeamDto teamDto){
        teamService.updateTeam(teamDto);
        return ResponseEntity.ok("Successfully Updated Team..");
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deleteTeamById(@RequestParam("id") long id) {
        teamService.deleteTeamById(id);
        return ResponseEntity.ok("Team deleted successfully");
    }

}
