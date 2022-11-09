package com.url.OSSProj.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {

    GUEST("ROLE_ADMIN"),
    USER("ROLE_USER");

    private final String key;

}
