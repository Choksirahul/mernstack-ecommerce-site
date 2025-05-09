
# MERN Stack E-commerce Site

A full-featured e-commerce platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application provides a seamless shopping experience with functionalities like product browsing, user authentication, shopping cart, and order management.

## 🛍️ Features

* **User Authentication**: Secure sign-up and login functionalities.
* **Product Management**: Browse through a variety of products with detailed descriptions.
* **Shopping Cart**: Add, remove, and manage products in the cart.
* **Order Processing**: Place orders and view order history.
* **Responsive Design**: Optimized for various devices and screen sizes.

## 🛠️ Technologies Used

* **Frontend**:

  * React.js
  * TypeScript
  * CSS
* **Backend**:

  * Node.js
  * Express.js
  * MongoDB

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js and npm installed on your machine.
* MongoDB installed and running.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Choksirahul/mernstack-ecommerce-site.git
   cd mernstack-ecommerce-site
   ```



2. **Set up the backend**:

   ```bash
   cd server
   npm install
   ```



3. **Set up the frontend**:

   ```bash
   cd ../client
   npm install
   ```



### Configuration

* **Environment Variables**:

  * Create a `.env` file in the `server` directory.
  * Add the following variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. **Start the backend server**:

   ```bash
   cd server
   npm start
   ```

([GitHub][7])

2. **Start the frontend development server**:

   ```bash
   cd ../client
   npm start
   ```


The application should now be running at `http://localhost:3000`.

## 📁 Project Structure

```
mernstack-ecommerce-site/
├── client/        # React frontend
├── server/        # Express backend
├── README.md
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

This project is inspired by various MERN stack e-commerce tutorials and implementations by 30 Days Coding.

---

