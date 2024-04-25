package com.kage.wfhs.controller.excel;

import com.kage.wfhs.dto.ExcelImportDto;
import com.kage.wfhs.util.ExcelParser;

import lombok.AllArgsConstructor;
import org.apache.poi.EmptyFileException;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

@Controller
@AllArgsConstructor
public class ImportExcelController {
    private final ExcelParser excelService;
    @PostMapping("/importExcel")
    public String uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("sheetName") String sheetName,
                             RedirectAttributes redirectAttributes, ModelMap model) {
        try {
            InputStream inputStream = file.getInputStream();

            if (file.isEmpty()) {
                model.addAttribute("message", "Uploaded file is empty.");
                System.out.println("Empty file");
                model.addAttribute("dto", new ExcelImportDto());
                return "hr/importExcel";
            }

            if (sheetName == null || sheetName.trim().isEmpty()) {
                model.addAttribute("message", "Sheet name cannot be null or empty.");
                System.out.println("No sheet");
                model.addAttribute("dto", new ExcelImportDto());
                return "hr/importExcel";
            }

            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheet(sheetName);

            if (sheet == null) {
                model.addAttribute("message", "No sheet found with the name: " + sheetName);
                System.out.println("No sheet found with the name: " + sheetName);
                model.addAttribute("dto", new ExcelImportDto());
                return "hr/importExcel";
            }

            excelService.parse(inputStream, sheetName, workbook);
            redirectAttributes.addFlashAttribute("message", "File uploaded successfully!");
            redirectAttributes.addFlashAttribute("currentSheetName", sheetName);
        } catch (IOException | SQLException | EmptyFileException e) {
            if (e instanceof EmptyFileException) {
                model.addAttribute("message", "Uploaded file is empty.");
            } else {
                e.printStackTrace();
                model.addAttribute("message", "Error uploading file: " + e.getMessage());
            }
        }
        return "redirect:/viewCloneTable";
    }
}
