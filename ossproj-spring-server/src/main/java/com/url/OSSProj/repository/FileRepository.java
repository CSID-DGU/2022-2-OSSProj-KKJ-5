package com.url.OSSProj.repository;

import com.url.OSSProj.domain.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

public interface FileRepository extends JpaRepository<UploadFile, Long>{


}
