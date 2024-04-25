package com.kage.wfhs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.WorkFlowOrderDto;

@Service
public interface WorkFlowOrderService {
	void addWorkFlowOrder(WorkFlowOrderDto workFlowOrderDto);

	List<String> getOrder(int id);

	WorkFlowOrderDto getWorkFlowOrderByApproveRoleId(long approveRoleId);
	WorkFlowOrderDto getWorkFlowOrderByUserId(long userId);
}
