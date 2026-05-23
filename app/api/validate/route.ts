import { NextRequest, NextResponse } from "next/server";
import { repairConfigFromString } from "@/lib/repair-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const config = body?.config;

    if (!config || typeof config !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "config must be a JSON string",
        },
        { status: 400 }
      );
    }

    const result = repairConfigFromString(config);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation request failed",
      },
      { status: 500 }
    );
  }
}