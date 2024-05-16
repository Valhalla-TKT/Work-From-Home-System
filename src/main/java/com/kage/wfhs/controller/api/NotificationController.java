/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.controller.api;
// Need to implement more
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kage.wfhs.dto.NotificationDto;
import com.kage.wfhs.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {
	
	@Autowired
	private final NotificationService notificationService;
	
	@PostMapping("/notificationList")
    public ResponseEntity<List<NotificationDto>> getAllNotification(){
        return ResponseEntity.ok(notificationService.getAllNotification());
    }
	
	@PostMapping("/getApproverNotificationCount")
    public ResponseEntity<Integer> getApproverPendingCount(
    		@RequestParam(value = "userId") long userId
    	){
		
        //return ResponseEntity.ok(notificationService.getAllNotification());
		return ResponseEntity.ok(1);
    }
	
	private int notificationCount = 0;

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/notificationCount")
	public void handleNotification() throws Exception {
		//Thread.sleep(500);
		notificationCount++;
		broadcastNotificationCount();
	}

	private void broadcastNotificationCount() {
		messagingTemplate.convertAndSend("/topic/notificationCount", notificationCount);
	}
}
