package com.app.store.controller;

import com.app.store.configuration.AuthenticationService;
import com.app.store.configuration.JWTUtils;
import com.app.store.enums.Brands;
import com.app.store.enums.ProductCategoryTypes;
import com.app.store.enums.ProductStatus;
import com.app.store.messagebroker.KafkaOrderProducerService;
import com.app.store.model.OrderItem;
import com.app.store.model.OrderRequest;
import com.app.store.model.Product;
import com.app.store.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    KafkaOrderProducerService kafkaOrderProducerService;


    /* Public's Control */

    @GetMapping("/public/products")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String productName) {

        try{
            return new ResponseEntity<>(productService.findAllProducts(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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

    @GetMapping("/public/saleProducts")
    public ResponseEntity<List<Product>> getAllSaleProducts(ProductStatus productStatus) {

        try{
            System.out.println("in");

            return new ResponseEntity<>(productService.findByProductStatus(productStatus), HttpStatus.OK);
        }catch (Exception e){
            System.out.println("Out"+e);

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/public/{productID}")
    public ResponseEntity<Product> getSingleProductById(@PathVariable("productID") long productID) {
        Optional<Product> productData = productService.findByProductID(productID);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/auth/buy")
    public ResponseEntity<String> buyNow(
            @RequestBody OrderRequest orderRequest,
            @RequestHeader("Authorization") String authorizationHeader) {

        // Create the order message with multiple products and send it to Kafka

        if (authorizationHeader.startsWith("Bearer ")) {
            authorizationHeader = authorizationHeader.substring(7);
        }

        // Validate token
        try {
            // Token validation logic
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        try{
            kafkaOrderProducerService.sendOrder(orderRequest);

        }catch (Exception e){
            System.out.println("Exception From controller: "+e);
        }

        return ResponseEntity.ok("Order placed successfully!");
    }

    // Method to extract token from Authorization header
    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Remove "Bearer " prefix
        }
        return authorizationHeader; // Return as is if no prefix
    }

    /* Seller's Control */

    @GetMapping("/seller/productCategories")
    public ProductCategoryTypes[] getCategories(){
        return ProductCategoryTypes.values();
    }

    @GetMapping("/seller/productBrands")
    public Brands[] getBrands(){
        return Brands.values();
    }

    @GetMapping("/seller/productStatus")
    public ProductStatus[] getStatus(){
        return ProductStatus.values();
    }

    @GetMapping("/seller/myproducts")
    public ResponseEntity<List<Product>> getCurrentUsersProducts(){
        List<Product> products = productService.findBySellerEmail();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/seller/products{productName}")
    public ResponseEntity<List<Product>> getByProductName(@PathVariable("productName") String productName) {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/seller/{productID}")
    public ResponseEntity<Product> getProductById(@PathVariable("productID") long productID) {
        Optional<Product> productData = productService.findByProductID(productID);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/seller/addproduct")
    public ResponseEntity<Product> createNewProduct(@ModelAttribute Product product,
                                                    @RequestParam("files") MultipartFile[] files) {
        try{
            Product createdProduct = productService.createProduct(product, files);
            return ResponseEntity.ok(createdProduct);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/seller/product/{id}")
    public ResponseEntity<Product> updateCurrentProduct(@PathVariable("id") long productID, @ModelAttribute Product product){
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