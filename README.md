# 📚 Library Management System API

A full-featured backend API for managing a library system. Built with **Express.js**, **TypeScript**, and **MongoDB**, this system enables users to manage books, borrowing operations, and view summarized borrowing data. Ideal for institutions or developers looking to implement a digital library backend.

## 🚀 Live URL

👉 [Visit Deployed API on Vercel](https://library-management-api-gilt.vercel.app/)

---

## 📌 Features

- 📖 **Book Management**

  - Create, read, update, and delete books
  - Filter books by genre
  - Sort and limit query results

- 🔁 **Borrowing System**

  - Borrow books with quantity and due date
  - Automatically updates availability and copies

- 📊 **Borrowed Summary**
  - Aggregate report of total quantity borrowed per book
  - Includes title and ISBN details

---

## 🛠️ Technologies Used

- **Node.js** & **Express.js** – Backend server
- **TypeScript** – Type-safe development
- **MongoDB** & **Mongoose** – NoSQL database and ODM
- **Vercel** – Deployment platform
- **ESLint** – Linting and code quality
- **dotenv** – Environment variable management

---

## 📦 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/zahidhasanratan/Library-Management-API.git
cd library-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file with your MongoDB connection string

```bash
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/libraryDB
```

### 4. Run the application

```bash
npm run build
```

### 5. Start the server

```bash
npm start
```

### 6. Test the API using Postman or cURL

### 6. Test the API using Postman or cURL

🔄 API Endpoints

#### 📘 Books

| Method | Endpoint       | Description                      |
| ------ | -------------- | -------------------------------- |
| GET    | /api/books     | Get all books (with filter/sort) |
| GET    | /api/books/:id | Get a book by ID                 |
| POST   | /api/books     | Create a new book                |
| PATCH  | /api/books/:id | Update a book by ID              |
| DELETE | /api/books/:id | Delete a book by ID              |

#### 📦 Borrow

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| POST   | /api/borrow         | Borrow a book                 |
| GET    | /api/borrow/summary | Get summary of borrowed books |
