import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

// Mock the fetch function
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('App fetches and displays tasks', async () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
  ];

  fetch.mockResolvedValueOnce({
    json: async () => mockTasks,
  });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});

test('App adds a new task', async () => {
  fetch.mockResolvedValueOnce({ json: async () => [] }); // Initial fetch
  fetch.mockResolvedValueOnce({
    json: async () => ({ id: 1, title: 'New Task', description: 'New Description', completed: false }),
  });

  render(<App />);

  fireEvent.change(screen.getByPlaceholderText('Task title'), { target: { value: 'New Task' } });
  fireEvent.change(screen.getByPlaceholderText('Task description'), { target: { value: 'New Description' } });
  fireEvent.click(screen.getByText('Add Task'));

  await waitFor(() => {
    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('New Description')).toBeInTheDocument();
  });
});