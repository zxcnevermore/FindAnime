import React from 'react'
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate} from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { fetchUser, TParam} from '../redux/slices/loginSlice';



const schema = yup.object({
  login: yup.string().required().min(3).max(30),
  password: yup.string().required(),
}).required();

export const LoginForm:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = React.useRef<HTMLFormElement>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<TParam>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<TParam> = async params => {
       const data = await dispatch(fetchUser(params))
        if (fetchUser.fulfilled.match(data)) {
          window.localStorage.setItem('token', data.payload.accessToken)
          navigate("/")
        }
        if (fetchUser.rejected.match(data)) {
          alert("Неверный логин или пароль");
        }
       form.current?.reset();
    };


  return (
    <div className='form_wrap'>
      <form ref={form} className='register__form' onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Логин" {...register("login")}  />
        <p>{errors.login?.message}</p>
        <input type="password" placeholder="Пароль" {...register("password")} />
        <p>{errors.password?.message}</p>
        <input  className='btn_subbmit'  type="submit" value="Войти" />
      </form>
    </div>
  );
}
