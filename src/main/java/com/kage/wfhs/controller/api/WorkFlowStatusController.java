/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;

import com.kage.wfhs.dto.WorkFlowStatusDto;
import com.kage.wfhs.service.WorkFlowStatusService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workflowstatus")
@RequiredArgsConstructor
public class WorkFlowStatusController {

    @Autowired
    private final WorkFlowStatusService workFlowStatusService;

//
//    @PostMapping("/update")
//    public ResponseEntity<String> updateStatus(@RequestBody WorkFlowStatusDto workFlowStatusDto){
//        if(workFlowStatusDto.isState()){
//            workFlowStatusDto.setStatus(Status.valueOf(Status.APPROVE.name()));
//        } else {
//            workFlowStatusDto.setStatus(Status.valueOf(Status.REJECT.name()));
//        }
//        workFlowStatusService.updateStatus(workFlowStatusDto.getId(),workFlowStatusDto);
//        return ResponseEntity.ok("Work Flow Status is ....");
//    }
    
    @PostMapping("/update")
    public ResponseEntity<String> updateStatus(@RequestBody WorkFlowStatusDto workFlowStatusDto) throws Exception{
        workFlowStatusService.updateStatus(workFlowStatusDto.getId(),workFlowStatusDto);
        return ResponseEntity.ok("Work Flow Status is Update Success....");
    }
    
    @PostMapping("/getFormStatus")
    public ResponseEntity<List<WorkFlowStatusDto>> getAllStatus(@RequestBody long formId) {
        List<WorkFlowStatusDto> getAllStatus = workFlowStatusService.getWorkFlowStatusWithForm(formId);
        return ResponseEntity.ok(getAllStatus);
    }
    
}
