import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../components/Signup'

describe('renders login', () => {
  it('asdf', () => {
    const mockOnSubmit = jest.fn();
    render(<Signup onFinish={mockOnSubmit} />);
    const email = screen.getByTestId('email');
    const name = screen.getByTestId('name');
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');
    const button = screen.getByRole('button', { type: 'submit' });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.type(name, 'Leon');
    userEvent.type(email, '123@qqa.com');
    userEvent.type(password, 'abcdef');
    userEvent.type(confirmPassword, 'abcdef');
    userEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
