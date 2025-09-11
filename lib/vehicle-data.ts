export interface AttributeOption {
  id: string
  value: string
}

export interface VehicleAttribute {
  id: string
  attribute: string 
  options: AttributeOption[]
}

export interface VehicleFeature {
  id: string
  name: string
}

export interface VehicleCategory {
  id: string
  name: string
  attributes: VehicleAttribute[]
  features: VehicleFeature[]
}

export type VehicleCategories = Record<string, VehicleCategory>
export type VehicleBrands = Record<string, string[]>

export interface VehicleFormData {
  category: string
  brand: string
  model: string
  year: string
  description: string
  pricePerDay: string
  rules: string
  attributes: Record<string, string> // attributeName -> optionId
  features: string[] // array of feature IDs
}

export interface VehicleStep {
  id: number
  title: string
  description: string
}

// Mock data for development - will be replaced with API calls
export const vehicleCategories: VehicleCategories = {
  sedan: {
    id: "1",
    name: "Sedan",
    attributes: [
      {
        id: "1",
        attribute: "transmission",
        options: [
          { id: "1", value: "Automatic" },
          { id: "2", value: "Manual" }
        ]
      },
      {
        id: "2",
        attribute: "fuel",
        options: [
          { id: "3", value: "Gasoline" },
          { id: "4", value: "Hybrid" },
          { id: "5", value: "Electric" }
        ]
      },
      {
        id: "3",
        attribute: "doors",
        options: [
          { id: "6", value: "2" },
          { id: "7", value: "4" }
        ]
      },
      {
        id: "4",
        attribute: "seats",
        options: [
          { id: "8", value: "2" },
          { id: "9", value: "4" },
          { id: "10", value: "5" }
        ]
      }
    ],
    features: [
      { id: "1", name: "Air conditioning" },
      { id: "2", name: "GPS" },
      { id: "3", name: "Bluetooth" },
      { id: "4", name: "Rear camera" },
      { id: "5", name: "Parking sensors" },
      { id: "6", name: "Cruise control" },
      { id: "7", name: "Touch screen" },
      { id: "8", name: "USB/AUX" },
    ]
  },
  suv: {
    id: "2",
    name: "SUV",
    attributes: [
      {
        id: "5",
        attribute: "transmission",
        options: [
          { id: "11", value: "Automatic" },
          { id: "12", value: "Manual" }
        ]
      },
      {
        id: "6",
        attribute: "fuel",
        options: [
          { id: "13", value: "Gasoline" },
          { id: "14", value: "Hybrid" },
          { id: "15", value: "Electric" },
          { id: "16", value: "Diesel" }
        ]
      },
      {
        id: "7",
        attribute: "drivetrain",
        options: [
          { id: "17", value: "FWD" },
          { id: "18", value: "AWD" },
          { id: "19", value: "4WD" }
        ]
      },
      {
        id: "8",
        attribute: "seats",
        options: [
          { id: "20", value: "5" },
          { id: "21", value: "7" },
          { id: "22", value: "8" }
        ]
      }
    ],
    features: [
      { id: "13", name: "Air conditioning" },
      { id: "14", name: "GPS" },
      { id: "15", name: "Bluetooth" },
      { id: "16", name: "Rear camera" },
      { id: "17", name: "Parking sensors" },
      { id: "18", name: "Cruise control" },
      { id: "19", name: "Touch screen" },
      { id: "20", name: "USB/AUX" },
    ]
  },
  motorcycle: {
    id: "3",
    name: "Motorcycle",
    attributes: [
      {
        id: "9",
        attribute: "engine",
        options: [
          { id: "23", value: "125cc" },
          { id: "24", value: "250cc" },
          { id: "25", value: "400cc" },
          { id: "26", value: "600cc" },
          { id: "27", value: "750cc" },
          { id: "28", value: "1000cc+" }
        ]
      },
      {
        id: "10",
        attribute: "fuel",
        options: [
          { id: "29", value: "Gasoline" },
          { id: "30", value: "Electric" }
        ]
      },
      {
        id: "11",
        attribute: "type",
        options: [
          { id: "31", value: "Sport" },
          { id: "32", value: "Cruiser" },
          { id: "33", value: "Touring" },
          { id: "34", value: "Adventure" },
          { id: "35", value: "Scooter" }
        ]
      }
    ],
    features: [
      { id: "21", name: "ABS" },
      { id: "22", name: "Traction control" },
      { id: "23", name: "Heated grips" },
      { id: "24", name: "Wind screen" },
      { id: "25", name: "Side cases" },
      { id: "26", name: "Top box" },
      { id: "27", name: "GPS mount" },
      { id: "28", name: "USB charger" },
      { id: "29", name: "LED lights" }
    ]
  }
}

export const brands: VehicleBrands = {
  sedan: ["Toyota", "Honda", "Nissan", "Chevrolet", "Mazda", "Volkswagen", "BMW", "Mercedes-Benz", "Audi"],
  suv: ["Toyota", "Honda", "Nissan", "Chevrolet", "Ford", "Jeep", "BMW", "Mercedes-Benz", "Audi", "Volvo"],
  motorcycle: ["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati", "BMW", "Harley-Davidson"],
}

// Helper function to get category data safely
export const getCategoryData = (categoryKey: string): VehicleCategory | null => {
  return vehicleCategories[categoryKey] || null
}

// Helper function to get brands for category safely
export const getBrandsForCategory = (categoryKey: string): string[] => {
  return brands[categoryKey] || []
}

// Helper functions for working with the unified types
export const getAttributeById = (attributes: VehicleAttribute[], id: string): VehicleAttribute | undefined => {
  return attributes.find(attr => attr.id === id)
}

export const getAttributeByName = (attributes: VehicleAttribute[], name: string): VehicleAttribute | undefined => {
  return attributes.find(attr => attr.attribute === name)
}

export const getOptionById = (options: AttributeOption[], id: string): AttributeOption | undefined => {
  return options.find(opt => opt.id === id)
}

export const getFeatureById = (features: VehicleFeature[], id: string): VehicleFeature | undefined => {
  return features.find(feature => feature.id === id)
}
