export const site = {
  name: "Valentina Stoll",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "valenstoll26@gmail.com",
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com/valenstoll26/30min",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/valentinastoll/",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "543513271655",
  whatsappDisplay: "+54 351 327 1655",
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ""),
  showPrices: false,
  images: { hero: "/images/valentina-hero.svg", about: "/images/valentina-about.svg", hasPortraits: false },
  keywords: ["Business Solutions Consultant", "Business Designer", "Business Consultant", "Process Consultant", "Automation Consultant", "No-Code Consultant", "Fractional COO", "Fractional Operations", "Digital Product Consultant", "UX Consultant", "Family Office Operations", "Family Business Consultant", "Program Manager", "Event Program Manager", "Project Management Consultant", "LATAM Consultant", "US Business Consultant"],
};
