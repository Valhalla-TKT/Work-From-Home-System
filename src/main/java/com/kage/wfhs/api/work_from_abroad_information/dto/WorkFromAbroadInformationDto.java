/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-11-10
 * @Time  		 : 00:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.work_from_abroad_information.dto;

import lombok.Data;
import java.util.Date;

/*
 * Add for ver 2.2 (Manual ver 1.8 - including WFA)
 */

@Data
public class WorkFromAbroadInformationDto {
    private Long id;
    private Long registerFormId;
    private String projectManagerName;
    private Date projectManagerApprovedDate;
    private String deptHeadName;
    private Date deptHeadApprovedDate;
    private String divisionHeadName;
    private Date divisionHeadApprovedDate;
    private Long applicantId;
    private Date applicantAppliedDate;
    private boolean isApplicantAppliedCheckbox1;
    private boolean isApplicantAppliedCheckbox2;
    private String adminHR1Name;
    private Date adminHR1ApprovedDate;
    private String adminHR2Name;
    private Date adminHR2ApprovedDate;
    private String applicantSignature;
    private Date applicantSignedDate;
}
