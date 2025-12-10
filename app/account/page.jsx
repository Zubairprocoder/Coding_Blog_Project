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
import { useUser } from "@/lib/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function AuthTabs() {
  const router = useRouter();
  const { login, signup, googleLogin, facebookLogin, user } = useAuth();
  const { setUserInfo } = useUser();

  // Already logged in → redirect to home
  React.useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const [tab, setTab] = React.useState("signin");

  // -----------------------
  // SIGNIN FORM
  // -----------------------
  const signInForm = useForm({ defaultValues: { email: "", password: "" } });
  const {
    handleSubmit: handleSignIn,
    control: controlSignIn,
    reset: resetSignIn,
    formState: { errors: signInErrors },
  } = signInForm;

  // -----------------------
  // SIGNUP FORM
  // -----------------------
  const signUpForm = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });

  const {
    handleSubmit: handleSignUp,
    control: controlSignUp,
    reset: resetSignUp,
    formState: { errors: signUpErrors },
  } = signUpForm;

  // -----------------------
  // SIGN IN HANDLER
  // -----------------------
  const onSignIn = async (data) => {
    try {
      const result = await login(data.email, data.password);

      setUserInfo({
        name: result.user.displayName || data.email.split("@")[0],
        email: result.user.email,
        img: result.user.photoURL || "",
      });

      toast.success("Signed in successfully!");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Sign in failed!");
    }
  };

  // -----------------------
  // SIGN UP HANDLER
  // -----------------------
  const onSignUp = async (data) => {
    try {
      const result = await signup(data.email, data.password);

      setUserInfo({
        name: data.name,
        email: data.email,
        img: "",
      });

      toast.success("Account created!");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Sign up failed!");
    }
  };

  // -----------------------
  // SOCIAL LOGIN HANDLER
  // -----------------------
  const handleSocialLogin = async (providerLogin) => {
    try {
      const result = await providerLogin();
      const user = result.user;

      setUserInfo({
        name: user.displayName || "",
        email: user.email,
        img: user.photoURL || "",
      });

      toast.success(`Signed in as ${user.displayName || user.email}`);
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Social login failed!");
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-8 mx-auto py-12 px-4 sm:px-6">
      <Toaster position="top-center" />

      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="gap-4">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* ---------------- SIGN IN ---------------- */}
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Email and password login</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSignIn(onSignIn)} className="space-y-4">
                {/* Email */}
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

                {/* Password */}
                <Controller
                  name="password"
                  control={controlSignIn}
                  rules={{
                    required: "Password required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Password</Label>
                      <Input {...field} type="password" placeholder="******" />
                      {signInErrors.password && (
                        <p className="text-red-600 text-sm">
                          {signInErrors.password.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <CardFooter className="pt-2">
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- SIGN UP ---------------- */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create your account</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSignUp(onSignUp)} className="space-y-4">
                {/* Name */}
                <Controller
                  name="name"
                  control={controlSignUp}
                  rules={{
                    required: "Name required",
                    minLength: { value: 3, message: "Min 3 chars" },
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Name</Label>
                      <Input {...field} placeholder="John Doe" />
                      {signUpErrors.name && (
                        <p className="text-red-600 text-sm">
                          {signUpErrors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Email */}
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

                {/* Password */}
                <Controller
                  name="password"
                  control={controlSignUp}
                  rules={{
                    required: "Password required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Password</Label>
                      <Input {...field} type="password" placeholder="******" />
                      {signUpErrors.password && (
                        <p className="text-red-600 text-sm">
                          {signUpErrors.password.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <CardFooter className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin(googleLogin)}
                  >
                    Continue with Google
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin(facebookLogin)}
                  >
                    Continue with Facebook
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
