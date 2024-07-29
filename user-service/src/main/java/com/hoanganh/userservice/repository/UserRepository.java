package com.hoanganh.userservice.repository;

import com.hoanganh.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUserName(String userName);

    List<User> findAllByUserNameContaining(String keySearch);
}

