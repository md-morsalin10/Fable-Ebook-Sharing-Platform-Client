"use client";

import { authClient } from "../auth-client";

export const getClientToken = async() => {
    const { data:token } = await authClient.token()
   return token.token
}
