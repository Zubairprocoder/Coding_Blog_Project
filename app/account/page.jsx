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
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthTabs() {
  const { login, signup, googleLogin } = useAuth();
  const { facebookLogin } = useAuth();

  // Sign in form
  const signInForm = useForm({ defaultValues: { email: "", password: "" } });
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
      toast.error(error.message || "Sign in failed!");
      console.error("Sign in error:", error);
    }
  };

  // Sign up form
  const signUpForm = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });
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
      toast.error(error.message || "Sign up failed!");
      console.error("Sign up error:", error);
    }
  };

  // Google login
  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google!");
    } catch (error) {
      console.error("Google login error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Login popup closed. Please try again.");
      } else {
        toast.error(error.message || "Google login failed!");
      }
    }
  };

  // Facebook login
 const handleFacebook = async () => {
   try {
     const provider = new FacebookAuthProvider();
     await signInWithPopup(auth, provider);
     toast.success("Signed in with Facebook!");
   } catch (error) {
     console.error("Facebook login error:", error);

     if (error.code === "auth/popup-closed-by-user") {
       toast.error("Login popup closed. Please try again.");
     } else if (error.code === "auth/user-cancelled") {
       toast.error("Login cancelled or permission denied.");
     } else {
       toast.error(error.message || "Facebook login failed!");
     }
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
                        autoComplete="email"
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
                        autoComplete="current-password"
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
                      <Input
                        {...field}
                        placeholder="Your name"
                        autoComplete="name"
                      />
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
                        autoComplete="email"
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
                        autoComplete="new-password"
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
                      Sign in with Google
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-around gap-5"
                      onClick={handleFacebook}
                    >
                      Sign in with Facebook
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
