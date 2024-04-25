package com.kage.wfhs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kage.wfhs.model.NotificationType;

public interface NotificationTypeRepository extends JpaRepository<NotificationType,Long> {
	NotificationType findByName(String name);
}
