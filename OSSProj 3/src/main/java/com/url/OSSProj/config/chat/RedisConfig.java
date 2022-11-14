package com.url.OSSProj.config.chat;

import com.url.OSSProj.service.pubsub.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Log4j2
@RequiredArgsConstructor
@Configuration
public class RedisConfig {

    @Bean
    public ChannelTopic channelTopic(){
        return new ChannelTopic("chatroom");
    }

    @Bean // 메세지 리스너 단일화
    public RedisMessageListenerContainer redisMessageListener(RedisConnectionFactory connectionFactory,
                                                              MessageListenerAdapter listenerAdapter,
                                                              ChannelTopic channelTopic){
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(listenerAdapter, channelTopic);
        return container;
    }

    @Bean // 메세지를 구독자게에 보내는 역할
    public MessageListenerAdapter listenerAdapter(RedisSubscriber subscriber){
        return new MessageListenerAdapter(subscriber, "sendMessage");
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
        return redisTemplate;
    }
}
