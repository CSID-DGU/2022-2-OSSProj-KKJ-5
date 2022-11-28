package com.url.OSSProj.controller;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.ChatRoomDto;
import com.url.OSSProj.domain.dto.NewChatRoomDto;
import com.url.OSSProj.domain.entity.UploadFile;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.repository.ChatRoomRepository;
import com.url.OSSProj.repository.FileRepository;
import com.url.OSSProj.service.FileStore;
import com.url.OSSProj.service.MemberService;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@Log4j2
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final TokenUtils tokenUtils;
    private final FileRepository fileRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberService memberService;
    private final FileStore fileStore;

//    @GetMapping("/rooms")
//    @ResponseBody
//    public List<ChatRoomDto> room(){
//        List<ChatRoom> allRoom = chatRoomRepository.findAllRoom();
//        List<ChatRoomDto> all = new ArrayList<>();
//        for (ChatRoom chatRoom : allRoom) {
//            ChatRoomDto chatRoomDto = ChatRoomDto.builder()
//                    .name(chatRoom.getName())
//                    .roomId(chatRoom.getRoomId())
//                    .picturePath(chatRoom.getPicturePath())
//                    .build();
//
//            all.add(chatRoomDto);
//        }
//
//        return all;
//    }

    @PostMapping(value="/room", consumes = {"multipart/form-data" })
    @ResponseBody
    public ChatRoomDto createRoom(@RequestPart(value="name", required=false) String chatRoomName,
                                  @RequestPart(value="pictureFile", required=false) MultipartFile file
                                 , HttpServletRequest request) throws Exception {
        log.info(chatRoomName);
        log.info(file);

        // 여기까지 받아옴

        //        log.info("ChatRoom Name : " + newChatRoomDto.getName());
        // Member member = getMemberThroughRequest(request);

//        String chatRoomName = newChatRoomDto.getName();

        UploadFile uploadFile = fileStore.storeFile(file);
        String uploadFileName = uploadFile.getUploadFileName();
        String storeFileName = uploadFile.getStoreFileName();

        ChatRoomDto chatRoomDto = chatRoomRepository.createChatRoom(chatRoomName, uploadFile);
        // memberService.connectMemberAndChatRoom(chatRoomDto.getRoomId(), member.getEmail());
        return chatRoomDto;
    }

    private Member getMemberThroughRequest(HttpServletRequest request) {
        String author = request.getHeader(AuthConstants.AUTHORIZATION_HEADER);
        String token = author.substring(7, author.length());
        String email = tokenUtils.getUid(token);

        return memberService.findByEmail(email);
    }

//    @GetMapping("/room/enter/{roomId}")
//    public String roomDetail(HttpServletRequest request, HttpServletResponse response, @PathVariable String roomId) throws IOException {
//        log.info("roomId : " + roomId);
//        response.sendRedirect("/member/signUp");
//
//        return "hello";
//    }

//    @GetMapping("/room/{roomId}")
//    @ResponseBody
//    public ChatRoomDto roomInfo(@PathVariable String roomId){
//        ChatRoom chatRoom = chatRoomRepository.findRoomById(roomId);
//
//        return ChatRoomDto.builder()
//                .name(chatRoom.getName())
//                .roomId(chatRoom.getRoomId())
//                .picturePath(chatRoom.getPicturePath())
//                .build();
//    }
}
