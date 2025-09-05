import { type NextRequest, NextResponse } from "next/server"

// GET /api/categories/[id]/features - Get features available for a category
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id

    if (!categoryId) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
    }

    // Here you would query your database for features available for this category
    // Example query structure:
    /*
    SELECT 
      f.id,
      f.name,
      f.label,
      f.description,
      f.sort_order
    FROM features f
    JOIN category_features cf ON f.id = cf.feature_id
    WHERE cf.category_id = ? AND f.is_active = true AND cf.is_active = true
    ORDER BY f.sort_order
    */

    // Simulated database response based on category
    let featuresData: any[] = []

    if (categoryId === "1") {
      // Sedan
      featuresData = [
        { id: 1, name: "air_conditioning", label: "Air Conditioning", description: "Climate control system" },
        { id: 2, name: "gps", label: "GPS", description: "Navigation system" },
        { id: 3, name: "bluetooth", label: "Bluetooth", description: "Wireless connectivity" },
        { id: 4, name: "rear_camera", label: "Rear Camera", description: "Backup camera" },
        { id: 5, name: "parking_sensors", label: "Parking Sensors", description: "Proximity sensors" },
        { id: 6, name: "cruise_control", label: "Cruise Control", description: "Speed control system" },
        { id: 7, name: "touch_screen", label: "Touch Screen", description: "Infotainment display" },
        { id: 8, name: "usb_aux", label: "USB/AUX", description: "Audio connectivity" },
        { id: 9, name: "leather_seats", label: "Leather Seats", description: "Premium seating" },
        { id: 10, name: "sunroof", label: "Sunroof", description: "Panoramic roof" },
        { id: 11, name: "premium_sound", label: "Premium Sound System", description: "High-quality audio" },
        { id: 12, name: "wireless_charger", label: "Wireless Charger", description: "Phone charging pad" },
      ]
    } else if (categoryId === "2") {
      // SUV
      featuresData = [
        { id: 1, name: "air_conditioning", label: "Air Conditioning", description: "Climate control system" },
        { id: 2, name: "gps", label: "GPS", description: "Navigation system" },
        { id: 3, name: "bluetooth", label: "Bluetooth", description: "Wireless connectivity" },
        { id: 4, name: "rear_camera", label: "Rear Camera", description: "Backup camera" },
        { id: 5, name: "parking_sensors", label: "Parking Sensors", description: "Proximity sensors" },
        { id: 6, name: "cruise_control", label: "Cruise Control", description: "Speed control system" },
        { id: 7, name: "touch_screen", label: "Touch Screen", description: "Infotainment display" },
        { id: 8, name: "usb_aux", label: "USB/AUX", description: "Audio connectivity" },
        { id: 9, name: "leather_seats", label: "Leather Seats", description: "Premium seating" },
        { id: 10, name: "sunroof", label: "Sunroof", description: "Panoramic roof" },
        { id: 11, name: "premium_sound", label: "Premium Sound System", description: "High-quality audio" },
        { id: 12, name: "wireless_charger", label: "Wireless Charger", description: "Phone charging pad" },
        { id: 13, name: "roof_rack", label: "Roof Rack", description: "Cargo carrying system" },
        { id: 14, name: "tow_hitch", label: "Tow Hitch", description: "Trailer towing capability" },
        { id: 15, name: "third_row_seating", label: "Third Row Seating", description: "Additional passenger seating" },
        { id: 16, name: "all_terrain_tires", label: "All-Terrain Tires", description: "Off-road capable tires" },
      ]
    } else if (categoryId === "5") {
      // Motorcycle
      featuresData = [
        { id: 17, name: "abs", label: "ABS", description: "Anti-lock braking system" },
        { id: 18, name: "traction_control", label: "Traction Control", description: "Wheel slip prevention" },
        { id: 19, name: "heated_grips", label: "Heated Grips", description: "Warm handlebar grips" },
        { id: 20, name: "wind_screen", label: "Wind Screen", description: "Wind protection" },
        { id: 21, name: "side_cases", label: "Side Cases", description: "Storage compartments" },
        { id: 22, name: "top_box", label: "Top Box", description: "Rear storage box" },
        { id: 23, name: "gps_mount", label: "GPS Mount", description: "Navigation device mount" },
        { id: 24, name: "usb_charger", label: "USB Charger", description: "Device charging port" },
        { id: 25, name: "led_lights", label: "LED Lights", description: "LED lighting system" },
      ]
    }

    return NextResponse.json({
      success: true,
      features: featuresData,
    })
  } catch (error) {
    console.error("Error fetching category features:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
