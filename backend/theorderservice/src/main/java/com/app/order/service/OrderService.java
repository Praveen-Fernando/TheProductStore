//package com.app.order.service;
//
//import com.app.order.model.Orders;
//import com.app.order.repository.OrderRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//
//@Service
//public class OrderService implements OrderServiceImpl{
//
//    @Autowired
//    OrderRepository orderRepository;
//
////    @Override
////    public Orders createOrder(Long productID, int quantity) {
////        Orders order = new Orders();
////        order.setProductID(productID);
////        order.setQuantity(quantity);
////        order.setOrderDate(LocalDateTime.now());
////        order.setPaymentStatus(false);
////        return orderRepository.save(order);
////    }
////
////    @Override
////    public void confirmOrder(Long orderID) {
////        Orders order = orderRepository.findById(orderID).orElseThrow();
////        order.setPaymentStatus(true);
////        orderRepository.save(order);
////    }
//}
