import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { DebateConfig, Message, ApiKeys, Provider } from './types';
import { MAX_TURNS, DEBATE_STRUCTURE, DEBATE_PHASES, ALL_AI_MODELS } from './constants';
import { getNextArgument } from './services/geminiService';
import DebateSetup from './components/DebateSetup';
import DebateView from './components/DebateView';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [debateConfig, setDebateConfig] = useState<DebateConfig | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [turnCount, setTurnCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    gemini: '', openai: '', deepseek: '', kimi: ''
  });

  // Load API keys from localStorage on initial render
  useEffect(() => {
    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys));
    }
  }, []);

  const handleSaveKeys = (newKeys: ApiKeys) => {
    setApiKeys(newKeys);
    localStorage.setItem('apiKeys', JSON.stringify(newKeys));
    setIsSettingsOpen(false);
  };

  const configuredModels = useMemo(() => {
    const providersWithKeys = Object.keys(apiKeys).filter(k => apiKeys[k as Provider].trim() !== '') as Provider[];
    return ALL_AI_MODELS.filter(model => providersWithKeys.includes(model.provider));
  }, [apiKeys]);


  const isDebating = debateConfig !== null && turnCount < MAX_TURNS;

  const handleStartDebate = (config: DebateConfig) => {
    setDebateConfig(config);
    setMessages([]);
    setTurnCount(0);
    setError(null);
  };

  const handleReset = () => {
    setDebateConfig(null);
    setMessages([]);
    setTurnCount(0);
    setError(null);
  }

  const runDebateTurn = useCallback(async () => {
    if (!debateConfig) return;

    setIsLoading(true);
    setError(null);
    
    const currentTurnInfo = DEBATE_STRUCTURE[turnCount];
    const { side, phase, type, label } = currentTurnInfo;
    
    const transcript = messages.map(m => `${m.side === 'Pro' ? '正方' : '反方'} (${m.turnTypeLabel}): ${m.text}`).join('\n\n');
    const currentModel = side === 'Pro' ? debateConfig.proModel : debateConfig.conModel;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const argument = await getNextArgument({
        topic: debateConfig.topic,
        debateTranscript: transcript,
        side,
        model: currentModel,
        phase,
        turnType: type
      });
      
      const newMessage: Message = {
        side,
        text: argument,
        model: currentModel,
        phase,
        turnTypeLabel: label,
      };

      setMessages(prev => [...prev, newMessage]);
      setTurnCount(prev => prev + 1);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '发生未知错误。';
      setError(errorMessage);
      console.error(err);
      // Stop the debate on error
      if (debateConfig) {
        setDebateConfig(prev => ({ ...prev! })); // A trick to stop without resetting
        setTurnCount(MAX_TURNS);
      }
    } finally {
      setIsLoading(false);
    }
  }, [turnCount, debateConfig, messages]);

  useEffect(() => {
    if (isDebating && !isLoading) {
      runDebateTurn();
    }
  }, [turnCount, isDebating, isLoading, runDebateTurn]);

  const currentPhase = debateConfig 
    ? turnCount >= MAX_TURNS 
      ? '辩论结束' 
      : DEBATE_PHASES[DEBATE_STRUCTURE[turnCount].phase]
    : '';

  return (
    <div className="bg-gray-900 min-h-screen font-sans bg-gradient-to-br from-gray-900 to-indigo-900/50">
      <main>
        {!debateConfig ? (
          <DebateSetup 
            onStartDebate={handleStartDebate} 
            configuredModels={configuredModels}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        ) : (
          <>
            <DebateView
              config={debateConfig}
              messages={messages}
              isLoading={isLoading}
              isDebateFinished={turnCount >= MAX_TURNS && !isLoading}
              onReset={handleReset}
              currentPhase={currentPhase}
            />
          </>
        )}
        {error && !isLoading && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-800 border border-red-600 text-white p-4 rounded-lg shadow-xl max-w-md w-full text-center">
              <p><span className="font-bold">错误:</span> {error}</p>
            </div>
          )}
        {isSettingsOpen && (
            <SettingsModal 
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onSave={handleSaveKeys}
                initialKeys={apiKeys}
            />
        )}
      </main>
    </div>
  );
};

export default App;
