import { type NextRequest, NextResponse } from "next/server"

// POST /api/vehicles/[id]/features - Save vehicle features
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vehicleId = params.id
    const body = await request.json()
    const { features } = body

    // Validate vehicle exists (in real app, check database)
    if (!vehicleId) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 })
    }

    if (!features || !Array.isArray(features)) {
      return NextResponse.json({ error: "Valid features array is required" }, { status: 400 })
    }

    // Here you would typically save features to your database
    // For this example, we'll simulate saving features
    const featureData = {
      vehicleId,
      features,
      updatedAt: new Date().toISOString(),
    }

    // In a real app, you would save this to your database
    console.log("Saving vehicle features:", featureData)

    return NextResponse.json({
      success: true,
      message: "Vehicle features saved successfully",
    })
  } catch (error) {
    console.error("Error saving vehicle features:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
