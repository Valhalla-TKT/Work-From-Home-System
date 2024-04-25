package com.kage.wfhs.repository;

import com.kage.wfhs.model.Notification;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {	
	long count();
	List<Notification> findByNotificationType_Name(String name);
}
