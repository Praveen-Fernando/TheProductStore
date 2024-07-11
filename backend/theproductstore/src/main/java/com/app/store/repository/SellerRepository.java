package com.app.store.repository;

import com.app.store.model.Admin;
import com.app.store.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, String> {
    Optional<Seller> findByUsername(String username);

}
