import { useState } from 'react';
import { FilterType } from './types';
import { useTodos } from '../../hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';
import { TodoFooter } from './TodoFooter';
import styles from './TodoList.module.scss';

export const TodoList = () => {
  const { todos, addTodo, toggleTodoCompleted, clearCompletedTodods, updateTodoText } =
    useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return (
    <div className={styles['todo-list']}>
      <h1 className={styles.title}>todos</h1>

      <TodoForm onAddTodo={addTodo} />

      <ul className={styles.list}>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleCompleted={toggleTodoCompleted}
            onUpdateText={updateTodoText}
          />
        ))}
      </ul>

      {todos.length > 0 && (
        <TodoFooter
          activeCount={activeTodosCount}
          hasCompletedTodos={hasCompletedTodos}
          currentFilter={filter}
          onFilterChange={setFilter}
          onClearCompletedTodos={clearCompletedTodods}
        />
      )}
    </div>
  );
};
