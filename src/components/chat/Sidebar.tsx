"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  name: string;
  isActive: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations?: Conversation[];
}

export function Sidebar({
  isOpen,
  onClose,
  conversations = [
    { id: "1", name: "Conversation", isActive: true },
  ]
}: SidebarProps) {
  const [activeConversation, setActiveConversation] = useState<string>(
    conversations.find(c => c.isActive)?.id || ""
  );

  const handleConversationClick = (id: string) => {
    setActiveConversation(id);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <rect width="32" height="32" rx="6" fill="#000000"/>
            <path d="M10 8H22M10 16H22M10 24H22" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span className="font-semibold">Delphi</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <Button
          className="w-full mb-6 flex items-center gap-2 justify-start rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          <Plus className="h-4 w-4" />
          <span>New Conversation</span>
        </Button>

        <div className="mb-2">
          <div className="text-xs font-medium text-gray-500 uppercase mb-2">Today</div>
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                  activeConversation === conversation.id
                    ? "bg-orange-50 text-orange-700"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleConversationClick(conversation.id)}
              >
                <span className="text-sm font-medium truncate">{conversation.name}</span>
                {activeConversation === conversation.id && (
                  <span className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded">Current</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
