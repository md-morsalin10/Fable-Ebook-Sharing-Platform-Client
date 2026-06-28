"use server";
import { headers } from "next/headers";
import { auth } from "../auth";

export const getTokenServer = async () => {
    const session = await auth.api.getToken({
        headers: await headers()
    })
    return session?.token || null;
}
