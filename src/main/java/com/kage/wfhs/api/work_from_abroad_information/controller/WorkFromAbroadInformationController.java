package com.kage.wfhs.api.work_from_abroad_information.controller;

import com.kage.wfhs.api.work_from_abroad_information.service.WorkFromAbroadInformationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wfa")
@AllArgsConstructor
public class WorkFromAbroadInformationController {

    private final WorkFromAbroadInformationService workFromAbroadInformationService;

    @PostMapping("/update-wfa-checklist")
    public ResponseEntity<String> updateWfaChecklist(
            @RequestParam("applicantAppliedDate") String applicantAppliedDate,
            @RequestParam("formId") String formId) {

        try {
            workFromAbroadInformationService.saveApplicantAppliedDate(applicantAppliedDate, Long.parseLong(formId));

            return ResponseEntity.ok("WFA Checklist updated successfully!");

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the checklist. Please try again.");
        }
    }
}
