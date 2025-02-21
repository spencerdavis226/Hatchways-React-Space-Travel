import '@testing-library/jest-dom'; // Add this import to enable jest-dom matchers
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import HomePage from '../HomePage';

test('renders HomePage with welcome message', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  const welcomeHeading = screen.getByRole('heading', { name: /welcome/i });
  expect(welcomeHeading).toBeInTheDocument();
});
