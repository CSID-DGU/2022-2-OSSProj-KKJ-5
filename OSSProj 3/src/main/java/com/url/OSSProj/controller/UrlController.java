package com.url.OSSProj.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.UrlDto;
import com.url.OSSProj.domain.dto.UrlResponseDto;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.exception.UserNotFoundException;
import com.url.OSSProj.repository.MemberRepository;
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

    @PostConstruct
    public void initWebClient(){
        webClient = WebClient.create("http://localhost:5000");
    }

    private final TokenUtils tokenUtils;
    private final RestTemplate restTemplate;
    private final MemberRepository memberRepository;

    @PostMapping("/url")
    public UrlResponseDto UrlConvey(@RequestBody UrlDto urlDto, HttpServletRequest request, HttpServletResponse response) throws Exception {
        log.info("URL is : " + urlDto.getUrl());
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("url", urlDto.getUrl());

        UrlResponseDto urlResponseDto = webClient.post()
                .uri("/url")
                .bodyValue(urlDto)
                .retrieve()
                .bodyToMono(UrlResponseDto.class)
                .block();

        log.info("UrlResponseDto URL : " + Objects.requireNonNull(urlResponseDto).getUrl());
        log.info("UrlResponseDto Content : " + urlResponseDto.getContent());
        return urlResponseDto;
//        String header = request.getHeader(AuthConstants.AUTHORIZATION_HEADER);
//        String token = header.substring(7, header.length());
//
//        String email = tokenUtils.getUid(token);
//        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Not found User"));


        /***
         *   Member <-> URL DB 저장
         */

    }
}
