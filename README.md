# SimpleBlog - Full Stack Blog Application

A full-stack blogging application built with HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and JWT authentication.

## Features

- User registration and login
- JWT-based authentication
- Protected dashboard
- Create blog posts
- View all blog posts
- View individual blog posts
- Update your own blog posts
- Delete your own blog posts
- User-specific dashboard
- User profile
- Logout functionality
- Responsive mobile-friendly UI
- REST API backend
- MongoDB database integration

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Responsive Design

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication
- bcryptjs

### Database
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- VS Code

## Project Structure

```text
blog-application/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── blog.js
│   │   ├── blog-details.js
│   │   ├── common.js
│   │   ├── edit-blog.js
│   │   ├── home.js
│   │   └── profile.js
│   │
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── create-blog.html
│   ├── blog-details.html
│   ├── edit-blog.html
│   └── profile.html
│
├── .gitignore
└── README.md