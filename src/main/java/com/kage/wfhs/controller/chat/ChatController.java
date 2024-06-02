/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.chat;
//// Need to implement more
//import java.util.List;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//
//import com.kage.wfhs.dto.UserDto;
//import com.kage.wfhs.model.User;
//import com.kage.wfhs.service.UserService;
//
//import lombok.AllArgsConstructor;
//
//@Controller
//@AllArgsConstructor
//public class ChatController {
//	private final UserService userService;
//
//	@MessageMapping("/user.doUserOnline")
//	@SendTo("user/topic")
//	public User doUserOnline(@Payload User user) {
//		userService.setUserOnline(user);
//		return user;
//	}
//
//	@MessageMapping("/user.doUserDisconnect")
//	@SendTo("user/topic")
//	public User doUserDisconnect(@Payload User user) {
//		userService.disconnect(user);
//		return user;
//	}
//
//	@GetMapping("/users")
//	public ResponseEntity<List<UserDto>> findConnectedUsers() {
//		return ResponseEntity.ok(userService.findConnectedUsers());
//	}
//}
import com.kage.wfhs.dto.MessageDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

	@MessageMapping("chat.sendMessage")
	@SendTo("/topic/chat")
	public MessageDto sendMsg(@Payload MessageDto msg) {
		return msg;
	}

	@MessageMapping("chat.addUser")
	@SendTo("/topic/chat")
	public MessageDto addUser(@Payload MessageDto msg, SimpMessageHeaderAccessor headerAccessor) {
		headerAccessor.getSessionAttributes().put("username", msg.getSender());
		return msg;
	}
}