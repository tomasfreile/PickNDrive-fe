"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, User, Mail, Lock, Phone, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Logo } from "@/components/logo"

interface Location {
  id: string
  name: string
  state: string
  country: string
}

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [locations, setLocations] = useState<Location[]>([])
  const [loadingLocations, setLoadingLocations] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true)
      try {
        // Using REST Countries API to get Argentine provinces/cities
        // In a real app, you'd use a proper location API like Google Places or similar
        const response = await fetch("https://api.countrystatecity.in/v1/countries/AR/states", {
          headers: {
            "X-CSCAPI-KEY": "YOUR_API_KEY_HERE", // You'd need to get an API key
          },
        })

        if (!response.ok) {
          // Fallback to static data if API fails
          throw new Error("API failed")
        }

        const data = await response.json()
        const formattedLocations = data.map((state: any) => ({
          id: state.iso2,
          name: state.name,
          state: state.name,
          country: "Argentina",
        }))
        setLocations(formattedLocations)
      } catch (error) {
        // Fallback to static Argentine provinces/cities
        const fallbackLocations: Location[] = [
          { id: "caba", name: "Ciudad Autónoma de Buenos Aires", state: "CABA", country: "Argentina" },
          { id: "la_plata", name: "La Plata", state: "Buenos Aires", country: "Argentina" },
          { id: "mar_del_plata", name: "Mar del Plata", state: "Buenos Aires", country: "Argentina" },
          { id: "cordoba", name: "Córdoba", state: "Córdoba", country: "Argentina" },
          { id: "rosario", name: "Rosario", state: "Santa Fe", country: "Argentina" },
          { id: "mendoza", name: "Mendoza", state: "Mendoza", country: "Argentina" },
          { id: "tucuman", name: "San Miguel de Tucumán", state: "Tucumán", country: "Argentina" },
          { id: "salta", name: "Salta", state: "Salta", country: "Argentina" },
          { id: "santa_fe", name: "Santa Fe", state: "Santa Fe", country: "Argentina" },
          { id: "san_juan", name: "San Juan", state: "San Juan", country: "Argentina" },
          { id: "resistencia", name: "Resistencia", state: "Chaco", country: "Argentina" },
          { id: "neuquen", name: "Neuquén", state: "Neuquén", country: "Argentina" },
          { id: "formosa", name: "Formosa", state: "Formosa", country: "Argentina" },
          { id: "san_luis", name: "San Luis", state: "San Luis", country: "Argentina" },
          { id: "catamarca", name: "San Fernando del Valle de Catamarca", state: "Catamarca", country: "Argentina" },
          { id: "la_rioja", name: "La Rioja", state: "La Rioja", country: "Argentina" },
          { id: "jujuy", name: "San Salvador de Jujuy", state: "Jujuy", country: "Argentina" },
          {
            id: "santiago_del_estero",
            name: "Santiago del Estero",
            state: "Santiago del Estero",
            country: "Argentina",
          },
          { id: "posadas", name: "Posadas", state: "Misiones", country: "Argentina" },
          { id: "corrientes", name: "Corrientes", state: "Corrientes", country: "Argentina" },
          { id: "parana", name: "Paraná", state: "Entre Ríos", country: "Argentina" },
          { id: "viedma", name: "Viedma", state: "Río Negro", country: "Argentina" },
          { id: "rawson", name: "Rawson", state: "Chubut", country: "Argentina" },
          { id: "rio_gallegos", name: "Río Gallegos", state: "Santa Cruz", country: "Argentina" },
          { id: "ushuaia", name: "Ushuaia", state: "Tierra del Fuego", country: "Argentina" },
        ]
        setLocations(fallbackLocations)
      } finally {
        setLoadingLocations(false)
      }
    }

    fetchLocations()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate successful login - in a real app, you'd validate credentials
    const mockUser = {
      firstName: loginData.email.split("@")[0],
      lastName: "",
      email: loginData.email,
      avatar: "/placeholder.svg",
    }

    // Store user data in localStorage to persist across page reloads
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", JSON.stringify(mockUser))

    console.log("Login successful:", loginData.email)
    // Redirect to home page or previous page
    router.push("/")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    if (!registerData.location) {
      alert("Please select your location")
      return
    }

    // Simulate successful registration
    const newUser = {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      avatar: "/placeholder.svg",
    }

    // Store user data in localStorage
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    console.log("Registration successful:", registerData)
    // Redirect to home page
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">
            <Link href="/" className="flex items-center space-x-2 absolute left-0">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Back to home</span>
            </Link>
            <div className="flex-1 flex justify-center">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Welcome to PickNDrive</CardTitle>
              <p className="text-gray-600 mt-2">Sign in or create an account to continue</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign in</TabsTrigger>
                  <TabsTrigger value="register">Sign up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6">
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
                    <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary-dark">
                      Sign in
                    </Button>
                  </form>
                  <div className="text-center">
                    <a href="#" className="text-sm text-brand-primary hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-6">
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
                          placeholder="+54 11 1234 5678"
                          className="pl-10"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select
                        value={registerData.location}
                        onValueChange={(value) => setRegisterData({ ...registerData, location: value })}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <SelectValue placeholder={loadingLocations ? "Loading locations..." : "Select your city"} />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {loadingLocations ? (
                            <SelectItem value="loading" disabled>
                              Loading locations...
                            </SelectItem>
                          ) : (
                            locations.map((location) => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.name}, {location.state}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
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
                    <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary-dark">
                      Create account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
