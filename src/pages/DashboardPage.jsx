import { useState } from 'react';
import '../styles/dashboard.css';
import TasksSection from '../components/TasksSection';
import NotesSection from '../components/NotesSection';
import Settings from '../components/Settings';

function DashboardPage({ user, token, onLogout, theme, onThemeToggle }) {
    const [activeTab, setActiveTab] = useState('tasks');
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>Notepad</h1>
                </div>
                <div className="header-right">
                    <span className="user-name">Welcome, {user?.name || user?.email}</span>
                    <button onClick={() => setShowSettings(true)} className="settings-btn" title="Settings">⚙️</button>
                    <button onClick={onLogout} className="logout-btn">Logout</button>
                </div>
            </header>

            {showSettings && (
                <Settings onClose={() => setShowSettings(false)} theme={theme} onThemeToggle={onThemeToggle} />
            )}

            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tasks')}
                >
                    📋 Tasks
                </button>
                <button
                    className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notes')}
                >
                    📝 Notes
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab === 'tasks' && <TasksSection token={token} />}
                {activeTab === 'notes' && <NotesSection token={token} />}
            </div>
        </div>
    );
}

export default DashboardPage;
