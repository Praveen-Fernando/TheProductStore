# Product Store

This is a full-stack **Product Store** application built using **Spring Boot** for the backend and **React** with **Tailwind CSS** for the frontend. It provides features for users to browse, purchase products, manage a shopping cart, and handle orders via Kafka-based microservices.

## Features

### Frontend (React + Tailwind CSS)
- 🛍️ **Product Wall Component**: Displays all products with filters.
- 🔍 **Single Product View**: Shows details of a selected product.
- 🎨 **Hover Effect on Images**: Displays different product images on hover.
- 🛒 **Shopping Cart**: Users can add products, adjust quantities, and remove items.
- 🔐 **Authentication**: Login, Signup, and Logout functionality.
- 🏷️ **Role-Based Access**:
  - 👥 Customers can browse and buy products.
  - 🏪 Sellers require admin approval to sell products.
- 🏠 **Header & Navigation**:
  - 💻 Desktop: Logo, search bar, cart, and user profile.
  - 📱 Mobile: Collapsible menu with login/signup options.
- 📝 **Profile Management**: Users can manage their account settings.
- 📱 **Responsive UI**: Mobile-friendly design.
- 🛠️ **Admin Panel**: Dashboard for managing products and users.
- 🚫 **404 Page**: Custom error page with an image.

### Backend (Spring Boot + MySQL + JWT + Kafka)
- 🔑 **User Authentication**: Secure JWT-based authentication.
- 📦 **Product Management**:
  - 📝 CRUD operations for products.
  - 🔍 Enum-based filtering (e.g., sale items).
  - 🖼️ Image storage in backend.
- 🛍️ **Shopping Cart & Orders**:
  - ➕ Users can add products to the cart.
  - 🔄 Orders are processed through Kafka messaging.
  - 📦 Order status updates (e.g., Paid, Delivered).
  - 📉 Product stock updates after purchase.
- 🔗 **Microservices with Kafka**:
  - 🛒 Order Service: Handles order processing and payment updates.
  - 📦 Product Service: Manages product inventory and price updates.
- 🔒 **Spring Security & CORS Configuration**:
  - ⚙️ Configured in `CrossOriginConfig` class.
  - 🏷️ Bearer token handling for API requests.
- 🏪 **Admin Approval for Sellers**:
  - 📩 Sellers require admin approval.
  - 📬 Admin receives notifications for new seller requests.
  - 📧 Email notifications on approval.

## Technologies Used

### Frontend:
- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 🚏 React Router
- 🔣 React Icons

### Backend:
- ☕ Spring Boot
- 🛢️ MySQL
- 🏗️ JPA/Hibernate
- 📡 Kafka (for microservices communication)
- 🔑 JWT (Authentication & Authorization)
- 🐳 Docker (for microservice deployment)

## Setup Instructions

### Prerequisites
- ☕ Java 17+
- 🟢 Node.js 18+
- 🛢️ MySQL Server
- 📡 Kafka & Zookeeper
- 🐳 Docker (Optional)

### Backend Setup
1. 📂 Clone the repository:
   ```sh
   git clone https://github.com/your-repo/product-store.git
   cd product-store/backend
   ```
2. ⚙️ Configure MySQL database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/product_store
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
3. 🚀 Run the application:
   ```sh
   mvn spring-boot:run
   ```

### Frontend Setup
1. 📂 Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. 📦 Install dependencies:
   ```sh
   npm install
   ```
3. 🏃 Start the React app:
   ```sh
   npm run dev
   ```

### Running Kafka (Docker)
```sh
 docker-compose up -d
```

## API Endpoints

### 🔑 Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive a JWT token

### 📦 Products
- `GET /products` - Fetch all products
- `GET /products/{id}` - Fetch a single product
- `POST /products` - Add a new product (Admin/Seller only)
- `PUT /products/{id}` - Update product details (Admin/Seller only)
- `DELETE /products/{id}` - Delete a product (Admin only)

### 📦 Orders
- `POST /orders` - Place an order
- `GET /orders/{userId}` - Fetch user orders
- `PUT /orders/{id}/status` - Update order status

## 🔮 Future Enhancements
- 💳 Implement a payment gateway integration.
- 🔔 Add real-time notifications for order status.
- 📊 Improve admin panel with advanced analytics.
- ⭐ Implement user reviews and ratings for products.

## 👨‍💻 Author
Developed by **Praveen Fernando** for an online product store application.

