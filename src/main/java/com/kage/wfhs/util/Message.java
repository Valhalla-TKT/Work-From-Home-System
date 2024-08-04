/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.util;
// This class is Message Class for all email process

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@Getter
@Setter
public class Message {

    @Value("${email.subject.otp.service.desk}")
    private String emailSubjectForOtpByServiceDesk;

    @Value("${email.body.otp.service.desk.part1}")
    private String emailBodyForOTPByServiceDeskPart1;

    @Value("${email.body.otp.service.desk.part2}")
    private String emailBodyForOTPByServiceDeskPart2;

    @Value("${email.subject.otp.forget.password}")
    private String emailSubjectForOtpInForgetPasswordProcess;

    @Value("${email.body.otp.forget.password.part1}")
    private String emailBodyForOtpInForgetPasswordProcessPart1;

    @Value("${email.body.otp.forget.password.part2}")
    private String emailBodyForOtpInForgetPasswordProcessPart2;

    @Value("${otp.error.message}")
    private String otpErrorMessage;

    @Value("${error.unexpected}")
    private String unexpectedError;

//    public String getEmailSubjectForOtpByServiceDesk() {
//        LocalDate now = LocalDate.now();
//        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMMM");
//        DateTimeFormatter yearFormatter = DateTimeFormatter.ofPattern("yyyy");
//
//        String nextMonth = now.plusMonths(1).format(monthFormatter);
//        String currentYear = now.format(yearFormatter);
//
//        return emailSubjectForOtpByServiceDesk
//                .replace("${nextMonth}", nextMonth)
//                .replace("${currentYear}", currentYear);
//    }
}
