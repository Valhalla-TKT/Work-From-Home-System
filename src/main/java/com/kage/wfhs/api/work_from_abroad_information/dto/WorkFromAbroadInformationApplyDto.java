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
 * This class is for Applicant apply form
 */

@Data
public class WorkFromAbroadInformationApplyDto {
    private Long id;
    private Long applicantId;
    private Date applicantAppliedDate;
    private boolean applicantAppliedCheckbox1;
    private boolean applicantAppliedCheckbox2;
    private String applicantSignature;
    private Date applicantSignedDate;
}
