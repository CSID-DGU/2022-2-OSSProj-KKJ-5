package com.url.OSSProj.repository;

import com.url.OSSProj.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);

    boolean existsByName(String id);

}
