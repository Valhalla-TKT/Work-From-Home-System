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

import com.kage.wfhs.dto.WorkFlowStatusDto;

@Service
public interface WorkFlowStatusService {
	void createWorkFlowStatus(Long userId, Long formId) throws Exception;
    WorkFlowStatusDto getWorkFlowStatus(Long id);
    List<WorkFlowStatusDto> getWorkFlowStatusWithForm(Long id);
    void updateStatus(Long id, WorkFlowStatusDto workFlowStatusDto) throws Exception;
    WorkFlowStatusDto getWorkFlowStatusWithApprover(Long id);
    WorkFlowStatusDto getByUserIdAndFormId(Long userId, Long formId);
}
