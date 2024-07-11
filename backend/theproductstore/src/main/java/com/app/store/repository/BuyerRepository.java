package com.app.store.repository;

import com.app.store.model.Admin;
import com.app.store.model.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BuyerRepository extends JpaRepository<Buyer, String> {
    Optional<Buyer> findByUsername(String username);

}
