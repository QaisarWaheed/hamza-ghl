import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { ContactSection } from "@/components/sections/ContactSection";
import { prisma } from "@/lib/prisma";
import { DEMO_PORTFOLIO_ROWS } from "@/lib/portfolio-demo-rows";
import { toPublicCard } from "@/lib/portfolio-public";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rows = await prisma.portfolioItem.findMany({
    orderBy: { updatedAt: "desc" },
  });
  const source = rows.length > 0 ? rows : DEMO_PORTFOLIO_ROWS;
  const cards = source.map(toPublicCard);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PortfolioSection items={cards} />
        <Testimonials />
        <About />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
