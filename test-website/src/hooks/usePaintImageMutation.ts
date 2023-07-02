import { useMutation } from '@tanstack/react-query';
import { Backend, Options } from '../services/backend';

export const usePaintImageMutation = () =>
  useMutation(({ token, file, options }: { token: string; file: File; options: Options }) =>
    Backend.paintImage(token, file, options),
  );
