import { useState, useEffect } from 'react';
import '../styles/notes.css';

function NotesSection({ token }) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, [token]);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/notes', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setNotes(data.notes || []);
            } else {
                setError('Failed to load notes');
            }
        } catch (err) {
            setError(err.message || 'Error loading notes');
        } finally {
            setLoading(false);
        }
    };

    const addNote = async (e) => {
        e.preventDefault();
        if (!newNote.title.trim() || !newNote.content.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newNote)
            });

            if (response.ok) {
                setNewNote({ title: '', content: '' });
                await fetchNotes();
            } else {
                setError('Failed to add note');
            }
        } catch (err) {
            setError(err.message || 'Error adding note');
        }
    };

    const updateNote = async (noteId, title, content) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                setEditingId(null);
                await fetchNotes();
            }
        } catch (err) {
            setError(err.message || 'Error updating note');
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                await fetchNotes();
            }
        } catch (err) {
            setError(err.message || 'Error deleting note');
        }
    };

    return (
        <div className="notes-section">
            <h2>My Notes</h2>

            <form onSubmit={addNote} className="note-form">
                <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Note title..."
                    className="note-input"
                />
                <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Note content..."
                    className="note-textarea"
                    rows="4"
                />
                <button type="submit" className="add-btn">Add Note</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <p>Loading notes...</p>
            ) : notes.length === 0 ? (
                <p className="empty-state">No notes yet. Create one to get started!</p>
            ) : (
                <div className="notes-grid">
                    {notes.map(note => (
                        <div key={note._id} className="note-card">
                            {editingId === note._id ? (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    updateNote(note._id, note.title, note.content);
                                }}>
                                    <input
                                        type="text"
                                        value={note.title}
                                        onChange={(e) => {
                                            const updated = notes.map(n => n._id === note._id ? { ...n, title: e.target.value } : n);
                                            setNotes(updated);
                                        }}
                                        className="edit-input"
                                    />
                                    <textarea
                                        value={note.content}
                                        onChange={(e) => {
                                            const updated = notes.map(n => n._id === note._id ? { ...n, content: e.target.value } : n);
                                            setNotes(updated);
                                        }}
                                        className="edit-textarea"
                                    />
                                    <div className="edit-actions">
                                        <button type="submit" className="save-btn">Save</button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingId(null)}
                                            className="cancel-btn"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                    <div className="note-actions">
                                        <button
                                            onClick={() => setEditingId(note._id)}
                                            className="edit-btn"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => deleteNote(note._id)}
                                            className="delete-btn"
                                        >
                                            ✕ Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NotesSection;
