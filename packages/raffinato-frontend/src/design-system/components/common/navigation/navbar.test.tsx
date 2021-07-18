import React from 'react';

import * as useIsSignedIn from 'hooks/useIsSignedIn';
import { render, fireEvent, waitFor } from 'util/test-utils';

import Navbar from './Navbar';

const signInCallback = jest.fn();

describe('Testing Navbar', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
  });

  it('can click on Account Icon -> signed out state (Calls SigninCallback)', async () => {
    const { container } = render(<Navbar signInCallback={signInCallback} />);

    const accountButton = container.querySelector('.rf-account-menu-icon');

    await waitFor(() => fireEvent.click(accountButton!));

    expect(signInCallback).toBeCalledTimes(1);
  });

  it('can click on Account Icon -> signed in state (Opens AccountMenu)', async () => {
    jest.spyOn(useIsSignedIn, 'default').mockImplementation(() => ({
      isSignedIn: true,
      username: 'Bruce',
      userPhoto: null,
    }));

    const { container, getByText } = render(
      <Navbar signInCallback={signInCallback} />
    );

    const accountButton = container.querySelector('.rf-account-menu-icon');

    await waitFor(() => fireEvent.click(accountButton!));

    const userName = getByText(/Hey Bruce/i);

    expect(signInCallback).toBeCalledTimes(0);
    expect(userName).toBeInTheDocument();
  });
});
