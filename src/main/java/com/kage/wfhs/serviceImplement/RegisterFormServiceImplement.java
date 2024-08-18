/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.RegisterFormDto;
import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import com.kage.wfhs.dto.form.FormHistoryDto;
import com.kage.wfhs.dto.form.FormListDto;
import com.kage.wfhs.model.*;
import com.kage.wfhs.repository.CaptureRepository;
import com.kage.wfhs.repository.RegisterFormRepository;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.repository.WorkFlowStatusRepository;
import com.kage.wfhs.service.ApproveRoleService;
import com.kage.wfhs.service.RegisterFormService;
import com.kage.wfhs.service.WorkFlowOrderService;
import com.kage.wfhs.util.*;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@AllArgsConstructor
public class RegisterFormServiceImplement implements RegisterFormService {

    private final LogService logService;

    private final RegisterFormRepository registerFormRepo;

    private final UserRepository userRepo;

    private final ModelMapper modelMapper;

//    private final NotificationService notificationService;

    private final CaptureRepository captureRepo;

    private final WorkFlowOrderService workFlowOrderService;

    private final WorkFlowStatusRepository workFlowStatusRepo;

    private static final Logger logger = LoggerFactory.getLogger(RegisterFormServiceImplement.class);

    @Autowired
    private final Helper helper;

    private final ApproveRoleService approveRoleService;

    @Override
    public void createRegisterForm(RegisterFormDto registerFormDto) throws Exception {
        User applicant = EntityUtil.getEntityById(userRepo, registerFormDto.getApplicantId());
        if (applicant.getPositionName() == null || applicant.getPositionName().isEmpty()) {
            applicant.setPositionName(registerFormDto.getPositionName());
            EntityUtil.saveEntity(userRepo, applicant, "User");
        }
        User requster = EntityUtil.getEntityById(userRepo, registerFormDto.getRequesterId());
        RegisterForm registerForm = modelMapper.map(registerFormDto, RegisterForm.class);
        registerForm.setApplicant(applicant);
        registerForm.setRequester(requster);
        registerForm.setSignature(ImageUtil.convertImageToBase64(registerFormDto.getSignatureInput()));
        registerForm.setStatus(Status.PENDING);
        registerFormRepo.save(registerForm);
        //notificationService.savePendingNotification(registerForm.getStatus().name());

        Long formId = registerFormRepo.findLastId();
        Capture capture = new Capture();
        checkOsTypeAndSave(registerFormDto, formId, capture);
        CurrentLoginUserDto formApplier = DtoUtil.map(applicant, CurrentLoginUserDto.class, modelMapper);
        logService.logUserFormApply(formApplier);
    }

    private void checkOsTypeAndSave(RegisterFormDto registerFormDto, Long formId, Capture capture) {
        capture.setOs_type(registerFormDto.getOsType());
        if (capture.getOs_type().equalsIgnoreCase("window")) {
            if(registerFormDto.getAntivirusPatternInput() != null && !registerFormDto.getAntivirusPatternInput().isEmpty()) {
                MultipartFile antivirusPatternInput = registerFormDto.getAntivirusPatternInput();
                if(!antivirusPatternInput.isEmpty()) {
                    capture.setAntivirusPattern(ImageUtil.convertImageToBase64(antivirusPatternInput));
                }
            }

            if(registerFormDto.getAntivirusFullScanInput() != null && !registerFormDto.getAntivirusFullScanInput().isEmpty()) {
                MultipartFile antivirusFullScan = registerFormDto.getAntivirusFullScanInput();
                if(!antivirusFullScan.isEmpty()) {
                    capture.setAntivirusFullScan(ImageUtil.convertImageToBase64(antivirusFullScan));
                }
            }
        }
        if(registerFormDto.getOperationSystemInput() != null && !registerFormDto.getOperationSystemInput().isEmpty()) {
            MultipartFile operatingSystem = registerFormDto.getOperationSystemInput();
            if(!operatingSystem.isEmpty()) {
                capture.setOperationSystem(ImageUtil.convertImageToBase64(operatingSystem));
            }
        }

        if(registerFormDto.getAntivirusSoftwareInput() != null && !registerFormDto.getAntivirusSoftwareInput().isEmpty()) {
            MultipartFile antivirusSoftware = registerFormDto.getAntivirusSoftwareInput();
            if(!antivirusSoftware.isEmpty()) {
                capture.setAntivirusSoftware(ImageUtil.convertImageToBase64(antivirusSoftware));
            }
        }

        if(registerFormDto.getSecurityPatchInput() != null && !registerFormDto.getSecurityPatchInput().isEmpty()) {
            MultipartFile securityPatch = registerFormDto.getSecurityPatchInput();

            if(!securityPatch.isEmpty()) {
                capture.setSecurityPatch(ImageUtil.convertImageToBase64(securityPatch));
            }
        }
        capture.setRegisterForm(formId > 0 ? EntityUtil.getEntityById(registerFormRepo, formId) : null);
        captureRepo.save(capture);
    }

    @Override
    public RegisterFormDto getRegisterForm(Long id) {
        RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepo, id);
        User formRegistererUser = EntityUtil.getEntityById(userRepo, registerForm.getApplicant().getId());
        User registerUser = userRepo.findByStaffId(formRegistererUser.getStaffId());
//    	Position formRegistererPosition = positionRepo.findById(formRegistererUser.getPosition().getId());
//    	formRegistererUser.setPosition(formRegistererPosition);
        registerForm.setApplicant(registerUser);
        return modelMapper.map(registerForm, RegisterFormDto.class);
    }

    @Override
    public List<RegisterFormDto> getAllRegisterForm() {
        List<RegisterForm> registerForms = registerFormRepo.findAll();
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms) {
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public Long getFormLastId() {
        return registerFormRepo.findLastId();
    }

    @Override
    public List<FormListDto> getAllFormSpecificTeam(Long approveRoleId, String status, Long teamId, Long userId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByTeam(approveRoleId, status, teamId);
        return getRegisterFormDtoList(userId, registerForms);
    }

    public List<FormListDto> getRegisterFormByTeamWithoutApproveRoleId(Long approveRoleId, String status, Long teamId, Long userId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByTeamWithoutApproveRoleId(status, teamId, approveRoleId);
        return getRegisterFormDtoList(userId, registerForms);
    }


    private List<FormListDto> getRegisterFormDtoList(Long userId, List<RegisterForm> registerForms) {
        List<FormListDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms) {
            FormListDto registerFormDto = modelMapper.map(registerForm, FormListDto.class);
            registerFormDto.setCurrentStatus(getFormStatusByApproveId(userId, registerFormDto.getId()));
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public List<FormListDto> getAllFormSpecificDepartment(Long approveRoleId, String status, Long departmentId, Long userId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByDepartment(approveRoleId, status, departmentId);
        return getRegisterFormDtoList(userId, registerForms);
    }

    @Override
    public List<FormListDto> getAllFormSpecificDivision(Long approveRoleId, String status, Long teamId, Long userId) {

        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByDivision(approveRoleId, status, teamId);
        return getRegisterFormDtoList(userId, registerForms);
//        List<RegisterFormDto> registerFormList = new ArrayList<>();
//        for (RegisterForm registerForm : registerForms){
//            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
//            registerFormList.add(registerFormDto);
//        }
//        return registerFormList;
    }

    @Override
    public List<FormListDto> getAllFormSpecificTeamAll(Long approveRoleId, Long teamId, Long userId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByTeamAll(approveRoleId, teamId);
        return getRegisterFormDtoList(userId, registerForms);
    }

    public List<FormListDto> getAllFormSpecificTeamAllWithoutStatus(Long teamId, Long userId) {
        List<RegisterForm> registerForms = registerFormRepo.findByUserIdAndTeamId(userId, teamId);
        return getRegisterFormDtoList(userId, registerForms);
    }

    @Override
    public List<FormListDto> getAllFormSpecificDepartmentAll(Long approveRoleId, Long departmentId, Long userId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByDepartmentAll(approveRoleId, departmentId);
        return getRegisterFormDtoList(userId, registerForms);
    }

    private String getFormStatusByApproveId(Long userId, Long registerFormId) {
        return workFlowStatusRepo.findByUserIdAndRegisterFormId(userId, registerFormId).getStatus().toString();
    }

    @Override
    public List<FormListDto> getAllFormSpecificDivisionAll(Long approveRoleId, Long divisionId, Long userId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByDivisionAll(approveRoleId, divisionId);
        return getRegisterFormDtoList(userId, registerForms);
//        List<RegisterFormDto> registerFormList = new ArrayList<>();
//        for (RegisterForm registerForm : registerForms){
//            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
//            registerFormList.add(registerFormDto);
//        }
//        return registerFormList;
    }

    @Override
    public List<RegisterFormDto> getAllForm(Long approveRoleId, String status) {
//        List<RegisterForm> registerForms = registerFormRepo.findRegisterForm(approveRoleId, status);
//        return getRegisterFormDtoList(userId, registerForms);
        List<RegisterForm> registerForms = registerFormRepo.findRegisterForm(approveRoleId, status);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms) {
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public List<RegisterFormDto> getFormAll(Long approveRoleId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormAll(approveRoleId);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms) {
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public void upgradeRegisterForm(Long formId, RegisterFormDto registerFormDto) {
        RegisterForm form = EntityUtil.getEntityById(registerFormRepo, formId);
        modelMapper.map(registerFormDto, form);

        registerFormRepo.save(form);

        Capture capture = captureRepo.findByRegisterFormId(formId);
        checkOsTypeAndSave(registerFormDto, formId, capture);
    }

    @Override
    public void exportStaffIdsForOTP(List<Long> formIds, HttpServletResponse response) {
        List<RegisterForm> formList = registerFormRepo.findAllById(formIds);
        OTPStaffIDExcelGenerator generator = new OTPStaffIDExcelGenerator(formList);
        //form.setCompleteStatus(3);
        this.registerFormRepo.saveAll(formList);
        try {
            generator.export(response);
        } catch (IOException e) {
            logger.error("Error exporting staff IDs for OTP", e);
        }
    }

    public Map<String, Object> getFormWithStatus(String status, long entityId, long userId, String entityName) {
        User user = EntityUtil.getEntityById(userRepo, userId);
        ApproveRole approveRole = helper.getMaxOrder(user.getApproveRoles());

        long orderId = workFlowOrderService.getWorkFlowOrderByApproveRoleId(approveRole.getId()).getId();

        Long approveRoleId = approveRoleService.getIdByWorkFlowOrderId(orderId);

        Map<String, Object> responseData = new HashMap<>();
        List<FormListDto> registerFormDtoList = new ArrayList<>();
        List<RegisterFormDto> registerFormDtoList2;

        if ("team".equalsIgnoreCase(entityName)) {
            if (status.equalsIgnoreCase("ALL")) {
                if(user.getApproveRoles().stream().noneMatch(role -> role.getName().equals("PROJECT_MANAGER"))) {
                    registerFormDtoList = getAllFormSpecificTeamAllWithoutStatus(entityId, userId);
                } else if(user.getApproveRoles().stream().anyMatch(role -> role.getName().equals("PROJECT_MANAGER"))) {
                    registerFormDtoList = getAllFormSpecificTeamAll(approveRoleId, entityId, userId);
                }

            } else {
                if(user.getApproveRoles().stream().noneMatch(role -> role.getName().equals("PROJECT_MANAGER"))) {
                    registerFormDtoList = getRegisterFormByTeamWithoutApproveRoleId(approveRoleId, status, entityId, userId);
                } else if(user.getApproveRoles().stream().anyMatch(role -> role.getName().equals("PROJECT_MANAGER"))) {
                    registerFormDtoList = getAllFormSpecificTeam(approveRoleId, status, entityId, userId);
                }
            }
        } else if ("department".equalsIgnoreCase(entityName)) {
            if (status.equalsIgnoreCase("ALL")) {
                registerFormDtoList = getAllFormSpecificDepartmentAll(approveRoleId, entityId, userId);
            } else {
                registerFormDtoList = getAllFormSpecificDepartment(approveRoleId, status, entityId, userId);
            }
        } else if ("division".equalsIgnoreCase(entityName)) {
            if (status.equalsIgnoreCase("ALL")) {
                registerFormDtoList = getAllFormSpecificDivisionAll(approveRoleId, entityId, userId);
            } else {
                registerFormDtoList = getAllFormSpecificDivision(approveRoleId, status, entityId, userId);
            }
        } else if ("user".equalsIgnoreCase(entityName)) {
            if (status.equalsIgnoreCase("ALL")) {
                registerFormDtoList2 = getFormAll(approveRoleId);
                for (RegisterFormDto registerFormDto : registerFormDtoList2) {
                    RegisterForm registerForm = modelMapper.map(registerFormDto, RegisterForm.class);
                    FormListDto formListDto = modelMapper.map(registerForm, FormListDto.class);
//                    formListDto.setId(registerFormDto.getId());
//                    formListDto.setApplicant(registerFormDto.getApplicant());
//                    formListDto.setRequester(registerFormDto.getRequester());
                    formListDto.setCurrentStatus(getFormStatusByApproveId(userId, registerFormDto.getId()));
                    registerFormDtoList.add(formListDto);
                    //registerFormDtoList.add(formListDto);
                }
            } else {
                registerFormDtoList2 = getAllForm(approveRoleId, status);
                for (RegisterFormDto registerFormDto : registerFormDtoList2) {
                    RegisterForm registerForm = modelMapper.map(registerFormDto, RegisterForm.class);
                    FormListDto formListDto = modelMapper.map(registerForm, FormListDto.class);
//                    formListDto.setId(registerFormDto.getId());
//                    formListDto.setApplicant(registerFormDto.getApplicant());
//                    formListDto.setRequester(registerFormDto.getRequester());
                    formListDto.setCurrentStatus(getFormStatusByApproveId(userId, registerFormDto.getId()));
                    registerFormDtoList.add(formListDto);
                }
            }
        }

        responseData.put("forms", registerFormDtoList);

        return responseData;
    }

    @Override
    public List<FormHistoryDto> getUserHistory(long userId) {
        List<RegisterForm> registerForms = registerFormRepo.findByApplicantId(userId);
        List<FormHistoryDto> formList = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM, yyyy");
        for (RegisterForm registerForm : registerForms) {
            FormHistoryDto formHistoryDto = new FormHistoryDto();
            formHistoryDto.setFormId(registerForm.getId());
            if (registerForm.getToDate() != null) {
                LocalDate signedDate = registerForm.getToDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate();
                formHistoryDto.setSignedDate(signedDate.format(formatter));
                formHistoryDto.setStatus(registerForm.getStatus().name());
            }
            formList.add(formHistoryDto);
        }
        return formList;
    }

    @Override
    public void createCeoForm(Long userId, Date fromDate, Date toDate) throws Exception {
        RegisterFormDto registerFormDto = new RegisterFormDto();
        registerFormDto.setApplicantId(userId);
        registerFormDto.setRequesterId(userId);
        registerFormDto.setWorkingPlace("Home");
        registerFormDto.setRequestReason("For Emergency.");
        registerFormDto.setFromDate(fromDate);
        registerFormDto.setToDate(toDate);
        registerFormDto.setRequestPercent(100);
        registerFormDto.setSignedDate(new Date());
        createRegisterForm(registerFormDto);
    }

    @Override
    public void updateForm(RegisterFormDto registerFormDto, boolean hasApprover) throws Exception {
        Long formId = registerFormDto.getId();
        RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepo, formId);
        registerForm.setWorkingPlace(registerFormDto.getWorkingPlace());
        registerForm.setRequestReason(registerFormDto.getRequestReason());
        registerForm.setRequestPercent(registerFormDto.getRequestPercent());
        registerForm.setFromDate(registerFormDto.getFromDate());
        registerForm.setToDate(registerFormDto.getToDate());
        registerForm.setSignedDate(registerFormDto.getSignedDate());
        if(registerForm.getStatus() == Status.REJECT)
            registerForm.setStatus(Status.PENDING);
        //registerFormRepo.save(registerForm);
        EntityUtil.saveEntityWithoutReturn(registerFormRepo, registerForm, "Register Form");
        Capture capture = registerForm.getCapture();
        registerFormDto.setOsType(capture.getOs_type());
        checkOsTypeAndSave(registerFormDto, formId, capture);
        if(hasApprover && (registerFormDto.getApproverId() != null || registerFormDto.getApproverId() != 0)) {
            WorkFlowStatus workFlowStatus = workFlowStatusRepo.findByUserIdAndRegisterFormId(registerFormDto.getApproverId(), formId);
            workFlowStatus.setStatus(Status.PENDING);
            workFlowStatus.setApprove_date(null);
            EntityUtil.saveEntity(workFlowStatusRepo, workFlowStatus, "Work Flow Status");
        }
//        workFlowStatusService.createWorkFlowStatus(registerFormDto.getApplicantId(), registerFormDto.getId(), registerFormDto.getApproverId());
    }
    
    @Override
    public List<FormListDto> getFormsByUserIdAndStatus(Long userId, String status) {
    	List<WorkFlowStatus> workFlowSatusList = new ArrayList<>();
    	if("ALL".equals(status)) {
    		workFlowSatusList = workFlowStatusRepo.findByUserId(userId);
    	} else {
    		try {
                Status enumStatus = Status.valueOf(status.toUpperCase());
                workFlowSatusList = workFlowStatusRepo.findByUserIdAndStatus(userId, enumStatus);
                if(workFlowSatusList == null || workFlowSatusList.isEmpty()) {
            		return null;
            	}
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid status value: " + status);
            }
    	}

		List<RegisterForm> registerFormList = new ArrayList<>();
    	for(WorkFlowStatus workFlowStatus : workFlowSatusList) {
    		RegisterForm registerForm = workFlowStatus.getRegisterForm();
    		registerFormList.add(registerForm);
    	}
    	List<FormListDto> formList = DtoUtil.mapList(registerFormList, FormListDto.class, modelMapper);
    	for(FormListDto form : formList) {
    		form.setCurrentStatus(getFormStatusByApproveId(userId, form.getId()));
    	}
    	return formList;
    	   	
    }

}