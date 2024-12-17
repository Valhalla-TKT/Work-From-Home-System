package com.kage.wfhs.api.work_from_abroad_information.controller;

import com.kage.wfhs.api.work_from_abroad_information.service.WorkFromAbroadInformationService;
import lombok.AllArgsConstructor;
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

        workFromAbroadInformationService.saveApplicantAppliedDate(applicantAppliedDate, Long.parseLong(formId));
        return ResponseEntity.ok("WFA Checklist updated successfully!");
    }

    @PutMapping("/update-wfa-checklist-by-approver")
    public ResponseEntity<String> updateWfaChecklistByApprover(
            @RequestParam("approverId") String approverId,
            @RequestParam("applicantAppliedDate") String applicantAppliedDate,
            @RequestParam("formId") String formId
    ) {
        workFromAbroadInformationService.saveApproverSignedDate(Long.parseLong(approverId), applicantAppliedDate, Long.parseLong(formId));
        return ResponseEntity.ok("WFA Checklist updated successfully!");
    }
}
