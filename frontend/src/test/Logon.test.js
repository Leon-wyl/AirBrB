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

describe('logon test', () => {
  it('should logon sucessfully with the minimal length of the input', () => {
    const mockOnSubmit = jest.fn();
    const expectedValues = {
      email: 'f@f.ff',
      password: 'ffffff',
    }
    render(<Logon onFinish={mockOnSubmit}/>);
    const email = screen.getByRole('textbox', { name: '' });
    const password = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button', { type: 'submit' });
    // email password and button should visually appear on the screen
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.type(email, expectedValues.email);
    userEvent.type(password, expectedValues.password);
    userEvent.click(button);
    // A onFinish function should be trigger
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should logon sucessfully with the normal length of the input', () => {
    const mockOnSubmit = jest.fn();
    const expectedValues = {
      email: '123456@gmail.com',
      password: 'asdfkrigfhjeD',
    }
    render(<Logon onFinish={mockOnSubmit}/>);
    const email = screen.getByRole('textbox', { name: '' });
    const password = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button', { type: 'submit' });
    // email password and button should visually appear on the screen
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.type(email, expectedValues.email);
    userEvent.type(password, expectedValues.password);
    userEvent.click(button);
    // A onFinish function should be trigger
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should logon sucessfully with the super long length of the input', () => {
    const mockOnSubmit = jest.fn();
    const expectedValues = {
      email: 'asdfasdffjuerijaslskfjaskldfjalsdfkjaklsdfjalsdkfjalsdkfjla;sdfjal;sdfjasl;dfkjalsdfjsldfjalsdkfsdfasdfasdfasdfasfdfdhjfwekajhfgksdfaklsdjflasdjf@asdfasdfhawefhakwejfhlkasfjsadklajsdflksdjflksjdflkjsfal;jasdflasdjfl;rhtghkjdfhgkldjsfghsdkfghkl;jsaghkldrgjhasdkl;fghjasdlkfasdfkl;jasdlkjaslkf.com',
      password: 'asdfdijgdsdsnlaklsdfsdlsdfsdfklsdfjklsdfa',
    }
    render(<Logon onFinish={mockOnSubmit}/>);
    const email = screen.getByRole('textbox', { name: '' });
    const password = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button', { type: 'submit' });
    // email password and button should visually appear on the screen
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.type(email, expectedValues.email);
    userEvent.type(password, expectedValues.password);
    userEvent.click(button);
    // A onFinish function should be trigger
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
