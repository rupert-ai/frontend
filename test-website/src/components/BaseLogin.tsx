import { ArrowRight, Email } from '@carbon/icons-react';
import { Link, TextInput, PasswordInput, Button } from 'carbon-components-react';
import { useRef, useState } from 'react';
import './BaseLogin.css';

type BaseLoginProps = {
  onGoogleLogin: () => void;
  onEmailLogin: (email: string, password: string) => void;
  mode: 'register' | 'login';
};

export function BaseLogin({ onGoogleLogin, mode, onEmailLogin }: BaseLoginProps) {
  const [pageMode, setPageMode] = useState<'email' | 'home'>('home');
  const userData = useRef({ email: '', password: '' });
  const modeString = mode === 'login' ? 'Log in' : 'Sign up';

  return (
    <div className="rai-base-login-container">
      <div className="rai-base-login-content">
        <h1>{mode === 'login' ? 'Log in' : 'Sign up'}</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          {mode === 'login' ? (
            <>
              <p className="rai-base-login-text">Don't have an account?</p>
              <Link className="rai-base-login-text" href="/register">
                Sign up
              </Link>
            </>
          ) : (
            <>
              <p className="rai-base-login-text">Already have an account?</p>
              <Link href="/login" className="rai-base-login-text">
                Log in
              </Link>
            </>
          )}
        </div>
        {pageMode === 'email' && (
          <>
            <TextInput labelText="Email" id="login-email" onChange={e => (userData.current.email = e.target.value)} />
            <PasswordInput
              labelText="Password"
              id="login-password"
              onChange={e => (userData.current.password = e.target.value)}
            />
            {mode === 'login' && <a>Forgot password?</a>}
            <Button
              renderIcon={ArrowRight}
              iconDescription="Login"
              className="rai-base-login-button"
              onClick={() => onEmailLogin(userData.current.email, userData.current.password)}
              size="md"
            >
              {modeString}
            </Button>
            <Button className="rai-base-login-button" kind="tertiary" onClick={() => setPageMode('home')} size="md">
              Cancel
            </Button>
          </>
        )}
        {pageMode === 'home' && (
          <>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexDirection: 'column' }}>
              <Button
                size="sm"
                kind="tertiary"
                onClick={() => setPageMode('email')}
                className="rai-base-login-button"
                iconDescription="Use email"
                renderIcon={Email}
              >
                {modeString} with Email
              </Button>
              <Button
                size="sm"
                kind="tertiary"
                onClick={onGoogleLogin}
                className="rai-base-login-button"
                iconDescription="Use Google"
                renderIcon={() => (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rai-google-icon"
                  >
                    <g clip-path="url(#clip0_301_3279)">
                      <path
                        d="M23.7459 12.27C23.7459 11.48 23.6759 10.73 23.5559 10H12.2559V14.51H18.7259C18.4359 15.99 17.5859 17.24 16.3259 18.09V21.09H20.1859C22.4459 19 23.7459 15.92 23.7459 12.27Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.52586 14.2901C5.27586 13.5701 5.14586 12.8001 5.14586 12.0001C5.14586 11.2001 5.28586 10.4301 5.52586 9.71012V6.62012H1.54586C0.725858 8.24012 0.255859 10.0601 0.255859 12.0001C0.255859 13.9401 0.725858 15.7601 1.54586 17.3801L5.52586 14.2901Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_301_3279">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              >
                {modeString} with Google
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="rai-base-login-image" style={{ backgroundImage: 'url(./login.png)' }}>
        <div className="rai-base-login-text-container">
          <p className="rai-base-login-long-text">
            Research shows that humans have 52% accuracy at selecting winning creative. This implies that half of your
            marketing budget is being wasted if you don’t pre-test.
          </p>
          <small className="rai-base-login-short-text">Advertising Research Foundation</small>
        </div>
      </div>
    </div>
  );
}
