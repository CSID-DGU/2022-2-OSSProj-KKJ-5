package com.url.OSSProj.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomDto {
    private String roomId;
    private String name;
}
