import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function LoggedIn() {
  const { logout } = useContext(UserContext);

  return (
    <button onClick={logout}>Log out</button>
  );
}

export default LoggedIn;