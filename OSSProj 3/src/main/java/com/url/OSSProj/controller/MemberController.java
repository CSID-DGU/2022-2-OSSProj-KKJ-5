package com.url.OSSProj.controller;

import com.url.OSSProj.domain.dto.MemberDto;
import com.url.OSSProj.domain.dto.SignUpDto;
import com.url.OSSProj.repository.MemberRepository;
import com.url.OSSProj.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signUp")
    public ResponseEntity<MemberDto> signUp(@RequestBody SignUpDto signUpDto, HttpServletRequest request, HttpServletResponse response) throws IOException{

        log.info("사용자 이름 : {}", signUpDto.getName());
        log.info("사용자 이메일 : {}", signUpDto.getEmail());
        log.info("사용자 비밀번호 : {}", signUpDto.getPassword());

        if(memberService.isEmailDuplicated(signUpDto.getEmail())){
            log.error("이미 존재하는 회원 이메일입니다.");
            return ResponseEntity.badRequest().build();
        } else{
            MemberDto memberDto = memberService.signUp(signUpDto);
            ResponseEntity.status(200);
            return ResponseEntity.ok(memberDto);
        }
    }

    @GetMapping("/chat/test")
    public String hello(){
        return "Hello !";
    }
}
