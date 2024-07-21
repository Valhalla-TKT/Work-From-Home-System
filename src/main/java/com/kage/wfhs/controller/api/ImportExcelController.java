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
        Map<String, Object> response = new HashMap<>();
        try {
            InputStream inputStream = file.getInputStream();

            if (file.isEmpty()) {
                response.put("success", false);
                response.put("message", "Uploaded file is empty.");
                return ResponseEntity.badRequest().body(response);
            }

            if (sheetName == null || sheetName.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Sheet name cannot be null or empty.");
                return ResponseEntity.badRequest().body(response);
            }

            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheet(sheetName);

            if (sheet == null) {
                response.put("success", false);
                response.put("message", "No sheet found with the name: " + sheetName);
                return ResponseEntity.badRequest().body(response);
            }

            if (excelService.readExcelAndInsertIntoDatabase(inputStream, sheetName, workbook)) {
                CurrentLoginUserDto admin = userService.changeFirstHRFirstLoginStatus();
                if (admin != null) {
                    logService.logUserExcelImport(admin);
                    response.put("success", true);
                    response.put("message", "File uploaded successfully. Redirecting to sign out...");
                    return ResponseEntity.ok(response);
                } else {
                    response.put("success", false);
                    response.put("message", "Failed to change the first HR login status.");
                    return ResponseEntity.status(500).body(response);
                }
            } else {
                response.put("success", false);
                response.put("message", "Failed to read Excel and insert into database.");
                return ResponseEntity.status(500).body(response);
            }

        } catch (IOException | SQLException | EmptyFileException e) {
            if (e instanceof EmptyFileException) {
                response.put("success", false);
                response.put("message", "Uploaded file is empty.");
            } else {
                e.printStackTrace();
                response.put("success", false);
                response.put("message", "Error uploading file: " + e.getMessage());
            }
            return ResponseEntity.status(500).body(response);
        }
    }
}
