# SimpleBlog – Blog Application

## Project Overview

SimpleBlog is a simple full-stack blog application developed using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

The application allows users to register, log in, and create blog posts.

## Features

- User Registration
- User Login
- JWT Authentication
- Create Blog Posts
- Display Blog Posts
- Dashboard
- MongoDB Database
- REST API
- Frontend and Backend Integration

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- JWT
- MongoDB
- Mongoose

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/blogs` | Create a blog |
| GET | `/api/blogs` | Get blog posts |

## Project Structure

```text
blog-application/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── create-blog.html
│   ├── css/
│   └── js/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
└── .gitignore
