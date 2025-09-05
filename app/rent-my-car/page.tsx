"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, DollarSign, Camera, X, Check } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"

// Vehicle category configurations
const vehicleCategories = {
  sedan: {
    name: "Sedan",
    attributes: {
      transmission: { label: "Transmission", options: ["Automatic", "Manual"] },
      fuel: { label: "Fuel Type", options: ["Gasoline", "Hybrid", "Electric"] },
      doors: { label: "Doors", options: ["2", "4"] },
      seats: { label: "Seats", options: ["2", "4", "5"] },
    },
    features: [
      "Air conditioning",
      "GPS",
      "Bluetooth",
      "Rear camera",
      "Parking sensors",
      "Cruise control",
      "Touch screen",
      "USB/AUX",
      "Leather seats",
      "Sunroof",
      "Premium sound system",
      "Wireless charger",
    ],
  },
  suv: {
    name: "SUV",
    attributes: {
      transmission: { label: "Transmission", options: ["Automatic", "Manual"] },
      fuel: { label: "Fuel Type", options: ["Gasoline", "Hybrid", "Electric", "Diesel"] },
      drivetrain: { label: "Drivetrain", options: ["FWD", "AWD", "4WD"] },
      seats: { label: "Seats", options: ["5", "7", "8"] },
    },
    features: [
      "Air conditioning",
      "GPS",
      "Bluetooth",
      "Rear camera",
      "Parking sensors",
      "Cruise control",
      "Touch screen",
      "USB/AUX",
      "Leather seats",
      "Sunroof",
      "Premium sound system",
      "Wireless charger",
      "Roof rack",
      "Tow hitch",
      "Third row seating",
      "All-terrain tires",
    ],
  },
  hatchback: {
    name: "Hatchback",
    attributes: {
      transmission: { label: "Transmission", options: ["Automatic", "Manual"] },
      fuel: { label: "Fuel Type", options: ["Gasoline", "Hybrid", "Electric"] },
      doors: { label: "Doors", options: ["3", "5"] },
      seats: { label: "Seats", options: ["4", "5"] },
    },
    features: [
      "Air conditioning",
      "GPS",
      "Bluetooth",
      "Rear camera",
      "Parking sensors",
      "Touch screen",
      "USB/AUX",
      "Heated seats",
      "Fog lights",
    ],
  },
  coupe: {
    name: "Coupe",
    attributes: {
      transmission: { label: "Transmission", options: ["Automatic", "Manual"] },
      fuel: { label: "Fuel Type", options: ["Gasoline", "Hybrid", "Electric"] },
      doors: { label: "Doors", options: ["2"] },
      seats: { label: "Seats", options: ["2", "4"] },
    },
    features: [
      "Air conditioning",
      "GPS",
      "Bluetooth",
      "Rear camera",
      "Parking sensors",
      "Cruise control",
      "Touch screen",
      "USB/AUX",
      "Leather seats",
      "Sunroof",
      "Premium sound system",
      "Wireless charger",
      "Sport mode",
      "Performance tires",
    ],
  },
  motorcycle: {
    name: "Motorcycle",
    attributes: {
      engine: { label: "Engine Size", options: ["125cc", "250cc", "400cc", "600cc", "750cc", "1000cc+"] },
      fuel: { label: "Fuel Type", options: ["Gasoline", "Electric"] },
      type: { label: "Type", options: ["Sport", "Cruiser", "Touring", "Adventure", "Scooter"] },
    },
    features: [
      "ABS",
      "Traction control",
      "Heated grips",
      "Wind screen",
      "Side cases",
      "Top box",
      "GPS mount",
      "USB charger",
      "LED lights",
    ],
  },
  truck: {
    name: "Truck",
    attributes: {
      transmission: { label: "Transmission", options: ["Automatic", "Manual"] },
      fuel: { label: "Fuel Type", options: ["Gasoline", "Diesel", "Hybrid"] },
      drivetrain: { label: "Drivetrain", options: ["RWD", "AWD", "4WD"] },
      bedSize: { label: "Bed Size", options: ["Short", "Standard", "Long"] },
      cab: { label: "Cab Type", options: ["Regular", "Extended", "Crew"] },
    },
    features: [
      "Air conditioning",
      "GPS",
      "Bluetooth",
      "Rear camera",
      "Parking sensors",
      "Touch screen",
      "USB/AUX",
      "Bed liner",
      "Tow package",
      "Running boards",
      "Tonneau cover",
      "Tool box",
    ],
  },
}

const brands = {
  sedan: ["Toyota", "Honda", "Nissan", "Chevrolet", "Mazda", "Volkswagen", "BMW", "Mercedes-Benz", "Audi"],
  suv: ["Toyota", "Honda", "Nissan", "Chevrolet", "Ford", "Jeep", "BMW", "Mercedes-Benz", "Audi", "Volvo"],
  hatchback: ["Toyota", "Honda", "Nissan", "Chevrolet", "Mazda", "Volkswagen", "Ford"],
  coupe: ["BMW", "Mercedes-Benz", "Audi", "Chevrolet", "Ford", "Nissan", "Toyota"],
  motorcycle: ["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati", "BMW", "Harley-Davidson"],
  truck: ["Ford", "Chevrolet", "Ram", "Toyota", "Nissan", "GMC"],
}

export default function RentMyCarPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [vehicleData, setVehicleData] = useState({
    category: "",
    brand: "",
    model: "",
    year: "",
    description: "",
    pricePerDay: "",
    rules: "",
    attributes: {} as Record<string, string>,
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const router = useRouter()

  const steps = [
    { id: 1, title: "Vehicle Information", description: "Category, brand, model and basic details" },
    { id: 2, title: "Attributes & Features", description: "Vehicle specifications and equipment" },
    { id: 3, title: "Photos & Pricing", description: "Images, price and rental conditions" },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages([...uploadedImages, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(
      selectedFeatures.includes(feature)
        ? selectedFeatures.filter((f) => f !== feature)
        : [...selectedFeatures, feature],
    )
  }

  const handleAttributeChange = (attributeKey: string, value: string) => {
    setVehicleData({
      ...vehicleData,
      attributes: {
        ...vehicleData.attributes,
        [attributeKey]: value,
      },
    })
  }

  const handleCategoryChange = (category: string) => {
    // Reset dependent fields when category changes
    setVehicleData({
      ...vehicleData,
      category,
      brand: "",
      attributes: {},
    })
    setSelectedFeatures([])
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

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

  const currentCategory = vehicleData.category
    ? vehicleCategories[vehicleData.category as keyof typeof vehicleCategories]
    : null
  const availableBrands = vehicleData.category ? brands[vehicleData.category as keyof typeof brands] : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 text-center ${step.id <= currentStep ? "text-brand-primary" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium ${
                    step.id < currentStep
                      ? "bg-brand-primary text-white"
                      : step.id === currentStep
                        ? "bg-brand-primary-light text-brand-primary border-2 border-brand-primary"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <div className="text-xs font-medium">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Vehicle Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Vehicle Category</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(vehicleCategories).map(([key, category]) => (
                      <div
                        key={key}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors text-center ${
                          vehicleData.category === key
                            ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleCategoryChange(key)}
                      >
                        <div className="font-medium">{category.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {vehicleData.category && (
                  <>
                    <Separator />

                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Brand</label>
                            <Select
                              value={vehicleData.brand}
                              onValueChange={(value) => setVehicleData({ ...vehicleData, brand: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableBrands.map((brand) => (
                                  <SelectItem key={brand} value={brand.toLowerCase()}>
                                    {brand}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Model</label>
                            <Input
                              placeholder="Ex: Corolla, Civic, etc."
                              value={vehicleData.model}
                              onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Year</label>
                            <Select
                              value={vehicleData.year}
                              onValueChange={(value) => setVehicleData({ ...vehicleData, year: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Attributes and Features */}
            {currentStep === 2 && currentCategory && (
              <div className="space-y-6">
                {/* Attributes */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Vehicle Attributes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(currentCategory.attributes).map(([key, attribute]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium mb-2">{attribute.label}</label>
                        <Select
                          value={vehicleData.attributes[key] || ""}
                          onValueChange={(value) => handleAttributeChange(key, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${attribute.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {attribute.options.map((option) => (
                              <SelectItem key={option} value={option.toLowerCase()}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Vehicle Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {currentCategory.features.map((feature) => (
                      <div
                        key={feature}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedFeatures.includes(feature)
                            ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => toggleFeature(feature)}
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedFeatures.includes(feature)}
                            onChange={() => toggleFeature(feature)}
                          />
                          <span className="text-sm">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos and Pricing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Photos */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Vehicle Photos</h3>
                  <div className="text-center">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <h4 className="font-medium mb-2">Upload photos of your vehicle</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Add at least 3 photos. The first photo will be the main image.
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
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
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          {index === 0 && <Badge className="absolute bottom-1 left-1 text-xs">Main</Badge>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Daily Rate</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price per day</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Price in US dollars"
                        className="pl-10"
                        type="number"
                        value={vehicleData.pricePerDay}
                        onChange={(e) => setVehicleData({ ...vehicleData, pricePerDay: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="bg-brand-primary-light p-4 rounded-lg mt-4">
                    <h4 className="font-medium text-brand-primary mb-2">Rate Information</h4>
                    <div className="space-y-1 text-sm text-brand-primary">
                      <div className="flex justify-between">
                        <span>Your daily rate:</span>
                        <span>${vehicleData.pricePerDay || "0"}</span>
                      </div>
                      <p className="text-xs mt-2">
                        Renters will contact you directly to arrange payment and pickup details.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description and Rules */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Vehicle Description</label>
                    <Textarea
                      placeholder="Describe your vehicle, its condition, special features, etc."
                      rows={3}
                      value={vehicleData.description}
                      onChange={(e) => setVehicleData({ ...vehicleData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rental Rules</label>
                    <Textarea
                      placeholder="Ex: No smoking, return with the same fuel level, maximum 200 km per day, etc."
                      rows={3}
                      value={vehicleData.rules}
                      onChange={(e) => setVehicleData({ ...vehicleData, rules: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                {/* Terms */}
                <div className="space-y-3">
                  <h4 className="font-medium">Confirmation</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="insurance" />
                      <label htmlFor="insurance" className="text-sm">
                        I confirm that the vehicle has valid insurance
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="maintenance" />
                      <label htmlFor="maintenance" className="text-sm">
                        The vehicle is in good condition and up to date with maintenance
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm">
                        I accept the terms and conditions of PickNDrive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                Previous
              </Button>
              <div className="space-x-2">
                {currentStep < steps.length ? (
                  <Button onClick={nextStep} disabled={currentStep === 1 && !vehicleData.category}>
                    Next
                  </Button>
                ) : (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      // Here you would normally submit the form
                      alert("Vehicle listed successfully! Renters can now find and contact you.")
                      router.push("/")
                    }}
                  >
                    Publish Vehicle
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
