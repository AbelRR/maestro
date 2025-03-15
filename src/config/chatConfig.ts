// Configuration for the chat service

export const chatConfig = {
  // Base URL for the chat completions API
  // By default, use our internal API proxy to avoid exposing API keys
  apiUrl: process.env.NEXT_PUBLIC_CHAT_API_URL || '/api/chat',
  
  // API key (can be set via environment variable)
  // Not needed when using our proxy, as it adds the API key server-side
  apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY,
  
  // Default model to use
  model: process.env.NEXT_PUBLIC_CHAT_MODEL || 'gpt-3.5-turbo',
  
  // Default system prompt
  defaultSystemPrompt: 'You are a helpful AI assistant that gives concise and accurate answers.'
}; 