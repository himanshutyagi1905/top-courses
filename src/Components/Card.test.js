import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { toast } from 'react-toastify';

// Mock toast notifications
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    warning: jest.fn(),
  },
}));

const mockCourse = {
  id: 1,
  title: 'Test Course',
  description: 'This is a test description of the course.',
  image: {
    url: 'https://via.placeholder.com/150'
  }
};

describe('Card Component', () => {
  let likedCourses = [];
  const setLikedCourses = jest.fn();

  beforeEach(() => {
    likedCourses = [];
    jest.clearAllMocks();
    cleanup();  // Ensure components are unmounted between tests
  });

  test('renders course title and description', () => {
    render(<Card course={mockCourse} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />);
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('This is a test description of the course.')).toBeInTheDocument();
  });

  test('shows placeholder like icon if course is not liked', () => {
    render(<Card course={mockCourse} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />);
    
    const likeButton = screen.getByTestId('like-button');
    expect(likeButton).toBeInTheDocument();
    expect(screen.getByTestId('like-placeholder')).toBeInTheDocument(); // Placeholder icon should be shown
  });

  test('shows filled like icon if course is liked', () => {
    likedCourses = [mockCourse.id];
    render(<Card course={mockCourse} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />);
    
    expect(screen.getByTestId('like-icon')).toBeInTheDocument(); // Filled like icon should be shown
  });

  test('toggles like status when clicked', () => {
    const { rerender } = render(<Card course={mockCourse} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />);
    
    const likeButton = screen.getByTestId('like-button');

    // Click to like the course
    fireEvent.click(likeButton);
    expect(setLikedCourses).toHaveBeenCalledWith([mockCourse.id]);
    expect(toast.success).toHaveBeenCalledWith('Liked Successfully');

    // Re-render with course liked
    likedCourses = [mockCourse.id];
    rerender(<Card course={mockCourse} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />);
    
    // Click to unlike the course
    const updatedLikeButton = screen.getByTestId('like-button');
    fireEvent.click(updatedLikeButton);

    // Check if the state updater function was used to remove the course
    expect(setLikedCourses).toHaveBeenCalledWith(expect.any(Function)); // Ensure that the updater function was called

    // Check that the second invocation updates the courses list correctly
    const updateFunction = setLikedCourses.mock.calls[1][0]; // Capture the updater function
    const updatedCourses = updateFunction([mockCourse.id]); // Manually invoke the updater function to simulate its behavior
    expect(updatedCourses).toEqual([]); // Check if it correctly removes the course

    expect(toast.warning).toHaveBeenCalledWith('Liked Removed');
  });
});
