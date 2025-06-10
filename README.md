<h1 align="center">📸 Book Store App</h1>

<p align="center">
 Create simple online photo collages with support for downloading, customizable orientation (vertical/horizontal), borders, and background color.
</p>

---


## 📦 **Features**

- Upload and arrange images horizontally or vertically
- Choose background color and border thickness
- Preview the collage before downloading
- Download the final image to your device
- User-friendly interface

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
git clone https://github.com/your-username/online-photo-collage.git
cd online-photo-collage
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
Link: https://book-store-app-mauve.vercel.app/

---
## Backend:
Open Terminal, Docker and following:
    - Into root folder (Book-Store-App) open cmd and type this:

```
    Type this into Terminal:
    cd backend -> docker-compose up --build -> Enter
```
Link: http://127.0.0.1:5555
- getStat:   http://127.0.0.1:5555/api/stat/
- getAllBook:  http://127.0.0.1:5555/api/book
- getAllOrder:   http://127.0.0.1:5555/api/orders