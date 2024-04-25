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
		int approveNotificationCount = pendingNotificationList.size();
		broadcastPendingNotificationCount(approveNotificationCount);
	}
	
	private void broadcastPendingNotificationCount(long approveNotificationCount) {
		messagingTemplate.convertAndSend("/topic/pendingNotificationCount", approveNotificationCount);
	}
	
	@Override
	@MessageMapping("/approveNotificationCount")
	public void updateApproveNotificationCount() throws Exception {
		//Thread.sleep(500);		
		List<Notification> approveNotificationList = notificationRepo.findByNotificationType_Name("APPROVE");
		int approveNotificationCount = approveNotificationList.size();
		broadcastApproveNotificationCount(approveNotificationCount);
	}
	
	private void broadcastApproveNotificationCount(long approveNotificationCount) {
		messagingTemplate.convertAndSend("/topic/approveNotificationCount", approveNotificationCount);
	}
	
	@Override
	@MessageMapping("/rejectNotificationCount")
	public void updateRejectNotificationCount() throws Exception {
		//Thread.sleep(500);		
		List<Notification> rejectNotificationList = notificationRepo.findByNotificationType_Name("REJECT");
		int approveNotificationCount = rejectNotificationList.size();
		broadcastRejectNotificationCount(approveNotificationCount);
	}
	
	private void broadcastRejectNotificationCount(long approveNotificationCount) {
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
	public void sendPendingApproveRejectNotificationToServiceDesk(long formId, long senderId, long receiverId, String name) throws Exception {
		Notification notification = new Notification();
		NotificationType notificationType = notificationTypeRepo.findByName(name); 
		notification.setNotificationType(notificationType);
		notification.setSender(userRepo.findById(senderId));
		notification.setReceiver(userRepo.findById(receiverId));
		notification.setRegisterForm(registerFormRepo.findById(formId));
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
	public void sendApproveRejectNotificationToServiceDesk(long id, long id2, String name) {
		
	}
}
