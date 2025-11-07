import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete the interview document
    await db.collection("interviews").doc(id).delete();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting interview:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete interview" },
      { status: 500 }
    );
  }
}
