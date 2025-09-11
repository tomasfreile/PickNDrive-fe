"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type { VehicleFeature } from "@/lib/vehicle-data"

interface VehicleFeaturesProps {
  features: VehicleFeature[]
  selectedFeatures: string[]
  onFeatureToggle: (featureId: string) => void
}

export function VehicleFeatures({ features, selectedFeatures, onFeatureToggle }: VehicleFeaturesProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Vehicle Features</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedFeatures.includes(feature.id)
                ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onFeatureToggle(feature.id)}
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedFeatures.includes(feature.id)}
                onChange={() => onFeatureToggle(feature.id)}
                className="pointer-events-none"
              />
              <span className="text-sm">{feature.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
