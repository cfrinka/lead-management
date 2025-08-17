import Badge, { type BadgeVariant } from '../atoms/Badge';
import type { Lead } from '../../types';

interface StatusBadgeProps {
  status: Lead['status'];
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const getStatusVariant = (status: Lead['status']): BadgeVariant => {
    switch (status) {
      case 'new':
        return 'blue';
      case 'contacted':
        return 'yellow';
      case 'qualified':
        return 'green';
      case 'unqualified':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Badge variant={getStatusVariant(status)} size={size}>
      {formatStatus(status)}
    </Badge>
  );
};

export default StatusBadge;
