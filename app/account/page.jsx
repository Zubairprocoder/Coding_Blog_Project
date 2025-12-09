"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { useAuth } from "@/lib/contexts/AuthContext";

export default function AuthTabs() {
  const { login, signup, googleLogin } = useAuth();
const { facebookLogin } = useAuth();
  // Sign in form
  const signInForm = useForm({
    defaultValues: { email: "", password: "" },
  });

  const {
    handleSubmit: handleSignIn,
    control: controlSignIn,
    formState: { errors: signInErrors },
  } = signInForm;

  const onSignIn = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error(error.message);
      console.log("Sign in error:", error);
    }
  };

  // Sign up form
  const signUpForm = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });
const handleFacebook = async () => {
  try {
    await facebookLogin();
    toast.success("Signed in with Facebook!");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
  const {
    handleSubmit: handleSignUp,
    control: controlSignUp,
    formState: { errors: signUpErrors },
  } = signUpForm;

  const onSignUp = async (data) => {
    try {
      await signup(data.email, data.password);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message);
      console.log("Sign up error:", error);
    }
  };

  // Google Login
  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google!");
    } catch (error) {
      toast.error(error.message);
      console.log("Google login error:", error);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-8 mx-auto py-12">
      <Toaster position="top-center" />

      <Tabs defaultValue="signin" className="space-y-6">
        <TabsList className="gap-4">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* Sign In */}
        <TabsContent value="signin">
          <Card className="space-y-6">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Use your email and password to sign in.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleSignIn(onSignIn)} className="space-y-4">
                <Controller
                  name="email"
                  control={controlSignIn}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Email</Label>
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@email.com"
                      />
                      {signInErrors.email && (
                        <p className="text-red-600 text-sm">
                          {signInErrors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="password"
                  control={controlSignIn}
                  rules={{
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Password</Label>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Your password"
                      />
                      {signInErrors.password && (
                        <p className="text-red-600 text-sm">
                          {signInErrors.password.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <CardFooter className="flex flex-col gap-3 pt-0">
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sign Up */}
        <TabsContent value="signup">
          <Card className="space-y-6">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account using email or social providers.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleSignUp(onSignUp)} className="space-y-4">
                <Controller
                  name="name"
                  control={controlSignUp}
                  rules={{
                    required: "Name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Name</Label>
                      <Input {...field} placeholder="Your name" />
                      {signUpErrors.name && (
                        <p className="text-red-600 text-sm">
                          {signUpErrors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="email"
                  control={controlSignUp}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Email</Label>
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@email.com"
                      />
                      {signUpErrors.email && (
                        <p className="text-red-600 text-sm">
                          {signUpErrors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="password"
                  control={controlSignUp}
                  rules={{
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Password</Label>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Your password"
                      />
                      {signUpErrors.password && (
                        <p className="text-red-600 text-sm">
                          {signUpErrors.password.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <CardFooter className="flex flex-col gap-3 pt-0">
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center justify-around gap-5"
                      onClick={handleGoogle}
                    >
                      {/* Google SVG */}
                      <svg className="w-4 h-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-17.4-1.6-34.2-4.6-50.4H272v95.5h146.9c-6.4 34.7-25.6 64.1-54.4 83.9v69h87.7c51.4-47.5 81.3-117 81.3-198.0z"
                          fill="#4285F4"
                        />
                        <path
                          d="M272 544.3c73.4 0 135-24.4 180-66.5l-87.7-69c-24.3 16.3-55.5 25.9-92.3 25.9-70.9 0-130.9-47.9-152.4-112.2H29v70.4C74 478 167.1 544.3 272 544.3z"
                          fill="#34A853"
                        />
                        <path
                          d="M119.6 323.5c-10.7-31.5-10.7-65.4 0-96.9V156.2H29c-38.5 75.5-38.5 164.6 0 240.1l90.6-72.8z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M272 107.1c39.9 0 75.8 13.7 104.0 40.7l78.1-78.1C407 25.8 345.4 0 272 0 167.1 0 74 66.3 29 156.2l90.6 70.4C141.1 155 201.1 107.1 272 107.1z"
                          fill="#EA4335"
                        />
                      </svg>
                      Sign in with Google
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <div className="flex flex-col gap-2 items-center justify-center">
          {/* Google Login */}
          <Button
            variant="outline"
            className="flex items-center justify-center gap-8 w-90"
            onClick={handleGoogle}
          >
            {/* Google SVG */}
            <svg className="w-4 h-4" viewBox="0 0 533.5 544.3">
              <path
                d="M533.5 278.4c0-17.4-1.6-34.2-4.6-50.4H272v95.5h146.9c-6.4 34.7-25.6 64.1-54.4 83.9v69h87.7c51.4-47.5 81.3-117 81.3-198.0z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c73.4 0 135-24.4 180-66.5l-87.7-69c-24.3 16.3-55.5 25.9-92.3 25.9-70.9 0-130.9-47.9-152.4-112.2H29v70.4C74 478 167.1 544.3 272 544.3z"
                fill="#34A853"
              />
              <path
                d="M119.6 323.5c-10.7-31.5-10.7-65.4 0-96.9V156.2H29c-38.5 75.5-38.5 164.6 0 240.1l90.6-72.8z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.1c39.9 0 75.8 13.7 104.0 40.7l78.1-78.1C407 25.8 345.4 0 272 0 167.1 0 74 66.3 29 156.2l90.6 70.4C141.1 155 201.1 107.1 272 107.1z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          {/* Facebook Login */}
          <Button
            variant="outline"
            className="flex items-center justify-center gap-8 w-90"
            onClick={handleFacebook}
          >
            {/* Facebook SVG */}
            <svg className="w-4 h-4" viewBox="0 0 320 512">
              <path
                fill="#1877F2"
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S266.43 0 225.36 0C141.09 0 89.36 44.38 89.36 124.72V195.3H0v92.7h89.36V512h107.8V288z"
              />
            </svg>
            Sign in with Facebook
          </Button>
        </div>
      </Tabs>
    </div>
  );
}
