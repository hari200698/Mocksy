import { cookies } from "next/headers";
import { auth } from "@/firebase/admin";
import { logEvent } from "@/lib/telemetry.server";

/**
 * Server-only helper to verify Firebase session cookie and return user ID
 * @returns The user ID (uid) from the verified session cookie
 * @throws Error("NO_SESSION") if the cookie is missing
 * @throws Error("INVALID_SESSION") if the cookie verification fails
 */
export async function requireUserIdFromCookie(): Promise<string> {
  const cookieStore = await cookies();
  // Try both cookie names for compatibility
  const sessionCookie = cookieStore.get("__session")?.value || cookieStore.get("session")?.value;

  if (!sessionCookie) {
    throw new Error("NO_SESSION");
  }

  try {
    const decoded = await auth.verifySessionCookie(sessionCookie, true);
    
    // Log successful authentication verification
    logEvent("auth.verified", { uid: decoded.uid });
    
    return decoded.uid;
  } catch (error) {
    throw new Error("INVALID_SESSION");
  }
}

