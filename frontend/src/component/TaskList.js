import React, { useState, useEffect } from 'react';
import { getTasks, addTask, deleteTask, updateTask } from '../services/api'
import { FaRegTrashAlt } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

function TaskList () {
    const [tasks, setTasks] = useState([]); // State to store tasks
    const [title, setTitle] = useState(''); // State to store the task title
    const [description, setDescription] = useState(''); // State to store task description
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");

      // Function to format the date in mm/dd/yyyy
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US');
    };

    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (search === "") {
            fetchTasks();
            setTasks(tasks ?? []);
          return;
        }
        const filteredTitle = tasks?.filter((t) =>
          t?.title.toLowerCase().includes(search.toLowerCase()),
        );
        setTasks(filteredTitle ?? []);
      }, [search]);

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
                setIsModalOpen(false); // Close the modal after submitting
            } catch (error) {
                console.error("Failed to add task", error); // Handle any errors
            }
        }
    };

    const handleEditTask = (task) => {
        setIsModalOpen(true); // Open the modal
        setIsEditing(true); // Set editing mode to true
        setCurrentTaskId(task.id); // Set the ID of the task being edited
        setTitle(task.title); // Pre-populate the title
        setDescription(task.description); // Pre-populate the description
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
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <aside className="w-1/5 bg-gray-800 p-5">
                <div className="flex flex-col items-center">
                    {/* Profile Picture */}
                    <img
                        src="" // Use your actual profile picture URL
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                    />
                    {/* Navigation Links */}
                    <nav className="mt-10">
                        <a href="#" className="block text-gray-300 hover:text-white mb-4">
                        Dashboard
                        </a>
                        <a href="#" className="block text-gray-300 hover:text-white mb-4">
                        About
                        </a>
                    </nav>
                </div>
                <div className="mt-auto flex items-center justify-center">
                    <button className="text-sm text-gray-400 hover:text-white">
                        Change Theme
                    </button>
                </div>
            </aside>
            <main  className="flex-1 p-6 bg-gray-900">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold">Task Management</h1>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
                        + New
                    </button>
                </header>
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Find task..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-800 p-3 rounded-md text-gray-200 border border-gray-600"
                    />
                </div>
                <table className="min-w-full bg-gray-800 rounded-md">
                    <thead>
                        <tr className="text-left bg-gray-700 text-gray-400">
                        <th className="p-3">Name</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Created At</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr  key={task.id} className="bg-gray-900 border-t border-gray-700">
                                <td className="p-3">{task?.title}</td>
                                <td className="p-3">{task?.description}</td>
                                <td className="p-3">{formatDate(task?.created_at)}</td>
                                <td className="p-3 text-yellow-400">                  
                                    {task.completed ? <>
                                        <button className="text-green-500 mr-4">                     
                                            <TiTick/>
                                        </button>
                                        Completed
                                    </> : <>
                                        <button className="text-gray-500 mr-4"
                                            onClick={() => handleToggleComplete(task.id)}
                                            >                     
                                            <TiTick/>
                                        </button>
                                        Pending
                                    </>}
                                </td>
                                <td className="p-3">
                                    <button className="text-blue-500 mr-4" onClick={()=>handleEditTask(task)}
                                        <IoPencil/>
                                    </button>
                                    <button className="text-red-500" onClick={() => handleDeleteTask(task.id)}>
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                            ))}
                    </tbody>                
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} className="text-center">
                                <td className="py-2 px-4 border">
                                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                        {task.title}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border">{task.description}</td>
                                <td className="py-2 px-4 border">
                                     {task.completed ? 'Completed' : 'Pending'}
                                </td>
                                <td className="py-2 px-4 border">
                                    <button
                                        onClick={() => handleToggleComplete(task.id)}
                                        className={`px-4 py-2 text-white rounded ${
                                            task.completed ? 'bg-red-500' : 'bg-green-500'
                                        }`}
                                    >
                                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className={`ml-2 px-4 py-2 text-white rounded ${
                                            task.completed ? 'bg-red-500' : 'bg-gray-500'
                                        }`}
                                        disabled={!task.completed} // Disable the button if the task is incomplete
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Modal for Adding New Task */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg w-1/3">
                            <h2 className="text-2xl mb-4">Add New Task</h2>
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border p-2 mb-4 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Task Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border p-2 mb-4 w-full"
                            />
                            <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 mr-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTask}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Confirm
                            </button>
                            </div>
                        </div>
                        </div>
                    )}
            </main>
        </div>
    );
};

export default TaskList;