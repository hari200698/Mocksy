interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className={`${sizeClasses[size]} border-4 border-primary-200 border-t-transparent rounded-full animate-spin`} />
      {message && <p className="text-gray-600 text-center">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
