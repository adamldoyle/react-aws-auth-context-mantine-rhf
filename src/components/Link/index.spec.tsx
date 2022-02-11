import { render, fireEvent, waitFor } from '@testing-library/react';
import { Link } from './';

describe('Link', () => {
  const renderComponent = (onClick = jest.fn()) => {
    return render(<Link onClick={onClick}>Link text</Link>);
  };

  it('renders clickable button', async () => {
    const onClick = jest.fn();
    const rendered = renderComponent(onClick);
    fireEvent.click(rendered.getByRole('button', { name: 'Link text' }));
    expect(onClick).toBeCalledWith();
  });
});
