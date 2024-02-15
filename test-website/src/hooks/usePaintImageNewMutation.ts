import { useMutation } from '@tanstack/react-query';
import { Backend, Options } from '../services/backend';

export const usePaintImageNewMutation = () =>
  useMutation(({ token, file, options }: { token: string; file: File; options: Options & { lora: string } }) =>
    Backend.paintImageNew(token, file, options),
  );
