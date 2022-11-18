package com.url.OSSProj.domain.dto;

import com.url.OSSProj.domain.entity.Url;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter @Setter
@Builder
public class ReissueInformationDto {
    private String name;
    private String accessToken;
    private ArrayList<ChatRoomDto> rooms;
    private ArrayList<Url> urls;
}
