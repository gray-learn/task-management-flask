import React, { useState, useEffect } from 'react';
import { getTasks, addTask, deleteTask, updateTask } from '../services/api'

function TaskList () {
    const [tasks, setTasks] = useState([]); // State to store tasks
    const [title, setTitle] = useState(''); // State to store the task title
    const [description, setDescription] = useState(''); // State to store task description

    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await getTasks(); // Get tasks from the API
            setTasks(response || []); // Update state with the fetched tasks, fallback to an empty array if undefined
        } catch (error) {
            console.error("Failed to fetch tasks", error); // Handle any errors
        }
    };

    // Function to handle adding a new task
    const handleAddTask = async () => {
        if (title.trim()) {
            try {
                await addTask({ title, description }); // Add a new task via API
                fetchTasks(); // Refresh the task list
                setTitle(''); // Clear the title input
                setDescription(''); // Clear the description input
            } catch (error) {
                console.error("Failed to add task", error); // Handle any errors
            }
        }
    };

    // Function to delete a task
    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id); // Delete the task via API
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error("Failed to delete task", error); // Handle any errors
        }
    };

    // Function to toggle task completion status
    const handleToggleComplete = async (id) => {
        try {
            const task = tasks.find((t) => t.id === id);
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(id, updatedTask); // Update the task status via API
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error("Failed to update task", error); // Handle any errors
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Chore List</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title input value
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} // Update description input value
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Add Task
                </button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="mb-2 p-2 border rounded flex items-center">
                        <span
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            className="flex-grow"
                        >
                            {task.title}: {task.description}
                        </span>
                        <button
                            onClick={() => handleToggleComplete(task.id)}
                            className={`px-4 py-2 ml-2 text-white rounded ${
                                task.completed ? 'bg-red-500' : 'bg-green-500'
                            } flex-none w-1/6`}
                        >
                            {task.completed ? 'Incomplete' : 'Complete'}
                        </button>
                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className={`px-4 py-2 ml-2 text-white
                            ${
                                task.completed ? 'bg-red-500' : 'bg-gray-500'
                            }
                            rounded flex-none w-1/6`}
                            disabled={!task.completed} // Disable the button if the task is incomplete
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;