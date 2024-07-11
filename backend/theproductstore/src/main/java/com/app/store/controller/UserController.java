package com.app.store.controller;

import ch.qos.logback.core.model.Model;
import com.app.store.model.Admin;
import com.app.store.model.Buyer;
import com.app.store.model.Seller;
import com.app.store.model.User;
import com.app.store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/admin")
    public ResponseEntity<?> registerUser(@RequestBody Admin admin) {
        try {
            userService.saveAdmin(admin);
            return new ResponseEntity<>(admin, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @PostMapping("/seller")
    public ResponseEntity<?> registerSeller(@RequestBody Seller seller) {
        try {
            userService.saveSeller(seller);
            return new ResponseEntity<>(seller, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @PostMapping("/buyer")
    public ResponseEntity<?> registerBuyer(@RequestBody Buyer buyer) {
        try {
            userService.saveBuyer(buyer);
            return new ResponseEntity<>(buyer, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }


}
