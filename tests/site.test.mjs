import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { validateContact, emailDraft } from "../src/lib/contact.ts";

const base = "http://127.0.0.1:3107";
let server;
let serverOutput = "";
before(async () => {
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3107"], { stdio: ["ignore", "pipe", "pipe"] });
  server.stdout.on("data", chunk => { serverOutput += chunk; });
  server.stderr.on("data", chunk => { serverOutput += chunk; });
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try { if ((await fetch(`${base}/en`)).ok) return; } catch { /* The owned server is starting. */ }
    if (server.exitCode !== null) throw new Error(serverOutput);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`Production server did not become ready. ${serverOutput}`);
});
after(async () => {
  if (server && server.exitCode === null) {
    const closed = new Promise(resolve => server.once("exit", resolve));
    server.kill("SIGTERM"); await closed;
  }
});

test("English is the default and old links redirect", async () => {
  for (const [path, target] of [["/", "/en"], ["/services", "/en/services"], ["/work/internal-business-system", "/en/work/internal-business-system"]]) {
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    assert.ok([307, 308].includes(response.status));
    assert.equal(new URL(response.headers.get("location"), base).pathname, target);
  }
});

const paths = { en: ["", "services", "work", "about", "contact"], es: ["", "servicios", "trabajos", "sobre-mi", "contacto"] };
for (const locale of ["en", "es"]) {
  for (const path of paths[locale]) {
    test(`${locale}/${path} renders the correct language and public contact`, async () => {
      const response = await fetch(`${base}/${locale}${path ? `/${path}` : ""}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.match(html, new RegExp(`<html lang="${locale}"`));
      assert.ok(html.includes(locale === "en" ? "Business Solutions" : "Soluciones de Negocio"));
      assert.match(html, /mailto:valenstoll26@gmail\.com/);
      assert.doesNotMatch(html, /USD 1,000|USD 2,500|Starting at/);
      if (!path) assert.ok(html.includes(locale === "en" ? "I turn complex business problems" : "Transformo problemas complejos de negocio"));
      if (path === "contact" || path === "contacto") {
        assert.match(html, /https:\/\/wa\.me\/543513271655/);
        assert.match(html, /https:\/\/calendly\.com\/valenstoll26\/30min/);
        assert.match(html, /<form/);
      }
    });
  }
  for (const slug of ["financial-services-operations", "internal-business-system", "organizational-operations", "family-business-management", "mymo-financial-education", "restructuring-cost-optimization"]) {
    test(`${locale} case ${slug} has complete supplied content`, async () => {
      const response = await fetch(`${base}/${locale}/${locale === "en" ? "work" : "trabajos"}/${slug}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.ok(html.includes(locale === "en" ? "How I approached it" : "Cómo lo abordé"));
      assert.ok(html.includes(locale === "en" ? "Next project" : "Siguiente proyecto"));
      assert.doesNotMatch(html, /Editable:|Case study outlines|Career timeline in preparation/);
      if (slug === "internal-business-system") assert.ok(html.includes(locale === "en" ? "not a claim that a complete system" : "no afirma que se haya desarrollado"));
    });
  }
}
test("unknown locales, untranslated paths and missing projects return 404", async () => {
  for (const path of ["/fr", "/es/services", "/en/trabajos", "/es/trabajos/not-a-project"]) assert.equal((await fetch(`${base}${path}`)).status, 404);
});
test("family-office scope and updated independent experience are explicit", async () => {
  const services = await (await fetch(`${base}/es/servicios`)).text();
  assert.match(services, /no incluye asesoramiento de inversión, legal, impositivo ni financiero regulado/);
  const about = await (await fetch(`${base}/es/sobre-mi`)).text();
  assert.match(about, /planeación financiera/);
  assert.doesNotMatch(about, /directiva de CPF/);
  const englishAbout = await (await fetch(`${base}/en/about`)).text();
  assert.match(englishAbout, /Independent experience · financial planning/);
  assert.doesNotMatch(englishAbout, /CPF leadership board/);
  assert.match(about, /Valman SRL/);
  assert.match(about, /Nuclio Digital School/);
});
test("both sharing images, crawler endpoints and placeholders work", async () => {
  for (const locale of ["en", "es"]) {
    const response = await fetch(`${base}/opengraph-image?lang=${locale}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /image\/png/);
    assert.deepEqual([...Buffer.from(await response.arrayBuffer()).subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  }
  for (const path of ["/sitemap.xml", "/robots.txt", "/icon.svg", "/images/valentina-hero.svg", "/images/valentina-about.svg"]) assert.equal((await fetch(`${base}${path}`)).status, 200);
});
test("translations have matching keys and no empty copy", async () => {
  const en = JSON.parse(await readFile(new URL("../messages/en.json", import.meta.url)));
  const es = JSON.parse(await readFile(new URL("../messages/es.json", import.meta.url)));
  const compare = (left, right, path = "") => {
    assert.deepEqual(Object.keys(left), Object.keys(right), path);
    for (const key of Object.keys(left)) {
      if (typeof left[key] === "object") compare(left[key], right[key], `${path}.${key}`);
      else { assert.equal(typeof right[key], "string"); assert.ok(right[key].trim(), `${path}.${key}`); }
    }
  };
  compare(en, es);
});
test("contact validates missing/oversized input and accepts a legitimate enquiry", () => {
  const valid = { name: "A Person", email: "person@example.com", company: "Example", country: "Argentina", service: "product", message: "I would like to discuss a product concept.", website: "" };
  assert.deepEqual(validateContact(valid).errors, {});
  assert.equal(validateContact({ ...valid, email: "not-an-email" }).errors.email, "email");
  assert.equal(validateContact({ ...valid, message: "Too short" }).errors.message, "message");
  assert.equal(validateContact({ ...valid, country: "a".repeat(151) }).errors.country, "length");
  assert.equal(validateContact({ ...valid, website: "bot" }).errors.website, "blocked");
});
test("email draft safely encodes user text and stays a draft", () => {
  const draft = emailDraft("valenstoll26@gmail.com", "Consulta & UX", [["Message", "Hello &subject=injected?\nSecond line"]]);
  const parsed = new URL(draft);
  assert.equal(parsed.protocol, "mailto:");
  assert.equal(parsed.searchParams.get("subject"), "Consulta & UX");
  assert.equal(parsed.searchParams.get("body"), "Message: Hello &subject=injected?\nSecond line");
});
