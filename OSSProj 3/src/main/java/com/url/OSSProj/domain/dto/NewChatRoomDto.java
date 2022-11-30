package com.url.OSSProj.domain.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewChatRoomDto {

    private String name;
    private String imageUrl;
}
