package com.url.OSSProj.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberDto {
    private String email;
    private String name;
}
