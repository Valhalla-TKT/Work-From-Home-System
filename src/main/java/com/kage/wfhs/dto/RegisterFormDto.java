package com.kage.wfhs.dto;

import com.kage.wfhs.model.Capture;
import com.kage.wfhs.model.Position;
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

public class RegisterFormDto {
     private long id, applicantId, requesterId;
     private String working_place, request_reason, os_type, status, signature;
     private double request_percent;
     private Date from_date, to_date, applied_date, signedDate;
     private User applicant, requester;
     private Position position;
     private Capture capture;
     private List<WorkFlowStatus> workFlowStatuses;
     private MultipartFile operationSystemInput, securityPatchInput, antivirusSoftwareInput, antivirusPatternInput, antivirusFullScanInput, signatureInput;
	@Override
	public String toString() {
		return "RegisterFormDto [id=" + id + ", applicantId=" + applicantId + ", requesterId=" + requesterId
				+ ", working_place=" + working_place + ", request_reason=" + request_reason + ", os_type=" + os_type
				+ ", request_percent=" + request_percent + ", from_date=" + from_date + ", to_date=" + to_date
				+ ", applied_date=" + applied_date + ", applicant=" + applicant + ", requester=" + requester
				+ ", capture=" + capture + "]";
	}
     
     
}
