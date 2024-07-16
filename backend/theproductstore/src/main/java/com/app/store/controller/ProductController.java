package com.app.store.controller;

import com.app.store.enums.ProductCategoryTypes;
import com.app.store.model.Product;
import com.app.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String productName) {
        System.out.println("Called");
        try {
            List<Product> productList = new ArrayList<Product>();
            if (productName == null) {
                productService.findAllProducts().forEach(productList::add);
            } else {
                productService.findByProductName(productName).forEach(productList::add);
            }

            if (productList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(productList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/product/{productID}")
    public ResponseEntity<Product> getProductById(@PathVariable("productID") long productID) {
        Optional<Product> productData = productService.findByProductID(productID);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/products/{productCategory}")
    public ResponseEntity<List<Product>> getProductByCategory(@PathVariable(value= "productCategory") ProductCategoryTypes productCategory) {

        try {
            List<Product> productCategoryList = new ArrayList<Product>();
            if (productCategory == null) {
                productService.findAllProducts().forEach(productCategoryList::add);
            } else {
                productService.findByProductCategory(productCategory).forEach(productCategoryList::add);
            }

            if (productCategoryList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(productCategoryList, HttpStatus.OK);
        } catch (Exception ex) {
            System.out.println(ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping("/seller/addproduct")
    public ResponseEntity<Product> createNewProduct(@RequestBody Product product) {
        try{
            Product createdProduct = productService.createProduct(product);
            return ResponseEntity.ok(createdProduct);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/seller/products/{id}")
    public ResponseEntity<Product> updateCurrentProduct(@PathVariable("id") long productID, @RequestBody Product product){
        try{
            Product updatedProduct = productService.updateProduct(productID, product);
            return ResponseEntity.ok(updatedProduct);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/seller/product/{id}")
    public ResponseEntity<Product> deleteCurrentProduct(@PathVariable("id") long productID){
        try{
            productService.deleteProduct(productID);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}