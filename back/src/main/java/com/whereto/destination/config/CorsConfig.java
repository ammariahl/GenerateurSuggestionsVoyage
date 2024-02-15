// package com.whereto.destination.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// public class CorsConfig {

//     @Bean
//     public CorsFilter corsFilter() {
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         CorsConfiguration config = new CorsConfiguration();

//         // Allow all origins, methods, and headers for simplicity. You may want to customize this based on your needs.
//         config.addAllowedOrigin("*");
//         config.addAllowedMethod("*");
//         config.addAllowedHeader("Content-Type");
//         config.setAllowCredentials(true);

//         source.registerCorsConfiguration("/api/**", config);

//         return new CorsFilter(source);
//     }
// }
