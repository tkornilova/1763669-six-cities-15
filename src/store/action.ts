import { createAction } from '@reduxjs/toolkit';

import { PlaceCardProps } from '../components/blocks/place-сard/types';
import { AuthorizationStatus } from '../components/consts';

const changeCity = createAction<{currentCity: string}>('changeCity');
const addOffers = createAction<{ offers: PlaceCardProps[] }>('addOffers');
const showActiveCard = createAction<{ activeOfferId: string }>('showActiveCard');
const updateOffers = createAction('updateOffers');

const sortOffersPopular = createAction('sortOffersPopular');
const sortOffersPriceLowToHight = createAction('sortOffersPriceLowToHight');
const sortOffersPriceHightToLow = createAction('sortOffersPriceHightToLow');
const sortOffersRating = createAction('sortOffersRating');

const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export {
  changeCity,
  addOffers,
  showActiveCard,
  updateOffers,
  sortOffersPopular,
  sortOffersPriceLowToHight,
  sortOffersPriceHightToLow,
  sortOffersRating,
  requireAuthorization,
};
