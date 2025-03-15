// Chat service to communicate with OpenAI-compatible chat completions API

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
  }[];
}

export interface ChatCompletionError {
  error: {
    message: string;
    type: string;
    code: string;
  };
}

export interface ChatServiceOptions {
  apiUrl?: string;
  apiKey?: string;
  model?: string;
  systemPrompt?: string;
}

export class ChatService {
  private apiUrl: string;
  private apiKey: string | undefined;
  private model: string;
  private systemPrompt: string;

  constructor(options: ChatServiceOptions = {}) {
    this.apiUrl = options.apiUrl || 'https://api.openai.com/v1/chat/completions';
    this.apiKey = options.apiKey;
    this.model = options.model || 'gpt-3.5-turbo';
    this.systemPrompt = options.systemPrompt || 'You are a helpful assistant.';
  }

  async sendMessage(
    messages: ChatMessage[],
    expertContext?: string
  ): Promise<ChatCompletionResponse | ChatCompletionError> {
    // Prepare the message history, including system prompt
    const messageHistory: ChatMessage[] = [];
    
    // Add system message with context if provided
    let systemMessage = this.systemPrompt;
    if (expertContext) {
      systemMessage += `\n\nYou are answering as an expert with the following background: ${expertContext}`;
    }
    
    messageHistory.push({ role: 'system', content: systemMessage });
    
    // Add user conversation history
    messageHistory.push(...messages);

    try {
      console.log(`Sending request to: ${this.apiUrl}`);
      
      const requestBody = {
        model: this.model,
        messages: messageHistory,
        temperature: 0.7,
        max_tokens: 1000
      };
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('API error response:', data);
        return data as ChatCompletionError;
      }
      
      return data as ChatCompletionResponse;
    } catch (error) {
      console.error("Chat service error:", error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          type: 'api_error',
          code: 'request_failed'
        }
      };
    }
  }

  // Helper method to convert internal message format to chat completions format
  convertToChatMessages(messages: { content: string; isUser: boolean }[]): ChatMessage[] {
    return messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.content
    }));
  }
}

export const createChatService = (options: ChatServiceOptions = {}): ChatService => {
  return new ChatService(options);
}; 