import React from 'react';
import { render, screen } from '@testing-library/react';
import {App_container} from './App';

test('renders learn react link', () => {
  render(<App_container />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
