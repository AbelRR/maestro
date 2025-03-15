import { NextRequest, NextResponse } from 'next/server';

// Your sandbox ID 
const SANDBOX_ID = 'scalable-vector-ydh980';

export async function POST(req: NextRequest) {
  try {
    // Check if SANDBOX_ID is provided
    if (!SANDBOX_ID) {
      console.error('No LiveKit Sandbox ID provided');
      return NextResponse.json(
        { error: 'LiveKit Sandbox ID is not configured' },
        { status: 500 }
      );
    }

    const { roomName, participantName } = await req.json();
    
    // Validate required parameters
    if (!roomName || !participantName) {
      console.error('Missing required parameters:', { roomName, participantName });
      return NextResponse.json(
        { error: 'Missing required parameters. Both roomName and participantName are required.' },
        { status: 400 }
      );
    }
    
    console.log('Request to LiveKit sandbox with:', { roomName, participantName, sandboxId: SANDBOX_ID });
    
    // Build the URL with query parameters
    const baseUrl = 'https://cloud-api.livekit.io/api/sandbox/connection-details';
    const url = new URL(baseUrl);
    
    url.searchParams.append('roomName', roomName);
    url.searchParams.append('participantName', participantName);
    
    console.log('Making request to LiveKit URL:', url.toString());
    
    // Make request to LiveKit Cloud API
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'X-Sandbox-ID': SANDBOX_ID,
        'Content-Type': 'application/json',
      },
    });
    
    const responseText = await response.text();
    console.log('Raw LiveKit response:', responseText);
    
    let data;
    try {
      // Try to parse as JSON
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse LiveKit response as JSON:', e);
      return NextResponse.json(
        { error: 'Invalid response format from LiveKit API' },
        { status: 500 }
      );
    }
    
    console.log('Parsed LiveKit response:', data);
    
    if (!response.ok) {
      console.error('LiveKit API error:', data);
      return NextResponse.json(
        { 
          error: 'Failed to get connection details from LiveKit', 
          details: data,
          sandboxId: SANDBOX_ID
        },
        { status: response.status }
      );
    }
    
    // Map the LiveKit response to the format our frontend expects
    // LiveKit returns serverUrl and participantToken, but our frontend expects url and token
    if (!data.serverUrl || !data.participantToken) {
      console.error('LiveKit response missing serverUrl or participantToken:', data);
      return NextResponse.json(
        { 
          error: 'Invalid connection details format from LiveKit API',
          receivedData: data,
          sandboxId: SANDBOX_ID
        },
        { status: 500 }
      );
    }
    
    // Return the data in the format our frontend expects
    return NextResponse.json({
      url: data.serverUrl,
      token: data.participantToken
    });
  } catch (error) {
    console.error('Error getting LiveKit connection details:', error);
    return NextResponse.json(
      { error: 'Failed to get connection details', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 