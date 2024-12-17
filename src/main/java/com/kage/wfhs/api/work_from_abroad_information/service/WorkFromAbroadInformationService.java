package com.kage.wfhs.api.work_from_abroad_information.service;

import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadFormListDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationApplyDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationDto;

import java.util.List;

public interface WorkFromAbroadInformationService {
    void addWorkFromAbroadInformation(Long formLastId, WorkFromAbroadInformationApplyDto workFromAbroadInformationApplyDto);
    WorkFromAbroadInformationDto getWorkFromAbroadInformationByFormID(Long formId);

    void saveApplicantAppliedDate(String applicantAppliedDate, Long formId);
    void saveApproverSignedDate(Long approverId, String signedDate, Long formId);

    List<WorkFromAbroadFormListDto> getWorkFromAbroadFormList();
}
