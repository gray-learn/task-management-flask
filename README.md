# Task Management Application

## Objective
The Task Management Application is a simple web-based tool that allows users to create, manage, and track tasks. The application offers basic task management functionalities such as adding, displaying, deleting, and updating the status of tasks (marking them as complete or incomplete).

## Features
- **Add a Task**: Users can create a new task by providing a title and an optional description.
- **Display Tasks**: A list of all tasks will be displayed, showing the title, description, and status (complete or incomplete).
- **Delete a Task**: Users can delete once it has been marked as complete. The "Delete" button is disabled for incomplete tasks.
- **Mark Task as Complete/Incomplete**: Users can toggle the completion status of each task. A completed task will be marked with a strikethrough effect.

## How to Use
1. Open the frontend app at [http://localhost:3000](http://localhost:3000).
2. You can add a new task by filling out the task title and description.
3. The task list will be displayed, showing all tasks with their current completion status.
4. You can mark tasks as complete/incomplete or delete them using the provided buttons.

### Task Endpoints
## API Endpoints

### Task Endpoints

1. **GET /api/tasks**
   - **Description**: Fetch all tasks from the database.
   - **Response**: A JSON array of task objects with `id`, `title`, `description`, and `complete` fields.
   - **Example**:
     ```bash
     curl -X GET http://127.0.0.1:5000/api/tasks
     ```

2. **POST /api/tasks**
   - **Description**: Create a new task with a title and description.
   - **Request Body**: JSON object containing `title` and `description`.
   - **Response**: A confirmation message.
   - **Example**:
     ```bash
     curl -X POST http://127.0.0.1:5000/api/tasks -H "Content-Type: application/json" -d '{"title": "New Task", "description": "Task description"}'
     ```

3. **PUT /api/tasks/{id}**
   - **Description**: Toggle the completion status of a task by its ID.
   - **Request Body**: JSON object containing the updated `complete` status.
   - **Response**: A confirmation message after updating the task.
   - **Example**:
     ```bash
     curl -X PUT http://127.0.0.1:5000/api/tasks/1 -H "Content-Type: application/json" -d '{"complete": true}'
     ```

4. **DELETE /api/tasks/{id}**
   - **Description**: Delete a task by its ID only if it is marked as complete.
   - **Response**: A confirmation message after task deletion, or an error message if the task is incomplete.
   - **Example**:
     ```bash
     curl -X DELETE http://127.0.0.1:5000/api/tasks/1
     ```
   - **Example for a non-existent task**:
     ```bash
     curl -X DELETE http://127.0.0.1:5000/api/tasks/9999
     ```
     This will return an error if task `9999` doesn't exist or is not marked as complete.


## Installation Instructions

### 1. Set up the Backend

#### 1.1. Create a New Directory for the Project and Set Up a Virtual Environment

```bash
mkdir task_management_app
cd task_management_app
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```
#### 1.2. Install Flask and Flask-SQLAlchemy
```bash
pip install flask flask-sqlalchemy
```

1.3. Create the Flask Application (app.py)
Create a file named app.py to define the Flask backend.

1.4. Define the Task Model (models.py)
Create a file named models.py and define the Task model.

1.5. Implement API Endpoints (in app.py)
Create API endpoints for tasks (GET, POST, PUT, DELETE) in the app.py file.

2. Set up the Frontend
2.1. Create a New React Application
```bash
npx create-react-app frontend
cd frontend
```
### 2.2. Create Necessary Components

- **TaskList.js**: This component is responsible for handling and displaying the list of tasks. It maps through the tasks and renders individual task items, showing their title, description, and completion status. It also includes options for updating or deleting tasks.

### 2.3. Implement the Main App Component (`App.js`)

In the `App.js` file, import the necessary components such as `TaskList`, and others. Set up state management for handling the task data, such as adding, updating, and deleting tasks. Implement API calls to the backend to fetch, create, update, and delete tasks, ensuring smooth communication between the frontend and backend.

### 2.4. Style the Components

For styling the components, you can utilize **Tailwind CSS**, a utility-first CSS framework. Tailwind simplifies the process of designing responsive and consistent user interfaces by providing pre-defined classes for spacing, layout, typography, and more. You can add Tailwind to your project by following these steps:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

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
    The backend should now be running at [http://127.0.0.1:5000](http://127.0.0.1:5000).

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

## File Structure
```
TaskManagementApp/
├── backend/
│   ├── __pycache__/
│   ├── app.py
│   ├── requirements.txt
│   ├── test_app.py
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   ├── src/
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── serviceWorker.js
│   │   ├── setupTests.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   ├── component/
│   │   │   ├── TaskList.js
│   │   ├── tailwind.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
├── .gitignore
├── README.md

```

### Testing Process
Backend Testing (with pytest)
    ```bash
        pip install pytest
    ```
    ```bash
        pytest .\test_app.py
    ```

### Future Enhancements

- **Add due dates or deadlines for tasks**: Enhance the task model to include due dates or deadlines, allowing users to set and track task deadlines.
- **Add user authentication for personalized task lists**: Implement user authentication (e.g., using JWT or OAuth) to provide personalized task lists for each user.
- **Add pagination and sorting capabilities to manage large lists of tasks**: Implement pagination and sorting features on both the backend and frontend to improve performance when dealing with large sets of tasks.
- **Add Swagger API documentation**: Integrate Swagger to automatically generate comprehensive API documentation, providing developers with an interactive interface to explore and test the available API endpoints.
- **Add Docker for containerization**: Containerize the application using Docker to streamline development, testing, and deployment processes, ensuring consistency across different environments.
