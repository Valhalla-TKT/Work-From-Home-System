/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.work_flow_status.service.impl;

import com.kage.wfhs.api.register_forms.model.RegisterForm;
import com.kage.wfhs.api.register_forms.repository.RegisterFormRepository;
import com.kage.wfhs.api.users.model.User;
import com.kage.wfhs.api.users.repository.UserRepository;
import com.kage.wfhs.api.work_flow_status.enums.Status;
import com.kage.wfhs.api.work_flow_status.model.WorkFlowStatus;
import com.kage.wfhs.api.work_flow_status.repository.WorkFlowStatusRepository;
import com.kage.wfhs.api.work_flow_status.dto.WorkFlowStatusDto;
import com.kage.wfhs.api.ledger.service.LedgerService;
//import com.kage.wfhs.service.NotificationService;
import com.kage.wfhs.api.work_flow_status.service.WorkFlowStatusService;
import com.kage.wfhs.common.util.EntityUtil;
import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.approve_roles.repository.ApproveRoleRepository;
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
           
//    @Autowired
//    private final NotificationService notificationService;
    
    @Autowired
    private final LedgerService ledgerService;
    @Autowired
    private ApproveRoleRepository approveRoleRepository;

    @Override
    public void createWorkFlowStatus(Long userId, Long formId, Long approverId) throws Exception {
        //User applicant = EntityUtil.getEntityById(userRepo, userId);
        User approver = EntityUtil.getEntityById(userRepo, approverId);
        List<User> users = new ArrayList<>();
        users.add(approver);
        ApproveRole approveRole = approveRoleRepository.findByUsers(users);
        RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepo, formId);
        WorkFlowStatus existingWorkFlowStatus = workFlowStatusRepo.findByUserIdAndRegisterFormId(approverId, formId);
        WorkFlowStatus workFlowStatus;
        if(existingWorkFlowStatus != null) {
            workFlowStatus = existingWorkFlowStatus;
        } else {
            workFlowStatus = new WorkFlowStatus();
        }
        workFlowStatus.setStatus(Status.PENDING);
        workFlowStatus.setRegisterForm(formId > 0 ? registerForm : null);
        workFlowStatus.setUser(approver);
        workFlowStatus.setApproveRole(approveRole);
        EntityUtil.saveEntityWithoutReturn(workFlowStatusRepo, workFlowStatus, "Work Flow Status");
        //workFlowStatusRepo.save(workFlowStatus);
    //    boolean hasCEO = false;
    //    boolean hasSERVICE_DESK = false;
    //    for(ApproveRole approverRole : approveRoles) {
    //        if(approverRole.getName().equalsIgnoreCase("CEO")) {
    //            hasCEO = true;
    //            break;
    //        } else if (approverRole.getName().equalsIgnoreCase("SERVICE_DESK")) {
    //            hasSERVICE_DESK = true;
    //            break;
    //        }
    //    }
    //    if(hasCEO){
    //        registerForm.setStatus(Status.APPROVE);
    //        registerFormRepo.save(registerForm);
    //        createApproval(registerForm.getId(), "SERVICE_DESK");
    //    } else if (hasSERVICE_DESK) {
    //        createApproval(registerForm.getId(), "CISO");
    //    } else {
    //        ApproveRole upperApproveRole = helper.getMaxOrder(applicant.getApproveRoles());
    //        System.out.println("Approve Role: " + upperApproveRole.getName());
    //        List<User> approvers = findApprovers(applicant, approveRole);
    //        for (User user : approvers) {
    //            WorkFlowStatus newWorkFlowStatus = new WorkFlowStatus();
    //            newWorkFlowStatus.setStatus(Status.PENDING);
    //            newWorkFlowStatus.setRegisterForm(formId > 0 ? EntityUtil.getEntityById(registerFormRepo, formId) : null);
    //            newWorkFlowStatus.setUser(user);
    //            newWorkFlowStatus.setApproveRole(upperApproveRole);
    //            workFlowStatusRepo.save(newWorkFlowStatus);
    //            //notificationService.sendPendingApproveRejectNotificationToServiceDesk(workFlowStatus.getRegisterForm().getId(), applicant.getId(), workFlowStatus.getUser().getId(), workFlowStatus.getStatus().name());
    //        }
    //    }

    }

	/*
	 * private List<User> findApprovers(User applicant, ApproveRole approveRole) {
	 * List<User> approverList =
	 * userRepo.findByTeamAndApproveRole(applicant.getTeam().getId(),
	 * approveRole.getId());
	 * 
	 * if (isValidApprovers(approverList)) { return approverList; } approverList =
	 * userRepo.findByDepartmentAndApproveRole(applicant.getTeam().getDepartment().
	 * getId(), approveRole.getId()); if (isValidApprovers(approverList)) { return
	 * approverList; } approverList =
	 * userRepo.findByDivisionAndApproveRole(applicant.getTeam().getDepartment().
	 * getDivision().getId(), approveRole.getId()); if
	 * (isValidApprovers(approverList)) { return approverList; } if
	 * (approveRole.getName().equals("CISO")) { return
	 * userRepo.findByApproveRoleName("CISO"); } else { return
	 * userRepo.findByApproveRole(approveRole.getId()); } } private boolean
	 * isValidApprovers(List<User> approverList) { return approverList != null &&
	 * !approverList.isEmpty(); }
	 */



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
            workFlowStatusDto.setApproverId(workFlowStatus.getUser().getId());
            workFlowStatusDto.setApproverName(workFlowStatus.getUser().getName());
            workFlowStatusDto.setState("APPROVE".equalsIgnoreCase(workFlowStatus.getStatus().name()));
            workFlowStatusList.add(workFlowStatusDto);
        }
        return workFlowStatusList;
    }



    @Override
    public void updateStatus(Long id, WorkFlowStatusDto workFlowStatusDto) throws Exception {
    	WorkFlowStatus workFlowStatus = EntityUtil.getEntityById(workFlowStatusRepo, id);      
        // RegisterForm form = registerFormRepo.findByWorkFlowStatusId(id);
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
        }

        if (Objects.equals(userRole, "CISO")) {
            if (workFlowStatusDto.isState()) {
                createApproval(workFlowStatusDto.getRegisterFormId(), "CEO", false);
                List<WorkFlowStatus> existingApproval = workFlowStatusRepo.findByUserApproveRolesNameAndRegisterFormId("SERVICE_DESK", workFlowStatusDto.getRegisterFormId());
                if (existingApproval != null) {
                    workFlowStatusRepo.deleteAll(existingApproval);
                }
            } else {
                createApproval(workFlowStatusDto.getRegisterFormId(), "SERVICE_DESK", false);
            }
        }
         else if (Objects.equals(userRole, "CEO") && workFlowStatusDto.isState()) {
            createApproval(workFlowStatusDto.getRegisterFormId(), "SERVICE_DESK", true);
            RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepo, workFlowStatusDto.getRegisterFormId());
            registerForm.setStatus(Status.APPROVE);
            registerFormRepo.save(registerForm);
            ledgerService.createLedger(registerForm.getId());
        } else if (Objects.equals(userRole, "SERVICE_DESK") && !workFlowStatusDto.isState()) {
            RegisterForm registerForm = EntityUtil.getEntityById(registerFormRepo, workFlowStatusDto.getRegisterFormId());
            registerForm.setStatus(Status.REJECT);
            registerFormRepo.save(registerForm);
            List<WorkFlowStatus> workFlowStatusList = workFlowStatusRepo.findByRegisterFormIdAndApproveRoleName(workFlowStatusDto.getRegisterFormId(), "SERVICE_DESK");
            if (workFlowStatusList != null) {
                for (WorkFlowStatus workFlowStatus1 : workFlowStatusList) {
                    if (workFlowStatus1.getUser().equals(workFlowStatus.getUser())) {
                        workFlowStatusList.remove(workFlowStatus1);
                        break;
                    }
                }
                workFlowStatusRepo.deleteAll(workFlowStatusList);
            }
        }
        else {
        	if(workFlowStatusDto.isState()) {
                createWorkFlowStatus(workFlowStatusDto.getNewApproverId(), workFlowStatusDto.getRegisterFormId(), workFlowStatusDto.getNewApproverId());
        	}
        }
    }

//    @Override
//    public WorkFlowStatusDto getWorkFlowStatusWithApprover(Long id) {
//        WorkFlowStatus workFlowStatus = workFlowStatusRepo.findByUserId(id);
//        return modelMapper.map(workFlowStatus, WorkFlowStatusDto.class);
//    }

    private void createApproval(Long registerFormId, String roleName, boolean isApproved) {
        List<User> users = userRepo.findByApproveRoleName(roleName);
        for(User user : users){
            WorkFlowStatus workFlowStatus = new WorkFlowStatus();
            if(isApproved) {
                workFlowStatus.setStatus(Status.APPROVE);    
            }
            workFlowStatus.setStatus(Status.PENDING);
            workFlowStatus.setRegisterForm(EntityUtil.getEntityById(registerFormRepo, registerFormId));
            workFlowStatus.setUser(user);
            workFlowStatus.setApproveRole(approveRoleRepo.findByName(roleName));
            EntityUtil.saveEntity(workFlowStatusRepo, workFlowStatus, "Work Flow Status");
        }
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

	@Override
	public void updateApproverStatus(Long id, boolean state, Date approveDate, String reason) {
		WorkFlowStatus workFlowStatus = EntityUtil.getEntityById(workFlowStatusRepo, id);
		Status newStatus = state ? Status.APPROVE : Status.REJECT;
        workFlowStatus.setStatus(newStatus);
        workFlowStatus.setApprove_date(approveDate);
        workFlowStatus.setReason(reason);
        EntityUtil.saveEntity(workFlowStatusRepo, workFlowStatus, "Work Flow Status");
	}

}
