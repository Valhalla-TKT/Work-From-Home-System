/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.Department;
import com.kage.wfhs.model.Division;
import com.kage.wfhs.model.Team;
import com.kage.wfhs.model.WorkFlowOrder;

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
    private boolean isEnabled, isFirstTimeLogin;
    private Team team;
    private Department department;
    private Division division;
    private Set<ApproveRole> approveRoles;
    private List<WorkFlowOrder> workFlowOrders;
    private MultipartFile profileInput;     
}
