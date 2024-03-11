import { useMutation } from '@tanstack/react-query';
import { Backend } from '../services/backend';

export const useBillingPage = () => useMutation((token: string) => Backend.getBilling(token));
