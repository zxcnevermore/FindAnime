import React from 'react';
import { useSelector } from 'react-redux';
import { fetchAnime } from '../redux/slices/animeSlice';
import { useAppDispatch } from '../redux/store';
import { searchSelector, setTitle, setCurrentTitle } from '../redux/slices/searchSlice';
import Modal from './Modal';
import { RegisterForm } from './RegisterForm';


const Header: React.FC = () => {
  const { searchValue, limitAnime } = useSelector(searchSelector);
  const [value, setValue] = React.useState('');
  const [modalActvie, setModalActive] = React.useState<boolean>(false)
  const [modalActvie2, setModalActive2] = React.useState<boolean>(false)
  const dispatch = useAppDispatch();

  const onClickSearch = React.useCallback((): void => {
    const search = searchValue;
    const limit = limitAnime;
    dispatch(fetchAnime({ search, limit }));
  }, [searchValue, limitAnime]);

  React.useEffect(() => {
    dispatch(setCurrentTitle(searchValue));
    setValue(searchValue);
    const search = searchValue;
    const limit = limitAnime;
    dispatch(fetchAnime({ search, limit }));


  }, [limitAnime]);



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
      <button onClick={() => setModalActive2(true)} className='btn_register'>Вход</button>
      <button onClick={() => setModalActive(true)} className='btn_register'>Регистрация</button>
      <Modal active={modalActvie} setActive={setModalActive}>
          <RegisterForm/>
      </Modal>
      <Modal active={modalActvie2} setActive={setModalActive2}>
          <p>вход</p>
      </Modal>
      </div>
    </div>

  )




};

export default Header;
