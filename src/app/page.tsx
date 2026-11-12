import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { dashboardForRole } from "@/lib/auth/roles";
import { RoleSelection } from "@/components/auth/RoleSelection";

async function RootAuthGate() {
  await connection();
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return <RoleSelection />;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .maybeSingle();

  redirect(dashboardForRole(profile?.role));
  return null;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f5ef]" />}>
      <RootAuthGate />
    </Suspense>
  );
}
