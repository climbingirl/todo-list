import { useState } from 'react';
import { Todo } from '../types';
import styles from './TodoItem.module.scss';
import EditIcon from '../../../assets/icons/edit.svg?react';
import DoneIcon from '../../../assets/icons/done.svg?react';

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number) => void;
  onUpdateText: (id: number, text: string) => void;
}

export const TodoItem = ({ todo, onToggleCompleted, onUpdateText }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleUpdate = () => {
    if (text.trim()) {
      onUpdateText(todo.id, text.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={styles['edit-content']}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles['edit-input']}
            autoFocus
            data-testid="edit-input"
          />
          <button
            onClick={handleUpdate}
            className={styles['save-btn']}
            data-testid="done-btn"
          >
            <DoneIcon />
          </button>
        </div>
      ) : (
        <div className={styles['item-content']}>
          <div className={styles['checkbox-container']}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleCompleted(todo.id)}
              className={styles.checkbox}
              data-testid="done-checkbox"
            />
            <span className={styles.checkmark}></span>
          </div>
          <span className={`${styles.text} ${todo.completed ? styles.completed : ''}`}>
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className={styles['edit-btn']}
            data-testid="edit-btn"
          >
            <EditIcon />
          </button>
        </div>
      )}
    </li>
  );
};
