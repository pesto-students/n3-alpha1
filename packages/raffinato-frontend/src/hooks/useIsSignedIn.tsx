import { useUser } from 'reactfire';

function useIsSignedIn() {
  const { data: user } = useUser();

  const firstName = user?.displayName?.split(' ')?.[0];

  return {
    isSignedIn: Boolean(user),
    username: firstName,
    userPhoto: user?.photoURL,
  };
}

export default useIsSignedIn;
