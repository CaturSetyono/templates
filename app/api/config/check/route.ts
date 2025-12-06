import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const configPath = path.join(process.cwd(), 'config', 'config.yaml');
  const exists = fs.existsSync(configPath);
  // We can also return the mtime to detect changes
  const mtime = exists ? fs.statSync(configPath).mtimeMs : 0;

  return NextResponse.json({ exists, mtime });
}
