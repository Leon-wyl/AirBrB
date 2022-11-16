import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import MyListingCard from '../pages/my-listings/components/MyListingCard';
import { UserContext } from '../store/UserContext';

const setListings = () => {};

const data = {
  reviews: [],
  id: 1234,
  thumbnail: '',
  published: true,
  title: 'A Title',
  price: 345,
  metadata: {
    propertyType: 'Unit',
    numBed: 1,
    numBathroom: 1,
  },
};

const context = {
  userInfo: {
    email: '',
    token: '',
  }
}

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('renders review modal', () => {
  it('asdf', () => {
    act(() => {
      ReactDOM.render(
        <UserContext.Provider value={context}>
          <MyListingCard data={data} setListings={setListings} />
        </UserContext.Provider>,
        container
      );
    });
    const password = screen.getByRole('span', { name: 'price' });
    expect(password).toBeInTheDocument();
  });
});
