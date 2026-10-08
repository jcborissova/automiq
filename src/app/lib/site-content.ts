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
      title: "AutomIQ | Soluciones digitales, automatización e integraciones",
      description:
        "AutomIQ diseña software a medida, automatizaciones e integraciones para empresas dominicanas que quieren conectar sistemas y reducir trabajo manual.",
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
      brandTagline: "Soluciones digitales para procesos reales",
      items: [
        { label: "Inicio", href: "#home" },
        { label: "Soluciones", href: "#services" },
        { label: "Contacto", href: "#contact" },
      ],
      primaryCta: "Agenda un diagnóstico",
      localeLabel: "Idioma",
    },
    hero: {
      badge: "Software e integraciones a medida",
      title: "Software que",
      highlight: "conecta tu operación.",
      description:
        "Apps, integraciones y automatizaciones para mover información entre sistemas sin trabajo manual innecesario.",
      primaryCta: "Agenda un diagnóstico",
      secondaryCta: "Ver servicios",
      stats: [
        { value: "Conectar", label: "formularios, hojas, correo, CRM, ERP y APIs" },
        { value: "Operar", label: "aprobaciones, estados, responsables y reportes" },
      ],
      highlights: [
        "Automatizaciones que mueven información entre sistemas sin perder control.",
        "Apps internas y paneles para que el equipo pueda revisar, aprobar y medir.",
        "IA aplicada solo cuando mejora el flujo, no como adorno.",
      ],
      panel: {
        eyebrow: "Flujo de trabajo",
        title: "Proceso ilustrativo",
        subtitle: "Cómo una solicitud puede pasar de correo o archivo a estado visible para el equipo.",
        status: "Ejemplo",
        metrics: [
          { value: "01", label: "Recibir" },
          { value: "02", label: "Validar" },
          { value: "03", label: "Registrar" },
        ],
        workflowTitle: "Componentes del proceso",
        workflowItems: [
          {
            label: "Captura",
            detail: "Formulario, correo, archivo o mensaje entra con datos estructurados.",
            status: "Paso",
          },
          {
            label: "Validación",
            detail: "Se aplican reglas del negocio antes de tocar sistemas críticos.",
            status: "Control",
          },
          {
            label: "Seguimiento",
            detail: "El equipo ve estado, responsables, excepciones y próximos pasos.",
            status: "Visible",
          },
        ],
        footer:
          "Ilustrativo: el flujo final se define con el proceso real de cada empresa.",
      },
    },
    services: {
      eyebrow: "Qué hacemos",
      title: "Apps, integraciones y automatización para operar mejor",
      description:
        "Ordenamos procesos completos: dónde entra la información, quién la revisa, qué sistema se actualiza y cómo queda visible el siguiente paso.",
      cards: [
        {
          id: "agents",
          eyebrow: "Aplicaciones internas",
          title: "Solicitudes, aprobaciones y seguimiento en un solo flujo",
          description:
            "Cuando las solicitudes viven entre correos, hojas y mensajes, el equipo pierde estado, responsables y contexto.",
          outcomes: [
            "Un lugar claro para capturar solicitudes, revisar documentación, aprobar pasos y ver qué falta por hacer.",
            "Roles, validaciones y aprobaciones según la forma de trabajar de la empresa.",
            "Diseño claro para usuarios no técnicos.",
          ],
          tags: ["Portales", "Dashboards", "Formularios", "Roles"],
        },
        {
          id: "automation",
          eyebrow: "Automatización e integraciones",
          title: "Información que pasa entre sistemas sin volver a registrarla",
          description:
            "Cuando los datos se copian a mano entre herramientas, aparecen duplicados, errores y versiones distintas de la misma operación.",
          outcomes: [
            "Conexiones entre formularios, hojas, CRM, ERP, correo, documentos y APIs para que cada sistema reciba lo que necesita.",
            "Validaciones antes de ejecutar acciones sensibles.",
            "Alertas y excepciones visibles para el equipo.",
          ],
          tags: ["APIs", "n8n", "Make", "Power Platform"],
        },
        {
          id: "apps",
          eyebrow: "Automatización documental",
          title: "Tareas repetibles con revisión de excepciones",
          description:
            "Cuando el trabajo depende de revisar archivos, facturas, correos o formularios uno por uno, lo urgente desplaza lo importante.",
          outcomes: [
            "Flujos que reciben, clasifican, validan y escalan excepciones para revisión humana antes de registrar o reportar.",
            "Aprobaciones humanas donde el negocio lo necesita.",
            "Historial claro de lo recibido, revisado y completado.",
          ],
          tags: ["Facturas", "Documentos", "Aprobaciones", "Reportes"],
        },
        {
          id: "knowledge",
          eyebrow: "IA aplicada con criterio",
          title: "Asistentes y búsqueda cuando realmente ayudan al flujo",
          description:
            "Usamos IA para clasificar, resumir, buscar o asistir respuestas solo cuando mejora un proceso concreto y puede revisarse con control humano.",
          outcomes: [
            "Consultas sobre políticas, documentos o historial operativo.",
            "Borradores y resúmenes revisables antes de enviarse.",
            "Reglas claras para escalar decisiones sensibles.",
          ],
          tags: ["Búsqueda", "Resumen", "Clasificación", "Revisión"],
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
      eyebrow: "Cómo lo estructuramos",
      title: "Tecnología que se entiende y se puede operar",
      description:
        "La solución final puede ser una app, una integración, un tablero o una automatización. Lo importante es que el proceso sea claro para quienes lo usan.",
      note:
        "Cada bloque se conecta con tu operación actual y conserva revisión humana cuando el riesgo, la ambigüedad o el impacto del negocio lo exigen.",
      architecture: {
        context: {
          label: "Contexto",
          title: "Contexto del negocio",
          detail:
            "Documentación, CRM, políticas, estados y datos internos para responder con criterio y no con suposiciones.",
        },
        input: {
          label: "Entrada",
          title: "Canales y documentos",
          detail:
            "Estandarizamos intake desde los canales donde hoy ya llegan solicitudes, leads y tareas.",
        },
        core: {
          label: "Core",
          title: "Orquestación con reglas y aprobaciones",
          detail:
            "Automatizaciones, integraciones, validaciones y handoffs humanos conviviendo en un flujo que el equipo puede auditar.",
          modules: [
            {
              title: "Validación",
              detail: "Comprueba datos, formatos y reglas antes de avanzar.",
            },
            {
              title: "Integración",
              detail: "Actualiza sistemas, crea tareas o mueve información.",
            },
            {
              title: "Aprobación",
              detail: "Bloquea pasos sensibles y solicita aprobación cuando toca.",
            },
            {
              title: "Seguimiento",
              detail: "Registra estado, decisiones y excepciones para operar mejor.",
            },
          ],
        },
        output: {
          label: "Salida",
          title: "Sistemas, tareas y paneles",
          detail:
            "La automatización no termina en una respuesta bonita; termina en sistemas actualizados y trabajo siguiente claro.",
        },
        control: {
          label: "Gobierno",
          title: "Observabilidad, alertas y revisión humana",
          detail:
            "Logs, estados y puntos de aprobación para operar con confianza desde el día uno.",
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
        { label: "Email", value: "hola@automiq.click", href: "mailto:hola@automiq.click" },
        { label: "Teléfono", value: "+1 (829) 707-1293", href: "tel:+18297071293" },
        { label: "Base", value: "Santo Domingo, República Dominicana" },
      ],
      responseTime: "Respuesta inicial usual: dentro de 1 día hábil.",
    },
    footer: {
      title: "AutomIQ",
      summary:
        "Estudio de soluciones digitales a medida para empresas que quieren conectar sistemas y reducir trabajo manual.",
      secondarySummary:
        "Diseñamos aplicaciones, automatizaciones, integraciones y paneles con foco en procesos completos.",
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
          { value: "agents", label: "App interna o panel" },
          { value: "automation", label: "Automatización e integraciones" },
          { value: "app", label: "Documentos, facturas o aprobaciones" },
          { value: "knowledge", label: "IA, búsqueda o asistencia interna" },
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
      brandTagline: "Digital solutions for real workflows",
      items: [
        { label: "Home", href: "#home" },
        { label: "Solutions", href: "#services" },
        { label: "Contact", href: "#contact" },
      ],
      primaryCta: "Book a diagnostic",
      localeLabel: "Language",
    },
    hero: {
      badge: "Custom software and integrations",
      title: "Software that",
      highlight: "connects your operation.",
      description:
        "Apps, integrations, and automations that move information between systems without unnecessary manual work.",
      primaryCta: "Book a diagnostic",
      secondaryCta: "See services",
      stats: [
        { value: "Connect", label: "forms, sheets, email, CRM, ERP, and APIs" },
        { value: "Operate", label: "approvals, statuses, owners, and reporting" },
      ],
      highlights: [
        "Automations that move information between systems without losing control.",
        "Internal apps and dashboards for review, approval, and measurement.",
        "AI applied only when it improves the workflow, not as decoration.",
      ],
      panel: {
        eyebrow: "Workflow",
        title: "Illustrative process",
        subtitle: "How a request can move from email or file to visible status for the team.",
        status: "Example",
        metrics: [
          { value: "01", label: "Receive" },
          { value: "02", label: "Validate" },
          { value: "03", label: "Record" },
        ],
        workflowTitle: "Workflow components",
        workflowItems: [
          {
            label: "Capture",
            detail: "A form, email, file, or message enters as structured data.",
            status: "Step",
          },
          {
            label: "Validation",
            detail: "Business rules run before touching critical systems.",
            status: "Control",
          },
          {
            label: "Follow-up",
            detail: "The team sees status, owners, exceptions, and next steps.",
            status: "Visible",
          },
        ],
        footer:
          "Illustrative: the final flow is shaped around each company's real process.",
      },
    },
    services: {
      eyebrow: "What we do",
      title: "Apps, integrations, and automation for better operations",
      description:
        "We organize complete workflows: where information enters, who reviews it, which system updates, and how the next step stays visible.",
      cards: [
        {
          id: "agents",
          eyebrow: "Internal applications",
          title: "Requests, approvals, and follow-up in one flow",
          description:
            "When requests live across email, spreadsheets, and messages, teams lose status, owners, and context.",
          outcomes: [
            "A clear place to capture requests, review documentation, approve steps, and see what still needs attention.",
            "Roles, validations, and approvals matched to how the company works.",
            "Clear experiences for non-technical users.",
          ],
          tags: ["Portals", "Dashboards", "Forms", "Roles"],
        },
        {
          id: "automation",
          eyebrow: "Automation and integrations",
          title: "Information moves between systems without re-entry",
          description:
            "When data is copied by hand between tools, duplicates, errors, and competing versions of the operation appear.",
          outcomes: [
            "Connections between forms, sheets, CRM, ERP, email, documents, and APIs so each system receives what it needs.",
            "Validations before sensitive actions run.",
            "Alerts and exceptions visible to the team.",
          ],
          tags: ["APIs", "n8n", "Make", "Power Platform"],
        },
        {
          id: "apps",
          eyebrow: "Document automation",
          title: "Repeatable tasks with exception review",
          description:
            "When work depends on reviewing files, invoices, emails, or forms one by one, urgent tasks push important control aside.",
          outcomes: [
            "Flows that receive, classify, validate, and escalate exceptions for human review before recording or reporting.",
            "Human approvals where the business needs them.",
            "A clear history of what was received, reviewed, and completed.",
          ],
          tags: ["Invoices", "Documents", "Approvals", "Reports"],
        },
        {
          id: "knowledge",
          eyebrow: "Applied AI with judgment",
          title: "Assistants and search when they truly help the workflow",
          description:
            "We use AI to classify, summarize, search, or assist responses only when it improves a concrete process and can be reviewed with human control.",
          outcomes: [
            "Questions over policies, documents, or operational history.",
            "Drafts and summaries that are reviewed before sending.",
            "Clear rules for escalating sensitive decisions.",
          ],
          tags: ["Search", "Summary", "Classification", "Review"],
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
      eyebrow: "How we structure it",
      title: "Technology people can understand and operate",
      description:
        "The final solution may be an app, an integration, a dashboard, or an automation. What matters is that the process is clear for the people using it.",
      note:
        "Each block plugs into your current operation while keeping human review where risk, ambiguity, or business impact require it.",
      architecture: {
        context: {
          label: "Context",
          title: "Business context",
          detail:
            "Documentation, CRM, policies, statuses, and internal data so responses are grounded in how the business actually works.",
        },
        input: {
          label: "Input",
          title: "Channels and documents",
          detail:
            "We standardize intake from the channels where requests, leads, and tasks already arrive today.",
        },
        core: {
          label: "Core",
          title: "Orchestration with rules and approvals",
          detail:
            "Automations, integrations, validations, and human handoffs working inside a flow the team can audit.",
          modules: [
            {
              title: "Validation",
              detail: "Checks data, formats, and business rules before moving forward.",
            },
            {
              title: "Integration",
              detail: "Updates systems, creates tasks, or moves information.",
            },
            {
              title: "Approval",
              detail: "Blocks sensitive steps and requests approval when needed.",
            },
            {
              title: "Follow-up",
              detail: "Records status, decisions, and exceptions so teams can operate better.",
            },
          ],
        },
        output: {
          label: "Output",
          title: "Systems, tasks, and dashboards",
          detail:
            "Automation does not end in a nice answer. It ends in updated systems and a clear next action for the team.",
        },
        control: {
          label: "Governance",
          title: "Observability, alerts, and human review",
          detail:
            "Logs, statuses, and approval checkpoints so the system can be trusted from day one.",
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
        { label: "Email", value: "hola@automiq.click", href: "mailto:hola@automiq.click" },
        { label: "Phone", value: "+1 (829) 707-1293", href: "tel:+18297071293" },
        { label: "Base", value: "Santo Domingo, Dominican Republic" },
      ],
      responseTime: "Typical first response: within 1 business day.",
    },
    footer: {
      title: "AutomIQ",
      summary:
        "Custom digital solutions studio for companies that want to connect systems and reduce manual work.",
      secondarySummary:
        "We design applications, automations, integrations, and dashboards around complete workflows.",
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
          { value: "agents", label: "Internal app or dashboard" },
          { value: "automation", label: "Automation and integrations" },
          { value: "app", label: "Documents, invoices, or approvals" },
          { value: "knowledge", label: "AI, search, or internal assistance" },
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
