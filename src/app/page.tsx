import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const acceptLanguage = (await headers()).get("accept-language") ?? "";
  const primaryLanguage = acceptLanguage.toLowerCase().split(",")[0]?.trim() ?? "";

  redirect(primaryLanguage.startsWith("es") ? "/es" : "/en");
}
