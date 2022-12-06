package com.url.OSSProj.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter @Setter
public class Url implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "URL_ID")
    private Long id;

    @Column(nullable = false, length = 1024)
    private String url;

    @Column(nullable = false, length = 1024)
    private String content;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "VISUALANAIYZE_ID")
    private VisualAnalyze visualAnalyze;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}