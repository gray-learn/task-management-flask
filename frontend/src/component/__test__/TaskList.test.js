import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskList from './TaskList';
import { getTasks, addTask, deleteTask, updateTask } from '../services/api';

// Mock the API service functions
jest.mock('../services/api');

describe('TaskList Component', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    jest.clearAllMocks();
  });

  test('renders task list and allows adding a task', async () => {
    // Mock getTasks response
    getTasks.mockResolvedValue([{ id: 1, title: 'Test Task', description: 'Test Desc', completed: false }]);

    render(<TaskList />);

    // Wait for tasks to load
    await waitFor(() => expect(getTasks).toHaveBeenCalled());

    // Check if the existing task is displayed
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();

    // Simulate typing into the input fields
    fireEvent.change(screen.getByPlaceholderText('Task Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Task Description'), { target: { value: 'New Description' } });

    // Mock addTask function
    addTask.mockResolvedValue();

    // Simulate clicking the "Add Task" button
    fireEvent.click(screen.getByText(/Add Task/i));

    // Wait for addTask to be called
    await waitFor(() => expect(addTask).toHaveBeenCalledWith({ title: 'New Task', description: 'New Description' }));

    // Wait for fetchTasks to reload the task list
    await waitFor(() => expect(getTasks).toHaveBeenCalledTimes(2));
  });

  test('allows deleting a completed task', async () => {
    // Mock getTasks response with a completed task
    getTasks.mockResolvedValue([{ id: 1, title: 'Completed Task', description: 'Task Desc', completed: true }]);

    render(<TaskList />);

    // Wait for tasks to load
    await waitFor(() => expect(getTasks).toHaveBeenCalled());

    // Mock deleteTask function
    deleteTask.mockResolvedValue();

    // Simulate clicking the "Delete" button
    fireEvent.click(screen.getByText(/Delete/i));

    // Wait for deleteTask to be called
    await waitFor(() => expect(deleteTask).toHaveBeenCalledWith(1));

    // Wait for fetchTasks to reload the task list
    await waitFor(() => expect(getTasks).toHaveBeenCalledTimes(2));
  });

  test('allows toggling a task\'s completion status', async () => {
    // Mock getTasks response
    getTasks.mockResolvedValue([{ id: 1, title: 'Task to Toggle', description: 'Task Desc', completed: false }]);

    render(<TaskList />);

    // Wait for tasks to load
    await waitFor(() => expect(getTasks).toHaveBeenCalled());

    // Mock updateTask function
    updateTask.mockResolvedValue();

    // Simulate clicking the "Complete" button
    fireEvent.click(screen.getByText(/Complete/i));

    // Wait for updateTask to be called
    await waitFor(() => expect(updateTask).toHaveBeenCalledWith(1, { id: 1, title: 'Task to Toggle', description: 'Task Desc', completed: true }));

    // Wait for fetchTasks to reload the task list
    await waitFor(() => expect(getTasks).toHaveBeenCalledTimes(2));
  });
});
