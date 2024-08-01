package com.app.store.controller;

import com.app.store.enums.ProductCategoryTypes;
import com.app.store.model.Product;
import com.app.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/public/products")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String productName) {

        try{
            return new ResponseEntity<>(productService.findAllProducts(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/seller/myproducts")
    public ResponseEntity<List<Product>> getCurrentUsersProducts(){
        List<Product> products = productService.findBySellerEmail();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/public/products{productName}")
    public ResponseEntity<List<Product>> getByProductName(@PathVariable("productName") String productName) {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/public/product/{productID}")
    public ResponseEntity<Product> getProductById(@PathVariable("productID") long productID) {
        Optional<Product> productData = productService.findByProductID(productID);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/public/products/{productCategory}")
    public ResponseEntity<List<Product>> getProductByCategory(@PathVariable(value= "productCategory") ProductCategoryTypes productCategory) {
        try{
            return new ResponseEntity<>(productService.findByProductCategory(productCategory), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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

    @PostMapping("/seller/product/{id}")
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