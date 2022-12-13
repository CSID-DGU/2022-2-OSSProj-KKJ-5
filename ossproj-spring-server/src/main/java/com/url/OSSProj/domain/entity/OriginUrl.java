package com.url.OSSProj.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OriginUrl implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORIGINURL_ID")
    private Long id;

    @Column(nullable = false, length = 1024)
    private String url;

    @Column(nullable = false, length = 2048)
    private String content;

    @Column(nullable = false)
    private String categoryNumber;

    public static OriginUrl createUrl(String url, String content, String categoryNumber){
        OriginUrl originUrl = new OriginUrl();
        originUrl.setUrl(url);
        originUrl.setContent(content);
        originUrl.setCategoryNumber(categoryNumber);

        return originUrl;
    }

}
