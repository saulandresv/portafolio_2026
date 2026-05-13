export type Lang = 'es' | 'en'
export type Bilingual = string | { es: string; en: string }

export const CONTENT = {
  name: "Saul Vega",
  role: { es: "Full Stack Developer.", en: "Full Stack Developer." },
  subrole: { es: "Analista Programador Titulado · Duoc UC", en: "Certified Software Analyst · Duoc UC" },
  location: "Chile",
  email: "saul.vega2@gmail.com",
  github: "saulandresv",
  linkedin: "",              // ← agrega tu URL de LinkedIn
  cv: "",                    // ← agrega link al CV
  available: { es: "Disponible para nuevas oportunidades", en: "Open to new opportunities" },

  bio: {
    es: [
      "Analista Programador Computacional titulado, apasionado por resolver problemas complejos a través de la tecnología.",
      "Mi formación en Duoc UC me proporcionó una base sólida en el ciclo de vida del desarrollo de software. Estoy en constante aprendizaje de nuevas tecnologías para ofrecer soluciones innovadoras y de alta calidad.",
    ],
    en: [
      "Certified Computer Programming Analyst, passionate about solving complex problems through technology.",
      "My training at Duoc UC gave me a strong foundation in the full software development lifecycle. I'm constantly learning new technologies to deliver innovative, high-quality solutions.",
    ],
  },

  stats: [
    { k: "2025", v: { es: "Titulación Duoc UC", en: "Duoc UC graduation" } },
    { k: "12",   v: { es: "Tecnologías en stack", en: "Stack technologies" } },
    { k: "3",    v: { es: "Certificaciones", en: "Certifications" } },
    { k: "24h",  v: { es: "Respuesta a mensajes", en: "Reply time" } },
  ],

  projects: [
    {
      id: 1,
      title: "BloodPoint",
      tag: { es: "Proyecto de título · Duoc UC", en: "Capstone project · Duoc UC" },
      summary: {
        es: "Plataforma móvil que conecta donantes de sangre con centros de salud mediante geolocalización en tiempo real, escaneo de QR y un sistema de logros gamificado para incentivar donaciones.",
        en: "Mobile platform connecting blood donors with health centers via real-time geolocation, QR code scanning and a gamified achievement system to incentivize donations.",
      },
      description: {
        es: "Proyecto de título realizado en equipo de 3 personas. Plataforma integral de gestión y promoción de donaciones de sangre con tres roles: donante, representante de centro de salud y administrador. App móvil híbrida con mapa en tiempo real de centros de donación, generación de códigos QR para registrar donaciones, notificaciones push con recordatorios, y sistema gamificado de ranking y logros para incentivar la participación. Dashboard analítico (Apache Superset) para reportes estadísticos por tipo de sangre, campaña y zona geográfica. Backend REST en Django y PostgreSQL. Chatbot construido con OpenRouter API + DeepSeek Chat, entrenado estrictamente sobre información de donación de sangre para garantizar precisión.",
        en: "Team capstone project (3 members). End-to-end blood-donation management platform with three roles: donor, health-center representative, and administrator. Hybrid mobile app with real-time donation center map, QR code generation for donation registration, push notification reminders, and a gamified ranking and achievement system to drive participation. Apache Superset analytics dashboard for statistical reports by blood type, campaign and geographic area. Django + PostgreSQL REST backend. Chatbot powered by OpenRouter API + DeepSeek Chat, strictly scoped to blood-donation information for accuracy.",
      },
      tech: ["Ionic", "Angular", "Capacitor", "Mapbox", "Django", "PostgreSQL", "DeepSeek", "OpenRouter"],
      images: [
        "/images/bloodpoint/dashboard.png",
        "/images/bloodpoint/campaign.png",
        "/images/bloodpoint/arquitectura.png",
      ],
      role: { es: "Trabajo en equipo", en: "Team project" },
      year: "2025",
      link: "https://github.com/saulandresv/clon-bloodpoint-app",
      featured: true,
      accent: "lime",
    },
  ],

  skills: {
    languages:  ["JavaScript", "TypeScript", "Python", "SQL", "Java"],
    frameworks: ["React", "Next.js", "Node.js", "Angular", "Ionic", "Django", "Vue"],
    craft:      ["Tailwind CSS", "GraphQL", "Capacitor", "Mapbox"],
    ops:        ["Git", "Docker", "AWS", "PostgreSQL"],
  },

  education: {
    institution: "Duoc UC",
    degree: { es: "Analista Programador Computacional", en: "Computer Programming Analyst" },
    period: "Marzo 2023 — Julio 2025",
    status: { es: "Titulado", en: "Certified" },
    description: {
      es: "Formación integral en desarrollo de software, bases de datos y arquitectura de sistemas. Especialización en tecnologías modernas y metodologías ágiles.",
      en: "Comprehensive training in software development, databases, and system architecture. Specialization in modern technologies and agile methodologies.",
    },
  },

  languages: [
    { name: "Español", level: { es: "Nativo",              en: "Native" } },
    { name: "Inglés",  level: { es: "Técnico · Intermedio", en: "Technical · Intermediate" } },
  ],

  certifications: [] as string[],

  tools: [
    { name: "Excel",   category: { es: "Análisis",       en: "Analysis"    } },
    { name: "PowerBI", category: { es: "Análisis",       en: "Analysis"    } },
    { name: "Postman", category: { es: "Dev",            en: "Dev"         } },
    { name: "DBeaver", category: { es: "Bases de datos", en: "Databases"   } },
    { name: "Notion",  category: { es: "Productividad",  en: "Productivity"} },
    { name: "n8n",     category: { es: "Automatización", en: "Automation"  } },
    { name: "Vercel",  category: { es: "Deploy",         en: "Deploy"      } },
    { name: "Copilot", category: { es: "IA",             en: "AI"          } },
    { name: "Canva",   category: { es: "Diseño",         en: "Design"      } },
  ],

  quickFacts: [
    { k: { es: "Ubicación",     en: "Location"   }, v: "Chile" },
    { k: { es: "Título",        en: "Degree"     }, v: { es: "Titulado 2025",      en: "Certified 2025" } },
    { k: { es: "Modalidad",     en: "Work mode"  }, v: { es: "Remoto · Híbrido",   en: "Remote · Hybrid" } },
    { k: { es: "Inglés",        en: "English"    }, v: { es: "Intermedio",          en: "Intermediate" } },
    { k: { es: "Disponibilidad",en: "Availability"},v: { es: "Inmediata",           en: "Immediate" } },
  ],
}
