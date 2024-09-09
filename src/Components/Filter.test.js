import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './Filter';

const mockFilterData = [
  { id: 1, title: 'All' },
  { id: 2, title: 'Programming' },
  { id: 3, title: 'Design' },
];

test('renders the correct number of filter buttons', () => {
  render(<Filter category="All" setCategory={() => {}} filterData={mockFilterData} />);
  
  expect(screen.getAllByRole('button')).toHaveLength(mockFilterData.length);
});


test('correctly renders button titles', () => {
    render(<Filter category="All" setCategory={() => {}} filterData={mockFilterData} />);
    
    mockFilterData.forEach(data => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
    });
  });
  
  test('applies correct styles to the selected button', () => {
    render(<Filter category="Programming" setCategory={() => {}} filterData={mockFilterData} />);
    
    const selectedButton = screen.getByText('Programming');
    expect(selectedButton).toHaveClass('bg-opacity-60 border-white');
  });

  
  test('applies correct styles to non-selected buttons', () => {
    render(<Filter category="Programming" setCategory={() => {}} filterData={mockFilterData} />);
    
    const nonSelectedButton = screen.getByText('Design');
    expect(nonSelectedButton).toHaveClass('bg-opacity-40 border-transparent');
  });
  

  import { fireEvent } from '@testing-library/react';

  const mockSetCategory = jest.fn();
  
  test('button click updates category', () => {
    render(<Filter category="All" setCategory={mockSetCategory} filterData={mockFilterData} />);
    
    const designButton = screen.getByText('Design');
    fireEvent.click(designButton);
    
    expect(mockSetCategory).toHaveBeenCalledWith('Design');
  });
  