/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.util;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;

import com.kage.wfhs.model.RegisterForm;

import org.apache.poi.xssf.usermodel.XSSFFont;


import jakarta.servlet.ServletOutputStream;
import java.io.IOException;
import java.util.List;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import jakarta.servlet.http.HttpServletResponse;

@Component
@ApplicationScope
public class OTPStaffIDExcelGenerator {
	private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<RegisterForm> RegisterFormList;
    
    public OTPStaffIDExcelGenerator(List<RegisterForm> RegisterFormList){
    	this.RegisterFormList = RegisterFormList;
    	workbook = new XSSFWorkbook();
    }
    
    private void writeHeaderLine() {
        sheet = workbook.createSheet("Staff ID for OTP Sending Process");
        Row row = sheet.createRow(0);
        CellStyle style = workbook.createCellStyle();
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont font = workbook.createFont();
        font.setFontHeight(11);
        font.setBold(true);
        style.setFont(font);

        createCell(row, 0, "No", style);
        createCell(row, 1, "Staff ID", style);
        createCell(row, 2, "Name", style);
        createCell(row, 3, "Email", style);
        createCell(row, 4, "OTP Code", style);
    }
    
    private void writeDataLines() {
        int rowCount = 1;
        int seqNo = 1;
        CellStyle style = workbook.createCellStyle();
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont font = workbook.createFont();
        font.setFontHeight(11);
        style.setFont(font);

        for (RegisterForm RegisterForm : this.RegisterFormList) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            createCell(row, columnCount++, seqNo++, style);
            createCell(row, columnCount++, RegisterForm.getApplicant().getStaffId(), style);
            createCell(row, columnCount++, RegisterForm.getApplicant().getName(), style);
            createCell(row, columnCount++, RegisterForm.getApplicant().getEmail(), style);
            createCell(row, columnCount++, " ", style);
        }
        for(int i = 0 ; i < 8; i++) {
            sheet.autoSizeColumn(i);
        }
    }
    
    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        Cell cell = row.createCell(columnCount);
        if(value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if(value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else if(value instanceof Long){
            cell.setCellValue((Long) value);
        } else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }

    public void export(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        writeHeaderLine();
        writeDataLines();
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }
}
