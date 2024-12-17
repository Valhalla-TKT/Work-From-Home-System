/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.common.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailSenderService {
	@Autowired
    private JavaMailSender mailSender; 

//    public void sendEmail(String toEmail, String subject, String body){
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("tktvalhalla@gmail.com");
//        message.setTo(toEmail);
//        message.setText(body);
//        message.setSubject(subject);
//        mailSender.send(message);
//        log.info("Mail Sent Successfully......");
//    }

    public void sendEmail(String toEmail, String subject, String body) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(body, true); // Set to true for HTML content
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setFrom("tktvalhalla@gmail.com");

            mailSender.send(mimeMessage);
            log.info("Mail Sent Successfully......");
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
        }
    }

    public void sendMail(String toEmail,String subject,String body) {
        this.sendEmail(toEmail, subject, body);
    }
}
