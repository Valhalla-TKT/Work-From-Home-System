/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.departments.controller;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kage.wfhs.api.departments.dto.DepartmentDto;
import com.kage.wfhs.api.departments.service.DepartmentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/department")
@AllArgsConstructor
public class DepartmentController {
	@Autowired
	private final DepartmentService departmentService;

	@PostMapping("/")
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        return ResponseEntity.ok(departmentService.createDepartment(departmentDto));
    }

	@Operation(summary = "Check if a department name exists", description = "Checks whether a given department name exists in the system.")
	@GetMapping("/check-name")
	public ResponseEntity<Boolean> doesNameExist(@RequestParam String name) {
		if (name == null || name.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(false);
		}

		boolean exists = departmentService.isNameExist(name);
		return ResponseEntity.ok(exists);
	}

	@PostMapping("/departmentList")
	public ResponseEntity<?> getAllDepartment() {
		List<DepartmentDto> departmentList = departmentService.getAllDepartment();
        return ResponseEntity.ok(Objects.requireNonNullElse(departmentList, "No department found."));
	}

	@PostMapping("/division/{divisionId}")
	public ResponseEntity<List<DepartmentDto>> getDepartmentByDivisionId(@PathVariable("divisionId") Long divisionId){
		return ResponseEntity.ok(departmentService.getDepartmentByDivisionId(divisionId));
	}

	@PostMapping("/getDepartmentById")
	public ResponseEntity<DepartmentDto> getDepartment(@RequestBody Map<String, Long> request) {
		long id = request.get("departmentId");
		DepartmentDto departmentDto = departmentService.getDepartmentById(id);
		return ResponseEntity.ok(departmentDto);
	}

	@GetMapping("/")
	public ResponseEntity<DepartmentDto> getDepartment(@RequestParam("departmentId") long id) {
		return ResponseEntity.ok(departmentService.getDepartmentById(id));
	}

	@PutMapping("/")
	public ResponseEntity<String> updateDepartment(@RequestBody DepartmentDto departmentDto) {
		departmentService.updateDepartment(departmentDto);
		return ResponseEntity.ok("Successfully Updated Department..");
	}

	@DeleteMapping("/")
	public ResponseEntity<String> deleteDepartmentById(@RequestParam("id") long id) {
		departmentService.deleteDepartmentById(id);
		return ResponseEntity.ok("Department deleted successfully");
	}

}
