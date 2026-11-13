"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    document.cookie = "anzeyl_demo_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_name=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_email=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_goal=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_phone=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    if (typeof window !== "undefined") {
      localStorage.removeItem("anzeyl_user_name");
      localStorage.removeItem("anzeyl_user_email");
      localStorage.removeItem("anzeyl_user_goal");
      localStorage.removeItem("anzeyl_user_phone");
      localStorage.removeItem("anzeyl_demo_role");
    }

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }

    router.replace("/dashboard");
    router.refresh();
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="px-4 py-2 text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
    >
      {loading ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-rose-400/30 border-t-rose-400 rounded-full animate-spin" />
          Signing out...
        </>
      ) : (
        "Sign Out"
      )}
    </button>
  );
}
