/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.register_forms.dto;

import lombok.*;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterFormDto {
//     private Long id, applicantId, requesterId, approverId;
//     private String working_place, request_reason, os_type, status, signature, positionName, currentStatus;
//     private double request_percent;
//     private Date from_date, to_date, applied_date, signedDate;
//     private User applicant, requester;
////     private Position position;
//     private Capture capture;
//     private List<WorkFlowStatus> workFlowStatuses;
//     private MultipartFile operationSystemInput, securityPatchInput, antivirusSoftwareInput, antivirusPatternInput, antivirusFullScanInput, signatureInput;

     private Long id;
     private Long applicantId;
     private Long requesterId;
     private String positionName;
     private String workingPlace;
     private String requestReason;
     private double requestPercent;
     @DateTimeFormat(pattern = "yyyy-MM-dd")
     private Date fromDate;
     @DateTimeFormat(pattern = "yyyy-MM-dd")
     private Date toDate;
     private String osType;
     @DateTimeFormat(pattern = "yyyy-MM-dd")
     private Date appliedDate;
     @DateTimeFormat(pattern = "yyyy-MM-dd")
     private Date signedDate;
     private Long approverId;
     private MultipartFile operationSystemInput, securityPatchInput, antivirusSoftwareInput, antivirusPatternInput, antivirusFullScanInput, signatureInput;
     private String signature;

     // Add for ver 2.2 (Manual ver 1.8 - including WFA)
     private boolean wfaUserStatus;
}
