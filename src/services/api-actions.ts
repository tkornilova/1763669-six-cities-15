import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AuthorizationStatus } from '../components/consts';
import { dropToken, saveToken } from '../store/token';
import { AuthData, UserData } from './types';
import { PlaceCardProps } from '../components/blocks/place-сard/types';
import { AppDispatch } from '../store/types';
import { loadOffers, requireAuthorization } from '../store/action';

type ApiThunkConfigObject = {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}

const fetchOffersAction = createAsyncThunk<void, undefined, ApiThunkConfigObject>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<PlaceCardProps[]>(APIRoute.Offers);
    dispatch(loadOffers({ offers: data }));
  }
);

const checkAuthAction = createAsyncThunk<void, undefined, ApiThunkConfigObject>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

const loginAction = createAsyncThunk<void, AuthData, ApiThunkConfigObject>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

const logoutAction = createAsyncThunk<void, undefined, ApiThunkConfigObject>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export { checkAuthAction, fetchOffersAction, loginAction, logoutAction };