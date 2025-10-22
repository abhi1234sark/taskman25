# Task Manager - Full Stack Application

A modern task management application with audit logging capabilities, built with React, Express.js, and MongoDB.

## Features

- ✅ **Task Management**: Create, read, update, and delete tasks
- 📋 **Audit Logging**: Track all task activities (create, update, delete)
- 🎨 **Dark Theme UI**: Modern, responsive design matching the provided mockup
- 📱 **Responsive Design**: Works on desktop and tablet devices
- 🔍 **Search Functionality**: Search tasks by title or description
- 📄 **Pagination**: Efficient data loading with pagination for both tasks and logs
- 🚀 **Real-time Updates**: Immediate UI updates after operations

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **RESTful API** design
- **Security** middleware (Helmet, CORS, Rate Limiting)

### Frontend
- **React** 19.2.0
- **Axios** for API communication
- **CSS3** with modern styling
- **Responsive Design** principles

## Data Models

### Task
```javascript
{
  "id": 1,
  "title": "Implement UI",
  "description": "Design and code the frontend dashboard",
  "createdAt": "2025-10-15T09:30:00Z",
  "updatedAt": "2025-10-15T09:30:00Z"
}
```

### Log (Audit Trail)
```javascript
{
  "timestamp": "2025-10-15T10:20:00Z",
  "action": "Update Task",
  "taskId": 12,
  "updatedContent": {
    "title": "New Task Title",
    "description": "Updated task description"
  },
  "notes": "-"
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install client dependencies:**
   ```bash
   npm run install-client
   ```

2. **Start the React development server:**
   ```bash
   npm run client
   ```

### Full Stack Development

To run both backend and frontend simultaneously:
```bash
npm run dev-full
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (with pagination)
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Audit Logs
- `GET /api/logs` - Get all audit logs (with pagination)
- `GET /api/logs/task/:taskId` - Get logs for a specific task

## Usage

1. **Tasks Tab:**
   - View all tasks in a paginated table
   - Search tasks by title or description
   - Create new tasks using the "Create Task" button
   - Edit existing tasks using the "Edit" button
   - Delete tasks using the "Delete" button

2. **Audit Logs Tab:**
   - View all task activities in chronological order
   - See timestamps, actions, task IDs, and updated content
   - Track create, update, and delete operations
   - Navigate through paginated log entries

## UI Features

- **Dark Theme**: Professional dark interface matching the provided design
- **Responsive Layout**: Adapts to different screen sizes
- **Sidebar Navigation**: Easy switching between Tasks and Audit Logs
- **Modal Forms**: Clean create/edit task interfaces
- **Action Buttons**: Color-coded action labels (green for create, yellow for update, red for delete)
- **Pagination Controls**: Efficient navigation through large datasets

## Production Build

To create a production build:
```bash
npm run build
```

## Project Structure

```
taskman25/
├── server.js              # Express server entry point
├── models/                # MongoDB models
│   ├── Task.js
│   └── Log.js
├── routes/                # API routes
│   ├── tasks.js
│   └── logs.js
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── package.json           # Backend dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License
