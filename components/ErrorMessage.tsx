interface ErrorMessageProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ErrorMessage = ({ 
  title = "Something went wrong", 
  message, 
  action 
}: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-red-50 border-2 border-red-300 rounded-lg">
      <div className="text-4xl">⚠️</div>
      <h3 className="text-xl font-bold text-red-700">{title}</h3>
      <p className="text-gray-700 text-center max-w-md">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
