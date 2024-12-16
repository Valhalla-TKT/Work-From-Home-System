package com.kage.wfhs.api.work_from_abroad_information.service.impl;

import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.approve_roles.repository.ApproveRoleRepository;
import com.kage.wfhs.api.register_forms.model.RegisterForm;
import com.kage.wfhs.api.register_forms.repository.RegisterFormRepository;
import com.kage.wfhs.api.users.model.User;
import com.kage.wfhs.api.users.repository.UserRepository;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationApplyDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationDto;
import com.kage.wfhs.api.work_from_abroad_information.model.WorkFromAbroadInformation;
import com.kage.wfhs.api.work_from_abroad_information.repository.WorkFromAbroadInformationRepository;
import com.kage.wfhs.api.work_from_abroad_information.service.WorkFromAbroadInformationService;
import com.kage.wfhs.common.exception.ResourceNotFoundException;
import com.kage.wfhs.common.util.EntityUtil;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@AllArgsConstructor
public class WorkFromAbroadInformationServiceImplement implements WorkFromAbroadInformationService {

    private final ModelMapper modelMapper;

    private final RegisterFormRepository registerFormRepository;

    private final WorkFromAbroadInformationRepository workFromAbroadInformationRepository;

    private final UserRepository userRepository;

    private final ApproveRoleRepository approveRoleRepository;

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

    @Override
    public WorkFromAbroadInformationDto getWorkFromAbroadInformationByFormID(Long formId) {
        WorkFromAbroadInformation workFromAbroadInformation = workFromAbroadInformationRepository.findByRegisterFormId(formId).orElse(null);
        if (workFromAbroadInformation == null) {
            throw new ResourceNotFoundException("Work From Abroad Information Not Found");
        }
        WorkFromAbroadInformationDto workFromAbroadInformationDto = new WorkFromAbroadInformationDto();
        modelMapper.map(workFromAbroadInformation, workFromAbroadInformationDto);
        workFromAbroadInformationDto.setApplicantName(EntityUtil.getEntityById(userRepository, workFromAbroadInformationDto.getApplicantId()).getName());
        return workFromAbroadInformationDto;
    }

    @Override
    public void saveApplicantAppliedDate(String applicantAppliedDate, Long formId) {
        WorkFromAbroadInformation workFromAbroadInformation = workFromAbroadInformationRepository.findByRegisterFormId(formId).orElse(null);
        if (workFromAbroadInformation == null) {
            throw new ResourceNotFoundException("Work From Abroad Information Not Found");
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date parsedDate = dateFormat.parse(applicantAppliedDate);
            workFromAbroadInformation.setApplicantAppliedDate(parsedDate);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format for applicantAppliedDate");
        }
        EntityUtil.saveEntityWithoutReturn(workFromAbroadInformationRepository, workFromAbroadInformation, "Work From Abroad Information");
    }

    @Override
    public void saveApproverSignedDate(Long userId, String signedDate, Long formId) {
        WorkFromAbroadInformation workFromAbroadInformation = workFromAbroadInformationRepository.findByRegisterFormId(formId).orElse(null);
        if (workFromAbroadInformation == null) {
            throw new ResourceNotFoundException("Work From Abroad Information Not Found");
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date parsedDate = dateFormat.parse(signedDate);
            User user = userRepository.findById(userId).orElse(null);
            List<User> users = Collections.singletonList(user);
            
            ApproveRole approveRole = approveRoleRepository.findByUsers(users);
            if (approveRole == null) {
                throw new IllegalArgumentException("Approval role not found for users: " + users);
            }

            String roleName = approveRole.getName();

            Runnable action = getRunnable(workFromAbroadInformation, parsedDate, roleName);
            if (action != null) {
                action.run();
            } else {
                throw new IllegalArgumentException("Unknown role: " + roleName);
            }

        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format for applicantAppliedDate");
        }
        EntityUtil.saveEntityWithoutReturn(workFromAbroadInformationRepository, workFromAbroadInformation, "Work From Abroad Information");
    }

    private static Runnable getRunnable(WorkFromAbroadInformation workFromAbroadInformation, Date parsedDate, String roleName) {
        Map<String, Runnable> roleActions = new HashMap<>();
        roleActions.put("PROJECT_MANAGER", () -> workFromAbroadInformation.setProjectManagerApprovedDate(parsedDate));
        roleActions.put("DEPARTMENT_HEAD", () -> workFromAbroadInformation.setDeptHeadApprovedDate(parsedDate));
        roleActions.put("DIVISION_HEAD", () -> workFromAbroadInformation.setDivisionHeadApprovedDate(parsedDate));
        return roleActions.get(roleName);
    }
}
