package com.url.OSSProj.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.UrlDto;
import com.url.OSSProj.domain.dto.UrlResponseDto;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.entity.Url;
import com.url.OSSProj.exception.UserNotFoundException;
import com.url.OSSProj.repository.MemberRepository;
import com.url.OSSProj.repository.UrlRepository;
import com.url.OSSProj.service.UrlService;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.client.WebClient;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@Log4j2
public class UrlController {

    private WebClient webClient;
    private final UrlService urlService;

    @PostConstruct
    public void initWebClient(){
        webClient = WebClient.create("http://localhost:5050");
    }

    private final TokenUtils tokenUtils;
    private final RestTemplate restTemplate;
    private final MemberRepository memberRepository;

    @PostMapping("/url")
    public UrlResponseDto UrlConvey(@RequestBody UrlDto urlDto, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Member member = getMemberFromToken(request);

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("url", urlDto.getUrl());

        UrlResponseDto urlResponseDto = webClient.post()
                .uri("/url")
                .bodyValue(urlDto)
                .retrieve()
                .bodyToMono(UrlResponseDto.class)
                .block();

        urlService.connectMemberAndUrls(member, urlResponseDto);

        log.info("UrlResponseDto URL : " + Objects.requireNonNull(urlResponseDto).getUrl());
        log.info("UrlResponseDto Content : " + urlResponseDto.getContent());

        return urlResponseDto;
    }

    private Member getMemberFromToken(HttpServletRequest request) {
        String header = request.getHeader(AuthConstants.AUTHORIZATION_HEADER);
        String token = header.substring(7, header.length());

        String email = tokenUtils.getUid(token);
        return memberRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Not found User"));
    }
}
