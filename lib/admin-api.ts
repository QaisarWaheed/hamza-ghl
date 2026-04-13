import { NextResponse } from "next/server";
import { getSessionToken, verifySessionToken } from "@/lib/auth";

export async function requireAdmin() {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ok = await verifySessionToken(token);
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
