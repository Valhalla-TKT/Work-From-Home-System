/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kage.wfhs.model.NotificationType;

public interface NotificationTypeRepository extends JpaRepository<NotificationType,Long> {
	NotificationType findByName(String name);
}
