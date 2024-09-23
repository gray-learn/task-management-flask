import pytest
from app import app, db, Task
import json

@pytest.fixture
def client():
    """Setup and teardown for the test client and database"""
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def create_task(client, title, description=None):
    """Helper function to create a task"""
    task_data = {'title': title}
    if description:
        task_data['description'] = description
    response = client.post('/api/tasks', json=task_data)
    return json.loads(response.data)['id']

def test_get_tasks(client):
    """Test fetching tasks when none exist"""
    response = client.get('/api/tasks')
    assert response.status_code == 200
    assert json.loads(response.data) == []

def test_create_task(client):
    """Test creating a new task"""
    task_data = {'title': 'Test Task', 'description': 'This is a test task'}
    response = client.post('/api/tasks', json=task_data)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['title'] == 'Test Task'
    assert data['description'] == 'This is a test task'
    assert 'id' in data

def test_update_task(client):
    """Test updating an existing task"""
    task_id = create_task(client, 'Original Task')

    # Now, update the task
    updated_data = {'title': 'Updated Task', 'completed': True}
    response = client.put(f'/api/tasks/{task_id}', json=updated_data)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['title'] == 'Updated Task'
    assert data['completed'] is True

def test_delete_task(client):
    """Test deleting an existing task"""
    task_id = create_task(client, 'Task to Delete')

    # Now, delete the task
    response = client.delete(f'/api/tasks/{task_id}')
    assert response.status_code == 204

    # Verify the task is deleted
    response = client.get('/api/tasks')
    assert response.status_code == 200
    assert json.loads(response.data) == []

@pytest.mark.parametrize("task_id, status_code", [
    (9999, 404),  # Test non-existent task with ID 9999
])
def test_get_nonexistent_task(client, task_id, status_code):
    """Test fetching a non-existent task"""
    response = client.get(f'/api/tasks/{task_id}')
    assert response.status_code == status_code

@pytest.mark.parametrize("task_id, update_data, status_code", [
    (9999, {'title': 'Updated Task'}, 404),  # Test updating non-existent task with ID 9999
])
def test_update_nonexistent_task(client, task_id, update_data, status_code):
    """Test updating a non-existent task"""
    response = client.put(f'/api/tasks/{task_id}', json=update_data)
    assert response.status_code == status_code

@pytest.mark.parametrize("task_id, status_code", [
    (9999, 404),  # Test deleting non-existent task with ID 9999
])
def test_delete_nonexistent_task(client, task_id, status_code):
    """Test deleting a non-existent task"""
    response = client.delete(f'/api/tasks/{task_id}')
    assert response.status_code == status_code