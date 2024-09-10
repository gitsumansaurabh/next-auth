import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY!);
    return decodedToken.id;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
