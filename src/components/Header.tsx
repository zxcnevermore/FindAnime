import React from 'react';
import { useSelector } from 'react-redux';
import { animeSelector, fetchAnime, setData } from '../redux/slices/animeSlice';
import { useAppDispatch } from '../redux/store';
import { searchSelector, setTitle, setPageOne, setNoTittle } from '../redux/slices/searchSlice';


const Header: React.FC = () => {
  const { searchValue, pageValue } = useSelector(searchSelector);
  const { totalCount, data } = useSelector(animeSelector);

  const [value, setValue] = React.useState('');

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!data.length) {
      const search = searchValue;
      const page = pageValue;
      dispatch(fetchAnime({ search, page }));
    }
  }, []);

  const onClickSearch = React.useCallback(() => {
    const search = searchValue;
    const page = pageValue;
    dispatch(setData());
    dispatch(fetchAnime({ search, page }));
  }, [searchValue, pageValue]);

  React.useEffect(() => {
    dispatch(setNoTittle(''));
    dispatch(setPageOne(1));
    if (pageValue > 1 && data.length < totalCount) {
      const search = searchValue;
      const page = pageValue;
      dispatch(fetchAnime({ search, page }));
    }
  }, [pageValue]);

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
