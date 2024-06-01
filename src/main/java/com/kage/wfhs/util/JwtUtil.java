package com.kage.wfhs.util;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Base64;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.security.Key;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String secretKeyString;

    private Key secretKey;

    private static final long EXPIRATION_TIME = 86400000;

    @PostConstruct
    public void init() {
        byte[] decodedKey = Base64.getDecoder().decode(secretKeyString);
        this.secretKey = Keys.hmacShaKeyFor(decodedKey);
    }

    public String generateToken(String username) {
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
        return Base64.getEncoder().encodeToString(token.getBytes());
    }

    public String getUsernameFromToken(String token) {
        String decodedToken = new String(Base64.getDecoder().decode(token));
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(decodedToken)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            String decodedToken = new String(Base64.getDecoder().decode(token));
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(decodedToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

