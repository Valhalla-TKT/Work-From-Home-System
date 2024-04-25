package com.kage.wfhs.service;

import com.kage.wfhs.dto.ApproveRoleDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ApproveRoleService {
	void createApproveRole(ApproveRoleDto approveRoleDto);

	ApproveRoleDto getApproveRoleById(long id);

	ApproveRoleDto getApproveRoleByName(String name);

	List<ApproveRoleDto> getAllApproveRole();

	long getIdByWorkFlowOrderId(long orderId);

	void deleteApproverById(long id);
}