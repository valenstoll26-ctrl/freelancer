"use client";

import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { getMessages, type Locale } from "@/lib/i18n";

const positions = [
  [[85, 75], [295, 55], [495, 105], [145, 240], [350, 225], [510, 255]],
  [[110, 110], [300, 65], [490, 110], [110, 240], [300, 195], [490, 240]],
  [[110, 105], [300, 105], [490, 105], [110, 235], [300, 235], [490, 235]],
];
const connections = [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5]];

export function SolutionStory({ locale }: { locale: Locale }) {
  const t = getMessages(locale).story;
  const [stage, setStage] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);
  const [stageFocused, setStageFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.4);
    }, { threshold: 0.4 });
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !pageVisible || stageFocused || reduce !== false) return;
    const timer = window.setTimeout(() => setStage((stage + 1) % t.stages.length), 2800);
    return () => window.clearTimeout(timer);
  }, [visible, pageVisible, stageFocused, stage, reduce, t.stages.length]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  function choose(index: number) {
    setStage(index);
    frame.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "instant" : "smooth" });
  }

  const transition = { duration: reduce ? 0 : 0.7, ease: "easeInOut" as const };
  return <div className="solution-story"><div className="story-heading"><span className="eyebrow">{t.label}</span><h3>{t.title}</h3><p>{t.intro}</p></div><div className="story-screen" ref={frame}><LazyMotion features={domAnimation}><svg viewBox="0 0 600 340" aria-hidden="true"><defs><pattern id={`story-grid-${locale}`} width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.12" /></pattern></defs><rect width="600" height="340" fill={`url(#story-grid-${locale})`} />{connections.map(([from, to]) => <m.line key={`${from}-${to}`} initial={false} animate={{ x1: positions[stage][from][0], y1: positions[stage][from][1], x2: positions[stage][to][0], y2: positions[stage][to][1], opacity: stage === 0 ? 0 : 0.55 }} transition={transition} stroke="currentColor" strokeWidth="1.5" />)}{positions[stage].map(([x, y], index) => <m.g key={index} initial={false} animate={{ x, y }} transition={transition}><m.rect x="-43" y="-34" width="86" height="68" rx="4" initial={false} animate={{ opacity: stage === 2 ? 1 : 0 }} transition={transition} fill="#282c26" stroke="currentColor" strokeWidth="1.5" /><m.circle r="24" initial={false} animate={{ opacity: stage === 2 ? 0 : 1 }} transition={transition} fill="#282c26" stroke="currentColor" strokeWidth="1.5" /><path d={index % 3 === 0 ? "M-8 0H8M0-8V8" : index % 3 === 1 ? "M-9 4 0-5 9 4" : "M-9-4H9M-9 4H4"} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></m.g>)}</svg></LazyMotion><div className="story-current"><span className="story-number">0{stage + 1}</span><div><h4>{t.stages[stage].title}</h4><p>{t.stages[stage].description}</p></div></div></div><div className="story-controls"><div role="group" aria-label={t.choose} className="story-stages" onFocusCapture={() => setStageFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setStageFocused(false); }}>{t.stages.map((item, index) => <button type="button" key={item.title} aria-pressed={stage === index} onClick={() => choose(index)}><span>0{index + 1}</span>{item.title}</button>)}</div></div><p className="story-caption">{t.caption}</p></div>;
}
