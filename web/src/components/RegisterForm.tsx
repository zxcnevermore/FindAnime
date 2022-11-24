import axios from 'axios';
import React from 'react'
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate} from 'react-router-dom';


interface IUser {
  login: string;
  email: string;
  password: string;
  message: string;
}

const schema = yup.object({
  login: yup.string().required().min(5).max(30),
  email: yup.string().required().email().min(5).max(30),
  password: yup.string().required(),
}).required();

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const form = React.useRef<HTMLFormElement>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<IUser> = async user => {
   await axios.post<IUser>('http://localhost:8080/auth/signup', user)
   .then((res) => {
     if (res.status === 200) {
      alert(res.data.message)
      navigate("/")
    }
  })
  .catch((error) => {
    alert(error.response.data.message)
  })
  form.current?.reset();
  };

  return (
    <div className='form_wrap'>
        <form ref={form} className='register__form' onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Логин" {...register("login", {required: true, min: 3, maxLength: 30})}  />
          <p>{errors.login?.message}</p>
          <input type="text" placeholder="Email" {...register("email", {required: true, min: 3, maxLength: 30, pattern: /^\S+@\S+$/i})} />
          <p>{errors.email?.message}</p>
          <input type="password" placeholder="Пароль" {...register("password", {required: true, min: 3, maxLength: 20})} />
          <p>{errors.password?.message}</p>
          <input  className='btn_subbmit'   type="submit" value="Зарегистрироваться" />
        </form>
    </div>
  );
}
