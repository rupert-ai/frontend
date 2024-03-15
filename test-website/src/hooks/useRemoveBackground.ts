import { useMutation } from '@tanstack/react-query';
import { Backend } from '../services/backend';

export const useRemoveBackground = () =>
  useMutation(({ token, file }: { token: string; file: File }) => Backend.removeBackground(token, file));
