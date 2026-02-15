import { useState } from 'react';
import { Send, Mic, X, Bot, User } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onPromptClick?: (prompt: string) => void;
}

export function ChatInterface({ onPromptClick }: ChatInterfaceProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('dashboard.chat.title'),
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickPrompts = [
    { key: 'prompt.health', icon: '🏥' },
    { key: 'prompt.accident', icon: '🚗' },
    { key: 'prompt.legal', icon: '⚖️' },
    { key: 'prompt.taxes', icon: '📊' },
    { key: 'prompt.doctor', icon: '👨‍⚕️' },
    { key: 'prompt.community', icon: '🤝' },
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const loadingId = `loading-${Date.now()}`;
    const loadingMessage: Message = {
      id: loadingId,
      text: '...',
      sender: 'assistant',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, loadingMessage]);
    const payload = { message: inputValue, language };
    setInputValue('');

    fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        const reply = data.reply || data.message || JSON.stringify(data);
        setMessages(prev => prev.map(m => m.id === loadingId ? { ...m, text: reply } : m));
      })
      .catch((err) => {
        setMessages(prev => prev.map(m => m.id === loadingId ? { ...m, text: '(Error) ' + err.message } : m));
      });
  };

  const handlePromptClick = (promptKey: string) => {
    const promptText = t(promptKey);
    setInputValue(promptText);
    onPromptClick?.(promptText);
  };

  const handleClear = () => {
    setMessages([
      {
        id: '1',
        text: t('dashboard.chat.title'),
        sender: 'assistant',
        timestamp: new Date(),
      }
    ]);
    setInputValue('');
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3>{t('dashboard.chat.title')}</h3>
          <Button variant="ghost" size="sm" onClick={handleClear}>
            <X className="w-4 h-4 mr-2" />
            {t('dashboard.chat.clear')}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>

            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-slate-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t space-y-3">
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt.key}
              variant="outline"
              size="sm"
              onClick={() => handlePromptClick(prompt.key)}
              className="text-xs"
            >
              <span className="mr-1">{prompt.icon}</span>
              {t(prompt.key)}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('dashboard.chat.placeholder')}
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button onClick={handleSend} size="sm" className="h-auto">
              <Send className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-auto">
              <Mic className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          🔒 {t('dashboard.chat.privacy')}
        </p>
      </div>
    </Card>
  );
}