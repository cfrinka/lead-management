import { useMemo } from 'react';
import type { Lead, FilterState, PaginationState } from '../types';
import FilterControls from './molecules/FilterControls';
import LeadCard from './molecules/LeadCard';
import LoadingState from './molecules/LoadingState';
import EmptyState from './molecules/EmptyState';
import Pagination from './atoms/Pagination';

interface LeadsListProps {
  leads: Lead[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  onLeadSelect: (lead: Lead) => void;
  isLoading: boolean;
  error: string | null;
}

const LeadsList = ({ 
  leads, 
  filters, 
  onFiltersChange, 
  pagination,
  onPaginationChange,
  onLeadSelect, 
  isLoading, 
  error 
}: LeadsListProps) => {
  const { filteredAndSortedLeads, paginatedLeads, totalPages } = useMemo(() => {
    let filtered = leads;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchLower) ||
        lead.company.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortField) {
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return filters.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    const totalPages = Math.ceil(filtered.length / pagination.itemsPerPage);
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    const paginatedLeads = filtered.slice(startIndex, endIndex);

    return {
      filteredAndSortedLeads: filtered,
      paginatedLeads,
      totalPages
    };
  }, [leads, filters, pagination]);

  const handleFiltersChange = (newFilters: FilterState) => {
    onFiltersChange(newFilters);
    if (pagination.currentPage !== 1) {
      onPaginationChange({ ...pagination, currentPage: 1 });
    }
  };


  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-red-800">
            <h3 className="text-sm font-medium">Error loading leads</h3>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (filteredAndSortedLeads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <FilterControls filters={filters} onFiltersChange={handleFiltersChange} />
        </div>
        <EmptyState
          title="No leads found"
          description="Try adjusting your search or filter criteria."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <FilterControls filters={filters} onFiltersChange={handleFiltersChange} />
      </div>

      <div className="divide-y divide-gray-200">
        {isLoading ? (
          <LoadingState message="Loading leads..." />
        ) : (
          paginatedLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => onLeadSelect(lead)}
            />
          ))
        )}
      </div>

      {!isLoading && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={totalPages}
          onPageChange={(page) => onPaginationChange({ ...pagination, currentPage: page })}
          totalItems={filteredAndSortedLeads.length}
          itemsPerPage={pagination.itemsPerPage}
          onItemsPerPageChange={(itemsPerPage) => onPaginationChange({ currentPage: 1, itemsPerPage })}
        />
      )}
    </div>
  );
};

export default LeadsList;
