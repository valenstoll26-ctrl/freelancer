import type { Localized } from "./profile";
export type Service = { id: string; title: Localized<string>; description: Localized<string>; includes: Localized<string[]>; fit: Localized<string>; disclaimer?: Localized<string> };
export const services: Service[] = [
  {
    id: "business-solutions",
    title: { en: "Business Solutions Consulting", es: "Consultoría en Soluciones de Negocio" },
    description: { en: "I help companies identify business problems and turn them into practical solutions.", es: "Ayudo a empresas a identificar problemas y convertirlos en soluciones concretas." },
    includes: { en: ["Internal tools & dashboards", "New workflows", "Service improvements", "Business systems", "Customer & team experiences", "Project concepts & solution design"], es: ["Herramientas internas y dashboards", "Nuevos sistemas de trabajo", "Mejoras de servicio", "Sistemas de gestión", "Experiencias para clientes y equipos", "Conceptualización y diseño de soluciones"] },
    fit: { en: "Founders and teams who know something could work better but don’t yet know what the solution should look like.", es: "Founders y equipos que saben que algo puede funcionar mejor, pero todavía no tienen claro cómo debería ser la solución." },
  },
  {
    id: "automation",
    title: { en: "Business Process & Automation", es: "Procesos & Automatización" },
    description: { en: "I redesign inefficient processes and help companies build simpler, more scalable ways of working.", es: "Rediseño procesos ineficientes y ayudo a empresas a construir formas de trabajo más simples y escalables." },
    includes: { en: ["Process mapping & workflow redesign", "SOPs", "No-code automation", "ClickUp · Notion · Airtable · Make", "Internal dashboards", "Team workflows"], es: ["Mapeo y rediseño de procesos", "Procedimientos operativos", "Automatización no-code", "ClickUp · Notion · Airtable · Make", "Dashboards internos", "Flujos de trabajo de equipos"] },
    fit: { en: "Businesses ready to reduce manual coordination and bring more clarity to recurring work.", es: "Empresas que buscan reducir la coordinación manual y dar claridad al trabajo recurrente." },
    disclaimer: { en: "I design the business logic, processes and automation systems, and coordinate technical implementation when required.", es: "Diseño la lógica de negocio, los procesos y los sistemas de automatización, y coordino la implementación técnica cuando es necesaria." },
  },
  {
    id: "operations",
    title: { en: "Fractional Operations Leadership", es: "Dirección de Operaciones Fractional" },
    description: { en: "Operational leadership for companies that need senior support but are not ready to hire a full-time operations director.", es: "Liderazgo operativo para empresas que necesitan apoyo senior sin incorporar una dirección de operaciones a tiempo completo." },
    includes: { en: ["Fractional COO / Operations Partner", "Strategic project coordination", "Leadership support & priorities", "Operational planning", "Team accountability", "Systems, processes & reporting"], es: ["Fractional COO / Operations Partner", "Coordinación de proyectos estratégicos", "Apoyo a dirección y prioridades", "Planificación operativa", "Responsabilidades de equipo", "Sistemas, procesos y reportes"] },
    fit: { en: "Growing businesses that need someone to connect planning with day-to-day execution.", es: "Empresas en crecimiento que necesitan conectar la planificación con la ejecución cotidiana." },
  },
  {
    id: "product",
    title: { en: "Digital Product & UX Consulting", es: "Producto Digital & UX" },
    description: { en: "I help founders and companies turn ideas into clearer digital products.", es: "Ayudo a founders y empresas a convertir ideas en productos digitales claros y desarrollables." },
    includes: { en: ["Idea definition & product strategy", "Feature definition", "User journeys & information architecture", "Workflows & wireframes", "UX thinking & prototypes", "Requirements & development handoff"], es: ["Definición de ideas y estrategia de producto", "Definición de funcionalidades", "Recorridos de usuario y arquitectura de información", "Flujos y wireframes", "UX y prototipos", "Requisitos y preparación para desarrollo"] },
    fit: { en: "Founders with an idea who need help turning it into something developers and designers can actually build.", es: "Founders con una idea que necesitan convertirla en algo que diseñadores y desarrolladores puedan construir." },
  },
  {
    id: "family-office",
    title: { en: "Family Office & Private Business Support", es: "Family Office & Empresas Familiares" },
    description: { en: "Strategic and operational support for family offices, private businesses and family-owned companies.", es: "Apoyo estratégico y operativo para family offices, empresas privadas y empresas familiares." },
    includes: { en: ["Project coordination & follow-up", "Administrative organization", "Reporting & documentation", "Vendor coordination", "Internal systems", "Family business organization"], es: ["Coordinación y seguimiento de proyectos", "Organización administrativa", "Reportes y documentación", "Coordinación de proveedores", "Sistemas internos", "Organización de empresas familiares"] },
    fit: { en: "Private and family businesses that need trusted coordination across people, projects and administration.", es: "Empresas privadas y familiares que necesitan coordinación cercana entre personas, proyectos y administración." },
    disclaimer: { en: "This service does not include investment, legal, tax or regulated financial advice.", es: "Este servicio no incluye asesoramiento de inversión, legal, impositivo ni financiero regulado." },
  },
  {
    id: "programs",
    title: { en: "Event & Program Management", es: "Eventos & Programas" },
    description: { en: "I design and coordinate professional events, educational programs and member/community experiences.", es: "Diseño y coordino eventos profesionales, programas educativos y experiencias para miembros y comunidades." },
    includes: { en: ["Event strategy & program design", "Speaker & vendor coordination", "Timelines & communications", "Registration flows", "Community experience", "Virtual, hybrid & educational programs"], es: ["Estrategia de eventos y diseño de programas", "Coordinación de speakers y proveedores", "Cronogramas y comunicaciones", "Flujos de inscripción", "Experiencias de comunidad", "Programas virtuales, híbridos y educativos"] },
    fit: { en: "Professional associations, companies, educational organizations, communities and financial services organizations.", es: "Asociaciones profesionales, empresas, organizaciones educativas, comunidades y entidades de servicios financieros." },
  },
];
