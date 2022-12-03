package com.url.OSSProj.service;

import com.url.OSSProj.domain.dto.UrlResponseDto;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.entity.Url;
import com.url.OSSProj.domain.entity.VisualAnalyze;
import com.url.OSSProj.repository.UrlRepository;
import com.url.OSSProj.repository.VisualAnalyzeRepository;
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
    private final VisualAnalyzeRepository visualAnalyzeRepository;

    @Transactional
    public void connectMemberAndUrls(Member member, UrlResponseDto urlResponseDto){
        log.info("UrlService in WordCloudPath : " + urlResponseDto.getWordCloudPath());
        log.info("UrlService in NetWorkGraphPath : " + urlResponseDto.getNetworkGraphPath());

        VisualAnalyze visualAnalyze = VisualAnalyze.createVisualAnalyze(urlResponseDto.getWordCloudPath(), urlResponseDto.getNetworkGraphPath());
        visualAnalyzeRepository.save(visualAnalyze);

        Url url = Url.builder()
                .url(urlResponseDto.getUrl())
                .content(urlResponseDto.getContent())
                .visualAnalyze(visualAnalyze)
                .build();

        url.setMember(member);
        urlRepository.save(url);

        member.getUrls().add(url);

    }

}
