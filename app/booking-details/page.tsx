"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Calendar, User, Phone, Mail, Car, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"

export default function BookingDetailsPage() {
  const searchParams = useSearchParams()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [currentUser, setCurrentUser] = useState({
    firstName: "Maria",
    lastName: "Gonzalez",
    email: "maria.gonzalez@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
  })

  // Mock booking data
  const booking = {
    id: "BK-2024-001",
    status: "Active",
    vehicle: {
      title: "Toyota Corolla 2022",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop&auto=format",
      category: "Sedan"
    },
    dates: {
      start: "2024-12-16",
      end: "2024-12-19",
      duration: "3 days"
    },
    pricing: {
      dailyRate: 450,
      totalDays: 3,
      total: 1350
    },
    owner: {
      name: "María González",
      phone: "+52 81 1234 5678",
      email: "maria.gonzalez@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      verified: true
    },
    renter: {
      name: "Carlos Ruiz",
      phone: "+52 81 8765 4321",
      email: "carlos.ruiz@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      verified: true
    },
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
    alert("Signing out...")
    window.location.href = "/"
  }

  const isOwner = true // In real app, determine based on user ID

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
              <p className="text-gray-600">Booking ID: {booking.id}</p>
            </div>
            <Badge variant={booking.status === "Active" ? "default" : "secondary"}>
              {booking.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Vehicle & Booking Info */}
          <div className="space-y-6">
            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Vehicle Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={booking.vehicle.image}
                      alt={booking.vehicle.title}
                      width={100}
                      height={75}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2">{booking.vehicle.title}</h3>
                    <p className="text-gray-600 mb-3">{booking.vehicle.category}</p>
                    <Link href="/car-details" className="inline-block">
                      <Button variant="outline" size="sm">View Vehicle Details</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Booking Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <p className="text-gray-900 font-medium">{new Date(booking.dates.start).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    <p className="text-gray-900 font-medium">{new Date(booking.dates.end).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-gray-900 font-medium">{booking.dates.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact & Pricing */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{isOwner ? "Renter" : "Owner"} Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={isOwner ? booking.renter.avatar : booking.owner.avatar}
                      alt="Profile"
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{isOwner ? booking.renter.name : booking.owner.name}</h3>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm">{isOwner ? booking.renter.phone : booking.owner.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm break-all">{isOwner ? booking.renter.email : booking.owner.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Pricing Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">${booking.pricing.dailyRate}/day × {booking.pricing.totalDays} days</span>
                    <span className="font-medium">${booking.pricing.total}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-brand-primary">${booking.pricing.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}