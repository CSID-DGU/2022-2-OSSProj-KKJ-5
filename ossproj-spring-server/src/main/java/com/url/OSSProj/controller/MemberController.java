package com.url.OSSProj.controller;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.ChatRoomDto;
import com.url.OSSProj.domain.dto.MemberDto;
import com.url.OSSProj.domain.dto.SignUpDto;
import com.url.OSSProj.domain.dto.UrlResponseDto;
import com.url.OSSProj.domain.entity.ChatRoomInfo;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.entity.Url;
import com.url.OSSProj.service.MemberService;
import com.url.OSSProj.utils.CookieUtils;
import com.url.OSSProj.utils.RedisUtils;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final TokenUtils tokenUtils;
    private final RedisUtils redisUtils;
    private final CookieUtils cookieUtils;

    @PostMapping("/signUp")
    public ResponseEntity<MemberDto> signUp(@RequestBody SignUpDto signUpDto, HttpServletRequest request, HttpServletResponse response) throws IOException{

        log.info("사용자 이름 : {}", signUpDto.getName());
        log.info("사용자 이메일 : {}", signUpDto.getEmail());
        log.info("사용자 비밀번호 : {}", signUpDto.getPassword());

        if(memberService.isEmailDuplicated(signUpDto.getEmail())){
            log.error("이미 존재하는 회원 이메일입니다.");
            return ResponseEntity.badRequest().build();
        } else{
            MemberDto memberDto = memberService.signUp(signUpDto);
            ResponseEntity.status(200);
            return ResponseEntity.ok(memberDto);
        }
    }

//    @PostMapping("/signOut")
//    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException{
//        log.info("오긴");
//        String header = request.getHeader(AuthConstants.AUTHORIZATION_HEADER);
//        if(header == null) return;
//        String accessToken = header.substring(7, header.length());
//
//        response.setHeader(AuthConstants.AUTHORIZATION_HEADER, null);
//        Cookie refreshCookie = cookieUtils.getCookie(request, AuthConstants.REFRESH_HEADER);
//        String refreshToken = refreshCookie.getValue();
//        redisUtils.deleteData(refreshCookie.getValue());
//        log.info("삭제 완료");
//
//        request.setAttribute(AuthConstants.AUTHORIZATION_HEADER, null);
//        String data = redisUtils.getData(refreshToken);
//        log.info("쿠키도 ? : " + data);
//        response.sendRedirect("/singIn");
//    }

    @GetMapping("/chatrooms")
    public List<ChatRoomDto> roomList(HttpServletRequest request, HttpServletResponse response){
        Member member = memberService.getMemberThroughRequest(request);
        ArrayList<ChatRoomDto> rooms = new ArrayList<>();
        List<ChatRoomInfo> memberChatRooms = member.getMemberChatRooms();
        for (ChatRoomInfo memberChatRoom : memberChatRooms) {
            rooms.add(ChatRoomDto.builder()
                    .roomId(memberChatRoom.getChatRoom().getRoomId())
                    .name(memberChatRoom.getChatRoom().getName())
                    .imageUrl(memberChatRoom.getChatRoom().getImageUrl().getFilePath())
                    .build());
        }
        return rooms;
    }

    @GetMapping("/urls")
    public List<UrlResponseDto> urlResult(HttpServletRequest request, HttpServletResponse response){
        Member member = memberService.getMemberThroughRequest(request);
        ArrayList<UrlResponseDto> urls = new ArrayList<>();

        List<Url> memberUrls = member.getUrls();
        log.info("여기까지는 온당!");
        for (Url memberUrl : memberUrls) {
            urls.add(getUrlResponseDto(memberUrl));
            log.info("-----> " + memberUrl.getUrl());
        }
        return urls;
    }

    private UrlResponseDto getUrlResponseDto(Url url){
        UrlResponseDto urlResponseDto = new UrlResponseDto();
        urlResponseDto.setUrl(url.getUrl());
        urlResponseDto.setContent(url.getContent());
        urlResponseDto.setWordCloudPath(url.getVisualAnalyze().getWordCloud());
        urlResponseDto.setNetworkGraphPath(url.getVisualAnalyze().getNetwork());
        return urlResponseDto;
    }

}
