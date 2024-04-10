import { useRef, FormEvent } from 'react';
import { useAppDispatch } from '../../../store/useAppDispatch';
import { loginAction } from '../../../services/api-actions';


function FormLogin(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return(
    <form
      onSubmit={ handleSubmit }
      className="login__form form"
      action=""
      method="post"
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          ref={ loginRef }
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          ref={ passwordRef }
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          pattern="(?=.*\d)(?=.*[a-zA-Z])"
          title="Password must contain at least one letter and one number."
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default FormLogin;
