"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Star, Shield, Car, Users, Fuel, Settings, Calendar } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"

export default function CarDetailsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
    const storedUser = localStorage.getItem("currentUser")

    if (storedIsLoggedIn === "true" && storedUser) {
      setIsLoggedIn(true)
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    setIsLoggedIn(false)
  }

  const vehicle = {
    id: 1,
    title: "Toyota Corolla 2022",
    price: 450,
    rating: 4.8,
    reviews: 23,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/toyota-corolla-2022-0.jpg-C9hYkqAiVxqQLL6MqlRwYReGlPbhpe.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NAZ_507736d0debd4e04a2b54a526b882856.jpg-VroFnn6oSQDofH73myLHKRvtWKQ1If.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chevrolet-Aveo-2020-1.jpg-YwEyyzV331WXhtHggmrCeLlFP7iCjP.jpeg",
    ],
    owner: {
      name: "María González",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      verified: true,
      memberSince: "2022",
      rating: 4.9,
      trips: 47,
    },
    features: ["Automatic", "A/C", "GPS", "Bluetooth", "Backup Camera", "USB Ports"],
    specifications: {
      year: "2022",
      seats: "5",
      transmission: "Automatic",
      fuel: "Gasoline",
      doors: "4",
      category: "Sedan",
    },
    description:
      "Perfect car for city driving and short trips. Very comfortable and fuel efficient. The car is well maintained and always clean. Ideal for business trips or family outings.",
    available: true,
  }

  const reviews = [
    {
      id: 1,
      user: "Carlos Ruiz",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      date: "December 2023",
      comment: "Excellent car and very friendly owner. Everything was perfect, highly recommended!",
    },
    {
      id: 2,
      user: "Ana López",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      date: "November 2023",
      comment: "Very clean car and in excellent condition. María was very helpful and punctual.",
    },
    {
      id: 3,
      user: "Roberto Silva",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 4,
      date: "October 2023",
      comment: "Good experience overall. The car runs great and is very comfortable.",
    },
  ]

  const handleBooking = () => {
    if (!isLoggedIn) {
      router.push("/auth")
      return
    }
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Booking request sent! The owner will contact you soon.")
    setShowBookingForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{vehicle.title}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{vehicle.rating}</span>
                    <span className="text-gray-500">({vehicle.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Image
                  src={vehicle.images[0] || "/placeholder.svg"}
                  alt={vehicle.title}
                  width={800}
                  height={400}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              {vehicle.images.slice(1).map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${vehicle.title} ${index + 2}`}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={vehicle.owner.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{vehicle.owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-semibold">{vehicle.owner.name}</span>
                      {vehicle.owner.verified && <Shield className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Member since {vehicle.owner.memberSince}</span>
                      <span>★ {vehicle.owner.rating} rating</span>
                      <span>{vehicle.owner.trips} trips</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="justify-center py-2">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Year</div>
                      <div className="font-medium">{vehicle.specifications.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Seats</div>
                      <div className="font-medium">{vehicle.specifications.seats}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Transmission</div>
                      <div className="font-medium">{vehicle.specifications.transmission}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Fuel className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Fuel</div>
                      <div className="font-medium">{vehicle.specifications.fuel}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Doors</div>
                      <div className="font-medium">{vehicle.specifications.doors}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-medium">{vehicle.specifications.category}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({reviews.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                    {index < reviews.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-primary">${vehicle.price}</span>
                    <span className="text-sm text-gray-500">per day</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showBookingForm ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start date</label>
                          <Input type="date" className="w-full" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End date</label>
                          <Input type="date" className="w-full" />
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>${vehicle.price} × 3 days</span>
                          <span>${vehicle.price * 3}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${vehicle.price * 3}</span>
                        </div>
                      </div>
                      <Button onClick={handleBooking} className="w-full" size="lg">
                        Book now
                      </Button>
                    </>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message to owner</label>
                        <Textarea placeholder="Tell the owner about your trip plans..." className="w-full" rows={3} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>${vehicle.price} × 3 days</span>
                          <span>${vehicle.price * 3}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${vehicle.price * 3}</span>
                        </div>
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        Send booking request
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowBookingForm(false)}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
