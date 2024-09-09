import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from './Spinner';

test('renders Spinner component', () => {
  render(<Spinner />);
});

test('displays the correct loading text', () => {
    const { getByText } = render(<Spinner />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  
  test('applies correct CSS class to spinner', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  
  test('applies correct CSS classes to text', () => {
    const { container } = render(<Spinner />);
    const text = container.querySelector('p');
    expect(text).toHaveClass('text-lg text-bgDark font-semibold');
  });
  