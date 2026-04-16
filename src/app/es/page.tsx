import type { Metadata } from "next";
import SitePage from "../components/site/SitePage";
import { buildMetadata } from "../lib/site-metadata";

export function generateMetadata(): Metadata {
  return buildMetadata("es");
}

export default function SpanishHome() {
  return <SitePage locale="es" />;
}
