/**
 * Demo data for client walkthroughs. Safe to re-run: skips existing portfolio `slug`s and contact `email`s.
 *
 * MongoDB: Prisma may require a **replica set** (e.g. MongoDB Atlas, or local `mongod` with `replSet` initialized).
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { DEMO_PORTFOLIO_ROWS } from "../lib/portfolio-demo-rows";

const prisma = new PrismaClient();

const demoMessages = [
  {
    name: "Jordan Lee",
    email: "jordan.lee.demo@example.com",
    projectType: "Full funnel build",
    message:
      "We need a GHL funnel for our med-spa with SMS reminders and a deposit step. Can we book a call this week?",
  },
  {
    name: "Sam Okonkwo",
    email: "sam.okonkwo.demo@example.com",
    projectType: "Automations / integrations",
    message:
      "We run ads in 4 countries and need dedupe + routing into the right pod in GHL. Do you work with Make.com?",
  },
  {
    name: "Elena Vasquez",
    email: "elena.vasquez.demo@example.com",
    projectType: "Website + GHL",
    message:
      "Launching a new SaaS category page and want the site to feel premium—motion, dark mode, and demo requests flowing into our pipeline.",
  },
];

async function main() {
  let portfolioAdded = 0;
  for (const row of DEMO_PORTFOLIO_ROWS) {
    const exists = await prisma.portfolioItem.findUnique({ where: { slug: row.slug } });
    if (!exists) {
      const { id: _demoId, ...data } = row;
      await prisma.portfolioItem.create({ data });
      portfolioAdded += 1;
    }
  }
  console.log(
    `Portfolio: ${portfolioAdded} new demo item(s) inserted (${DEMO_PORTFOLIO_ROWS.length} defined in seed; skipped existing slugs).`,
  );

  let messagesAdded = 0;
  for (const m of demoMessages) {
    const exists = await prisma.contactMessage.findFirst({ where: { email: m.email } });
    if (!exists) {
      await prisma.contactMessage.create({ data: m });
      messagesAdded += 1;
    }
  }
  if (messagesAdded > 0) {
    console.log(`Contact messages: ${messagesAdded} demo submission(s) added.`);
  }

  console.log("Seed complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
