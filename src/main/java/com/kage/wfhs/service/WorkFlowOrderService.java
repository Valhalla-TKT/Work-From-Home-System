/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.WorkFlowOrderDto;

@Service
public interface WorkFlowOrderService {
	void addWorkFlowOrder(WorkFlowOrderDto workFlowOrderDto);

	List<String> getOrder(int id);

	WorkFlowOrderDto getWorkFlowOrderByApproveRoleId(Long approveRoleId);
	WorkFlowOrderDto getWorkFlowOrderByUserId(Long userId);
	void createDefaultWorkFlowOrder();

    void createWorkFlowOrderByApproveRoleIdList(List<Long> approveRoleList);
}
