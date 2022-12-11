package com.url.OSSProj.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Delegate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@RequiredArgsConstructor
@Getter
public class MyUserDetails implements UserDetails {

    @Delegate
    private final Member member;
    private final Collection<? extends GrantedAuthority> authorities;

    @Override
    public String getUsername() {
        return member.getName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return member.getIsEnable();
    }

    @Override
    public boolean isAccountNonLocked() {
        return member.getIsEnable();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return member.getIsEnable();
    }

    @Override
    public boolean isEnabled() {
        return member.getIsEnable();
    }
}
