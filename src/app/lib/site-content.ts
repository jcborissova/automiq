export type Locale = "es" | "en";

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Metric = {
  value: string;
  label: string;
};

export type ServiceCard = {
  id: "agents" | "automation" | "apps" | "knowledge";
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
  tags: string[];
};

export type CapabilityGroup = {
  title: string;
  description: string;
  items: string[];
};

export type ArchitectureBlock = {
  label: string;
  title: string;
  detail: string;
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
  services: {
    eyebrow: string;
    title: string;
    description: string;
    cards: ServiceCard[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    description: string;
    groups: CapabilityGroup[];
    footer: string;
  };
  tools: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    architecture: {
      context: ArchitectureBlock;
      input: ArchitectureBlock;
      core: ArchitectureBlock & {
        modules: {
          title: string;
          detail: string;
        }[];
      };
      output: ArchitectureBlock;
      control: ArchitectureBlock;
    };
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

const siteContent: Record<Locale, SiteContent> = {
  es: {
    meta: {
      title: "AutomIQ | Software, automatización e IA para operación real",
      description:
        "AutomIQ construye software a medida, automatizaciones e IA aplicada para equipos de LatAm y US. Desarrollo, integraciones y agentes enfocados en resolver la operación real, no en presentaciones bonitas.",
      keywords: [
        "AutomIQ",
        "desarrollo de software",
        "automatización de procesos",
        "integraciones y APIs",
        "agentes IA",
        "apps a medida",
        "copilotos empresariales",
        "IA aplicada a operación",
      ],
    },
    nav: {
      brandTagline: "Software, automatización e IA para operación real",
      items: [
        { label: "Inicio", href: "#home" },
        { label: "Servicios", href: "#services" },
        { label: "Arquitectura", href: "#tools" },
        { label: "Contacto", href: "#contact" },
      ],
      primaryCta: "Agenda un diagnóstico",
      localeLabel: "Idioma",
    },
    hero: {
      badge: "Software, automatización e IA, todo lo que tu operación necesita",
      title: "Construimos software y automatización para equipos que buscan",
      highlight: "ejecución, no ruido",
      description:
        "Combinamos desarrollo a medida, automatización e IA aplicada para conectar tu operación real. Menos tareas manuales, mejores tiempos de respuesta y una capa técnica que el equipo sí puede usar.",
      primaryCta: "Agenda un diagnóstico",
      secondaryCta: "Ver servicios",
      stats: [
        { value: "2-4 semanas", label: "de discovery a piloto funcional" },
        { value: "Human-in-the-loop", label: "para pasos sensibles y aprobaciones" },
      ],
      highlights: [
        "Agentes conectados a correo, CRM, documentos y APIs internas.",
        "Automatizaciones con trazabilidad, validaciones y escalamiento humano.",
        "Interfaces claras para operar, aprobar y medir cada flujo.",
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
            detail: "Clasifica solicitudes, identifica prioridad y enruta cada caso.",
            status: "Live",
          },
          {
            label: "Copiloto interno",
            detail: "Consulta SOPs, políticas y documentación operativa con contexto.",
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
    services: {
      eyebrow: "Qué hacemos",
      title: "Desarrollo, automatización e IA aplicada a tu operación",
      description:
        "No vendemos una categoría abstracta. Combinamos software a medida, automatizaciones y agentes IA para que la tecnología aterrice en procesos concretos y con impacto visible.",
      cards: [
        {
          id: "agents",
          eyebrow: "Agentes y copilotos",
          title: "Asistentes que responden, analizan y ejecutan tareas reales",
          description:
            "Construimos agentes para soporte, ventas, operaciones y uso interno, conectados a tus fuentes de verdad y con reglas claras de cuándo escalar a una persona.",
          outcomes: [
            "Respuestas más rápidas con contexto de negocio.",
            "Menos carga manual para equipos operativos.",
            "Mejor calidad en clasificación, seguimiento y resolución.",
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
            "Menos pasos repetitivos y menos errores de coordinación.",
            "Trazabilidad completa de eventos, aprobaciones y excepciones.",
            "Capacidad de escalar procesos sin crecer linealmente el equipo.",
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
            "Experiencias útiles para equipos no técnicos.",
            "Mejor adopción interna de nuevas capacidades.",
            "Capas de control, métricas y feedback sobre el comportamiento de la IA.",
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
            "Acceso más rápido a SOPs, políticas y documentación.",
            "Menos dependencia de expertos para preguntas repetidas.",
            "Lectura operativa de datos con foco en decisiones.",
          ],
          tags: ["RAG", "Docs", "Analytics", "Internal Ops"],
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
            "n8n, Make, Power Platform, webhooks y APIs.",
            "RPA cuando el contexto lo exige.",
            "Colas, retries, aprobaciones y handoff explícito.",
          ],
        },
        {
          title: "Inteligencia y contexto",
          description:
            "Modelos, reglas, recuperación de conocimiento y evaluación.",
          items: [
            "Agentes con acceso a documentación y datos de negocio.",
            "RAG, clasificación, extracción y síntesis.",
            "Supervisión humana y guardrails por flujo.",
          ],
        },
        {
          title: "Interfaz y adopción",
          description:
            "La capa donde el equipo usa, aprueba y mide la solución.",
          items: [
            "Apps en Next.js y React para operar el sistema.",
            "Dashboards, estados, métricas y audit trail.",
            "Experiencias bilingües orientadas a claridad y velocidad.",
          ],
        },
      ],
      footer:
        "No hacemos demos sueltas. Diseñamos sistemas que conviven con la operación y pueden crecer con ella.",
    },
    tools: {
      eyebrow: "Arquitectura lista para operar",
      title: "Un sistema claro por fuera, controlado por dentro",
      description:
        "La IA funciona cuando el flujo se entiende rápido: contexto confiable, entradas ordenadas, ejecución auditada y salidas que el equipo puede usar.",
      note:
        "Cada bloque se conecta con tu stack actual y conserva aprobaciones humanas cuando el riesgo, la ambigüedad o el impacto del negocio lo exigen.",
      architecture: {
        context: {
          label: "Contexto",
          title: "Memoria operativa y conocimiento vivo",
          detail:
            "Documentación, CRM, políticas, estados y datos internos para responder con criterio y no con suposiciones.",
        },
        input: {
          label: "Entrada",
          title: "Correo, formularios, WhatsApp y tickets",
          detail:
            "Estandarizamos intake desde los canales donde hoy ya llegan solicitudes, leads y tareas.",
        },
        core: {
          label: "Core",
          title: "Orquestación IA con reglas y aprobaciones",
          detail:
            "Modelos, prompts, herramientas, validaciones y handoffs humanos conviviendo en un flujo que el equipo puede auditar.",
          modules: [
            {
              title: "Clasificación",
              detail: "Entiende intención, prioridad y tipo de solicitud.",
            },
            {
              title: "Acción",
              detail: "Crea tareas, actualiza CRM, responde o escala el caso.",
            },
            {
              title: "Control",
              detail: "Bloquea pasos sensibles y solicita aprobación cuando toca.",
            },
            {
              title: "Métricas",
              detail: "Registra tiempos, decisiones y excepciones para mejorar.",
            },
          ],
        },
        output: {
          label: "Salida",
          title: "CRM, tareas, dashboards y respuestas",
          detail:
            "La automatización no termina en una respuesta bonita; termina en sistemas actualizados y trabajo siguiente claro.",
        },
        control: {
          label: "Gobierno",
          title: "Observabilidad, alertas y revisión humana",
          detail:
            "Logs, estados, SLA y puntos de aprobación para operar con confianza desde el día uno.",
        },
      },
    },
    contact: {
      eyebrow: "Contacto",
      title: "Conversemos sobre el cuello de botella que quieres resolver",
      description:
        "Comparte tu contexto y te devolvemos una lectura concreta de oportunidad, alcance inicial y el siguiente paso que más sentido tenga.",
      panelTitle: "Qué pasa después",
      panelDescription:
        "No enviamos una respuesta genérica. Revisamos el caso, priorizamos impacto y proponemos una conversación útil para tomar una decisión.",
      nextSteps: [
        "Revisamos tu proceso, punto de fricción y nivel de urgencia.",
        "Te devolvemos una hipótesis de solución, piloto o roadmap inicial.",
        "Si hay fit, avanzamos a discovery o a un piloto con alcance definido.",
      ],
      details: [
        { label: "Email", value: "automiq@hotmail.com", href: "mailto:automiq@hotmail.com" },
        { label: "Teléfono", value: "+1 (829) 707-1293", href: "tel:+18297071293" },
        { label: "Base", value: "Santo Domingo, República Dominicana" },
      ],
      responseTime: "Respuesta inicial usual: dentro de 1 día hábil.",
    },
    footer: {
      title: "AutomIQ",
      summary:
        "Estudio bilingüe de software, automatización e IA aplicada, enfocado en resolver la operación real.",
      secondarySummary:
        "Diseñamos sistemas que reducen trabajo manual combinando desarrollo, automatización e IA.",
      cta: "Agenda un diagnóstico",
      navTitle: "Explorar",
      localeCta: "View English version",
      rights: "Todos los derechos reservados.",
    },
    leadForm: {
      title: "Cuéntanos qué necesitas",
      description:
        "Mientras más contexto nos compartas, más precisa será la respuesta inicial.",
      submit: "Enviar solicitud",
      submitting: "Enviando...",
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
        message: "Describe un poco más el contexto (min. 10 caracteres).",
      },
    },
  },
  en: {
    meta: {
      title: "AutomIQ | Software, automation, and applied AI for real operations",
      description:
        "AutomIQ builds custom software, automations, and applied AI for LatAm and US teams. Development, integrations, and agents focused on solving real operations, not pretty presentations.",
      keywords: [
        "AutomIQ",
        "custom software development",
        "process automation",
        "API integrations",
        "AI agents",
        "custom apps",
        "enterprise copilots",
        "applied AI",
      ],
    },
    nav: {
      brandTagline: "Software, automation, and AI for real operations",
      items: [
        { label: "Home", href: "#home" },
        { label: "Services", href: "#services" },
        { label: "Architecture", href: "#tools" },
        { label: "Contact", href: "#contact" },
      ],
      primaryCta: "Book a diagnostic",
      localeLabel: "Language",
    },
    hero: {
      badge: "Software, automation, and AI, whatever your operation needs",
      title: "We build software and automation for teams that need",
      highlight: "execution, not noise",
      description:
        "We combine custom development, automation, and applied AI to connect your real workflows. Less manual work, faster response times, and a technical layer teams can actually operate.",
      primaryCta: "Book a diagnostic",
      secondaryCta: "See services",
      stats: [
        { value: "2-4 weeks", label: "from discovery to working pilot" },
        { value: "Human-in-the-loop", label: "for sensitive steps and approvals" },
      ],
      highlights: [
        "Agents connected to email, CRM, documents, and internal APIs.",
        "Automations with traceability, validations, and human escalation.",
        "Clear interfaces to operate, approve, and measure every workflow.",
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
    services: {
      eyebrow: "What we do",
      title: "Software development, automation, and applied AI for your operation",
      description:
        "We do not sell an abstract category. We combine custom software, automations, and AI agents so technology lands in concrete workflows with visible impact.",
      cards: [
        {
          id: "agents",
          eyebrow: "Agents and copilots",
          title: "Assistants that answer, analyze, and execute real tasks",
          description:
            "We build agents for support, revenue, operations, and internal teams, connected to your sources of truth and with explicit rules for when humans step in.",
          outcomes: [
            "Faster responses with business context.",
            "Less manual load for operational teams.",
            "Higher consistency in triage, follow-up, and resolution.",
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
            "Fewer repetitive steps and coordination errors.",
            "Full traceability for events, approvals, and exceptions.",
            "The ability to scale volume without linearly scaling headcount.",
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
            "Useful experiences for non-technical teams.",
            "Better internal adoption of new AI capabilities.",
            "Control layers, metrics, and feedback over system behavior.",
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
            "Faster access to SOPs, policies, and operational docs.",
            "Less dependency on experts for repeated questions.",
            "Better decision support from messy operational data.",
          ],
          tags: ["RAG", "Docs", "Analytics", "Internal Ops"],
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
          description:
            "Workflows, triggers, integrations, and cross-system execution.",
          items: [
            "n8n, Make, Power Platform, webhooks, and APIs.",
            "RPA when the context requires it.",
            "Queues, retries, approvals, and explicit handoffs.",
          ],
        },
        {
          title: "Intelligence and context",
          description:
            "Models, rules, knowledge retrieval, and evaluation.",
          items: [
            "Agents connected to documentation and business data.",
            "RAG, classification, extraction, and synthesis.",
            "Human oversight and guardrails for each workflow.",
          ],
        },
        {
          title: "Interface and adoption",
          description:
            "The layer where teams use, approve, and measure the system.",
          items: [
            "Next.js and React apps to operate the system.",
            "Dashboards, statuses, metrics, and audit trails.",
            "Bilingual experiences optimized for clarity and speed.",
          ],
        },
      ],
      footer:
        "We do not ship isolated demos. We design systems that can live inside real operations and grow with them.",
    },
    tools: {
      eyebrow: "Production-ready architecture",
      title: "Clear on the surface, controlled underneath",
      description:
        "AI works when the workflow is easy to understand: trusted context, structured intake, audited execution, and outputs the team can actually use.",
      note:
        "Each block plugs into your current stack while keeping human approvals where risk, ambiguity, or business impact require them.",
      architecture: {
        context: {
          label: "Context",
          title: "Operational memory and living knowledge",
          detail:
            "Documentation, CRM, policies, statuses, and internal data so responses are grounded in how the business actually works.",
        },
        input: {
          label: "Input",
          title: "Email, forms, WhatsApp, and ticketing",
          detail:
            "We standardize intake from the channels where requests, leads, and tasks already arrive today.",
        },
        core: {
          label: "Core",
          title: "AI orchestration with rules and approvals",
          detail:
            "Models, prompts, tools, validations, and human handoffs working inside a flow the team can audit.",
          modules: [
            {
              title: "Classification",
              detail: "Understands intent, priority, and request type.",
            },
            {
              title: "Action",
              detail: "Creates tasks, updates CRM, responds, or escalates the case.",
            },
            {
              title: "Control",
              detail: "Blocks sensitive steps and requests approval when needed.",
            },
            {
              title: "Metrics",
              detail: "Captures timing, decisions, and exceptions to keep improving.",
            },
          ],
        },
        output: {
          label: "Output",
          title: "CRM, tasks, dashboards, and responses",
          detail:
            "Automation does not end in a nice answer. It ends in updated systems and a clear next action for the team.",
        },
        control: {
          label: "Governance",
          title: "Observability, alerts, and human review",
          detail:
            "Logs, statuses, SLAs, and approval checkpoints so the system can be trusted from day one.",
        },
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Let us focus on the bottleneck you want to remove",
      description:
        "Share the context and we will answer with a concrete view of opportunity, initial scope, and the next step that makes the most sense.",
      panelTitle: "What happens next",
      panelDescription:
        "We do not send a generic response. We review the case, prioritize impact, and propose a conversation that helps you make a decision.",
      nextSteps: [
        "We review your workflow, friction point, and urgency level.",
        "We send back an initial solution hypothesis, pilot, or roadmap.",
        "If there is a fit, we move into discovery or a clearly scoped pilot.",
      ],
      details: [
        { label: "Email", value: "automiq@hotmail.com", href: "mailto:automiq@hotmail.com" },
        { label: "Phone", value: "+1 (829) 707-1293", href: "tel:+18297071293" },
        { label: "Base", value: "Santo Domingo, Dominican Republic" },
      ],
      responseTime: "Typical first response: within 1 business day.",
    },
    footer: {
      title: "AutomIQ",
      summary:
        "Bilingual studio for software, automation, and applied AI focused on solving real operations.",
      secondarySummary:
        "We design systems that cut manual work by combining custom development, automation, and AI.",
      cta: "Book a diagnostic",
      navTitle: "Explore",
      localeCta: "Ver version en espanol",
      rights: "All rights reserved.",
    },
    leadForm: {
      title: "Tell us what you need",
      description:
        "The more context you share, the more precise our first response will be.",
      submit: "Send request",
      submitting: "Sending...",
      successTitle: "Request sent",
      successBody: "We will follow up with a clear next step as soon as possible.",
      errorFallback: "We could not send the form. Please try again in a few minutes.",
      privacy:
        "By sending this form you agree that we may use your data to reply to this request. We do not share information with third parties.",
      emailSubject: "New diagnostic request from AutomIQ",
      fields: {
        name: { label: "Full name", placeholder: "Your name" },
        email: { label: "Work email", placeholder: "you@company.com" },
        company: { label: "Company", placeholder: "Company name" },
        role: { label: "Role", placeholder: "Ex. Operations, Product, Founder" },
        primaryNeed: { label: "Primary need", placeholder: "Select an option" },
        teamSize: { label: "Team size", placeholder: "Select an option" },
        timeframe: { label: "Desired timing", placeholder: "Select an option" },
        message: {
          label: "Context and goal",
          placeholder:
            "Describe the workflow, the current bottleneck, and the outcome you want to achieve.",
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
          { value: "30-days", label: "In the next 30 days" },
          { value: "quarter", label: "This quarter" },
          { value: "exploring", label: "Still exploring options" },
        ],
      },
      validation: {
        email: "Enter a valid email address.",
        message: "Please add a bit more context (min. 10 characters).",
      },
    },
  },
};

export function getLocaleFromPathname(pathname?: string | null): Locale {
  return pathname?.startsWith("/en") ? "en" : "es";
}

export function getLocalizedPath(locale: Locale): string {
  return locale === "es" ? "/es" : "/en";
}

export function getSiteContent(locale: Locale): SiteContent {
  return siteContent[locale];
}
