import React, { useState } from 'react';
import type { DebateConfig } from '../types';
import type { Model } from '../constants';

interface DebateSetupProps {
  onStartDebate: (config: DebateConfig) => void;
  configuredModels: Model[];
  onOpenSettings: () => void;
}

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L8.21 5.15a1.5 1.5 0 00-1.06.36L5.4 4.7a2.5 2.5 0 00-3.54 3.54l.81.81a1.5 1.5 0 00-.36 1.06l-1.98.3c-1.56.38-1.56 2.6 0 2.98l1.98.3a1.5 1.5 0 00.36 1.06l-.81.81a2.5 2.5 0 003.54 3.54l1.75-1.75a1.5 1.5 0 001.06.36l.3 1.98c.38 1.56 2.6 1.56 2.98 0l.3-1.98a1.5 1.5 0 001.06-.36l1.75 1.75a2.5 2.5 0 003.54-3.54l-.81-.81a1.5 1.5 0 00.36-1.06l1.98-.3c1.56-.38 1.56-2.6 0-2.98l-1.98-.3a1.5 1.5 0 00-.36-1.06l.81-.81a2.5 2.5 0 00-3.54-3.54l-1.75 1.75a1.5 1.5 0 00-1.06-.36L11.49 3.17zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);


const DebateSetup: React.FC<DebateSetupProps> = ({ onStartDebate, configuredModels, onOpenSettings }) => {
  const [topic, setTopic] = useState('');
  const [proModel, setProModel] = useState(configuredModels[0]?.id || '');
  const [conModel, setConModel] = useState(configuredModels[0]?.id || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('请输入辩论主题。');
      return;
    }
    if (!proModel || !conModel) {
        setError('请选择正反方模型。您可能需要在设置中配置 API 密钥。');
        return;
    }
    setError('');
    onStartDebate({ topic, proModel, conModel });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 md:p-8 relative">
        
        <button onClick={onOpenSettings} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Settings">
            <SettingsIcon />
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">AI 辩论场</h1>
          <p className="text-gray-400 mt-2">设定议题，观看 AI 的巅峰对决！</p>
           <p className="text-gray-400 mt-4 text-sm max-w-md mx-auto">
            本应用采用结构化辩论流程，分为开篇立论、盘问攻辩、自由辩论和总结陈词四个阶段，旨在模拟真实辩论的深度和策略。
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
              辩论主题
            </label>
            <textarea
              id="topic"
              rows={3}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="例如：人工智能对人类社会的利大于弊"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {configuredModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pro-model" className="block text-sm font-medium text-gray-300 mb-2">
                  正方模型
                </label>
                <select
                  id="pro-model"
                  className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={proModel}
                  onChange={(e) => setProModel(e.target.value)}
                >
                  {configuredModels.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="con-model" className="block text-sm font-medium text-gray-300 mb-2">
                  反方模型
                </label>
                <select
                  id="con-model"
                  className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  value={conModel}
                  onChange={(e) => setConModel(e.target.value)}
                >
                  {configuredModels.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="text-center bg-gray-900/50 p-4 rounded-lg">
                <p className="text-yellow-400">未配置任何模型。</p>
                <p className="text-gray-400 text-sm mt-1">请点击右上角的<span className="font-bold">设置</span>图标添加 API 密钥。</p>
            </div>
          )}
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={configuredModels.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              开始辩论
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DebateSetup;
