import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { PlaceCardsProps } from './types';
import { PlaceCardProps } from '../place-сard/types';
import MemoizedPlaceCard from '../place-сard/place-сard';
import { isMainPage, isOfferPage } from '../../utils';

function PlaceCards({cards}: PlaceCardsProps): JSX.Element {
  const { pathname } = useLocation();

  return (
    <div
      className={classNames([
        'places__list',
        isMainPage(pathname) && 'cities__places-list tabs__content',
        isOfferPage(pathname) && 'near-places__list',
      ])}
    >
      {
        cards.map((card: PlaceCardProps) => (
          <MemoizedPlaceCard { ...card } key={ card.id } />
        ))
      }
    </div>
  );
}

const MemoizedPlaceCards = memo(PlaceCards);

export default MemoizedPlaceCards;
