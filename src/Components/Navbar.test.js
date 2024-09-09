import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

test('renders Navbar component', () => {
  render(<Navbar />);
});

test('displays the correct heading text', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('Top Courses')).toBeInTheDocument();
  });
  

  test('applies correct styles to navbar and heading', () => {
    const { container } = render(<Navbar />);
    const navbar = container.querySelector('nav');
    const heading = container.querySelector('h1');
  
    // Check navbar styles
    expect(navbar).toHaveClass('bg-bgDark py-4');
    
    // Check heading styles
    expect(heading).toHaveClass('text-center text-3xl font-bold text-white');
  });
  