"use server"
import { cookies } from "next/headers";

export async function saveToken(token:string) {
    cookies().set("accessToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        sameSite: "strict"
      });
}