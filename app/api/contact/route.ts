import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  projectType: z.string().min(1).max(120),
  message: z.string().min(1).max(8000),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check all fields." }, { status: 400 });
  }

  await prisma.contactMessage.create({
    data: parsed.data,
  });

  return NextResponse.json({ ok: true });
}
