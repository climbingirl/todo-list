import { TodoList } from './components/TodoList';
import styles from './app.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <TodoList />
    </div>
  );
};
