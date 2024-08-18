/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-07-21
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */

package com.kage.wfhs.controller.api;

import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import com.kage.wfhs.service.ExcelService;
import com.kage.wfhs.service.UserService;
import com.kage.wfhs.util.ExcelControllerResponseUtils;
import com.kage.wfhs.util.LogService;
import lombok.AllArgsConstructor;
import org.apache.poi.EmptyFileException;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/importExcel")
@AllArgsConstructor
public class ImportExcelController {
    private final ExcelService excelService;
    private final UserService userService;
    private final LogService logService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("sheetName") String sheetName) throws ParseException {
        return processFile(file, sheetName);
    }

    private ResponseEntity<Map<String, Object>> processFile(MultipartFile file, String sheetName) throws ParseException {
        try {
            InputStream inputStream = file.getInputStream();

            ResponseEntity<Map<String, Object>> validationResponse = ExcelControllerResponseUtils.validateFileAndSheet(file, sheetName);
            if (validationResponse != null) return validationResponse;

            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheet(sheetName);

            ResponseEntity<Map<String, Object>> sheetResponse = ExcelControllerResponseUtils.validateSheet(sheet, sheetName);
            if (sheetResponse != null) return sheetResponse;
            return handleUpload(inputStream, sheetName, workbook);

        } catch (IOException | SQLException | EmptyFileException e) {
            return ExcelControllerResponseUtils.handleException(e);
        }
    }

    private ResponseEntity<Map<String, Object>> handleUpload(InputStream inputStream, String sheetName, Workbook workbook) throws SQLException, ParseException {
        if (excelService.readExcelAndInsertIntoDatabase(inputStream, sheetName, workbook)) {
            CurrentLoginUserDto admin = userService.changeFirstHRFirstLoginStatus();
            if (admin != null) {
                logService.logUserExcelImport(admin);
                System.out.println("Employee data excel imported successfully.");
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "File uploaded successfully. Redirecting to sign out...");
                return ResponseEntity.ok(response);
            } else {
                return ExcelControllerResponseUtils.createErrorResponse("Failed to change the first HR login status.");
            }
        } else {
            return ExcelControllerResponseUtils.createErrorResponse("Failed to read Excel and insert into database.");
        }
    }
}
