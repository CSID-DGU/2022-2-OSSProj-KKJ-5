package com.url.OSSProj.controller;

import com.url.OSSProj.domain.dto.ChatMessage;
import com.url.OSSProj.service.ChatService;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@Log4j2
public class ChatController {

    private final TokenUtils tokenUtils;
    private final ChannelTopic channelTopic;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatService chatService;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message){
        String name = message.getSender();
        message.setSender(name);
        if(ChatMessage.MessageType.ENTER.equals(message.getType())) {
            // message.setSender("[알림]");
            message.setMessage(name + "님이 입장하셨습니다.");
        }

        log.info("Sender Name : " + name);
        log.info("Meesage Content : " + message.getMessage());
        log.info("RoomId : " + message.getRoomId());
        log.info("Channel Topic : " + channelTopic.getTopic());
        chatService.sendChatMessage(message);
    }
}
