import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { TodoList } from './TodoList';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('TodoList Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('renders TodoList with empty state', () => {
    render(<TodoList />);

    expect(screen.getByText('todos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.queryByText('items left')).not.toBeInTheDocument();
  });

  test('loads todos from localStorage', () => {
    const todos = [{ id: 1, text: 'Saved Todo', completed: false }];
    localStorageMock.setItem('todos', JSON.stringify(todos));

    render(<TodoList />);

    expect(screen.getByText('Saved Todo')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  test('edits todo text', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Initial Todo' } });
    fireEvent.submit(input);
    expect(screen.getByText('Initial Todo')).toBeInTheDocument();

    const editButton = screen.getByTestId('edit-btn');
    fireEvent.click(editButton);

    const editInput = screen.getByTestId('edit-input');
    fireEvent.change(editInput, { target: { value: 'Updated Todo' } });

    const saveButton = screen.getByTestId('done-btn');
    fireEvent.click(saveButton);

    expect(screen.getByText('Updated Todo')).toBeInTheDocument();
    expect(screen.queryByText('Initial Todo')).not.toBeInTheDocument();
  });

  test('marks todo as completed', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input);

    const checkbox = screen.getByTestId('done-checkbox');
    fireEvent.click(checkbox);
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });

  test('filters todos', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Test Todo 1' } });
    fireEvent.submit(input);
    fireEvent.change(input, { target: { value: 'Test Todo 2' } });
    fireEvent.submit(input);

    const checkboxes = screen.getAllByTestId('done-checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(screen.getByText('Active'));
    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo 2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  test('clears completed todos', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Test Todo 1' } });
    fireEvent.submit(input);
    fireEvent.change(input, { target: { value: 'Test Todo 2' } });
    fireEvent.submit(input);

    const checkboxes = screen.getAllByTestId('done-checkbox');
    fireEvent.click(checkboxes[0]);

    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);
    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });
});
