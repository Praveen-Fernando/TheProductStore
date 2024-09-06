package com.app.store.service;

import com.app.store.enums.ProductCategoryTypes;
import com.app.store.enums.ProductStatus;
import com.app.store.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductServiceImpl {
    List<Product> findAllProducts();

    List<Product> findByProductName(String productName);

    Optional<Product> findByProductID(long productID);

    List<Product> findByProductCategory(ProductCategoryTypes productCategory);
    List<Product> findByProductStatus(ProductStatus productStatus);

}
