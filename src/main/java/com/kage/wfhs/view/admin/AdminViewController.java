package com.kage.wfhs.view.admin;

import com.kage.wfhs.api.departments.service.DepartmentService;
import com.kage.wfhs.api.divisions.service.DivisionService;
import com.kage.wfhs.api.excel.dto.ExcelImportDto;
import com.kage.wfhs.api.ledger.dto.LedgerDto;
import com.kage.wfhs.api.ledger.service.LedgerService;
import com.kage.wfhs.api.teams.service.TeamService;
import com.kage.wfhs.api.users.dto.UserCreationDto;
import com.kage.wfhs.api.users.service.UserService;
import com.kage.wfhs.api.session.dto.CurrentLoginUserDto;
import com.kage.wfhs.api.approve_roles.dto.ApproveRoleDto;
import com.kage.wfhs.api.approve_roles.service.ApproveRoleService;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadFormListDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationDto;
import com.kage.wfhs.api.work_from_abroad_information.service.WorkFromAbroadInformationService;
import com.kage.wfhs.common.util.EncryptionUtils;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin/")
@RequiredArgsConstructor
public class AdminViewController {

    private final LedgerService ledgerService;

    private final UserService userService;

    private final ApproveRoleService approveRoleService;

    private final TeamService teamService;

    private final DepartmentService departmentService;

    private final DivisionService divisionService;

    // Add for ver 2.2 (Manual ver 1.8 - including WFA)
    private final WorkFromAbroadInformationService workFromAbroadInformationService;

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
    public String addUser(Model model, HttpSession session) {
        CurrentLoginUserDto loginUser = (CurrentLoginUserDto) session.getAttribute("login-user");
        if (loginUser != null) {
            model.addAttribute("loginUser", loginUser);
        }
        return "hr/user";
    }

    @GetMapping("/user/new")
    public String userAddPage(ModelMap modelMap) {
        modelMap.addAttribute("user", new UserCreationDto());
        List<ApproveRoleDto> roles = approveRoleService.getAllApproveRole().stream()
                .peek(role -> role.setName(formatRoleName(role.getName())))
                .toList();
        modelMap.addAttribute("roles", roles);
        modelMap.addAttribute("teams", teamService.getAllTeam());
        modelMap.addAttribute("departments", departmentService.getAllDepartment());
        modelMap.addAttribute("divisions", divisionService.getAllDivision());
        return "hr/userNew";
    }

    private String formatRoleName(String roleName) {
        return Arrays.stream(roleName.toLowerCase().split("_"))
                .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    @PostMapping("/user/new")
    public String addUser(@ModelAttribute("user") UserCreationDto userDto) {
        userService.createUser(userDto);
        return "redirect:/admin/user";
    }

    @GetMapping("/approveRoleSwitch")
    public String approveRoleSwitch() {
        return "approveRoleSwitch";
    }

    @GetMapping("/viewFormList")
    public String viewForm() {
        return "formList";
    }

    @GetMapping("/viewFormListGrid")
    public String viewFormListGridView() {
        return "forms/formListGrid";
    }

    @GetMapping("/form/{form}/user/{user}")
    public String viewFormDetailsById(@PathVariable String form, @PathVariable String user) {
        return "viewFormDetailsById";
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

//    @GetMapping("/permission")
//    public String permission() {
//        return "hr/permission";
//    }

    @GetMapping("/wfa-form-list")
    public String wfaFormList(ModelMap model) {
        List<WorkFromAbroadFormListDto> workFromAbroadFormListDtoList = workFromAbroadInformationService.getWorkFromAbroadFormList();
        model.addAttribute("wfaFormList", workFromAbroadFormListDtoList);
        return "viewWFAFormList";
    }

    // Add for ver 2.2 (Manual ver 1.8 - including WFA)
    @GetMapping("/form/{hashFormId}/wfa/view-wfa-checklist-by-approver")
    public String viewWfaCheckListByApprover(
            @PathVariable("hashFormId") String hashFormId,
            ModelMap model
    ) {
        try {
            String decryptedFormId = EncryptionUtils.decrypt(hashFormId);
            Long formId = Long.parseLong(decryptedFormId);
            WorkFromAbroadInformationDto workFromAbroadInformationDto = workFromAbroadInformationService.getWorkFromAbroadInformationByFormID(formId);
            model.addAttribute("workFromAbroadInformation", workFromAbroadInformationDto);
            return "viewWFAFormCheckListByApprover";
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid hashFormId format");
        }
    }
}
