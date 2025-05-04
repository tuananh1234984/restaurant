package com.restaurent.restaurant_app.controller;

import com.restaurent.restaurant_app.model.User;
import com.restaurent.restaurant_app.payload.LoginRequest;
import com.restaurent.restaurant_app.repository.UserRepository;
import com.restaurent.restaurant_app.payload.ApiPesponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

        if (userOpt.isPresent()) {
            if(userOpt.get().getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(new ApiPesponse(true, "Login successful", userOpt.get()));
            } else {
                return ResponseEntity.ok(new ApiPesponse(false, "Wrong password", null));
            }
        }else{
            return ResponseEntity.ok(new ApiPesponse(false, "User not found", null));
        }
    }

    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(new ApiPesponse(true, "Login successful", userOpt.get()));
        }else{
            return ResponseEntity.ok(new ApiPesponse(false, "User not found", null));
        }
    }
}
