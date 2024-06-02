package com.kage.wfhs.dto;

import com.kage.wfhs.util.MessageType;
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
