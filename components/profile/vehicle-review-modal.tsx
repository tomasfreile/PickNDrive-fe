"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface VehicleReviewModalProps {
  isOpen: boolean
  onClose: () => void
  booking: any
  onSubmit: (reviewData: { rating: number; comment: string }) => void
}

export function VehicleReviewModal({ isOpen, onClose, booking, onSubmit }: VehicleReviewModalProps) {
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" })

  const handleSubmit = () => {
    onSubmit(reviewData)
    setReviewData({ rating: 0, comment: "" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Vehicle</DialogTitle>
          <DialogDescription>Share your experience with the vehicle: {booking?.vehicle}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewData({ ...reviewData, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= reviewData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Comment about the vehicle</label>
            <Textarea
              placeholder="How was the vehicle condition, cleanliness, fuel efficiency, etc.?"
              value={reviewData.comment}
              onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={reviewData.rating === 0}>
              Submit Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
