import type { Metadata } from "next";
import SitePage from "../components/site/SitePage";
import { buildMetadata } from "../lib/site-metadata";

export function generateMetadata(): Metadata {
  return buildMetadata("en");
}

export default function EnglishHome() {
  return <SitePage locale="en" />;
}
