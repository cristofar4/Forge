import type { Metadata } from "next";
import { ResearchPage } from "@/components/pages/ResearchPage";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Inside the Forge lab. The Cortex reasoning core, machine vision, autonomous navigation and digital twin simulation.",
};

export default function Page() {
  return <ResearchPage />;
}
