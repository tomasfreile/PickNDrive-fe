"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { CarCard } from "@/components/car-card"

export default function SearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [sortBy, setSortBy] = useState("price")
  const [sortDirection, setSortDirection] = useState<"none" | "asc" | "desc">("none")
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  // Add useEffect to check localStorage on component mount
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

  const vehicles = [
    {
      id: 1,
      title: "Toyota Corolla 2022",
      price: 450,
      rating: 4.8,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop&auto=format",
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
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&auto=format",
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
      id: 3,
      title: "Nissan Sentra 2023",
      price: 480,
      rating: 4.7,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop&auto=format",
      owner: {
        name: "Ana López",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
        verified: true,
      },
      features: ["Automatic", "A/C", "Backup camera", "Bluetooth"],
      available: true,
    },
    {
      id: 4,
      title: "Chevrolet Aveo 2020",
      price: 320,
      rating: 4.6,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop&auto=format",
      owner: {
        name: "Roberto Silva",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
        verified: true,
      },
      features: ["Manual", "A/C", "Radio", "Economic"],
      available: true,
    },
    {
      id: 5,
      title: "Hyundai Elantra 2022",
      price: 460,
      rating: 4.8,
      reviews: 27,
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop&auto=format",
      owner: {
        name: "Luis Martínez",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
        verified: true,
      },
      features: ["Automatic", "A/C", "Apple CarPlay", "Lane assist"],
      available: true,
    },
    {
      id: 6,
      title: "Kia Rio 2021",
      price: 380,
      rating: 4.5,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&auto=format",
      owner: {
        name: "Carmen Rodríguez",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format",
        verified: true,
      },
      features: ["Manual", "A/C", "USB", "Compact"],
      available: true,
    },
  ]

  const handleSortToggle = () => {
    if (sortDirection === "none") {
      setSortDirection("asc")
    } else if (sortDirection === "asc") {
      setSortDirection("desc")
    } else {
      setSortDirection("none")
    }
  }

  const getSortIcon = () => {
    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4" />
    if (sortDirection === "desc") return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
  }

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (sortDirection === "none") return 0

    let comparison = 0
    if (sortBy === "price") {
      comparison = a.price - b.price
    } else if (sortBy === "rating") {
      comparison = a.rating - b.rating
    }
    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />

      {/* Search Section */}
      <section className="bg-white border-b py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Input
                  placeholder="Start date"
                  className="h-12 text-base border-2 border-gray-200 focus:border-brand-primary focus:ring-0 rounded-lg bg-white"
                  type="date"
                />
              </div>
              <div className="relative">
                <Input
                  placeholder="End date"
                  className="h-12 text-base border-2 border-gray-200 focus:border-brand-primary focus:ring-0 rounded-lg bg-white"
                  type="date"
                />
              </div>
              <div className="flex flex-col justify-end">
                <Button
                  size="lg"
                  className="h-12 bg-brand-primary hover:bg-brand-primary-dark text-base font-semibold rounded-lg"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Update Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{vehicles.length} vehicles available</h1>
              <p className="text-gray-600">Choose your perfect car</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleSortToggle} className="p-2 bg-transparent">
                  {getSortIcon()}
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVehicles.map((vehicle) => (
              <CarCard key={vehicle.id} vehicle={vehicle} size="large" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
