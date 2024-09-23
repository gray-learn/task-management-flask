import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    if (!title.trim()) return;
    this.props.onAddTask({ title, description });
    this.setState({ title: '', description: '' });
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  render() {
    const { title, description } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={this.handleTitleChange}
          placeholder="Task title"
          required
        />
        <textarea
          value={description}
          onChange={this.handleDescriptionChange}
          placeholder="Task description"
        />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

// Exporting the TaskForm component
export default TaskForm;
