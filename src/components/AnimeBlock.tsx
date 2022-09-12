import React from 'react';

type TAnimeProps = {
  id?: number;
  image?: string;
  title?: string;
  episodes?: number;
  status?: string;
  synopsis?: string;
};

const AnimeBlock: React.FC<TAnimeProps> = ({ image, title }) => {
  return (
    <div className="main">
      <div className="anime-block">
        <img width={300} height={366} src={image} alt="avatar"></img>
        <div className="title">{title}</div>
      </div>
    </div>
  );
};

export default AnimeBlock;
