package com.kage.wfhs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.NotificationDto;

@Service
public interface NotificationService {
	void updatePendingNotificationCount() throws Exception;
	void updateApproveNotificationCount() throws Exception;
	void updateRejectNotificationCount() throws Exception;
	void savePendingNotification(String name) throws Exception;
	void sendPendingApproveRejectNotificationToServiceDesk(long formId, long senderId, long receiverId, String name) throws Exception;	
	void sendFormCountNotification(int formCount) throws Exception;
	List<NotificationDto> getAllNotification();
	void sendApproveRejectNotificationToServiceDesk(long id, long id2, String name);
}
