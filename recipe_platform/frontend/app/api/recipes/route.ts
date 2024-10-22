import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "frontend/public/data/dummy.json");

export async function GET() {
  try {
    console.log(filePath);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(){
  try {
    console.log(filePath);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}