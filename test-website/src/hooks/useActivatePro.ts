import { useMutation } from '@tanstack/react-query';
import { Backend } from '../services/backend';

export const useActivatePro = () => useMutation((token: string) => Backend.activatePro(token));
