package com.url.OSSProj.service;

import com.url.OSSProj.domain.dto.ChatMessage;
import com.url.OSSProj.domain.entity.ChatRoom;
import com.url.OSSProj.domain.entity.ImageUrl;
import com.url.OSSProj.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Log4j2
@RequiredArgsConstructor
@Service
public class ChatService {

    @PersistenceContext
    private EntityManager em;

    private final ChannelTopic channelTopic;
    private final RedisTemplate redisTemplate;
    private final ChatRepository chatRepository;

    /**
     * destination정보에서 roomId 추출
     */
    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        log.info("lastIndex --->  : " + lastIndex);
        log.info("Destination : " + destination);
        if (lastIndex != -1) {
            String substring = destination.substring(lastIndex + 1);
            log.info("SubString : " + substring);
            return substring;
        }
        else
            return "";
    }

    /**
     * 채팅방에 메시지 발송
     */
    public void sendChatMessage(ChatMessage chatMessage) {
        log.info("InComming ChatService");
        if (ChatMessage.MessageType.ENTER.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender() + "님이 방에 입장했습니다.");
            chatMessage.setSender("[알림]");
        } else if (ChatMessage.MessageType.QUIT.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender() + "님이 방에서 나갔습니다.");
            chatMessage.setSender("[알림]");
        }
        redisTemplate.convertAndSend(channelTopic.getTopic(), chatMessage);
        log.info("Service :  " + chatMessage.getType());
    }

    @Transactional
    public void saveChatRoom(ChatRoom chatRoom, ImageUrl imageUrl) {
        chatRoom.setImageUrl(imageUrl);
        em.persist(chatRoom);
    }
}
