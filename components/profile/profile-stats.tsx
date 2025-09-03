"use client"

import { Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileStatsProps {
  stats: {
    totalTripsAsOwner: number
    totalTripsAsRenter: number
  }
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
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
            <div className="text-2xl font-bold text-blue-600">{stats.totalTripsAsOwner}</div>
            <div className="text-sm text-gray-600">Trips as owner</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.totalTripsAsRenter}</div>
            <div className="text-sm text-gray-600">Trips as renter</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
