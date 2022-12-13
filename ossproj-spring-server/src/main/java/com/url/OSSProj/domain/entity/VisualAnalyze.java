package com.url.OSSProj.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class VisualAnalyze  {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VISUALANAIYZE_ID")
    private Long id;

    @Column(nullable = false, name = "WORDCLOUD")
    private String wordCloud;

    @Column(nullable = false, name = "NETWORK")
    private String network;

    public static VisualAnalyze createVisualAnalyze(String wordCloudPath, String networkGraphPath){
        VisualAnalyze visualAnalyze = new VisualAnalyze();
        visualAnalyze.setWordCloud(wordCloudPath);
        visualAnalyze.setNetwork(networkGraphPath);

        return visualAnalyze;
    }

}



