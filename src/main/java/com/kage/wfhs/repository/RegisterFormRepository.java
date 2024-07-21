/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.repository;

import com.kage.wfhs.model.RegisterForm;

import java.util.List;
import java.util.Optional;

import com.kage.wfhs.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RegisterFormRepository extends JpaRepository<RegisterForm,Long> {
	Optional<RegisterForm> findById(Long id);

	@Query("SELECT r.id FROM RegisterForm r ORDER BY r.id DESC LIMIT 1")
	Long findLastId();
	
//	@Query(value = "SELECT rf.* FROM register_form rf JOIN user u ON rf.applicant_id = u.id JOIN user_has_approve_role uar ON u.id = uar.user_id JOIN team t ON u.team_id = t.id WHERE rf.status = :status AND t.id = :teamId", nativeQuery = true)
//    List<RegisterForm> findRegisterFormByTeam(int status, long teamId);
	
	@Query(value = "SELECT rf.* FROM register_form rf JOIN work_flow_status ws ON rf.id = ws.register_form_id JOIN user u ON ws.user_id = u.id JOIN team t ON u.team_id = t.id WHERE rf.status = :status AND t.id = :teamId", nativeQuery = true)
    List<RegisterForm> findRegisterFormByTeam(String status, Long teamId);
	
	@Query(value = """
            SELECT rf.* FROM register_form rf JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id JOIN user_has_approve_role uhar ON u.id = uhar.user_id JOIN approve_role ar ON uhar.approve_role_id = ar.id
            JOIN team t ON u.team_id = t.id WHERE ar.id = :approveRoleId AND wfs.status = :status AND t.id = :teamId
        """, nativeQuery = true )
    List<RegisterForm> findRegisterFormByTeam(Long approveRoleId, String status, Long teamId);

    @Query(value = """
        SELECT DISTINCT rf.* 
        FROM register_form rf 
        JOIN user u ON rf.applicant_id = u.id 
        JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
        WHERE u.team_id = :teamId
          AND wfs.status = :status
          AND wfs.approve_role_id = :approveRoleId
    """, nativeQuery = true)
    List<RegisterForm> findRegisterFormByTeamWithoutApproveRoleId(String status, Long teamId, Long approveRoleId);

    @Query(value = """
            SELECT rf.* 
            FROM register_form rf 
            JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id 
            JOIN team t ON u.team_id = t.id 
            WHERE wfs.status = :status AND t.id = :teamId AND wfs.approve_role_id = :approveRoleId
        """, nativeQuery = true)
    List<RegisterForm> findRegisterFormByTeamAndApproveRoleId(String status, Long teamId, Long approveRoleId);


    @Query(value = """
            SELECT rf.* FROM register_form rf JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id JOIN user_has_approve_role uhar ON u.id = uhar.user_id
            JOIN approve_role ar ON uhar.approve_role_id = ar.id JOIN team t ON u.team_id = t.id
            WHERE ar.id = :approveRoleId AND t.id = :teamId
        """, nativeQuery = true )
    List<RegisterForm> findRegisterFormByTeamAll(Long approveRoleId, Long teamId);

    @Query(value = """
        SELECT rf.* 
        FROM register_form rf 
        JOIN user u ON rf.applicant_id = u.id 
        WHERE u.team_id = :teamId
    """, nativeQuery = true)
    List<RegisterForm> findRegisterFormByTeamAllWithoutApproveRoleId(Long teamId);

    @Query(value = "SELECT rf.* FROM register_form rf " +
            "JOIN work_flow_status ws ON rf.id = ws.register_form_id " +
            "JOIN user u ON rf.applicant_id = u.id " +
            "JOIN team t ON u.team_id = t.id " +
            "WHERE ws.status = :workflowStatus " +
            "AND ws.user_id = :userId " +
            "AND t.id = :teamId", nativeQuery = true)
    List<RegisterForm> findByWorkflowStatusAndUserIdAndTeamId(
            @Param("workflowStatus") String workflowStatus,
            @Param("userId") Long userId,
            @Param("teamId") Long teamId);

    @Query(value = "SELECT rf.* FROM register_form rf " +
            "JOIN work_flow_status ws ON rf.id = ws.register_form_id " +
            "JOIN user u ON rf.applicant_id = u.id " +
            "JOIN team t ON u.team_id = t.id " +
            "WHERE ws.user_id = :userId " +
            "AND t.id = :teamId", nativeQuery = true)
    List<RegisterForm> findByUserIdAndTeamId(
            @Param("userId") Long userId,
            @Param("teamId") Long teamId);

    @Query(value = """
            SELECT rf.* FROM register_form rf JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id JOIN user_has_approve_role uhar ON u.id = uhar.user_id
            JOIN approve_role ar ON uhar.approve_role_id = ar.id JOIN department dep ON u.department_id = dep.id
            WHERE ar.id = :approveRoleId AND dep.id = :departmentId
        """, nativeQuery = true )
    List<RegisterForm> findRegisterFormByDepartmentAll(Long approveRoleId, Long departmentId);

    @Query(value = """
            SELECT rf.* FROM register_form rf JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id JOIN user_has_approve_role uhar ON u.id = uhar.user_id
            JOIN approve_role ar ON uhar.approve_role_id = ar.id JOIN division d ON u.division_id = d.id
            WHERE ar.id = :approveRoleId AND d.id = :divisionId
        """, nativeQuery = true )
    List<RegisterForm> findRegisterFormByDivisionAll(Long approveRoleId, Long divisionId);

    @Query(value = """
            SELECT rf.* FROM register_form rf JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id JOIN user_has_approve_role uhar ON u.id = uhar.user_id JOIN approve_role ar ON uhar.approve_role_id = ar.id
            JOIN department dep ON u.department_id = dep.id WHERE ar.id = :approveRoleId AND wfs.status = :status AND dep.id = :departmentId
        """, nativeQuery = true )
    List<RegisterForm> findRegisterFormByDepartment(Long approveRoleId, String status, Long departmentId);

    @Query(value = """
            SELECT rf.* FROM register_form rf JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id JOIN user_has_approve_role uhar ON u.id = uhar.user_id JOIN approve_role ar ON uhar.approve_role_id = ar.id
            JOIN division d ON u.division_id = d.id WHERE ar.id = :approveRoleId AND wfs.status = :status AND d.id = :divisionId
        """, nativeQuery = true )
    List<RegisterForm> findRegisterFormByDivision(Long approveRoleId, String status, Long divisionId);
    
    @Query(value = """
            SELECT rf.* FROM register_form rf JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id JOIN user_has_approve_role uhar ON u.id = uhar.user_id
            JOIN approve_role ar ON uhar.approve_role_id = ar.id WHERE ar.id = :approveRoleId
            AND wfs.status = :status
        """, nativeQuery = true )
    List<RegisterForm> findRegisterForm(Long approveRoleId, String status);  
    
    @Query(value = """
            SELECT rf.* FROM register_form rf JOIN work_flow_status wfs ON rf.id = wfs.register_form_id
            JOIN user u ON u.id = wfs.user_id JOIN user_has_approve_role uhar ON u.id = uhar.user_id
            JOIN approve_role ar ON uhar.approve_role_id = ar.id WHERE ar.id = :approveRoleId
        """, nativeQuery = true )
    List<RegisterForm> findRegisterFormAll(Long approveRoleId);   
    
    @Query(value = """
            SELECT r.*
            FROM register_form r
            JOIN work_flow_status wfs ON r.id = wfs.register_form_id
            WHERE wfs.id = :statusId
            """, nativeQuery = true)
    RegisterForm findByWorkFlowStatusId(Long statusId);

    List<RegisterForm> findByApplicantId(long userId);
}
