package com.kage.wfhs.dto;

import com.kage.wfhs.model.Department;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TeamDto {
    private long id, departmentId;
    private String code, name, departmentName;
    private Department department;

}
