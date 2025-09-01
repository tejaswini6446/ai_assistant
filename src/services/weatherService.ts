export const getWeatherData = async (location: string): Promise<any> => {
  // Simulated weather data since we can't access external APIs in this environment
  const mockWeatherData = {
    'new york': { location: 'New York', temperature: 22, condition: 'Partly Cloudy', humidity: 65, windSpeed: 8 },
    'london': { location: 'London', temperature: 18, condition: 'Rainy', humidity: 80, windSpeed: 12 },
    'tokyo': { location: 'Tokyo', temperature: 25, condition: 'Sunny', humidity: 60, windSpeed: 5 },
    'paris': { location: 'Paris', temperature: 20, condition: 'Overcast', humidity: 70, windSpeed: 6 },
    'sydney': { location: 'Sydney', temperature: 28, condition: 'Sunny', humidity: 55, windSpeed: 10 },
    'default': { location: location, temperature: Math.floor(Math.random() * 30) + 5, condition: 'Pleasant', humidity: Math.floor(Math.random() * 40) + 40, windSpeed: Math.floor(Math.random() * 15) + 3 }
  };

  const key = location.toLowerCase();
  return mockWeatherData[key as keyof typeof mockWeatherData] || mockWeatherData.default;
};