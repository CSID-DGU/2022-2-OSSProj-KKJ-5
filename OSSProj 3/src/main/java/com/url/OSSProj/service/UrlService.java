package com.url.OSSProj.service;

import com.url.OSSProj.domain.dto.UrlResponseDto;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.entity.Url;
import com.url.OSSProj.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UrlService {

    private final UrlRepository urlRepository;

    @Transactional
    public void connectMemberAndUrls(Member member, UrlResponseDto urlResponseDto){
        Url url = Url.builder()
                .url(urlResponseDto.getUrl())
                .content(urlResponseDto.getContent())
                .build();
        url.setMember(member);

        member.getUrls().add(url);

        urlRepository.save(url);
    }

}
