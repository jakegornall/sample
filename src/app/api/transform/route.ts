import * as babel from '@babel/standalone';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { code } = await request.json();
  
  try {
    const result = babel.transform(code, {
      presets: ['react'],
    });
    
    return NextResponse.json({ code: result.code });
  } catch (error) {
    return NextResponse.json({ error: 'Transform failed' }, { status: 500 });
  }
} 