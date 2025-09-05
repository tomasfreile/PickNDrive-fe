import { type NextRequest, NextResponse } from "next/server"

// PUT /api/vehicles/[id] - Update vehicle with final details
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vehicleId = params.id
    const body = await request.json()
    const { description, pricePerDay, rules, images, status } = body

    if (!vehicleId) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 })
    }

    // Validate required fields for final update
    if (!description || !pricePerDay) {
      return NextResponse.json({ error: "Description and price per day are required" }, { status: 400 })
    }

    // Validate price
    if (pricePerDay <= 0) {
      return NextResponse.json({ error: "Price per day must be greater than 0" }, { status: 400 })
    }

    // Here you would update your database
    // Example SQL:
    /*
    UPDATE vehicles 
    SET 
      description = ?,
      price_per_day = ?,
      rules = ?,
      images = ?,
      status = ?,
      updated_at = NOW()
    WHERE id = ?
    */

    // Log the update for debugging
    console.log("Updating vehicle:", vehicleId, {
      description,
      pricePerDay,
      rules,
      images: images?.length || 0,
      status,
    })

    return NextResponse.json({
      success: true,
      message: "Vehicle updated successfully",
      vehicleId,
    })
  } catch (error) {
    console.error("Error updating vehicle:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/vehicles/[id] - Get vehicle details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vehicleId = params.id

    if (!vehicleId) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 })
    }

    // Here you would query your database
    // Example SQL:
    /*
    SELECT 
      v.*,
      c.name as category_name,
      c.label as category_label
    FROM vehicles v
    JOIN categories c ON v.category_id = c.id
    WHERE v.id = ?
    */

    // Simulated response
    const vehicle = {
      id: vehicleId,
      categoryId: 1,
      categoryName: "sedan",
      categoryLabel: "Sedan",
      ownerId: 1,
      brand: "toyota",
      model: "Corolla",
      year: 2022,
      description: "Well maintained sedan in excellent condition",
      pricePerDay: 45.0,
      rules: "No smoking, return with same fuel level",
      status: "active",
      images: ["/placeholder.svg", "/placeholder.svg"],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
    }

    return NextResponse.json({
      success: true,
      vehicle,
    })
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/vehicles/[id] - Delete vehicle
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vehicleId = params.id

    if (!vehicleId) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 })
    }

    // Here you would delete from your database
    // Example SQL:
    /*
    DELETE FROM vehicles WHERE id = ?
    */
    // Note: The foreign key constraints will handle deleting related records

    console.log("Deleting vehicle:", vehicleId)

    return NextResponse.json({
      success: true,
      message: "Vehicle deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting vehicle:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
