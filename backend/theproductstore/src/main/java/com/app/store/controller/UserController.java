package com.app.store.controller;

import com.app.store.enums.Gender;
import com.app.store.enums.ProductCategoryTypes;
import com.app.store.model.ReqRes;
import com.app.store.model.User;
import com.app.store.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserManagementService userManagementService;

    @GetMapping("/public/getGender")
    public Gender[] getGender(){
        return Gender.values();
    }

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


    @GetMapping("/adminuser/get-user/{token}")
    public ResponseEntity<ReqRes> getByToken(@PathVariable String token){
        //String jwtToken = token.substring(7);
        ReqRes reqRes = userManagementService.getUserByToken(token);
        System.out.println("From controller:" +reqRes);

        return ResponseEntity.ok(reqRes);
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userManagementService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/adminuser/update/{token}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable String token, @RequestBody User user){
        ReqRes reqRes = userManagementService.updateUserByToken(token, user);
        return ResponseEntity.ok(reqRes);
    }

   @DeleteMapping("/adminuser/delete/{token}")
    public ResponseEntity<ReqRes> deleteUser(@PathVariable String token){
       ReqRes reqRes = userManagementService.deleteUserByToken(token);
       return ResponseEntity.ok(reqRes);
    }

    //Admin Panel Controller
    @GetMapping("admin/countUsers")
    public ResponseEntity<HashMap<String, Long>> getCount(){
        HashMap<String, Long> userCount = userManagementService.getCount();
        return ResponseEntity.ok(userCount);
    }
}
