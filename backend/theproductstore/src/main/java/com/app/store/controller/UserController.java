package com.app.store.controller;

import com.app.store.model.ReqRes;
import com.app.store.model.User;
import com.app.store.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserManagementService userManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes req){
        return ResponseEntity.ok(userManagementService.register(req));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(userManagementService.login(req));
    }

    @PostMapping("/admin/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(userManagementService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    @GetMapping("/admin/get-user/{userId}")
    public ResponseEntity<ReqRes> getUserById(@PathVariable Integer userId){
        return ResponseEntity.ok(userManagementService.getUserById(userId));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userManagementService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/admin/update/{user_id}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer user_id, @RequestBody User user){
        return ResponseEntity.ok(userManagementService.updateUser(user_id, user));
    }

   @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUser(@PathVariable Integer userId){
        return ResponseEntity.ok(userManagementService.deleteUser(userId));
    }
}
