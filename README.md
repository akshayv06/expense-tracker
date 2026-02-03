# Expense Tracker API

A simple backend API for tracking expenses using Node.js, Express, MongoDB, and Mongoose.

---

## 🚀 Project Overview

This project allows users to:

- Create a user
- Add expenses for a user
- Fetch all expenses for a user
- Get monthly expense summary

---

## 🧠 Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv

---

## 📁 Folder Structure

.
├── controllers
│   ├── user.controller.js
│   ├── expense.controller.js
│   └── summary.controller.js
├── models
│   ├── User.js
│   └── Expense.js
├── services
│   ├── user.service.js
│   ├── expense.service.js
│   └── summary.service.js
├── routes
│   ├── user.routes.js
│   └── expense.routes.js
├── config
│   └── db.js
├── src
│   ├── app.js
│   └── server.js
└── README.md

---

## ⚙️ Database

The project uses MongoDB to store:

### users collection
Document example:
```json
{
  "_id": "69826f80d1796114f5960a0e",
  "name": "Alex",
  "email": "alex@example.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### expenses collection
Document example:
```json
{
  "_id": "69826f80d1796114f5960a0e",
  "user": "69826f80d1796114f5960a0e",
  "amount": 200,
  "category": "Food",
  "date": "2026-02-03T00:00:00.000Z",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 📌 API Endpoints

1️⃣ Create User  
POST /users

Body:
```json
{
  "name": "Alex",
  "email": "alex@example.com"
}
```

2️⃣ Get User by ID  
GET /users/:id

3️⃣ Add Expense  
POST /expenses

Body:
```json
{
  "user": "USER_ID",
  "amount": 250,
  "category": "Food",
  "date": "2026-02-03"
}
```

4️⃣ Get User Expenses  
GET /users/:id/expenses  
Supports optional query params: page, limit, category, startDate, endDate

5️⃣ Get Monthly Summary  
GET /users/:id/summary

---

## 🧪 Testing with Postman

- Create a user → save userId
- Add expense(s) using userId
- GET /users/:id/expenses to verify
- GET /users/:id/summary to view monthly totals

---

## 🔧 Setup & Run Locally

1. Install dependencies
```bash
npm install
```

2. Create .env at project root:
```
MONGO_URI=mongodb://localhost:27017/expense-tracker
PORT=5000
```

3. Start server
- Production: `npm start`
- Development (auto-restart): `npm run dev`

Server will run on http://localhost:5000 (or PORT in .env)

---

## 🧾 Git Commands (Push to GitHub)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/expense-tracker.git
git push -u origin main
```

---