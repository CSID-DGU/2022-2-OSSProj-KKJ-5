package com.url.OSSProj.controller;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.ChatRoomDto;
import com.url.OSSProj.domain.dto.NewChatRoomDto;
import com.url.OSSProj.domain.dto.ResponseChatRoomDto;
import com.url.OSSProj.domain.entity.ChatRoom;
import com.url.OSSProj.domain.entity.UploadFile;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.repository.ChatRepository;
import com.url.OSSProj.repository.ChatRoomRepository;
import com.url.OSSProj.repository.FileRepository;
import com.url.OSSProj.service.ChatService;
import com.url.OSSProj.service.FileStore;
import com.url.OSSProj.service.MemberService;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.rowset.serial.SerialException;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;

@Log4j2
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController{

    private final TokenUtils tokenUtils;
    private final FileRepository fileRepository;
    private final ChatService chatService;
    private final ServletContext servletContext;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
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
    public ResponseChatRoomDto createRoom(@RequestPart(value="name", required=false) String chatRoomName,
                                                          @RequestPart(value="pictureFile", required=false) MultipartFile file,
                                                          HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = getMemberThroughRequest(request);

        UploadFile uploadFile = fileStore.storeFile(file);

        fileRepository.save(uploadFile);

        String uploadFileName = uploadFile.getUploadFileName();
        String storeFileName = uploadFile.getStoreFileName();

        log.info("UploadFile Id : " + uploadFile.getId());
        log.info("uploadFileName = " + uploadFileName);
        log.info("storeFileName = " + storeFileName);

        ChatRoomDto chatRoomDto = chatRoomRepository.createChatRoom(chatRoomName, uploadFile);
        memberService.connectMemberAndChatRoom(chatRoomDto.getRoomId(), member.getEmail());

        log.info("Image Full Path : " + fileStore.getFullPath(chatRoomDto.getImage().getStoreFileName()));

        UrlResource urlResource = new UrlResource("file:" + fileStore.getFullPath(chatRoomDto.getImage().getStoreFileName()));
        log.info("UrlResource : " + urlResource);

        FileInputStream fileInputStream = new FileInputStream(fileStore.getFullPath(chatRoomDto.getImage().getStoreFileName()));
        log.info("FileInputStream : " + fileInputStream);

        InputStream resourceAsStream = servletContext.getResourceAsStream(String.valueOf(urlResource));
        log.info("Image InputStream : " + resourceAsStream);

        byte[] bytes = IOUtils.toByteArray(fileInputStream);
        log.info("Image Bytes : " + bytes);

        return ResponseChatRoomDto.builder()
                .roomId(chatRoomDto.getRoomId())
                .name(chatRoomDto.getName())
                .image(new UrlResource("file:"+fileStore.getFullPath(chatRoomDto.getImage().getStoreFileName())))
                .build();
    }

    private Member getMemberThroughRequest(HttpServletRequest request) {
        String author = request.getHeader(AuthConstants.AUTHORIZATION_HEADER);
        String token = author.substring(7, author.length());
        String email = tokenUtils.getUid(token);

        return memberService.findByEmail(email);
    }

}
