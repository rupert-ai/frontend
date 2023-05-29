import { ArrowRight } from '@carbon/icons-react';
import { Button, SwitcherDivider, PasswordInput, TextInput, Link } from 'carbon-components-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle } from '../services/authentication';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInGoogle = () => {
    signInWithGoogle()
      .then(() => navigate('../'))
      .catch(e => console.log(e));
  };

  const signInAccount = () => {
    if (!email || !password) {
      return;
    }
    signInWithEmail(email, password);
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignSelf: 'center' }}>
        <h1>Log in</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>Don't have an account?</p>
          <Link href="/register">Sign up</Link>
        </div>
        <TextInput labelText="Email" id="login-email" value={email} onChange={e => setEmail(e.target.value)} />
        <PasswordInput
          labelText="Password"
          id="login-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <a>Forgot password?</a>
        <Button renderIcon={ArrowRight} iconDescription="Login" style={{ width: '100%' }} onClick={signInAccount}>
          Login
        </Button>
        <SwitcherDivider style={{ marginInline: 0, width: '100%' }} />
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Button size="sm" kind="tertiary" style={{ width: 'max-content' }} onClick={signInGoogle}>
            Google
          </Button>
          <Button size="sm" kind="tertiary" style={{ width: 'max-content' }}>
            Facebook
          </Button>
        </div>
      </div>
      <img src="./login.png" style={{ marginBlock: '-2rem', marginRight: '-2rem', width: '100%' }} />
    </div>
  );
}
