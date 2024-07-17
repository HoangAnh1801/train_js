package com.hoanganh.userservice.service;

import com.hoanganh.userservice.entity.User;
import com.hoanganh.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> getAllUser() {
        return userRepository.findAll();
    }


    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public String save(User user) {
        User existUser = userRepository.findUserByUserName(user.getUserName());

        if (user.getId() != null && existUser != null) {
            if (user.getId() != existUser.getId()) {
                return "Username đã tồn tại";
            }
            userRepository.save(user);
            return "Thêm mới thành công";
        }

        if (existUser != null) {
            return "Username đã tồn tại";
        }

        userRepository.save(user);
        return "Thêm mới thành công";
    }

    public String deleteUser(Long id) {
        userRepository.deleteById(id);
        return "Đã xoá thành công";
    }
}
