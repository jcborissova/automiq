"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SystemLanguageRedirect() {
  const router = useRouter();

  useEffect(() => {
    const primaryLanguage =
      navigator.languages?.[0]?.toLowerCase() ??
      navigator.language?.toLowerCase() ??
      "";

    router.replace(primaryLanguage.startsWith("es") ? "/es" : "/en");
  }, [router]);

  return null;
}
