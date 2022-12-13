package com.url.OSSProj.config.chat;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import redis.embedded.RedisServer;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.IOException;

@Profile("local")
@Configuration
@Log4j2
public class EmbeddedRedisConfig {

    @Value("${spring.redis.port}")
    private int redisPort;
    private RedisServer redisServer;

    @PostConstruct
    public void redisServer() throws IOException {
        redisServer = RedisServer.builder()
                .port(redisPort)
                //.redisExecProvider(customRedisExec) //com.github.kstyrc (not com.orange.redis-embedded)
                .setting("maxmemory 128M") //maxheap 128M
                .build();
        try {
            redisServer.start();
        } catch (Exception e){
            log.error("redis Error");
        }
    }

    @PreDestroy
    public void stopRedis(){
        if(redisServer != null){
            redisServer.stop();
        }
    }

}
