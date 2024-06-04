package com.kage.wfhs.service;

import org.springframework.stereotype.Service;

import org.apache.poi.ss.usermodel.Workbook;

import java.io.InputStream;
import java.sql.SQLException;
import java.text.ParseException;

@Service
public interface ExcelService {
    boolean readExcelAndInsertIntoDatabase(InputStream inputStream, String sheetName, Workbook workbook) throws SQLException, ParseException;

    void readAndSendEmail(InputStream inputStream, String sheetName, Workbook workbook);
}