package com.kage.wfhs.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kage.wfhs.dto.DivisionDto;
import com.kage.wfhs.service.DivisionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/division")
@AllArgsConstructor
public class DivisionController {

	private final DivisionService divisionService;

	@PostMapping("/create")
	public ResponseEntity<String> createdivision(@RequestBody DivisionDto divisionDto) {
		divisionService.createDivision(divisionDto);
		return ResponseEntity.ok("Division Add Success!!!");
	}

	@PostMapping("/divisionList")
	public ResponseEntity<List<DivisionDto>> getAllDivision() {
		return ResponseEntity.ok(divisionService.getAllDivision());
	}

	@PostMapping("/getDivisionById")
	public ResponseEntity<DivisionDto> getDivision(@RequestBody Map<String, Long> request) {
		long id = request.get("divisionId");
		DivisionDto divisionDto = divisionService.getDivisionById(id);
		return ResponseEntity.ok(divisionDto);
	}

	@PostMapping("/getDivision")
	public ResponseEntity<DivisionDto> getDivision(@RequestParam("divisionId") long id) {
		return ResponseEntity.ok(divisionService.getDivisionById(id));
	}

	@PostMapping("/editDivision")
	public ResponseEntity<String> updateDivision(@RequestParam("divisionId") long id,
			@RequestBody DivisionDto divisionDto) {
		System.out.println(divisionDto.getName());
		divisionService.updateDivision(id, divisionDto);
		return ResponseEntity.ok("Successfully Updated Division..");
	}

	@PostMapping("/deleteById")
	public ResponseEntity<String> deleteDivisionById(@RequestParam("id") long id) {
		divisionService.deleteDivisionById(id);
		return ResponseEntity.ok("Division deleted successfully");
	}

}
