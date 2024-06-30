/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.WorkFlowStatusDto;
import com.kage.wfhs.model.*;
import com.kage.wfhs.repository.*;
import com.kage.wfhs.service.LedgerService;
import com.kage.wfhs.service.NotificationService;
import com.kage.wfhs.service.WorkFlowStatusService;
import com.kage.wfhs.util.EntityUtil;
import com.kage.wfhs.util.Helper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@AllArgsConstructor
public class WorkFlowStatusServiceImplement implements WorkFlowStatusService {
	@Autowired
    private final WorkFlowStatusRepository workFlowStatusRepo;    
	
    @Autowired
    private final ModelMapper modelMapper;
    
    @Autowired
    private final RegisterFormRepository registerFormRepo;
    
    @Autowired
    private final UserRepository userRepo;
    
    @Autowired
    private final ApproveRoleRepository approveRoleRepo;
    
    @Autowired
    private final Helper helper;
    
    @Autowired
    private final NotificationService notificationService;
    
    @Autowired
    private final LedgerService ledgerService;

    @Override
    public void createWorkFlowStatus(Long userId, Long formId) throws Exception {
        User applicant = EntityUtil.getEntityById(userRepo, userId);
        Set<ApproveRole> approveRoles = applicant.getApproveRoles();
        RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepo, formId);
        boolean hasCEO = false;
        boolean hasSERVICE_DESK = false;
        for(ApproveRole approveRole : approveRoles) {
            if(approveRole.getName().equalsIgnoreCase("CEO")) {
                hasCEO = true;
                break;
            } else if (approveRole.getName().equalsIgnoreCase("SERVICE_DESK")) {
                hasSERVICE_DESK = true;
                break;
            }
        }
        if(hasCEO){
            
            registerForm.setStatus(Status.APPROVE);
            registerFormRepo.save(registerForm);
            createApproval(registerForm.getId(), "SERVICE_DESK");
        } else if (hasSERVICE_DESK) {
            createApproval(registerForm.getId(), "CISO");
        } else {
            ApproveRole approveRole = helper.getMaxOrder(applicant.getApproveRoles());
            System.out.println("Approve Role: " + approveRole.getName());
            List<User> approvers = findApprovers(applicant, approveRole);
            for (User user : approvers) {
                WorkFlowStatus workFlowStatus = new WorkFlowStatus();
                workFlowStatus.setStatus(Status.PENDING);
                workFlowStatus.setRegisterForm(formId > 0 ? EntityUtil.getEntityById(registerFormRepo, formId) : null);
                workFlowStatus.setUser(user);
                workFlowStatus.setApproveRole(approveRole);
                workFlowStatusRepo.save(workFlowStatus);
                //notificationService.sendPendingApproveRejectNotificationToServiceDesk(workFlowStatus.getRegisterForm().getId(), applicant.getId(), workFlowStatus.getUser().getId(), workFlowStatus.getStatus().name());
            }
        }

    }

    private List<User> findApprovers(User applicant, ApproveRole approveRole) {
        List<User> approverList = userRepo.findByTeamAndApproveRole(applicant.getTeam().getId(), approveRole.getId());

        if (isValidApprovers(approverList)) {
            return approverList;
        }
        approverList = userRepo.findByDepartmentAndApproveRole(applicant.getTeam().getDepartment().getId(), approveRole.getId());
        if (isValidApprovers(approverList)) {
            return approverList;
        }
        approverList = userRepo.findByDivisionAndApproveRole(applicant.getTeam().getDepartment().getDivision().getId(), approveRole.getId());
        if (isValidApprovers(approverList)) {
            return approverList;
        }
        if (approveRole.getName().equals("CISO")) {
            return userRepo.findByApproveRoleName("CISO");
        } else {
            return userRepo.findByApproveRole(approveRole.getId());
        }
    }
    private boolean isValidApprovers(List<User> approverList) {
        return approverList != null && !approverList.isEmpty();
    }



    @Override
    public WorkFlowStatusDto getWorkFlowStatus(Long id) {
        return modelMapper.map(workFlowStatusRepo.findById(id), WorkFlowStatusDto.class);
    }

    @Override
    public List<WorkFlowStatusDto> getWorkFlowStatusWithForm(Long id) {
        List<WorkFlowStatus> workFlowStatuses = workFlowStatusRepo.findByRegisterFormId(id);
        List<WorkFlowStatusDto> workFlowStatusList = new ArrayList<>();
        for (WorkFlowStatus workFlowStatus : workFlowStatuses){
            WorkFlowStatusDto workFlowStatusDto = modelMapper.map(workFlowStatus, WorkFlowStatusDto.class);
            workFlowStatusList.add(workFlowStatusDto);
        }
        return workFlowStatusList;
    }



    @Override
    public void updateStatus(Long id, WorkFlowStatusDto workFlowStatusDto) throws Exception {
    	WorkFlowStatus workFlowStatus = EntityUtil.getEntityById(workFlowStatusRepo, id);      
        RegisterForm form = registerFormRepo.findByWorkFlowStatusId(id);
        System.out.println("hello aye thu" + form.getApplicant().getName());

        WorkFlowStatus cisoApprove = workFlowStatusRepo.findByApproveRoleNameAndFormId(form.getId(), "CISO");
        if(cisoApprove != null){
            System.out.println("hi");
            System.out.println(cisoApprove.getUser().getName());
            cisoApprove.setStatus(Status.PENDING);
            cisoApprove.setReason(null);
            cisoApprove.setApprove_date(null);
            workFlowStatusRepo.save(cisoApprove);
        }
        System.out.println("hi");
        Status newStatus = workFlowStatusDto.isState() ? Status.APPROVE : Status.REJECT;
        workFlowStatus.setStatus(newStatus);
        workFlowStatus.setApprove_date(workFlowStatusDto.getApproveDate());
        workFlowStatus.setReason(workFlowStatusDto.getReason());
        workFlowStatusRepo.save(workFlowStatus);
            String userRole = getUserRole(workFlowStatus);
            if(!workFlowStatusDto.isState() && !Objects.equals(userRole, "CISO") && !Objects.equals(userRole, "SERVICE_DESK") ){
                RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepo, workFlowStatusDto.getRegisterFormId());
                registerForm.setStatus(Status.REJECT);
                registerFormRepo.save(registerForm);
                notificationService.sendPendingApproveRejectNotificationToServiceDesk(registerForm.getId(), registerForm.getApplicant().getId(), registerForm.getRequester().getId(), registerForm.getStatus().name());
            } 
            

            if (Objects.equals(userRole, "CISO")) {
                if (workFlowStatusDto.isState()) {
                    createApproval(workFlowStatusDto.getRegisterFormId(), "CEO");
                    List<WorkFlowStatus> existingApproval = workFlowStatusRepo.findByUserApproveRolesNameAndRegisterFormId("SERVICE_DESK", workFlowStatusDto.getRegisterFormId() );
                    if (existingApproval != null) {
                        workFlowStatusRepo.deleteAll(existingApproval);
                    }
                } else {
                    createApproval(workFlowStatusDto.getRegisterFormId(), "SERVICE_DESK");
                }
            } else if (Objects.equals(userRole, "CEO") && workFlowStatusDto.isState()) {
                createApproval(workFlowStatusDto.getRegisterFormId(), "SERVICE_DESK");
                RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepo, workFlowStatusDto.getRegisterFormId());
                registerForm.setStatus(Status.APPROVE);
                registerFormRepo.save(registerForm);
                ledgerService.createLedger(registerForm.getId());
                //notificationService.sendPendingApproveRejectNotificationToServiceDesk(registerForm.getId(), registerForm.getApplicant().getId(), registerForm.getStatus().name());
            } else if (Objects.equals(userRole, "SERVICE_DESK") && !workFlowStatusDto.isState()) {
//                RegisterForm registerForm = registerFormRepo
            }
            else {
            	if(workFlowStatusDto.isState()) {
            		createWorkFlowStatus(workFlowStatusDto.getApproverId(), workFlowStatusDto.getRegisterFormId());
            	}
            }
    }

    @Override
    public WorkFlowStatusDto getWorkFlowStatusWithApprover(Long id) {
        WorkFlowStatus workFlowStatus = workFlowStatusRepo.findByUserId(id);
        return modelMapper.map(workFlowStatus, WorkFlowStatusDto.class);
    }

    private void createApproval(Long registerFormId, String roleName) {       
        WorkFlowStatus workFlowStatus = new WorkFlowStatus();
        workFlowStatus.setStatus(Status.PENDING);
        workFlowStatus.setRegisterForm(EntityUtil.getEntityById(registerFormRepo, registerFormId));
        System.out.println("helloooooooooo CISOOOOOOOOOOOOOOOOO");
        workFlowStatus.setUser(userRepo.findByApproveRoles_Name(roleName));
        workFlowStatus.setApproveRole(approveRoleRepo.findByName(roleName));
        workFlowStatusRepo.save(workFlowStatus);
        
    }

    private String getUserRole(WorkFlowStatus workFlowStatus) {
        Set<ApproveRole> approveRoles = workFlowStatus.getUser().getApproveRoles();
        for (ApproveRole role : approveRoles) {
            switch (role.getName()) {
                case "CISO" -> {
                    return "CISO";
                }
                case "CEO" -> {
                    return "CEO";
                }
                case "SERVICE_DESK" -> {
                    return "SERVICE_DESK";
                }
            }
        }
        return null;
    }
    @Override
    public WorkFlowStatusDto getByUserIdAndFormId(Long userId, Long formId) {
        WorkFlowStatus workFlowStatus = workFlowStatusRepo.findByUserIdAndRegisterFormId(userId, formId);
        if (workFlowStatus != null) {
            return modelMapper.map(workFlowStatus, WorkFlowStatusDto.class);
        } else {
            return null;
        }
    }

}
