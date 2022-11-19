package com.url.OSSProj.config.chat.handler;

import com.url.OSSProj.domain.constants.AuthConstants;
import com.url.OSSProj.domain.dto.ChatMessage;
import com.url.OSSProj.domain.entity.Member;
import com.url.OSSProj.repository.ChatRoomRepository;
import com.url.OSSProj.repository.MemberRepository;
import com.url.OSSProj.service.ChatService;
import com.url.OSSProj.service.MemberService;
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
    private final MemberRepository memberRepository;
    private final ChatService chatService;
    private final MemberService memberService;

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
                log.info("ValidToken : " + validToken);

                String uid = tokenUtils.getUid(accessToken);
                if(!validToken) {
                    return null;
                }
            }
        }
        if(StompCommand.SUBSCRIBE == accessor.getCommand()){
            // 기존 아재 코드
            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
            String roomId = chatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            log.info("roomId : " + roomId);

            String jwt = accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER);
            String accessToken = jwt.substring(7, jwt.length());
            String userEmail = tokenUtils.getUid(accessToken);

            log.info("userEmail : " + userEmail);

            chatRoomRepository.setUserEnterInfo(userEmail, roomId);

            Member member = memberService.connectMemberAndChatRoom(roomId, userEmail);

            // 클라이언트 입장 메시지를 채팅방에 발송한다.(redis publish)
            chatService.sendChatMessage(ChatMessage.builder().type(ChatMessage.MessageType.ENTER).roomId(roomId).sender(member.getName()).build());

        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료
            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            String roomId = chatRoomRepository.getUserEnterRoomId(sessionId);
            // 클라이언트 퇴장 메시지를 채팅방에 발송한다.(redis publish)
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
            chatService.sendChatMessage(ChatMessage.builder().type(ChatMessage.MessageType.QUIT).roomId(roomId).sender(name).build());
            // 퇴장한 클라이언트의 roomId 맵핑 정보를 삭제한다.
            chatRoomRepository.removeUserEnterInfo(sessionId);
            log.info("DISCONNECTED {}, {}", sessionId, roomId);
        }
        return message;
    }

}
