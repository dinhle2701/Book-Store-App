<h1 align="center">📸 Book Store App</h1>

<p align="center">
 An E-Commerce Website (book store) with full function from frontend to backend & deployment
</p>

---


## 📦 **Features**

- Login & Regis User
- Auto create Admin account (admin@gmail.com - Admin@123)
- Admin:
  - Get all book information
  - Create/Update/Delete a book
  - Get all user information
  - Get all orders information
  - Update book status
- User:
  - Login & register account
  - Get all book information
  - Get user detail information
  - Add book into cart
  - Checkout books from cart to create new order
  - Find & filter book (price, type)

---

## 🧰 **Technologies Used**

- Frontend: ReactJS + TailwindCSS
- Backend: Express (NodeJS)
- Dtabase: MongoDB
- Container: Docker

---

## 🛠️ **Local Development** 

### 🔧 **Requirements**

- Docker & Docker Compose
- VSCode
- Git

### 📥 **Clone project**

```bash
git clone https://github.com/dinhle2701/Book-Store-App.git
cd book-store-app
```

## 🛠️ **Project Using Guide**

### **1. Project Structure**
```
Online-Photo-Collage-Tool
├── backend/  # Flask API - xử lý ảnh
│   ├── controllers/
|   |   ├── authController.js
|   |   ├── bookController.js
|   |   ├── orderController.js
|   |   ├── statController.js
|   |   └── userController.js
│   ├── middleware/
|   |   ├── auth.js
|   |   ├── upload.js
│   ├── models/
|   |   ├── Book.js
|   |   ├── User.js
|   |   ├── Order.js
|   |   ├── Review.js
│   ├── node_modules/
|   ├── routes/
|   |   ├── authRoutes.js
|   |   ├── bookRoutes.js
|   |   ├── orderRoutes.js
|   |   ├── statRoutes.js
|   ├── static/
|   ├── utils/
|   |   ├── initAdmin.js.js
|   ├── docker-compose.yml
|   ├── Dockerfile
|   ├── index.js             # main file
|   └── app.js
│
├── frontend/              # React UI
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   ├── components/
│   │   ├── constant/
│   │   ├── context/
│   │   ├── page/
│   │   ├── query/
│   │   ├── routes/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── tailwind.config.js
├── README.md
└── .gitignore
```

### **2. Run Project**
Open Terminal and following:
## Frontend:
Link: 
  - `Production`: https://book-store-app-mauve.vercel.app/
  - `Development`: http://localhost:3000
---
## Backend:
Open Terminal, Docker and following:
    - Into root folder (Book-Store-App) open cmd and type this:

```
    Type this into Terminal (1):
    cd backend -> docker-compose up --build -> Enter

    or you haven't Docker, type this:
    cd backend -> npm i -> npm start
```
Link: http://127.0.0.1:5555
- `getStat`:   http://127.0.0.1:5555/api/stat/
- `getAllBook`:  http://127.0.0.1:5555/api/book
- `getAllOrder`:   http://127.0.0.1:5555/api/orders