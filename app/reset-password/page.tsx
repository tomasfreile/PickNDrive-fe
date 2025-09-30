"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    setToken(tokenParam)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to reset password")
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Invalid Reset Link</CardTitle>
            <CardDescription>
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/forgot-password">
              <Button className="w-full">Request new reset link</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Password reset successful</CardTitle>
            <CardDescription>
              Your password has been successfully reset. You can now sign in with your new password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Go to sign in</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
