"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Car,
  Edit,
  Camera,
  Shield,
  Award,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" })
  const [isLoggedIn] = useState(true)
  const [currentUser] = useState({
    firstName: "Maria",
    lastName: "Gonzalez",
    email: "maria.gonzalez@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
  })

  const [userData, setUserData] = useState({
    firstName: "Maria",
    lastName: "Gonzalez",
    email: "maria.gonzalez@email.com",
    phone: "+52 81 1234 5678",
    location: "Monterrey, Nuevo Leon",
    memberSince: "2023",
    bio: "Travel enthusiast and responsible driver. I love meeting new people and helping others with their transportation needs.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
  })

  const userStats = {
    totalTripsAsOwner: 47,
    totalTripsAsRenter: 12,
  }

  const myVehicles = [
    {
      id: 1,
      title: "Toyota Corolla 2022",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop&auto=format",
      price: 450,
      rating: 4.8,
      totalReviews: 23,
      status: "Active",
      rentalDates: [
        { startDate: "2024-12-15", endDate: "2024-12-18", renterName: "Carlos Ruiz" },
        { startDate: "2024-12-22", endDate: "2024-12-25", renterName: "Ana López" },
        { startDate: "2025-01-05", endDate: "2025-01-08", renterName: "Luis Martínez" },
      ],
    },
  ]

  const recentBookings = [
    {
      id: 1,
      vehicle: "Honda Civic 2021",
      vehicleImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&auto=format",
      renter: "Carlos Ruiz",
      date: "Nov 15-20, 2024",
      status: "Completed",
      rating: null,
      type: "as_owner",
      needsReview: false,
    },
    {
      id: 2,
      vehicle: "Nissan Sentra 2023",
      vehicleImage: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop&auto=format",
      owner: "Ana Lopez",
      date: "Nov 8-10, 2024",
      status: "Completed",
      rating: null,
      type: "as_renter",
      needsReview: true,
    },
    {
      id: 3,
      vehicle: "Toyota Corolla 2022",
      vehicleImage: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop&auto=format",
      renter: "Luis Martinez",
      date: "Dec 1-3, 2024",
      status: "Confirmed",
      rating: null,
      type: "as_owner",
      needsReview: false,
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving user data:", userData)
  }

  const handleReviewSubmit = () => {
    console.log("Submitting vehicle review:", { booking: selectedBooking, review: reviewData })
    // Update the booking to mark as reviewed
    setIsReviewModalOpen(false)
    setSelectedBooking(null)
    setReviewData({ rating: 0, comment: "" })
    alert("Vehicle review submitted successfully!")
  }

  const openReviewModal = (booking: any) => {
    setSelectedBooking(booking)
    setIsReviewModalOpen(true)
  }

  const handleLogout = () => {
    alert("Signing out...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">
                        {userData.firstName[0]}
                        {userData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-transparent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-center space-x-2">
                      <h1 className="text-2xl font-bold">
                        {userData.firstName} {userData.lastName}
                      </h1>
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-gray-600">{userData.location}</p>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Member since</span>
                    <span className="font-medium">{userData.memberSince}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userStats.totalTripsAsOwner}</div>
                    <div className="text-sm text-gray-600">Trips as owner</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userStats.totalTripsAsRenter}</div>
                    <div className="text-sm text-gray-600">Trips as renter</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Personal Information</TabsTrigger>
                <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Personal Information</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="First Name"
                            className="pl-10"
                            value={userData.firstName}
                            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <Input
                          placeholder="Last Name"
                          value={userData.lastName}
                          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="tel"
                          placeholder="Phone"
                          className="pl-10"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="City, State"
                          className="pl-10"
                          value={userData.location}
                          onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md resize-none"
                        rows={4}
                        placeholder="Tell us a little about yourself..."
                        value={userData.bio}
                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vehicles" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>My Vehicles</CardTitle>
                      <Link href="/rent-my-car">
                        <Button>Add Vehicle</Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {myVehicles.length > 0 ? (
                      <div className="space-y-6">
                        {myVehicles.map((vehicle) => (
                          <div key={vehicle.id} className="border rounded-lg p-6">
                            <div className="flex items-start space-x-4 mb-4">
                              <Image
                                src={vehicle.image || "/placeholder.svg"}
                                alt={vehicle.title}
                                width={120}
                                height={90}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{vehicle.title}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                  <span>${vehicle.price}/day</span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{vehicle.rating}</span>
                                    <span>({vehicle.totalReviews} reviews)</span>
                                  </div>
                                </div>
                                <Badge variant={vehicle.status === "Active" ? "default" : "secondary"} className="mb-3">
                                  {vehicle.status}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <Link href="/car-details">
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>

                            {/* Rental Dates Section */}
                            <div className="border-t pt-4">
                              <h4 className="font-medium text-gray-900 mb-3">Upcoming Rentals</h4>
                              {vehicle.rentalDates.length > 0 ? (
                                <div className="space-y-2">
                                  {vehicle.rentalDates.map((rental, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <div>
                                          <div className="text-sm font-medium">
                                            {new Date(rental.startDate).toLocaleDateString()} -{" "}
                                            {new Date(rental.endDate).toLocaleDateString()}
                                          </div>
                                          <div className="text-xs text-gray-600">Rented by {rental.renterName}</div>
                                        </div>
                                      </div>
                                      <Badge variant="outline" className="text-xs">
                                        {new Date(rental.startDate) > new Date() ? "Confirmed" : "Ongoing"}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-600">No upcoming rentals</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">You have no registered vehicles</h3>
                        <p className="text-gray-600 mb-4">Add your first vehicle to start earning income</p>
                        <Link href="/rent-my-car">
                          <Button>Add my first vehicle</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex items-center space-x-4">
                            <Image
                              src={booking.vehicleImage || "/placeholder.svg"}
                              alt={booking.vehicle}
                              width={80}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{booking.vehicle}</h3>
                              <p className="text-gray-600">
                                {booking.type === "as_owner" ? `Renter: ${booking.renter}` : `Owner: ${booking.owner}`}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {booking.type === "as_owner" ? "As Owner" : "As Renter"}
                                </div>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <Badge variant={booking.status === "Completed" ? "default" : "secondary"}>
                                {booking.status}
                              </Badge>
                              {booking.needsReview &&
                                booking.status === "Completed" &&
                                booking.type === "as_renter" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openReviewModal(booking)}
                                    className="w-full"
                                  >
                                    <MessageSquare className="h-3 w-3 mr-1" />
                                    Review Vehicle
                                  </Button>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Vehicle Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Vehicle</DialogTitle>
            <DialogDescription>Share your experience with the vehicle: {selectedBooking?.vehicle}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewData({ ...reviewData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= reviewData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Comment about the vehicle</label>
              <Textarea
                placeholder="How was the vehicle condition, cleanliness, fuel efficiency, etc.?"
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReviewSubmit} disabled={reviewData.rating === 0}>
                Submit Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
