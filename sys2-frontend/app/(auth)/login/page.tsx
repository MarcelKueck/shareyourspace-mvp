"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation"; // For redirecting after login
import { toast } from "sonner"; // Import sonner toast

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast"; // Remove this line
// import { loginUser } from "@/lib/api/auth"; // Assume this function exists

// Define the login form schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, { // Basic check, backend handles complexity
    message: "Password is required.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  // const { toast } = useToast(); // Remove this line
  const [isLoading, setIsLoading] = React.useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Submitting:", values); // For debugging

    try {
        // TODO: Replace with your actual API call function
        // const response = await loginUser(values.email, values.password);
        // console.log("Login successful:", response);

        // --- Placeholder for successful login ---
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        // Assume loginUser returns token data or throws error
        // You might want to store the token (e.g., in context or local storage)
        // --- End Placeholder ---


        // Use sonner toast for success
        toast.success("Login Successful", {
            description: "Redirecting to dashboard...",
        });

        // Redirect to a protected route (e.g., dashboard)
        router.push("/dashboard"); // Adjust the target route as needed

    } catch (error: unknown) { // Use unknown
      console.error("Login failed:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      // Type guard to check for potential API error structure
      if (typeof error === 'object' && error !== null) {
          if ('response' in error && typeof error.response === 'object' && error.response !== null &&
              'data' in error.response && typeof error.response.data === 'object' && error.response.data !== null &&
              'detail' in error.response.data) {
              errorMessage = String(error.response.data.detail); // Extract FastAPI detail
          } else if ('message' in error) {
              errorMessage = String(error.message);
          }
      }
       
      // Use sonner toast for error
      toast.error("Login Failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} type="email" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" {...field} type="password" disabled={isLoading} />
                    </FormControl>
                     {/* Optional: Add forgot password link */}
                     {/* <FormDescription className="text-right">
                        <Link href="/forgot-password" className="text-sm underline">
                            Forgot password?
                        </Link>
                     </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
         {/* Optional: Add links for registration or other auth actions */}
         {/* <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="underline">
                    Sign up
                </Link>
            </p>
         </CardFooter> */}
      </Card>
    </div>
  );
}
