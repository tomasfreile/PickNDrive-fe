import { type NextRequest, NextResponse } from "next/server"

// POST /api/vehicles/[id]/attributes - Save vehicle attributes
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vehicleId = params.id
    const body = await request.json()
    const { attributes } = body

    if (!vehicleId) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 })
    }

    if (!attributes || typeof attributes !== "object") {
      return NextResponse.json({ error: "Attributes object is required" }, { status: 400 })
    }

    // Here you would save to your database
    // Example SQL for each attribute:
    /*
    INSERT INTO vehicle_attributes (vehicle_id, attribute_id, value, created_at, updated_at)
    VALUES (?, ?, ?, NOW(), NOW())
    ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = NOW();
    
    Note: You'd need to look up attribute_id from the attribute name first:
    SELECT id FROM attributes WHERE name = ? AND category_id = (
      SELECT category_id FROM vehicles WHERE id = ?
    )
    */

    // Log the attributes for debugging
    console.log("Saving attributes for vehicle:", vehicleId, attributes)

    // Simulate saving each attribute
    for (const [attributeName, value] of Object.entries(attributes)) {
      console.log(`Attribute: ${attributeName} = ${value}`)
      // In real implementation, you'd:
      // 1. Get the attribute_id from the attribute name and vehicle's category
      // 2. Insert/update the vehicle_attributes table
    }

    return NextResponse.json({
      success: true,
      message: "Attributes saved successfully",
      savedAttributes: attributes,
    })
  } catch (error) {
    console.error("Error saving vehicle attributes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/vehicles/[id]/attributes - Get vehicle attributes
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
      a.name as attribute_name,
      va.value as attribute_value,
      a.label as attribute_label
    FROM vehicle_attributes va
    JOIN attributes a ON va.attribute_id = a.id
    WHERE va.vehicle_id = ?
    */

    // Simulated response
    const attributes = {
      transmission: "automatic",
      fuel: "gasoline",
      doors: "4",
      seats: "5",
    }

    return NextResponse.json({
      success: true,
      attributes,
    })
  } catch (error) {
    console.error("Error fetching vehicle attributes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
