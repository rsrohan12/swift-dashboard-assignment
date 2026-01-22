
import type { Comment } from '@/types/api';
import { useMemo } from 'react';

interface CommentsTableProps {
  comments: Comment[];
  isLoading: boolean;
}

const CommentsTable = ({ comments, isLoading }: CommentsTableProps) => {
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const tableRows = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, index) => (
        <tr key={`skeleton-${index}`} className="border-b border-border">
          <td className="py-4 px-4">
            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          </td>
          <td className="py-4 px-4">
            <div className="h-4 w-40 bg-muted animate-pulse rounded" />
          </td>
          <td className="py-4 px-4">
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          </td>
          <td className="py-4 px-4">
            <div className="h-4 w-48 bg-muted animate-pulse rounded" />
          </td>
        </tr>
      ));
    }

    if (comments.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="py-12 text-center text-muted-foreground">
            No comments found
          </td>
        </tr>
      );
    }

    return comments.map((comment) => (
      <tr key={comment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
        <td className="py-4 px-4 font-medium text-primary">{comment.postId}</td>
        <td className="py-4 px-4">{truncateText(comment.name, 30)}</td>
        <td className="py-4 px-4 text-muted-foreground">{comment.email}</td>
        <td className="py-4 px-4 text-muted-foreground">{truncateText(comment.body, 45)}</td>
      </tr>
    ));
  }, [comments, isLoading]);

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-primary text-primary-foreground">
          <tr>
            <th className="py-3 px-4 text-left font-semibold">Post ID</th>
            <th className="py-3 px-4 text-left font-semibold">Name</th>
            <th className="py-3 px-4 text-left font-semibold">Email</th>
            <th className="py-3 px-4 text-left font-semibold">Comment</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsTable;
