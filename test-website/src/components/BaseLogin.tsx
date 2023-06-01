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
              <Button size="sm" kind="tertiary" onClick={onGoogleLogin} className="rai-base-login-button">
                {modeString} with Google
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="rai-base-login-image">
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
