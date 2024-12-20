/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.work_flow_orders.service.impl;

import com.kage.wfhs.api.work_flow_orders.dto.WorkFlowOrderDto;
import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.work_flow_orders.model.WorkFlowOrder;
import com.kage.wfhs.api.approve_roles.repository.ApproveRoleRepository;
import com.kage.wfhs.api.work_flow_orders.repository.WorkFlowOrderRepository;
import com.kage.wfhs.api.work_flow_orders.service.WorkFlowOrderService;
import com.kage.wfhs.common.util.EntityUtil;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkFlowOrderServiceImplement implements WorkFlowOrderService {

    private final WorkFlowOrderRepository workFlowOrderRepo;
    private final ModelMapper modelMapper;
    private final ApproveRoleRepository approveRoleRepo;

    @Override
    public void addWorkFlowOrder(WorkFlowOrderDto workFlowOrderDto) {
        WorkFlowOrder workFlowOrder = modelMapper.map(workFlowOrderDto, WorkFlowOrder.class);
        ApproveRole approveRole = EntityUtil.getEntityById(approveRoleRepo, workFlowOrderDto.getApproveRoleId());
        workFlowOrder.setApproveRole(workFlowOrderDto.getApproveRoleId() > 0 ? approveRole : null);
        workFlowOrderRepo.save(workFlowOrder);
    }

    @Override
    public List<String> getOrder(int number) {
        List<String> result = new ArrayList<>();
        List<String> approveStateList = new ArrayList<>();
        for (int i = 1; i <= number; i++) {
            // Determine the appropriate suffix for the current number
            String suffix;
            if (i % 100 >= 11 && i % 100 <= 13) {
                suffix = "th";
            } else {
                suffix = switch (i % 10) {
                    case 1 -> "st";
                    case 2 -> "nd";
                    case 3 -> "rd";
                    default -> "th";
                };
            }
            // Build the string and add it to the result list
            String approverString = i + suffix + " Approver";
            result.add(approverString);
        }

        Collections.reverse(result);

        Collections.reverse(result);
        for (int i = 0; i < result.size(); i++) {
            // Set the Approve State based on position
            String approveState;
            if (i == 0) {
                approveState = "Applicant";
            } else if (i == result.size() - 1) {
                approveState = "Final Approver";
            } else {
                approveState = result.get(i - 1);
            }
            approveStateList.add(approveState);
        }
        Collections.reverse(approveStateList);
        return approveStateList;
    }

    @Override
    public WorkFlowOrderDto getWorkFlowOrderByApproveRoleId(Long approveRoleId) {
        WorkFlowOrder workFlowOrder = workFlowOrderRepo.findByApproveRole_Id(approveRoleId);
        return modelMapper.map(workFlowOrder, WorkFlowOrderDto.class);
    }

    @Override
    public WorkFlowOrderDto getWorkFlowOrderByUserId(Long userId) {
        WorkFlowOrder workFlowOrder = workFlowOrderRepo.findByUserId(userId);
        return modelMapper.map(workFlowOrder, WorkFlowOrderDto.class);
    }

    @Override
    @Transactional
    public void createDefaultWorkFlowOrder() {
        List<?> workFlowOrderList = workFlowOrderRepo.findAll();
        if (workFlowOrderList.isEmpty()) {
            List<Long> defaultApproveRoleIdList = Arrays.asList(2L, 8L, 7L, 6L, 5L, 4L, 3L, 1L);
            createOrder(defaultApproveRoleIdList);
        }
    }

    private void createOrder(List<Long> approveRoleIdList) {
        List<String> approveState = getOrder(approveRoleIdList.size());
        WorkFlowOrderDto workFlowOrderDto = new WorkFlowOrderDto();

        for (int i = 0; i < approveState.size(); i++) {
            String state = approveState.get(i);
            long roleId = approveRoleIdList.get(i);
            workFlowOrderDto.setApprove_state(state);
            workFlowOrderDto.setApproveRoleId(roleId);
            addWorkFlowOrder(workFlowOrderDto);
        }
    }

    @Override
    public void createWorkFlowOrderByApproveRoleIdList(List<Long> approveRoleList) {
        workFlowOrderRepo.truncateTable();
        createOrder(approveRoleList);
    }
}