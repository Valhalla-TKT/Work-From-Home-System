package com.kage.wfhs.api.register_forms.service;

import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationApplyDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.kage.wfhs.api.register_forms.dto.RegisterFormDto;

public interface FormApplyService {
    ResponseEntity<String> applyForm(
            RegisterFormDto registerFormDto,
            MultipartFile operationSystem,
            MultipartFile securityPatch,
            MultipartFile antivirusSoftware,
            MultipartFile antivirusPattern,
            MultipartFile antivirusFullScan,
            MultipartFile signature,
            WorkFromAbroadInformationApplyDto workFromAbroadInformationApplyDto
    ) throws Exception;
}
