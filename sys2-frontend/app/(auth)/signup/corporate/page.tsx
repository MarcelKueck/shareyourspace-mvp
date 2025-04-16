"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  companyName: z.string().min(1, { message: "Company name is required." }),
  role: z.string(), // Hidden field, no explicit validation needed here
});

type FormData = z.infer<typeof formSchema>;

// Placeholder API function removed
// async function registerUser(data: FormData) { ... }

export default function CorporateSignupPage() {
  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      role: "Corporate", // Pre-fill role for Corporate users
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      // Call the imported registerUser function
      const createdUser = await registerUser(values);
      // Handle successful registration (e.g., redirect, show message)
      // Toasts are handled within registerUser
      console.log("Registration successful, user:", createdUser);
      form.reset(); // Reset form after successful submission
    } catch (error) {
      // Handle errors (e.g., display error message)
      // Toasts are handled within registerUser
      console.error("Registration failed in component:", error);
      // You might want to set a form error using form.setError based on the error
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register your Company</CardTitle>
          <CardDescription>
            Create a corporate account to manage your company&apos;s spaces.
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
                      <Input type="email" placeholder="your.email@company.com" {...field} />
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
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company, Inc." {...field} />
                    </FormControl>
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
