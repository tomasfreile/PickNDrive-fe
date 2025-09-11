"use client"

import { DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"

interface PricingSectionProps {
  pricePerDay: string
  onPriceChange: (value: string) => void
}

export function PricingSection({ pricePerDay, onPriceChange }: PricingSectionProps) {
  const numericPrice = Number.parseFloat(pricePerDay) || 0

  return (
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
            min="0"
            step="0.5"
            value={pricePerDay}
            onChange={(e) => onPriceChange(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-brand-primary-light p-4 rounded-lg mt-4">
        <h4 className="font-medium text-brand-primary mb-2">Rate Information</h4>
        <div className="space-y-1 text-sm text-brand-primary">
          <div className="flex justify-between">
            <span>Your daily rate:</span>
            <span>${numericPrice.toFixed(2)}</span>
          </div>
          <p className="text-xs mt-2">Renters will contact you directly to arrange payment and pickup details.</p>
        </div>
      </div>
    </div>
  )
}
