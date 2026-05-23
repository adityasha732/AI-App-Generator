import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const app = await prisma.app.findUnique({
      where: {
        id: params.id,
      },
      include: {
        versions: true,
      },
    });

    if (!app) {
      return NextResponse.json(
        {
          success: false,
          error: "App not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: app,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load app",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();

    const updated = await prisma.app.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        description: body.description,
        currentConfigJson: body.currentConfigJson,
        repairedConfigJson: body.repairedConfigJson,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update app",
      },
      { status: 500 }
    );
  }
}