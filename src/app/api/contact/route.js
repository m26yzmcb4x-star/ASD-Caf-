import { NextResponse } from 'next/server';

let leads = [];

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body || {};
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'name, email and message are required' }, { status: 400 });
    }
    
    const item = { id: String(Date.now()), name, email, message, createdAt: new Date().toISOString() };
    leads.unshift(item);
    
    if (leads.length > 200) leads = leads.slice(0, 200);
    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }
}
