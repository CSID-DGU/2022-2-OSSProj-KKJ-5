package com.url.OSSProj.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.Token;
import com.url.OSSProj.domain.enums.UserRole;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Controller
public class TokenController {

    private final TokenUtils tokenUtils;
    private final ObjectMapper objectMapper;

    @GetMapping("/token/expired")
    public String auth(){
        throw new RuntimeException();
    }

    @PostMapping("/token/refresh")
    public String refreshAuth(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String refreshToken = request.getHeader(AuthConstants.REFRESH_HEADER);

        if(refreshToken != null && tokenUtils.isValidToken(refreshToken)){
            String email = tokenUtils.getUid(refreshToken);
            Token newToken = tokenUtils.generateToken(email, UserRole.USER.getKey());

            response.addHeader(AuthConstants.AUTH_HEADER, newToken.getAccessToken());
            response.addHeader(AuthConstants.REFRESH_HEADER, newToken.getRefreshToken());
            response.setContentType("application/json;charset=UTF-8");

            var writer = response.getWriter();

            String allToken = objectMapper.writeValueAsString(newToken);

            return "OK NEW TOKEN";
        }
        throw new RuntimeException();
    }
}
