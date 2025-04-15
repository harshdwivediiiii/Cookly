// app/api/assistant/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { askGemini } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const response = await askGemini(prompt);
  return NextResponse.json({ response });
}
