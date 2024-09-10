import connectDB from "@/db/connectDB";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified sucessfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(`Error in verifying email ${err.message}`);
    return NextResponse.json(
      { message: `Error in verifying email ${err}` },
      { status: 500 }
    );
  }
}
