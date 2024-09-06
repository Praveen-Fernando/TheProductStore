package com.app.store.repository;

import com.app.store.enums.ProductCategoryTypes;
import com.app.store.enums.ProductStatus;
import com.app.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByProductName(String productName);
    List<Product> findByProductCategory(ProductCategoryTypes productCategory);
    List<Product> findBySellerEmail(String sellerEmail);
    List<Product> findByProductStatus(ProductStatus productStatus);

}
