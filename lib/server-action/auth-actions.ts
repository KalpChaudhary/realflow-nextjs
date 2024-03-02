"use server";
import { z } from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { FormSchema } from "../types";

import { cookies } from "next/headers";

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signInWithGithub() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  console.log(data, error);



  return { data, error };
}
