//package com.kage.wfhs.jwt;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Service;
//
//import java.security.Key;
//import java.util.Date;
//
//@Service
//public class JwtTokenProvider {
//
//    private final Key key;
//
//    public JwtTokenProvider(@Value("${jwt.secret.key}") String secretKey) {
//        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
//    }
//
//    public String generateToken(Authentication authentication) {
//        long now = System.currentTimeMillis();
//        Date expiryDate = new Date(now + 3600000); // 1 hour validity
//
//        return Jwts.builder()
//                .setSubject(authentication.getName())
//                .setIssuedAt(new Date(now))
//                .setExpiration(expiryDate)
//                .signWith(key, SignatureAlgorithm.HS512)
//                .compact();
//    }
//
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//    }
//
//    public String getUserIdFromJWT(String token) {
//        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
//        return claims.getSubject();
//    }
//}
