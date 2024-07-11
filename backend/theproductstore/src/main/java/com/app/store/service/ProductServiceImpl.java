package com.app.store.service;

import com.app.store.enums.ProductCategoryTypes;
import com.app.store.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductServiceImpl {
    List<Product> findAll();

    List<Product> findByProductName(String productName);

    Optional<Product> findByProductID(long productID);

    List<Product> findByProductCategory(ProductCategoryTypes productCategory);

}
