import { ArrowRight } from '@carbon/icons-react';
import { Button, SwitcherDivider, PasswordInput, TextInput, Link } from 'carbon-components-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWithEmail, signInWithGoogle } from '../services/authentication';

export function SignUpPage() {
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
    createWithEmail(email, password).then(() => navigate('../'));
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignSelf: 'center' }}>
        <h1>Sign up</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>Already have an account?</p>
          <Link href="/login">Log in</Link>
        </div>
        <TextInput
          labelText="Email"
          id="login-email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <PasswordInput
          labelText="Password"
          id="login-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <Button
          size="md"
          renderIcon={ArrowRight}
          iconDescription="Login"
          style={{ width: '100%' }}
          onClick={signInAccount}
        >
          Sign up
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
      <div
        style={{
          backgroundImage: 'url(./login.png)',
          width: '100%',
          backgroundSize: 'cover',
          marginRight: '-2rem',
          marginBlock: '-3rem',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%', gap: '1rem' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>
            Research shows that humans have 52% accuracy at selecting winning creative. This implies that half of your
            marketing budget is being wasted if you don’t pre-test.
          </p>
          <small style={{ alignSelf: 'flex-end', fontWeight: 300 }}>Advertising Research Foundation</small>
        </div>
      </div>
    </div>
  );
}
