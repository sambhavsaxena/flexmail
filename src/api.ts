import axios from 'axios';
import { EmailAccount, EmailMessage } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_API_HOST,
    'Content-Type': 'application/json',
  },
});

export const createEmail = async (): Promise<EmailAccount> => {
  const response = await api.post('/email/new');
  return response.data;
};

export const getMessages = async (email: string): Promise<EmailMessage[]> => {
  const response = await api.get(`/email/${email}/messages`);
  return response.data || [];
};