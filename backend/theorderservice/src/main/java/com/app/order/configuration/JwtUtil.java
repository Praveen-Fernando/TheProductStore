package com.app.order.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class JwtUtil {

    private final SecretKey secretKey;

    @Autowired
    public JwtUtil(JwtProperties jwtProperties) {
        byte[] keyBytes = Base64.getDecoder().decode(jwtProperties.getSecret());
        this.secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Claims extractAllClaims(String token) {
        JwtParser jwtParser = (JwtParser) Jwts.parser()
                .setSigningKey(secretKey);
        return jwtParser.parseClaimsJws(token).getBody();
    }

    public boolean validateToken(String token) {
        try {
            JwtParser jwtParser = (JwtParser) Jwts.parser()
                    .setSigningKey(secretKey);
            jwtParser.parseClaimsJws(token);

            return true;
        } catch (Exception e) {
            System.out.println("Exception from Order Service JWT Util :" +e);
            return false;
        }
    }
}