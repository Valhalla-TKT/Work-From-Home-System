/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.repository;

import com.kage.wfhs.model.Status;
import com.kage.wfhs.model.WorkFlowStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowStatusRepository extends JpaRepository<WorkFlowStatus,Long> {
	Optional<WorkFlowStatus> findById(Long id);
    List<WorkFlowStatus> findByRegisterFormId(Long id);
    List<WorkFlowStatus> findByUserId(Long id);
    List<WorkFlowStatus> findByUserApproveRolesNameAndRegisterFormId(String approveRoleName, Long formId);
    boolean existsByRegisterFormIdAndStatus(Long registerFormId, Status status);
    @Query(value = "SELECT * FROM work_flow_status ws WHERE ws.user_id = :userId AND ws.register_form_id = :formId",nativeQuery = true)
    WorkFlowStatus findByUserIdAndRegisterFormId(Long userId, Long formId);
    
    @Query(value = "SELECT ws.* FROM work_flow_status ws JOIN user u ON ws.user_id = u.id JOIN user_has_approve_role uar ON u.id = uar.user_id JOIN approve_role ar ON uar.approve_role_id = ar.id WHERE ws.status = 'PENDING' AND ws.register_form_id = :formId AND ar.name = :approveRoleName", nativeQuery = true)
    List<WorkFlowStatus> findWorkFlowStatusByroleandform(Long formId, String approveRoleName);
    
    @Query(value = """
            SELECT wfs.* FROM work_flow_status wfs JOIN approve_role ar ON wfs.approve_role_id = ar.id
            JOIN register_form rf ON wfs.register_form_id = rf.id WHERE ar.name = :approveRoleName AND rf.id = :registerFormId
            """, nativeQuery = true)
    WorkFlowStatus findByApproveRoleNameAndFormId(Long registerFormId, String approveRoleName);

    @Query(value = """
        SELECT wfs.* FROM work_flow_status wfs
        JOIN approve_role ar ON wfs.approve_role_id = ar.id
        WHERE wfs.register_form_id = :registerFormId AND ar.name = :approveRoleName
        """, nativeQuery = true)
    List<WorkFlowStatus> findByRegisterFormIdAndApproveRoleName(Long registerFormId, String approveRoleName);

    List<WorkFlowStatus> findByRegisterFormIdAndStatus(Long formId, Status status);
    List<WorkFlowStatus> findByUserIdAndStatus(Long userId, Status status);
}
