package com.url.OSSProj.config.web;

import com.url.OSSProj.login.filter.HeaderFilter;
import com.url.OSSProj.login.interceptor.JwtTokenInterceptor;
import com.url.OSSProj.utils.CookieUtils;
import com.url.OSSProj.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final TokenUtils tokenUtils;
    private final CookieUtils cookieUtils;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtTokenInterceptor())
                .excludePathPatterns("/user/signUp")
                .addPathPatterns("/user/**");
    }

    @Bean
    public FilterRegistrationBean<HeaderFilter> getFilterRegistrationBean(){
        FilterRegistrationBean<HeaderFilter> registrationBean = new FilterRegistrationBean<>(createHeaderFilter());
        registrationBean.setOrder(Integer.MIN_VALUE);
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

    @Bean
    public HeaderFilter createHeaderFilter(){
        return new HeaderFilter();
    }

    @Bean
    public JwtTokenInterceptor jwtTokenInterceptor(){
        return new JwtTokenInterceptor(tokenUtils, cookieUtils);
    }
}
