import React from 'react';
import { animeSelector } from '../redux/slices/animeSlice';
import { useAppDispatch } from '../redux/store';
import { setLimit } from '../redux/slices/searchSlice';
import { useSelector } from 'react-redux';

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalItems, anime } = useSelector(animeSelector);

  const onClickLoad = () => {
    if (anime.length < totalItems) {
      dispatch(setLimit());
    }
  };
  return (
    <div className="footer-block">
      <div className="load-more">
        <button onClick={onClickLoad} className="button">
          Load more
        </button>
      </div>
    </div>
  );
};

export default Footer;
