package com.url.OSSProj.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private static final long serialVersionUid = 6494678977089006639L;

    @Column(nullable = false)
    private String roomId;

    @Column(nullable = false)
    private String name;


    public static ChatRoom create(String name){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;

        return chatRoom;
    }

    public static ChatRoom createRoom(String roomId, String name){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = roomId;
        chatRoom.name = name;

        return chatRoom;
    }
}
