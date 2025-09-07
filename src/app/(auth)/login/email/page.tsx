"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginWithEmailPage() {
  const [showPassword, setShowPassword] = useState(false);

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    console.log("Submitting Login Form...");
    console.log({
      email,
      password,
    });
    alert("Login submitted! Check the browser console (F12) to see the data.");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          &larr; Back
        </Link>
        <CardTitle>Login with email</CardTitle>
        <CardDescription>
          Login using your email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email or Username</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="emailid@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-7 h-7 w-7"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground flex justify-between">
          <Link
            href="#"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            Forgot password
          </Link>
          <Link
            href="/register"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            Create New Account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}