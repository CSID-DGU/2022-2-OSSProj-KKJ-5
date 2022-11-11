package com.url.OSSProj.controller;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.ChatMessage;
import com.url.OSSProj.repository.ChatRoomRepository;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final TokenUtils tokenUtils;
    private final ChannelTopic channelTopic;
    private final RedisTemplate<String, Object> redisTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message, @Header(AuthConstants.AUTHORIZATION_HEADER) String bearerToken){
        String name = tokenUtils.getUid(bearerToken.substring(7, bearerToken.length()));
        message.setSender(name);
        if(ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setSender("[알림]");
            message.setMessage(name + "님이 입장하셨습니다.");
        }
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
    }
}
