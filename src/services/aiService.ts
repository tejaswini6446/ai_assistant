import { getWeatherData } from './weatherService';

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why don't programmers like nature? It has too many bugs.",
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Why did the scarecrow win an award? He was outstanding in his field!"
];

const funFacts = [
  "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "A group of flamingos is called a 'flamboyance'!",
  "The shortest war in history lasted only 38-45 minutes between Britain and Zanzibar in 1896.",
  "Octopuses have three hearts and blue blood!",
  "A day on Venus is longer than its year - Venus rotates so slowly that a day lasts 243 Earth days, while a year is only 225 Earth days."
];

export const processUserMessage = async (message: string): Promise<{ content: string; type: string; shouldSpeak?: boolean }> => {
  const lowerMessage = message.toLowerCase();

  // Weather queries
  if (lowerMessage.includes('weather')) {
    const locationMatch = lowerMessage.match(/weather.*?(?:in|for)\s+([a-zA-Z\s]+)/);
    const location = locationMatch ? locationMatch[1].trim() : 'your location';
    
    try {
      const weather = await getWeatherData(location);
      return {
        content: `🌤️ Current weather in ${weather.location}: ${weather.temperature}°C, ${weather.condition}. Humidity: ${weather.humidity}%, Wind: ${weather.windSpeed} km/h`,
        type: 'weather',
        shouldSpeak: true
      };
    } catch (error) {
      return {
        content: "I'm sorry, I couldn't fetch the weather data right now. You can check your local weather app or website for the most current information!",
        type: 'text',
        shouldSpeak: true
      };
    }
  }

  // Joke requests
  if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return {
      content: `😄 ${randomJoke}`,
      type: 'joke',
      shouldSpeak: true
    };
  }

  // Fun fact requests
  if (lowerMessage.includes('fact') || lowerMessage.includes('interesting')) {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    return {
      content: `🧠 Fun fact: ${randomFact}`,
      type: 'fact',
      shouldSpeak: true
    };
  }

  // Math calculations
  if (lowerMessage.includes('calculate') || lowerMessage.includes('math') || /[\d+\-*/()]/.test(lowerMessage)) {
    try {
      const mathExpression = message.replace(/[^0-9+\-*/().\s]/g, '').trim();
      if (mathExpression) {
        // Basic validation to prevent code injection
        if (!/^[0-9+\-*/().\s]+$/.test(mathExpression)) {
          throw new Error('Invalid expression');
        }
        const result = Function(`"use strict"; return (${mathExpression})`)();
        return {
          content: `🔢 ${mathExpression} = ${result}`,
          type: 'calculation',
          shouldSpeak: true
        };
      }
    } catch (error) {
      return {
        content: "I couldn't solve that math problem. Could you try rephrasing it with numbers and basic operators (+, -, *, /)?",
        type: 'text',
        shouldSpeak: true
      };
    }
  }

  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      content: "Hello there! 👋 I'm your friendly AI assistant. I can help you with weather updates, tell jokes, share fun facts, do math calculations, or just have a nice chat. What would you like to know?",
      type: 'text',
      shouldSpeak: true
    };
  }

  // Default responses for general knowledge
  const responses = [
    "That's an interesting question! I'd be happy to help, but I might not have all the details. For the most accurate information, I'd recommend checking reliable sources like encyclopedias or educational websites.",
    "I appreciate your curiosity! While I can provide general guidance, for specific or detailed information, it's always best to consult expert resources or official documentation.",
    "Great question! I'll do my best to help, though for comprehensive answers on specialized topics, you might want to check academic sources or subject matter experts.",
    "I'm glad you asked! While I can offer general insights, for precise information, especially on technical or scientific matters, I'd suggest verifying with authoritative sources."
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return {
    content: randomResponse,
    type: 'text',
    shouldSpeak: true
  };
};