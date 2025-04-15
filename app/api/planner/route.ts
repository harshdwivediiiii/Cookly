import { createPlanner, getPlanner } from "@/lib/planner"; 
import { NextResponse } from 'next/server';

export async function POST() {
  const plannerData = await getPlanner(); // Assuming you are generating this data in some function

  try {
    const result = await createPlanner(plannerData);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error:", error);  // Log the error
    return NextResponse.json({ error: "Failed to create planner" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const planner = await getPlanner();
    return NextResponse.json(planner);
  } catch (error) {
    console.error("Error retrieving planner:", error);  // Log the error
    return NextResponse.json({ error: "Failed to retrieve planner" }, { status: 500 });
  }
}
