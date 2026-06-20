"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Create user via API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Auto sign in after successful registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Registration successful, but couldn't sign in automatically. Please try logging in.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="auth-card">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="relative size-10 rounded-xl bg-gradient-to-br from-primary-indigo to-accent-cyan p-0.5 shadow-glow-indigo">
          <div className="flex size-full items-center justify-center rounded-[10px] bg-background">
            <Image
              src="/assets/images/logo-icon.svg"
              alt="DreamPix logo"
              width={22}
              height={22}
            />
          </div>
        </div>
        <Image
          src="/assets/images/logo-text.svg"
          alt="DreamPix"
          width={120}
          height={24}
          className="dark:brightness-200"
        />
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="h2-bold text-foreground">Create an Account</h1>
        <p className="body-medium text-muted-foreground">
          Join DreamPix and start creating amazing images
        </p>
      </div>

      {/* Google Sign Up */}
      <Button
        type="button"
        onClick={handleGoogleSignUp}
        variant="outline"
        className="w-full h-12 rounded-xl font-semibold mt-8 flex items-center justify-center gap-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Image
          src="https://www.google.com/favicon.ico"
          alt="Google"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        Sign up with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-sm text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="h-12 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-foreground">
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            className="h-12 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            className="h-12 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            className="h-12 rounded-xl"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="submit-button h-12 rounded-xl font-bold text-white"
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary-indigo hover:text-accent-violet font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
