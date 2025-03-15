"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const codeSchema = z.object({
  code: z.string().min(6, { message: "Authentication code must be at least 6 characters" }),
});

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { requestCode, login } = useAuth();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "reyesregalado@gmail.com", // Pre-fill with the provided email
    },
  });

  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    setError("");
    try {
      const success = await requestCode(values.email);
      if (success) {
        setEmail(values.email);
        setStep("code");
      } else {
        setError("Failed to send authentication code. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (values: z.infer<typeof codeSchema>) => {
    setIsLoading(true);
    setError("");
    try {
      const success = await login(email, values.code);
      if (success) {
        onClose();
      } else {
        setError("Invalid authentication code. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {step === "email" ? "Sign In to Delphi" : "Enter Authentication Code"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        {step === "email" ? (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending Code..." : "Continue"}
              </Button>
              <p className="text-center text-sm text-gray-500 mt-2">
                We'll email you a code to sign in.
              </p>
            </form>
          </Form>
        ) : (
          <Form {...codeForm}>
            <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} className="space-y-4">
              <FormField
                control={codeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authentication Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the 6-digit code"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-orange-500 hover:underline"
                  disabled={isLoading}
                >
                  Use different email
                </button>
                <button
                  type="button"
                  onClick={() => handleEmailSubmit({ email })}
                  className="text-orange-500 hover:underline"
                  disabled={isLoading}
                >
                  Resend code
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                For demo purposes, use code: 123456
              </p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
