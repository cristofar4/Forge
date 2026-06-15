import type { Metadata } from "next";
import { SolutionsPage } from "@/components/pages/SolutionsPage";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Forge robotics for manufacturing, healthcare, logistics, security, smart cities and energy. One platform, adapted to your industry.",
};

export default function Page() {
  return <SolutionsPage />;
}
