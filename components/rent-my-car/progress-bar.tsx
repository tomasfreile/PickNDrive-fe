"use client"

import { Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { VehicleStep } from "@/lib/vehicle-data"

interface ProgressBarProps {
  steps: VehicleStep[]
  currentStep: number
  progress: number
}

export function ProgressBar({ steps, currentStep, progress }: ProgressBarProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${step.id <= currentStep ? "text-brand-primary" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium ${
                  step.id < currentStep
                    ? "bg-brand-primary text-white"
                    : step.id === currentStep
                      ? "bg-brand-primary-light text-brand-primary border-2 border-brand-primary"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <div className="text-xs font-medium">{step.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
