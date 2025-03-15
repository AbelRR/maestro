"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import VideoMeeting from '@/components/video/VideoMeeting';
import Link from 'next/link';

export default function TestVideoPage() {
  const [isInCall, setIsInCall] = useState(false);
  const [roomName, setRoomName] = useState('test-room-' + Date.now());
  const [userName, setUserName] = useState('User-' + Math.floor(Math.random() * 1000));
  const [lastError, setLastError] = useState<string | null>(null);

  const startCall = () => {
    setLastError(null);
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
  };

  const handleError = (error: string) => {
    setLastError(error);
    setIsInCall(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">LiveKit Video Test</h1>
      <p className="text-gray-600 mb-2">Using LiveKit Sandbox ID: scalable-vector-ydh980</p>
      <p className="text-gray-500 mb-6 text-sm">Note: Tokens are limited to 15 minutes TTL in sandbox mode</p>
      
      {lastError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">Error:</h3>
          <p>{lastError}</p>
        </div>
      )}
      
      {!isInCall ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <Button 
            onClick={startCall}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Join Video Call
          </Button>

          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-500 hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      ) : (
        <VideoMeeting
          roomName={roomName}
          userName={userName}
          onClose={endCall}
          onError={handleError}
        />
      )}
    </div>
  );
} 