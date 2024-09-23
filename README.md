# Task Management Application

## Objective
The Task Management Application is a simple web-based tool that allows users to create, manage, and track tasks. The application offers basic task management functionalities such as adding, displaying, deleting, and updating the status of tasks (marking them as complete or incomplete).

## Features
- **Add a Task**: Users can create a new task by providing a title and an optional description.
- **Display Tasks**: A list of all tasks will be displayed, showing the title, description, and status (complete or incomplete).
- **Delete a Task**: Users can delete once it has been marked as complete. The "Delete" button is disabled for incomplete tasks.
- **Mark Task as Complete/Incomplete**: Users can toggle the completion status of each task. A completed task will be marked with a strikethrough effect.

## API Endpoints

### Task Endpoints
- **GET /api/tasks**: Fetch all tasks from the database.
  - **Response**: A JSON array of task objects with `id`, `title`, `description`, and `completed` fields.

- **POST /api/tasks**: Create a new task with a title and description.
  - **Request Body**: JSON object containing `title` and `description`.
  - **Response**: The created task object.

- **PUT /api/tasks/{id}**: Update the details of a task.
  - **Request Body**: JSON object containing `title`, `description`, and `completed`.
  - **Response**: The updated task object.

- **DELETE /api/tasks/{id}**: Delete a task by its ID.
  - **Response**: A confirmation message after task deletion.

## Installation Instructions

### Backend Setup (Flask + SQLite)
1. **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd backend
    ```

2. **Install the dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Run the Flask server**:
    ```bash
    python app.py
    ```
    The backend should now be running at [http://localhost:5000](http://localhost:5000).

### Frontend Setup (React)
1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the React app**:
    ```bash
    npm start
    ```
    The frontend should now be running at [http://localhost:3000](http://localhost:3000).

## How to Use
1. Open the frontend app at [http://localhost:3000](http://localhost:3000).
2. You can add a new task by filling out the task title and description.
3. The task list will be displayed, showing all tasks with their current completion status.
4. You can mark tasks as complete/incomplete or delete them using the provided buttons.

## File Structure
- **backend/app.py**: Flask backend application with API endpoints.
- **frontend/src/component/TaskForm.js**: React component for adding new tasks.
- **frontend/src/component/TaskList.js**: React component for displaying the list of tasks.
- **frontend/src/component/Tasks.js**: React component for individual task items.
- **frontend/src/services/api.js**: API service for making HTTP requests to the backend.
- **frontend/src/index.css**: Main CSS file including Tailwind CSS directives.
- **frontend/tailwind.config.js**: Tailwind CSS configuration file.
- **frontend/package.json**: Frontend dependencies and scripts.

## Example Code Snippets

### Backend (Flask)