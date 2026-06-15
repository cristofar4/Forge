import type { Metadata } from "next";
import { CareersPage } from "@/components/pages/CareersPage";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build robots that matter. Explore open roles, benefits and the culture at Forge Robotics, and apply to join the team.",
};

export default function Page() {
  return <CareersPage />;
}
