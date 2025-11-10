
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse"></div>
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
      <span className="text-sm text-gray-400">AI is thinking...</span>
    </div>
  );
};

export default Spinner;
