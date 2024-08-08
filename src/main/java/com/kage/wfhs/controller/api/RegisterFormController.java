/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;

import com.kage.wfhs.dto.CaptureDto;
import com.kage.wfhs.dto.RegisterFormDto;
import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.dto.WorkFlowStatusDto;
import com.kage.wfhs.dto.form.FormHistoryDto;
import com.kage.wfhs.dto.form.FormListDto;
import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.WorkFlowStatus;
import com.kage.wfhs.repository.WorkFlowStatusRepository;
import com.kage.wfhs.service.*;
import com.kage.wfhs.util.Helper;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/api/registerform")
public class RegisterFormController {
    @Autowired
    private final RegisterFormService registerFormService;
    
    @Autowired
    private final WorkFlowStatusService workFlowStatusService;
    
    @Autowired
    private final CaptureService captureService;
    
    @Autowired
    private final UserService userService;
    
    @Autowired
    private final WorkFlowOrderService workFlowOrderService;
    
    @Autowired
    private final ApproveRoleService approveRoleService;
    
    @Autowired
    private final Helper helper;
    
    @Autowired
    private final ModelMapper modelMapper;
    
    private final WorkFlowStatusRepository workFlowStatusRepo;
    
    private final ExcelService excelService;

    @PostMapping("/create")
    public ResponseEntity<String> createForm(
            @RequestPart("data") RegisterFormDto registerFormDto,
            @RequestPart(value = "operatingSystem", required = false) MultipartFile operationSystem,
            @RequestPart(value = "securityPatch", required = false) MultipartFile securityPatch,
            @RequestPart(value = "antivirusSoftware", required = false) MultipartFile antivirusSoftware,
            @RequestPart(value = "antivirusPattern", required = false) MultipartFile antivirusPattern,
            @RequestPart(value = "antivirusFullScan", required = false) MultipartFile antivirusFullScan,
            @RequestPart(value = "signature", required = false) MultipartFile signature
    ) throws Exception {

        registerFormDto.setSignedDate(registerFormDto.getSignedDate());
        registerFormDto.setOperationSystemInput(operationSystem);
        registerFormDto.setSecurityPatchInput(securityPatch);
        registerFormDto.setAntivirusSoftwareInput(antivirusSoftware);
        registerFormDto.setAntivirusPatternInput(antivirusPattern);
        registerFormDto.setAntivirusFullScanInput(antivirusFullScan);
        registerFormDto.setSignatureInput(signature);
        registerFormService.createRegisterForm(registerFormDto);
        workFlowStatusService.createWorkFlowStatus(registerFormDto.getApplicantId(), registerFormService.getFormLastId(), registerFormDto.getApproverId());
        return ResponseEntity.ok("Request Form Successful....");
    }

    @PostMapping("/getFormById")
    public ResponseEntity<Map<String, Object>> getForm(@RequestParam(value = "formId") long formId, @RequestParam(value = "userId") long userId, Model model) {
        RegisterFormDto registerForm = registerFormService.getRegisterForm(formId);
        CaptureDto captureDto = captureService.getCaptureByRegisterForm(formId);
        WorkFlowStatusDto workFlowStatusDto = workFlowStatusService.getByUserIdAndFormId(userId, formId);
        List<WorkFlowStatusDto> workFlowStatusDtos = workFlowStatusService.getWorkFlowStatusWithForm(formId);
        UserDto applicant = userService.getUserById(registerForm.getApplicantId());
        UserDto requester = userService.getUserById(registerForm.getRequesterId());
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("formStatus", workFlowStatusDto);
        responseData.put("workFlowStatus", workFlowStatusDtos);
        responseData.put("registerForm", registerForm);
        responseData.put("capture", captureDto);
        responseData.put("applicant", applicant);
        responseData.put("requester", requester);
        
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }
    

    
    @PostMapping("/getTeamWithStatus")
    public ResponseEntity<Map<String, Object>> getTeamWithStatus(
            @RequestParam(value = "status") String status,
            @RequestParam(value = "teamId") long teamId,
            @RequestParam(value = "userId") long userId){
        Map<String, Object> responseData = registerFormService.getFormWithStatus(status, teamId, userId, "team");
        //List<RegisterFormDto> registerFormDtoList = (List<RegisterFormDto>) responseData.get("forms");
        return getMapResponseEntity(responseData);
    }

    @PostMapping("/getDepartmentWithStatus")
    public ResponseEntity<Map<String, Object>> getDepartmentWithStatus(
            @RequestParam(value = "status") String status,
            @RequestParam(value = "departmentId") long departmentId,
            @RequestParam(value = "userId") long userId){
        Map<String, Object> responseData = registerFormService.getFormWithStatus(status, departmentId, userId, "department");
        return getMapResponseEntity(responseData);
    }

    private ResponseEntity<Map<String, Object>> getMapResponseEntity(Map<String, Object> responseData) {
        Object formsObject = responseData.get("forms");
        List<FormListDto> registerFormDtoList = new ArrayList<>();
        if (formsObject instanceof List<?>) {
            for (Object item : (List<?>) formsObject) {
                if (item instanceof FormListDto) {
                    registerFormDtoList.add((FormListDto) item);
                } else {
                    throw new ClassCastException("Item in the list is not of type FormListDto");
                }
            }
        } else {
            throw new ClassCastException("'forms' is not a List");
        }
        List<UserDto> applicantList = new ArrayList<>();
        List<UserDto> requesterList = new ArrayList<>();
        return getMapResponseEntity(responseData, registerFormDtoList, applicantList, requesterList);
    }

    private ResponseEntity<Map<String, Object>> getMapResponseEntity(Map<String, Object> responseData, List<FormListDto> registerFormDtoList, List<UserDto> applicantList, List<UserDto> requesterList) {
        for(FormListDto registerFormdto : registerFormDtoList) {
            applicantList.add(modelMapper.map(userService.getUserById(registerFormdto.getApplicant().getId()), UserDto.class));
            requesterList.add(modelMapper.map(userService.getUserById(registerFormdto.getRequester().getId()), UserDto.class));
        }

        responseData.put("applicants", applicantList);
        responseData.put("requesters", requesterList);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/getDivisionWithStatus")
    public ResponseEntity<Map<String, Object>> getDivisionWithStatus(
            @RequestParam(value = "status") String status,
            @RequestParam(value = "divisionId") long divisionId,
            @RequestParam(value = "userId") long userId){
        Map<String, Object> responseData = registerFormService.getFormWithStatus(status, divisionId, userId, "division");
        return getMapResponseEntity(responseData);
    }
    
    @PostMapping("/getAllForms")
    public ResponseEntity<Map<String, Object>> getAllForms(
            @RequestParam(value = "status") String status,
            @RequestParam(value = "userId") long userId){
        Map<String, Object> responseData = registerFormService.getFormWithStatus(status, 1L, userId, "user");
        return getMapResponseEntity(responseData);
    }
    
    
    @PostMapping("/update")
    public ResponseEntity<String> updateStatus(
    		@RequestParam(value = "workFlowStatusId") long workFlowStatusId,
    		@RequestParam(value = "approverId") long approverId,
    		@RequestParam(value = "registerFormId") long registerFormId,
    		@RequestParam(value = "state") boolean state,
    		@RequestParam(value = "reason") String reason,
    		@RequestParam(value = "approveDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date approveDate,
            @RequestParam(value = "newApproverId") long newApproverId
            ) throws Exception{
    	WorkFlowStatusDto workFlowStatusDto = new WorkFlowStatusDto();
    	workFlowStatusDto.setId(workFlowStatusId);
    	workFlowStatusDto.setApproverId(approverId);    	
    	workFlowStatusDto.setRegisterFormId(registerFormId);
    	workFlowStatusDto.setState(state);
    	workFlowStatusDto.setReason(reason);
    	workFlowStatusDto.setApproveDate(approveDate);
        workFlowStatusDto.setNewApproverId(newApproverId);
        workFlowStatusService.updateStatus(workFlowStatusDto.getId(),workFlowStatusDto);
        return ResponseEntity.ok("Work Flow Status is Update Success....");
    }
    
    @PostMapping("/downloadAllForms")
    public ResponseEntity<String> downloadAllForms(
    		@RequestParam("formIds[]") List<Long> formIds, HttpServletResponse response) {
    	response.setContentType("application/octet-stream");
    	registerFormService.exportStaffIdsForOTP(formIds, response);
    	return ResponseEntity.ok("pass");    			
	}
    
    @PostMapping("/uploadExcelServiceDesk")
    public ResponseEntity<String> uploadExcelServiceDesk(
    		@RequestParam("file") MultipartFile file) {
    	try {
    		InputStream inputStream = file.getInputStream();
    		Workbook workbook = WorkbookFactory.create(inputStream);
    		String sheetName = "Staff ID for OTP Sending Proces";            
            excelService.readAndSendEmail(inputStream, sheetName, workbook);
            return ResponseEntity.ok("pass");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.ok("Fail");
        }
    	    			
	}
    
    @PostMapping("/bulkApprove")
    public ResponseEntity<String> bulkApprove(@RequestParam("formIds") List<Long> formIds, @RequestParam("userId") Long userId, @RequestParam("approverId") Long approverId, @RequestParam("reason") String reason) throws Exception {
        for (long id : formIds) {
            System.out.println(id);
        }
    	for (long id : formIds) {
            WorkFlowStatus workFlowStatus = workFlowStatusRepo.findByUserIdAndRegisterFormId(userId, id);
            WorkFlowStatusDto workFlowStatusDto = new WorkFlowStatusDto();
            workFlowStatusDto.setState(true);
            workFlowStatusDto.setRegisterFormId((id));
            workFlowStatusDto.setApproverId(userId);
            workFlowStatusDto.setApproveDate(new Date());
            workFlowStatusDto.setReason(reason);
            workFlowStatusDto.setNewApproverId(approverId);
            workFlowStatusService.updateStatus(workFlowStatus.getId(),workFlowStatusDto);
        }
        return ResponseEntity.ok("Bulk Approve Success");
    }

    @GetMapping("/users/{userId}/form-history")
    public ResponseEntity<Map<String, Object>> retrieveUserFormHistory(@PathVariable("userId") long userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<FormHistoryDto> formHistory = registerFormService.getUserHistory(userId);

            response.put("formHistory", formHistory);

            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            response.put("error", "User not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            response.put("error", "An unexpected error occurred.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/createCeoForm")
    public ResponseEntity<?> createCeoForm(
            @RequestParam(value = "userId") long userId,
            @RequestParam(value = "from_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate,
            @RequestParam(value = "to_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate
    ) {
        try {
            registerFormService.createCeoForm(userId, fromDate, toDate);
            return ResponseEntity.status(HttpStatus.CREATED).body("CEO form created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

}
