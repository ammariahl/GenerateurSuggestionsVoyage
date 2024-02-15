package com.whereto.destination.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    // @Bean
    // public FilterRegistrationBean<CorsFilter> corsFilter() {
    //     FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>();
    //     registrationBean.setFilter(new CorsFilter());
    //     registrationBean.addUrlPatterns("/api/*"); 
    //     return registrationBean;
    // }
}