/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;

import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.dto.WorkFlowOrderDto;
import com.kage.wfhs.service.UserService;
import com.kage.wfhs.service.WorkFlowOrderService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final WorkFlowOrderService workFlowOrderService;
    @PostMapping("/generateStaffId")
    public ResponseEntity<String> generateStaffId(@RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.createstaffId(userDto.getGender()));
    }

    @Operation(summary = "Check if a staff ID exists", description = "Checks whether a given staff ID exists in the system.")
    @GetMapping("/check-staff-id")
    public ResponseEntity<Boolean> doesStaffIdExist(@RequestParam String staffId) {
        if (staffId == null || staffId.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(false);
        }

        boolean exists = userService.isStaffIdExist(staffId);
        return ResponseEntity.ok(exists);
    }

    @Operation(summary = "Check if a user's name exists", description = "Checks whether a given name exists in the system.")
    @GetMapping("/check-name")
    public ResponseEntity<Boolean> doesNameExist(@RequestParam String name) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(false);
        }

        boolean exists = userService.isNameExist(name);
        return ResponseEntity.ok(exists);
    }

    @Operation(summary = "Check if a user's email exists", description = "Checks whether a given email exists in the system.")
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> doesEmailExist(@RequestParam String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(false);
        }

        boolean exists = userService.isEmailExist(email);
        return ResponseEntity.ok(exists);
    }

//    @PostMapping("/")
//    public ResponseEntity<String > createUser(@RequestBody UserDto userDto){
//        if(!userService.isDuplicated(userDto)){
//            return ResponseEntity.ok("Duplicate User!!!");
//        } else {
//            userService.createUser(userDto);
//            return ResponseEntity.ok("Add New User Success...");
//        }
//    }
    
    @PostMapping("/updateApproveRole")
    public ResponseEntity<String> updateApproveRole(
    		@RequestParam(value = "userId") long userId,
    		@RequestParam(value = "approveRoleId") List<Long> approveRoleIdList,
            @RequestParam(value = "teamIds", required = false) List<Long> teamIds,
            @RequestParam(value = "departmentIds", required = false) List<Long> departmentIds,
            @RequestParam(value = "divisionIds", required = false) List<Long> divisionIds
    		) {
        boolean approveRoleSaved = userService.updateApproveRole(userId, approveRoleIdList, teamIds, departmentIds, divisionIds);
        if (approveRoleSaved) {
            return ResponseEntity.ok("Update Approve Role Success...");
        } else {
            return ResponseEntity.status(500).body("Update User Role Failed...");
        }
    }
    
    @PostMapping("/getAllTeamMember")
    public ResponseEntity<List<UserDto>> getAllTeamMember(@RequestParam("teamId") long teamId,
                                                    @RequestParam("userId") long userId) {
        WorkFlowOrderDto upperRole = workFlowOrderService.getWorkFlowOrderByUserId(userId);
        List<UserDto> memberList = userService.getAllTeamMember(teamId);
        List<UserDto> upperUserList = userService.getUpperRole(upperRole.getId() -1, userId);
        upperUserList.forEach(userDto -> userDto.setName(userDto.getName() + " (" + userDto.getApproveRoleName() + ")"));
        Set<UserDto> userSet = new HashSet<>();
        userSet.addAll(upperUserList);
        userSet.addAll(memberList);
        List<UserDto> userList = new ArrayList<>(userSet);
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
    
    // TEAM
    @GetMapping("/userRequest")
    public List<Object[]> getUserRequestByTeamId(@RequestParam String managedTeamName) {
        return userService.getUserRequestByManagedTeam(managedTeamName);
    }

    @GetMapping("/requestStaff")
    public List<Object[]> getTotalStaffRequestByTeamId(@RequestParam("managedTeamName") String managedTeamName) {
        return userService.getTotalStaffRequestByByManagedTeam(managedTeamName);
    }

    @GetMapping("/teamRegistrationInfo")
    public Object[] getTeamRegistrationInfo(@RequestParam String managedTeamName) {
        return userService.getTeamRegistrationInfoByManagedTeam(managedTeamName);
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
    @PostMapping("/getAllApprover")
    public ResponseEntity<?> getAllApprover(){
        return ResponseEntity.ok(userService.getAllApprover());
    }

    @PostMapping("/getApproversByApproveRoleId")
    public ResponseEntity<?> getApproversByApproveRoleId(
            @RequestParam("approveRoleId") Long approveRoleId
    ){
        return ResponseEntity.ok(userService.getApproversByApproveRoleId(approveRoleId));
    }

    @PutMapping("/changePosition/{userId}")
    public ResponseEntity<Map<String, Object>> changePosition(@PathVariable Long userId, @RequestParam String position) {
        UserDto userDto = userService.changePosition(userId, position);
        System.out.println("HElloooooo");
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Position changed successfully");
        response.put("data", userDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/sendMail")
    public ResponseEntity<String> sendMail(@RequestBody Map<String, String> request) {
        String subject = request.get("subject");
        String body = request.get("body");
        boolean result = userService.sendMailToAll(subject, body);
        if (result) {
            return ResponseEntity.ok("Emails sent successfully.");
        } else {
            return ResponseEntity.status(500).body("Failed to send emails.");
        }
    }

    @DeleteMapping("")
    public ResponseEntity<String> deleteUser(@RequestParam("userId") Long userId) {
        try {
            boolean deleted = userService.deleteUserById(userId);
            if (deleted) {
                return ResponseEntity.ok("User with ID " + userId + " was successfully deleted.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User with ID " + userId + " not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while deleting the user with ID " + userId + ": " + e.getMessage());
        }
    }

    @PostMapping("/resetPassword/{userId}")
    public ResponseEntity<String> resetPassword(@PathVariable String userId) {
        userService.resetPassword(userId);
        return ResponseEntity.ok("Password reset successfully.");
    }

}
