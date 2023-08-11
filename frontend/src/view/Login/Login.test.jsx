import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

test('renders login button and can be clicked', () => {
  render(<Login />);
  
  const loginButton = screen.getByText(/Log in/i);
  expect(loginButton).toBeInTheDocument();

  fireEvent.click(loginButton);

});
