package com.url.OSSProj.login.interceptor;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.utils.CookieUtils;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Log4j2
@RequiredArgsConstructor
public class JwtTokenInterceptor implements HandlerInterceptor {

    private final TokenUtils tokenUtils;
    private final CookieUtils cookieUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        Cookie accessCookie = cookieUtils.getCookie(request, AuthConstants.AUTH_HEADER);
        String accessToken = accessCookie.getValue();

        if(accessToken != null && tokenUtils.isValidToken(accessToken)){
            return true;
        }

        Cookie refreshCookie = cookieUtils.getCookie(request, AuthConstants.REFRESH_HEADER);
        String refreshToken = refreshCookie.getValue();

        if(refreshToken != null && tokenUtils.isValidToken(refreshToken)) {
            Cookie cookie = tokenUtils.reissueAccessToken(response, refreshToken);

            response.addCookie(cookie);
            response.setContentType("application/json;charset=UTF-8");

            return true;
        }

        response.sendRedirect("/error/unauthorized");
        return false;
    }


}
