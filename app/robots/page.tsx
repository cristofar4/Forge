import type { Metadata } from "next";
import { RobotsPage } from "@/components/pages/RobotsPage";

export const metadata: Metadata = {
  title: "Robots",
  description:
    "Explore the Forge lineup. Atlas X, Nova Assistant, Titan Industrial, Guardian Security, Medi Care and Logistics One, with full specifications and capabilities.",
};

export default function Page() {
  return <RobotsPage />;
}
