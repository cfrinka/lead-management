import type { Opportunity } from '../types';
import { BarChart3 } from 'lucide-react';
import Badge from './atoms/Badge';
import EmptyState from './molecules/EmptyState';

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
}

const OpportunitiesTable = ({ opportunities }: OpportunitiesTableProps) => {
  const getStageBadgeVariant = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'prospecting':
        return 'blue';
      case 'qualification':
        return 'yellow';
      case 'proposal':
        return 'purple';
      case 'negotiation':
        return 'orange';
      case 'closed won':
        return 'green';
      case 'closed lost':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (opportunities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <EmptyState
          icon={<BarChart3 className="mx-auto h-12 w-12 text-gray-400" />}
          title="No opportunities"
          description="Convert leads to create your first opportunity."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Account
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Stage
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {opportunities.map((opportunity) => (
                    <tr key={opportunity.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="font-medium text-gray-900">{opportunity.name}</div>
                        <div className="text-gray-500 text-xs">ID: {opportunity.id}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {opportunity.accountName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <Badge variant={getStageBadgeVariant(opportunity.stage) as any}>
                          {opportunity.stage}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                        {formatCurrency(opportunity.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesTable;
