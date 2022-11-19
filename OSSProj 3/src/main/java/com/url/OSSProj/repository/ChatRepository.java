package com.url.OSSProj.repository;

import com.url.OSSProj.domain.entity.ChatRoom;
import com.url.OSSProj.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findByRoomId(String roomId);
}
