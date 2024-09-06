package com.app.store.controller;

import com.app.store.enums.Brands;
import com.app.store.enums.ProductCategoryTypes;
import com.app.store.enums.ProductStatus;
import com.app.store.model.Product;
import com.app.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class ProductController {

    @Autowired
    ProductService productService;


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