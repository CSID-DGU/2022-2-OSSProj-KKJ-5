package com.url.OSSProj.login.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.SuccessLoginMemberDto;
import com.url.OSSProj.domain.dto.Token;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.entity.MyUserDetails;
import com.url.OSSProj.domain.enums.UserRole;
import com.url.OSSProj.utils.CookieUtils;
import com.url.OSSProj.utils.RedisUtils;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
@RequiredArgsConstructor
public class CustomFormLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final TokenUtils tokenUtils;
    private final CookieUtils cookieUtils;
    private final RedisUtils redisUtils;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        final Member member = ((MyUserDetails) authentication.getPrincipal()).getMember();
        final Token token = tokenUtils.generateToken(member.getEmail(), UserRole.USER.getKey());

        Cookie accessToken = cookieUtils.createCookie(AuthConstants.AUTH_HEADER, token.getAccessToken());
        Cookie refreshToken = cookieUtils.createCookie(AuthConstants.REFRESH_HEADER, token.getRefreshToken());

        redisUtils.setDataExpire(token.getRefreshToken(), member.getEmail(), tokenUtils.getRefreshTokenValidTime());

        // response.addCookie(accessToken);
        response.addCookie(refreshToken);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        final SuccessLoginMemberDto successLoginMemberDto = new SuccessLoginMemberDto();
        successLoginMemberDto.setName(member.getName());
        successLoginMemberDto.setAccessToken(token.getAccessToken());

        String loginMemberJsonResponse = objectMapper.writeValueAsString(successLoginMemberDto);
        response.getWriter().write(loginMemberJsonResponse);

    }

}
