/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.NotificationDto;
import com.kage.wfhs.model.Notification;
import com.kage.wfhs.model.NotificationType;
import com.kage.wfhs.repository.NotificationRepository;
import com.kage.wfhs.repository.NotificationTypeRepository;
import com.kage.wfhs.repository.RegisterFormRepository;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.service.NotificationService;
import com.kage.wfhs.util.EntityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImplement implements NotificationService {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	private final UserRepository userRepo;
	
	@Autowired
	private final NotificationRepository notificationRepo;
	
	@Autowired
	private final RegisterFormRepository registerFormRepo;
	
	@Autowired
	private final NotificationTypeRepository notificationTypeRepo;
	
	private final ModelMapper modelMapper;
	
	@Override
	@MessageMapping("/pendingNotificationCount")
	public void updatePendingNotificationCount() throws Exception {
		//Thread.sleep(500);		
		List<Notification> pendingNotificationList = notificationRepo.findByNotificationType_Name("PENDING");
		long approveNotificationCount = pendingNotificationList.size();
		broadcastPendingNotificationCount(approveNotificationCount);
	}
	
	private void broadcastPendingNotificationCount(Long approveNotificationCount) {
		messagingTemplate.convertAndSend("/topic/pendingNotificationCount", approveNotificationCount);
	}
	
	@Override
	@MessageMapping("/approveNotificationCount")
	public void updateApproveNotificationCount() throws Exception {
		//Thread.sleep(500);		
		List<Notification> approveNotificationList = notificationRepo.findByNotificationType_Name("APPROVE");
		long approveNotificationCount = approveNotificationList.size();
		broadcastApproveNotificationCount(approveNotificationCount);
	}
	
	private void broadcastApproveNotificationCount(Long approveNotificationCount) {
		messagingTemplate.convertAndSend("/topic/approveNotificationCount", approveNotificationCount);
	}
	
	@Override
	@MessageMapping("/rejectNotificationCount")
	public void updateRejectNotificationCount() throws Exception {
		//Thread.sleep(500);		
		List<Notification> rejectNotificationList = notificationRepo.findByNotificationType_Name("REJECT");
		long approveNotificationCount = rejectNotificationList.size();
		broadcastRejectNotificationCount(approveNotificationCount);
	}
	
	private void broadcastRejectNotificationCount(Long approveNotificationCount) {
		messagingTemplate.convertAndSend("/topic/rejectNotificationCount", approveNotificationCount);
	}
	
	@Override
	public void sendFormCountNotification(int formCount) throws Exception {
		messagingTemplate.convertAndSend("/topic/allFormNotificationCount", formCount);
	}		
	
	@Override
	public void savePendingNotification(String name) throws Exception {
		Notification notification = new Notification();
		NotificationType notificationType = notificationTypeRepo.findByName(name); 
		notification.setNotificationType(notificationType);
		this.updatePendingNotificationCount();
	}
	
	@Override
	@MessageMapping("/approveRejectNotification")
	public void sendPendingApproveRejectNotificationToServiceDesk(Long formId, Long senderId, Long receiverId, String name) throws Exception {
		Notification notification = new Notification();
		NotificationType notificationType = notificationTypeRepo.findByName(name); 
		notification.setNotificationType(notificationType);
		notification.setSender(EntityUtil.getEntityById(userRepo, senderId));
		notification.setReceiver(EntityUtil.getEntityById(userRepo, receiverId));
		notification.setRegisterForm(EntityUtil.getEntityById(registerFormRepo, formId));
		notificationRepo.save(notification);
		
		JSONObject jsonObject = new JSONObject();
	    jsonObject.put("description", notificationType.getDescription());
	    jsonObject.put("name", notificationType.getName());
	    jsonObject.put("user", notification.getSender());
	    jsonObject.put("formId", notification.getRegisterForm());
		triggerGetIfApproveReject();
		messagingTemplate.convertAndSend("/topic/approveRejectNotification", jsonObject.toString());
		
	}
	private void triggerGetIfApproveReject() {
		messagingTemplate.convertAndSend("/topic/callback", "approveRejectNotificationSent");
	}

	@Override
	public List<NotificationDto> getAllNotification() {
		List<Notification> notifications = notificationRepo.findAll();
        List<NotificationDto> notificationList = new ArrayList<>();
        for (Notification notification : notifications){
        	NotificationDto notificationDto = modelMapper.map(notification, NotificationDto.class);
        	notificationList.add(notificationDto);
        }
        return notificationList;
	}

	@Override
	public void sendApproveRejectNotificationToServiceDesk(Long id, Long id2, String name) {
		
	}
}
