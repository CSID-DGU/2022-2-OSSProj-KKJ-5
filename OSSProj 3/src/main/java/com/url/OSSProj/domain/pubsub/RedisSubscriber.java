package com.url.OSSProj.domain.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Log4j2
@RequiredArgsConstructor
@Service
public class RedisSubscriber{

    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;

   public void sendMessage(String publishMessage){
       try{
           ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
           messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessage.getRoomId(), chatMessage);
       } catch (Exception e){
           log.error("Exception {}", e);
       }
   }
}
