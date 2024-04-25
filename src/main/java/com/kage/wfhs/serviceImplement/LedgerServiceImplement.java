package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.LedgerDto;
import com.kage.wfhs.model.*;
import com.kage.wfhs.repository.LedgerRepository;
import com.kage.wfhs.repository.RegisterFormRepository;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.repository.WorkFlowStatusRepository;
import com.kage.wfhs.service.LedgerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LedgerServiceImplement implements LedgerService {

    private final LedgerRepository ledgerRepo;
    private final UserRepository userRepo;
    private final RegisterFormRepository registerFormRepo;
    private final WorkFlowStatusRepository workFlowStatusRepo;
    private final ModelMapper modelMapper;
    @Override
    public void createLedger(long formId) {
        RegisterForm registerForm = registerFormRepo.findById(formId);
        User applicant = userRepo.findById(registerForm.getApplicant().getId());
        Ledger ledger = new Ledger();

        ledger.setDepartment(applicant.getDepartment().getName());
        ledger.setTeam(applicant.getTeam().getName());
        ledger.setStaff_id(applicant.getStaff_id());
        ledger.setName(applicant.getName());
        ledger.setEmail(applicant.getName());
        ledger.setApplied_date(registerForm.getSignedDate());
        ledger.setFrom_date(registerForm.getFrom_date());
        ledger.setTo_date(registerForm.getTo_date());
        ledger.setWorkcation(registerForm.getWorking_place());
        ledger.setRequest_percent(registerForm.getRequest_percent());
        ledger.setUse_own_facilities("YES");
        ledger.setEnvironment_facilities("OK");

        WorkFlowStatus project_manager_approve = workFlowStatusRepo.findByApproveRoleNameAndFormId(registerForm.getId(), "PROJECT_MANAGER");
        ledger.setProject_manager_approve(Status.valueOf(project_manager_approve == null ? Status.APPROVE.name() : project_manager_approve.getStatus().name()));
        ledger.setProject_manager_approve_date(project_manager_approve != null ? project_manager_approve.getApprove_date() : registerForm.getSignedDate());

        WorkFlowStatus department_head_approve = workFlowStatusRepo.findByApproveRoleNameAndFormId(registerForm.getId(), "DEPARTMENT_HEAD");
        ledger.setDepartment_head_approve(Status.valueOf(department_head_approve == null ? Status.APPROVE.name() : department_head_approve.getStatus().name()));
        ledger.setDepartment_head_approve_date(department_head_approve != null ? department_head_approve.getApprove_date() : registerForm.getSignedDate());

        WorkFlowStatus division_head_approve = workFlowStatusRepo.findByApproveRoleNameAndFormId(registerForm.getId(), "DIVISION_HEAD");
        ledger.setDivision_head_approve(Status.valueOf(division_head_approve == null ? Status.APPROVE.name() : division_head_approve.getStatus().name()));
        ledger.setDivision_head_approve_date(division_head_approve != null ? division_head_approve.getApprove_date() : registerForm.getSignedDate());

        WorkFlowStatus ciso_approve = workFlowStatusRepo.findByApproveRoleNameAndFormId(registerForm.getId(), "CISO");
        ledger.setCiso_approve(Status.valueOf(ciso_approve == null ? Status.APPROVE.name() : ciso_approve.getStatus().name()));
        ledger.setCiso_approve_date(ciso_approve != null ? ciso_approve.getApprove_date() : registerForm.getSignedDate());

        WorkFlowStatus ceo_approve = workFlowStatusRepo.findByApproveRoleNameAndFormId(registerForm.getId(), "CEO");
        ledger.setCeo_approve(Status.valueOf(ceo_approve == null ? Status.APPROVE.name() : ceo_approve.getStatus().name()));
        ledger.setFinal_approve_date(ceo_approve != null ? ceo_approve.getApprove_date() : registerForm.getSignedDate());

        ledger.setSigned_pledge_letter_date(registerForm.getSignedDate());
        ledger.setReason_for_wfh(registerForm.getRequest_reason());


        ledgerRepo.save(ledger);
    }

    @Override
    public List<LedgerDto> getAllLedger() {
        List<Ledger> ledgers = ledgerRepo.findAll();
        List<LedgerDto> ledgerList = new ArrayList<>();
        for(Ledger ledger : ledgers) {
            LedgerDto ledgerDto = modelMapper.map(ledger, LedgerDto.class);
            ledgerList.add(ledgerDto);
        }
        return ledgerList;
    }

    @Override
    public LedgerDto getLedgerById(long id) {
        Ledger ledger = ledgerRepo.findById(id);
        return modelMapper.map(ledger, LedgerDto.class);
    }
}
