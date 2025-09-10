"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VehicleBasicData {
  brand: string
  model: string
  year: string
}

interface BasicInformationProps {
  vehicleData: VehicleBasicData
  availableBrands: string[]
  onDataChange: (field: keyof VehicleBasicData, value: string) => void
}

export function BasicInformation({ vehicleData, availableBrands, onDataChange }: BasicInformationProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i)

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Basic Information</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <Select value={vehicleData.brand} onValueChange={(value) => onDataChange("brand", value)}>
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
              onChange={(e) => onDataChange("model", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <Select value={vehicleData.year} onValueChange={(value) => onDataChange("year", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
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
  )
}
