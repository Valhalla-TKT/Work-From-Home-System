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
    private Long id;
    private String staffId, name, email, gender, positionName, teamName, approveRoleName, departmentName, divisionName, profile;
    private boolean firstTimeLogin;
    private Set<ApproveRole> approveRoles;
    private Team team;
    private Department department;
    private Division division;
}
