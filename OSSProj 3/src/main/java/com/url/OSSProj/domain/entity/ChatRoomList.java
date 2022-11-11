package com.url.OSSProj.domain.entity;

import com.url.OSSProj.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class ChatRoomList extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHATROOMS_ID")
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "CHATROOM_ID")
//    private ChatRoom chatRoom;
}
