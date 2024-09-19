package com.app.store.configuration;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    // Example method to validate JWT token (this method will vary based on your actual implementation)
    public boolean isValidToken(String token) {
        try {
            // Implement your token validation logic here
            // For example, decode the token and verify its signature and expiration
            // This is just a placeholder implementation
            return token != null && !token.isEmpty(); // Replace with actual validation logic
        } catch (Exception e) {
            // Log and handle the exception
            return false;
        }
    }
}
