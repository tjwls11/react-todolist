import React from 'react';
import TodoItem from './TodoItem';

function TodoBoard({ todoList, onDelete, onUpdate }) {
    const handleUpdateItem = (index, updatedItem) => {
        const updatedList = [...todoList];
        updatedList[index] = updatedItem;
        onUpdate(updatedList);
    };

    return (
        <div className="todo-board">
            <h1 style={{ color: '#974D99' }}>My Todo List</h1>
            {todoList.length === 0 ? (
                <p>No items in the list</p>
            ) : (
                todoList.map((item, index) => (
                    <TodoItem
                        key={index}
                        item={item}
                        onDelete={() => onDelete(index)}
                        onUpdate={(updatedItem) => handleUpdateItem(index, updatedItem)}
                    />
                ))
            )}
        </div>
    );
}

export default TodoBoard;
