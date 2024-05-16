/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.RegisterFormDto;
import com.kage.wfhs.model.Capture;
import com.kage.wfhs.model.Position;
import com.kage.wfhs.model.RegisterForm;
import com.kage.wfhs.model.Status;
import com.kage.wfhs.model.User;
import com.kage.wfhs.repository.CaptureRepository;
import com.kage.wfhs.repository.PositionRepository;
import com.kage.wfhs.repository.RegisterFormRepository;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.service.NotificationService;
import com.kage.wfhs.service.RegisterFormService;
import com.kage.wfhs.util.ImageUtil;
import com.kage.wfhs.util.OTPStaffIDExcelGenerator;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@AllArgsConstructor
public class RegisterFormServiceImplement implements RegisterFormService {

    @Autowired
    private final RegisterFormRepository registerFormRepo;
    
    @Autowired
    private final UserRepository userRepo;
    
    @Autowired
    private final PositionRepository positionRepo;
    
    @Autowired
    private final ModelMapper modelMapper;
    
    @Autowired
    private final NotificationService notificationService;
    
    @Autowired
    private final CaptureRepository captureRepo;

    @Override
    public void createRegisterForm(RegisterFormDto registerFormDto) throws Exception {    	 
        RegisterForm registerForm = modelMapper.map(registerFormDto, RegisterForm.class);
        registerForm.setApplicant(registerFormDto.getApplicantId() > 0 ? userRepo.findById(registerFormDto.getApplicantId()) : null);
        registerForm.setRequester(registerFormDto.getRequesterId() > 0 ? userRepo.findById(registerFormDto.getRequesterId()) : null);
        registerForm.setSignature(ImageUtil.convertImageToBase64(registerFormDto.getSignatureInput()));
        registerForm.setStatus(Status.PENDING);
        registerFormRepo.save(registerForm);
        notificationService.savePendingNotification(registerForm.getStatus().name());

        long formId = registerFormRepo.findLastId();
        Capture capture = new Capture();
        capture.setOs_type(registerFormDto.getOs_type());
        if(capture.getOs_type().equalsIgnoreCase("window")){
	        capture.setAntivirusPattern(ImageUtil.convertImageToBase64(registerFormDto.getAntivirusPatternInput()));
	        capture.setAntivirusFullScan(ImageUtil.convertImageToBase64(registerFormDto.getAntivirusFullScanInput()));
        }
        capture.setOperationSystem(ImageUtil.convertImageToBase64(registerFormDto.getOperationSystemInput()));
        capture.setAntivirusSoftware(ImageUtil.convertImageToBase64(registerFormDto.getAntivirusSoftwareInput()));
        capture.setSecurityPatch(ImageUtil.convertImageToBase64(registerFormDto.getSecurityPatchInput()));
        
        capture.setRegisterForm(formId > 0 ? registerFormRepo.findById(formId) : null);
        captureRepo.save(capture);
    }

    @Override
    public RegisterFormDto getRegisterForm(long id) {
    	RegisterForm registerForm = registerFormRepo.findById(id);
    	User formRegistererUser = userRepo.findById(registerForm.getApplicant().getId());
    	User registerUser = userRepo.findByStaffId(formRegistererUser.getStaff_id());
    	Position formRegistererPosition = positionRepo.findById(formRegistererUser.getPosition().getId());
    	formRegistererUser.setPosition(formRegistererPosition);
    	registerForm.setApplicant(registerUser);
        return modelMapper.map(registerForm, RegisterFormDto.class);
    }

    @Override
    public List<RegisterFormDto> getAllRegisterForm() {
        List<RegisterForm> registerForms = registerFormRepo.findAll();
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public long getFormLastId() {
        return registerFormRepo.findLastId();
    }
    
    @Override
    public List<RegisterFormDto> getAllFormSpecificTeam(long approveRoleId,String status, long teamId) {

        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByTeam(approveRoleId,status, teamId);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;

    }

    @Override
    public List<RegisterFormDto> getAllFormSpecificDepartment(long approveRoleId,String status, long teamId) {

        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByDepartment(approveRoleId,status, teamId);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public List<RegisterFormDto> getAllFormSpecificDivision(long approveRoleId,String status, long teamId) {

        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByDivision(approveRoleId,status, teamId);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public List<RegisterFormDto> getAllFormSpecificTeamAll(long approveRoleId, long teamId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByTeamAll(approveRoleId, teamId);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public List<RegisterFormDto> getAllFormSpecificDepartmentAll(long approveRoleId, long departmentId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByDepartmentAll(approveRoleId, departmentId);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }

    @Override
    public List<RegisterFormDto> getAllFormSpecificDivisionAll(long approveRoleId, long divisionId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormByDivisionAll(approveRoleId, divisionId);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }
    
    @Override
    public List<RegisterFormDto> getAllForm(long approveRoleId, String status) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterForm(approveRoleId, status);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }
    
    @Override
    public List<RegisterFormDto> getFormAll(long approveRoleId) {
        List<RegisterForm> registerForms = registerFormRepo.findRegisterFormAll(approveRoleId);
        List<RegisterFormDto> registerFormList = new ArrayList<>();
        for (RegisterForm registerForm : registerForms){
            RegisterFormDto registerFormDto = modelMapper.map(registerForm, RegisterFormDto.class);
            registerFormList.add(registerFormDto);
        }
        return registerFormList;
    }
    
    @Override
    public void upgradeRegisterForm(long formId, RegisterFormDto registerFormDto) {
        RegisterForm form = registerFormRepo.findById(formId);
        modelMapper.map(registerFormDto, form);

        registerFormRepo.save(form);

        Capture capture = captureRepo.findByRegisterFormId(formId);
        capture.setOs_type(registerFormDto.getOs_type());
        if(capture.getOs_type().equalsIgnoreCase("window")){
	        capture.setAntivirusPattern(ImageUtil.convertImageToBase64(registerFormDto.getAntivirusPatternInput()));
	        capture.setAntivirusFullScan(ImageUtil.convertImageToBase64(registerFormDto.getAntivirusFullScanInput()));
        }
        capture.setOperationSystem(ImageUtil.convertImageToBase64(registerFormDto.getOperationSystemInput()));
        capture.setAntivirusSoftware(ImageUtil.convertImageToBase64(registerFormDto.getAntivirusSoftwareInput()));
        capture.setSecurityPatch(ImageUtil.convertImageToBase64(registerFormDto.getSecurityPatchInput()));
        
        capture.setRegisterForm(formId > 0 ? registerFormRepo.findById(formId) : null);
        captureRepo.save(capture);
    }

	@Override
	public void exportStaffIdsForOTP(List<Long> formIds, HttpServletResponse response) {
		List<RegisterForm> formList = registerFormRepo.findAllById(formIds);
		if (formList != null) {
			OTPStaffIDExcelGenerator generator = new OTPStaffIDExcelGenerator(formList);
			for (RegisterForm form : formList) {
				//form.setCompleteStatus(3);
				this.registerFormRepo.save(form);
			}
			try {
				generator.export(response);
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			System.out.println("There is no Form List for OTP");
		}
	}

}