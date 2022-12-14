import { useRef, useState, useEffect } from 'react';
import './Login.css';
import logoImg from '../assets/zenoubia logo.png';
import passIcon from '../assets/Password.svg';
import userIcon from '../assets/User.svg';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout, setRememberMe } from '../store/reducers/auth';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Fade from '@mui/material/Fade';

const useAuthError = () => {
  const [errMsg, setErrMsg] = useState('');
  const authError = useSelector((state) => state.auth.error);
  useEffect(() => {
    setErrMsg(authError);
  }, [authError]);

  return errMsg;
};

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const rememberMeInputRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const errMsg = useAuthError();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);
  
  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const rememberMe = rememberMeInputRef.current.checked;

    dispatch(setRememberMe(rememberMe));
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="login">
      <section className="login__form">
        <div className="login__logo">
          <img src={logoImg} alt="logo " />
        </div>

        <form onSubmit={submitHandler}>
          <Fade in={errMsg != null} timeout={700}>
            <p className="login-err">{errMsg}</p>
          </Fade>

          <div className="login__control">
            <label htmlFor="email">
              <img src={userIcon} alt="user" />
            </label>
            <input
              type="email"
              id="email"
              placeholder={t('loginEmail')}
              required
              ref={emailInputRef}
              disabled={isLoading}
            />
          </div>
          <div className="mb-5 login__control">
            <label htmlFor="password">
              <img src={passIcon} alt="password logo" />
            </label>
            <input
              type={!showPassword ? 'password' : 'text'}
              id="password"
              placeholder={t('loginPassword')}
              required
              ref={passwordInputRef}
              disabled={isLoading}
            />
            <div
              className="pass-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
          <div className="login__remember">
            <input
              type="checkbox"
              id="remember_me"
              name="remember_me"
              ref={rememberMeInputRef}
            />
            <label htmlFor="remember_me">{t('rememberMe')}</label>
          </div>

          <button
            disabled={isLoading}
            className="login__btn disabled:opacity-30"
          >
            {t('loginBtn')}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
