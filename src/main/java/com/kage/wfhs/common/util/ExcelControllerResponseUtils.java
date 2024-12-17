package com.kage.wfhs.common.util;

import org.apache.poi.EmptyFileException;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ExcelControllerResponseUtils {

    public static ResponseEntity<Map<String, Object>> validateFileAndSheet(MultipartFile file, String sheetName) throws IOException {
        Map<String, Object> response = new HashMap<>();
        if (file.isEmpty()) {
            return createErrorResponse("Uploaded file is empty.");
        }

        if (sheetName == null || sheetName.trim().isEmpty()) {
            return createErrorResponse("Sheet name cannot be null or empty.");
        }

        return null;
    }

    public static ResponseEntity<Map<String, Object>> validateSheet(Sheet sheet, String sheetName) {
        Map<String, Object> response = new HashMap<>();
        if (sheet == null) {
            return createErrorResponse("No sheet found with the name: " + sheetName);
        }

        return null;
    }

    public static ResponseEntity<Map<String, Object>> handleException(Exception e) {
        Map<String, Object> response = new HashMap<>();
        if (e instanceof EmptyFileException) {
            response.put("success", false);
            response.put("message", "Uploaded file is empty.");
        } else {
            response.put("success", false);
            response.put("message", "Error uploading file: " + e.getMessage());
        }
        return ResponseEntity.status(500).body(response);
    }

    public static ResponseEntity<Map<String, Object>> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", message);
        return ResponseEntity.badRequest().body(response);
    }
}
