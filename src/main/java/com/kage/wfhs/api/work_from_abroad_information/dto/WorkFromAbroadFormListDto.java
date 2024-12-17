package com.kage.wfhs.api.work_from_abroad_information.dto;

/*
 * Add for ver 2.2 (Manual ver 1.8 - including WFA)
 * This class is to display WFA Form List
 */

import lombok.Data;

@Data
public class WorkFromAbroadFormListDto {
    private String applicantName;
    private String applicantStaffId;
    private String applicantDivision;
    private String applicantDepartment;
    private String applicantTeam;
    private String hashFormId;
}
