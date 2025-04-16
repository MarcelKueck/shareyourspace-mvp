'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// import { toast } from 'sonner'; // Removed as toasts are handled in API function

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from '@/lib/api/auth'; // Import the API function

// 1. Define the Zod schema for validation
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(1, { message: "Email is required." }),
});

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  // 2. Set up react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  // 3. Define the onSubmit handler
  const onSubmit = async (data: FormData) => {
    try {
      await requestPasswordReset(data.email);
      // Success toast is handled within requestPasswordReset
      // Optionally clear the form or provide other feedback
      form.reset(); // Clear the form on success
    } catch (error) {
      // Error toast is handled within requestPasswordReset
      console.error("Forgot password request failed:", error);
      // Optionally show a generic error message here if needed
      // toast.error("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen"> {/* Center the card */}
      <Card className="w-full max-w-sm"> {/* Limit card width */}
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        {/* 4. Create the form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")} // Register the input
                aria-invalid={errors.email ? "true" : "false"}
              />
              {/* 5. Display validation errors */}
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            {/* 6. Submit button with loading state */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
