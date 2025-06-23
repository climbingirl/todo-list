import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../components/TodoList/types';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Date.now(),
          text: text.trim(),
          completed: false,
        },
      ]);
      return true;
    }
    return false;
  }, []);

  const toggleTodoCompleted = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const updateTodoText = useCallback((id: number, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }, []);

  const clearCompletedTodods = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, []);

  return {
    todos,
    addTodo,
    toggleTodoCompleted,
    updateTodoText,
    clearCompletedTodods,
  };
};
