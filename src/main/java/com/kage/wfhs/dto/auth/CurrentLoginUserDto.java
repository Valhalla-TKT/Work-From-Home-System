package com.kage.wfhs.dto.auth;

import com.kage.wfhs.model.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CurrentLoginUserDto {
    private Long id, teamId, positionId, approveRoleId, roleId, divisionId, departmentId;
    private String staffId, name, email, gender, teamName, approveRoleName, departmentName, divisionName, profile;
    private boolean isEnabled, isFirstTimeLogin;
    private Team team;
    private Department department;
    private Division division;
    private Set<ApproveRole> approveRoles;
    private MultipartFile profileInput;
}
