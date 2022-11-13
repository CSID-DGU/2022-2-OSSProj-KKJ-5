package com.url.OSSProj.controller;

import com.url.OSSProj.domain.dto.ChatRoomDto;
import com.url.OSSProj.domain.dto.NewChatRoomDto;
import com.url.OSSProj.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;

    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoomDto> room(){
        return chatRoomRepository.findAllRoom();
    }

    @PostMapping("/room")
    @ResponseBody
    public ChatRoomDto createRoom(@RequestBody NewChatRoomDto newChatRoomDto){
        String roomName = newChatRoomDto.getRoomName();
        log.info("#### RoomName : " + roomName);
        return chatRoomRepository.createChatRoom(newChatRoomDto.getRoomName(), newChatRoomDto.getPicturePath());
    }

    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(HttpServletRequest request, HttpServletResponse response, @PathVariable String roomId) throws IOException {
        log.info("roomId : " + roomId);
        response.sendRedirect("/member/signUp");

        return "hello";
    }

    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoomDto roomInfo(@PathVariable String roomId){
        return chatRoomRepository.findRoomById(roomId);
    }
}
