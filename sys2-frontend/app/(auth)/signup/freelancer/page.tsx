"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation'; // Import the router
import { toast } from "sonner"; // Import toast if needed for direct feedback

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/lib/api/auth"; // Import the actual API function

// Define the validation schema using Zod
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  role: z.string(), // Hidden field, no explicit validation needed here
});

type FormData = z.infer<typeof formSchema>;

export default function FreelancerSignupPage() {
  const router = useRouter(); // Instantiate the router

  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "Freelancer", // Pre-fill role for Freelancers
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormData) {
    try {
       // Call the imported registerUser function
       // Pass companyName as null or undefined as it's not in this form
      const createdUser = await registerUser({ ...values, companyName: null });
      console.log("Registration successful, user:", createdUser);
      // Show success toast (optional, might be handled in API function)
      // toast.success("Registration successful! Please check your email.");

      // REDIRECT on success
      router.push('/auth/verify-email');

    } catch (error) {
      // Error handling is likely done via toasts within registerUser
      console.error("Registration failed in component:", error);
      // Optionally set form-specific errors if needed
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register as a Freelancer</CardTitle>
          <CardDescription>
            Create your individual account to offer or find spaces.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@provider.com" {...field} />
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
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Hidden field for role */}
              <FormField
                 control={form.control}
                 name="role"
                 render={({ field }) => (
                   <FormItem className="hidden">
                     <FormControl>
                       <Input type="hidden" {...field} />
                     </FormControl>
                   </FormItem>
                 )}
              />
               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                 {form.formState.isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {/* Optional: Add link to login page or other relevant actions */}
          {/* <p className="text-center text-sm text-muted-foreground">
            Already have an account? <a href="/login" className="underline">Login</a>
          </p> */}
        </CardFooter>
      </Card>
    </div>
  );
}