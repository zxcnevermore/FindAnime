import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { searchSelector, setTitle } from '../redux/slices/searchSlice';
import { fetchAnime } from '../redux/slices/animeSlice';
import Modal from './Modal';
import { Link, Navigate } from 'react-router-dom';



const Header: React.FC = () => {

  const token = window.localStorage.getItem('token')

  const { searchValue, limitAnime } = useSelector(searchSelector);

  const [value, setValue] = React.useState('');
  const [modalActvie3, setModalActive3] = React.useState<boolean>(false)
  const dispatch = useAppDispatch();


  const onClickSearch = React.useCallback((): void => {
    const search = searchValue;
    const limit = limitAnime;
    dispatch(fetchAnime({ search, limit }));
  }, [searchValue, limitAnime]);

  const logout = (): void => {
    window.localStorage.removeItem('token')
    setModalActive3(false)
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(setTitle(event.target.value));
  };


  return (
    <div className="header">
      <h1>Search for anime</h1>
      <div className="Search">
        <div className='left'>
          <input
            className="input"
            onChange={onChangeInput}
            value={value}
            placeholder="Write anime title"></input>
          <button onClick={onClickSearch} className="button-search">
            <img width={24} height={24} src="img/search.svg" alt="search"></img>
          </button>
        </div>
          {token ? <button onClick={() => setModalActive3(true)} className='btn_exit'>Выход</button>
          :
          <>
          <Link to='/login'><button className='btn_signin'>Вход</button></Link>
          <Link to='/register'><button className='btn_signup'>Регистрация</button></Link>
          </>}
        <Modal active={modalActvie3} setActive={setModalActive3}>
            <h1>Вы действительно хотите выйти?</h1>
            <button onClick={() => logout()} className='btn_exit'>Да</button>
            <button onClick={() => setModalActive3(false)} className='btn_no'>Нет</button>
        </Modal>
      </div>
    </div>

  )




};

export default Header;
