import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual look at Forge robots across the lab, the line and the field. Filter by category and explore in detail.",
};

export default function Page() {
  return <GalleryPage />;
}
