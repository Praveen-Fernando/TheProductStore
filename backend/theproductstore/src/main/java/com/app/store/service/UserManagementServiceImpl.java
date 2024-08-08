package com.app.store.service;


import com.app.store.model.ReqRes;
import com.app.store.model.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface UserManagementServiceImpl {


    ReqRes register(ReqRes registrationRequest);

    ReqRes login(ReqRes loginRequest);

    ReqRes refreshToken(ReqRes refreshTokenRequest);

    ReqRes getAllUsers();

    ReqRes getUserByToken(String token);

    ReqRes updateUserByToken(String token, User updatedUser);

    ReqRes deleteUserByToken(String token);

    ReqRes getMyInfo(String email);

}

