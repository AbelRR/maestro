import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const room = url.searchParams.get('room');
    const username = url.searchParams.get('username');
    
    if (!room) {
      return NextResponse.json(
        { error: 'Missing "room" query parameter' },
        { status: 400 }
      );
    }

    if (!username) {
      return NextResponse.json(
        { error: 'Missing "username" query parameter' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Server misconfigured' },
        { status: 500 }
      );
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: username,
    });

    at.addGrant({ 
      roomJoin: true, 
      room,
      canPublish: true,
      canSubscribe: true,
    });

    return NextResponse.json({ token: at.toJwt() });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Could not generate token' },
      { status: 500 }
    );
  }
} 