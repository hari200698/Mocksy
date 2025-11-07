import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Delete both possible session cookie names
    cookieStore.delete("session");
    cookieStore.delete("__session");
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sign out" },
      { status: 500 }
    );
  }
}
