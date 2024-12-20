package com.kage.wfhs.api.session.dto;

import com.kage.wfhs.api.departments.model.Department;
import com.kage.wfhs.api.divisions.model.Division;
import com.kage.wfhs.api.teams.model.Team;
import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CurrentLoginUserDto {
    private Long id;
    private String staffId, name, email, gender, positionName, teamName, approveRoleName, departmentName, divisionName, profile, managedTeamName, managedDepartmentName, managedDivisionName;
    private boolean firstTimeLogin, registeredForThisMonth;
    private Set<ApproveRole> approveRoles;
    private Team team;
    private Department department;
    private Division division;
    private List<Team> teams;
    private List<Division> divisions;
    private List<Department> departments;
}
