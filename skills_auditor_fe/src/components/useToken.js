import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');

    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const getUser = () => {
    const userString = localStorage.getItem('user');
    const userObject = JSON.parse(userString);
    return userObject;
  }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const saveUser = (userObject) => {
    localStorage.setItem('user', JSON.stringify(userObject));
    setUser(userObject);
  };

  return {
    setToken: saveToken,
    setUser: saveUser,
    token,
    user
  }
}