/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-11-10
 * @Time  		 : 00:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.work_from_abroad_information.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/*
 * Add for ver 2.2 (Manual ver 1.8 - including WFA)
 * Tables for Work From Abroad Information
 */

@Entity
@Table(name = "work_from_abroad_info")
@Getter
@Setter
public class WorkFromAbroadInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long registerFormId;

    @Column(name = "project_manager_name")
    private String projectManagerName;

    @Column(name = "project_manager_approved_date")
    private Date projectManagerApprovedDate;

    @Column(name = "dept_head_name")
    private String deptHeadName;

    @Column(name = "dept_head_approved_date")
    private Date deptHeadApprovedDate;

    @Column(name = "division_head_name")
    private String divisionHeadName;

    @Column(name = "division_head_approved_date")
    private Date divisionHeadApprovedDate;

    private Long applicantId;

    @Column(name = "applicant_applied_date")
    private Date applicantAppliedDate;

    @Column(name = "is_applicant_applied_checkbox_1")
    private boolean isApplicantAppliedCheckbox1;

    @Column(name = "is_applicant_applied_checkbox_2")
    private boolean isApplicantAppliedCheckbox2;

    @Column(name = "admin_hr_1_name")
    private String adminHR1Name;

    @Column(name = "admin_hr_approved_date")
    private Date adminHR1ApprovedDate;

    @Column(name = "admin_hr_2_name")
    private String adminHR2Name;

    @Column(name = "admin_hr_2_approved_date")
    private Date adminHR2ApprovedDate;

    @Column(name = "applicant_signature", columnDefinition = "LONGTEXT")
    private String applicantSignature;

    @Column(name = "applicant_signed_date")
    private Date applicantSignedDate;
}
