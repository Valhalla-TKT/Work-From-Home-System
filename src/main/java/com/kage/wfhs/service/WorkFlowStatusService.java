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
	void createWorkFlowStatus(long userId, long formId) throws Exception;
    WorkFlowStatusDto getWorkFlowStatus(long id);
    List<WorkFlowStatusDto> getWorkFlowStatusWithForm(long id);
    void updateStatus(long id, WorkFlowStatusDto workFlowStatusDto) throws Exception;
    WorkFlowStatusDto getWorkFlowStatusWithApprover(long id);
    WorkFlowStatusDto getByUserIdAndFormId(long userId, long formId);
}
