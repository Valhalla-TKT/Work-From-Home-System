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
import java.util.Objects;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kage.wfhs.dto.TeamDto;
import com.kage.wfhs.service.TeamService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/team")
public class TeamController {
    private final TeamService teamService;

    @PostMapping("/")
    public ResponseEntity<TeamDto> createTeam(@RequestBody TeamDto teamDto){        
        return ResponseEntity.ok(teamService.createTeam(teamDto));
    }

    @Operation(summary = "Check if a team name exists", description = "Checks whether a given team name exists in the system.")
    @GetMapping("/check-name")
    public ResponseEntity<Boolean> doesNameExist(@RequestParam String name) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(false);
        }

        boolean exists = teamService.isNameExist(name);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/teamList")
    public ResponseEntity<?> getAllTeam(){
        List<TeamDto> teamList = teamService.getAllTeam();
        return ResponseEntity.ok(Objects.requireNonNullElse(teamList, "No team found."));
    }

    @PostMapping("/myTeamList")
    public ResponseEntity<?> getMyTeam(){
        List<TeamDto> teamList = teamService.getAllTeam();
        return ResponseEntity.ok(Objects.requireNonNullElse(teamList, "No team found."));
    }

    @PostMapping("/department/{departmentId}")
    public ResponseEntity<List<TeamDto>> getTeamByDepartmentId(@PathVariable("departmentId") Long departmentId){
        return ResponseEntity.ok(teamService.getTeamByDepartmentId(departmentId));
    }

    @PostMapping("/division/{divisionId}")
    public ResponseEntity<List<TeamDto>> getTeamByDivisionId(@PathVariable("divisionId") Long divisionId){
        return ResponseEntity.ok(teamService.getTeamByDivisionId(divisionId));
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
