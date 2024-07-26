/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.view;

import com.kage.wfhs.dto.CaptureDto;
import com.kage.wfhs.dto.RegisterFormDto;
import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.dto.WorkFlowStatusDto;
import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.repository.DivisionRepository;
import com.kage.wfhs.repository.TeamRepository;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.service.*;

import com.kage.wfhs.util.JwtUtils;
import com.kage.wfhs.util.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.commons.codec.binary.Base64;

@Controller
@AllArgsConstructor
@RequestMapping("/")
public class ViewController {

    private static final Logger log = LoggerFactory.getLogger(ViewController.class);
    private final UserService userService;
    private final LedgerService ledgerService;
    private final ApproveRoleService approveRoleService;
    private final NotificationTypeService notificationTypeService;
    private final DivisionRepository divisionRepo;
    private final DepartmentRepository departmentRepo;
    private final TeamRepository teamRepo;
    private final UserRepository userRepo;
    private final TokenService tokenService;
    private final RegisterFormService registerFormService;
    private final CaptureService captureService;
    private final JwtUtils jwtUtils;
    
    @GetMapping("/login")
    public String login(){
        return "login";
    }
   
    @GetMapping("/dashboard")
    public String home(HttpSession session, ModelMap model){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()){
            CurrentLoginUserDto userDto = userService.getLoginUserBystaffId(authentication.getName());
            //session.setAttribute("login-user", userDto);
            int notificationTypeCount = notificationTypeService.getAllNotificationTypes().size();
            if(notificationTypeCount == 0) {
                notificationTypeService.addAllNotificationTypes();
            }
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

//    @PostMapping("/form/viewDetail")
//    @ResponseBody
//    public Map<String, Object> viewDetail(@RequestBody Map<String, Long> payload) {
//        Map<String, Object> response = new HashMap<>();
//        try {
//            long formId = payload.get("formId");
//            String formToken = tokenService.generateSecureToken(formId);
//            tokenService.storeTokenMapping(formToken, formId);
//            response.put("success", true);
//            response.put("formToken", formToken);
//        } catch (Exception e) {
//            response.put("success", false);
//            response.put("message", "Error in generating form token");
//        }
//        return response;
//    }
//
//    @GetMapping("/form/viewDetail/{formToken}")
//    public String viewDetail(@PathVariable("formToken") String formToken, ModelMap model) {
//        Long formId = tokenService.getFormIdByToken(formToken);
//        System.out.println("formId = " + formId);
//
//        RegisterFormDto registerForm = registerFormService.getRegisterForm(formId);
//        CaptureDto captureDto = captureService.getCaptureByRegisterForm(formId);
//        UserDto applicant = userService.getUserById(registerForm.getApplicantId());
//        UserDto requester = userService.getUserById(registerForm.getRequesterId());
//
//        model.addAttribute("registerForm", registerForm);
//        model.addAttribute("capture", captureDto);
//        model.addAttribute("applicant", applicant);
//        model.addAttribute("requester", requester);
//
//        return "viewFormDetail";
//    }


    @PostMapping("/form/viewDetail")
    @ResponseBody
    public Map<String, Object> viewDetail(HttpServletRequest request, @RequestBody Map<String, Long> payload) {
        Map<String, Object> response = new HashMap<>();
        String token = jwtUtils.extractTokenFromHeader(request);

        if (token != null && jwtUtils.validateToken(token)) {
            try {
                long formId = payload.get("formId");
                String formToken = tokenService.generateSecureToken(formId);
                tokenService.storeTokenMapping(formToken, formId);
                response.put("success", true);
                response.put("formToken", formToken);
            } catch (Exception e) {
                response.put("success", false);
                response.put("message", "Error in generating form token");
            }
        } else {
            response.put("success", false);
            response.put("message", "Invalid or missing JWT token");
        }
        return response;
    }

    @GetMapping("/form/viewDetail/{formToken}")
    public String viewDetail(HttpServletRequest request, @PathVariable("formToken") String formToken, ModelMap model) {
        System.out.println(request );
        System.out.println(formToken);
        String token = jwtUtils.extractTokenFromHeader(request);

        if (token != null && jwtUtils.validateToken(token)) {
            Long formId = tokenService.getFormIdByToken(formToken);
            System.out.println("formId = " + formId);

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
    }

    @GetMapping("/historyForm")
    public String historyForm() {
        return "formHistory";
    }

}
