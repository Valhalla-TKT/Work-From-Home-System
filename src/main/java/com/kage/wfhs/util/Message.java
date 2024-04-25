package com.kage.wfhs.util;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
@AllArgsConstructor
@Getter
@Setter
public class Message {
	public static final String emailSubjectForOtp = "Radius OTP of DAT 0A VDI For March 2024";
	public static final String emailBodyForOTPPart1 = "Dear All,\n\nWe Would like to send Radius OTP as following of DAT OA VDI environment external access.\n";
	public static final String emailBodyForOTPPart2 = "Please type this OTP for external login access of DAT OA VDI.\nPlease let us know if you have any issue.\n\nBest Regards,\nDAT Service Desk";
}
