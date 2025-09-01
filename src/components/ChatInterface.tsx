import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { VoiceToggle } from './VoiceToggle';
import { TypingIndicator } from './TypingIndicator';
import { useSpeech } from '../hooks/useSpeech';
import { processUserMessage } from '../services/aiService';
import { Bot, Sparkles } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your friendly AI assistant. 👋\n\nI can help you with:\n• Weather updates for any location\n• Math calculations\n• Jokes and fun facts\n• General questions and chat\n\nWhat would you like to know?",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isEnabled, isSpeaking, speak, toggleEnabled, isSupported } = useSpeech();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await processUserMessage(content);
      
      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'assistant',
        timestamp: new Date(),
        type: response.type
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (response.shouldSpeak) {
        speak(response.content);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again!",
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">AI Assistant</h1>
              <p className="text-sm text-gray-500">Always here to help</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-500" />
            <VoiceToggle
              isEnabled={isEnabled}
              isSpeaking={isSpeaking}
              onToggle={toggleEnabled}
              isSupported={isSupported}
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isDisabled={isTyping} />
        </div>
      </div>
    </div>
  );
};