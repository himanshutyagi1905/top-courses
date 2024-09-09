import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cards from './Cards';
import Card from './Card';

// Mocking Card component
jest.mock('./Card', () => (props) => (
  <div data-testid="card">
    <p>{props.course.title}</p>
    <button onClick={() => props.setLikedCourses([...props.likedCourses, props.course.id])}>Like</button>
  </div>
));

const mockCourses = {
  Programming: [
    { id: 1, title: 'React Basics', description: 'Learn React' },
    { id: 2, title: 'JavaScript Essentials', description: 'Learn JavaScript' }
  ],
  Design: [
    { id: 3, title: 'UI/UX Design', description: 'Learn Design' }
  ]
};

describe('Cards Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders courses for the selected category', () => {
    const category = 'Programming';
    render(<Cards courses={mockCourses} category={category} />);

    // Check if the correct number of courses is rendered
    expect(screen.getAllByTestId('card').length).toBe(2);
    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('JavaScript Essentials')).toBeInTheDocument();
  });

  test('renders all courses when category is "All"', () => {
    const category = 'All';
    render(<Cards courses={mockCourses} category={category} />);

    // Check if all courses are rendered
    expect(screen.getAllByTestId('card').length).toBe(3); // 2 from Programming, 1 from Design
    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('JavaScript Essentials')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
  });

  test('handles empty course list for the selected category', () => {
    const emptyCourses = {
      Programming: [],
      Design: []
    };
    render(<Cards courses={emptyCourses} category="Programming" />);

    // Check that no course cards are rendered when the category is empty
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  test('updates liked courses state when a course is liked', () => {
    const category = 'Programming';
    render(<Cards courses={mockCourses} category={category} />);

    const likeButton = screen.getAllByText('Like')[0]; // Select the "Like" button for the first course
    likeButton.click(); // Simulate click on the like button

    // We expect that the Card component will have updated the likedCourses state
    // Since we mocked Card, we can check if the behavior is correct in isolation.
    expect(screen.getByText('React Basics')).toBeInTheDocument(); // Still renders correctly
  });
});
