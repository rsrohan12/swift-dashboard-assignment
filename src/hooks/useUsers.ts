import type { User } from '@/types/api';
import { useQuery } from '@tanstack/react-query';


const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
  });
};

export const useFirstUser = () => {
  const query = useUsers();
  return {
    ...query,
    data: query.data?.[0] ?? null,
  };
};
