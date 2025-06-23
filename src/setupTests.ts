import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

vi.mock('/src/assets/icons/edit.svg?react', () => import('./__mocks__/svgMock'));
vi.mock('/src/assets/icons/done.svg?react', () => import('./__mocks__/svgMock'));
