/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.view;

import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.repository.DivisionRepository;
import com.kage.wfhs.repository.TeamRepository;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.service.ApproveRoleService;
import com.kage.wfhs.service.LedgerService;
import com.kage.wfhs.service.NotificationTypeService;
import com.kage.wfhs.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

@Controller
@AllArgsConstructor
@RequestMapping("/")
public class ViewController {

    private final UserService userService;
    private final LedgerService ledgerService;
    private final ApproveRoleService approveRoleService;
    private final NotificationTypeService notificationTypeService;
    private final DivisionRepository divisionRepo;
    private final DepartmentRepository departmentRepo;
    private final TeamRepository teamRepo;
    private final UserRepository userRepo;
    
    @GetMapping("/login")
    public String login(){
    	int approveRoleCount = approveRoleService.getAllApproveRole().size();
    	if(approveRoleCount == 0) {
    		boolean isHRRoleAdded = approveRoleService.createApproveRole("HR");
    		boolean isApplicantRoleAdded = approveRoleService.createApproveRole("APPLICANT");
    		if(!isHRRoleAdded && !isApplicantRoleAdded) {
    			return "redirect:/login";
    		} else {
                List<UserDto> userList = userService.getAllUser();
                if(userList == null) {
                    boolean isHRAdded = userService.createHR();
    	    		if(!isHRAdded) {
    	    			System.out.println("done");
    	    			return "redirect:/login";
    	    		}
                }
    		}
    	} 
        return "login";
    }
   
    @GetMapping("/dashboard")
    public String home(HttpSession session, ModelMap model){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()){
            UserDto userDto = userService.getLoginUserBystaffId(authentication.getName());
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

    @GetMapping("/accessDenied")
    public String accessDeniedPage(){
        return "accessDenied";
    }
}
