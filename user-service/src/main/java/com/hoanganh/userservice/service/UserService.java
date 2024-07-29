package com.hoanganh.userservice.service;

import com.hoanganh.userservice.entity.Response;
import com.hoanganh.userservice.entity.User;
import com.hoanganh.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> getAllUser(String keyword) {
        if (keyword == null || keyword.length() == 0 || keyword.equals("null")) {
            return userRepository.findAll();
        }
        return userRepository.findAllByUserNameContaining(keyword);
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public Response save(User user) {
        User existUser = userRepository.findUserByUserName(user.getUserName());

        if (user.getId() != null && existUser != null) {
            if (user.getId() != existUser.getId()) {
                return new Response(HttpStatus.BAD_REQUEST, "Username đã tồn tại");
            }
            userRepository.save(user);
            return new Response(HttpStatus.OK, "Thêm mới thành công");
        }

        if (existUser != null) {
            return new Response(HttpStatus.BAD_REQUEST, "Username đã tồn tại");
        }

        userRepository.save(user);
        return new Response(HttpStatus.OK, "Thêm mới thành công");
    }

    public String deleteUser(Long id) {
        userRepository.deleteById(id);
        return "Đã xoá thành công";
    }
}