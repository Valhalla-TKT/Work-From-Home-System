package com.kage.wfhs.dto;

import com.kage.wfhs.model.Division;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DepartmentDto {
    private long id, divisionId;
    private String code, name, divisionName;
    private Division division;    
}
