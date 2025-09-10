"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface ConfirmationTermsProps {
  onValidationChange?: (isValid: boolean) => void
}

export function ConfirmationTerms({ onValidationChange }: ConfirmationTermsProps) {
  const [confirmations, setConfirmations] = useState({
    insurance: false,
    maintenance: false,
    terms: false,
  })

  const handleConfirmationChange = (key: keyof typeof confirmations, checked: boolean) => {
    const newConfirmations = { ...confirmations, [key]: checked }
    setConfirmations(newConfirmations)

    // Check if all confirmations are checked
    const allConfirmed = Object.values(newConfirmations).every(Boolean)
    onValidationChange?.(allConfirmed)
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium">Confirmation</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="insurance"
            checked={confirmations.insurance}
            onCheckedChange={(checked) => handleConfirmationChange("insurance", checked as boolean)}
          />
          <label htmlFor="insurance" className="text-sm">
            I confirm that the vehicle has valid insurance
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="maintenance"
            checked={confirmations.maintenance}
            onCheckedChange={(checked) => handleConfirmationChange("maintenance", checked as boolean)}
          />
          <label htmlFor="maintenance" className="text-sm">
            The vehicle is in good condition and up to date with maintenance
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={confirmations.terms}
            onCheckedChange={(checked) => handleConfirmationChange("terms", checked as boolean)}
          />
          <label htmlFor="terms" className="text-sm">
            I accept the terms and conditions of PickNDrive
          </label>
        </div>
      </div>
    </div>
  )
}
