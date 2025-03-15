import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Get API URL and key from environment variables
    const apiUrl = process.env.CHAT_API_URL || 'https://api.openai.com/v1/chat/completions';
    const apiKey = process.env.CHAT_API_KEY;
    
    console.log(`Proxying request to: ${apiUrl}`);
    
    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header only if API key is provided
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    try {
      // Forward the request to the actual API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: body.model || 'gpt-3.5-turbo',
          messages: body.messages,
          temperature: body.temperature || 0.7,
          max_tokens: body.max_tokens || 1000,
          top_p: body.top_p || 1,
          frequency_penalty: body.frequency_penalty || 0,
          presence_penalty: body.presence_penalty || 0
        })
      });

      const data = await response.json();

      // Return the API response
      return NextResponse.json(data, { 
        status: response.status 
      });
    } catch (fetchError) {
      console.error('Error connecting to chat API:', fetchError);
      return NextResponse.json(
        { 
          error: {
            message: `Failed to connect to chat API at ${apiUrl}. Is the server running?`,
            type: 'connection_error',
            code: 'api_unreachable'
          }
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { 
        error: {
          message: 'Failed to process chat request',
          type: 'server_error',
          code: 'request_processing_failed'
        }
      },
      { status: 500 }
    );
  }
} 