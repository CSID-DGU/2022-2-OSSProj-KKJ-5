package com.url.OSSProj.domain.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.core.io.UrlResource;

import javax.annotation.Resource;
import java.io.Serializable;

@Data
@Builder
public class ResponseChatRoomDto implements Serializable {

    private String roomId;
    private String name;
    private UrlResource image;

}
