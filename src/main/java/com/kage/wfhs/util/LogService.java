package com.kage.wfhs.util;

import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class LogService {
    private static final Logger logger = LoggerFactory.getLogger(LogService.class);
    private static final String LOGIN_LOG_FILE = "logs/wfhs-login.log";
    private static final String EXCEL_IMPORT_LOG_FILE = "logs/wfhs-excel-import.log";
    private static final String ROLE_SWITCH_LOG_FILE = "logs/wfhs-role-switch.log";
    private static final String FORM_APPLY_LOG_FILE = "logs/wfhs-form-apply.log";

    public void writeLoginLog(String logMessage) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(LOGIN_LOG_FILE, true))) {
            writer.write(logMessage);
            writer.newLine();
        } catch (IOException e) {
            logger.error("Error writing login log: ", e);
        }
    }

    public void logUserLogin(CurrentLoginUserDto userDto, String deviceInfo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String currentTime = LocalDateTime.now().format(formatter);
        String deviceInformation = (deviceInfo != null && !deviceInfo.trim().isEmpty()) ? deviceInfo : "Unknown Device";
        String logMessage = getLogMessage(userDto, currentTime, deviceInformation);
        logger.info(logMessage);
        writeLoginLog(logMessage);
    }

    private static String getLogMessage(CurrentLoginUserDto userDto, String currentTime, String deviceInformation) {
        String teamName = userDto.getTeam() != null ? userDto.getTeam().getName() : "No Team";
        String departmentName = userDto.getDepartment() != null ? userDto.getDepartment().getName() : "No Department";
        String divisionName = userDto.getDivision() != null ? userDto.getDivision().getName() : "No Division";
        System.out.println(currentTime + ": User: " + userDto.getStaffId() + ", " + userDto.getName() + ", team (" + teamName + ") Logged in.");
        return String.format("User logged in at %s: Staff ID=%s, Name=%s, Team Name=%s, Department Name=%s, Division Name=%s, Device Info=%s",
                currentTime,
                userDto.getStaffId(),
                userDto.getName(),
                teamName,
                departmentName,
                divisionName,
                deviceInformation);
    }

    public void writeExcelImportLog(String logMessage) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(EXCEL_IMPORT_LOG_FILE, true))) {
            writer.write(logMessage);
            writer.newLine();
        } catch (IOException e) {
            logger.error("Error writing login log: ", e);
        }
    }

    public void logUserExcelImport(CurrentLoginUserDto userDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String currentTime = LocalDateTime.now().format(formatter);

        String logMessage = String.format("%s: Staff ID=%s, Name=%s, Team Name=%s, Department Name=%s, Division Name=%s imported excel.",
                currentTime,
                userDto.getStaffId(),
                userDto.getName(),
                userDto.getTeam() != null ? userDto.getTeam().getName() : "No Team",
                userDto.getDepartment() != null ? userDto.getDepartment().getName() : "No Department",
                userDto.getDepartment() != null ? userDto.getDivision().getName() : "No Division");

        logger.info(logMessage);
        writeExcelImportLog(logMessage);
    }

    public void writeRoleSwitchLog(String logMessage) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(ROLE_SWITCH_LOG_FILE, true))) {
            writer.write(logMessage);
            writer.newLine();
        } catch (IOException e) {
            logger.error("Error writing login log: ", e);
        }
    }

    public void logUserRoleSwitch(String staffId, String name, String fromRole, String toRole, String adminName) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String currentTime = LocalDateTime.now().format(formatter);

        String logMessage = String.format("User role switched at %s: Staff ID=%s, Name=%s, From Role=%s, To Role=%s, Performed By=%s",
                currentTime,
                staffId,
                name,
                fromRole,
                toRole,
                adminName);

        logger.info(logMessage);
        writeRoleSwitchLog(logMessage);
    }

    public void writeFormApplytLog(String logMessage) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FORM_APPLY_LOG_FILE, true))) {
            writer.write(logMessage);
            writer.newLine();
        } catch (IOException e) {
            logger.error("Error writing login log: ", e);
        }
    }

    public void logUserFormApply(CurrentLoginUserDto userDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String currentTime = LocalDateTime.now().format(formatter);

        String logMessage = String.format("%s: User wih Staff ID=%s, Name=%s, Team Name=%s, Department Name=%s, Division Name=%s apply work from home form.",
                currentTime,
                userDto.getStaffId(),
                userDto.getName(),
                userDto.getTeam() != null ? userDto.getTeam().getName() : "No Team",
                userDto.getDepartment() != null ? userDto.getDepartment().getName() : "No Department",
                userDto.getDepartment() != null ? userDto.getDivision().getName() : "No Division");

        logger.info(logMessage);
        writeFormApplytLog(logMessage);
    }
}
