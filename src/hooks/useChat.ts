import { useState, useRef, useCallback } from 'react';
import { ChatService, ChatMessage, createChatService } from '@/services/chatService';
import { chatConfig } from '@/config/chatConfig';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface UseChatOptions {
  initialMessages?: Message[];
  expertContext?: string;
}

export function useChat({ initialMessages = [], expertContext = '' }: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatService = useRef<ChatService>(createChatService({
    apiUrl: chatConfig.apiUrl,
    apiKey: chatConfig.apiKey,
    model: chatConfig.model,
    systemPrompt: chatConfig.defaultSystemPrompt
  }));

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message to state
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Convert messages to the format expected by the chat completions API
      const chatMessages: ChatMessage[] = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));
      
      // Add the new user message
      chatMessages.push({
        role: 'user',
        content
      });

      // Send to chat completions API
      const response = await chatService.current.sendMessage(
        chatMessages,
        expertContext
      );

      if ('error' in response) {
        const errorMessage = response.error.message || 'Unknown error occurred';
        console.error('Chat API error:', response.error);
        setError(`Error: ${errorMessage}`);
        setIsLoading(false);
        return;
      }

      // Extract the assistant's response
      const assistantResponse = response.choices[0]?.message?.content || 
        "I'm sorry, I couldn't generate a response at the moment.";

      // Add AI response to messages
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: assistantResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to connect to the AI service. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, expertContext]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
} 