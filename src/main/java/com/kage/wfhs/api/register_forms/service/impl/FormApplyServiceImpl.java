package com.kage.wfhs.api.register_forms.service.impl;

import com.kage.wfhs.api.register_forms.dto.RegisterFormDto;
import com.kage.wfhs.api.register_forms.model.RegisterForm;
import com.kage.wfhs.api.register_forms.service.FormApplyService;
import com.kage.wfhs.api.register_forms.service.RegisterFormService;

import com.kage.wfhs.api.work_flow_status.service.WorkFlowStatusService;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationApplyDto;
import com.kage.wfhs.api.work_from_abroad_information.service.WorkFromAbroadInformationService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FormApplyServiceImpl implements FormApplyService {

    private final RegisterFormService registerFormService;
    private final WorkFlowStatusService workFlowStatusService;
    private final WorkFromAbroadInformationService workFromAbroadInformationService;

    public FormApplyServiceImpl(RegisterFormService registerFormService,
                                WorkFlowStatusService workFlowStatusService,
                                WorkFromAbroadInformationService workFromAbroadInformationService) {
        this.registerFormService = registerFormService;
        this.workFlowStatusService = workFlowStatusService;
        this.workFromAbroadInformationService = workFromAbroadInformationService;
    }

    @Override
    public ResponseEntity<String> applyForm(
            RegisterFormDto registerFormDto,
            MultipartFile operationSystem,
            MultipartFile securityPatch,
            MultipartFile antivirusSoftware,
            MultipartFile antivirusPattern,
            MultipartFile antivirusFullScan,
            MultipartFile signature,
            WorkFromAbroadInformationApplyDto workFromAbroadInformationApplyDto) throws Exception {

        registerFormDto.setSignedDate(registerFormDto.getSignedDate());
        registerFormDto.setOperationSystemInput(operationSystem);
        registerFormDto.setSecurityPatchInput(securityPatch);
        registerFormDto.setAntivirusSoftwareInput(antivirusSoftware);
        registerFormDto.setAntivirusPatternInput(antivirusPattern);
        registerFormDto.setAntivirusFullScanInput(antivirusFullScan);
        registerFormDto.setSignatureInput(signature);

        RegisterForm createdRegisterForm = registerFormService.createRegisterForm(registerFormDto);
        workFlowStatusService.createWorkFlowStatus(
                registerFormDto.getApplicantId(),
                createdRegisterForm.getId(),
                registerFormDto.getApproverId()
        );

        // Add for ver 2.2 (Manual ver 1.8 - including WFA)
        if (registerFormDto.isWfaUserStatus()) {
            workFromAbroadInformationService.addWorkFromAbroadInformation(
                    createdRegisterForm.getId(),
                    workFromAbroadInformationApplyDto
            );
        }

        return ResponseEntity.ok("Request Form Successful....");
    }
}
