import type { FilterState } from '../../types';
import { Search, SortAsc } from 'lucide-react';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Button from '../atoms/Button';

interface FilterControlsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterControls = ({ filters, onFiltersChange }: FilterControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search by name or company..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          value={filters.status}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="unqualified">Unqualified</option>
        </Select>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <Select
          value={filters.sortField}
          onChange={(e) => onFiltersChange({ ...filters, sortField: e.target.value as any })}
          className="flex-1"
        >
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="company">Company</option>
        </Select>
        <Button
          variant="ghost"
          size="md"
          onClick={() => onFiltersChange({ 
            ...filters, 
            sortDirection: filters.sortDirection === 'asc' ? 'desc' : 'asc' 
          })}
          className="h-10 px-3"
        >
          <SortAsc className={`h-4 w-4 ${filters.sortDirection === 'desc' ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;
