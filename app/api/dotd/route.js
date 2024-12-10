import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
    try {
        // Get the path to the deeds.txt file
        const filePath = path.join(process.cwd(), 'public', 'deeds.txt');
        
        // Read the file
        const fileContents = await fs.readFile(filePath, 'utf8');
        
        // Return the contents
        return NextResponse.json({ deeds: fileContents.split('\n').filter(deed => deed.trim()) });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to load deeds' },
            { status: 500 }
        );
    }
}