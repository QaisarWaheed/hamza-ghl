"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

const projectTypes = [
  "Full funnel build",
  "Website + GHL",
  "Automations / integrations",
  "CRM cleanup & pipelines",
  "Other",
];

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      projectType: String(fd.get("projectType") || ""),
      message: String(fd.get("message") || ""),
    };
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
            <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold text-white sm:text-4xl">
              Get a quote
            </h2>
            <p className="mt-4 max-w-md text-slate-400">
              Tell me about your offer, traffic, and timeline. I reply within one business day with next steps and a clear
              scope.
            </p>
            <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/30 p-6">
              <p className="text-sm font-medium text-white">What you can expect</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>— Structured discovery (ICP, funnel stages, assets)</li>
                <li>— Transparent build plan in GHL + integrations</li>
                <li>— Launch checklist and handoff recording</li>
              </ul>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            onSubmit={onSubmit}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required autoComplete="name" placeholder="Jordan Lee" />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="projectType">Project type</Label>
                <Select id="projectType" name="projectType" required defaultValue="">
                  <option value="" disabled>
                    Select…
                  </option>
                  {projectTypes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required rows={5} placeholder="Goals, links, timeline, budget range…" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send message"}
              </Button>
              {status === "ok" && <span className="text-sm text-emerald-400">Received. I’ll be in touch shortly.</span>}
              {status === "err" && <span className="text-sm text-red-300">Something went wrong. Please try again.</span>}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
