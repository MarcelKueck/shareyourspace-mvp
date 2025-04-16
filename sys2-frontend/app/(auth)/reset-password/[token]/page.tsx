'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams, useRouter } from 'next/navigation'; // Import useParams and useRouter
import { toast } from 'sonner'; // Import toast for potential extra feedback

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
import { resetPassword } from '@/lib/api/auth'; // Import the API function

// 1. Define the Zod schema for validation
const formSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password." })
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Set the error path to the confirmPassword field
});

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string; // Extract token from URL

  // 2. Set up react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  // 3. Define the onSubmit handler
  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Password reset token is missing.");
      return;
    }
    try {
      const success = await resetPassword(token, data.newPassword);
      // Success toast is handled within resetPassword
      if (success) {
        toast.info("Redirecting to login..."); // Optional: Inform user about redirect
        router.push('/login'); // Redirect on success
      }
      // If not successful, the API function should have shown an error toast
    } catch (error) {
      // Error toast is handled within resetPassword
      console.error("Password reset failed:", error);
      // Optionally show a generic error message here if needed
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        {/* 4. Create the form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            {/* New Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="********"
                {...register("newPassword")} 
                aria-invalid={errors.newPassword ? "true" : "false"}
              />
              {errors.newPassword && <p className="text-sm text-red-600 mt-1">{errors.newPassword.message}</p>}
            </div>
            {/* Confirm Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            {/* 5. Submit button with loading state */}
            <Button type="submit" className="w-full" disabled={isSubmitting || !token}>
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
