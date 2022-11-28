package com.url.OSSProj.repository;

import com.url.OSSProj.domain.entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrlRepository extends JpaRepository<Url, Long> {
}
