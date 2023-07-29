import { NextResponse } from "next/server";
import { headers } from "next/headers";

const validateKey = async (token) =>
  new Promise((resolve, reject) => {
    if (!token || !token.startsWith("Bearer "))
      reject({
        status: 401,
        error: "Invalid or non-existent Api Key",
      });
    const key = token.split(" ")[1];
    // ... validar con la base de datos el token
    return resolve(key);
  });

export function GET(request) {
  const token = headers().get("authentication");
  validateKey(token)
    .then((key) => {
      return NextResponse.json({
        key,
      });
    })

    .catch((err) => {
      const { status, error } = err;
      return NextResponse.json({ error }, { status });
    });
}
