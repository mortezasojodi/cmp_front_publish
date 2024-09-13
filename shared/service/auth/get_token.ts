"use server"
import { cookies } from "next/headers";

export async function getToken(): Promise<string | null> {
  const accessToken = await getCookie("accessToken");
  return accessToken;
}
const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? "";
};
