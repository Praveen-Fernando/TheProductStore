//package com.app.store.service;
//
//import com.app.store.enums.UserTypes;
//import com.app.store.repository.UserSequenceRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import java.util.Optional;
//
//public class SellerDetailsService implements UserDetailsService {
//
//    @Autowired
//    private SellerRepository sellerRepository;
//
//    @Autowired
//    private UserSequenceRepository userSequenceRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return sellerRepository.findByUsername(username).orElseThrow();
//    }
//
//    public Seller saveSeller(Seller seller) {
//        seller.setUser_id(generateCustomId("S"));
//        seller.setUsertype(UserTypes.SELLER);
//        return sellerRepository.save(seller);
//    }
//
//    public Optional<Seller> findSellerByUsername(String username) {
//        return sellerRepository.findByUsername(username);
//    }
//
//
//    public String generateCustomId(String prefix) {
//        UserSequence userSequence = userSequenceRepository.findById(prefix).orElse(new UserSequence());
//        userSequence.setUserType(prefix);
//        long newSequence = userSequence.getSequence() + 1;
//        userSequence.setSequence(newSequence);
//        userSequenceRepository.save(userSequence);
//        return prefix + String.format("%02d", newSequence);
//    }
//
//
//}
