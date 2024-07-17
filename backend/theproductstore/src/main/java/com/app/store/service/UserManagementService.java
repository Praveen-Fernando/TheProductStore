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
import java.util.List;
import java.util.Optional;

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
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            User userResult = userRepository.save(user);

            if (userResult.getUser_id()>0){
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

    public ReqRes getUserById(Integer user_id) {
        ReqRes reqRes = new ReqRes();
        try {
            User userId = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User Not Found"));
            reqRes.setUser(userId);
            reqRes.setStatusCode(200);
            reqRes.setMessage("User with ID " + userId + "founded");
        } catch (Exception ex) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + ex.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateUser(Integer user_id, User updatedUser) {
        ReqRes reqRes = new ReqRes();

        try {
            Optional<User> optionalUser = userRepository.findById(user_id);
            if (optionalUser.isPresent()) {
                User currentUser = optionalUser.get();
                currentUser.setEmail(updatedUser.getEmail());
                currentUser.setName(updatedUser.getName());
                currentUser.setRole(updatedUser.getRole());

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

    public ReqRes deleteUser(Integer user_id) {

        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepository.findById(user_id);
            if (userOptional.isPresent()) {
                userRepository.deleteById(user_id);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User ID with " + user_id + " Deleted Successfully");
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

}
