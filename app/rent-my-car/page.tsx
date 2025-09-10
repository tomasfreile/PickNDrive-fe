"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import { ProgressBar } from "@/components/rent-my-car/progress-bar"
import { VehicleCategoryList } from "@/components/rent-my-car/vehicle-categories"
import { BasicInformation } from "@/components/rent-my-car/basic-information"
import { PhotoUpload } from "@/components/rent-my-car/photo-upload"
import { PricingSection } from "@/components/rent-my-car/pricing-section"
import { DescriptionRules } from "@/components/rent-my-car/description-rules"
import { VehicleAttributes } from "@/components/rent-my-car/vehicle-attributes"
import { VehicleFeatures } from "@/components/rent-my-car/vehicle-features"
import { ConfirmationTerms } from "@/components/rent-my-car/confirmation-terms"
import {
  vehicleCategories,
  getCategoryData,
  getBrandsForCategory,
  type VehicleFormData,
  type VehicleStep,
} from "@/lib/vehicle-data"

interface UserData {
  firstName?: string
  lastName?: string
  email?: string
  avatar?: string
}

export default function RentMyCarPage() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [vehicleId, setVehicleId] = useState<string | null>(null)
  const [termsValid, setTermsValid] = useState<boolean>(false)

  const [vehicleData, setVehicleData] = useState<VehicleFormData>({
    category: "",
    brand: "",
    model: "",
    year: "",
    description: "",
    pricePerDay: "",
    rules: "",
    attributes: {},
  })

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  const router = useRouter()

  const steps: VehicleStep[] = [
    { id: 1, title: "Vehicle Information", description: "Category, brand, model and basic details" },
    { id: 2, title: "Photos & Pricing", description: "Images, price and rental conditions" },
    { id: 3, title: "Attributes & Features", description: "Vehicle specifications and equipment" },
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
    setVehicleData({
      ...vehicleData,
      category,
      brand: "",
      attributes: {},
    })
    setSelectedFeatures([])
  }

  const handleDataChange = (field: keyof VehicleFormData, value: string) => {
    setVehicleData({ ...vehicleData, [field]: value })
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Generate vehicle ID on first step
      const newVehicleId = `vehicle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setVehicleId(newVehicleId)
      console.log("Vehicle created:", { vehicleId: newVehicleId, ...vehicleData })
    } else if (currentStep === 2) {
      console.log("Vehicle details updated:", {
        vehicleId,
        description: vehicleData.description,
        pricePerDay: vehicleData.pricePerDay,
        images: uploadedImages.length,
      })
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePublishVehicle = () => {
    console.log("Vehicle published:", {
      vehicleId,
      vehicleData,
      attributes: vehicleData.attributes,
      features: selectedFeatures,
      images: uploadedImages.length,
      status: "active",
    })
    alert("Vehicle listed successfully! Renters can now find and contact you.")
    router.push("/")
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

  const currentCategory = getCategoryData(vehicleData.category)
  const availableBrands = getBrandsForCategory(vehicleData.category)

  // Validation functions
  const canProceedFromStep1 = (): boolean => {
    return !!(vehicleData.category && vehicleData.brand && vehicleData.model && vehicleData.year)
  }

  const canProceedFromStep2 = (): boolean => {
    return !!(vehicleData.description && vehicleData.pricePerDay && uploadedImages.length >= 1)
  }

  const canPublishVehicle = (): boolean => {
    if (!currentCategory || !termsValid) return false
    const requiredAttributes = Object.keys(currentCategory.attributes)
    return requiredAttributes.every((attr) => vehicleData.attributes[attr])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />

      <ProgressBar steps={steps} currentStep={currentStep} progress={progress} />

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
                <VehicleCategoryList
                  categories={vehicleCategories}
                  selectedCategory={vehicleData.category}
                  onCategoryChange={handleCategoryChange}
                />

                {vehicleData.category && (
                  <>
                    <Separator />
                    <BasicInformation
                      vehicleData={vehicleData}
                      availableBrands={availableBrands}
                      onDataChange={handleDataChange}
                    />
                  </>
                )}
              </div>
            )}

            {/* Step 2: Photos and Pricing */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <PhotoUpload
                  uploadedImages={uploadedImages}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={removeImage}
                />

                <Separator />

                <PricingSection
                  pricePerDay={vehicleData.pricePerDay}
                  onPriceChange={(value) => handleDataChange("pricePerDay", value)}
                />

                <Separator />

                <DescriptionRules
                  description={vehicleData.description}
                  rules={vehicleData.rules}
                  onDescriptionChange={(value) => handleDataChange("description", value)}
                  onRulesChange={(value) => handleDataChange("rules", value)}
                />
              </div>
            )}

            {/* Step 3: Attributes and Features */}
            {currentStep === 3 && currentCategory && (
              <div className="space-y-6">
                <VehicleAttributes
                  attributes={currentCategory.attributes}
                  selectedAttributes={vehicleData.attributes}
                  onAttributeChange={handleAttributeChange}
                />

                <Separator />

                <VehicleFeatures
                  features={currentCategory.features}
                  selectedFeatures={selectedFeatures}
                  onFeatureToggle={toggleFeature}
                />

                <Separator />

                <ConfirmationTerms onValidationChange={setTermsValid} />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                Previous
              </Button>
              <div className="space-x-2">
                {currentStep < steps.length ? (
                  <Button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !canProceedFromStep1()) || (currentStep === 2 && !canProceedFromStep2())
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handlePublishVehicle}
                    disabled={!canPublishVehicle()}
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
