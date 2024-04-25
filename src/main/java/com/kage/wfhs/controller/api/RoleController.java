package com.kage.wfhs.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kage.wfhs.dto.RoleDto;
import com.kage.wfhs.service.RoleService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private final RoleService roleService;

    @PostMapping("/create")
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto){
        
        return ResponseEntity.ok(roleService.createRole(roleDto));
    }

    @PostMapping("/roleList")
    public ResponseEntity<List<RoleDto>> getAllRole(){
        return ResponseEntity.ok(roleService.getAllRole());
    }

    @PostMapping("/getRole")
    public ResponseEntity<RoleDto> getRole(@RequestParam("roleId") long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @PostMapping("/editRole")
    public ResponseEntity<String> updateApprover(@RequestParam("roleId") long id, @RequestBody RoleDto roleDto){
    	System.out.println(roleDto.getName());
        roleService.updateRole(id, roleDto);
        return ResponseEntity.ok("Successfully Updated Role..");
    }

    @PostMapping("/deleteById")
    public ResponseEntity<String> deleteRoleById(@RequestParam("id") long id) {
        roleService.deleteApproverById(id);
        return ResponseEntity.ok("Role deleted successfully");
    }
}
