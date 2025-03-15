"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, Send, X, Phone, Video, RefreshCw, ChevronDown, ArrowLeft, Share, MoreVertical, Camera, VideoOff, MicOff } from "lucide-react";
import VideoMeeting from "@/components/video/VideoMeeting";
import { useChat, Message } from "@/hooks/useChat";
import { chatConfig } from "@/config/chatConfig";
import ReactMarkdown from 'react-markdown';

interface SuggestedQuestion {
  id: string;
  text: string;
}

type CallState = "none" | "pre-call" | "in-call" | "ended";
type CallType = "audio" | "video";

interface ChatInterfaceProps {
  expertName: string;
  expertImage: string;
  expertTitle?: string;
  expertDescription?: string;
  initialMessage?: string;
  suggestedQuestions?: SuggestedQuestion[];
  onClose?: () => void;
  fullScreen?: boolean;
}

export function ChatInterface({
  expertName,
  expertImage,
  expertTitle,
  expertDescription = "",
  initialMessage = "Hey striver! Welcome to GrowthDay. This is Brendon AI. What did you get done this week? What went well? Did you achieve your goals, or are you struggling with something? Just start sharing with me and we'll grow, together. Talk to me now I'm here for you.",
  suggestedQuestions = [
    { id: "q1", text: "What was the issue you had with money that contributed to you going broke?" },
    { id: "q2", text: "What is your advice for someone who is struggling in a lot of different areas of their life? (like across marriage, finances, health, or parenting?)" },
    { id: "q3", text: "Does high performance correlate with personality or is it more tied to desires for growth, achievement, and contribution?" },
  ],
  onClose,
  fullScreen = true
}: ChatInterfaceProps) {
  // Initialize the chat hook with the initial welcome message
  const { 
    messages, 
    isLoading: isThinking, 
    error: chatError, 
    sendMessage 
  } = useChat({
    initialMessages: [
      {
        id: "initial",
        content: initialMessage,
        isUser: false,
        timestamp: new Date(),
      }
    ],
    expertContext: `${expertName}: ${expertTitle || ''} ${expertDescription}`
  });

  const [newMessage, setNewMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [callState, setCallState] = useState<CallState>("none");
  const [callType, setCallType] = useState<CallType>("audio");
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState<NodeJS.Timeout | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [roomName, setRoomName] = useState<string>("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  useEffect(() => {
    // Show or hide suggestions based on loading state
    if (!isThinking && messages.length > 1) {
      setShowSuggestions(true);
    } else if (isThinking) {
      setShowSuggestions(false);
    }
  }, [isThinking, messages.length]);

  useEffect(() => {
    // Handle call timer
    if (callState === "in-call") {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      setCallTimer(timer);
      return () => clearInterval(timer);
    } else if (callTimer) {
      clearInterval(callTimer);
      setCallTimer(null);
    }
  }, [callState]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setNewMessage(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleProfileDrawer = () => {
    setShowProfileDrawer(!showProfileDrawer);
  };

  const initiateCall = (type: CallType = "audio") => {
    setCallType(type);
    setCallState("pre-call");
    
    // Generate a unique room name based on expert and user
    const timestamp = Date.now();
    setRoomName(`${expertName.replace(/\s+/g, '-').toLowerCase()}-call-${timestamp}`);
  };

  const startCall = () => {
    setCallState("in-call");
    setCallDuration(0);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const endCall = () => {
    setCallState("ended");
  };

  const returnToChat = () => {
    setCallState("none");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  // Render pre-call interface
  if (callState === "pre-call") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-gray-900">
        <header className="fixed top-0 w-full border-b border-gray-200 py-3 px-4 flex items-center justify-between z-10 bg-white">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-gray-700">
              <div className="relative h-6 w-6 rounded">
                <div className="absolute inset-0 bg-black rounded-md flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={expertImage}
                alt={expertName}
                width={28}
                height={28}
                className="object-cover w-full h-full"
                crossOrigin="anonymous"
              />
            </div>
            <span className="font-medium text-center ml-1">{expertName}</span>
          </div>

          <div className="flex items-center">
            <button 
              onClick={returnToChat}
              className="text-gray-500 hover:text-gray-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="w-full max-w-sm mx-auto px-4 flex flex-col items-center justify-center flex-1">
          <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={expertImage}
              alt={expertName}
              fill
              className="object-cover w-full h-full"
              crossOrigin="anonymous"
            />
          </div>
          <h1 className="text-2xl font-bold mb-1">{expertName}</h1>
          {expertTitle && <p className="text-gray-600 mb-8">{expertTitle}</p>}
          
          <Button
            onClick={startCall}
            className="w-full py-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium text-lg"
          >
            Start a {callType === "audio" ? "call" : "video call"}
          </Button>
        </div>
      </div>
    );
  }

  // Replace the in-call audio interface with LiveKit
  if (callState === "in-call" && callType === "audio") {
    return (
      <VideoMeeting 
        roomName={roomName}
        userName="User" 
        onClose={endCall}
      />
    );
  }

  // Replace the in-call video interface with LiveKit
  if (callState === "in-call" && callType === "video") {
    return (
      <VideoMeeting 
        roomName={roomName}
        userName="User" 
        onClose={endCall}
      />
    );
  }

  // Render call ended state
  if (callState === "ended") {
    const callTypeLabel = callType === "audio" ? "Call" : "Video call";
    
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-gray-900">
        <header className="fixed top-0 w-full border-b border-gray-200 py-3 px-4 flex items-center justify-between z-10 bg-white">
          <Link href="/" className="flex items-center text-gray-700">
            <div className="relative h-6 w-6 rounded">
              <div className="absolute inset-0 bg-black rounded-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </Link>
          
          <div className="flex items-center gap-1">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={expertImage}
                alt={expertName}
                width={28}
                height={28}
                className="object-cover w-full h-full"
                crossOrigin="anonymous"
              />
            </div>
            <span className="font-medium text-center ml-1">{expertName}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 text-sm">
              {callType === "audio" ? (
                <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-700 transform rotate-135" />
              ) : (
                <Video className="h-3.5 w-3.5 mr-1.5 text-gray-700" />
              )}
              <span className="text-gray-700">00:05</span>
            </div>
            <div className="text-gray-700 text-sm">
              <span>99 minutes left</span>
            </div>
          </div>
        </header>

        <div className="w-full max-w-sm mx-auto px-4 flex flex-col items-center justify-center flex-1">
          <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={expertImage}
              alt={expertName}
              fill
              className="object-cover w-full h-full"
              crossOrigin="anonymous"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">{expertName}</h1>
          
          <div className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm font-medium mb-16">
            {callTypeLabel} Ended
          </div>

          {callType === "video" && (
            <Button 
              className="w-full mb-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Preparing Instant Replay...
            </Button>
          )}

          <div className="flex justify-center w-full gap-6">
            <div className="flex flex-col items-center">
              <button 
                onClick={returnToChat}
                className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-2"
              >
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10H20M20 10L16 6M20 10L16 14M4 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="text-sm">Chat</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <Share className="h-6 w-6 text-gray-700" />
              </button>
              <span className="text-sm">Share</span>
            </div>
            <div className="flex flex-col items-center">
              <button 
                onClick={() => initiateCall(callType)}
                className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-2"
              >
                {callType === "audio" ? (
                  <Phone className="h-6 w-6 text-white" />
                ) : (
                  <Video className="h-6 w-6 text-white" />
                )}
              </button>
              <span className="text-sm">{callType === "audio" ? "Call" : "Video"}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render profile drawer
  if (showProfileDrawer) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <header className="border-b border-gray-200 py-3 px-4 flex items-center justify-between">
          <button 
            onClick={toggleProfileDrawer}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="font-medium text-center">Profile</h2>
          <div className="w-5"></div> {/* Empty div for proper centering */}
        </header>
        
        <div className="overflow-y-auto flex-1 pb-8">
          {/* Expert profile image and name */}
          <div className="flex flex-col items-center pt-8 pb-6">
            <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={expertImage}
                alt={expertName}
                fill
                className="object-cover w-full h-full"
                crossOrigin="anonymous"
              />
            </div>
            <h1 className="text-xl font-bold mb-1">{expertName}</h1>
            {expertTitle && <p className="text-gray-600">{expertTitle}</p>}
          </div>
          
          {/* Description section */}
          <div className="px-6">
            <h3 className="text-gray-900 font-medium mb-2">Description</h3>
            <p className="text-gray-700">{expertDescription}</p>
          </div>
        </div>
      </div>
    );
  }

  // Regular chat interface
  return (
    <div
      className={`flex flex-col bg-white ${
        fullScreen ? "fixed inset-0 z-50" : "h-full rounded-lg border shadow-sm"
      }`}
    >
      {/* Header with avatar in center */}
      <header className="border-b border-gray-200 py-3 px-4 flex items-center justify-between relative z-10 bg-white">
        {fullScreen && onClose ? (
          <button 
            onClick={onClose}
            className="flex items-center text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link href="/" className="flex items-center text-gray-700">
            <div className="relative h-6 w-6 rounded">
              <div className="absolute inset-0 bg-black rounded-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </Link>
        )}
        
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center cursor-pointer"
          onClick={toggleProfileDrawer}
        >
          <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 mr-2">
            <Image
              src={expertImage}
              alt={expertName}
              width={28}
              height={28}
              className="object-cover w-full h-full"
              crossOrigin="anonymous"
            />
          </div>
          <span className="font-medium">{expertName}</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="text-gray-600 hover:text-gray-900"
            onClick={() => initiateCall("audio")}
          >
            <Phone className="h-5 w-5" />
          </button>
          <button 
            className="text-gray-600 hover:text-gray-900"
            onClick={() => initiateCall("video")}
          >
            <Video className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto py-4 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-3.5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] py-3 px-4 rounded-lg ${
                  message.isUser
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <div className="react-markdown">
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          {chatError && (
            <div className="flex justify-center">
              <div className="bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm">
                {chatError}
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {/* Suggested questions */}
      {showSuggestions && suggestedQuestions.length > 0 && (
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-2">
            <div className="flex items-center mb-3">
              <button
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                Suggested Questions
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </button>
              <button
                onClick={() => setShowSuggestions(false)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question.id}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-800 px-4 py-3 rounded-lg text-sm text-left flex items-start"
                  onClick={() => handleSuggestedQuestion(question.text)}
                >
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <span>{question.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Message input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-3xl mx-auto flex items-center">
          <div className="relative flex-1 rounded-full overflow-hidden border border-gray-300 bg-white shadow-sm flex">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type..."
              className="w-full py-3 px-4 outline-none text-gray-700"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="px-3 text-gray-400 hover:text-orange-500 flex-shrink-0">
              <Mic className="h-5 w-5" />
            </button>
            <button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`px-3 flex-shrink-0 ${newMessage.trim() ? 'text-orange-500 hover:text-orange-600' : 'text-gray-300'}`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
