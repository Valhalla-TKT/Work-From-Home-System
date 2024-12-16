package com.kage.wfhs.api.work_from_abroad_information.service;

import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationApplyDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationDto;

public interface WorkFromAbroadInformationService {
    void addWorkFromAbroadInformation(Long formLastId, WorkFromAbroadInformationApplyDto workFromAbroadInformationApplyDto);
    WorkFromAbroadInformationDto getWorkFromAbroadInformationByFormID(Long formId);

    void saveApplicantAppliedDate(String applicantAppliedDate, Long formId);
    void saveApproverSignedDate(Long userId, String signedDate, Long formId);
}
