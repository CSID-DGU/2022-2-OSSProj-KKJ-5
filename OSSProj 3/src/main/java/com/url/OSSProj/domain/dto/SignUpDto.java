package com.url.OSSProj.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class SignUpDto {

    private String name;
    private String email;
    private String password;

}
