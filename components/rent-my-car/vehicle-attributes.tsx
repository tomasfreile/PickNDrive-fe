"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { VehicleAttribute } from "@/lib/vehicle-data"

interface VehicleAttributesProps {
  attributes: VehicleAttribute[]
  selectedAttributes: Record<string, string>
  onAttributeChange: (key: string, value: string) => void
}

export function VehicleAttributes({ attributes, selectedAttributes, onAttributeChange }: VehicleAttributesProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Vehicle Attributes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attributes.map((attribute) => (
          <div key={attribute.id}>
            <label className="block text-sm font-medium mb-2">{attribute.attribute.charAt(0).toUpperCase() + attribute.attribute.slice(1)}</label>
            <Select value={selectedAttributes[attribute.attribute] || ""} onValueChange={(value) => onAttributeChange(attribute.attribute, value)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${attribute.attribute}`} />
              </SelectTrigger>
              <SelectContent>
                {attribute.options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.value}
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
