"use client";

import { LazyMotion, domAnimation, m, useScroll } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return <LazyMotion features={domAnimation}><m.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" /></LazyMotion>;
}
