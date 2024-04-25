package com.kage.wfhs.repository;

import com.kage.wfhs.model.ApproveRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ApproveRoleRepository extends JpaRepository<ApproveRole,Long> {
	ApproveRole findById(long id);
    ApproveRole findByName(String name);    
    @Query(value = "SELECT wfo.approve_role_id FROM work_flow_order wfo WHERE wfo.id > :workFlowOrderId AND wfo.approve_role_id NOT IN (SELECT wfoInner.approve_role_id FROM work_flow_order wfoInner WHERE wfoInner.id = :workFlowOrderId) LIMIT 1", nativeQuery = true)
    long findByWorkFlowOrderId(long workFlowOrderId);



}
