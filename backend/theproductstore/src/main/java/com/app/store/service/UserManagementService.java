package com.app.store.service;

import com.app.store.configuration.JWTUtils;
import com.app.store.model.ReqRes;
import com.app.store.model.User;
import com.app.store.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registrationRequest){
        ReqRes reqRes = new ReqRes();

        try {
            User user = new User();
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            userRepository.save(user);

        }catch (Exception ex){
            reqRes.setStatusCode(500);
            reqRes.setError(ex.getMessage());
        }
        return reqRes;
    }

    public ReqRes login(ReqRes loginRequest){
        ReqRes response = new ReqRes();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                    loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("5Hrs");
            response.setMessage("Successfully Logged In");
        }catch (Exception ex){
            response.setStatusCode(500);
            response.setError(ex.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRequest){
        ReqRes response = new ReqRes();

        try{
           String email = jwtUtils.extractUserName(refreshTokenRequest.getToken());
            User user = userRepository.findByEmail(email).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user)){
                var jwt = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("2Hrs");
                response.setMessage("Successfully refreshed Token");
            }

        }catch (Exception ex){
            response.setStatusCode(500);
            response.setError(ex.getMessage());
        }
        return response;
    }


}
