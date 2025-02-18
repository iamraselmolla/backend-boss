# Payment API - Node.js + MongoDB

This is a Node.js-based backend server for managing payments, including user details, course information, and payment tracking.

## 🚀 Features

- Mongoose-based schema for structured payments
- Search and filter payments by name, email, phone, course, batch, method, and transaction ID
- Pagination support using `page` and `limit`
- Count payments by `status` (`Pending`, `Received`, `Cancelled`)
- Count payments by `payment method` (`Bkash`, `Nagad`, `Rocket`, `Bank Transfer`)
- Optimized queries using MongoDB aggregation

---

## 📌 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/payment-api.git
   cd payment-api
   ```
