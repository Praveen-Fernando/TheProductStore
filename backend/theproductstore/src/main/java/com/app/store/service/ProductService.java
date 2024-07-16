package com.app.store.service;

import com.app.store.enums.ProductCategoryTypes;
import com.app.store.model.Product;
import com.app.store.model.ReqRes;
import com.app.store.model.User;
import com.app.store.repository.ProductRepository;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements ProductServiceImpl {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserService userService;

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findByProductName(String productName) {
        return productRepository.findByProductName(productName);
    }

    @Override
    public Optional<Product> findByProductID(long productID) {
        return productRepository.findById(productID);
    }

    @Override
    public List<Product> findByProductCategory(ProductCategoryTypes productCategory) {
        return productRepository.findByProductCategory(productCategory);
    }

    public Product createProduct(Product product) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDetails user = userService.loadUserByUsername(username);

        product.setSellerEmail(user.getUsername());

        return productRepository.save(product);
    }

    public Product updateProduct(Long productID, Product product) {

        Optional<Product> productData = productRepository.findById(productID);

        Product currentproduct = productData.get();
        currentproduct.setProductName(product.getProductName());
        currentproduct.setProductPrice(product.getProductPrice());
        currentproduct.setProductCategory(product.getProductCategory());
        currentproduct.setProductStock(product.getProductStock());

        return productRepository.save(currentproduct);
    }

    public void deleteProduct(long productID) {
        productRepository.deleteById(productID);
    }
}