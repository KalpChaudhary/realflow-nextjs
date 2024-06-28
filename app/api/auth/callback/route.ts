import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const redirectUrl = new URL(req.url);
  const code = redirectUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/");
  }

  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(`${redirectUrl.origin}/dashboard`);
}
