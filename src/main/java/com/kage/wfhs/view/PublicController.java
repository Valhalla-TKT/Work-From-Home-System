/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.view;

import com.kage.wfhs.api.captures.dto.CaptureDto;
import com.kage.wfhs.api.captures.service.CaptureService;
import com.kage.wfhs.api.ledger.service.LedgerService;
import com.kage.wfhs.api.register_forms.dto.RegisterFormDto;
import com.kage.wfhs.api.register_forms.service.RegisterFormService;
import com.kage.wfhs.api.users.dto.UserDto;
import com.kage.wfhs.api.users.service.UserService;
import com.kage.wfhs.api.session.dto.CurrentLoginUserDto;
import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.departments.repository.DepartmentRepository;
import com.kage.wfhs.api.divisions.repository.DivisionRepository;
import com.kage.wfhs.api.teams.repository.TeamRepository;
import com.kage.wfhs.api.users.repository.UserRepository;

import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationApplyDto;
import com.kage.wfhs.api.work_from_abroad_information.dto.WorkFromAbroadInformationDto;
import com.kage.wfhs.api.work_from_abroad_information.service.WorkFromAbroadInformationService;
import com.kage.wfhs.common.jwt.JwtUtils;
import com.kage.wfhs.common.util.TokenService;
import com.kage.wfhs.api.approve_roles.service.ApproveRoleService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@AllArgsConstructor
@RequestMapping("/")
public class PublicController {

    private static final Logger log = LoggerFactory.getLogger(PublicController.class);
    private final UserService userService;
    private final LedgerService ledgerService;
    private final ApproveRoleService approveRoleService;
//    private final NotificationTypeService notificationTypeService;
    private final DivisionRepository divisionRepo;
    private final DepartmentRepository departmentRepo;
    private final TeamRepository teamRepo;
    private final UserRepository userRepo;
    private final TokenService tokenService;
    private final RegisterFormService registerFormService;
    private final CaptureService captureService;
    private final JwtUtils jwtUtils;

    // Add for ver 2.2 (Manual ver 1.8 - including WFA)
    public final WorkFromAbroadInformationService workFromAbroadInformationService;
    
    @GetMapping("/login")
    public String login(){
        return "login";
    }
   
    @GetMapping("/home")
    public String home(HttpSession session, ModelMap model){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()){
            CurrentLoginUserDto userDto = userService.getLoginUserBystaffId(authentication.getName());
            //session.setAttribute("login-user", userDto);
//            int notificationTypeCount = notificationTypeService.getAllNotificationTypes().size();
//            if(notificationTypeCount == 0) {
//                notificationTypeService.addAllNotificationTypes();
//            }
            Set<ApproveRole> userApproveRoles = userDto.getApproveRoles();
            for (ApproveRole userApproveRole : userApproveRoles) {
                if (userApproveRole.getName().equalsIgnoreCase("HR") && userDto.isFirstTimeLogin()) {
                    return "redirect:/importExcel";
                } else if (userApproveRole.getName().equalsIgnoreCase("APPLICANT") && userDto.isFirstTimeLogin()) {
                    return "profile";
                }
            }
            if(!userDto.isFirstTimeLogin()) {
                model.addAttribute("divisionCount", divisionRepo.count());
                model.addAttribute("departmentCount", departmentRepo.count());
                model.addAttribute("teamCount", teamRepo.count());
                model.addAttribute("userCount", userRepo.count());
                return "dashboard";
            }                      
        }
        return "redirect:/login";        
    }

    @GetMapping("/profile")
    public String viewProfile(){
        return "profile";
    }

    @GetMapping("/help")
    public String helpPage(){
        return "help";
    }
    
    @GetMapping("/contactSupport")
    public String contactSupportPage(){
        return "contactSupport";
    }

    @GetMapping("/accessDenied")
    public String accessDeniedPage(){
        return "accessDenied";
    }

    @GetMapping("/applyForm")
    public String applyForm() {
        return "applyForm";
    }

    @PostMapping("/form/generateToken")
    @ResponseBody
    public Map<String, Object> generateFormToken(HttpServletRequest request, @RequestBody Map<String, Long> payload) {
        Map<String, Object> response = new HashMap<>();
        try {
            long formId = payload.get("formId");
            String formToken = tokenService.generateSecureToken(formId);
            tokenService.storeTokenMapping(formToken, formId);
            response.put("success", true);
            response.put("redirectUrl", "/form/viewDetail/" + formToken);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error in generating form token");
        }
        return response;
    }

    @GetMapping("/form/viewDetail/{formToken}")
    public String viewDetail(HttpServletRequest request, @PathVariable("formToken") String formToken, ModelMap model) {
        if (jwtUtils.isTokenValid(request)) {
            String jwtToken = jwtUtils.extractTokenFromCookie(request);
            String username = jwtUtils.getUsernameFromToken(jwtToken);
            Long formId = tokenService.getFormIdByToken(formToken);

            if (formId != null && isAuthorizedUser(username, formId)) {
                RegisterFormDto registerForm = registerFormService.getRegisterForm(formId);
                CaptureDto captureDto = captureService.getCaptureByRegisterForm(formId);
                UserDto applicant = userService.getUserById(registerForm.getApplicantId());
                UserDto requester = userService.getUserById(registerForm.getRequesterId());

                model.addAttribute("registerForm", registerForm);
                model.addAttribute("capture", captureDto);
                model.addAttribute("applicant", applicant);
                model.addAttribute("requester", requester);

                return "viewFormDetail";
            } else {
                return "error"; // or redirect to an error page
            }
        } else {
            return "error"; // or redirect to an error page
        }
    }

    // Add for ver 2.2 (Manual ver 1.8 - including WFA)
    @PostMapping("/form/wfa/generateToken")
    @ResponseBody
    public Map<String, Object> generateWFAFormToken(HttpServletRequest request, @RequestBody Map<String, Long> payload) {
        Map<String, Object> response = new HashMap<>();
        try {
            long formId = payload.get("formId");
            String formToken = tokenService.generateSecureToken(formId);
            tokenService.storeTokenMapping(formToken, formId);
            response.put("success", true);
            response.put("redirectUrl", "/form/wfa/viewCheckList/" + formToken);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error in generating form token");
        }
        return response;
    }

    @GetMapping("/form/wfa/viewCheckList/{formToken}")
    public String viewCheckList(HttpServletRequest request, @PathVariable("formToken") String formToken, ModelMap model) {
        if (jwtUtils.isTokenValid(request)) {
            String jwtToken = jwtUtils.extractTokenFromCookie(request);
            String username = jwtUtils.getUsernameFromToken(jwtToken);
            Long formId = tokenService.getFormIdByToken(formToken);

            if (formId != null && isAuthorizedUser(username, formId)) {
                WorkFromAbroadInformationDto workFromAbroadInformationDto = workFromAbroadInformationService.getWorkFromAbroadInformationByFormID(formId);
                model.addAttribute("workFromAbroadInformation", workFromAbroadInformationDto);
//                model.addAttribute("workFromAbroadInformationDto", new WorkFromAbroadInformationApplyDto());
                return "viewWFAFormCheckList";
            } else {
                return "error";
            }
        } else {
            return "error";
        }
    }

    private boolean isAuthorizedUser(String username, Long formId) {
        RegisterFormDto registerForm = registerFormService.getRegisterForm(formId);
        UserDto applicant = userService.getUserById(registerForm.getApplicantId());
        return username.equals(applicant.getStaffId());
    }

    @GetMapping("/historyForm")
    public String historyForm() {
        return "formHistory";
    }
}
