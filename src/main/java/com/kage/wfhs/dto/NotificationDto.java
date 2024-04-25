package com.kage.wfhs.dto;

import com.kage.wfhs.model.NotificationType;
import com.kage.wfhs.model.RegisterForm;
import com.kage.wfhs.model.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationDto {
    private long id;
    private User sender, receiver;    
    private NotificationType notificationType;
    private RegisterForm registerForm;
}
