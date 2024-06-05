/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.ApproveRoleDto;
import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.repository.ApproveRoleRepository;
import com.kage.wfhs.service.ApproveRoleService;
import com.kage.wfhs.util.EntityUtil;
import com.kage.wfhs.util.Helper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApproveRoleServiceImplement implements ApproveRoleService {
    @Autowired
    private final ApproveRoleRepository approveRoleRepo;
    private final ModelMapper modelMapper;


    @Override
    public void createApproveRole(ApproveRoleDto approveRoleDto) {
        String changeToCapital = Helper.changeToCapitalLetter(approveRoleDto.getName());
        String changeSpaceToUnderScore = Helper.changeSpaceToUnderScore(changeToCapital);
        approveRoleDto.setName(changeSpaceToUnderScore);
        ApproveRole approveRole = modelMapper.map(approveRoleDto, ApproveRole.class);
        approveRoleRepo.save(approveRole);
    }

    @Override
    public ApproveRoleDto getApproveRoleById(Long id) {
        ApproveRole approveRole = EntityUtil.getEntityById(approveRoleRepo, id);
        return modelMapper.map(approveRole, ApproveRoleDto.class);
    }

    @Override
    public ApproveRoleDto getApproveRoleByName(String name) {
        ApproveRole approveRole = approveRoleRepo.findByName(name);
        return modelMapper.map(approveRole, ApproveRoleDto.class);
    }

    @Override
    public List<ApproveRoleDto> getAllApproveRole() {
        List<ApproveRole> approveRoles = approveRoleRepo.findAll();
        List<ApproveRoleDto> approveRoleList = new ArrayList<>();
        for (ApproveRole approveRole : approveRoles){
            ApproveRoleDto approveRoleDto = modelMapper.map(approveRole, ApproveRoleDto.class);
            approveRoleList.add(approveRoleDto);
        }
        return approveRoleList;
    }
    
    @Override
    public Long getIdByWorkFlowOrderId(Long workFlowOrderId) {
        return approveRoleRepo.findByWorkFlowOrderId(workFlowOrderId);
    }
    
    @Override
    public void deleteApproverById(Long id) {
        approveRoleRepo.deleteById(id);
    }
    
    @Override
   	public boolean createApproveRole(String name) {
   		ApproveRoleDto approveRoleDto = new ApproveRoleDto();
   		approveRoleDto.setName(name);
        ApproveRole approveRole = modelMapper.map(approveRoleDto, ApproveRole.class);
        try {
           	approveRoleRepo.save(approveRole);
   	        return true;
   	    } catch (Exception e) {
   	        e.printStackTrace();
   	        return false;
   	    }
   	}

    @Override
	public boolean createHRRole() {
		ApproveRoleDto approveRoleDto = new ApproveRoleDto();
		approveRoleDto.setName("HR");
        ApproveRole approveRole = modelMapper.map(approveRoleDto, ApproveRole.class);
        try {
        	approveRoleRepo.save(approveRole);
	        return true;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}

	@Override
	public boolean createAdminRole() {
		ApproveRoleDto approveRoleDto = new ApproveRoleDto();
		approveRoleDto.setName("ADMIN");
        ApproveRole approveRole = modelMapper.map(approveRoleDto, ApproveRole.class);
        try {
        	approveRoleRepo.save(approveRole);
	        return true;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}

    @Override
    public void updateApproveRole(ApproveRoleDto approveRoleDto) {        
        ApproveRole approveRole = EntityUtil.getEntityById(approveRoleRepo, approveRoleDto.getId());
        if (approveRole == null) {
            throw new EntityNotFoundException("Approve Role not found");
        }
        modelMapper.map(approveRoleDto, approveRole);
        approveRoleRepo.save(approveRole);
    }
}
