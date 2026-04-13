import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionToken, setSessionCookie, verifyAdminCredentials } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
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
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const valid = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await createSessionToken();
    await setSessionCookie(token);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
