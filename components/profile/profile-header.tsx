"use client"

import { Camera, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface ProfileHeaderProps {
  userData: {
    firstName: string
    lastName: string
    location: string
    memberSince: string
    avatar: string
  }
}

export function ProfileHeader({ userData }: ProfileHeaderProps) {
  return (
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
  )
}
