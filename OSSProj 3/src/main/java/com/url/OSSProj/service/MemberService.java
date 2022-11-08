package com.url.OSSProj.service;

import com.url.OSSProj.domain.dto.MemberDto;
import com.url.OSSProj.domain.dto.SignUpDto;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.enums.UserRole;
import com.url.OSSProj.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public MemberDto signUp(final SignUpDto signUpDto){
        memberRepository.save(Member.builder()
                .name(signUpDto.getName())
                .email(signUpDto.getEmail())
                .password(bCryptPasswordEncoder.encode(signUpDto.getPassword()))
                .role(UserRole.USER)
                .build());

        return MemberDto.builder()
                .name(signUpDto.getName())
                .email(signUpDto.getEmail())
                .build();
    }

    public Boolean isEmailDuplicated(final String email){
        return memberRepository.existsByEmail(email);
    }

}
