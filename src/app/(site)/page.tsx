import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Stats from "@/components/home/Stats";
import Projects from "@/components/home/Projects";
import WhyRivo from "@/components/home/WhyRivo";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import CtaContact from "@/components/home/CtaContact";
import { getProjects, getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);

  return (
    <>
      <Hero hero={settings.hero} />
      <Intro manifest={settings.manifest} />
      <Stats stats={settings.stats} />
      <Projects projects={projects} />
      <WhyRivo />
      <Process />
      <Testimonials />
      <CtaContact />
    </>
  );
}
