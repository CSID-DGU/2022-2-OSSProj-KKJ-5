package com.url.OSSProj.controller;

import com.url.OSSProj.domain.dto.ChatMessage;
import com.url.OSSProj.domain.pubsub.RedisPublisher;
import com.url.OSSProj.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message){
        if(ChatMessage.MessageType.ENTER.equals(message.getType())){
            chatRoomRepository.enterChatRoom(message.getRoomId());
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);
    }
}
