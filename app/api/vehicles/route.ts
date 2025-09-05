import { type NextRequest, NextResponse } from "next/server"

// POST /api/vehicles - Create a new vehicle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { categoryId, brand, model, year, ownerId } = body

    // Validate required fields
    if (!categoryId || !brand || !model || !year || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields: categoryId, brand, model, year, ownerId" },
        { status: 400 },
      )
    }

    // Validate year
    const currentYear = new Date().getFullYear()
    if (year < 1900 || year > currentYear + 1) {
      return NextResponse.json({ error: "Invalid year" }, { status: 400 })
    }

    // Here you would insert into your database
    // Example SQL:
    /*
    INSERT INTO vehicles (category_id, owner_id, brand, model, year, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'draft', NOW(), NOW())
    RETURNING id;
    */

    // Simulated database insert - generate a random ID
    const vehicleId = Math.random().toString(36).substr(2, 9)

    // Log the creation for debugging
    console.log("Vehicle created:", {
      vehicleId,
      categoryId,
      brand,
      model,
      year,
      ownerId,
      status: "draft",
    })

    return NextResponse.json({
      success: true,
      vehicleId,
      message: "Vehicle created successfully",
    })
  } catch (error) {
    console.error("Error creating vehicle:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/vehicles - Get vehicles (optional, for listing)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ownerId = searchParams.get("ownerId")
    const status = searchParams.get("status")
    const categoryId = searchParams.get("categoryId")

    // Here you would query your database
    // Example SQL:
    /*
    SELECT 
      v.*,
      c.name as category_name,
      c.label as category_label
    FROM vehicles v
    JOIN categories c ON v.category_id = c.id
    WHERE 
      (? IS NULL OR v.owner_id = ?) AND
      (? IS NULL OR v.status = ?) AND
      (? IS NULL OR v.category_id = ?)
    ORDER BY v.created_at DESC
    */

    // Simulated response
    const vehicles = [
      {
        id: "abc123",
        categoryId: 1,
        categoryName: "sedan",
        categoryLabel: "Sedan",
        ownerId: 1,
        brand: "toyota",
        model: "Corolla",
        year: 2022,
        description: "Well maintained sedan",
        pricePerDay: 45.0,
        status: "active",
        images: ["/placeholder.svg"],
        createdAt: "2024-01-15T10:00:00Z",
      },
    ]

    return NextResponse.json({
      success: true,
      vehicles,
    })
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
