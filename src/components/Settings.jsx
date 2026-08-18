import '../styles/settings.css';

function Settings({ onClose, theme, onThemeToggle }) {
    return (
        <div className="settings-overlay" onClick={onClose}>
            <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
                <div className="settings-header">
                    <h2>Settings</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="settings-content">
                    <div className="settings-section">
                        <h3>Appearance</h3>

                        <div className="setting-item">
                            <div className="setting-label">
                                <label>Dark Mode</label>
                                <p>Switch between light and dark themes</p>
                            </div>
                            <div className="setting-control">
                                <button
                                    className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                                    onClick={() => onThemeToggle()}
                                >
                                    {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h3>About</h3>
                        <div className="about-info">
                            <p><strong>Application:</strong> Notepad</p>
                            <p><strong>Version:</strong> 1.0.0</p>
                            <p><strong>Description:</strong> A modern notes and task manager for productivity</p>
                        </div>
                    </div>
                </div>

                <div className="settings-footer">
                    <button className="btn-close" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
