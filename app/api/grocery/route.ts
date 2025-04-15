import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const groceryData = await req.json(); // Assuming you are posting grocery data as JSON

    // Process the data here (e.g., save to a database, perform some business logic)
    console.log(groceryData);

    return NextResponse.json({ message: 'Grocery data received successfully!' }, { status: 201 });
  } catch (error) {
    console.error("Error handling grocery data:", error);
    return NextResponse.json({ error: "Failed to process grocery data" }, { status: 500 });
  }
}
