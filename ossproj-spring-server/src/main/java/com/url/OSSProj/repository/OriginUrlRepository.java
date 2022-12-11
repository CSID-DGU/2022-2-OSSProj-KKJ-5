package com.url.OSSProj.repository;

import com.url.OSSProj.domain.entity.OriginUrl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OriginUrlRepository extends JpaRepository<OriginUrl, Long> {

    List<OriginUrl> findByCategoryNumber(String categoryNumber);

}
