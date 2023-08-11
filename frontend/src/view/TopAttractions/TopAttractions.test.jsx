import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import TopAttractions from './TopAttractions';

test('renders TopAttractions page when URL is visited', () => {
  render(
    <MemoryRouter initialEntries={['/top-attractions']}>
      <Route path="/TopAttractions" component={TopAttractions} />
    </MemoryRouter>
  );

  const pageTitle = screen.getByText('Highlights', { exact: false });
  expect(pageTitle).toBeInTheDocument();
});
