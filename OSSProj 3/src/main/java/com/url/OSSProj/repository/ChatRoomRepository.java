package com.url.OSSProj.repository;

import com.url.OSSProj.domain.dto.ChatRoomDto;
import com.url.OSSProj.domain.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@RequiredArgsConstructor
@Repository
public class ChatRoomRepository {
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoomDto> opsHashChatRoom;

    @PostConstruct
    private void init(){
        opsHashChatRoom = redisTemplate.opsForHash();
    }

    public List<ChatRoomDto> findAllRoom(){
        return opsHashChatRoom.values(CHAT_ROOMS);
    }

    public ChatRoomDto findRoomById(String id){
        return opsHashChatRoom.get(CHAT_ROOMS, id);
    }

    public ChatRoomDto createChatRoom(String name, String picturePath){
        ChatRoomDto chatRoom = ChatRoom.create(name, picturePath);
        opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }
}
