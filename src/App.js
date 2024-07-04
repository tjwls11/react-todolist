import React, { useState, useEffect } from 'react';
import './App.css';
import TodoBoard from './components/TodoBoard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      const parsedTodoList = JSON.parse(storedTodoList).map(item => ({
        ...item,
        date: new Date(item.date)
      }));
      setTodoList(parsedTodoList);
    }
  }, []);

  // 추가 함수
  const addItem = () => {
    if (inputValue.trim() === '') {
      alert('Please write down the list');
      return;
    }
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    const newItem = {
      todo: inputValue,
      date: selectedDate,
      emoji: '📋'
    };

    // 기존 목록에 추가 및 날짜 기준으로 정렬
    const updatedTodoList = [...todoList, newItem];
    const sortedTodoList = updatedTodoList.sort((a, b) => a.date - b.date);
    setTodoList(sortedTodoList);
    localStorage.setItem('todoList', JSON.stringify(sortedTodoList));

    setInputValue('');
    setSelectedDate(null);
  };

  const handleDateChange = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setSelectedDate(utcDate);
  };

  // 삭제 함수
  const deleteItem = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  // 업데이트 함수
  const updateTodoList = (newList) => {
    setTodoList(newList);
    localStorage.setItem('todoList', JSON.stringify(newList));
  };

  return (
    <div className='App'>
      <input
        value={inputValue}
        type="text"
        onChange={(event) => setInputValue(event.target.value)}
      />
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
      />
      <button onClick={addItem}>Add</button>
      <TodoBoard
        todoList={todoList}
        onDelete={deleteItem}
        onUpdate={updateTodoList}
      />
    </div>
  );
}

export default App;
