package com.url.OSSProj.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.ChatRoomDto;
import com.url.OSSProj.domain.dto.ReissueInformationDto;
import com.url.OSSProj.domain.dto.SuccessLoginMemberDto;
import com.url.OSSProj.domain.dto.Token;
import com.url.OSSProj.domain.entity.ChatRoom;
import com.url.OSSProj.domain.entity.ChatRoomInfo;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.enums.UserRole;
import com.url.OSSProj.repository.MemberRepository;
import com.url.OSSProj.service.FileStore;
import com.url.OSSProj.utils.CookieUtils;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

@Log4j2

@RequiredArgsConstructor
@Controller
public class TokenController {

    private final TokenUtils tokenUtils;
    private final CookieUtils cookieUtils;
    private final ObjectMapper objectMapper;
    private final FileStore fileStore;
    private final MemberRepository memberRepository;

    @GetMapping("/token/expired")
    public String auth(){
        throw new RuntimeException();
    }

    @ResponseBody
    @PostMapping("/token/refresh")
    public ReissueInformationDto refreshAuth(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Cookie refreshCookie = cookieUtils.getCookie(request, AuthConstants.REFRESH_HEADER);
        String refreshToken = refreshCookie.getValue();

        if(refreshToken != null && tokenUtils.isValidToken(refreshToken)) {
            String email = tokenUtils.getUid(refreshToken);
            Token newToken = tokenUtils.generateToken(email, UserRole.USER.getKey());
            Cookie refreshTokenCookie = cookieUtils.createCookie(AuthConstants.REFRESH_HEADER, newToken.getRefreshToken());

            response.addCookie(refreshTokenCookie);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            return getReissueInformationDto(email, newToken);
        }
        throw new RuntimeException();
    }

    private ReissueInformationDto getReissueInformationDto(String email, Token newToken) throws MalformedURLException {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("no such data"));
        ArrayList<ChatRoomDto> chatRoomDtos = getChatRoomDtos(member);
        return ReissueInformationDto.builder()
                .name(member.getName())
                .accessToken(newToken.getAccessToken())
                .rooms(chatRoomDtos)
                .urls(new ArrayList<>())
                .build();
    }

    private ArrayList<ChatRoomDto> getChatRoomDtos(Member member) throws MalformedURLException {
        List<ChatRoomInfo> memberChatRooms = member.getMemberChatRooms();
        ArrayList<ChatRoomDto> chatRoomDtos = new ArrayList<>();
        for (ChatRoomInfo memberChatRoom : memberChatRooms) {
            ChatRoom chatRoom = memberChatRoom.getChatRoom();
            chatRoomDtos.add(ChatRoomDto.builder()
                    .name(chatRoom.getName())
                    .roomId(chatRoom.getRoomId())
                    .imageUrl(chatRoom.getImageUrl().getFilePath())
                    .build());
        }
        return chatRoomDtos;
    }
}
