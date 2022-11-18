package com.url.OSSProj.controller;

import com.url.OSSProj.domain.dto.ChatRoomDto;
import com.url.OSSProj.domain.dto.NewChatRoomDto;
import com.url.OSSProj.domain.entity.ChatRoom;
import com.url.OSSProj.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
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
        List<ChatRoom> allRoom = chatRoomRepository.findAllRoom();
        List<ChatRoomDto> all = new ArrayList<>();
        for (ChatRoom chatRoom : allRoom) {
            ChatRoomDto chatRoomDto = ChatRoomDto.builder()
                    .name(chatRoom.getName())
                    .roomId(chatRoom.getRoomId())
                    .picturePath(chatRoom.getPicturePath())
                    .build();

            all.add(chatRoomDto);
        }

        return all;
    }

    @PostMapping("/room")
    @ResponseBody
    public ChatRoomDto createRoom(@RequestBody NewChatRoomDto newChatRoomDto){
        log.info("ChatRoom Name : " + newChatRoomDto.getName());
        log.info("ChatRoom PicturePath : " + newChatRoomDto.getImage());
        return chatRoomRepository.createChatRoom(newChatRoomDto.getName(), newChatRoomDto.getImage());
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
        ChatRoom chatRoom = chatRoomRepository.findRoomById(roomId);

        return ChatRoomDto.builder()
                .name(chatRoom.getName())
                .roomId(chatRoom.getRoomId())
                .picturePath(chatRoom.getPicturePath())
                .build();
    }
}
