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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserManagementService implements UserManagementServiceImpl {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registrationRequest) {
        ReqRes reqRes = new ReqRes();

        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setName(registrationRequest.getName());
            user.setRole(registrationRequest.getRole());
            user.setContact(registrationRequest.getContact());
            user.setDob(registrationRequest.getDob());
            user.setGender(registrationRequest.getGender());
            user.setAddress(registrationRequest.getAddress());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            User userResult = userRepository.save(user);

            if (userResult.getUser_id() > 0) {
                reqRes.setUser((userResult));
                reqRes.setMessage("User Registered");
                reqRes.setStatusCode(200);
            }

        } catch (Exception ex) {
            reqRes.setStatusCode(500);
            reqRes.setError(ex.getMessage());
        }
        return reqRes;
    }

    public ReqRes login(ReqRes loginRequest) {
        ReqRes response = new ReqRes();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                    loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            System.out.println(jwt);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");
        } catch (Exception ex) {
            response.setStatusCode(500);
            response.setError(ex.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRequest) {
        ReqRes response = new ReqRes();

        try {
            String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            User user = userRepository.findByEmail(email).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user)) {
                var jwt = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("2Hrs");
                response.setMessage("Successfully refreshed Token");
            }

        } catch (Exception ex) {
            response.setStatusCode(500);
            response.setError(ex.getMessage());
        }
        return response;
    }

    public ReqRes getAllUsers() {
        ReqRes reqRes = new ReqRes();
        try {
            List<User> user = userRepository.findAll();
            if (!user.isEmpty()) {
                reqRes.setUserList(user);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No Users");
            }
            return reqRes;
        } catch (Exception ex) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + ex.getMessage());
            return reqRes;
        }
    }

    @Override
    public ReqRes getUserByToken(String token) {
        ReqRes reqRes = new ReqRes();

        try {
            String username = jwtUtils.extractUsername(token);
            User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User Not Found"));
            reqRes.setUser(user);
            reqRes.setStatusCode(200);
            reqRes.setMessage("User with ID " + user + "founded");


        } catch (Exception ex) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + ex.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateUserByToken(String token, User updatedUser) {
        ReqRes reqRes = new ReqRes();

        try {
            String username = jwtUtils.extractUsername(token);
            User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User Not Found"));
            Optional<User> optionalUser = userRepository.findById(user.getUser_id());
            if (optionalUser.isPresent()) {
                User currentUser = optionalUser.get();
                currentUser.setEmail(updatedUser.getEmail());
                currentUser.setName(updatedUser.getName());
                currentUser.setRole(updatedUser.getRole());
                currentUser.setContact(updatedUser.getContact());
                currentUser.setDob(updatedUser.getDob());
                currentUser.setGender(updatedUser.getGender());
                currentUser.setAddress(updatedUser.getAddress());


                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    currentUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                userRepository.save(currentUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Updated Successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found");
            }
        } catch (Exception ex) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + ex.getMessage());
        }
        return reqRes;
    }

    public ReqRes deleteUserByToken(String token) {

        ReqRes reqRes = new ReqRes();

        try {
            String username = jwtUtils.extractUsername(token);
            User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User Not Found"));

            Optional<User> userOptional = userRepository.findById(user.getUser_id());
            if (userOptional.isPresent()) {
                userRepository.deleteById(user.getUser_id());
                reqRes.setStatusCode(200);
                reqRes.setMessage("User ID with " + user.getUser_id() + " Deleted Successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found");
            }
        } catch (Exception ex) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error Occurred: " + ex.getMessage());
        }
        return reqRes;
    }


    public ReqRes getMyInfo(String email) {
        ReqRes reqRes = new ReqRes();

        try {
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isPresent()) {
                reqRes.setUser(optionalUser.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found");
            }

        } catch (Exception ex) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + ex.getMessage());
        }
        return reqRes;
    }

    //Admin Panel

    public long countSellers(){
        return userRepository.countByRole("SELLER");
    }

    public long countBuyers(){
        return userRepository.countByRole("BUYER");
    }

    public HashMap<String, Long> getCount(){
        HashMap<String, Long> countUsers = new HashMap<>();
        countUsers.put("SELLER", countSellers());
        countUsers.put("BUYER", countBuyers());
        return  countUsers;
    }

}
