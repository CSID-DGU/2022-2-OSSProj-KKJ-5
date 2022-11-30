package com.url.OSSProj.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter @Setter
public class Url {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false, length = 1024)
    private String content;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "VISUALANAIYZE_ID")
    private VisualAnalyze visualAnalyze;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

}