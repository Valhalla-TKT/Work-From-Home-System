/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kage.wfhs.dto.PositionDto;
import com.kage.wfhs.service.PositionService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/position")
public class PositionController {
    @Autowired
    private final PositionService positionService;

    @PostMapping("/create")
    public ResponseEntity<PositionDto> createPosition(@RequestBody PositionDto positionDto){
        return ResponseEntity.ok(positionService.createPosition(positionDto));
    }

    @PostMapping("/positionList")
    public ResponseEntity<List<PositionDto>> getAllPosition(){
        return ResponseEntity.ok(positionService.getAllPosition());
    }

    @PostMapping("/getPosition")
    public ResponseEntity<PositionDto> getPosition(@RequestParam("positionId") long id) {
        return ResponseEntity.ok(positionService.getPositionById(id));
    }

    @PostMapping("/editPosition")
    public ResponseEntity<String> updatePosition(@RequestParam("positionId") long id, @RequestBody PositionDto positionDto){
        positionService.updatePosition(id, positionDto);
        return ResponseEntity.ok("Successfully Updated Position..");
    }

    @PostMapping("/deleteById")
    public ResponseEntity<String> deletePositionById(@RequestParam("id") long id) {
        positionService.deletePositionById(id);
        return ResponseEntity.ok("Position deleted successfully");
    }
}
