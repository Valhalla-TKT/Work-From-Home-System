package com.kage.wfhs.api.work_from_abroad_information.service.impl;

import com.kage.wfhs.api.register_forms.model.RegisterForm;
import com.kage.wfhs.api.register_forms.repository.RegisterFormRepository;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationApplyDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationDto;
import com.kage.wfhs.api.work_from_abroad_information.model.WorkFromAbroadInformation;
import com.kage.wfhs.api.work_from_abroad_information.repository.WorkFromAbroadInformationRepository;
import com.kage.wfhs.api.work_from_abroad_information.service.WorkFromAbroadInformationService;
import com.kage.wfhs.common.util.EntityUtil;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WorkFromAbroadInformationServiceImplement implements WorkFromAbroadInformationService {

    private final ModelMapper modelMapper;

    private final RegisterFormRepository registerFormRepository;

    private final WorkFromAbroadInformationRepository workFromAbroadInformationRepository;

    @Override
    public void addWorkFromAbroadInformation(Long formLastId, WorkFromAbroadInformationApplyDto workFromAbroadInformationApplyDto) {
        WorkFromAbroadInformation workFromAbroadInformation = new WorkFromAbroadInformation();
        RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepository, formLastId);
        workFromAbroadInformation.setRegisterFormId(registerForm.getId());

        workFromAbroadInformation.setApplicantId(workFromAbroadInformationApplyDto.getApplicantId());
        workFromAbroadInformation.setApplicantAppliedDate(workFromAbroadInformationApplyDto.getApplicantAppliedDate());
        workFromAbroadInformation.setApplicantAppliedCheckbox1(workFromAbroadInformationApplyDto.isApplicantAppliedCheckbox1());
        workFromAbroadInformation.setApplicantAppliedCheckbox2(workFromAbroadInformationApplyDto.isApplicantAppliedCheckbox2());
        workFromAbroadInformation.setApplicantSignedDate(workFromAbroadInformationApplyDto.getApplicantSignedDate());
        workFromAbroadInformation.setApplicantSignature(workFromAbroadInformationApplyDto.getApplicantSignature());

        EntityUtil.saveEntityWithoutReturn(workFromAbroadInformationRepository, workFromAbroadInformation, "Work From Abroad Information");
    }
}
