package com.url.OSSProj.controller;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.ChatRoomDto;
import com.url.OSSProj.domain.dto.NewChatRoomDto;
import com.url.OSSProj.domain.dto.ResponseChatRoomDto;
import com.url.OSSProj.domain.entity.ChatRoom;
import com.url.OSSProj.domain.entity.ImageUrl;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.repository.ChatRepository;
import com.url.OSSProj.repository.ChatRoomRepository;
import com.url.OSSProj.repository.ImageUrlRepository;
import com.url.OSSProj.service.ChatService;
import com.url.OSSProj.service.MemberService;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController{

    private final TokenUtils tokenUtils;
    private final ChatService chatService;
    private final ServletContext servletContext;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final ImageUrlRepository imageUrlRepository;
    private final MemberService memberService;

    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoomDto> room(){
        List<ChatRoom> allRoom = chatRoomRepository.findAllRoom();
        List<ChatRoomDto> all = new ArrayList<>();
        for (ChatRoom chatRoom : allRoom) {
            ChatRoomDto chatRoomDto = ChatRoomDto.builder()
                    .name(chatRoom.getName())
                    .roomId(chatRoom.getRoomId())
                    .imageUrl(chatRoom.getImageUrl().getFilePath())
                    .build();

            all.add(chatRoomDto);
        }

        return all;
    }

    @PostMapping("/room")
    @ResponseBody
    public ChatRoomDto createRoom(@RequestBody NewChatRoomDto newChatRoomDto, HttpServletRequest request, HttpServletResponse response) throws Exception{
        log.info("채팅방 이름 : " + newChatRoomDto.getName());
        log.info("채팅방 사진 경로 : " + newChatRoomDto.getImageUrl());

        Member member = getMemberThroughRequest(request);
        ImageUrl imageUrl = ImageUrl.builder()
                .filePath(newChatRoomDto.getImageUrl())
                .build();
        imageUrlRepository.save(imageUrl);

        ChatRoomDto chatRoomDto = chatRoomRepository.createChatRoom(newChatRoomDto.getName(), imageUrl);
        memberService.connectMemberAndChatRoom(chatRoomDto.getRoomId(), member.getEmail());

        return ChatRoomDto.builder()
                .name(chatRoomDto.getName())
                .roomId(chatRoomDto.getRoomId())
                .imageUrl(chatRoomDto.getImageUrl())
                .build();
    }

    private Member getMemberThroughRequest(HttpServletRequest request) {
        String author = request.getHeader(AuthConstants.AUTHORIZATION_HEADER);
        String token = author.substring(7, author.length());
        String email = tokenUtils.getUid(token);

        return memberService.findByEmail(email);
    }

}
