import { IntroLoader } from "@/components/sections/home/IntroLoader";
import { HeroExperience } from "@/components/sections/home/HeroExperience";
import { Stats } from "@/components/sections/home/Stats";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { FeaturedRobots } from "@/components/sections/home/FeaturedRobots";
import { SolutionsPreview } from "@/components/sections/home/SolutionsPreview";
import { ResearchPreview } from "@/components/sections/home/ResearchPreview";
import { Marquee } from "@/components/layout/Marquee";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <HeroExperience />
      <Stats />
      <Capabilities />
      <Marquee />
      <FeaturedRobots />
      <SolutionsPreview />
      <ResearchPreview />
    </>
  );
}
