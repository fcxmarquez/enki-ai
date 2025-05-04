import { Session } from "@supabase/supabase-js";
import { createClient } from "./client";

export const hasActiveSession = async (): Promise<boolean> => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return !!user;
  } catch (error) {
    console.error("Error checking session:", error);
    return false;
  }
};

export const getSession = async (): Promise<Session | null> => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const getUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
