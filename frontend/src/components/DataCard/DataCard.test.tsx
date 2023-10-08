import React from 'react';
import { render, screen } from '@testing-library/react'; 
import DataCard from '.';

test('renders learn react link', () => {
  render(<DataCard id={1} name={'test'} city={'test'} country={'test'} favorite_sport={'test'} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
