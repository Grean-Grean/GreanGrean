package com.greengreen.greengreen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .antMatchers("/**") // 모든 페이지에 대한 권한 설정
                                .permitAll() // 모든 페이지에 대한 접근 허용
                )
                .csrf().disable() // CSRF 보호 비활성화 (개발 환경에서만 사용)
                .headers().frameOptions().disable(); // X-Frame-Options 비활성화 (개발 환경에서 H2 콘솔을 사용하기 위해)

        return http.build();
    }
}