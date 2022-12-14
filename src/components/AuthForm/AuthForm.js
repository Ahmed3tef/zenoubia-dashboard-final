import React, { useState } from 'react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  return (
    <section className='auth'>
      <h1>Login</h1>
      <form>
        <div className='control'>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenState, loginUser } from './store/reducers/auth';
import { getUsersAsync } from './store/reducers/users';



  const dispatch = useDispatch();

  const userObject = { name: 'Ahmed', job: 'programmer' };

  const GetToken = () => {
    const token = useSelector(getTokenState);
    console.log(token);
  };

  useEffect(() => {
    const user = { id: 1, name: 'Ahmed' };
    const getUsersPromise = dispatch(getUsersAsync(user));

    return () => {
      getUsersPromise.abort();
    };
  }, [dispatch]);

  return (
    <div>
      App
      <button
        onClick={() => {
          dispatch(loginUser(userObject));
        }}>
        ClickMe
      </button>
      <button onClick={GetToken}>Get token</button>
    </div>
  );

*/
