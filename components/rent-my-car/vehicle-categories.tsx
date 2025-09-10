"use client"

import type { VehicleCategories } from "@/lib/vehicle-data"

interface VehicleCategoriesProps {
  categories: VehicleCategories
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function VehicleCategoryList({ categories, selectedCategory, onCategoryChange }: VehicleCategoriesProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Vehicle Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(categories).map(([key, category]) => (
          <div
            key={key}
            className={`p-4 border rounded-lg cursor-pointer transition-colors text-center ${
              selectedCategory === key
                ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onCategoryChange(key)}
          >
            <div className="font-medium">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
