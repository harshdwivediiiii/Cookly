import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const userData = await req.json(); // Assuming you are posting saved user data as JSON

    // Process the data here (e.g., save to a database, perform some business logic)
    console.log(userData);

    return NextResponse.json({ message: 'User saved data received successfully!' }, { status: 201 });
  } catch (error) {
    console.error("Error handling user saved data:", error);
    return NextResponse.json({ error: "Failed to process user saved data" }, { status: 500 });
  }
}
