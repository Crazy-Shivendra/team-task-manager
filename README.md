````md
# Team Task Manager

A full-stack Team Task Management web application where users can create projects, assign tasks, manage teams, and track progress with secure role-based authentication.

---

# 🚀 Live Demo

## Frontend
https://team-task-manager-delta-murex.vercel.app

## Backend API
https://team-task-manager-wgh8.onrender.com

---

# 📌 Features

## 🔐 Authentication
- User Signup & Login
- JWT Authentication
- Cookie-based authentication
- Protected routes
- Secure password hashing using bcrypt

---

## 👥 Role-Based Access Control

### Admin
- Create projects
- Create tasks
- Assign tasks to members
- Add members to projects
- Promote members to admin

### Member
- View assigned tasks
- Update only their own task status
- Access limited dashboard

---

## 📂 Project Management
- Create projects
- View all projects
- Add team members
- Project-member relationship management

---

## ✅ Task Management
- Create tasks
- Assign tasks to users
- Task status tracking
- Due dates
- Overdue task tracking

---

## 📊 Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- In-progress tasks
- Overdue tasks
- Separate admin/member dashboards

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Lucide React Icons

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- bcryptjs

---

# 📁 Folder Structure

team-task-manager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/team-task-manager.git
````

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

# 🔑 Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# ▶️ Run Frontend

```bash
cd frontend
npm run dev
```

---

# ▶️ Run Backend

```bash
cd backend
npm start
```

---

# 🌐 Deployment

## Frontend

Deployed on Vercel.

## Backend

Deployed on Render.

## Database

MongoDB Atlas.

---

# 🔒 Security Features

* JWT-based authentication
* HTTP-only cookies
* Protected backend routes
* Role-based authorization
* Password hashing with bcrypt
* CORS configuration
* Task ownership validation

---

# 📸 Screenshots

Add screenshots here:

* Login Page
* Dashboard
* Projects Page
* Tasks Page
* Admin Panel

---

# 🎥 Demo Video

Add demo video link here.

---

# 👨‍💻 Author

Shivendra Sudhanshu

---

# 📄 License

This project is developed for educational and assignment purposes.

```
```
