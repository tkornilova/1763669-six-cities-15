import { useAppSelector } from '../../store/useAppDispatch';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch } from '../../store/useAppDispatch';
import { logoutAction } from '../../services/api-actions';

import PlaceCards from '../../components/blocks/place-cards/place-cards';
import Map from '../../components/blocks/map/map';
import { CITIES, AppRoute } from '../../components/consts';
import LocationList from '../../components/blocks/location-list/location-list';
import Sorting from '../../components/blocks/sorting/sorting';
import { AuthorizationStatus } from '../../components/consts';

function Main(): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const currentOffers = useAppSelector((state) => state.currentOffers);
  const activeOfferId = useAppSelector((state) => state.activeOfferId);
  const cityIndex = CITIES.findIndex((city) => currentCity === city.id);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus) as AuthorizationStatus;

  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Favorites }>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>}
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={ AuthorizationStatus.Auth ? AppRoute.Favorites : AppRoute.Main }
                    onClick={ (evt) => {
                      if (AuthorizationStatus.Auth) {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }
                    } }
                  >
                    {authorizationStatus === AuthorizationStatus.Auth ?
                      <span className="header__signout">Sign out</span> :
                      <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Login }>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__login">Sign in</span>
                      </Link>}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main
        className={classNames([
          'page__main',
          'page__main--index',
          currentOffers.length === 0 ? 'page__main--index-empty' : '',
        ])}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList cities={ CITIES } />
          </section>
        </div>
        <div className="cities">
          {currentOffers.length === 0 ?
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div> :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{ currentOffers.length } places to stay in { currentCity }</b>
                <Sorting />
                <PlaceCards cards={ currentOffers } />
              </section>
              <div className="cities__right-section">
                <Map city={ CITIES[cityIndex] } points={ currentOffers } activeOfferId={ activeOfferId }/>
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}

export default Main;
