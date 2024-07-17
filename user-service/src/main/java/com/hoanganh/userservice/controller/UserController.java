package com.hoanganh.userservice.controller;

import com.hoanganh.userservice.entity.User;
import com.hoanganh.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping()
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    @PostMapping()
    public String save(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/{id}")
    public Optional<User> getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @DeleteMapping("/id")
    public String deleteUser(@RequestParam Long id) {
        return userService.deleteUser(id);
    }

}
