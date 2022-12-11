package com.url.OSSProj.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UrlCategoryResponse {
    private String url;
    private String content;
    private String category;
}
