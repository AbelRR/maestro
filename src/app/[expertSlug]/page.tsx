"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Sidebar } from "@/components/chat/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Menu, MessageSquare, Phone, X } from "lucide-react";
import { expertsData } from "@/data/experts";

export default function ExpertPage() {
  const params = useParams();
  const expertSlug = params.expertSlug as string;
  const expert = expertsData[expertSlug as keyof typeof expertsData];
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Handle case when expert is not found
  if (!expert) {
    notFound();
  }

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push(`/login?next=/${expertSlug}`);
    }
  }, [isAuthenticated, router, expertSlug]);

  const [activeTab, setActiveTab] = useState<"text" | "voice">("text");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullChat, setIsFullChat] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If not authenticated, show loading state or simple message
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Redirecting to login...</h1>
            <p className="text-gray-600">Please authenticate to access this content</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // If we're in full chat mode, only show the chat interface
  if (isFullChat) {
    return (
      <ChatInterface
        expertName={expert.name}
        expertImage={expert.image}
        expertTitle={expert.title}
        expertDescription={expert.description}
        initialMessage={expert.initialMessage || undefined}
        suggestedQuestions={expert.suggestedQuestions}
        onClose={() => setIsFullChat(false)}
        fullScreen={true}
      />
    );
  }

  return (
    <>
      {!isAuthenticated && <Header />}
      <main className="flex flex-col min-h-screen">
        {isAuthenticated && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex flex-col flex-1">
          {/* Expert info section - Now this will be hidden in the chat design 
             and only shown when avatar is clicked in the ChatInterface component */}
          <div className="bg-white border-b hidden">
            <div className="container py-8">
              <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
                {isAuthenticated && (
                  <button
                    className="absolute left-4 top-4 text-gray-500 hover:text-gray-900 md:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                )}

                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <h1 className="text-3xl font-bold mb-1">{expert.name}</h1>
                {expert.title && (
                  <p className="text-gray-600 mb-4">{expert.title}</p>
                )}

                <div className="flex gap-3 mb-6">
                  <Button
                    className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 flex items-center gap-2"
                    onClick={() => {
                      setActiveTab("text");
                      setIsFullChat(true);
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Text</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 px-6 flex items-center gap-2"
                    onClick={() => {
                      setActiveTab("voice");
                      setIsFullChat(true);
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Voice</span>
                  </Button>
                </div>

                <div className="text-left w-full">
                  <details open className="mb-4">
                    <summary className="cursor-pointer font-medium text-gray-700 flex items-center">
                      <span className="mr-2">Description</span>
                    </summary>
                    <p className="mt-2 text-gray-600">{expert.description}</p>
                  </details>
                </div>
              </div>
            </div>
          </div>

          {/* Chat interface - Takes up full height since the expert info is hidden */}
          <div className="flex-1 bg-gray-100">
            <ChatInterface
              expertName={expert.name}
              expertImage={expert.image}
              expertTitle={expert.title}
              expertDescription={expert.description}
              initialMessage={expert.initialMessage || undefined}
              suggestedQuestions={expert.suggestedQuestions}
              fullScreen={true}
            />
          </div>
        </div>
      </main>
      {!isAuthenticated && <Footer />}
    </>
  );
}
