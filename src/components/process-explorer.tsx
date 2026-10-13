"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { getMessages, type Locale } from "@/lib/i18n";

export function ProcessExplorer({ locale }: { locale: Locale }) {
  const t = getMessages(locale).process;
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const detail = t.details[active];

  function onKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const target = event.key === "ArrowRight" ? (index + 1) % t.steps.length : event.key === "ArrowLeft" ? (index - 1 + t.steps.length) % t.steps.length : event.key === "Home" ? 0 : event.key === "End" ? t.steps.length - 1 : undefined;
    if (target === undefined) return;
    event.preventDefault();
    setActive(target);
    buttons.current[target]?.focus();
  }

  return <div className="process-explorer"><p className="process-hint">{t.hint}</p><div className="process-tabs" role="tablist" aria-label={t.label}>{t.steps.map((step, index) => <button key={step.title} ref={node => { buttons.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => onKey(event, index)}><span className="step-number">0{index + 1}</span><span className="process-tab-title">{step.title}</span><span className="process-tab-description">{step.description}</span></button>)}</div><div className="process-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0}><LazyMotion features={domAnimation}><AnimatePresence mode="wait" initial={false}><m.div key={active} className="process-panel-content" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -4 }} transition={{ duration: reduce ? 0 : 0.16 }}><div><span className="eyebrow">{t.result}</span><h3>{detail.title}</h3></div><ul>{detail.activities.map(activity => <li key={activity}>{activity}</li>)}</ul></m.div></AnimatePresence></LazyMotion></div></div>;
}
