// Type definitions for vehicle data
export interface VehicleAttribute {
  label: string
  options: string[]
}

export interface VehicleCategory {
  name: string
  attributes: Record<string, VehicleAttribute>
  features: string[]
}

// Dynamic categories and brands - will come from backend
export type VehicleCategories = Record<string, VehicleCategory>
export type VehicleBrands = Record<string, string[]>

// Vehicle form data interfaces
export interface VehicleFormData {
  category: string
  brand: string
  model: string
  year: string
  description: string
  pricePerDay: string
  rules: string
  attributes: Record<string, string>
}

export interface VehicleStep {
  id: number
  title: string
  description: string
}

// Main data exports - these will eventually come from API calls
export const vehicleCategories: VehicleCategories = {
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

export const brands: VehicleBrands = {
  sedan: ["Toyota", "Honda", "Nissan", "Chevrolet", "Mazda", "Volkswagen", "BMW", "Mercedes-Benz", "Audi"],
  suv: ["Toyota", "Honda", "Nissan", "Chevrolet", "Ford", "Jeep", "BMW", "Mercedes-Benz", "Audi", "Volvo"],
  hatchback: ["Toyota", "Honda", "Nissan", "Chevrolet", "Mazda", "Volkswagen", "Ford"],
  coupe: ["BMW", "Mercedes-Benz", "Audi", "Chevrolet", "Ford", "Nissan", "Toyota"],
  motorcycle: ["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati", "BMW", "Harley-Davidson"],
  truck: ["Ford", "Chevrolet", "Ram", "Toyota", "Nissan", "GMC"],
}

// Helper function to get category data safely
export const getCategoryData = (categoryKey: string): VehicleCategory | null => {
  return vehicleCategories[categoryKey] || null
}

// Helper function to get brands for category safely
export const getBrandsForCategory = (categoryKey: string): string[] => {
  return brands[categoryKey] || []
}

// API-related types for future backend integration
export interface ApiVehicleCategory {
  id: string
  name: string
  slug: string
  attributes: ApiVehicleAttribute[]
  features: ApiVehicleFeature[]
}

export interface ApiVehicleAttribute {
  id: string
  name: string
  label: string
  inputType: "select" | "text" | "number"
  isRequired: boolean
  options: ApiAttributeOption[]
}

export interface ApiAttributeOption {
  id: string
  value: string
  label: string
  sortOrder: number
}

export interface ApiVehicleFeature {
  id: string
  name: string
  label: string
  description?: string
}

// Helper functions for API data transformation
export const transformApiCategoryToLocal = (apiCategory: ApiVehicleCategory): VehicleCategory => {
  const attributes: Record<string, VehicleAttribute> = {}

  apiCategory.attributes.forEach((attr) => {
    attributes[attr.name] = {
      label: attr.label,
      options: attr.options.map((opt) => opt.label),
    }
  })

  return {
    name: apiCategory.name,
    attributes,
    features: apiCategory.features.map((f) => f.label),
  }
}

export const transformApiCategoriesToLocal = (apiCategories: ApiVehicleCategory[]): VehicleCategories => {
  const categories: VehicleCategories = {}

  apiCategories.forEach((apiCategory) => {
    categories[apiCategory.slug] = transformApiCategoryToLocal(apiCategory)
  })

  return categories
}
