package com.url.OSSProj.config.chat.handler;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;


@Log4j2
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {


    private final TokenUtils tokenUtils;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if(StompCommand.CONNECT == accessor.getCommand()){
            String jwt = accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER);
            if(StringUtils.hasText(jwt) && jwt.startsWith(AuthConstants.TOKEN_TYPE)){
                String accessToken = jwt.substring(7, jwt.length());
                boolean validToken = tokenUtils.isValidToken(accessToken);
                if(!validToken) return null;
            }
        }else if(StompCommand.SUBSCRIBE == accessor.getCommand()){
            log.info("sub");
        }
        log.info("sex1");
        return message;
    }
}
