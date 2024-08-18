package com.kage.wfhs.util;

import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class LogService {

  public void logUserLogin(CurrentLoginUserDto userDto, String deviceInfo) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String currentTime = LocalDateTime.now().format(formatter);
    String deviceInformation =
        (deviceInfo != null && !deviceInfo.trim().isEmpty()) ? deviceInfo : "Unknown Device";
    writeLogMessage(userDto, currentTime, deviceInformation);
  }

  private static void writeLogMessage(
    CurrentLoginUserDto userDto, String currentTime, String deviceInformation) {
    String teamName = userDto.getTeam() != null ? userDto.getTeam().getName() : "No Team";
    String departmentName =
        userDto.getDepartment() != null ? userDto.getDepartment().getName() : "No Department";
    String divisionName =
        userDto.getDivision() != null ? userDto.getDivision().getName() : "No Division";
    System.out.println(
        currentTime
            + ": User: "
            + userDto.getStaffId()
            + ", "
            + userDto.getName()
            + ", team ("
            + teamName
            + ") Logged in.");
  }

  public void logUserExcelImport(CurrentLoginUserDto userDto) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String currentTime = LocalDateTime.now().format(formatter);

    String logMessage =
        String.format(
            "%s: Staff ID=%s, Name=%s, Team Name=%s, Department Name=%s, Division Name=%s imported excel.",
            currentTime,
            userDto.getStaffId(),
            userDto.getName(),
            userDto.getTeam() != null ? userDto.getTeam().getName() : "No Team",
            userDto.getDepartment() != null ? userDto.getDepartment().getName() : "No Department",
            userDto.getDepartment() != null ? userDto.getDivision().getName() : "No Division");

    System.out.println(logMessage);
  }

  public void logUserRoleSwitch(
    String staffId, String name, String fromRole, String toRole, String adminName) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String currentTime = LocalDateTime.now().format(formatter);

    String logMessage =
        String.format(
            "User role switched at %s: Staff ID=%s, Name=%s, From Role=%s, To Role=%s, Performed By=%s",
            currentTime, staffId, name, fromRole, toRole, adminName);

    System.out.println(logMessage);
  }

  public void logUserFormApply(CurrentLoginUserDto userDto) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String currentTime = LocalDateTime.now().format(formatter);

    String logMessage =
        String.format(
            "%s: User wih Staff ID=%s, Name=%s, Team Name=%s, Department Name=%s, Division Name=%s apply work from home form.",
            currentTime,
            userDto.getStaffId(),
            userDto.getName(),
            userDto.getTeam() != null ? userDto.getTeam().getName() : "No Team",
            userDto.getDepartment() != null ? userDto.getDepartment().getName() : "No Department",
            userDto.getDepartment() != null ? userDto.getDivision().getName() : "No Division");

    System.out.println(logMessage);
  }
}
