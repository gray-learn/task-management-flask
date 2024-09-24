from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at.isoformat()
        }

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = Task.query.all()
        return jsonify([task.to_dict() for task in tasks]), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while retrieving tasks."}), 500

@app.route('/api/tasks/<int:id>', methods=['GET'])
def get_task(id):
    try:
        task = Task.query.get(id)
        if task is None:
            return {"error": "Task not found"}, 404
        return jsonify(task.to_dict()), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while retrieving the task."}), 500

@app.route('/api/tasks', methods=['POST'])
def create_task():
    try:
        data = request.json
        if not data or 'title' not in data:
            return jsonify({"error": "Title is required"}), 400
        # print(data)
        new_task = Task(
            title=data['title'],
            description=data.get('description', ''),
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_dict()), 201
    except Exception as e:
        print(e)  # Log the exception for debugging
        return jsonify({"error": "An error occurred while creating the task."}), 500


@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        task = Task.query.get_or_404(task_id)  # This should trigger a 404 if the task is not found
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.completed = data.get('completed', task.completed)

        db.session.commit()
        return jsonify(task.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error updating task: {e}")  # Debugging info
        return jsonify({"error": "An error occurred while updating the task."}), 500

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An error occurred while deleting the task."}), 500

@app.route('/api/tasks/update/<int:task_id>', methods=['PUT'])
def update_tasks(task_id):
    try:
        data = request.json  # Get the data from the request body

        # Find the task by its ID
        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404

        # Update the task's attributes
        if 'title' in data:
            task.title = data['title']
        if 'description' in data:
            task.description = data.get('description', task.description)

        db.session.commit()  # Save changes to the database

        return jsonify(task.to_dict()), 200
    except Exception as e:
        print(e)  # Log the exception for debugging
        return jsonify({"error": "An error occurred while updating the task."}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
