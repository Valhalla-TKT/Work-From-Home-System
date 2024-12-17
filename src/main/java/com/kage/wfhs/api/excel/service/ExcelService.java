package com.kage.wfhs.api.excel.service;

import org.springframework.stereotype.Service;

import org.apache.poi.ss.usermodel.Workbook;

import java.io.InputStream;
import java.sql.SQLException;

@Service
public interface ExcelService {
    boolean readExcelAndInsertIntoDatabase(InputStream inputStream, String sheetName, Workbook workbook) throws SQLException;

    void readAndSendEmail(InputStream inputStream, String sheetName, Workbook workbook);
}