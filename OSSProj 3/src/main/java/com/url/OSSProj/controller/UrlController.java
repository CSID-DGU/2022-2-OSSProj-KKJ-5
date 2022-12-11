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

        initDummyDataInsert();

        webClient = WebClient.create(FLASK_SERVER_URL);
    }

    private void initDummyDataInsert(){
        originUrlRepository.save(
                OriginUrl.createUrl("https://n.news.naver.com/mnews/article/015/0004785955?sid=105",
                        "카트라이더 개발사 니트로스튜디오의 조재윤 디렉터는 11일 공식 홈페이지를 통해 카트라이더 IP의 새로운 방향성과 미래를 위해 서비스 종료를 결정하게 됐다며 오랜 기간 사랑을 받고 있는 카트라이더의 서비스 종료는 함께한 시간만큼 무겁고 중대한 소식이기에 라이더분들께 직접 말씀드리는 것이 디렉터로서의 예의라고 밝혔다.n조 디렉터는 2022 카트라이더 리그 슈퍼컵 결승전을 마친 뒤 1월5일 생방송을 통해 자세한 이야기를 드리고자 준비 중이었지만, 이 과정에서 외부 기사가 먼저 노출되어 이용자들에게 불편함을 드렸다며 사과했다.오랜 기간 사랑을 받고 있는 카트라이더의 서비스 종료는 함께한 시간만큼 무겁고 중대한 소식이기에 라이더분들께 직접 말씀드리는 것이 디렉터로서의 예의이고 도리라고 생각해 2022 카트라이더 리그 슈퍼컵 결승전을 마친 뒤 1월 5일(목) 온라인 생방송을 통해 자세한 이야기를 드리고자 준비 중이었습니다.카트라이더의 미래에 대한 이야기는 넥슨에서 다양한 각도로 논의되어 왔고, 카트라이더 IP의 새로운 방향성과 미래를 위해 서비스 종료를 결정하게 되었습니다.",
                        "6"));

        originUrlRepository.save(
                OriginUrl.createUrl("https://n.news.naver.com/mnews/article/009/0005058494?sid=105",
                        "그는 \"구글, 마이크로소프트(MS) 등 글로벌 빅테크 기업들은 자사 주요 서비스의 핵심 엔진으로 AI를 발 빠르게 도입하고 있고, 보다 효율적인 컴퓨팅 인프라스트럭처 구조를 갖추기 위해 대규모 투자를 하고 있다\"며 \"고성능·고효율 컴퓨팅 시스템의 핵심이 바로 AI 반도체(NPU)\"라고 설명했다.\n" +
                                "백 대표는 \"기존 CPU나 GPU의 연산처리 능력으로 초대규모(하이퍼 스케일) 클라우드 데이터센터, 로보틱스, 자율주행, 스마트팩토리 등에서 수반하는 빅데이터를 처리하기엔 한계가 있다\"며 \"AI 반도체는 대규모 연산을 저전력으로 빠르게 처리할 수 있고 컴퓨터가 빅데이터를 학습하는 머신러닝의 효율을 극대화할 수 있다\"고 말했다.",
                        "6"));

        originUrlRepository.save(
                OriginUrl.createUrl("https://n.news.naver.com/mnews/article/421/0006512201?sid=102",
                        "9. 1/뉴스1 ⓒ News1 박지혜 기자(서울=뉴스1) 정연주 기자 = 서울에서 독립생활을 준비하는 사회초년생, 부동산 정보에 취약한 중장년·어르신 등 1인가구를 위한 서울시 '1인가구 전·월세 안심계약 도움서비스'가 시행된 지 약 5개월 만에 1406건(1131명)의 서비스를 지원했다.\n" +
                                "11일 서울시에 따르면 '1인가구 전·월세 안심계약 도움서비스'를 받은 1131명 중 89%가 사회초년생 또는 상대적으로 계약 경험이 부족한 20~30대다.\n" +
                                "지난 7월부터 서비스를 제공한 5개 자치구(중구·성북구·서대문구·관악구·송파구) 중에서는 관악구가 344건으로 이용 건수가 가장 많았다.\n" +
                                "9월부터 서비스를 제공한 9개 자치구 중에서는 중랑구(93건)와 영등포구(91건)에서 서비스 이용이 많았다.",
                        "3"));

        originUrlRepository.save(
                OriginUrl.createUrl("https://n.news.naver.com/mnews/article/088/0000788133?sid=102",
                        "경주시 제공경북 경주시 신경주역 일대가 광역교통 중심의 융복합 자족도시 조성으로 지역의 새로운 성장거점으로 발돋움한다. '신경주역세권 해오름 플랫폼 시티 투자선도지구'는 신경주역 일원 113만2천529㎡에 사업비 5천407여억원을 투입해 2031년까지 광역교통 연계 융복합 자족도시로 추진될 예정이다.",
                        "3"));

        originUrlRepository.save(
                OriginUrl.createUrl("https://n.news.naver.com/mnews/article/001/0013635009?sid=100",
                        "이상민 행정안전부 장관 해임안 본회의 보고(서울=연합뉴스) 백승렬 기자 = 자신에 대한 해임안이 보고된 이상민 행정안전부 장관이 8일 국회에서 열린 본회의에서 행정안전위원회 관련 법안 처리 결과를 보며 자리에 앉아 있다. 민주당은 지난달 30일 '이태원 압사 참사' 책임을 묻는 차원에서 이 장관에 대한 해임건의안을 발의했고, 이 해임건의안은 지난 8일 본회의에 정식으로 보고됐다. 해임건의안 추진을 반대해온 국민의힘은 이날 본회의 전 국회에서 긴급 의원총회를 열고 대응책을 논의할 예정이다.",
                        "1"));

        originUrlRepository.save(
                OriginUrl.createUrl("https://n.news.naver.com/mnews/article/055/0001019452?sid=104",
                        "미국 여자프로농구(WNBA) 스타 브리트니 그라이너와의 죄수 교환으로 석방된 러시아 무기상 빅토르 부트는 현지시간 10일 러시아의 우크라이나 침공을 '전적으로' 지지한다고 말했습니다. 미국 CNN 방송에 따르면 부트는 이날 러시아 국영 방송 RT와 진행한 인터뷰에서 자신에게 기회와 능력이 있었다면 우크라이나에 대한 '특별군사작전'에 틀림없이 자원했을 것이라면서 이같이 말했습니다. 이날 부트를 인터뷰한 인물은 미국에서 스파이 혐의로 수감됐다가 귀국해 러시아 하원 의원이 된 마리아 부티나였다고 CNN은 전했습니다.",
                        "5"));
    }

    private final TokenUtils tokenUtils;
    private final RestTemplate restTemplate;
    private final MemberRepository memberRepository;

    @PostMapping("/url")
    public UrlResponseDto UrlConvey(@RequestBody UrlDto urlDto, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Member member = memberService.getMemberThroughRequest(request);

        if(member == null) {
            return null;
        }

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
