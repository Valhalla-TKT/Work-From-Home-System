/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.work_flow_status.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.api.work_flow_status.dto.WorkFlowStatusDto;

@Service
public interface WorkFlowStatusService {
	void createWorkFlowStatus(Long userId, Long formId, Long approverId) throws Exception;
    WorkFlowStatusDto getWorkFlowStatus(Long id);
    List<WorkFlowStatusDto> getWorkFlowStatusWithForm(Long id);
    void updateStatus(Long id, WorkFlowStatusDto workFlowStatusDto) throws Exception;
//    WorkFlowStatusDto getWorkFlowStatusWithApprover(Long id);
    WorkFlowStatusDto getByUserIdAndFormId(Long userId, Long formId);
	void updateApproverStatus(Long id, boolean state, Date approveDate, String reason);
}
