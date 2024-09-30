# E-commerce API

This is a RESTful API for a simple e-commerce application with three user roles: Admin, Seller, and Customer.

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/MahmoudAbdelsamie/blue202_assessment.git
   cd blue202_assessment
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=
   JWT_SECRET=
   PORT=3000
   ```

4. Start the server:
   ```
   npm start
   ```

## API Documentation

The API documentation is available on SwaggerHub. You can view and interact with the API using the following link:

[E-commerce API Documentation](https://app.swaggerhub.com/apis/MHMOUDSWE/Blue202/1.0.0)

This documentation provides detailed information about all available endpoints, request/response structures, and authentication requirements.

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and return a JWT token

### Product Management
- GET /api/products - Get all products
- POST /api/products - Create a product (Admin, Seller)
- PUT /api/products/:id - Update a product (Admin, Seller)
- DELETE /api/products/:id - Delete a product (Admin)

### Order Management
- POST /api/orders - Place an order (Customer)
- GET /api/orders/seller - Get orders for the logged-in seller
- GET /api/orders - Get all orders (Admin)

### Sales Aggregation
- GET /api/orders/sales/seller - Retrieve total sales per seller for the current month

## Testing

You can use the interactive Swagger UI provided in the documentation link above to test the API endpoints. For protected routes, you'll need to authenticate and use the provided JWT token.

Alternatively, you can use tools like Postman or curl to test the API endpoints. Make sure to include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer your_jwt_token
```