import { render, screen } from '@testing-library/react';
import AllListingCard from '../pages/Home/components/AllListingCard';

data = {
  id: 1,
  thumbnail: '',
  reviews: [
    { user: '123@qqa.com', rating: 4.0, comment: 'hello', time: moment() },
		{ user: '123@qqb.com', rating: 3.5, comment: 'my', time: moment() },
		{ user: '123@qqc.com', rating: 4.5, comment: 'name', time: moment() },
  ],
	title: 'A Nice House',
	price: 123,
};

test('renders all listing card', () => {
  render(<AllListingCard data={data} />);
	expect(screen.getByRole('div', { name: /A Nice House/i })).toBeInTheDocument();
});
