package com.url.OSSProj.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VisualAnalyze {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VISUALANAIYZE_ID")
    private Long id;

    @Column(nullable = false, name = "WORDCLOUD")
    private String wordCloud;

    @Column(nullable = false, name = "NETWORK")
    private String network;

    public VisualAnalyze(String wordCloud, String network){
        this.wordCloud = wordCloud;
        this.network = network;
    }
}
