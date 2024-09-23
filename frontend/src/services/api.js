import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error; // Rethrow the error for further handling
  }
};
