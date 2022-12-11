package com.url.OSSProj.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.UrlCategoryResponse;
import com.url.OSSProj.domain.dto.UrlDto;
import com.url.OSSProj.domain.dto.UrlResponseDto;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.domain.entity.OriginUrl;
import com.url.OSSProj.domain.entity.Url;
import com.url.OSSProj.exception.UserNotFoundException;
import com.url.OSSProj.repository.MemberRepository;
import com.url.OSSProj.repository.OriginUrlRepository;
import com.url.OSSProj.repository.UrlRepository;
import com.url.OSSProj.service.MemberService;
import com.url.OSSProj.service.UrlService;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@RequiredArgsConstructor
@RestController
@Log4j2
public class UrlController {

    private WebClient webClient;
    private final UrlService urlService;
    private final MemberService memberService;
    private final OriginUrlRepository originUrlRepository;
    private static final String FLASK_SERVER_URL = "http://localhost:5050";
    private static final String WORD_CLOUD_GET_PATH_URL = "http://localhost:8080/image/wordcloud";
    private static final String NETWORK_GRAPH_GET_PATH_URL = "http://localhost:8080/image/network";
    private String wordCloudFilePath;
    private String networkGraphFilePath;
    private Map<String, String> categories;

    @PostConstruct
    public void initWebClient(){
        categories = new HashMap<>();
        categories.put("1","정치");
        categories.put("2","경제");
        categories.put("3","사회");
        categories.put("4","문화");
        categories.put("5","세계");
        categories.put("6","IT/과학");

        webClient = WebClient.create(FLASK_SERVER_URL);
    }

    private final TokenUtils tokenUtils;
    private final RestTemplate restTemplate;
    private final MemberRepository memberRepository;

    @PostMapping("/url")
    public UrlResponseDto UrlConvey(@RequestBody UrlDto urlDto, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Member member = memberService.getMemberThroughRequest(request);

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("url", urlDto.getUrl());

        UrlResponseDto urlResponseDto = webClient.post()
                .uri("/url")
                .bodyValue(urlDto)
                .retrieve()
                .bodyToMono(UrlResponseDto.class)
                .block();

        wordCloudFilePath = urlResponseDto.getWordCloudPath();
        networkGraphFilePath = urlResponseDto.getNetworkGraphPath();

        urlResponseDto.setWordCloudPath(WORD_CLOUD_GET_PATH_URL);
        urlResponseDto.setNetworkGraphPath(NETWORK_GRAPH_GET_PATH_URL);


        log.info("Url Category is " + categories.get(urlResponseDto.getCategoryNumber()));
        log.info("UrlResponseDto URL : " + Objects.requireNonNull(urlResponseDto).getUrl());
        log.info("UrlResponseDto Content : " + urlResponseDto.getContent());
        log.info("WordCloud Path : " + urlResponseDto.getWordCloudPath());
        log.info("NetworkGraph Path : " + urlResponseDto.getNetworkGraphPath());

        originUrlRepository.save(OriginUrl.createUrl(urlResponseDto.getUrl(), urlResponseDto.getContent(), urlResponseDto.getCategoryNumber()));

        urlService.connectMemberAndUrls(member, urlResponseDto);

        return urlResponseDto;
    }

    @ResponseBody
    @GetMapping(value = "/image/wordcloud", produces = MediaType.IMAGE_PNG_VALUE)
    private byte[] getWordCloudImage() throws IOException {
        InputStream in = new FileInputStream("/Users/kimjungwon/" + wordCloudFilePath);
        return IOUtils.toByteArray(in);
    }

    @ResponseBody
    @GetMapping(value = "/image/network", produces = MediaType.IMAGE_PNG_VALUE)
    private byte[] getNetWorkImage() throws IOException {
        InputStream in = new FileInputStream("/Users/kimjungwon/" + networkGraphFilePath);
        return IOUtils.toByteArray(in);
    }

    @GetMapping("/url")
    public List<UrlCategoryResponse> getUrlCategories(@RequestParam("category") String category, HttpServletRequest request, HttpServletResponse response) throws Exception{
        String categoryNumber = getCategoryNumber(category);
        List<OriginUrl> byCategoryNumber = originUrlRepository.findByCategoryNumber(categoryNumber);
        List<UrlCategoryResponse> urlCategoryResponseList = new ArrayList<>();
        for (OriginUrl originUrl : byCategoryNumber) {
            log.info("-----> " + originUrl.getUrl());
            urlCategoryResponseList.add(UrlCategoryResponse.builder()
                    .url(originUrl.getUrl())
                    .content(originUrl.getContent())
                    .category(categories.get(originUrl.getCategoryNumber())).build());
        }

        return urlCategoryResponseList;
    }

    private String getCategoryNumber(String categoryOfString){
        switch (categoryOfString){
            case "politics":
                return "1";
            case "economy":
                return "2";
            case "social":
                return "3";
            case "culture":
                return "4";
            case "global":
                return "5";
            case "science":
                return "6";
        }
        return null;
    }

}
