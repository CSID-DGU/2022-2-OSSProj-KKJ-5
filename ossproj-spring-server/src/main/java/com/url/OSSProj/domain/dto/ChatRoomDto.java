package com.url.OSSProj.domain.dto;

import com.url.OSSProj.domain.entity.ImageUrl;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class ChatRoomDto implements Serializable {
    private String roomId;
    private String name;
    private String imageUrl;
}
