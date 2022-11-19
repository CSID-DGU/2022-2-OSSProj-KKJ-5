package com.url.OSSProj.service;

import com.url.OSSProj.domain.dto.MemberDto;
import com.url.OSSProj.domain.dto.SignUpDto;
import com.url.OSSProj.domain.entity.ChatRoom;
import com.url.OSSProj.domain.entity.ChatRoomInfo;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.enums.UserRole;
import com.url.OSSProj.repository.ChatRoomRepository;
import com.url.OSSProj.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final EntityManager em;
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

    @Transactional
    public Member connectMemberAndChatRoom(String roomId, String userEmail) {
        Member member = memberRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("No such User"));
        ChatRoom chatRoom = chatRoomRepository.findRoomById(roomId);

        ChatRoomInfo chatRoomInfo = new ChatRoomInfo();
        chatRoomInfo.setMember(member);
        chatRoomInfo.setChatRoom(chatRoom);
        em.persist(chatRoomInfo);

        member.getMemberChatRooms().add(chatRoomInfo);
        chatRoom.getChatRooms().add(chatRoomInfo);

        return member;
    }

}
