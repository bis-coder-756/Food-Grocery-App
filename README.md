# 🛒 KichenKart - Full Stack Grocery Delivery App

A modern full-stack grocery shopping platform where users can browse products, add items to their cart, place orders, and securely complete payments using Stripe.

## 🚀 Features

### 👤 User Features

* User Authentication & Authorization
* Browse Grocery Products
* Search & Filter Products
* Add to Cart
* Update Cart Quantity
* Remove Items from Cart
* Secure Checkout
* Stripe Payment Integration
* Order History
* Responsive Design

### 🛠️ Admin Features

* Add New Products
* Update Products
* Delete Products
* Manage Orders
* View Customer Details
* Dashboard Analytics

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* Context API / Redux

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt.js

### Payment Gateway

* Stripe

---

## 📂 Project Structure

```bash
groceryhub/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000

VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 📦 Installation

### 1. Clone Repository

### 2. Install Backend Dependencies

```bash
cd backend

npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend

npm install
```

---

## ▶️ Run Application

### Start Backend

```bash
cd backend

npm run dev
```

### Start Frontend

```bash
cd frontend

npm run dev
```

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:5000
```

---

## 💳 Stripe Test Cards

### Successful Payment

```text
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVV: Any 3 digits
ZIP: Any 5 digits
```

---

## 🔐 Security Features

* Password Hashing with Bcrypt
* JWT Authentication
* Protected Routes
* Environment Variable Protection
* Secure Stripe Transactions

---

## 🌟 Future Enhancements

* Wishlist Functionality
* Product Reviews & Ratings
* Coupon System
* Email Notifications
* Real-Time Order Tracking
* Multi-Vendor Support
* AI-Based Product Recommendations

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed with ❤️ using the MERN Stack and Stripe Payments.
