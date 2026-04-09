export const SECTION_IDS = {
  services: "services",
  useCases: "use-cases",
  process: "process",
  cases: "cases",
  contact: "contact",
} as const;

export type Locale = "es" | "en";
export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export type NavItem = {
  label: string;
  href: `#${SectionId}`;
};

export type Metric = {
  value: string;
  label: string;
};

export type ServiceCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
  tags: string[];
};

export type UseCaseCard = {
  title: string;
  audience: string;
  description: string;
  impact: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  detail: string;
};

export type CaseStudy = {
  title: string;
  sector: string;
  summary: string;
  outcomes: string[];
  technologies: string[];
  image: string;
};

export type CapabilityGroup = {
  title: string;
  description: string;
  items: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type LeadOption = {
  value: string;
  label: string;
};

export type LeadFieldLabel = {
  label: string;
  placeholder: string;
};

export type LeadFormLabels = {
  title: string;
  description: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorFallback: string;
  privacy: string;
  emailSubject: string;
  fields: {
    name: LeadFieldLabel;
    email: LeadFieldLabel;
    company: LeadFieldLabel;
    role: LeadFieldLabel;
    primaryNeed: LeadFieldLabel;
    teamSize: LeadFieldLabel;
    timeframe: LeadFieldLabel;
    message: LeadFieldLabel;
  };
  options: {
    primaryNeed: LeadOption[];
    teamSize: LeadOption[];
    timeframe: LeadOption[];
  };
  validation: {
    email: string;
    message: string;
  };
};

export type SiteContent = {
  localeLabel: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    brandTagline: string;
    items: NavItem[];
    primaryCta: string;
    localeLabel: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Metric[];
    highlights: string[];
    panel: {
      eyebrow: string;
      title: string;
      subtitle: string;
      status: string;
      metrics: Metric[];
      workflowTitle: string;
      workflowItems: {
        label: string;
        detail: string;
        status: string;
      }[];
      footer: string;
    };
  };
  trustBar: {
    items: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    cards: ServiceCard[];
  };
  useCases: {
    eyebrow: string;
    title: string;
    description: string;
    cards: UseCaseCard[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  cases: {
    eyebrow: string;
    title: string;
    description: string;
    cards: CaseStudy[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    description: string;
    groups: CapabilityGroup[];
    footer: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FAQItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    panelTitle: string;
    panelDescription: string;
    nextSteps: string[];
    details: {
      label: string;
      value: string;
      href?: string;
    }[];
    responseTime: string;
  };
  footer: {
    title: string;
    summary: string;
    secondarySummary: string;
    cta: string;
    navTitle: string;
    localeCta: string;
    rights: string;
  };
  leadForm: LeadFormLabels;
};

export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}

export function getLocaleFromPathname(pathname?: string | null): Locale {
  return pathname?.startsWith("/en") ? "en" : "es";
}

export function getLocalizedPath(locale: Locale): string {
  return locale === "es" ? "/" : "/en";
}

const siteContent: Record<Locale, SiteContent> = {
  es: {
    localeLabel: "ES",
    meta: {
      title: "AutomIQ | Estudio IA para automatización, agentes y apps inteligentes",
      description:
        "AutomIQ diseña agentes, automatizaciones, copilotos y aplicaciones con IA para equipos de LatAm y US. Menos trabajo manual, mejor operación y una hoja de ruta clara para convertir IA en resultados.",
      keywords: [
        "AutomIQ",
        "estudio IA",
        "agentes de inteligencia artificial",
        "automatización con IA",
        "copilotos empresariales",
        "apps con IA",
        "integraciones IA",
        "AI automation studio",
        "LatAm AI agency",
        "IA para empresas",
      ],
    },
    nav: {
      brandTagline: "AI systems for real operations",
      items: [
        { label: "Servicios", href: "#services" },
        { label: "Casos de uso", href: "#use-cases" },
        { label: "Proceso", href: "#process" },
        { label: "Casos", href: "#cases" },
        { label: "Contacto", href: "#contact" },
      ],
      primaryCta: "Agenda un diagnóstico",
      localeLabel: "Idioma",
    },
    hero: {
      badge: "Estudio IA integral para LatAm + US",
      title: "Diseñamos sistemas de IA que",
      highlight: "mejoran la operación de verdad",
      description:
        "Creamos agentes, automatizaciones, copilotos y aplicaciones inteligentes conectadas a tus procesos. La meta no es “tener IA”, sino reducir fricción, acelerar decisiones y liberar a tu equipo del trabajo repetitivo.",
      primaryCta: "Agenda un diagnóstico",
      secondaryCta: "Ver servicios",
      stats: [
        { value: "2-4 semanas", label: "de discovery a piloto funcional" },
        { value: "Human-in-the-loop", label: "para pasos sensibles y aprobaciones" },
        { value: "LatAm + US", label: "operación bilingüe y entregables claros" },
      ],
      highlights: [
        "Agentes conectados a correo, CRM, documentos y APIs internas",
        "Automatizaciones con trazabilidad, validaciones y escalamiento humano",
        "Interfaces claras para operar, aprobar y medir cada flujo",
      ],
      panel: {
        eyebrow: "Capa operativa",
        title: "Centro de control IA",
        subtitle: "Agentes, colas, aprobaciones y métricas en una misma vista.",
        status: "Pilotos activos",
        metrics: [
          { value: "37%", label: "menos tickets manuales" },
          { value: "4.6h", label: "tiempo medio ahorrado por equipo" },
          { value: "98.2%", label: "ejecuciones trazadas" },
        ],
        workflowTitle: "Flujos orquestados",
        workflowItems: [
          {
            label: "Intake inteligente",
            detail: "Clasifica solicitudes, identifica prioridad y enruta el caso.",
            status: "Live",
          },
          {
            label: "Copiloto interno",
            detail: "Consulta SOPs, políticas y documentación operativa.",
            status: "QA",
          },
          {
            label: "Aprobación humana",
            detail: "Mantiene control en pagos, cambios críticos y respuestas delicadas.",
            status: "Required",
          },
        ],
        footer:
          "La IA ejecuta lo repetible. Tu equipo conserva criterio, supervisión y contexto.",
      },
    },
    trustBar: {
      items: [
        "Agentes y copilotos orientados a negocio, no demos aisladas",
        "Arquitectura con APIs, RPA, automatización y frontends operables",
        "Pilotos rápidos con priorización clara y roadmap de escalado",
        "Entrega bilingüe para equipos en español e inglés",
      ],
    },
    services: {
      eyebrow: "Servicios IA",
      title: "Cuatro formas de convertir IA en capacidad operativa",
      description:
        "La oferta se organiza alrededor de resultados concretos. Diseñamos el sistema, conectamos datos y herramientas, y dejamos una experiencia que el equipo puede usar sin fricción.",
      cards: [
        {
          id: "agents",
          eyebrow: "Agentes y copilotos",
          title: "Asistentes que responden, analizan y ejecutan tareas reales",
          description:
            "Construimos agentes para soporte, ventas, operaciones y uso interno, conectados a tus fuentes de verdad y con reglas claras de cuándo escalar a una persona.",
          outcomes: [
            "Respuestas más rápidas con contexto de negocio",
            "Menos carga manual para equipos operativos",
            "Mejor calidad en clasificación, seguimiento y resolución",
          ],
          tags: ["Chat", "Voice", "CRM", "Knowledge"],
        },
        {
          id: "automation",
          eyebrow: "Automatización e integraciones",
          title: "Flujos inteligentes entre tus herramientas y equipos",
          description:
            "Orquestamos procesos con IA, APIs y plataformas de automatización para mover información, generar acciones y evitar cuellos de botella invisibles.",
          outcomes: [
            "Menos pasos repetitivos y menos errores de coordinación",
            "Trazabilidad completa de eventos, aprobaciones y excepciones",
            "Capacidad de escalar procesos sin crecer linealmente el equipo",
          ],
          tags: ["n8n", "Make", "Power Platform", "APIs"],
        },
        {
          id: "apps",
          eyebrow: "Apps y portales con IA",
          title: "Interfaces claras para operar la inteligencia, no solo verla",
          description:
            "Diseñamos portales, dashboards y productos web donde la IA se integra en el flujo de trabajo: revisión, aprobación, priorización, análisis y seguimiento.",
          outcomes: [
            "Experiencias útiles para equipos no técnicos",
            "Mejor adopción interna de nuevas capacidades",
            "Capas de control, métricas y feedback sobre el comportamiento de la IA",
          ],
          tags: ["Next.js", "React", "Dashboards", "UX"],
        },
        {
          id: "knowledge",
          eyebrow: "Conocimiento y analítica asistida",
          title: "Sistemas que convierten información dispersa en decisiones útiles",
          description:
            "Organizamos documentación, procesos y señales operativas para que la IA ayude a responder, detectar riesgo, resumir contexto y priorizar acciones.",
          outcomes: [
            "Acceso más rápido a SOPs, políticas y documentación",
            "Menos dependencia de expertos para preguntas repetidas",
            "Lectura operativa de datos con foco en decisiones",
          ],
          tags: ["RAG", "Docs", "Analytics", "Internal Ops"],
        },
      ],
    },
    useCases: {
      eyebrow: "Casos de uso",
      title: "IA aplicada a puntos donde el negocio siente el cambio",
      description:
        "No vendemos una categoría abstracta. Entramos en procesos donde el impacto es visible en tiempo, capacidad de respuesta y calidad operativa.",
      cards: [
        {
          title: "Ventas y revenue operations",
          audience: "Lead qualification · follow-up · handoff",
          description:
            "Agentes que califican leads, resumen llamadas, preparan handoffs y mantienen limpio el flujo entre marketing, SDRs y account teams.",
          impact: "Menos fuga entre etapas y mejor velocidad comercial.",
        },
        {
          title: "Soporte y service desk",
          audience: "Triage · base de conocimiento · escalamiento",
          description:
            "Copilotos y asistentes que entienden intención, buscan contexto y derivan correctamente cuando un caso requiere revisión humana.",
          impact: "Mejor SLA sin sobrecargar a los equipos de soporte.",
        },
        {
          title: "Backoffice y finanzas",
          audience: "Validación · documentación · aprobaciones",
          description:
            "Flujos para recopilar documentos, revisar consistencia, generar resúmenes y mantener trazabilidad en procesos sensibles.",
          impact: "Menos retrabajo y más control en tareas críticas.",
        },
        {
          title: "Conocimiento interno y operaciones",
          audience: "SOPs · onboarding · decisiones recurrentes",
          description:
            "Sistemas que convierten documentos dispersos y experiencia tácita en respuestas útiles para equipos que necesitan actuar rápido.",
          impact: "Respuesta consistente incluso cuando el experto no está disponible.",
        },
      ],
    },
    process: {
      eyebrow: "Proceso de trabajo",
      title: "Diseño, piloto y escalado con foco en claridad operacional",
      description:
        "Trabajamos en tres etapas para que cada iniciativa tenga un objetivo medible, un piloto útil y una base técnica lista para crecer.",
      steps: [
        {
          title: "Diagnóstico y priorización",
          description:
            "Mapeamos procesos, puntos de fricción, fuentes de datos y restricciones reales.",
          detail:
            "El entregable es una hipótesis de impacto clara, con dónde usar IA y dónde no.",
        },
        {
          title: "Piloto funcional",
          description:
            "Construimos una primera versión utilizable con métricas, validaciones y revisión humana.",
          detail:
            "Buscamos aprendizaje operativo, adopción y resultados visibles antes de escalar.",
        },
        {
          title: "Hardening y expansión",
          description:
            "Optimizamos la experiencia, conectamos más sistemas y definimos observabilidad y ownership.",
          detail:
            "La solución pasa de experimento prometedor a capacidad integrada del negocio.",
        },
      ],
    },
    cases: {
      eyebrow: "Casos destacados",
      title: "Ejemplos del tipo de sistemas que construimos",
      description:
        "Los casos combinan interfaz, automatización y lógica asistida por IA para resolver trabajo operativo real. En esta versión priorizamos un before/after cualitativo sobre claims inflados.",
      cards: [
        {
          title: "Portal operativo para priorización y seguimiento",
          sector: "Operaciones internas · Web app",
          summary:
            "Una interfaz centralizó solicitudes, estados y handoffs entre áreas, reduciendo la dependencia de hojas dispersas y comunicación fragmentada.",
          outcomes: [
            "Una sola vista para intake, prioridad y seguimiento",
            "Más claridad para equipos que compartían contexto por correo",
            "Base lista para sumar copilotos y reglas de automatización",
          ],
          technologies: ["Next.js", "TypeScript", "Dashboards", "APIs"],
          image: "/assets/cases/Case1.png",
        },
        {
          title: "Flujo asistido para validación documental y coordinación",
          sector: "Backoffice · Automatización",
          summary:
            "El proceso pasó de secuencias manuales y revisiones repetidas a un flujo con validaciones, alertas y puntos explícitos de aprobación humana.",
          outcomes: [
            "Menos trabajo manual en recopilación y control",
            "Escalamiento claro para excepciones",
            "Mejor trazabilidad para auditoría interna y seguimiento",
          ],
          technologies: ["Power Automate", "Documents", "Alerts", "Approvals"],
          image: "/assets/cases/Case2.png",
        },
        {
          title: "Pipeline cognitivo para intake y clasificación",
          sector: "IA operativa · Integraciones",
          summary:
            "Se estructuró la entrada de formularios y mensajes para clasificar, resumir y enrutar casos con reglas de negocio y supervisión humana.",
          outcomes: [
            "Más consistencia en cómo se reciben y entienden los casos",
            "Menos dependencia del criterio manual en la primera lectura",
            "Infraestructura lista para agentes y reporting posterior",
          ],
          technologies: ["AI Models", "Classification", "RPA", "APIs"],
          image: "/assets/cases/Case3.png",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capacidades",
      title: "La mezcla técnica cambia según el problema, no al revés",
      description:
        "Elegimos la arquitectura mínima que haga el trabajo bien: modelos, automatización, interfaz, observabilidad y puntos de control humano.",
      groups: [
        {
          title: "Orquestación y ejecución",
          description:
            "Flujos, disparadores, integraciones y trabajo entre sistemas.",
          items: [
            "n8n, Make, Power Platform, webhooks y APIs",
            "RPA cuando el contexto lo exige",
            "Colas, retries, aprobaciones y handoff explícito",
          ],
        },
        {
          title: "Inteligencia y contexto",
          description:
            "Modelos, reglas, recuperación de conocimiento y evaluación.",
          items: [
            "Agentes con acceso a documentación y datos de negocio",
            "RAG, clasificación, extracción y síntesis",
            "Supervisión humana y guardrails por flujo",
          ],
        },
        {
          title: "Interfaz y adopción",
          description:
            "La capa donde el equipo usa, aprueba y mide la solución.",
          items: [
            "Apps en Next.js y React para operar el sistema",
            "Dashboards, estados, métricas y audit trail",
            "Experiencias bilingües orientadas a claridad y velocidad",
          ],
        },
      ],
      footer:
        "No hacemos demos sueltas. Diseñamos sistemas que conviven con la operación y pueden crecer con ella.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Preguntas que suelen aparecer antes de arrancar",
      description:
        "Queremos que la conversación empiece en claridad: dónde aporta la IA, cómo se mide y qué se necesita para que funcione bien.",
      items: [
        {
          question: "¿Trabajan solo proyectos de IA o también la capa de producto y automatización?",
          answer:
            "Sí. Nuestra propuesta une IA, automatización, integraciones y la interfaz donde el equipo opera. Esa combinación es la que hace que la solución sea usable y medible.",
        },
        {
          question: "¿Necesito tener los datos perfectos antes de empezar?",
          answer:
            "No. En el diagnóstico identificamos qué señales ya existen, qué se puede conectar rápido y qué supuestos hay que validar en el piloto antes de escalar.",
        },
        {
          question: "¿La IA reemplaza a las personas dentro del flujo?",
          answer:
            "No planteamos la solución así. Diseñamos automatización con puntos claros de aprobación, revisión y escalamiento humano cuando el riesgo o la ambigüedad lo requieren.",
        },
        {
          question: "¿Pueden trabajar con equipos en español e inglés?",
          answer:
            "Sí. La web, la documentación, la experiencia y los entregables pueden plantearse en ambos idiomas para operar con equipos de LatAm y US.",
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Agenda un diagnóstico y definamos dónde la IA sí mueve la aguja",
      description:
        "Cuéntanos tu contexto y te respondemos con una lectura inicial de oportunidad, alcance y siguiente paso recomendado.",
      panelTitle: "Qué pasa después",
      panelDescription:
        "No enviamos una respuesta genérica. Revisamos el caso, priorizamos impacto y proponemos una conversación útil para tomar decisión.",
      nextSteps: [
        "Revisamos tu proceso, punto de fricción y nivel de urgencia.",
        "Te devolvemos una hipótesis de solución, piloto o roadmap inicial.",
        "Si hay fit, avanzamos a discovery o a un piloto con alcance definido.",
      ],
      details: [
        { label: "Email", value: "info@automiq.dev", href: "mailto:info@automiq.dev" },
        { label: "Teléfono", value: "+1 (829) 707-1293", href: "tel:+18297071293" },
        { label: "Base", value: "Santo Domingo, República Dominicana" },
      ],
      responseTime: "Respuesta inicial usual: dentro de 1 día hábil.",
    },
    footer: {
      title: "AutomIQ",
      summary:
        "Estudio IA bilingüe para agentes, automatización, copilotos y aplicaciones inteligentes.",
      secondarySummary:
        "Diseñamos sistemas que reducen trabajo manual y convierten IA en capacidad operativa.",
      cta: "Agenda un diagnóstico",
      navTitle: "Explorar",
      localeCta: "Ver versión en inglés",
      rights: "Todos los derechos reservados.",
    },
    leadForm: {
      title: "Cuéntanos qué necesitas",
      description:
        "Mientras más contexto nos compartas, más precisa será la respuesta inicial.",
      submit: "Enviar solicitud",
      submitting: "Enviando…",
      successTitle: "Solicitud enviada",
      successBody: "Te contactaremos con un siguiente paso claro lo antes posible.",
      errorFallback: "No pudimos enviar el formulario. Inténtalo de nuevo en unos minutos.",
      privacy:
        "Al enviar aceptas que usemos tus datos para responder a esta solicitud. No compartimos información con terceros.",
      emailSubject: "Nuevo diagnóstico solicitado desde AutomIQ",
      fields: {
        name: { label: "Nombre completo", placeholder: "Tu nombre" },
        email: { label: "Correo electrónico", placeholder: "tu@empresa.com" },
        company: { label: "Empresa", placeholder: "Nombre de la empresa" },
        role: { label: "Cargo", placeholder: "Ej. Operaciones, Producto, Founder" },
        primaryNeed: { label: "Necesidad principal", placeholder: "Selecciona una opción" },
        teamSize: { label: "Tamaño del equipo", placeholder: "Selecciona una opción" },
        timeframe: { label: "Plazo deseado", placeholder: "Selecciona una opción" },
        message: {
          label: "Contexto y objetivo",
          placeholder:
            "Describe el proceso, el cuello de botella actual y qué resultado quieres conseguir.",
        },
      },
      options: {
        primaryNeed: [
          { value: "agents", label: "Agentes o copilotos" },
          { value: "automation", label: "Automatización e integraciones" },
          { value: "app", label: "App o portal con IA" },
          { value: "knowledge", label: "Conocimiento o analítica asistida" },
          { value: "other", label: "Otro / no estoy seguro" },
        ],
        teamSize: [
          { value: "1-10", label: "1-10 personas" },
          { value: "11-50", label: "11-50 personas" },
          { value: "51-200", label: "51-200 personas" },
          { value: "200+", label: "200+ personas" },
        ],
        timeframe: [
          { value: "asap", label: "Lo antes posible" },
          { value: "30-days", label: "En los próximos 30 días" },
          { value: "quarter", label: "Este trimestre" },
          { value: "exploring", label: "Estoy explorando opciones" },
        ],
      },
      validation: {
        email: "Ingresa un correo válido.",
        message: "Describe un poco más el contexto (mín. 20 caracteres).",
      },
    },
  },
  en: {
    localeLabel: "EN",
    meta: {
      title: "AutomIQ | AI studio for automation, agents, and intelligent apps",
      description:
        "AutomIQ builds AI agents, copilots, automations, and intelligent applications for LatAm and US teams. Less manual work, better operations, and a clear path from pilot to rollout.",
      keywords: [
        "AutomIQ",
        "AI studio",
        "AI agents",
        "AI automation",
        "enterprise copilots",
        "AI apps",
        "AI integrations",
        "LatAm AI agency",
        "operational AI systems",
        "workflow automation studio",
      ],
    },
    nav: {
      brandTagline: "AI systems for real operations",
      items: [
        { label: "Services", href: "#services" },
        { label: "Use cases", href: "#use-cases" },
        { label: "Process", href: "#process" },
        { label: "Cases", href: "#cases" },
        { label: "Contact", href: "#contact" },
      ],
      primaryCta: "Book a diagnostic",
      localeLabel: "Language",
    },
    hero: {
      badge: "Full-stack AI studio for LatAm + US teams",
      title: "We design AI systems that",
      highlight: "improve real operations",
      description:
        "We build agents, automations, copilots, and intelligent applications connected to your workflows. The goal is not to “add AI,” but to remove friction, speed up decisions, and free teams from repetitive work.",
      primaryCta: "Book a diagnostic",
      secondaryCta: "See services",
      stats: [
        { value: "2-4 weeks", label: "from discovery to working pilot" },
        { value: "Human-in-the-loop", label: "for sensitive steps and approvals" },
        { value: "LatAm + US", label: "bilingual delivery and collaboration" },
      ],
      highlights: [
        "Agents connected to email, CRM, documents, and internal APIs",
        "Automations with traceability, validations, and human escalation",
        "Clear interfaces to operate, approve, and measure every workflow",
      ],
      panel: {
        eyebrow: "Operating layer",
        title: "AI control center",
        subtitle: "Agents, queues, approvals, and metrics in one view.",
        status: "Active pilots",
        metrics: [
          { value: "37%", label: "fewer manual tickets" },
          { value: "4.6h", label: "average time saved per team" },
          { value: "98.2%", label: "tracked executions" },
        ],
        workflowTitle: "Orchestrated workflows",
        workflowItems: [
          {
            label: "Intelligent intake",
            detail: "Classifies requests, identifies priority, and routes each case.",
            status: "Live",
          },
          {
            label: "Internal copilot",
            detail: "Answers from SOPs, policies, and operational documentation.",
            status: "QA",
          },
          {
            label: "Human approval",
            detail: "Keeps control in payments, critical changes, and sensitive replies.",
            status: "Required",
          },
        ],
        footer:
          "AI executes the repeatable parts. Your team keeps judgment, oversight, and context.",
      },
    },
    trustBar: {
      items: [
        "Agents and copilots designed for business workflows, not isolated demos",
        "Architecture that combines APIs, RPA, automation, and usable frontends",
        "Fast pilots with clear prioritization and a rollout path",
        "Bilingual delivery for Spanish and English speaking teams",
      ],
    },
    services: {
      eyebrow: "AI services",
      title: "Four ways to turn AI into operational capacity",
      description:
        "We organize the offer around outcomes. We design the system, connect the tools and data, and deliver an experience teams can actually use.",
      cards: [
        {
          id: "agents",
          eyebrow: "Agents and copilots",
          title: "Assistants that answer, analyze, and execute real tasks",
          description:
            "We build agents for support, revenue, operations, and internal teams, connected to your sources of truth and with explicit rules for when humans step in.",
          outcomes: [
            "Faster responses with business context",
            "Less manual load for operational teams",
            "Higher consistency in triage, follow-up, and resolution",
          ],
          tags: ["Chat", "Voice", "CRM", "Knowledge"],
        },
        {
          id: "automation",
          eyebrow: "Automation and integrations",
          title: "Intelligent workflows between systems and teams",
          description:
            "We orchestrate processes with AI, APIs, and automation platforms so information moves correctly and friction stops hiding in handoffs.",
          outcomes: [
            "Fewer repetitive steps and coordination errors",
            "Full traceability for events, approvals, and exceptions",
            "The ability to scale process volume without linearly scaling headcount",
          ],
          tags: ["n8n", "Make", "Power Platform", "APIs"],
        },
        {
          id: "apps",
          eyebrow: "AI apps and portals",
          title: "Interfaces where teams operate intelligence instead of just seeing it",
          description:
            "We design portals, dashboards, and products where AI is part of the workflow: review, approval, prioritization, analysis, and follow-up.",
          outcomes: [
            "Useful experiences for non-technical teams",
            "Better internal adoption of new AI capabilities",
            "Control layers, metrics, and feedback over system behavior",
          ],
          tags: ["Next.js", "React", "Dashboards", "UX"],
        },
        {
          id: "knowledge",
          eyebrow: "Knowledge and assisted analytics",
          title: "Systems that turn scattered information into useful decisions",
          description:
            "We organize documentation, processes, and operational signals so AI can answer, detect risk, summarize context, and surface priorities.",
          outcomes: [
            "Faster access to SOPs, policies, and operational docs",
            "Less dependency on experts for repeated questions",
            "Better decision support from messy operational data",
          ],
          tags: ["RAG", "Docs", "Analytics", "Internal Ops"],
        },
      ],
    },
    useCases: {
      eyebrow: "Use cases",
      title: "Applied AI for places where the business feels the change",
      description:
        "We do not sell an abstract category. We work on workflows where the impact is visible in time, response capacity, and operating quality.",
      cards: [
        {
          title: "Revenue operations and sales",
          audience: "Lead qualification · follow-up · handoff",
          description:
            "Agents that qualify leads, summarize calls, prepare handoffs, and keep the funnel cleaner across marketing, SDRs, and account teams.",
          impact: "Less leakage between stages and better commercial velocity.",
        },
        {
          title: "Support and service desk",
          audience: "Triage · knowledge access · escalation",
          description:
            "Copilots and assistants that understand intent, find context, and route properly when a human needs to take over.",
          impact: "Stronger SLAs without overwhelming the support team.",
        },
        {
          title: "Back office and finance",
          audience: "Validation · documentation · approvals",
          description:
            "Workflows for collecting documents, checking consistency, generating summaries, and keeping traceability in sensitive processes.",
          impact: "Less rework and more control in critical tasks.",
        },
        {
          title: "Internal knowledge and operations",
          audience: "SOPs · onboarding · recurring decisions",
          description:
            "Systems that turn scattered documents and tribal knowledge into useful answers for teams that need to act fast.",
          impact: "Consistent answers even when the expert is unavailable.",
        },
      ],
    },
    process: {
      eyebrow: "Working process",
      title: "Design, pilot, and scale with operational clarity",
      description:
        "We work in three stages so every initiative has a measurable objective, a useful pilot, and a technical base ready to grow.",
      steps: [
        {
          title: "Diagnostic and prioritization",
          description:
            "We map workflows, friction points, data sources, and real constraints.",
          detail:
            "The output is a clear impact hypothesis, including where AI should help and where it should not.",
        },
        {
          title: "Functional pilot",
          description:
            "We build a usable first version with metrics, validations, and human review.",
          detail:
            "The goal is operational learning, adoption, and visible results before scaling.",
        },
        {
          title: "Hardening and expansion",
          description:
            "We improve the experience, connect more systems, and define observability and ownership.",
          detail:
            "The solution moves from promising experiment to integrated business capability.",
        },
      ],
    },
    cases: {
      eyebrow: "Selected cases",
      title: "Examples of the systems we build",
      description:
        "These examples combine interface, automation, and AI-assisted logic to solve real operational work. In this version we prioritize honest before/after narratives over inflated claims.",
      cards: [
        {
          title: "Operational portal for prioritization and follow-up",
          sector: "Internal operations · Web app",
          summary:
            "A single interface centralized requests, statuses, and handoffs across teams, replacing fragmented spreadsheets and disconnected communication.",
          outcomes: [
            "One place for intake, priority, and follow-up",
            "More clarity for teams sharing context by email before",
            "A strong base to add copilots and automation rules",
          ],
          technologies: ["Next.js", "TypeScript", "Dashboards", "APIs"],
          image: "/assets/cases/Case1.png",
        },
        {
          title: "Assisted workflow for document validation and coordination",
          sector: "Back office · Automation",
          summary:
            "The process moved from repetitive manual review to a workflow with validations, alerts, and explicit human approval points.",
          outcomes: [
            "Less manual work in collection and control",
            "Clear escalation paths for exceptions",
            "Better traceability for audit and internal follow-up",
          ],
          technologies: ["Power Automate", "Documents", "Alerts", "Approvals"],
          image: "/assets/cases/Case2.png",
        },
        {
          title: "Cognitive intake and classification pipeline",
          sector: "Operational AI · Integrations",
          summary:
            "Forms and messages were structured so cases could be classified, summarized, and routed with business rules and human oversight.",
          outcomes: [
            "More consistent intake and case understanding",
            "Less dependency on manual first-pass review",
            "Infrastructure ready for agents and downstream reporting",
          ],
          technologies: ["AI Models", "Classification", "RPA", "APIs"],
          image: "/assets/cases/Case3.png",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "The stack changes based on the problem, not the other way around",
      description:
        "We choose the minimum architecture that solves the work well: models, orchestration, interface, observability, and clear human control points.",
      groups: [
        {
          title: "Orchestration and execution",
          description: "Workflows, triggers, integrations, and system-to-system movement.",
          items: [
            "n8n, Make, Power Platform, webhooks, and APIs",
            "RPA when the business context actually requires it",
            "Queues, retries, approvals, and explicit handoff paths",
          ],
        },
        {
          title: "Intelligence and context",
          description: "Models, rules, knowledge retrieval, and evaluation.",
          items: [
            "Agents with access to business docs and data",
            "RAG, classification, extraction, and summarization",
            "Human supervision and guardrails by workflow",
          ],
        },
        {
          title: "Interface and adoption",
          description: "The layer where teams use, approve, and measure the system.",
          items: [
            "Next.js and React apps to operate the solution",
            "Dashboards, states, metrics, and audit trails",
            "Bilingual experiences designed for clarity and speed",
          ],
        },
      ],
      footer:
        "We do not build isolated demos. We design systems that can live inside real operations and grow with them.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions that usually come up before kickoff",
      description:
        "We want the conversation to start with clarity: where AI helps, how it gets measured, and what is needed for it to work well.",
      items: [
        {
          question: "Do you only handle AI, or also the product and automation layers around it?",
          answer:
            "We handle the full operating layer: AI, automation, integrations, and the interface where the team actually uses the solution. That combination is what makes the system usable and measurable.",
        },
        {
          question: "Do we need perfect data before starting?",
          answer:
            "No. During the diagnostic we identify what signals already exist, what can be connected quickly, and which assumptions must be validated during the pilot.",
        },
        {
          question: "Does AI replace people inside the workflow?",
          answer:
            "That is not how we design it. We build automation with explicit approval, review, and human escalation points when risk or ambiguity require it.",
        },
        {
          question: "Can you work with Spanish and English speaking teams?",
          answer:
            "Yes. The website, the documentation, the user experience, and the deliverables can all be structured in both languages for LatAm and US teams.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Book a diagnostic and let us identify where AI can move the needle",
      description:
        "Share your context and we will reply with an initial view on opportunity, scope, and the most sensible next step.",
      panelTitle: "What happens next",
      panelDescription:
        "You will not get a generic reply. We review the situation, prioritize impact, and propose a conversation that is useful for decision making.",
      nextSteps: [
        "We review your workflow, friction point, and level of urgency.",
        "We come back with an initial hypothesis, pilot idea, or roadmap direction.",
        "If there is a fit, we move into discovery or a tightly scoped pilot.",
      ],
      details: [
        { label: "Email", value: "info@automiq.dev", href: "mailto:info@automiq.dev" },
        { label: "Phone", value: "+1 (829) 707-1293", href: "tel:+18297071293" },
        { label: "Base", value: "Santo Domingo, Dominican Republic" },
      ],
      responseTime: "Typical first response: within 1 business day.",
    },
    footer: {
      title: "AutomIQ",
      summary:
        "Bilingual AI studio for agents, automation, copilots, and intelligent applications.",
      secondarySummary:
        "We design systems that reduce manual work and turn AI into operational capacity.",
      cta: "Book a diagnostic",
      navTitle: "Explore",
      localeCta: "View Spanish version",
      rights: "All rights reserved.",
    },
    leadForm: {
      title: "Tell us what you need",
      description:
        "The more context you share, the sharper our initial response will be.",
      submit: "Send request",
      submitting: "Sending…",
      successTitle: "Request sent",
      successBody: "We will get back to you with a clear next step as soon as possible.",
      errorFallback: "We could not send the form. Please try again in a few minutes.",
      privacy:
        "By sending this form you agree that we may use your information to respond to your request. We do not share it with third parties.",
      emailSubject: "New diagnostic request from AutomIQ",
      fields: {
        name: { label: "Full name", placeholder: "Your name" },
        email: { label: "Email", placeholder: "you@company.com" },
        company: { label: "Company", placeholder: "Company name" },
        role: { label: "Role", placeholder: "Ex. Operations, Product, Founder" },
        primaryNeed: { label: "Primary need", placeholder: "Select an option" },
        teamSize: { label: "Team size", placeholder: "Select an option" },
        timeframe: { label: "Desired timeline", placeholder: "Select an option" },
        message: {
          label: "Context and goal",
          placeholder:
            "Describe the workflow, the current bottleneck, and the result you want to achieve.",
        },
      },
      options: {
        primaryNeed: [
          { value: "agents", label: "Agents or copilots" },
          { value: "automation", label: "Automation and integrations" },
          { value: "app", label: "AI app or portal" },
          { value: "knowledge", label: "Knowledge or assisted analytics" },
          { value: "other", label: "Other / not sure yet" },
        ],
        teamSize: [
          { value: "1-10", label: "1-10 people" },
          { value: "11-50", label: "11-50 people" },
          { value: "51-200", label: "51-200 people" },
          { value: "200+", label: "200+ people" },
        ],
        timeframe: [
          { value: "asap", label: "As soon as possible" },
          { value: "30-days", label: "Within the next 30 days" },
          { value: "quarter", label: "This quarter" },
          { value: "exploring", label: "Just exploring" },
        ],
      },
      validation: {
        email: "Enter a valid email address.",
        message: "Share a bit more context (min. 20 characters).",
      },
    },
  },
};

export function getSiteContent(locale: Locale): SiteContent {
  return siteContent[locale];
}
