import './ImageCard.scss';
import React from 'react';
import { EmptyStab } from '../EmptyStab/EmptyStab';

type Props = {
  url: string,
  isLoading: boolean,
}

export const ImageCard: React.FC<Props> = ({ url, isLoading }) => {
  return(
    <div className="container imagecard">
      {isLoading? <EmptyStab /> : <img src={url} alt="" className="imagecard__img" />}
    </div>
  )
};
