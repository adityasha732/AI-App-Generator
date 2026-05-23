import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const apps = await prisma.app.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: apps,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch apps",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const app = await prisma.app.create({
      data: {
        userId: body.userId ?? "demo-user",
        name: body.name ?? "Untitled App",
        description: body.description ?? "",
        currentConfigJson: body.currentConfigJson ?? {},
        repairedConfigJson: body.repairedConfigJson ?? {},
      },
    });

    return NextResponse.json({
      success: true,
      data: app,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create app",
      },
      { status: 500 }
    );
  }
}