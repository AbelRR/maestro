import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';
import { Loader2 } from 'lucide-react';

interface VideoMeetingProps {
  roomName: string;
  userName: string;
  onClose?: () => void;
  onError?: (error: string) => void;
}

export default function VideoMeeting({ roomName, userName, onClose, onError }: VideoMeetingProps) {
  const [token, setToken] = useState<string>('');
  const [serverUrl, setServerUrl] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  // Setup listener for participant changes
  useEffect(() => {
    if (!token) return;
    
    // Simple function to log participants from DOM
    const logParticipantsFromDOM = () => {
      // Wait for LiveKit UI to render
      setTimeout(() => {
        try {
          // Look for participant tiles in the DOM
          const participantElements = document.querySelectorAll('[data-lk-participant-id]');
          if (participantElements.length > 0) {
            console.log(`👥 Participants in call (${participantElements.length}):`);
            participantElements.forEach((el: Element) => {
              const id = el.getAttribute('data-lk-participant-id');
              console.log(`  - Participant: ${id}`);
            });
          }
        } catch (e) {
          console.error('Error while trying to log participants:', e);
        }
      }, 3000); // Give some time for UI to render
    };
    
    // Log once after connection
    logParticipantsFromDOM();
    
    // Set up periodic logging
    const intervalId = setInterval(logParticipantsFromDOM, 10000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [token]);

  useEffect(() => {
    const getConnectionDetails = async () => {
      try {
        setIsConnecting(true);
        console.log('Requesting LiveKit connection details for:', { roomName, userName });
        
        const response = await fetch('/api/livekit-sandbox', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomName: roomName,
            participantName: userName,
          }),
        });
        
        const responseData = await response.json();
        console.log('Response from LiveKit sandbox API:', responseData);
        
        if (!response.ok) {
          const errorMessage = responseData.error || 'Failed to get connection details';
          console.error('API error response:', errorMessage, responseData);
          throw new Error(errorMessage);
        }
        
        if (!responseData.token || !responseData.url) {
          console.error('Invalid response data - missing token or url:', responseData);
          throw new Error('Invalid connection details received');
        }
        
        console.log('Connection successful, using server:', responseData.url);
        console.log(`Joining room: ${roomName} as participant: ${userName}`);
        setToken(responseData.token);
        setServerUrl(responseData.url);
      } catch (err) {
        console.error('Error getting connection details:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to connect to meeting';
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setIsConnecting(false);
      }
    };

    if (roomName && userName) {
      getConnectionDetails();
    }
  }, [roomName, userName, onError]);

  const handleDisconnect = useCallback(() => {
    console.log('Disconnected from room:', roomName);
    console.log('Participant left:', userName);
    if (onClose) {
      onClose();
    }
  }, [onClose, roomName, userName]);

  if (isConnecting) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-white mb-4" />
        <p>Connecting to meeting...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white">
        <div className="max-w-md text-center">
          <h3 className="text-xl font-bold mb-4">Connection Error</h3>
          <p className="mb-6">{error}</p>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Return to Chat
          </button>
        </div>
      </div>
    );
  }

  if (!token || !serverUrl) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        video={true}
        audio={true}
        onDisconnected={handleDisconnect}
        data-lk-theme="default"
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
} 