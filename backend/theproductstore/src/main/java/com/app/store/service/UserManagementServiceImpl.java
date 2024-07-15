package com.app.store.service;


import com.app.store.model.ReqRes;
import com.app.store.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserManagementServiceImpl {


    ReqRes register(ReqRes registrationRequest);

    ReqRes login(ReqRes loginRequest);

    ReqRes refreshToken(ReqRes refreshTokenRequest);

    ReqRes getAllUsers();

    ReqRes getUserById(Integer user_id);

    ReqRes updateUser(Integer user_id, User updatedUser);

    ReqRes deleteUser(Integer user_id);

    ReqRes getMyInfo(String email);

}

