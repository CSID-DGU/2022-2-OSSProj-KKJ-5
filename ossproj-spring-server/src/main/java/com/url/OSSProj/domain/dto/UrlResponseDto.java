package com.url.OSSProj.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class UrlResponseDto {
    private String url;
    private String content;
    private String wordCloudPath;
    private String networkGraphPath;
    private String categoryNumber;
}
