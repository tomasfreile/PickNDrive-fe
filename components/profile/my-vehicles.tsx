"use client"

import { Star, Calendar, Car } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Vehicle {
  id: number
  title: string
  image: string
  price: number
  rating: number
  totalReviews: number
  status: string
  rentalDates: Array<{
    startDate: string
    endDate: string
    renterName: string
  }>
}

interface MyVehiclesProps {
  vehicles: Vehicle[]
}

export function MyVehicles({ vehicles }: MyVehiclesProps) {
  return (
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
        {vehicles.length > 0 ? (
          <div className="space-y-6">
            {vehicles.map((vehicle) => (
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
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
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
  )
}
