"use client"

import type React from "react"
import { Upload, Camera, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PhotoUploadProps {
  uploadedImages: string[]
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: (index: number) => void
}

export function PhotoUpload({ uploadedImages, onImageUpload, onRemoveImage }: PhotoUploadProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Vehicle Photos</h3>
      <div className="text-center">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <h4 className="font-medium mb-2">Upload photos of your vehicle</h4>
          <p className="text-gray-600 text-sm mb-4">Add at least 3 photos. The first photo will be the main image.</p>
          <input type="file" multiple accept="image/*" onChange={onImageUpload} className="hidden" id="image-upload" />
          <label htmlFor="image-upload">
            <Button asChild size="sm">
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Select photos
              </span>
            </Button>
          </label>
        </div>
      </div>
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Uploaded ${index + 1}`}
                width={150}
                height={100}
                className="w-full h-20 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0"
                onClick={() => onRemoveImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
              {index === 0 && <Badge className="absolute bottom-1 left-1 text-xs">Main</Badge>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
