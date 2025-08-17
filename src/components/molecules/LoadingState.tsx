import LoadingSpinner from '../atoms/LoadingSpinner';

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => {
  return (
    <div className="p-8 text-center">
      <LoadingSpinner size="md" className="mx-auto" />
      <p className="mt-2 text-gray-500">{message}</p>
    </div>
  );
};

export default LoadingState;
