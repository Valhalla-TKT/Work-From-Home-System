/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;

import com.kage.wfhs.dto.ApproveRoleDto;
import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.dto.WorkFlowOrderDto;
import com.kage.wfhs.service.UserService;
import com.kage.wfhs.service.WorkFlowOrderService;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private final UserService userService;
    private final WorkFlowOrderService workFlowOrderService;
    @PostMapping("/generateStaffId")
    public ResponseEntity<String> generateStaffId(@RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.createstaffId(userDto.getGender()));
    }

    @PostMapping("/")
    public ResponseEntity<String > createUser(@RequestBody UserDto userDto){
        if(!userService.isDuplicated(userDto)){
            return ResponseEntity.ok("Duplicate User!!!");
        } else {            
            userService.createUser(userDto);
            return ResponseEntity.ok("Add New User Success...");
        }
    }
    
    @PostMapping("/updateApproveRole")
    public ResponseEntity<String> updateApproveRole(
    		@RequestParam(value = "userId") long userId,
    		@RequestParam(value = "approveRoleId") List<Long> approveRoleIdList
    		) {
        for (Long approveRoleDto : approveRoleIdList) {
            System.out.println(approveRoleDto + " ");
        }
        boolean approveRoleSaved = userService.updateApproveRole(userId, approveRoleIdList);
        if (approveRoleSaved) {
            return ResponseEntity.ok("Update Approve Role Success...");
        } else {
            return ResponseEntity.status(500).body("Update User Role Failed...");
        }
    }
    
    @PostMapping("/getAllTeamMember")
    public ResponseEntity<List<UserDto>> teamMember(@RequestParam("teamId") long teamId,
                                                    @RequestParam("userId") long userId){
        System.out.println("teamId = " + teamId + " userId = " + userId);
        List<UserDto> userList = new ArrayList<>();
        WorkFlowOrderDto upperRole = workFlowOrderService.getWorkFlowOrderByUserId(userId);
        List<UserDto> memberList = userService.getAllTeamMember(teamId);
        List<UserDto> upperUserList = userService.getUpperRole(upperRole.getId() -1);
        userList.addAll(upperUserList);
        userList.addAll(memberList);
        return ResponseEntity.ok(userList);
    }

    @PostMapping("/getAllUserByTeamId")
    public ResponseEntity<List<UserDto>> getAllUserByTeamId(
            @RequestParam("teamId") Long teamId
    ){
        List<UserDto> userList = userService.getAllTeamMember(teamId);
        return ResponseEntity.ok(userList);
    }

    @PostMapping("/getAllDepartmentMember")
    public ResponseEntity<List<UserDto>> departmentmember(@RequestBody UserDto userDto){    	
        return ResponseEntity.ok(userService.getAllDepartmentMember(userDto.getDepartmentId()));
    }

    @PostMapping("/getAllUserByDepartmentId")
    public ResponseEntity<List<UserDto>> getAllUserByDepartmentId(
            @RequestParam("departmentId") Long departmentId
    ){
        List<UserDto> userList = userService.getAllDepartmentMember(departmentId);
        return ResponseEntity.ok(userList);
    }

    @PostMapping("/getAllDivisionMember")
    public ResponseEntity<List<UserDto>> divisionmember(@RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.getAllDivisionMember(userDto.getDivisionId()));
    }

    @PostMapping("/division/{divisionId}")
    public ResponseEntity<List<UserDto>> getAllUserByDivisionId(@PathVariable("divisionId") Long divisionId){
        return ResponseEntity.ok(userService.getAllDivisionMember(divisionId));
    }

    @PostMapping("/gender")
    public ResponseEntity<List<UserDto>> getAllUserByGender(@RequestParam("gender") String gender){
        return ResponseEntity.ok(userService.getAllUserByGender(gender));
    }

    @PostMapping("/team/{teamId}/gender/{gender}")
    public ResponseEntity<List<UserDto>> getAllUserByTeamIdAndGender(@PathVariable("teamId") Long teamId, @PathVariable("gender") String gender){
        return ResponseEntity.ok(userService.getAllUserByTeamIdAndGender(teamId, gender));
    }

    @PostMapping("/department/{departmentId}/gender/{gender}")
    public ResponseEntity<List<UserDto>> getUsersByDepartmentIdAndGender(@PathVariable("departmentId") Long departmentId, @PathVariable("gender") String gender){
        return ResponseEntity.ok(userService.getAllUserByDepartmentIdAndGender(departmentId, gender));
    }

    @PostMapping("/division/{divisionId}/gender/{gender}")
    public ResponseEntity<List<UserDto>> getUsersByDivisionIdAndGender(@PathVariable("divisionId") Long divisionId, @PathVariable("gender") String gender){
        return ResponseEntity.ok(userService.getAllUserByDivisionIdAndGender(divisionId, gender));
    }
    
    @PostMapping("/userList")
    public ResponseEntity<?> getAllUser(){
        List<UserDto> userList = userService.getAllUser();
        if(userList == null)
            return ResponseEntity.ok("No User found.");
        else 
            return ResponseEntity.ok(userList);
    }
    
  //TEAM

    @GetMapping("/userRequest")
    public List<Object[]> getUserRequestByTeamId(@RequestParam Long teamId) {
        return userService.getUserRequestByTeamId(teamId);
    }

    @GetMapping("/requestStaff")
    public List<Object[]> getTotalStaffRequestByTeamId(@RequestParam("teamId") String teamId) {
        return userService.getTotalStaffRequestByTeamId(teamId);
    }
    
    @GetMapping("/teamRegistrationInfo")
    public Object[] getTeamRegistrationInfo(@RequestParam Long teamId) {
        return userService.getTeamRegistrationInfo(teamId);
    }

    //DEPARTMENT HEAD

    @GetMapping("/teamRequest")
    public List<Object[]> getAllTeamRequestByDepartmentId(@RequestParam Long departmentId) {
        return userService.getAllTeamRequestByDepartmentId(departmentId);
    }

    @GetMapping("/requestTeam")
    public List<Object[]> getTotalTeamRequestByDepartmentId(@RequestParam("departmentId") String departmentId) {
        return userService.getTotalTeamRequestByDepartmentId(departmentId);
    }

    @GetMapping("/departmentRegistrationInfo")
    public Object[] getDepartmentRegistrationInfo(@RequestParam Long departmentId) {
        return userService.getDepartmentRegistrationInfo(departmentId);
    }

    //DIVISION HEAD

    @GetMapping("/departmentRequest")
    public List<Object[]> getAllDepartmentRequestByDivisionId(@RequestParam Long divisionId) {
        return userService.getAllDepartmentRequestByDivisionId(divisionId);
    }

    @GetMapping("/requestDepartment")
    public List<Object[]> getTotalDepartmentRequestByDivisionId(@RequestParam("divisionId") String divisionId) {
        return userService.getTotalDepartmentRequestByDivisionId(divisionId);
    }

    @GetMapping("/divisionRegistrationInfo")
    public Object[] getDivisionRegistrationInfo(@RequestParam Long divisionId) {
        return userService.getDivisionRegistrationInfo(divisionId);
    }

    //Others
    @GetMapping("/allRequest")
    public List<Object[]> getAllUserRequests() {
        return userService.getAllUserRequests();
    }

    @GetMapping("/requestAll")
    public List<Object[]> getTotalStaffRequest() {
        return userService.getTotalStaffRequest();
    }
}
