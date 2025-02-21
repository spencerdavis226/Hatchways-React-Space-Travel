import '@testing-library/jest-dom'; // enable jest-dom matchers
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import BackButton from '../BackButton';
import { BrowserRouter } from 'react-router-dom';

const mockedNavigate = vi.fn();

// Use an async factory to partially mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('BackButton', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders the BackButton', () => {
    render(
      <BrowserRouter>
        <BackButton fallbackPath="/fallback" />
      </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: /back/i });
    expect(button).toBeInTheDocument();
  });

  test('navigates to fallback path when history length <= 2', () => {
    // Spy on the getter for window.history.length and simulate a small history length
    vi.spyOn(window.history, 'length', 'get').mockReturnValue(1);
    render(
      <BrowserRouter>
        <BackButton fallbackPath="/fallback" />
      </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: /back/i });
    fireEvent.click(button);
    expect(mockedNavigate).toHaveBeenCalledWith('/fallback');
  });

  test('navigates back when history length > 2', () => {
    // Simulate a longer history length
    vi.spyOn(window.history, 'length', 'get').mockReturnValue(3);
    render(
      <BrowserRouter>
        <BackButton fallbackPath="/fallback" />
      </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: /back/i });
    fireEvent.click(button);
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
