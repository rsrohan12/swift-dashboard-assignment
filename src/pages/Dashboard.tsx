import { useMemo } from 'react';
import Header from '@/components/Header';
import SortButton from '@/components/SortButton';
import SearchInput from '@/components/SearchInput';
import CommentsTable from '@/components/CommentsTable';
import CustomPagination from '@/components/CustomPagination';
import { useComments } from '@/hooks/useComments';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import type { Comment } from '@/types/api';

const Dashboard = () => {
  const { data: comments = [], isLoading } = useComments();
  const { filters, setSearch, setPage, setPageSize, toggleSort } = useUrlFilters();

  // Filter, sort, and paginate comments
  const processedData = useMemo(() => {
    let filtered = [...comments];

    // Apply search filter (partial match on name, email)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (comment) =>
          comment.name.toLowerCase().includes(searchLower) ||
          comment.email.toLowerCase().includes(searchLower) ||
          comment.body.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (filters.sort.field && filters.sort.direction) {
      filtered.sort((a, b) => {
        const field = filters.sort.field as keyof Comment;
        const aValue = a[field];
        const bValue = b[field];

        let comparison = 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        }

        return filters.sort.direction === 'desc' ? -comparison : comparison;
      });
    }

    return filtered;
  }, [comments, filters.search, filters.sort.field, filters.sort.direction]);

  // Paginate
  const paginatedData = useMemo(() => {
    const start = (filters.page - 1) * filters.pageSize;
    const end = start + filters.pageSize;
    return processedData.slice(start, end);
  }, [processedData, filters.page, filters.pageSize]);

  // Reset page if it exceeds total pages after filtering
  const totalPages = Math.ceil(processedData.length / filters.pageSize);
  if (filters.page > totalPages && totalPages > 0) {
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Sort Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <SortButton
              field="postId"
              label="Post Id"
              currentField={filters.sort.field}
              currentDirection={filters.sort.direction}
              onToggle={toggleSort}
            />
            <SortButton
              field="name"
              label="Name"
              currentField={filters.sort.field}
              currentDirection={filters.sort.direction}
              onToggle={toggleSort}
            />
            <SortButton
              field="email"
              label="Email"
              currentField={filters.sort.field}
              currentDirection={filters.sort.direction}
              onToggle={toggleSort}
            />
          </div>

          {/* Search */}
          <SearchInput
            value={filters.search}
            onChange={setSearch}
            placeholder="Search name, email, comment..."
          />
        </div>

        {/* Table */}
        <CommentsTable comments={paginatedData} isLoading={isLoading} />

        {/* Pagination */}
        <CustomPagination
          currentPage={filters.page}
          totalItems={processedData.length}
          pageSize={filters.pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </main>
    </div>
  );
};

export default Dashboard;
