"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Shield } from "lucide-react";
import Container from "@/components/Container";

export default function AdminLogin({
  onLogin,
  error,
}: {
  onLogin: (email: string, password: string) => Promise<void>;
  error: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await onLogin(email.trim().toLowerCase(), password);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border-b border-black/[0.06] bg-white">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-md"
          >
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <Shield className="h-3.5 w-3.5" />
              Admin access
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Sign in to Mangalmurti Tours & Travels
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-navy/55">
              Sign in with the admin email and password.
            </p>
            <ul className="mt-6 space-y-2 border-t border-black/[0.06] pt-5 text-[13px] text-navy/55">
              <li className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                Manage bookings, enquiries, and reviews
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                Update routes, pages, and site contact
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 }}
          >
            <form onSubmit={handleSubmit} className="border border-black/[0.08] bg-white">
              <div className="border-b border-black/[0.06] px-5 py-4 sm:px-6">
                <h2 className="text-lg font-bold text-navy">Admin login</h2>
              </div>

              <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                <label className="block">
                  <span className="text-[12px] font-semibold text-navy/50">Email address</span>
                  <span className="relative mt-1.5 flex">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-black/[0.1] bg-[#fafbfc] py-3 pl-10 pr-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10"
                      autoComplete="username"
                      required
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="text-[12px] font-semibold text-navy/50">Password</span>
                  <span className="relative mt-1.5 flex">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full border border-black/[0.1] bg-[#fafbfc] py-3 pl-10 pr-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10"
                      autoComplete="current-password"
                      required
                    />
                  </span>
                </label>

                {error ? (
                  <p className="border border-brand/20 bg-brand/5 px-3 py-2 text-[13px] font-medium text-brand">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 bg-brand py-3 text-[13px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
                >
                  {busy ? "Signing in…" : "Sign in"}
                  {!busy ? <ArrowRight className="h-4 w-4" /> : null}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
