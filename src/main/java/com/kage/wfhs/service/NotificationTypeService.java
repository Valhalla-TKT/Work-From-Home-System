package com.kage.wfhs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.model.NotificationType;

@Service
public interface NotificationTypeService {
	void addAllNotificationTypes();
	List<NotificationType> getAllNotificationTypes();
}
