package com.app.store.repository;

import com.app.store.model.Admin;
import com.app.store.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    Optional<Admin> findByUsername(String username);

}
