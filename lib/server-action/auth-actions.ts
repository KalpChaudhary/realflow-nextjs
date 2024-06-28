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

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data } = await supabase.from("users").select("*").eq("email", email);

  if (data?.length) {
    return { error: { message: "User already exists" }, data };
  }

  try {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    });

    // Check for error in the response
    if (response.error) {
      throw response.error;
    }

    return { data: response.data, error: null };
  } catch (error) {
    console.error("Signup error:", error);
    return { error, data: null };
  }
}

export async function signInWithGithub() {
  const supabase = createRouteHandlerClient({ cookies });
  console.log("github provider");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
    },
  });

  return { data, error };
}

export async function signOut() {
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.signOut();
}
