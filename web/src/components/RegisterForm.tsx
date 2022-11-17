import axios from 'axios';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

interface IUser {
  login: string;
  email: string;
  password: string;
  message: string;
}

export const RegisterForm: React.FC = () => {
  const [user, setUser] = React.useState<IUser>()
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
  const onSubmit: SubmitHandler<IUser> = async user => {
   await axios.post<IUser>('http://localhost:8080/auth/signup', user)
   .then((res) => {
     if (res.status === 200) {
      setUser(user);
      alert(res.data.message)
     }
   })
   .catch((error) => {
     alert(error.response.data.message)
   })
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="login" {...register("login", {required: true, maxLength: 80})} />
      <input type="text" placeholder="email" {...register("email", {required: true, min: 3, maxLength: 100, pattern: /^\S+@\S+$/i})} />
      <input type="password" placeholder="password" {...register("password", {required: true, maxLength: 100})} />
      <input type="submit" />
      </form>
  );
}
