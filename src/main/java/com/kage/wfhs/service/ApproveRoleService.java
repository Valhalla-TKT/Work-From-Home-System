/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import com.kage.wfhs.dto.ApproveRoleDto;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ApproveRoleService {
    void createApproveRole(ApproveRoleDto approveRoleDto);

    ApproveRoleDto getApproveRoleById(Long id);

    ApproveRoleDto getApproveRoleByName(String name);

    List<ApproveRoleDto> getAllApproveRole();

    Long getIdByWorkFlowOrderId(Long orderId);

    void deleteApproverById(Long id);

    boolean createHRRole();

    boolean createAdminRole();

    void updateApproveRole(ApproveRoleDto approveRoleDto);

    boolean createApproveRole(String name);

    /**
     * Initializes roles by creating them if they do not exist in the database.
     *
     * @param roles a list of role names to be initialized.
     * @throws Exception if an error occurs during the initialization process.
     */
    void initializeRoles(List<String> roles) throws Exception;

    List<ApproveRoleDto> getApproveRoleListWithoutApplicant();
}