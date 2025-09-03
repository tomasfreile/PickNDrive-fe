"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PersonalInfoFormProps {
  userData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    bio: string
  }
  onSave: (data: any) => void
}

export function PersonalInfoForm({ userData, onSave }: PersonalInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)

  const handleSave = () => {
    setIsEditing(false)
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Personal Information</CardTitle>
          <Button variant="outline" size="sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
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
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  )
}
