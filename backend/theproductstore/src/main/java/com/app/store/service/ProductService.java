package com.app.store.service;

import com.app.store.model.Product;
import com.app.store.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements ProductServiceImpl{

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findByProductName(String productName) {
        return productRepository.findByProductName(productName);
    }

    @Override
    public Optional<Product> findByProductID(long productID) {
        System.out.println("Called findByProductID");
        return productRepository.findById(productID);
    }

    @Override
    public List<Product> findByProductCategory(String productCategory) {
        return productRepository.findByProductCategory(productCategory);
    }

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public Product updateProduct(Product product){
        return productRepository.save(product);
    }

    public void deleteProduct(long productID){
        productRepository.deleteById(productID);
    }
}
