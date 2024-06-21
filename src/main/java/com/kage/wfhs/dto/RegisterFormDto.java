/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.dto;

import com.kage.wfhs.model.Capture;
import com.kage.wfhs.model.User;
import com.kage.wfhs.model.WorkFlowStatus;

import lombok.*;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterFormDto {
     private Long id, applicantId, requesterId;
     private String working_place, request_reason, os_type, status, signature, positionName, currentStatus;
     private double request_percent;
     private Date from_date, to_date, applied_date, signedDate;
     private User applicant, requester;
//     private Position position;
     private Capture capture;
     private List<WorkFlowStatus> workFlowStatuses;
     private MultipartFile operationSystemInput, securityPatchInput, antivirusSoftwareInput, antivirusPatternInput, antivirusFullScanInput, signatureInput;
     
     
}
