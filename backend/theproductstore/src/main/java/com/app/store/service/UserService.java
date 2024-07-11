package com.app.store.service;

import com.app.store.enums.UserTypes;
import com.app.store.model.*;
import com.app.store.repository.AdminRepository;
import com.app.store.repository.BuyerRepository;
import com.app.store.repository.SellerRepository;
import com.app.store.repository.UserSequenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private UserSequenceRepository userSequenceRepository;

    public Admin saveAdmin(Admin admin) {
        admin.setUser_id(generateCustomId("A"));
        admin.setUsertype(UserTypes.ADMIN);
        return adminRepository.save(admin);
    }

    public Optional<Admin> findAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public Seller saveSeller(Seller seller) {
        seller.setUser_id(generateCustomId("S"));
        seller.setUsertype(UserTypes.SELLER);
        return sellerRepository.save(seller);
    }

    public Optional<Seller> findSellerByUsername(String username) {
        return sellerRepository.findByUsername(username);
    }

    public Buyer saveBuyer(Buyer buyer) {
        buyer.setUser_id(generateCustomId("B"));
        buyer.setUsertype(UserTypes.BUYER);
        return buyerRepository.save(buyer);
    }

    public Optional<Buyer> findBuyerByUsername(String username) {
        return buyerRepository.findByUsername(username);
    }


    private String generateCustomId(String prefix) {
        UserSequence userSequence = userSequenceRepository.findById(prefix).orElse(new UserSequence());
        userSequence.setUserType(prefix);
        long newSequence = userSequence.getSequence() + 1;
        userSequence.setSequence(newSequence);
        userSequenceRepository.save(userSequence);
        return prefix + String.format("%02d", newSequence);
    }
}
