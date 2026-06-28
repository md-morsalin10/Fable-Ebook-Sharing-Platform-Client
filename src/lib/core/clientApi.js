"use client";

import { authClient } from "@/lib/auth-client";

const baseUrl = process.env.NEXT_PUBLIC_URL;


export const clientFetch = async (path) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            "authorization": token ? `Bearer ${token}` : ""
        }
    });
    return res.json();
};

export const clientMutation = async (path, data, method = "POST") => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify(data)
    });
    return res.json();
};