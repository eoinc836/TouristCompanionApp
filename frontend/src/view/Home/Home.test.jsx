import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders images in the image carousel', () => {
  const { getAllByAltText } = render(<Home />);

  const altTextValues = [
    'Slide 1', 'Slide 2', 'Slide 3'
  ];

  altTextValues.forEach((altText) => {
    const images = getAllByAltText(altText);
    expect(images.length).toBeGreaterThan(0);
  });
});
