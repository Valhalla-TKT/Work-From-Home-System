/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;

import com.kage.wfhs.dto.ApproveRoleDto;
import com.kage.wfhs.model.WorkFlowOrder;
import com.kage.wfhs.service.ApproveRoleService;
import lombok.AllArgsConstructor;
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

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/approveRole")
public class ApproveRoleController {

    @Autowired
    private final ApproveRoleService approveRoleService;

    @PostMapping("/")
    public ResponseEntity<String > createApproveRole(@RequestBody ApproveRoleDto approveRoleDto){
        approveRoleService.createApproveRole(approveRoleDto);
        return ResponseEntity.ok("Approve Role Create Successful...");
    }

    @PostMapping("/approveRoleList")
    public ResponseEntity<List<ApproveRoleDto>> getAllApproveRole(){
        return ResponseEntity.ok(approveRoleService.getAllApproveRole());
    }

    @GetMapping("/")
    public ResponseEntity<String > get(@RequestBody List<WorkFlowOrder> idList){
        return ResponseEntity.ok("Approve Role Create Successful...");
    }

    @PutMapping("/")
    public ResponseEntity<String> updatePosition(@RequestBody ApproveRoleDto approveRoleDto){
        approveRoleService.updateApproveRole(approveRoleDto);
        return ResponseEntity.ok("Successfully Updated Approve Role..");
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deletePositionById(@RequestParam("id") long id) {
        approveRoleService.deleteApproverById(id);
        return ResponseEntity.ok("Approve Role deleted successfully");
    }
}
