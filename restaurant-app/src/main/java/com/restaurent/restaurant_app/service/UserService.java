package com.restaurent.restaurant_app.service;

import com.restaurent.restaurant_app.model.User;
import com.restaurent.restaurant_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveUserAvatar(String username, MultipartFile file) throws IOException {
        User user = userRepository.findByUsername(username).orElseThrow();
        user.setAvatar(file.getBytes());
        userRepository.save(user);
    }

    public byte[] getUserAvatar(String username) {
        return userRepository.findByUsername(username).map(User::getAvatar).orElse(null);
    }
}
