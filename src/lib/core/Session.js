
import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSeason = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return session?.user || null;
}


export const verifyRole = async (role) => {
  const user = await getUserSeason();
  console.log(user, "from verifyRole");

  if (!user) {
    redirect("/login");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }
}
