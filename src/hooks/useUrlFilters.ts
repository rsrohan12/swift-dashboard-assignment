import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import type { FilterState, SortDirection, SortField } from '@/types/api';

const PAGE_SIZE_OPTIONS = [10, 50, 100] as const;

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterState = useMemo(() => {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const sortField = (searchParams.get('sortField') as SortField) || null;
    const sortDirection = (searchParams.get('sortDirection') as SortDirection) || null;

    return {
      search,
      page: isNaN(page) || page < 1 ? 1 : page,
      pageSize: PAGE_SIZE_OPTIONS.includes(pageSize as typeof PAGE_SIZE_OPTIONS[number]) 
        ? pageSize 
        : 10,
      sort: {
        field: sortField,
        direction: sortDirection,
      },
    };
  }, [searchParams]);

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setSearchParams((prev:any) => {
      const newParams = new URLSearchParams(prev);

      if (updates.search !== undefined) {
        if (updates.search) {
          newParams.set('search', updates.search);
        } else {
          newParams.delete('search');
        }
        // Reset page when search changes
        newParams.set('page', '1');
      }

      if (updates.page !== undefined) {
        newParams.set('page', String(updates.page));
      }

      if (updates.pageSize !== undefined) {
        newParams.set('pageSize', String(updates.pageSize));
        // Reset page when page size changes
        newParams.set('page', '1');
      }

      if (updates.sort !== undefined) {
        if (updates.sort.field && updates.sort.direction) {
          newParams.set('sortField', updates.sort.field);
          newParams.set('sortDirection', updates.sort.direction);
        } else {
          newParams.delete('sortField');
          newParams.delete('sortDirection');
        }
      }

      return newParams;
    });
  }, [setSearchParams]);

  const setSearch = useCallback((search: string) => {
    updateFilters({ search });
  }, [updateFilters]);

  const setPage = useCallback((page: number) => {
    updateFilters({ page });
  }, [updateFilters]);

  const setPageSize = useCallback((pageSize: number) => {
    updateFilters({ pageSize });
  }, [updateFilters]);

  const toggleSort = useCallback((field: SortField) => {
    const currentSort = filters.sort;
    
    let newDirection: SortDirection;
    
    if (currentSort.field !== field) {
      // New field, start with ascending
      newDirection = 'asc';
    } else if (currentSort.direction === null) {
      newDirection = 'asc';
    } else if (currentSort.direction === 'asc') {
      newDirection = 'desc';
    } else {
      // desc -> null (no sort)
      newDirection = null;
    }

    updateFilters({
      sort: {
        field: newDirection ? field : null,
        direction: newDirection,
      },
    });
  }, [filters.sort, updateFilters]);

  return {
    filters,
    setSearch,
    setPage,
    setPageSize,
    toggleSort,
  };
};
