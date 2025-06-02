import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignoutButton from "./_components/signout-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h4>{session?.user.name}</h4>
      <h5>{session?.user.email}</h5>
      <SignoutButton />
    </div>
  );
}
