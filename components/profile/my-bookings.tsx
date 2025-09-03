"use client"

import { Calendar, MessageSquare } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Booking {
  id: number
  vehicle: string
  vehicleImage: string
  renter?: string
  owner?: string
  date: string
  status: string
  rating: number | null
  type: "as_owner" | "as_renter"
  needsReview: boolean
}

interface MyBookingsProps {
  bookings: Booking[]
  onReviewClick: (booking: Booking) => void
}

export function MyBookings({ bookings, onReviewClick }: MyBookingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
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
                  <Badge variant={booking.status === "Completed" ? "default" : "secondary"}>{booking.status}</Badge>
                  {booking.needsReview && booking.status === "Completed" && booking.type === "as_renter" && (
                    <Button size="sm" variant="outline" onClick={() => onReviewClick(booking)} className="w-full">
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
  )
}
