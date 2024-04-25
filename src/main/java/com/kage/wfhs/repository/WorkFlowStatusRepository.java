package com.kage.wfhs.repository;

import com.kage.wfhs.model.Status;
import com.kage.wfhs.model.WorkFlowStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowStatusRepository extends JpaRepository<WorkFlowStatus,Long> {
	WorkFlowStatus findById(long id);
    List<WorkFlowStatus> findByRegisterFormId(long id);
    WorkFlowStatus findByUserId(long id);
    List<WorkFlowStatus> findByUserApproveRolesNameAndRegisterFormId(String approveRoleName, long formId);
    boolean existsByRegisterFormIdAndStatus(long registerFormId, Status status);
    @Query(value = "SELECT * FROM work_flow_status ws WHERE ws.user_id = :userId AND ws.register_form_id = :formId",nativeQuery = true)
    WorkFlowStatus findByUserIdAndRegisterFormId(long userId, long formId);
    
    @Query(value = "SELECT ws.* FROM work_flow_status ws JOIN user u ON ws.user_id = u.id JOIN user_has_approve_role uar ON u.id = uar.user_id JOIN approve_role ar ON uar.approve_role_id = ar.id WHERE ws.status = 'PENDING' AND ws.register_form_id = :formId AND ar.name = :approveRoleName", nativeQuery = true)
    List<WorkFlowStatus> findWorkFlowStatusByroleandform(long formId, String approveRoleName);
    
    @Query(value = """
            SELECT wfs.* FROM work_flow_status wfs JOIN approve_role ar ON wfs.approve_role_id = ar.id
            JOIN register_form rf ON wfs.register_form_id = rf.id WHERE ar.name = :approveRoleName AND rf.id = :registerFormId
            """, nativeQuery = true)
    WorkFlowStatus findByApproveRoleNameAndFormId(long registerFormId, String approveRoleName);
}
