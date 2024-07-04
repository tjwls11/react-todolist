import React, { useState } from "react";
import '../App.css';

function TodoItem({ item, onDelete, onUpdate }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(item.emoji || '📋');
    const [completed, setCompleted] = useState(item.completed || false);
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(item.todo);
    const [editedDate, setEditedDate] = useState(item.date.toISOString().split('T')[0]);

    const handleDelete = () => {
        onDelete();
    };

    const handleEmojiChange = (emoji) => {
        setSelectedEmoji(emoji);
        onUpdate({ ...item, emoji });
        setDropdownOpen(false);
    };

    const handleCheckboxChange = () => {
        const newCompleted = !completed;
        setCompleted(newCompleted);
        onUpdate({ ...item, completed: newCompleted });
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onUpdate({ ...item, todo: editedText, date: new Date(editedDate) });
        setEditing(false);
    };

    const handleCancel = () => {
        setEditedText(item.todo);
        setEditedDate(item.date.toISOString().split('T')[0]);
        setEditing(false);
    };

    return (
        <div className={`todo-item ${completed ? 'completed' : ''}`}>
            <input type="checkbox" name="check" checked={completed} onChange={handleCheckboxChange} />
            <span role="img" aria-label="todo" className="todo-emoji">{selectedEmoji}</span>
            <div className="todo-content">
                {isEditing ? (
                    <div className="todo-edit">
                        <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                        <input
                            type="date"
                            value={editedDate}
                            onChange={(e) => setEditedDate(e.target.value)}
                        />
                        <button className="modify-button" onClick={handleSave}>Save</button>
                        <button className="modify-button" onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <div className="todo-text">
                            {item.todo}
                        </div>
                        <div className="todo-date">
                            <strong>날짜:</strong> {item.date.toISOString().split('T')[0]}
                        </div>
                    </>
                )}
            </div>
            {!isEditing && (
                <button className="edit-button" onClick={handleEdit}>수정</button>
            )}
            <button className="delete-button" onClick={handleDelete}>삭제</button>
            <div className="emoji-dropdown">
                <button className="emoji-button" onClick={() => setDropdownOpen(!isDropdownOpen)}>😊</button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={() => handleEmojiChange('📋')}>📋</button>
                        <button onClick={() => handleEmojiChange('📝')}>📝</button>
                        <button onClick={() => handleEmojiChange('✅')}>✅</button>
                        <button onClick={() => handleEmojiChange('📅')}>📅</button>
                        <button onClick={() => handleEmojiChange('🌟')}>🌟</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoItem;
