"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

// QR code component
const QRCode = () => (
  <div className="w-[220px] h-[220px] mx-auto my-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
    <div className="w-full h-full bg-white flex items-center justify-center relative">
      <div className="absolute inset-0 p-3">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M30,30 L30,40 L40,40 L40,30 Z M50,30 L50,40 L60,40 L60,30 Z M70,30 L70,40 L80,40 L80,30 Z M30,50 L30,60 L40,60 L40,50 Z M50,50 L50,60 L60,60 L60,50 Z M70,50 L70,60 L80,60 L80,50 Z M30,70 L30,80 L40,80 L40,70 Z M50,70 L50,80 L60,80 L60,70 Z M70,70 L70,80 L80,80 L80,70 Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="bg-white text-black p-2 z-10 text-sm font-medium border border-gray-200 rounded shadow-sm">
        DELPHI
      </div>
    </div>
  </div>
);

const codeSchema = z.object({
  code: z.string().min(6, { message: "Authentication code must be at least 6 characters" }),
});

type DelphiAuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CoinbaseAuthModal({ isOpen, onClose }: DelphiAuthModalProps) {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<"wallet" | "code">("code");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      form.reset();
      setError("");
    }
  }, [isOpen, form]);

  const handleSubmit = async (values: z.infer<typeof codeSchema>) => {
    setIsLoading(true);
    setError("");
    try {
      // Always use example@example.com as the email for this demo
      const success = await login("example@example.com", values.code);
      if (success) {
        onClose();
      } else {
        setError("Invalid verification code. For demo, use code: 123456");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white text-gray-900 rounded-lg border-0">
        <div className="flex justify-between items-center p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-medium text-gray-900">Sign In</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 rounded-full h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "wallet" | "code")} className="w-full">
          <TabsList className="w-full bg-gray-50 rounded-none h-12 p-1 border-b">
            <TabsTrigger
              value="code"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Verification Code
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              QR Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="p-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Authentication Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter 6-digit verification code"
                          {...field}
                          disabled={isLoading}
                          className="h-10 border-gray-300 focus-visible:ring-orange-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </Button>
                </div>
                <div className="text-center text-sm text-gray-500 pt-2">
                  For demo purposes, use code: <span className="font-mono font-bold">123456</span>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="wallet" className="p-6">
            <div className="text-center mb-4 text-sm text-gray-600">
              Scan with your wallet app
            </div>
            <QRCode />
            <div className="text-center text-sm text-gray-500 mt-4">
              Scan this QR code with any compatible wallet app
              <br />
              <span className="text-orange-500 mt-2 inline-block">
                For demo purposes, use the Verification Code tab
              </span>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
