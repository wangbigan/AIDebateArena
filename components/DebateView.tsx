import React, { useRef, useEffect } from 'react';
import type { DebateConfig, Message as MessageType } from '../types';
import Message from './Message';
import Spinner from './Spinner';

interface DebateViewProps {
  config: DebateConfig;
  messages: MessageType[];
  isLoading: boolean;
  isDebateFinished: boolean;
  onReset: () => void;
  currentPhase: string;
}

const DebateView: React.FC<DebateViewProps> = ({ config, messages, isLoading, isDebateFinished, onReset, currentPhase }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const downloadTranscript = () => {
    let markdownContent = `# 辩论主题: ${config.topic}\n\n`;
    markdownContent += `**正方模型:** ${config.proModel}\n`;
    markdownContent += `**反方模型:** ${config.conModel}\n\n`;
    markdownContent += '---\n\n';

    messages.forEach(msg => {
        const sideLabel = msg.side === 'Pro' ? '正方' : '反方';
        markdownContent += `### **${sideLabel} (${msg.model})** - ${msg.turnTypeLabel}\n\n`;
        markdownContent += `> ${msg.text.replace(/\n/g, '\n> ')}\n\n`;
        markdownContent += '---\n\n';
    });

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = `辩论-${config.topic.substring(0, 20).replace(/[^a-z0-9_-\u4E00-\u9FA5]/gi, '_')}.md`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg flex flex-col h-[85vh]">
        <div className="p-4 border-b border-gray-700 text-center">
            <h2 className="text-sm font-semibold uppercase text-blue-400">辩论主题</h2>
            <h1 className="text-lg md:text-xl font-bold text-gray-100 mb-2">{config.topic}</h1>
            {currentPhase && (
                 <div className="bg-gray-700/50 text-indigo-300 text-xs font-bold uppercase rounded-full px-3 py-1 inline-block">
                    {currentPhase}
                </div>
            )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-700 h-20 flex items-center justify-center">
          {isLoading && <Spinner />}
          {isDebateFinished && !isLoading && (
             <div className="text-center">
                <p className="text-green-400 font-semibold mb-2">辩论结束</p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={onReset}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    开始一场新辩论
                  </button>
                   <button 
                    onClick={downloadTranscript}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    下载辩论记录
                  </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebateView;
