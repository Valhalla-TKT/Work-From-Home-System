/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.repository;

import com.kage.wfhs.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    
    @Query("""
            SELECT data.staffId FROM User data WHERE data.gender = :gender
              AND data.staffId = (
                SELECT MAX(user.staffId) FROM User user WHERE user.gender = :gender GROUP BY user.gender
              )
            ORDER BY data.staffId DESC
                                        """)
    String findLastStaffIdByGender(@Param("gender") String gender);

    @Query(value = "SELECT * FROM User WHERE staff_id = :staffId", nativeQuery = true)
    User findByStaffId(@Param("staffId") String staffId);
    User findByEmail(String email);
    Optional<User> findById(Long id);
    List<User> findByTeamId(Long id);
    List<User> findByTeamDepartmentId(Long id);
    List<User> findByTeamDepartmentDivisionId(Long id);
    @Query("SELECT u.approveRoles FROM User u WHERE u.id = :userId")
    Set<ApproveRole> findApproveRolesByUserId(Long userId);
    User findUserByTeamId(Long id);
    @Query("SELECT u.team FROM User u WHERE u.id = :userId")
    Team findTeamByUserId(@Param("userId") Long userId);
    @Query("SELECT u.team.department FROM User u WHERE u.id = :userId")
    Department findDepartmentByUserId(@Param("userId") Long userId);
    @Query("SELECT u.team.department.division FROM User u WHERE u.id = :userId")
    Division findDivisionByUserId(@Param("userId") Long userId);
    @Query("SELECT u FROM User u JOIN u.team t JOIN u.approveRoles ar WHERE t.id = :teamId AND ar.id = :approveRoleId")
    List<User> findByTeamAndApproveRole(@Param("teamId") Long teamId, @Param("approveRoleId") Long approveRoleId);
    
    @Query("SELECT u FROM User u JOIN u.team t JOIN t.department d JOIN u.approveRoles ar WHERE d.id = :departmentId AND ar.id = :approveRoleId")
    List<User> findByDepartmentAndApproveRole(@Param("departmentId") Long departmentId, @Param("approveRoleId") Long approveRoleId);

    @Query("SELECT u FROM User u JOIN u.team t JOIN t.department d JOIN d.division dv JOIN u.approveRoles ar WHERE dv.id = :divisionId AND ar.id = :approveRoleId")
    List<User> findByDivisionAndApproveRole(@Param("divisionId") Long divisionId, @Param("approveRoleId") Long approveRoleId);

    @Query("SELECT u FROM User u JOIN u.approveRoles ar WHERE ar.id = :approveRoleId")
    List<User> findByApproveRole(@Param("approveRoleId") Long approveRoleId);
    @Query("SELECT u FROM User u JOIN u.approveRoles ar WHERE ar.name = :roleName")
    List<User> findByApproveRoleName(@Param("roleName") String roleName);

	List<User> findAllByActiveStatus(ActiveStatus online);
	
	User findByApproveRoles_Name(String roleName);
	
	@Query(value = """
	        SELECT u.*
	        FROM user u
	        JOIN user_has_approve_role uhar ON u.id = uhar.user_id
	        JOIN approve_role ar ON uhar.approve_role_id = ar.id
	        JOIN work_flow_order wfo ON ar.id = wfo.approve_role_id
	        WHERE  wfo.id = :workFlowOrderId

	         """ , nativeQuery = true)
	    List<User> findUpperRoleUser(Long workFlowOrderId);
	//TEAM

    @Query("SELECT u.name AS username, COALESCE(r.request_percent, 0.0) AS requestPercent " +
      "FROM User u " +
      "LEFT JOIN u.registerForms r " +
      "ON u.team.id = :teamId " +
      "WHERE u.team.id = :teamId")
    List<Object[]> getUserRequestByTeamId(@Param("teamId") Long teamId);


    @Query(value = "SELECT SUM(CASE WHEN r.id IS NOT NULL THEN 1 ELSE 0 END) AS usersWithRequest, " +
      "SUM(CASE WHEN r.id IS NULL THEN 1 ELSE 0 END) AS usersWithoutRequest " +
      "FROM user u " +
      "LEFT JOIN register_form r ON u.id = r.applicant_id " +
      "WHERE u.team_id = :teamId", nativeQuery = true)
    List<Object[]> getTotalStaffRequestByTeamId(@Param("teamId") String teamId);

    
    @Query("SELECT t.name AS teamName, 100*(SUM(r.request_percent)) / (100 * COUNT(u.id)) AS registrationPercentage " +
      "FROM Team t " +
      "LEFT JOIN User u ON t.id = u.team.id " +
      "LEFT JOIN u.registerForms r " +
      "WHERE t.id = :teamId " +
      "GROUP BY t.name")
    Object[] getTeamRegistrationInfo(@Param("teamId") Long teamId);


//DEPARTMENT HEAD
    
    @Query("SELECT t.name AS teamName, AVG(COALESCE(r.request_percent, 0)) AS avgRequestPercent " +
      "FROM Team t " +
      "JOIN User u ON t.id = u.team.id " +
      "LEFT JOIN RegisterForm r ON u.id = r.applicant.id " +
      "WHERE t.department.id = :departmentId " +
      "GROUP BY t.id, t.name")
    List<Object[]> getAllTeamRequestByDepartmentId(@Param("departmentId") Long departmentId);

    @Query("SELECT SUM(usersWithRequest) AS totalUsersWithRequest, " +
      "SUM(usersWithoutRequest) AS totalUsersWithoutRequest " +
      "FROM ( " +
      "    SELECT SUM(CASE WHEN r.id IS NOT NULL THEN 1 ELSE 0 END) AS usersWithRequest, " +
      "           SUM(CASE WHEN r.id IS NULL THEN 1 ELSE 0 END) AS usersWithoutRequest " +
      "    FROM Team t " +
      "    LEFT JOIN User u ON t.id = u.team.id " +
      "    LEFT JOIN RegisterForm r ON u.id = r.applicant.id " +
      "    WHERE t.department.id = :departmentId " +
      "    GROUP BY t.id, t.name " +
      ") AS teamCounts")
    List<Object[]> getTotalTeamRequestByDepartmentId(@Param("departmentId") String departmentId);

    @Query("SELECT " +
      "d.name AS departmentName, " +
      "100 * SUM(COALESCE(r.request_percent, 0)) / (100 * COUNT(DISTINCT u.id)) AS registrationPercentage " +
      "FROM " +
      "User u " +
      "LEFT JOIN u.team t " +
      "LEFT JOIN t.department d " +
      "LEFT JOIN u.registerForms r " +
      "WHERE " +
      "d.id = :departmentId")
    Object[] getDepartmentRegistrationInfo(@Param("departmentId") Long departmentId);


//DIVISION HEAD

    @Query("SELECT d.name AS departmentName, " +
      "       AVG(COALESCE(r.request_percent, 0)) AS avgRequestPercent " +
      "FROM Department d " +
      "JOIN d.teams t " +
      "JOIN t.users u " +
      "LEFT JOIN u.registerForms r " +
      "WHERE d.division.id = :divisionId " +
      "GROUP BY d.id, d.name")
    List<Object[]> getAllDepartmentRequestByDivisionId(@Param("divisionId") Long divisionId);

    @Query("SELECT SUM(totalUsersWithRequest) AS totalDepartmentUsersWithRequest, " +
      "SUM(totalUsersWithoutRequest) AS totalDepartmentUsersWithoutRequest " +
      "FROM ( " +
      "    SELECT SUM(CASE WHEN r.id IS NOT NULL THEN 1 ELSE 0 END) AS totalUsersWithRequest, " +
      "           SUM(CASE WHEN r.id IS NULL THEN 1 ELSE 0 END) AS totalUsersWithoutRequest " +
      "    FROM Department d " +
      "    LEFT JOIN Team t ON d.id = t.department.id " +
      "    LEFT JOIN User u ON t.id = u.team.id " +
      "    LEFT JOIN RegisterForm r ON u.id = r.applicant.id " +
      "    WHERE d.division.id = :divisionId " +
      "    GROUP BY d.id " +
      ") AS departmentCounts")
    List<Object[]> getTotalDepartmentRequestByDivisionId(@Param("divisionId") String divisionId);

    @Query("SELECT " +
      "d.name AS divisionName, " +
      "100 * SUM(COALESCE(r.request_percent, 0)) / (100 * COUNT(DISTINCT u.id)) AS registrationPercentage " +
      "FROM " +
      "User u " +
      "LEFT JOIN u.team t " +
      "LEFT JOIN t.department dept " +
      "LEFT JOIN dept.division d " +
      "LEFT JOIN u.registerForms r " +
      "WHERE " +
      "d.id = :divisionId " +
      "GROUP BY " +
      "d.id")
    Object[] getDivisionRegistrationInfo(@Param("divisionId") Long divisionId);

//Others

    @Query("SELECT u.name AS username, COALESCE(r.request_percent, 0.0) AS requestPercent " +
      "FROM User u " +
      "LEFT JOIN u.registerForms r")
    List<Object[]> getAllUserRequests();

    @Query("SELECT " +
           "  SUM(CASE WHEN r.id IS NOT NULL THEN 1 ELSE 0 END) AS usersWithRequest, " +
           "  SUM(CASE WHEN r.id IS NULL THEN 1 ELSE 0 END) AS usersWithoutRequest " +
           "FROM " +
           "  User u " +
           "LEFT JOIN " +
           "  u.registerForms r")
    List<Object[]> getTotalStaffRequest();

    List<User> findAllByGender(String gender);

    List<User> findAllByTeamIdAndGender(Long teamId, String gender);

    List<User> findAllByDepartmentIdAndGender(Long departmentId, String gender);

    List<User> findAllByDivisionIdAndGender(Long divisionId, String gender);
}
