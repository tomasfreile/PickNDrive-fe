"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface VehicleFeaturesProps {
  features: string[]
  selectedFeatures: string[]
  onFeatureToggle: (feature: string) => void
}

export function VehicleFeatures({ features, selectedFeatures, onFeatureToggle }: VehicleFeaturesProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Vehicle Features</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((feature) => (
          <div
            key={feature}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedFeatures.includes(feature)
                ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onFeatureToggle(feature)}
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedFeatures.includes(feature)}
                onChange={() => onFeatureToggle(feature)}
                className="pointer-events-none"
              />
              <span className="text-sm">{feature}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
