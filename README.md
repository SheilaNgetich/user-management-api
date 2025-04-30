# 👩🏽‍💻 User CRUD System 💾✨

Welcome to my adorable and functional User CRUD System! 💖  
This full-stack backend app is built with **Node.js**, **Express**, and **MySQL**, and it lets you **Create**, **Read**, **Update**, and **Delete** users from a database. Oh, and yes—we test with 💅 **Mocha & Chai**!

---

## 🌟 Features

✅ Add new users  
✅ View all users  
✅ Search users by name  
✅ Update user info  
✅ Delete users  
✅ Backend API testing with Mocha + Chai

---

## 🛠️ Tech Stack

- 🌐 **Backend**: Node.js + Express  
- 🗃️ **Database**: MySQL  
- 🧪 **Testing**: Mocha + Chai + chai-http  
- 🌱 **Environment Variables**: dotenv  
- 🔄 **Middleware**: CORS, express.json(), express.urlencoded()

---
## 📸 Screenshots

### ✅ Creating a New User  
![Create User](https://github.com/SheilaNgetich/user-management-api/blob/main/create.png)

### 📋 Viewing All Users  
![Read Users](https://github.com/SheilaNgetich/user-management-api/blob/main/read.png)

### 🔍 Searching for a User's Details  
![Search User](https://github.com/SheilaNgetich/user-management-api/blob/main/search.png)

### ✏️ Updating a User's Details  
![Update User](https://github.com/SheilaNgetich/user-management-api/blob/main/update.png)

### 🗑️ Deleting a User  
![Delete User](https://github.com/SheilaNgetich/user-management-api/blob/main/delete.png)

---
## 📁 Folder Structure
```
server/
├── index.js             # Main server file
├── Database/
│   └── database.js      # MySQL connection
├── Controllers/
│   └── userController.js# Route logic
├── test/
│   └── user.test.js     # Mocha/Chai tests
├── public/
│   └── index.html       # Basic frontend
├── .env
├── .gitignore
```
---

## 🚀 Getting Started

**1. Clone the Repo**
```git clone https://github.com/SheilaNgetich/user-management-api.git```

**2. Install Dependencies**
```npm install```

**3. Set Up Environment Variables**
- Create a .env file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=crud_db
PORT=5000
```

**4. Run the Server**
```
npm start
 ```

**5. Run Tests 🧪**
```npm test```

---
## 💡 Sample API Endpoints
| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| POST   | `/user`               | Add a new user        |
| GET    | `/users`              | Get all users         |
| GET    | `/users/search/:name`| Search user by name   |
| PATCH  | `/user/:id`           | Update user           |
| DELETE | `/user/:id`           | Delete user           |

---

💖 Author\
Built with love by **Sheila 🌷**\
“Building backend magic one route at a time!”


