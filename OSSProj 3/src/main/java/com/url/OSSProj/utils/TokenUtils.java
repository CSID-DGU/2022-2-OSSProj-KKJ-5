package com.url.OSSProj.utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Base64;

@RequiredArgsConstructor
@Log4j2
@Component
@PropertySource("classpath:application-lg.yml")
public class TokenUtils {

    private static String secretKey;
    // Access 토큰 유효시간 15분
    static final long AccessTokenValidTime = 15 * 60 * 1000L;
    // Refresh Token 유효시간 2시간
    static final long RefreshTokenValidTime = 120 * 60 * 1000L;

    public long getRefreshTokenValidTime(){
        return RefreshTokenValidTime;
    }

    @Value("${password}")
    public void setSecretKey(String path){
        secretKey = path;
    }

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }


}
