package com.url.OSSProj.service;

import com.url.OSSProj.domain.dto.MemberDto;
import com.url.OSSProj.domain.dto.SignUpDto;
import com.url.OSSProj.domain.entity.ChatRoom;
import com.url.OSSProj.domain.entity.ChatRoomInfo;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.enums.UserRole;
import com.url.OSSProj.repository.ChatRepository;
import com.url.OSSProj.repository.ChatRoomRepository;
import com.url.OSSProj.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Log4j2
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberService {

    @PersistenceContext
    private EntityManager em;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public MemberDto signUp(final SignUpDto signUpDto){
        memberRepository.save(Member.builder()
                .name(signUpDto.getName())
                .email(signUpDto.getEmail())
                .password(bCryptPasswordEncoder.encode(signUpDto.getPassword()))
                .role(UserRole.USER)
                .build());

        return MemberDto.builder()
                .name(signUpDto.getName())
                .email(signUpDto.getEmail())
                .build();
    }

    public Boolean isEmailDuplicated(final String email){
        return memberRepository.existsByEmail(email);
    }

    public Member findByEmail(String email){
        return memberRepository.findByEmail(email).orElse(null);
    }

    @Transactional
    public Member connectMemberAndChatRoom(String roomId, String userEmail) {
        Member member = memberRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("No such User"));
        log.info("Member Name : " + member.getName());

        ChatRoom chatRoom = chatRepository.findByRoomId(roomId)
                                                .orElseThrow(() -> new IllegalArgumentException("No Exist ChatRoom"));
        log.info("ChatRoom name : " + chatRoom.getName());
        log.info("ChatRoom Id : " + chatRoom.getRoomId());

        ChatRoomInfo chatRoomInfo = new ChatRoomInfo();
        chatRoomInfo.setMember(member);
        chatRoomInfo.setChatRoom(chatRoom);
        em.persist(chatRoomInfo);

        member.getMemberChatRooms().add(chatRoomInfo);
        chatRoom.getChatRooms().add(chatRoomInfo);

        return member;
    }

}
