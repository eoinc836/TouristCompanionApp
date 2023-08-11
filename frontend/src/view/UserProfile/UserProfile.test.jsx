import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserPage from './UserProfile';

test('renders Edit button and handles click event', () => {
  render(<UserPage />);

  const editButton = screen.getByRole('button', { name: 'Edit' });
  expect(editButton).toBeInTheDocument();

  fireEvent.click(editButton);

});
