import React, { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

function LoggedOut() {
  const { login } = useContext(UserContext);

  const onClickLogin = async (e) => {
    const response = await fetch('/api/profile');
    const user = await response.json();
    login(user);
  };

  return (
    <button onClick={onClickLogin}>Log in</button>
  );
}

export default LoggedOut;