package com.kage.wfhs.api.work_from_abroad_information.service.impl;

import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.approve_roles.repository.ApproveRoleRepository;
import com.kage.wfhs.api.register_forms.model.RegisterForm;
import com.kage.wfhs.api.register_forms.repository.RegisterFormRepository;
import com.kage.wfhs.api.users.model.User;
import com.kage.wfhs.api.users.repository.UserRepository;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadFormListDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationApplyDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationDto;
import com.kage.wfhs.api.work_from_abroad_information.model.WorkFromAbroadInformation;
import com.kage.wfhs.api.work_from_abroad_information.repository.WorkFromAbroadInformationRepository;
import com.kage.wfhs.api.work_from_abroad_information.service.WorkFromAbroadInformationService;
import com.kage.wfhs.common.exception.ResourceNotFoundException;
import com.kage.wfhs.common.util.EncryptionUtils;
import com.kage.wfhs.common.util.EntityUtil;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

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
            workFromAbroadInformation = new WorkFromAbroadInformation();
            workFromAbroadInformation.setRegisterFormId(formId);

            RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepository, formId);
            registerForm.setWfaUser(true);
            EntityUtil.saveEntityWithoutReturn(registerFormRepository, registerForm, "Register Form");

            workFromAbroadInformation.setApplicantId(registerForm.getApplicant().getId());
            workFromAbroadInformation.setApplicantAppliedCheckbox1(true);
            workFromAbroadInformation.setApplicantAppliedCheckbox2(true);
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date parsedDate = dateFormat.parse(applicantAppliedDate);
            workFromAbroadInformation.setApplicantAppliedDate(parsedDate);
            workFromAbroadInformation.setApplicantSignedDate(parsedDate);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format for applicantAppliedDate");
        }
        EntityUtil.saveEntityWithoutReturn(workFromAbroadInformationRepository, workFromAbroadInformation, "Work From Abroad Information");
    }

    @Override
    public void saveApproverSignedDate(Long approverId, String signedDate, Long formId) {
        WorkFromAbroadInformation workFromAbroadInformation = workFromAbroadInformationRepository
                .findByRegisterFormId(formId)
                .orElseThrow(() -> new ResourceNotFoundException("Work From Abroad Information Not Found"));
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            Date parsedDate = dateFormat.parse(signedDate);
            User approver = userRepository.findById(approverId)
                    .orElseThrow(() -> new IllegalArgumentException("Approver not found for ID: " + approverId));

            List<User> approvers = Collections.singletonList(approver);
            
            ApproveRole approveRole = approveRoleRepository.findByUsers(approvers);
            if (approveRole == null) {
                throw new IllegalArgumentException("Approval role not found for approvers: " + approvers);
            }

            String roleName = approveRole.getName();

            Runnable action = getRunnable(workFromAbroadInformation, parsedDate, roleName, approver.getName());
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

    @SneakyThrows
    @Override
    public List<WorkFromAbroadFormListDto> getWorkFromAbroadFormList() {
        List<WorkFromAbroadInformation> workFromAbroadInformationList = workFromAbroadInformationRepository.findAll();

        return workFromAbroadInformationList.stream()
                .map(this::mapToWorkFromAbroadFormListDto)
                .collect(Collectors.toList());
    }

    /**
     * Maps WorkFromAbroadInformation entity to WorkFromAbroadFormListDto.
     *
     * @param entity The WorkFromAbroadInformation entity.
     * @return The corresponding WorkFromAbroadFormListDto.
     */
    private WorkFromAbroadFormListDto mapToWorkFromAbroadFormListDto(WorkFromAbroadInformation entity) {
        WorkFromAbroadFormListDto dto = new WorkFromAbroadFormListDto();
        try {
            User applicant = userRepository.findById(entity.getApplicantId())
                    .orElseThrow(() -> new IllegalArgumentException("Applicant not found for ID: " + entity.getApplicantId()));
            dto.setApplicantName(applicant.getName());
            dto.setApplicantStaffId(getStaffIdFromApplicant(entity.getApplicantId()));
            dto.setApplicantDivision(getDivisionFromApplicant(entity.getApplicantId()));
            dto.setApplicantDepartment(getDepartmentFromApplicant(entity.getApplicantId()));
            dto.setApplicantTeam(getTeamFromApplicant(entity.getApplicantId()));
            try {
                dto.setHashFormId(EncryptionUtils.encrypt(entity.getRegisterFormId().toString()));
            } catch (Exception e) {
                throw new RuntimeException("Error while encrypting form ID for WorkFromAbroadInformation entity", e);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while mapping WorkFromAbroadInformation entity", e);
        }
        return dto;
    }

    /**
     * Retrieves the staff ID of the applicant based on the applicant ID.
     *
     * @param applicantId The ID of the applicant.
     * @return The staff ID.
     */
    private String getStaffIdFromApplicant(Long applicantId) {
        return userRepository.findById(applicantId)
                .map(User::getStaffId)
                .orElse("Unknown Staff ID");
    }

    /**
     * Retrieves the division name of the applicant based on the applicant ID.
     *
     * @param applicantId The ID of the applicant.
     * @return The division name.
     */
    private String getDivisionFromApplicant(Long applicantId) {
        return userRepository.findById(applicantId)
                .map(user -> user.getDivision() != null ? user.getDivision().getName() : "No Division Assigned")
                .orElse("Unknown Department");
    }

    /**
     * Retrieves the department name of the applicant based on the applicant ID.
     *
     * @param applicantId The ID of the applicant.
     * @return The department name.
     */
    private String getDepartmentFromApplicant(Long applicantId) {
        return userRepository.findById(applicantId)
                .map(user -> user.getDepartment() != null ? user.getDepartment().getName() : "No Department Assigned")
                .orElse("Unknown Department");
    }

    /**
     * Retrieves the team name of the applicant based on the applicant ID.
     *
     * @param applicantId The ID of the applicant.
     * @return The team name.
     */
    private String getTeamFromApplicant(Long applicantId) {
        return userRepository.findById(applicantId)
                .map(user -> user.getTeam() != null ? user.getTeam().getName() : "No Team Assigned")
                .orElse("Unknown Team");
    }

    private static Runnable getRunnable(WorkFromAbroadInformation workFromAbroadInformation, Date parsedDate, String roleName, String approverName) {
        Map<String, Runnable> roleActions = new HashMap<>();
        roleActions.put("PROJECT_MANAGER", () -> {
            workFromAbroadInformation.setProjectManagerApprovedDate(parsedDate);
            workFromAbroadInformation.setProjectManagerName(approverName);
        });
        roleActions.put("DEPARTMENT_HEAD", () -> {
            workFromAbroadInformation.setDeptHeadApprovedDate(parsedDate);
            workFromAbroadInformation.setDeptHeadName(approverName);
        });
        roleActions.put("DIVISION_HEAD", () -> {
            workFromAbroadInformation.setDivisionHeadApprovedDate(parsedDate);
            workFromAbroadInformation.setDivisionHeadName(approverName);
        });
        return roleActions.get(roleName);
    }
}
