"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
  onRegister: (userData: any) => void
}

export function AuthModal({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(loginData.email, loginData.password)
    onClose()
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    onRegister(registerData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to PickNDrive</DialogTitle>
          <DialogDescription>Sign in or create an account to continue</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign in</TabsTrigger>
            <TabsTrigger value="register">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    className="pl-10 pr-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
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
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
            <div className="text-center">
              <a href="/forgot-password" className="text-sm text-brand-primary hover:underline">
                Forgot your password?
              </a>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="pl-10"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registerEmail">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="registerEmail"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+52 81 1234 5678"
                    className="pl-10"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registerPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="registerPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    className="pl-10 pr-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => alert("Google login no implementado")}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" onClick={() => alert("Facebook login no implementado")}>
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
