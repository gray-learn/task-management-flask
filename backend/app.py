from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

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
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/api/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get(id)
    if task is None:
        return {"error": "Task not found"}, 404
    return {"id": task.id, "title": task.title, "completed": task.completed}, 200

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.json
    print(data)
    new_task = Task(title=data['title'], description=data.get('description', ''))
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415

    task = Task.query.get_or_404(task_id)
    data = request.get_json()

    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.completed = data.get('completed', task.completed)
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify(task.to_dict())

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()  # Rollback the session in case of an error
        return jsonify({"error": str(e)}), 404  # Return a 404 error with the exception message

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)