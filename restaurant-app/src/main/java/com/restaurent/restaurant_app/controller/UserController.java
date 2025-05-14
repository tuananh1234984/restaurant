package com.restaurent.restaurant_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.restaurent.restaurant_app.service.UserService; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/avatar")
    public ResponseEntity<?> uploadAvatar(@RequestParam("file") MultipartFile file, @RequestParam("username") String username) {
        try {
            userService.saveUserAvatar(username, file);
            return ResponseEntity.ok("Upload thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload thất bại: " + e.getMessage());
        }
    }

    @GetMapping("/avatar")
    public ResponseEntity<?> getAvatar(@RequestParam("username") String username) {
        byte[] image = userService.getUserAvatar(username);
        if (image == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }
}
