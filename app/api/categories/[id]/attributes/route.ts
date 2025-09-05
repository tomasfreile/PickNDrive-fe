import { type NextRequest, NextResponse } from "next/server"

// GET /api/categories/[id]/attributes - Get attributes and their options for a category
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id

    if (!categoryId) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
    }

    // Here you would query your database for attributes and their options
    // Example query structure:
    /*
    SELECT 
      a.id as attribute_id,
      a.name as attribute_name,
      a.label as attribute_label,
      a.input_type,
      a.is_required,
      a.sort_order as attribute_sort_order,
      ao.id as option_id,
      ao.value as option_value,
      ao.label as option_label,
      ao.sort_order as option_sort_order
    FROM attributes a
    LEFT JOIN attribute_options ao ON a.id = ao.attribute_id
    WHERE a.category_id = ? AND a.is_active = true AND (ao.is_active = true OR ao.is_active IS NULL)
    ORDER BY a.sort_order, ao.sort_order
    */

    // Simulated database response based on category
    let attributesData: any[] = []

    if (categoryId === "1") {
      // Sedan
      attributesData = [
        {
          id: 1,
          name: "transmission",
          label: "Transmission",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 1, value: "automatic", label: "Automatic", sortOrder: 1 },
            { id: 2, value: "manual", label: "Manual", sortOrder: 2 },
          ],
        },
        {
          id: 2,
          name: "fuel",
          label: "Fuel Type",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 3, value: "gasoline", label: "Gasoline", sortOrder: 1 },
            { id: 4, value: "hybrid", label: "Hybrid", sortOrder: 2 },
            { id: 5, value: "electric", label: "Electric", sortOrder: 3 },
          ],
        },
        {
          id: 3,
          name: "doors",
          label: "Doors",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 6, value: "2", label: "2 Doors", sortOrder: 1 },
            { id: 7, value: "4", label: "4 Doors", sortOrder: 2 },
          ],
        },
        {
          id: 4,
          name: "seats",
          label: "Seats",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 8, value: "2", label: "2 Seats", sortOrder: 1 },
            { id: 9, value: "4", label: "4 Seats", sortOrder: 2 },
            { id: 10, value: "5", label: "5 Seats", sortOrder: 3 },
          ],
        },
      ]
    } else if (categoryId === "2") {
      // SUV
      attributesData = [
        {
          id: 5,
          name: "transmission",
          label: "Transmission",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 11, value: "automatic", label: "Automatic", sortOrder: 1 },
            { id: 12, value: "manual", label: "Manual", sortOrder: 2 },
          ],
        },
        {
          id: 6,
          name: "fuel",
          label: "Fuel Type",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 13, value: "gasoline", label: "Gasoline", sortOrder: 1 },
            { id: 14, value: "hybrid", label: "Hybrid", sortOrder: 2 },
            { id: 15, value: "electric", label: "Electric", sortOrder: 3 },
            { id: 16, value: "diesel", label: "Diesel", sortOrder: 4 },
          ],
        },
        {
          id: 7,
          name: "drivetrain",
          label: "Drivetrain",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 17, value: "fwd", label: "FWD", sortOrder: 1 },
            { id: 18, value: "awd", label: "AWD", sortOrder: 2 },
            { id: 19, value: "4wd", label: "4WD", sortOrder: 3 },
          ],
        },
        {
          id: 8,
          name: "seats",
          label: "Seats",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 20, value: "5", label: "5 Seats", sortOrder: 1 },
            { id: 21, value: "7", label: "7 Seats", sortOrder: 2 },
            { id: 22, value: "8", label: "8 Seats", sortOrder: 3 },
          ],
        },
      ]
    } else if (categoryId === "5") {
      // Motorcycle
      attributesData = [
        {
          id: 9,
          name: "engine",
          label: "Engine Size",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 23, value: "125cc", label: "125cc", sortOrder: 1 },
            { id: 24, value: "250cc", label: "250cc", sortOrder: 2 },
            { id: 25, value: "400cc", label: "400cc", sortOrder: 3 },
            { id: 26, value: "600cc", label: "600cc", sortOrder: 4 },
            { id: 27, value: "750cc", label: "750cc", sortOrder: 5 },
            { id: 28, value: "1000cc+", label: "1000cc+", sortOrder: 6 },
          ],
        },
        {
          id: 10,
          name: "fuel",
          label: "Fuel Type",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 29, value: "gasoline", label: "Gasoline", sortOrder: 1 },
            { id: 30, value: "electric", label: "Electric", sortOrder: 2 },
          ],
        },
        {
          id: 11,
          name: "type",
          label: "Type",
          inputType: "select",
          isRequired: true,
          options: [
            { id: 31, value: "sport", label: "Sport", sortOrder: 1 },
            { id: 32, value: "cruiser", label: "Cruiser", sortOrder: 2 },
            { id: 33, value: "touring", label: "Touring", sortOrder: 3 },
            { id: 34, value: "adventure", label: "Adventure", sortOrder: 4 },
            { id: 35, value: "scooter", label: "Scooter", sortOrder: 5 },
          ],
        },
      ]
    }

    return NextResponse.json({
      success: true,
      attributes: attributesData,
    })
  } catch (error) {
    console.error("Error fetching category attributes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
