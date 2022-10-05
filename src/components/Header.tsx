import React from 'react';
import { useSelector } from 'react-redux';
import { fetchAnime } from '../redux/slices/animeSlice';
import { useAppDispatch } from '../redux/store';
import { searchSelector, setTitle, setCurrentTitle } from '../redux/slices/searchSlice';


const Header: React.FC = () => {
  const { searchValue, limitAnime } = useSelector(searchSelector);
  const [value, setValue] = React.useState('');
  const dispatch = useAppDispatch();

  const onClickSearch = React.useCallback(() => {
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
        <input
          className="input"
          onChange={onChangeInput}
          value={value}
          placeholder="Write anime title"></input>
        <button onClick={onClickSearch} className="button-search">
          <img width={24} height={24} src="img/search.svg" alt="search"></img>
        </button>
      </div>
    </div>

  )




};

export default Header;
