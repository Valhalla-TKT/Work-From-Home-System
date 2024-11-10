/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.work_flow_orders.controller;

import com.kage.wfhs.api.work_flow_orders.service.WorkFlowOrderService;
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
        workFlowOrderService.createWorkFlowOrderByApproveRoleIdList(approveRoleList);
        return ResponseEntity.ok("Successfully");
    }

}
