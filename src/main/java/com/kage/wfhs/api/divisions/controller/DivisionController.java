/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.divisions.controller;

import java.util.List;
import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kage.wfhs.api.divisions.dto.DivisionDto;
import com.kage.wfhs.api.divisions.service.DivisionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/division")
@AllArgsConstructor
public class DivisionController {

	private final DivisionService divisionService;

	@PostMapping("/")
	public ResponseEntity<String> createdivision(@RequestBody DivisionDto divisionDto) {
		divisionService.createDivision(divisionDto);
		return ResponseEntity.ok("Division Add Success!!!");
	}

	@Operation(summary = "Check if a division name exists", description = "Checks whether a given division name exists in the system.")
	@GetMapping("/check-name")
	public ResponseEntity<Boolean> doesNameExist(@RequestParam String name) {
		if (name == null || name.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(false);
		}

		boolean exists = divisionService.isNameExist(name);
		return ResponseEntity.ok(exists);
	}

	@PostMapping("/divisionList")
	public ResponseEntity<?> getAllDivision() {
		List<DivisionDto> divisionList = divisionService.getAllDivision();
		if(divisionList == null) {
			return ResponseEntity.ok("No Division Found");
		} else {
			return ResponseEntity.ok(divisionService.getAllDivision());
		}
	}

	@PostMapping("/getDivisionById")
	public ResponseEntity<DivisionDto> getDivision(@RequestBody Map<String, Long> request) {
		long id = request.get("divisionId");
		DivisionDto divisionDto = divisionService.getDivisionById(id);
		return ResponseEntity.ok(divisionDto);
	}

	@GetMapping("/")
	public ResponseEntity<DivisionDto> getDivision(@RequestParam("divisionId") long id) {
		return ResponseEntity.ok(divisionService.getDivisionById(id));
	}

	@PutMapping("/")
	public ResponseEntity<String> updateDivision(@RequestBody DivisionDto divisionDto) {
		divisionService.updateDivision(divisionDto);
		return ResponseEntity.ok("Successfully Updated Division..");
	}

	@DeleteMapping("/")
	public ResponseEntity<String> deleteDivisionById(@RequestParam("id") long id) {
		divisionService.deleteDivisionById(id);
		return ResponseEntity.ok("Division deleted successfully");
	}

}
