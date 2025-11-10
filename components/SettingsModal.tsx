import React, { useState, useEffect } from 'react';
import type { ApiKeys } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (keys: ApiKeys) => void;
  initialKeys: ApiKeys;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, initialKeys }) => {
  const [keys, setKeys] = useState<ApiKeys>(initialKeys);

  useEffect(() => {
    setKeys(initialKeys);
  }, [initialKeys]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setKeys(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(keys);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">模型 API 密钥配置</h2>
          <p className="text-sm text-gray-400 mt-1">
            密钥将安全地存储在您的浏览器本地。
            <br />
            <strong className="text-yellow-400">注意: 此环境仅执行 Gemini 模型调用。</strong>
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="gemini" className="block text-sm font-medium text-gray-300 mb-1">Gemini API Key</label>
            <input 
                type="password" 
                name="gemini"
                id="gemini"
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-blue-500"
                value={keys.gemini}
                onChange={handleInputChange}
                placeholder="输入您的 Google AI Studio 密钥"
            />
          </div>
           <div>
            <label htmlFor="openai" className="block text-sm font-medium text-gray-300 mb-1">OpenAI API Key</label>
            <input 
                type="password" 
                name="openai"
                id="openai"
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-green-500"
                value={keys.openai}
                onChange={handleInputChange}
                placeholder="输入您的 OpenAI 密钥"
            />
          </div>
           <div>
            <label htmlFor="deepseek" className="block text-sm font-medium text-gray-300 mb-1">DeepSeek API Key</label>
            <input 
                type="password" 
                name="deepseek"
                id="deepseek"
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-purple-500"
                value={keys.deepseek}
                onChange={handleInputChange}
                placeholder="输入您的 DeepSeek 密钥"
            />
          </div>
           <div>
            <label htmlFor="kimi" className="block text-sm font-medium text-gray-300 mb-1">Kimi (Moonshot) API Key</label>
            <input 
                type="password" 
                name="kimi"
                id="kimi"
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-indigo-500"
                value={keys.kimi}
                onChange={handleInputChange}
                placeholder="输入您的 Moonshot AI 密钥"
            />
          </div>
        </div>
        <div className="p-4 bg-gray-800/50 border-t border-gray-700 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                取消
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                保存
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
