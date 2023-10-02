package com.greengreen.greengreen.repository;

import com.fasterxml.jackson.databind.cfg.CoercionInputShape;
import com.greengreen.greengreen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUserNickName(String userNickName);

    boolean existsByUserEmail(String userEmail);

    Optional<User> findByUserEmail(String userEmail);

    Optional<User> findByUserId(Long userId);
    Optional<User> findByUserNickName(String userNickName);
}
