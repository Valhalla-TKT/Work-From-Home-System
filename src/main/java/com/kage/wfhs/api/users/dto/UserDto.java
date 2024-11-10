/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.users.dto;

import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.departments.model.Department;
import com.kage.wfhs.api.divisions.model.Division;
import com.kage.wfhs.api.teams.model.Team;
import com.kage.wfhs.api.work_flow_orders.model.WorkFlowOrder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {
	private Long id, teamId, approveRoleId, divisionId, departmentId;
    private String staffId, name, email, password, gender, teamName, positionName, approveRoleName, departmentName, divisionName, profile, highestApproveRole;
    private boolean isEnabled, isFirstTimeLogin, resetFlag;
    private Team team;
    private Department department;
    private Division division;
    private Set<ApproveRole> approveRoles;
    private List<WorkFlowOrder> workFlowOrders;
    private MultipartFile profileInput;
    private List<Team> managedTeams;
    private List<Department> managedDepartments;
    private List<Division> managedDivisions;
}
