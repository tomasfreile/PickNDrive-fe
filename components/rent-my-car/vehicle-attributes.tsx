"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { VehicleAttribute } from "@/lib/vehicle-data"

interface VehicleAttributesProps {
  attributes: Record<string, VehicleAttribute>
  selectedAttributes: Record<string, string>
  onAttributeChange: (key: string, value: string) => void
}

export function VehicleAttributes({ attributes, selectedAttributes, onAttributeChange }: VehicleAttributesProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Vehicle Attributes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(attributes).map(([key, attribute]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-2">{attribute.label}</label>
            <Select value={selectedAttributes[key] || ""} onValueChange={(value) => onAttributeChange(key, value)}>
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
  )
}
