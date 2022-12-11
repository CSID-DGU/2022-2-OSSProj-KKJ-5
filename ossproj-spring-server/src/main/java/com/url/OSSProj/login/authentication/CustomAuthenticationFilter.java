package com.url.OSSProj.login.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.dto.LoginMemberDto;
import com.url.OSSProj.exception.InputNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public CustomAuthenticationFilter(final AuthenticationManager authenticationManager){
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        final UsernamePasswordAuthenticationToken authRequest;


        try{
            final LoginMemberDto loginMemberDto = new ObjectMapper().readValue(request.getInputStream(), LoginMemberDto.class);
            log.info("로그인 요청한 사용자 이메일 : {}", loginMemberDto.getEmail());
            log.info("로그인 요청한 사용자 비밀번호 : {}", loginMemberDto.getPassword());

            authRequest = new UsernamePasswordAuthenticationToken(loginMemberDto.getEmail(), loginMemberDto.getPassword());
        } catch (IOException exception){
            throw new InputNotFoundException();
        }
        setDetails(request, authRequest);

        return this.getAuthenticationManager().authenticate(authRequest);
    }
}
