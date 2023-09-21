package com.greengreen.greengreen.repository;

import com.greengreen.greengreen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
