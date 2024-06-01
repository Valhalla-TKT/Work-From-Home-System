/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.view;

import com.kage.wfhs.dto.ExcelImportDto;
import com.kage.wfhs.dto.LedgerDto;
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
import com.kage.wfhs.util.ExcelParser;

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
    private final ExcelParser excelParser;
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
    		boolean isApproveRoleAdded = approveRoleService.createHRRole();
    		if(!isApproveRoleAdded) {
    			return "redirect:/login";
    		} else {
                List<UserDto> userList = userService.getAllUser();
                if(userList == null) {
                    boolean isHRAdded = userService.createHR();
    	    		if(!isHRAdded) {
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
            UserDto userDto = userService.getUserBystaffId(authentication.getName());
            session.setAttribute("login-user", userDto);
            int notificationTypeCount = notificationTypeService.getAllNotificationTypes().size();
            if(notificationTypeCount == 0) {
                notificationTypeService.addAllNotificationTypes();
            }
            Set<ApproveRole> userApproveRoles = userDto.getApproveRoles();

            for (ApproveRole userApproveRole : userApproveRoles) {
                if (userApproveRole.getName().equalsIgnoreCase("HR") && userDto.isFirstTimeLogin()) {
                    return "redirect:/importExcel";
                } else if (userApproveRole.getName().equalsIgnoreCase("USER") && userDto.isFirstTimeLogin()) {
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

    @GetMapping("/division")
    public String division(){
        return "hr/division";
    }

    @GetMapping("/department")
    public String department(){
        return "hr/department";
    }

    @GetMapping("/team")
    public String team(){
        return "hr/team";
    }

    @GetMapping("/role")
    public String role(){
        return "hr/role";
    }
    @GetMapping("/position")
    public String position(){
        return "hr/position";
    }

    @GetMapping("/approveRole")
    public String approveRole(){
        return "hr/approver";
    }

    @GetMapping("/user")
    public String addUser(){
        return "hr/user";
    }
    
    @GetMapping("/approveRoleSwitch")
    public String approveRoleSwitch(){
        return "approveRoleSwitch";
    }
    
    @GetMapping("/profile")
    public String viewProfile(){
        return "profile";
    }

    @GetMapping("/viewFormList")
    public String viewForm(){
        return "formList";
    }
    
    @GetMapping("/viewFormDetailsById")
    public String viewFormDetailsById(){
        return "viewFormDetailsById";
    }
    
    @GetMapping("/applyForm")
    public String applyForm(){
        return "applyForm";
    }
    @GetMapping("/historyForm")
    public String historyForm(){
        return "form";
    }
    @GetMapping("/ledger")
    public String ledgerPage(Model model){
    	List<LedgerDto> ledgerList = ledgerService.getAllLedger();
	    model.addAttribute("ledgerList", ledgerList);
    
        return "hr/ledger";
    }    
	    
    @GetMapping("/importExcel")
    public String importExcel(ModelMap model){
        model.addAttribute("dto", new ExcelImportDto());
        return "hr/importExcel";
    }
    @GetMapping("/permission")
    public String permission(){
        return "hr/permission";
    }
    @GetMapping("/help")
    public String helpPage(){
        return "help";
    }
    @GetMapping("/viewCloneTable")
    private String tables(ModelMap model, @ModelAttribute("currentSheetName") String currentSheetName) throws SQLException {


        List<String> headers = excelParser.getTableHeaders("01");
        List<List<String>> rows = excelParser.getTableRows("01");

        model.addAttribute("headers", headers);
        model.addAttribute("rows", rows);

        return "hr/cloneTable";
    }
}
