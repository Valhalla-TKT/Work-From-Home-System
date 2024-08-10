package com.kage.wfhs.dto.auth;

import com.kage.wfhs.model.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

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
    private boolean firstTimeLogin;
    private Set<ApproveRole> approveRoles;
    private Team team;
    private Department department;
    private Division division;
    private List<Team> teams;
    private List<Division> divisions;
    private List<Department> departments;
}
