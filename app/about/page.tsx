import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Forge engineers the next species of machines. Founded in 2019, we build intelligent robots for the physical world.",
};

export default function Page() {
  return <AboutPage />;
}
