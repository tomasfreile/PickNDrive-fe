"use client"

import { Star, Shield } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Vehicle {
  id: number
  title: string
  price: number
  rating: number
  reviews: number
  image: string
  owner: {
    name: string
    avatar: string
    verified: boolean
  }
  features: string[]
  available: boolean
}

interface CarCardProps {
  vehicle: Vehicle
  size?: "compact" | "large"
}

export function CarCard({ vehicle, size = "compact" }: CarCardProps) {
  const router = useRouter()
  
  const imageHeight = size === "compact" ? "h-48" : "h-56"
  const titleSize = size === "compact" ? "text-lg" : "text-xl"
  const priceSize = size === "compact" ? "text-xl" : "text-2xl"
  const padding = size === "compact" ? "p-4" : "p-6"
  const avatarSize = size === "compact" ? "h-6 w-6" : "h-8 w-8"
  const ownerTextSize = size === "compact" ? "text-xs" : "text-sm"
  const priceLabelSize = size === "compact" ? "text-xs" : "text-sm"
  
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => router.push("/car-details")}
    >
      <div className="relative">
        <Image
          src={vehicle.image}
          alt={vehicle.title}
          width={400}
          height={size === "compact" ? 200 : 250}
          className={`w-full ${imageHeight} object-cover`}
        />
        <div className={`absolute ${size === "compact" ? "top-3 right-3" : "top-4 right-4"} bg-white rounded-full ${size === "compact" ? "px-2 py-1" : "px-3 py-1"} shadow-${size === "compact" ? "md" : "lg"}`}>
          <div className="flex items-center space-x-1">
            <Star className={`${size === "compact" ? "h-3 w-3" : "h-4 w-4"} fill-yellow-400 text-yellow-400`} />
            <span className={`${size === "compact" ? "text-xs" : "text-sm"} font-medium`}>{vehicle.rating}</span>
          </div>
        </div>
      </div>
      <CardContent className={padding}>
        <h3 className={`font-bold ${titleSize} mb-2`}>{vehicle.title}</h3>
        <div className={`flex flex-wrap gap-${size === "compact" ? "1" : "2"} ${size === "compact" ? "mb-3" : "mb-4"}`}>
          {vehicle.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className={`text-xs ${size === "compact" ? "px-2 py-1" : ""}`}>
              {feature}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className={avatarSize}>
              <AvatarImage src={vehicle.owner.avatar} />
              <AvatarFallback className={size === "compact" ? "text-xs" : ""}>{vehicle.owner.name[0]}</AvatarFallback>
            </Avatar>
            <span className={`${ownerTextSize} text-gray-600`}>{vehicle.owner.name}</span>
            {vehicle.owner.verified && <Shield className={`${size === "compact" ? "h-3 w-3" : "h-4 w-4"} text-green-500`} />}
          </div>
          <div className="text-right">
            <div className={`font-bold ${priceSize} text-brand-primary`}>${vehicle.price}</div>
            <div className={`${priceLabelSize} text-gray-500`}>per day</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}