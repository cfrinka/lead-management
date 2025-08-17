import StatusBadge from './StatusBadge';
import type { Lead } from '../../types';

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

const LeadCard = ({ lead, onClick }: LeadCardProps) => {
  return (
    <div
      onClick={onClick}
      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {lead.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{lead.company}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
            <span>{lead.email}</span>
            <span>Source: {lead.source}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center min-w-[60px]">
            <div className="text-lg font-semibold text-gray-900">{lead.score}</div>
            <div className="text-xs text-gray-500">Score</div>
          </div>
          <div className="min-w-[90px]">
            <StatusBadge status={lead.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
