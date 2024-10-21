# 📸 Digital Albums

A **Digital Albums** web application built with **Spring Boot** and **React** that allows users to manage photo albums with ease. It provides secure authentication, authorization, and full CRUD operations for albums and photos.

---

## 🛠️ Tech Stack

- **Backend:** Spring Boot, REST APIs, MySQL, JPA, Lombok  
- **Frontend:** React, HTML/CSS, Tailwind CSS  
- **Authentication & Authorization:** Spring Security  
- **Database:** MySQL

---

## ✨ Features

- **User Authentication & Authorization:**  
  - Secure login and registration  
  - Role-based access control

- **Album Management:**  
  - Create, Read, Update, and Delete (CRUD) operations on albums  
  - Users can upload multiple albums

- **Photo Management:**  
  - Add, Update, View, and Delete photos within albums  
  - Organize photos by album

- **Responsive UI:**  
  - Built with React and styled using Tailwind CSS for modern, responsive design

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Java 17 or higher  
- Node.js and npm  
- MySQL Server  
- Maven

---

### Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/digital-albums.git

   cd digital-albums
   ```

2. **Backend Setup(SpringBoot)**
-Navigate to Backend Directory
```bash
cd backend
```
- Update the MySQL configuration in `application.properties`:
```
spring.datasource.url=jdbc:mysql://localhost:3306/digital_albums
spring.datasource.username=root
spring.datasource.password=your_password
```
- Build and run the backend
```bash
mvn clean install
mvn spring-boot:run
```
3. **Frontend Setup(React)**

- Navigate to the `frontend` directory: 
```
cd frontend
```
- Install dependencies:
```
npm install
```
- Start the frontend application:
```
npm start
```
4. **Access the Application**
- Open your web browser and navigate to `http://localhost:3000` to access the frontend

### 📂 Project Structure

```

digital-albums/
│
├── backend/              # Spring Boot backend
│   ├── src/              
│   └── pom.xml           
│
├── frontend/             # React frontend
│   ├── src/
│   └── package.json      
│
└── README.md             # Project documentation

```
### 🛡️ Security
- **Authentication**: Users need to log in to access their albums.
- **Authorization**: Only authorized users can modify their own albums and photos.





