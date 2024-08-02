package com.app.store.service;

import com.app.store.configuration.JWTUtils;
import com.app.store.enums.ProductCategoryTypes;
import com.app.store.model.Product;
import com.app.store.model.User;
import com.app.store.repository.ProductRepository;
import com.app.store.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements ProductServiceImpl {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserService userService;

    @Autowired
    JWTUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Product> findAllProducts() {
        List<Product> productList = new ArrayList<Product>();
        productList.addAll(productRepository.findAll());
        return productList;
    }

    public List<Product> findBySellerEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        return productRepository.findBySellerEmail(currentUserEmail);
    }

    @Override
    public List<Product> findByProductName(String productName) {

        List<Product> productListByName = new ArrayList<Product>();
        productListByName.addAll(productRepository.findByProductName(productName));
        return productListByName;
    }

    @Override
    public Optional<Product> findByProductID(long productID) {
//        Optional<Product> productData = productRepository.findById(productID);
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUserEmail = authentication.getName();
//
//        if (currentUserEmail != (productData.get().getSellerEmail())) {
//            return productData;
//        }

        return productRepository.findById(productID);

    }

    @Override
    public List<Product> findByProductCategory(ProductCategoryTypes productCategory) {
        List<Product> productList = new ArrayList<Product>();
        productList.addAll(productRepository.findByProductCategory(productCategory));
        return productList;
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