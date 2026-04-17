import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
// import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Workshops } from "@/components/sections/Workshops";
// import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <SiteLayout>
        <Hero />
        {/* <Philosophy /> */}
        <Services />
        <Workshops />
        {/* <Testimonials /> */}
        <Contact />
    </SiteLayout>
  );
}
