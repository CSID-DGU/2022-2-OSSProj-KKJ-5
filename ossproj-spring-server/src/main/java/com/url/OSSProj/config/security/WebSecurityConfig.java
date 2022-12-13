package com.url.OSSProj.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.OSSProj.domain.enums.UserRole;
import com.url.OSSProj.login.authentication.CustomAuthenticationFilter;
import com.url.OSSProj.login.authentication.CustomAuthenticationProvider;
import com.url.OSSProj.login.handler.CustomFormLoginSuccessHandler;
import com.url.OSSProj.service.MemberDetailsServiceImpl;
import com.url.OSSProj.service.MemberService;
import com.url.OSSProj.utils.CookieUtils;
import com.url.OSSProj.utils.RedisUtils;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.boot.autoconfigure.security.servlet.StaticResourceRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.filter.CorsFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final TokenUtils tokenUtils;
    private final RedisUtils redisUtils;
    private final CookieUtils cookieUtils;
    private final UserDetailsService userDetailsService;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final ObjectMapper objectMapper;

    private final CorsFilter corsFilter;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        StaticResourceRequest.StaticResourceRequestMatcher staticResourceRequestMatcher = PathRequest.toStaticResources().atCommonLocations();
        return (web) -> web.ignoring().requestMatchers(staticResourceRequestMatcher);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                    .csrf().disable()
                .headers()
                .frameOptions().sameOrigin()
                .and()
                    .authorizeRequests()
                    .anyRequest().permitAll()
                .and()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .formLogin()
                        .disable()
                    .addFilterBefore(corsFilter, SecurityContextPersistenceFilter.class)
                    .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
    @Bean
    public AuthenticationManager authenticationManager() throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() throws Exception{
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("/member/signIn");
        customAuthenticationFilter.setAuthenticationSuccessHandler(customFormLoginSuccessHandler());
        customAuthenticationFilter.afterPropertiesSet();
        return customAuthenticationFilter;
    }

    @Bean
    public CustomFormLoginSuccessHandler customFormLoginSuccessHandler(){
        return new CustomFormLoginSuccessHandler(tokenUtils, cookieUtils, redisUtils, objectMapper);
    }

    @Bean
    public CustomAuthenticationProvider customAuthenticationProvider(){
        return new CustomAuthenticationProvider((MemberDetailsServiceImpl) userDetailsService, bCryptPasswordEncoder());
    }
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }


}
