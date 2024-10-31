package com.kage.wfhs.controller.view.admin;

import com.kage.wfhs.dto.*;
import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import com.kage.wfhs.service.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/permission")
    public String permission() {
        return "hr/permission";
    }
}
