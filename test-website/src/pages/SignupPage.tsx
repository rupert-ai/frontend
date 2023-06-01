import { ArrowRight } from '@carbon/icons-react';
import { useMutation } from '@tanstack/react-query';
import { Button, SwitcherDivider, PasswordInput, TextInput, Link } from 'carbon-components-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseLogin } from '../components/BaseLogin';
import { createWithEmail, signInWithGoogle } from '../services/authentication';

export function SignUpPage() {
  const navigate = useNavigate();

  const useSignInWithGoogle = useMutation(signInWithGoogle, {
    onSuccess() {
      navigate('../');
    },
  });

  const useSignInWithEmail = useMutation(createWithEmail, {
    onSuccess() {
      navigate('../');
    },
  });

  const signInGoogle = () => {
    useSignInWithGoogle.mutate();
  };

  const signInAccount = (email: string, password: string) => {
    if (!email || !password) {
      return;
    }
    useSignInWithEmail.mutate({ email, password });
  };

  return <BaseLogin onEmailLogin={signInAccount} onGoogleLogin={signInGoogle} mode="register" />;
}
