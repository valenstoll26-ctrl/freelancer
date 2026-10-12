"use client";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
export function MicroReveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return <LazyMotion features={domAnimation}><m.div initial={false} whileInView={reduce ? undefined : { opacity: [0.92, 1], y: [8, 0] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45 }}>{children}</m.div></LazyMotion>;
}
