"use client"

import { useState } from "react"
import { Star, Calendar, Car, ChevronDown, ChevronUp, Edit3, Check, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

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
  const [expandedVehicles, setExpandedVehicles] = useState<Set<number>>(new Set())
  const [editingPrice, setEditingPrice] = useState<number | null>(null)
  const [tempPrice, setTempPrice] = useState<string>("")

  const toggleExpanded = (vehicleId: number) => {
    const newExpanded = new Set(expandedVehicles)
    if (newExpanded.has(vehicleId)) {
      newExpanded.delete(vehicleId)
    } else {
      newExpanded.add(vehicleId)
    }
    setExpandedVehicles(newExpanded)
  }

  const startEditingPrice = (vehicleId: number, currentPrice: number) => {
    setEditingPrice(vehicleId)
    setTempPrice(currentPrice.toString())
  }

  const cancelEditingPrice = () => {
    setEditingPrice(null)
    setTempPrice("")
  }

  const savePrice = (vehicleId: number) => {
    const newPrice = parseFloat(tempPrice)
    if (newPrice && newPrice > 0) {
      console.log(`Updating vehicle ${vehicleId} price to $${newPrice}`)
      // Here you would make an API call to update the price
      alert(`Price updated to $${newPrice}/day`)
    }
    setEditingPrice(null)
    setTempPrice("")
  }

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
            {vehicles.map((vehicle) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              
              // Hardcode status for demo purposes
              let activeRentals: any[] = []
              let nextRental = null
              let upcomingRentals: any[] = []
              
              if (vehicle.id === 1) {
                // Toyota Corolla - show next rental and upcoming
                nextRental = { startDate: "2024-12-22", renterName: "Ana López" }
                upcomingRentals = vehicle.rentalDates.filter(rental => {
                  const startDate = new Date(rental.startDate)
                  return startDate > today
                })
              } else if (vehicle.id === 2) {
                // Honda Civic - show as currently rented with upcoming
                activeRentals = [{ renterName: "María Fernández" }]
                upcomingRentals = vehicle.rentalDates.filter(rental => {
                  const startDate = new Date(rental.startDate)
                  return startDate > today
                })
              }

              return (
              <div key={vehicle.id} className="border rounded-lg p-6 group">
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
                      <div className="flex items-center space-x-2">
                        {editingPrice === vehicle.id ? (
                          <div className="flex items-center space-x-2">
                            <span>$</span>
                            <Input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-20 h-7 text-sm"
                              min="1"
                              step="1"
                            />
                            <span>/day</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => savePrice(vehicle.id)}
                              className="h-7 w-7 p-0"
                            >
                              <Check className="h-3 w-3 text-green-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={cancelEditingPrice}
                              className="h-7 w-7 p-0"
                            >
                              <X className="h-3 w-3 text-red-600" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <span>${vehicle.price}/day</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditingPrice(vehicle.id, vehicle.price)}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit3 className="h-3 w-3 text-gray-500" />
                            </Button>
                          </div>
                        )}
                      </div>
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

                {/* Compact Rental Status */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {activeRentals.length > 0 ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-700">Currently rented</span>
                          <span className="text-xs text-gray-600">by {activeRentals[0].renterName}</span>
                        </div>
                      ) : nextRental ? (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Next rental:</span>
                          <span className="text-sm text-gray-700">
                            {new Date(nextRental.startDate).toLocaleDateString()} by {nextRental.renterName}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <span className="text-sm text-gray-600">Available for booking</span>
                        </div>
                      )}
                    </div>
                    
                    {vehicle.rentalDates.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(vehicle.id)}
                        className="text-xs"
                      >
                        {expandedVehicles.has(vehicle.id) ? (
                          <>
                            Hide <ChevronUp className="h-3 w-3 ml-1" />
                          </>
                        ) : (
                          <>
                            View all ({vehicle.rentalDates.length}) <ChevronDown className="h-3 w-3 ml-1" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Expandable detailed view */}
                  {expandedVehicles.has(vehicle.id) && vehicle.rentalDates.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {vehicle.rentalDates.map((rental, index) => {
                        const startDate = new Date(rental.startDate)
                        const endDate = new Date(rental.endDate)
                        
                        // Hardcode status for demo
                        let status = "Upcoming"
                        let statusVariant: "outline" | "default" | "secondary" = "outline"
                        
                        if (vehicle.id === 1) {
                          // Toyota Corolla
                          if (index === 0 || index === 1) {
                            status = "Completed"
                            statusVariant = "secondary"
                          } else {
                            status = "Upcoming"
                            statusVariant = "outline"
                          }
                        } else if (vehicle.id === 2) {
                          // Honda Civic
                          if (index === 0) {
                            status = "Active"
                            statusVariant = "default"
                          } else {
                            status = "Upcoming"
                            statusVariant = "outline"
                          }
                        }
                        
                        return (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <div>
                                <div className="text-sm font-medium">
                                  {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                                </div>
                                <div className="text-xs text-gray-600">Renter: {rental.renterName}</div>
                              </div>
                            </div>
                            <Badge variant={statusVariant} className="text-xs">
                              {status}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
              )
            })}
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
