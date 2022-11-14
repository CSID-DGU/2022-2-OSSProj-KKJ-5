package com.url.OSSProj.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {

    public ChatMessage() {
    }

    @Builder
    public ChatMessage(MessageType type, String roomId, String sender, String message, long userCount) {
        this.type = type;
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
        this.userCount = userCount;
    }

    public enum MessageType{
        ENTER, TALK, QUIT
    }
    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
    private long userCount;
}
