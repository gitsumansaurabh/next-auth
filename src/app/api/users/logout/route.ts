import connectDB from "@/db/connectDB";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextResponse) {
  try {
    const response = NextResponse.json({
      message: "Logout sucessfully",
      sucess: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (err) {
    console.log("error while logout: " + err);
    return NextResponse.json(
      { message: `error while logout: ${err}` },
      { status: 500 }
    );
  }
}
