
# Notes App 📝

A full-stack note-taking application built with React and Node.js, allowing users to create, edit, delete, and manage their personal notes with user authentication.

## ✨ Features

- 📝 Create, read, update, and delete notes
- 🔐 User authentication and authorization
- 💾 Persistent data storage with MongoDB
- 📱 Responsive design for all devices
- 🚀 Fast and intuitive user interface
- 🔒 Secure user sessions

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **HTML/CSS/JavaScript** - Core web technologies

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📋 Prerequisites

Before running this application, make sure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB Compass** - Database GUI tool

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/narashimha05/Notes-App.git
cd Notes-App
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Start the backend development server:

```bash
npm run dev
```

The backend server will start running on `http://localhost:5000` (or the port specified in your environment).

### 3. Frontend Setup

Open a new terminal window/tab, navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will start running on `http://localhost:5173` (Vite's default port).

### 4. Database Setup

1. **Install MongoDB Compass** on your system if you haven't already
2. **Open MongoDB Compass** and connect to your local MongoDB instance (usually `mongodb://localhost:27017`)
3. The application will automatically create the necessary database and collections when you start using it

## 🔑 Authentication (Trial)

For testing purposes, you can use the following credentials:

- **Username:** `test123`
- **Password:** `test@123`



## 🌐 API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - User login
- `POST /api/auth/logout` - User logout

### Notes
- `GET /notes` - Get all user notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a specific note
- `DELETE /notes/:id` - Delete a specific note

## 🚦 Usage

1. **Start both servers** (backend and frontend) as described in the setup section
2. **Open your browser** and navigate to `http://localhost:5173`
3. **Login** using the trial credentials or register a new account
4. **Start creating notes** - click the "New Note" button
5. **Edit notes** by clicking on any existing note
6. **Delete notes** using the delete button on each note

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👨‍💻 Author

**Narashimha**
- GitHub: [@narashimha05](https://github.com/narashimha05)

## 🐛 Issues

If you find any bugs or have feature requests, please create an issue in the [GitHub repository](https://github.com/narashimha05/Notes-App/issues).


**Happy Note Taking! 📝✨**
