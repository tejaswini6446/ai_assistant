import React from 'react';
import { Message } from '../types';
import { Bot, User, Cloud, Laugh, Brain, Calculator } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const getMessageIcon = (type?: string) => {
  switch (type) {
    case 'weather':
      return <Cloud size={16} className="text-blue-500" />;
    case 'joke':
      return <Laugh size={16} className="text-yellow-500" />;
    case 'fact':
      return <Brain size={16} className="text-purple-500" />;
    case 'calculation':
      return <Calculator size={16} className="text-green-500" />;
    default:
      return null;
  }
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const icon = getMessageIcon(message.type);

  return (
    <div className={`flex items-start gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-600'
      }`}>
        {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
      </div>
      
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-4 py-2 rounded-2xl ${
          isUser 
            ? 'bg-blue-500 text-white rounded-tr-sm' 
            : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm'
        }`}>
          {icon && (
            <div className="flex items-center gap-2 mb-1">
              {icon}
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {message.type}
              </span>
            </div>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        
        <span className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};