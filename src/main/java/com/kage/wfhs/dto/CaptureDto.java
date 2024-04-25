package com.kage.wfhs.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CaptureDto {
	private long id, registerFormId;
    private String os_type, operationSystem, securityPatch, antivirusSoftware, antivirusPattern, antivirusFullScan;
}
