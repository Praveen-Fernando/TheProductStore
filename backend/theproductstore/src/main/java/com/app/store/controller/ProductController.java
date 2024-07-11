package com.app.store.controller;

import com.app.store.enums.ProductCategoryTypes;
import com.app.store.model.Product;
import com.app.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String productName) {
        System.out.println("Called");
        try {
            List<Product> productList = new ArrayList<Product>();
            if (productName == null) {
                productService.findAll().forEach(productList::add);
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
                productService.findAll().forEach(productCategoryList::add);
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

    @PostMapping("/addproduct")
    public ResponseEntity<Product> createNewProduct(@RequestBody Product product) {
        System.out.println("Called");
        try {
            Product newproduct = productService.createProduct(new Product(product.getProductID(),
                    product.getProductName(),
                    product.getProductPrice(),
                    product.getProductCategory(),
                    product.getProductAddedDate(),
                    product.getProductStock(),
                    product.getSeller()));
            return new ResponseEntity<>(newproduct, HttpStatus.CREATED);

        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/products/{id}")
    public ResponseEntity<Product> updateCurrentProduct(@PathVariable("id") long productID, @RequestBody Product product){
        Optional<Product> productData = productService.findByProductID(productID);

        if (productData.isPresent()){
            Product currentproduct = productData.get();
            currentproduct.setProductName(product.getProductName());
            currentproduct.setProductPrice(product.getProductPrice());
            currentproduct.setProductCategory(product.getProductCategory());
            currentproduct.setProductStock(product.getProductStock());
            return new ResponseEntity<>(productService.updateProduct(currentproduct), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Product> deleteCurrentProduct(@PathVariable("id") long productID){

        try{
            productService.deleteProduct(productID);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
