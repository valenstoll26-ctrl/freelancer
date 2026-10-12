"use client";
import { useState } from "react";
import Link from "next/link";
import { projects, type Project, type Category } from "@/content/projects";
import { getMessages, pathFor, type Locale } from "@/lib/i18n";
import { WorkVisual } from "./visuals";
import { Arrow } from "./ui";

export function CaseStudyCard({ project, locale }: { project: Project; locale: Locale }) {
  const item = project.content[locale];
  const t = getMessages(locale);
  return <Link href={pathFor(locale, "work", project.slug)} className="work-card"><WorkVisual theme={project.visual} caption={t.work[project.categories[0]]} /><div className="work-caption"><div className="case-card-meta"><span className="eyebrow">{t.work[project.categories[0]]}</span><span className={`project-kind ${project.kind === "concept" ? "concept" : ""}`}>{t.work[project.kind]}</span></div><h3>{item.title}<Arrow diagonal /></h3><p>{item.summary}</p><p className="project-role">{item.role}</p><span className="case-link">{t.work.view} <span aria-hidden="true">↗</span></span></div></Link>;
}
export function ProjectGallery({ locale, filtered = false, featured = false }: { locale: Locale; filtered?: boolean; featured?: boolean }) {
  const [category, setCategory] = useState<Category | "all">("all");
  const t = getMessages(locale);
  const items = projects.filter(project => (!featured || project.featured) && (category === "all" || project.categories.includes(category)));
  return <>{filtered && <><div className="project-filters" role="group" aria-label={t.work.filterLabel}>{(["all", "business", "operations", "product", "automation", "family", "programs"] as const).map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{t.work[item]}</button>)}</div><p className="filter-count" aria-live="polite">{items.length} {t.work.results}</p></>}<div className="work-grid">{items.map(project => <CaseStudyCard key={project.slug} project={project} locale={locale} />)}</div>{!items.length && <div className="empty-projects"><p>{t.work.empty}</p><button type="button" onClick={() => setCategory("all")} className="text-link">{t.work.reset}<Arrow /></button></div>}</>;
}
