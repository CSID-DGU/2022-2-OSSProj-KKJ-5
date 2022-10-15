package com.url.OSSProj.service;

import com.url.OSSProj.domain.dto.SignUpDto;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void signUp(final SignUpDto signUpDto){
        final Member member = Member.builder()
                .name(signUpDto.getName())
                .email(signUpDto.getEmail())
                .password(signUpDto.getPassword())
                .build();

        memberRepository.save(member);
    }

    public Boolean isEmailDuplicated(final String email){
        return memberRepository.existsByEmail(email);
    }

}
