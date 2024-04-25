package com.kage.wfhs.controller.api;

import com.kage.wfhs.dto.WorkFlowOrderDto;
import com.kage.wfhs.service.WorkFlowOrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/workfloworder")
@AllArgsConstructor
public class WorkFlowOrderController {
    @Autowired
    private final WorkFlowOrderService workFlowOrderService;

    @PostMapping("/create")
    public ResponseEntity<String> createWorkFlowOrder(@RequestBody List<Long> approveRoleList) {
        List<String> approveState = workFlowOrderService.getOrder(approveRoleList.size());

        for(String state : approveState){
            System.out.println(state);
        }
        for(long id  : approveRoleList){
            System.out.println(id);
        }
        WorkFlowOrderDto workFlowOrderDto = new WorkFlowOrderDto();

        for (int i = 0; i < approveState.size(); i++) {
            String state = approveState.get(i);
            long roleId = approveRoleList.get(i);
            workFlowOrderDto.setApprove_state(state);
            workFlowOrderDto.setApproveRoleId(roleId);

            workFlowOrderService.addWorkFlowOrder(workFlowOrderDto);
        }
        return ResponseEntity.ok("Successfully");
    }

}
