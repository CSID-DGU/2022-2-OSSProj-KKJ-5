package com.url.OSSProj.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHATROOM_ID")
    private Long id;

    private static final long serialVersionUid = 6494678977089006639L;

    @Column(nullable = false)
    private String roomId;

    @Column(nullable = false)
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IMAGEURL_ID")
    private ImageUrl imageUrl;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomInfo> chatRooms = new ArrayList<ChatRoomInfo>();

    public static ChatRoom create(String name, ImageUrl imageUrl){
       return getChatRoom(name, imageUrl);
    }

    private static ChatRoom getChatRoom(String name, ImageUrl imageUrl) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;
        chatRoom.imageUrl = imageUrl;

        return chatRoom;
    }
}
