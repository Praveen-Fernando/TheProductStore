package com.app.store.service;

import com.app.store.configuration.JWTUtils;
import com.app.store.enums.ProductCategoryTypes;
import com.app.store.enums.ProductStatus;
import com.app.store.exceptions.ResourceNotFoundException;
import com.app.store.model.Product;
import com.app.store.model.ProductImage;
import com.app.store.model.User;
import com.app.store.repository.ProductRepository;
import com.app.store.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
        return productRepository.findById(productID);

    }

    @Override
    public List<Product> findByProductCategory(ProductCategoryTypes productCategory) {
        List<Product> productList = new ArrayList<Product>();
        productList.addAll(productRepository.findByProductCategory(productCategory));
        return productList;
    }

    @Override
    public List<Product> findByProductStatus(ProductStatus productStatus) {
        List<Product> saleProductList = new ArrayList<>();
        saleProductList.addAll(productRepository.findByProductStatus(ProductStatus.SALE));
        System.out.println(saleProductList);
        return saleProductList;
    }


    public Product createProduct(Product product, MultipartFile[] files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDetails user = userService.loadUserByUsername(username);

        List<ProductImage> images = Arrays.stream(files)
                .map(this::saveImageToStorage)
                .collect(Collectors.toList());
        Date currentDate = new Date();

        product.setProductImages(images);
        product.setSellerEmail(user.getUsername());
        product.setProductAddedDate(currentDate);
        System.out.println(product);

        return productRepository.save(product);
    }

    private ProductImage saveImageToStorage(MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/uploads/" + fileName;

            ProductImage image = new ProductImage();
            image.setImageUrl(imageUrl);
            return image;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Product updateProduct(Long productID, Product product) {
        Optional<Product> productData = productRepository.findById(productID);

        Product currentproduct = productData.get();
        currentproduct.setProductName(product.getProductName());
        currentproduct.setProductPrice(product.getProductPrice());
        currentproduct.setProductCategory(product.getProductCategory());
        currentproduct.setProductStock(product.getProductStock());
        currentproduct.setProductDescription(product.getProductDescription());
        currentproduct.setProductBrand(product.getProductBrand());
        currentproduct.setProductStatus(product.getProductStatus());
        Date date = new Date();
        currentproduct.setProductUpdateDate(date);
        System.out.println("From Product Controller:" +product.getProductStatus());

        return productRepository.save(currentproduct);
    }

    public void updateProductQuantity(Long id, int newQuantity) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setProductStock(newQuantity);
        productRepository.save(product);
    }

    public void deleteProduct(long productID) {
        productRepository.deleteById(productID);
    }
}