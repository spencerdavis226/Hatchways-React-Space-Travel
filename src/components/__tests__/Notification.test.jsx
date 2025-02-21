import '@testing-library/jest-dom'; // enable jest-dom matchers
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Notification from '../Notification';

test('renders Notification and calls onClose when close button is clicked', () => {
  const handleClose = vi.fn();
  render(
    <Notification message="Error occurred" type="error" onClose={handleClose} />
  );

  // Check if the message is rendered
  const messageElement = screen.getByText(/error occurred/i);
  expect(messageElement).toBeInTheDocument();

  // Find the close button and simulate a click
  const closeButton = screen.getByRole('button', { name: /✖/i });
  fireEvent.click(closeButton);
  expect(handleClose).toHaveBeenCalled();
});
