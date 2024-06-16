import { useMutation } from '@tanstack/react-query';
import { Button } from 'carbon-components-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../services/authentication';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl: string | undefined = location.state?.redirect;

  const { mutate, isLoading } = useMutation(signInWithGoogle, {
    onSuccess() {
      navigate(`../${redirectUrl ?? ''}`);
    },
  });

  const signInGoogle = () => {
    mutate();
  };

  return (
    <div
      style={{
        backgroundImage: 'url(./background.png)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginBlock: '-2rem',
        position: 'absolute',
        width: '100%',
        left: 0,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--cds-background, #ffffff)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33 38V42.5H36V36.5C36 36.1022 35.842 35.7206 35.5607 35.4393C35.2794 35.158 34.8978 35 34.5 35H27C25.8069 34.9987 24.6631 34.5242 23.8195 33.6805C22.9758 32.8369 22.5013 31.6931 22.5 30.5V27.5C22.5 27.1852 22.4009 26.8783 22.2169 26.6229C22.0328 26.3675 21.773 26.1765 21.4743 26.077L18.7482 25.1684L22.2861 19.2716C22.4261 19.0386 22.5 18.7718 22.5 18.5V14C22.5031 11.2162 23.6103 8.54726 25.5788 6.5788C27.5473 4.61034 30.2162 3.5031 33 3.5H40.5V0.5H33C29.4208 0.50397 25.9893 1.92756 23.4584 4.45844C20.9276 6.98932 19.504 10.4208 19.5 14V18.0844L15.2139 25.2284C15.0984 25.421 15.0275 25.6371 15.0067 25.8607C14.9858 26.0843 15.0154 26.3098 15.0933 26.5205C15.1713 26.7311 15.2955 26.9216 15.4569 27.0778C15.6182 27.234 15.8126 27.352 16.0257 27.423L19.5 28.581V30.5C19.5022 32.4885 20.2931 34.3948 21.6991 35.8009C23.1052 37.2069 25.0115 37.9978 27 38H33ZM12.0002 17C12.0002 17.8284 11.3286 18.5 10.5002 18.5C9.67176 18.5 9.00018 17.8284 9.00018 17C9.00018 16.1716 9.67176 15.5 10.5002 15.5C11.3286 15.5 12.0002 16.1716 12.0002 17ZM6.00018 14C6.82861 14 7.50018 13.3284 7.50018 12.5C7.50018 11.6716 6.82861 11 6.00018 11C5.17176 11 4.50018 11.6716 4.50018 12.5C4.50018 13.3284 5.17176 14 6.00018 14ZM7.50018 21.5C7.50018 22.3284 6.82861 23 6.00018 23C5.17176 23 4.50018 22.3284 4.50018 21.5C4.50018 20.6716 5.17176 20 6.00018 20C6.82861 20 7.50018 20.6716 7.50018 21.5ZM1.50018 9.5C2.32861 9.5 3.00018 8.82843 3.00018 8C3.00018 7.17157 2.32861 6.5 1.50018 6.5C0.671756 6.5 0.000183105 7.17157 0.000183105 8C0.000183105 8.82843 0.671756 9.5 1.50018 9.5ZM3.00018 26C3.00018 26.8284 2.32861 27.5 1.50018 27.5C0.671756 27.5 0.000183105 26.8284 0.000183105 26C0.000183105 25.1716 0.671756 24.5 1.50018 24.5C2.32861 24.5 3.00018 25.1716 3.00018 26ZM1.50018 18.5C2.32861 18.5 3.00018 17.8284 3.00018 17C3.00018 16.1716 2.32861 15.5 1.50018 15.5C0.671756 15.5 0.000183105 16.1716 0.000183105 17C0.000183105 17.8284 0.671756 18.5 1.50018 18.5ZM25.5 15.5H31.5V18.5H25.5V15.5Z"
            fill="#C6C6C6"
          />
        </svg>

        <p>Sign in to create your ads</p>
        <Button
          kind="tertiary"
          onClick={signInGoogle}
          className="rai-base-login-button"
          iconDescription="Use Google"
          disabled={isLoading}
          renderIcon={() => (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', right: '1rem', width: '1rem', height: '1rem', flexShrink: 0 }}
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
          {isLoading ? 'Loading...' : 'Continue with Google'}
        </Button>
      </div>
    </div>
  );
}
