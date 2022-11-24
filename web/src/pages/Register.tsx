import React from 'react'
import {RegisterForm} from '../components/RegisterForm'
import { Navigate } from 'react-router-dom';


export const Register = () => {
  const token = window.localStorage.getItem('token');
  return (
     token ? <Navigate to="/"/> : <RegisterForm />
  )
}
