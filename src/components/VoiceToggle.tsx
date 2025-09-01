import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VoiceToggleProps {
  isEnabled: boolean;
  isSpeaking: boolean;
  onToggle: () => void;
  isSupported: boolean;
}

export const VoiceToggle: React.FC<VoiceToggleProps> = ({ 
  isEnabled, 
  isSpeaking, 
  onToggle, 
  isSupported 
}) => {
  if (!isSupported) return null;

  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition-all duration-200 ${
        isEnabled
          ? 'bg-green-100 text-green-600 hover:bg-green-200'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      } ${isSpeaking ? 'animate-pulse' : ''}`}
      title={isEnabled ? 'Voice enabled' : 'Voice disabled'}
    >
      {isEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
};