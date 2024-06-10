package com.kage.wfhs.controller.view.admin;

import com.kage.wfhs.dto.ExcelImportDto;
import com.kage.wfhs.dto.LedgerDto;
import com.kage.wfhs.service.LedgerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/admin/")
@RequiredArgsConstructor
public class AdminViewController {
    @Autowired
    private final LedgerService ledgerService;

    @GetMapping("/division")
    public String divisionPage() {
        return "hr/division";
    }

    @GetMapping("/department")
    public String department() {
        return "hr/department";
    }

    @GetMapping("/team")
    public String team() {
        return "hr/team";
    }

    @GetMapping("/role")
    public String role() {
        return "hr/role";
    }

    @GetMapping("/approveRole")
    public String approveRole() {
        return "hr/approver";
    }

    @GetMapping("/user")
    public String addUser() {
        return "hr/user";
    }

    @GetMapping("/approveRoleSwitch")
    public String approveRoleSwitch() {
        return "approveRoleSwitch";
    }

    @GetMapping("/viewFormList")
    public String viewForm() {
        return "formList";
    }

    @GetMapping("/viewFormDetailsById")
    public String viewFormDetailsById() {
        return "viewFormDetailsById";
    }

    @GetMapping("/applyForm")
    public String applyForm() {
        return "applyForm";
    }

    @GetMapping("/historyForm")
    public String historyForm() {
        return "form";
    }

    @GetMapping("/ledger")
    public String ledgerPage(Model model) {
        List<LedgerDto> ledgerList = ledgerService.getAllLedger();
        model.addAttribute("ledgerList", ledgerList);

        return "hr/ledger";
    }

    @GetMapping("/importExcel")
    public String importExcel(ModelMap model) {
        model.addAttribute("dto", new ExcelImportDto());
        return "hr/importExcel";
    }

    @GetMapping("/permission")
    public String permission() {
        return "hr/permission";
    }
}
