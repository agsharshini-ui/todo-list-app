import { useState, useEffect } from 'react';
import '../styles/tasks.css';

function TasksSection({ token }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTasks();
    }, [token]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data.tasks || []);
            } else {
                setError('Failed to load tasks');
            }
        } catch (err) {
            setError(err.message || 'Error loading tasks');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title: newTask })
            });

            if (response.ok) {
                setNewTask('');
                await fetchTasks();
            } else {
                setError('Failed to add task');
            }
        } catch (err) {
            setError(err.message || 'Error adding task');
        }
    };

    const toggleTask = async (taskId, completed) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ completed: !completed })
            });

            if (response.ok) {
                await fetchTasks();
            }
        } catch (err) {
            setError(err.message || 'Error updating task');
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                await fetchTasks();
            }
        } catch (err) {
            setError(err.message || 'Error deleting task');
        }
    };

    return (
        <div className="tasks-section">
            <h2>My Tasks</h2>

            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="task-input"
                />
                <button type="submit" className="add-btn">Add Task</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="empty-state">No tasks yet. Create one to get started!</p>
            ) : (
                <ul className="tasks-list">
                    {tasks.map(task => (
                        <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task._id, task.completed)}
                                className="task-checkbox"
                            />
                            <span className="task-title">{task.title}</span>
                            <button
                                onClick={() => deleteTask(task._id)}
                                className="delete-btn"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TasksSection;
