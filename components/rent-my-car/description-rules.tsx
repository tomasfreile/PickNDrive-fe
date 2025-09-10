"use client"

import { Textarea } from "@/components/ui/textarea"

interface DescriptionRulesProps {
  description: string
  rules: string
  onDescriptionChange: (value: string) => void
  onRulesChange: (value: string) => void
}

export function DescriptionRules({ description, rules, onDescriptionChange, onRulesChange }: DescriptionRulesProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Vehicle Description</label>
        <Textarea
          placeholder="Describe your vehicle, its condition, special features, etc."
          rows={3}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Rental Rules</label>
        <Textarea
          placeholder="Ex: No smoking, return with the same fuel level, maximum 200 km per day, etc."
          rows={3}
          value={rules}
          onChange={(e) => onRulesChange(e.target.value)}
        />
      </div>
    </div>
  )
}
