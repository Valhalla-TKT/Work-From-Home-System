/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.excel;

import com.kage.wfhs.dto.ExcelImportDto;
import com.kage.wfhs.service.ExcelService;
import com.kage.wfhs.service.UserService;

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

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.text.ParseException;

@Controller
@AllArgsConstructor
public class ImportExcelController {
//    private final ExcelParser excelService;
	private final ExcelService excelService;
	private final UserService userService;

	@PostMapping("/admin/importExcel")
	public String uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("sheetName") String sheetName,
			ModelMap model) throws ParseException {
		try {
			InputStream inputStream = file.getInputStream();

			if (file.isEmpty()) {
				model.addAttribute("message", "Uploaded file is empty.");
				model.addAttribute("dto", new ExcelImportDto());
				return "hr/importExcel";
			}

			if (sheetName == null || sheetName.trim().isEmpty()) {
				model.addAttribute("message", "Sheet name cannot be null or empty.");
				model.addAttribute("dto", new ExcelImportDto());
				return "hr/importExcel";
			}

			Workbook workbook = WorkbookFactory.create(inputStream);
			Sheet sheet = workbook.getSheet(sheetName);

			if (sheet == null) {
				model.addAttribute("message", "No sheet found with the name: " + sheetName);
				model.addAttribute("dto", new ExcelImportDto());
				return "hr/importExcel";
			}

			if (excelService.readExcelAndInsertIntoDatabase(inputStream, sheetName, workbook)) {
				boolean changeSuccess = userService.changeFirstHRFirstLoginStatus();
				if (changeSuccess) {
					return "redirect:/signOut";
				} else {
					model.addAttribute("message", "Failed to change the first HR login status.");
					model.addAttribute("dto", new ExcelImportDto());
					return "hr/importExcel";
				}
			} else {
				model.addAttribute("message", "Failed to read Excel and insert into database.");
				model.addAttribute("dto", new ExcelImportDto());
				return "hr/importExcel";
			}

		} catch (IOException | SQLException | EmptyFileException e) {
			if (e instanceof EmptyFileException) {
				model.addAttribute("message", "Uploaded file is empty.");
			} else {
				e.printStackTrace();
				model.addAttribute("message", "Error uploading file: " + e.getMessage());
			}
			return "hr/importExcel";
		}
	}
}
