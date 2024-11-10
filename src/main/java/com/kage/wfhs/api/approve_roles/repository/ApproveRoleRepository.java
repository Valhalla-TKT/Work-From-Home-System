/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.approve_roles.repository;

import com.kage.wfhs.api.approve_roles.model.ApproveRole;

import java.util.List;
import java.util.Optional;

import com.kage.wfhs.api.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ApproveRoleRepository extends JpaRepository<ApproveRole,Long> {
	Optional<ApproveRole> findById(Long id);
    ApproveRole findByName(String name);    
    @Query(value = "SELECT wfo.approve_role_id FROM work_flow_order wfo WHERE wfo.id > :workFlowOrderId AND wfo.approve_role_id NOT IN (SELECT wfoInner.approve_role_id FROM work_flow_order wfoInner WHERE wfoInner.id = :workFlowOrderId) LIMIT 1", nativeQuery = true)
    Long findByWorkFlowOrderId(Long workFlowOrderId);

    ApproveRole findByUsers(List<User> users);

    @Query("SELECT ar FROM ApproveRole ar WHERE ar.name <> 'APPLICANT'")
    List<ApproveRole> findApproveRolesWithoutApplicant();
}
