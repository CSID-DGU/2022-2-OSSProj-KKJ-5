package com.url.OSSProj.repository;

import com.url.OSSProj.domain.entity.UploadFile;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class FileRepository{

    // Map <storeFileName, originalFileName> 으로 저장
    private Map<String, String> store = new HashMap<>();

    public void saveUploadFile(UploadFile uploadFile){
        store.put(uploadFile.getStoreFileName(), uploadFile.getUploadFileName());
    }

    public String getOriginalFileName(String storeFileName){
        return store.get(storeFileName);
    }

}
