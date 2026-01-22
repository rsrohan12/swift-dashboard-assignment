import type { Comment } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

export const useComments = () => {
  return useQuery<Comment[]>({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      return response.json();
    },
  });
};
