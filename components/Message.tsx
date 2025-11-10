import React from 'react';
import type { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const ProIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const ConIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Message: React.FC<MessageProps> = ({ message }) => {
  const isPro = message.side === 'Pro';
  
  const bubbleClasses = isPro 
    ? 'bg-pro-light border-pro' 
    : 'bg-con-light border-con';
  
  const containerClasses = isPro ? 'items-start' : 'items-end';
  const innerContainerClasses = isPro ? 'flex-row' : 'flex-row-reverse';

  return (
    <div className={`flex flex-col w-full max-w-2xl mx-auto my-2 ${containerClasses}`}>
        <div className={`flex ${innerContainerClasses} items-start gap-3`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isPro ? 'bg-blue-900' : 'bg-red-900'}`}>
                {isPro ? <ProIcon /> : <ConIcon />}
            </div>
            <div className={`relative px-4 py-3 rounded-lg border ${bubbleClasses} max-w-md`}>
                <div className="flex justify-between items-baseline mb-1">
                    <p className="text-sm font-bold text-gray-300">{message.side === 'Pro' ? '正方' : '反方'} ({message.model})</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{message.turnTypeLabel}</p>
                </div>
                <p className="text-gray-200 whitespace-pre-wrap">{message.text}</p>
            </div>
        </div>
    </div>
  );
};

export default Message;
