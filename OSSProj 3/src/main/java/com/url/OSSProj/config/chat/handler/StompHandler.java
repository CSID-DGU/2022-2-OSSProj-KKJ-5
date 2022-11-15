package com.url.OSSProj.config.chat.handler;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.ChatMessage;
import com.url.OSSProj.repository.ChatRoomRepository;
import com.url.OSSProj.service.ChatService;
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

import java.security.Principal;
import java.util.Optional;


@Log4j2
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final TokenUtils tokenUtils;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;

    @Override // websocket을 통해 들어온 요청이 처리 되기 전 실행된다.
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if(StompCommand.CONNECT == accessor.getCommand()){
            String jwt = accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER);
            log.info("StompHandler JWT : " + jwt);
            if(StringUtils.hasText(jwt) && jwt.startsWith(AuthConstants.TOKEN_TYPE)){
                String accessToken = jwt.substring(7, jwt.length());
                log.info("StompHandler AccessToken : " + accessToken);
                boolean validToken = tokenUtils.isValidToken(accessToken);
                if(!validToken) {
                    return null;
                }
            }
        } else if(StompCommand.SEND == accessor.getCommand()) { // 채팅룸 구독요청
            log.info("전송하래!");
        } else if(StompCommand.SUBSCRIBE == accessor.getCommand()){
            String roomId = chatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            chatRoomRepository.setUserEnterInfo(sessionId, roomId);
            // 채팅방의 인원수를 +1한다.
            // 클라이언트 입장 메시지를 채팅방에 발송한다.(redis publish)
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
            chatService.sendChatMessage(ChatMessage.builder().type(ChatMessage.MessageType.ENTER).roomId(roomId).sender(name).build());
            log.info("SUBSCRIBED {}, {}", name, roomId);
        }
        log.info("sex1");
        return message;
    }
}
