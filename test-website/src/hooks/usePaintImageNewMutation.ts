import { useMutation } from '@tanstack/react-query';
import { Backend, NewOptionsInput } from '../services/backend';

export const usePaintImageNewMutation = () =>
  useMutation(({ token, file, options }: { token: string; file: File; options: NewOptionsInput }) =>
    Backend.paintImageNew(token, file, options),
  );
