package com.kage.wfhs.serviceImplement;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kage.wfhs.model.NotificationType;
import com.kage.wfhs.repository.NotificationTypeRepository;
import com.kage.wfhs.service.NotificationTypeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationTypeServiceImplement implements NotificationTypeService {	
	
	@Autowired
	private final NotificationTypeRepository notificationTypeRepo;
	
	@Override
	public void addAllNotificationTypes() {
		List<String> notificationTypeNames = Arrays.asList("APPROVE", "REJECT", "Remind 26");
		List<String> notificationTypeDescriptions = Arrays.asList("Your form application has been approved.", "Your form application has been rejected.", "Reminder: You can now submit the WFHS form for this month.");

		if(notificationTypeNames.size() != notificationTypeDescriptions.size()) {
		    throw new IllegalArgumentException("Notification type names and descriptions are not of equal length.");
		}

		for(int i = 0; i < notificationTypeNames.size(); i++) {
		    NotificationType notificationType = new NotificationType();
		    notificationType.setName(notificationTypeNames.get(i));
		    notificationType.setDescription(notificationTypeDescriptions.get(i));
		    notificationTypeRepo.save(notificationType);
		}
	}

	@Override
	public List<NotificationType> getAllNotificationTypes() {
		return notificationTypeRepo.findAll();
	}
		
}
