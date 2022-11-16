import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Logon from '../components/Logon'

// const setListings = () => {};

// const data = {
//   reviews: [],
//   id: 1234,
//   thumbnail: "",
//   published: true,
//   title: "A Title",
//   price: 345,
//   metadata: {
//     propertyType: "Unit",
//     numBed: 1,
//     numBathroom: 1,
//   }
// }

describe('renders logon', () => {
  it('asdf', () => {
    const mockOnSubmit = jest.fn();
    const expectedValues = {
      email: '123@qqa.com',
      password: 'abcdef',
    }
    render(<Logon onFinish={mockOnSubmit}/>);
    const email = screen.getByRole('textbox', { name: '' });
    const password = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button', { type: 'submit' });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.type(email, expectedValues.email);
    userEvent.type(password, expectedValues.password);
    userEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
