"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { PersonalInfoForm } from "@/components/profile/personal-info-form"
import { MyVehicles } from "@/components/profile/my-vehicles"
import { MyBookings } from "@/components/profile/my-bookings"
import { VehicleReviewModal } from "@/components/profile/vehicle-review-modal"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [currentUser, setCurrentUser] = useState({
    firstName: "Maria",
    lastName: "Gonzalez",
    email: "maria.gonzalez@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
  })
  
  // Get the tab from URL params, default to "info"
  const defaultTab = searchParams?.get('tab') || 'info'

  const [userData, setUserData] = useState({
    firstName: "Maria",
    lastName: "Gonzalez",
    email: "maria.gonzalez@email.com",
    phone: "+52 81 1234 5678",
    location: "Monterrey, Nuevo Leon",
    memberSince: "2023",
    bio: "Travel enthusiast and responsible driver. I love meeting new people and helping others with their transportation needs.",
    avatar: "https://picsum.photos/200/300",
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
        { startDate: "2024-12-10", endDate: "2024-12-13", renterName: "Roberto Silva" },
        { startDate: "2024-12-16", endDate: "2024-12-19", renterName: "Carlos Ruiz" },
        { startDate: "2024-12-22", endDate: "2024-12-25", renterName: "Ana López" },
        { startDate: "2025-01-05", endDate: "2025-01-08", renterName: "Luis Martínez" },
      ],
    },
    {
      id: 2,
      title: "Honda Civic 2023",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&auto=format",
      price: 380,
      rating: 4.6,
      totalReviews: 18,
      status: "Active",
      rentalDates: [
        { startDate: "2024-12-16", endDate: "2024-12-18", renterName: "María Fernández" },
        { startDate: "2025-01-10", endDate: "2025-01-13", renterName: "Diego Morales" },
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
      type: "as_owner" as const,
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
      type: "as_renter" as const,
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
      type: "as_owner" as const,
      needsReview: false,
    },
  ]

  // Separate bookings by type
  const renterBookings = recentBookings.filter(booking => booking.type === "as_renter")
  const ownerBookings = recentBookings.filter(booking => booking.type === "as_owner")

  const handleSavePersonalInfo = (data: any) => {
    setUserData(data)
    console.log("Saving user data:", data)
  }

  const handleReviewSubmit = (reviewData: { rating: number; comment: string }) => {
    console.log("Submitting vehicle review:", { booking: selectedBooking, review: reviewData })
    setIsReviewModalOpen(false)
    setSelectedBooking(null)
    alert("Vehicle review submitted successfully!")
  }

  const openReviewModal = (booking: any) => {
    setSelectedBooking(booking)
    setIsReviewModalOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
    alert("Signing out...")
    window.location.href = "/"
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setCurrentUser(user)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileHeader userData={userData} />
            <ProfileStats stats={userStats} />
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
                <TabsTrigger value="renter">My Trips</TabsTrigger>
                <TabsTrigger value="owner">My Rentals</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6">
                <PersonalInfoForm userData={userData} onSave={handleSavePersonalInfo} />
              </TabsContent>

              <TabsContent value="vehicles" className="space-y-6">
                <MyVehicles vehicles={myVehicles} />
              </TabsContent>

              <TabsContent value="renter" className="space-y-6">
                <MyBookings 
                  bookings={renterBookings} 
                  onReviewClick={openReviewModal}
                  title="My Trips"
                  emptyMessage="You haven't booked any trips yet. Start exploring available vehicles!"
                />
              </TabsContent>

              <TabsContent value="owner" className="space-y-6">
                <MyBookings 
                  bookings={ownerBookings} 
                  onReviewClick={openReviewModal}
                  title="My Rentals"
                  emptyMessage="No one has booked your vehicles yet. Make sure your listings are active!"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <VehicleReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        booking={selectedBooking}
        onSubmit={handleReviewSubmit}
      />
    </div>
  )
}
