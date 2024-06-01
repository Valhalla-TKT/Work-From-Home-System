/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.dto;

import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.Department;
import com.kage.wfhs.model.Division;
import com.kage.wfhs.model.Position;
import com.kage.wfhs.model.Role;
import com.kage.wfhs.model.Team;
import com.kage.wfhs.model.WorkFlowOrder;

import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class UserDto {
	private long id, teamId, positionId, approveRoleId, roleId, divisionId, departmentId;
    private String staffId, name, email, password, gender, phoneNumber, teamName, positionName, approveRoleName, roleName, departmentName, divisionName, profile, divisionCode;
    private boolean isEnabled, maritalStatus, parent, children, isFirstTimeLogin;
    private Date joinDate, permanentDate;
    private Role role;
    private Team team;
    private Department department;
    private Division division;
    private Position position;
    private Set<ApproveRole> approveRoles;
    private List<WorkFlowOrder> workFlowOrders;
    private MultipartFile profileInput;     
}
