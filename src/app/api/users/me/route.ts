import connectDB from "@/db/connectDB";
import User from "@/models/userModels";
import { getDataFromToken } from "@/utils/tokenData";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(
      { message: "user data found", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `error while fetching user data ${error}` },
      { status: 500 }
    );
  }
}
