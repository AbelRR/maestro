declare module '@livekit/components-react' {
  export const LiveKitRoom: React.FC<{
    token: string;
    serverUrl: string;
    video: boolean;
    audio: boolean;
    onDisconnected?: () => void;
    'data-lk-theme'?: string;
    children?: React.ReactNode;
  }>;
  
  export const VideoConference: React.FC;
  export const ControlBar: React.FC;
  export const useTracks: any;
  export const RoomAudioRenderer: React.FC;
  export const GridLayout: React.FC;
  export const ParticipantTile: React.FC;
}

declare module 'livekit-client' {
  export const Track: any;
}

declare module '@livekit/components-styles' {} 