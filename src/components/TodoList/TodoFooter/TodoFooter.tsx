import { FilterType } from '../types';
import styles from './TodoFooter.module.scss';

interface TodoFooterProps {
  activeCount: number;
  hasCompletedTodos: boolean;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompletedTodos: () => void;
}

export const TodoFooter = ({
  activeCount,
  hasCompletedTodos,
  currentFilter,
  onFilterChange,
  onClearCompletedTodos,
}: TodoFooterProps) => {
  return (
    <div className={styles.footer}>
      <span className={styles.count}>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className={styles.filters}>
        <button
          className={`${styles['filter-btn']} ${currentFilter === 'all' ? styles.selected : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`${styles['filter-btn']} ${currentFilter === 'active' ? styles.selected : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button
          className={`${styles['filter-btn']} ${currentFilter === 'completed' ? styles.selected : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      {hasCompletedTodos && (
        <button className={styles['clear-btn']} onClick={onClearCompletedTodos}>
          Clear completed
        </button>
      )}
    </div>
  );
};
