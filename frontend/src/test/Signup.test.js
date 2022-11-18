import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../pages/User/Signup'

describe('Signup test', () => {
  it('should sign up sucessfully with the minimal length of the input', () => {
    const mockOnSubmit = jest.fn();
    const mockOnLoginLink = jest.fn();
    const expectInput = {
      email: 'g@g.gg',
      name: 'e',
      password: 'qqqqqq',
      confirmPassword: 'qqqqqq',
    }
    render(<Signup onFinish={mockOnSubmit} onLoginLink={mockOnLoginLink} />);
    const email = screen.getByTestId('email');
    const name = screen.getByTestId('name');
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');
    const loginLink = screen.getByTestId('loginLink');
    const button = screen.getByRole('button', { type: 'submit' });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.type(name, expectInput.name);
    userEvent.type(email, expectInput.email);
    userEvent.type(password, expectInput.password);
    userEvent.type(confirmPassword, expectInput.confirmPassword);
    userEvent.click(loginLink);
    expect(mockOnLoginLink).toHaveBeenCalledTimes(1);
    userEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should sign up sucessfully with the normal length of the input', () => {
    const mockOnSubmit = jest.fn();
    const mockOnLoginLink = jest.fn();
    const expectInput = {
      email: 'yilangwu@abc.com',
      name: 'Leon Wu',
      password: 'qwertyuiopAs!6asdfG',
      confirmPassword: 'qwertyuiopAs!6asdfG',
    }
    render(<Signup onFinish={mockOnSubmit} onLoginLink={mockOnLoginLink} />);
    const email = screen.getByTestId('email');
    const name = screen.getByTestId('name');
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');
    const loginLink = screen.getByTestId('loginLink');
    const button = screen.getByRole('button', { type: 'submit' });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.type(name, expectInput.name);
    userEvent.type(email, expectInput.email);
    userEvent.type(password, expectInput.password);
    userEvent.type(confirmPassword, expectInput.confirmPassword);
    userEvent.click(loginLink);
    expect(mockOnLoginLink).toHaveBeenCalledTimes(1);
    userEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should sign up sucessfully with the super long length of the input', () => {
    const mockOnSubmit = jest.fn();
    const mockOnLoginLink = jest.fn();
    const expectInput = {
      email: 'lfajsdklfhjskdjfhasklfhasdjkhftgashjfaskdfjyaksdfasdgkfasdkalglaasdfgasdjfsdljkasdfjghajsdfklsdjkfsfhaklsf@sdjkhfaklfalalsflaskahflasdgkljasdgasdkxcbzxczxxczxcvzxczsasfafglsadf.com',
      name: 'ahsdfkhjasdklfkaflaslaksfjzmxbmxcbmuehuiqwerowesajkdfhjkashlfhsklfhsdjkfhasdklfhsdDDDDlfhsdfjklasashdksfhajksdfhjksdfhjkasdf',
      password: 'alksjfadsdfjsladkfhasdlhjklsdfaksdfaskdfhksdfhsfadkfhlsdkf',
      confirmPassword: 'alksjfadsdfjsladkfhasdlhjklsdfaksdfaskdfhksdfhsfadkfhlsdkf',
    }
    render(<Signup onFinish={mockOnSubmit} onLoginLink={mockOnLoginLink} />);
    const email = screen.getByTestId('email');
    const name = screen.getByTestId('name');
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');
    const loginLink = screen.getByTestId('loginLink');
    const button = screen.getByRole('button', { type: 'submit' });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.type(name, expectInput.name);
    userEvent.type(email, expectInput.email);
    userEvent.type(password, expectInput.password);
    userEvent.type(confirmPassword, expectInput.confirmPassword);
    userEvent.click(loginLink);
    expect(mockOnLoginLink).toHaveBeenCalledTimes(1);
    userEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
