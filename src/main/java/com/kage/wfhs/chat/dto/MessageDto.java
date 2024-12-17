package com.kage.wfhs.chat.dto;

import com.kage.wfhs.common.util.MessageType;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private MessageType messageType;
    private String content;
    private String sender;
    private String sessionId;
}
