import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Forge team. Request a demo, reach sales or support, and find our offices in San Francisco, Tokyo, Munich and Singapore.",
};

export default function Page() {
  return <ContactPage />;
}
