"use client";

import { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TodoProps {
  todo: { id: number, date: string, text: string, category: string };
  onUpdate: (id: number, newDate: string, newText: string, newCategory: string) => void;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(todo.date);
  const [newText, setNewText] = useState(todo.text);
  
  const [newCategory, setNewCategory] = useState(todo.category);

  const handleUpdate = () => {
    onUpdate(todo.id, newDate, newText, newCategory);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center p-4 m-2 border-b shadow-lg bg-gray-200 rounded-xl">
      {isEditing ? (
        <>
        <input
            className="flex-1 p-2 border"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            className="flex-1 p-2 border"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          
          <select
            className="flex-1 p-2.5 border bg-white  "
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
           <option value="Education" >Education</option>
                  <option value="Work">Work</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                  <option value="Other">Other</option>
          </select>
        </>
      ) : (
        <>
         <span>{todo.date}</span>
          <span>{todo.text}</span>
         
          <span>{todo.category}</span>
        </>
      )}
      <div className="flex space-x-2">
        {isEditing ? (
          <button className="p-2 bg-green-500 text-white" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button className="p-2 bg-yellow-500 text-white" onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        <button className="p-2 bg-red-500 text-white" onClick={() => onDelete(todo.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number, date: string, text: string, category: string }[]>([]);
  const [date, setDate] = useState('');
  const [newTodo, setNewTodo] = useState('');
  
  const [category, setCategory] = useState('');

  const addTodo = () => {
    if (date && newTodo  && category) {
      setTodos([...todos, { id: Date.now(), text: newTodo, date, category }]);
      setDate('');
      setNewTodo('');
     
      setCategory('');
    }
  };

  const updateTodo = (id: number, newDate: string, newText: string, newCategory: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, date: newDate, text: newText, category: newCategory } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="To-Do List allows user to add, edit and update their todo" />
      </Head>

      <div className="p-4">
        <div className="flax mt-1 p-2 ">
        {/* max-w-md mx-auto */}
          <h1 className="max-w-md mx-auto  text-2xl font-bold  mb-4">Todo List</h1>
          <div className="max-w-md mx-auto  ">
            <ul>
              <li>
                <input
                  className="mt-1 block w-full p-2 border border-gray-500 shadow-lg rounded-xl"
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new todo"
                />
              </li>
              <li>
                <input
                  className="mt-1 block w-full p-2 border border-gray-500 shadow-lg rounded-xl"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </li>
              <li>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full p-2 border  border-gray-300  shadow-lg rounded-xl"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Education" >Education</option>
                  <option value="Work">Work</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                  <option value="Other">Other</option>
                </select>
              </li>
              <li  className="mt-1 w-full p-2 border border-gray-300 shadow-lg rounded-xl">
              <button  className="add font-bold"  onClick={addTodo}> <FontAwesomeIcon icon={faPlus} />
                 Add
             
              </button>
              </li>
            </ul>
          </div>
          <div className="mt-4 ">
            {todos.map(todo => (
              <Todo key={todo.id} todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
