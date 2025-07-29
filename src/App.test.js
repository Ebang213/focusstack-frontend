import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders focusstack footer', () => {
  render(<App />);
  const footerText = screen.getByText(/focusstack is curated by/i);
  expect(footerText).toBeInTheDocument();
});

