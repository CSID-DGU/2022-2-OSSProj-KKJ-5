package com.url.OSSProj.domain.dto;

import com.url.OSSProj.domain.entity.UploadFile;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.Serializable;

@Data
@Builder
public class ChatRoomDto implements Serializable {
    private String roomId;
    private String name;
    private Resource image;
}
