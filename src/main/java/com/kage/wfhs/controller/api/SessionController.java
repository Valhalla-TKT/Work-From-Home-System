/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;

import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;


@RestController
@AllArgsConstructor
@RequestMapping("/api/session")
public class SessionController {
	@Autowired
    private final UserService userService;
    @PostMapping("/user")
    public ResponseEntity<CurrentLoginUserDto> getUser(HttpSession session) {
        CurrentLoginUserDto currentUser = (CurrentLoginUserDto) session.getAttribute("login-user");
        CurrentLoginUserDto sessionUser = userService.getLoginUserBystaffId(currentUser.getStaffId());
        return ResponseEntity.ok(sessionUser);
    }
}
