import { useState, FormEvent } from 'react';
import styles from './TodoForm.module.scss';

interface TodoFormProps {
  onAddTodo: (text: string) => boolean;
}

export const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onAddTodo(inputValue)) {
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className={styles.input}
      />
    </form>
  );
};
