import { useMutation } from '@tanstack/react-query';
import { Backend } from '../services/backend';

export const useIdentifyImage = () =>
  useMutation(({ token, file }: { token: string; file: File }) => Backend.identifyImage(token, file));
