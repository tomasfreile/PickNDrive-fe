"use client"

import { useState } from "react"
import { Search, Star, Shield, Clock, DollarSign, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthModal } from "@/components/auth-modal"
import { Navbar } from "@/components/navbar"

export default function PickNDrivePrototype() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setCurrentUser({
      firstName: "María",
      lastName: "González",
      email: email,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
    })
    setIsLoggedIn(true)
    console.log("Login successful:", email)
  }

  const handleRegister = (userData: any) => {
    // Simulate registration
    setCurrentUser(userData)
    setIsLoggedIn(true)
    console.log("Registration successful:", userData)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
  }

  const featuredVehicles = [
    {
      id: 1,
      title: "Toyota Corolla 2022",
      price: 450,
      rating: 4.8,
      reviews: 23,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/toyota-corolla-2022-0.jpg-C9hYkqAiVxqQLL6MqlRwYReGlPbhpe.jpeg",
      owner: {
        name: "María González",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
        verified: true,
      },
      features: ["Automatic", "A/C", "GPS", "Bluetooth"],
      available: true,
    },
    {
      id: 2,
      title: "Honda Civic 2021",
      price: 520,
      rating: 4.9,
      reviews: 31,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NAZ_507736d0debd4e04a2b54a526b882856.jpg-VroFnn6oSQDofH73myLHKRvtWKQ1If.jpeg",
      owner: {
        name: "Carlos Ruiz",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
        verified: true,
      },
      features: ["Manual", "A/C", "Rear camera", "USB"],
      available: true,
    },
    {
      id: 4,
      title: "Chevrolet Aveo 2020",
      price: 320,
      rating: 4.6,
      reviews: 15,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chevrolet-Aveo-2020-1.jpg-YwEyyzV331WXhtHggmrCeLlFP7iCjP.jpeg",
      owner: {
        name: "Roberto Silva",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
        verified: true,
      },
      features: ["Manual", "A/C", "Radio", "Economic"],
      available: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Hero Section - Compact */}
      <section className="bg-gradient-to-r from-[#039FB6] to-[#026f82] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find your perfect car</h1>
            <p className="text-lg mb-8 text-blue-100">Rent directly from car owners</p>

            {/* Search Bar */}
            <div className="bg-white rounded-xl p-6 shadow-xl max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Start date"
                    className="h-12 text-base border-2 border-gray-200 focus:border-brand-primary focus:ring-0 rounded-lg"
                    type="date"
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="End date"
                    className="h-12 text-base border-2 border-gray-200 focus:border-brand-primary focus:ring-0 rounded-lg"
                    type="date"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <Button
                    size="lg"
                    className="h-12 bg-brand-primary hover:bg-brand-primary-dark text-base font-semibold rounded-lg"
                    onClick={() => router.push("/search")}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Cars
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Cars and Features Combined */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Available Cars */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Available cars</h2>
                <p className="text-gray-600">Ready to book now</p>
              </div>
              <Button variant="outline" onClick={() => router.push("/search")} className="hidden md:flex">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => router.push("/car-details")}
                >
                  <div className="relative">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-md">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{vehicle.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{vehicle.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {vehicle.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={vehicle.owner.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{vehicle.owner.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{vehicle.owner.name}</span>
                        {vehicle.owner.verified && <Shield className="h-3 w-3 text-green-500" />}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-brand-primary">${vehicle.price}</div>
                        <div className="text-xs text-gray-500">per day</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Button variant="outline" onClick={() => router.push("/search")}>
                View All Vehicles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Features - Compact */}
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why PickNDrive?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-brand-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-brand-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Better prices</h3>
                  <p className="text-sm text-gray-600">Direct connection, no middleman fees</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Verified owners</h3>
                <p className="text-sm text-gray-600">All car owners are identity verified</p>
              </div>
              <div className="text-center">
                <div className="bg-brand-secondary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-brand-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quick booking</h3>
                <p className="text-sm text-gray-600">Book instantly, no paperwork hassle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-12 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Got a car to rent?</h2>
          <p className="text-lg mb-6 text-blue-100">Start earning money from your vehicle</p>
          <Link href="/rent-my-car">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-brand-primary hover:bg-gray-100 font-semibold px-6 py-3"
            >
              List my car
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  )
}
