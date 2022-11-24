import React from 'react'
import { LoginForm } from '../components/LoginForm'
import { Navigate } from 'react-router-dom';

export const Login:React.FC = () => {
  const token = window.localStorage.getItem('token');

  return (
    token ? <Navigate to="/"/> : <LoginForm/>
    )

}
