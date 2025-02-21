import '@testing-library/jest-dom'; // enable jest-dom matchers
import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

// Create a component that throws an error
const ProblemChild = () => {
  throw new Error('Test error');
};

test('ErrorBoundary catches errors and displays fallback UI', () => {
  // Suppress the error logging for this test
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );

  // Check that the fallback UI is displayed
  const fallbackText = screen.getByText(/something went wrong/i);
  expect(fallbackText).toBeInTheDocument();

  consoleErrorSpy.mockRestore();
});
