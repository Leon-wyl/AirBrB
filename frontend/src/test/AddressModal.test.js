import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddressForm from '../pages/ManageBookings/components/AddressForm';

describe('AddressForm', () => {
  it('should change address successfully', () => {
    const mockOnOK = jest.fn();
    const mockOnCancel = jest.fn();
    const expectInput = {
      addressLine: '233 Beasley St',
      city: 'Canberra',
      state: 'ACT',
      country: 'Australia',
    };
    render(
      <AddressForm onOK={mockOnOK} onCancel={mockOnCancel} isOpen={true} />
    );
    const addressLine = screen.getByTestId('addressLine');
    const city = screen.getByTestId('city');
    const state = screen.getByTestId('state');
    const country = screen.getByTestId('country');
    const cancelBtn = screen.getByTestId('cancelBtn');
    const OKBtn = screen.getByTestId('submitBtn');
    expect(addressLine).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(state).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    expect(OKBtn).toBeInTheDocument();
    userEvent.type(addressLine, expectInput.addressLine);
    userEvent.type(city, expectInput.city);
    userEvent.type(state, expectInput.state);
    userEvent.type(country, expectInput.country);
    userEvent.click(cancelBtn);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    userEvent.click(OKBtn);
    expect(mockOnOK).toHaveBeenCalledTimes(1);
  });
});
