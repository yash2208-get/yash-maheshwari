/* Projects & case studies: edit this file to update the portfolio. */
window.YM_DATA = {
  "projects": [
    {
      "id": "insurtech",
      "type": "fullstack",
      "title": "InsurTech Policy Lifecycle Suite",
      "category": "InsurTech · Backend Platform",
      "context": "Fyntune Solution · B2B insurance distribution",
      "domain": "broker.portal/policies",
      "layout": "dashboard",
      "theme": [
        "#7C5CFF",
        "#22D3EE"
      ],
      "summary": "Claims, renewals, endorsements, cancellations and bulk policy import for a B2B insurance platform used by brokers and insurers.",
      "problem": "Brokers managed policy changes through emails and spreadsheets. Onboarding a new client meant days of manual data entry, renewals slipped through the cracks, and every endorsement required back-and-forth with operations.",
      "solution": "Built a modular Laravel policy-lifecycle suite (Claims, Renewals, Endorsements, Cancellations) on top of a queue-driven bulk-import engine with row-level validation, audit trails and secure partner APIs.",
      "architecture": [
        "Broker Portal (Blade + AJAX)",
        "Laravel API · Auth & Policies",
        "Domain Services: Claims · Renewals · Endorsements",
        "Redis Queues · Chunked Import Workers",
        "MySQL (indexed) + Audit Log",
        "Insurer & Partner REST APIs"
      ],
      "features": [
        "Bulk import of 50,000+ policy rows per batch with downloadable error reports",
        "Endorsement and cancellation workflows with maker-checker approvals",
        "Automated renewal reminders via scheduled jobs and notifications",
        "Claims intake with document uploads and status tracking",
        "Token-secured REST APIs for insurer and partner integrations",
        "Full audit logging to support compliance"
      ],
      "stack": [
        "Laravel",
        "PHP",
        "MySQL",
        "Redis",
        "Laravel Queues",
        "Laravel Excel",
        "REST APIs",
        "jQuery/AJAX"
      ],
      "challenges": [
        "Imports timing out on large files → moved to chunked, queued processing with idempotent upserts and live progress tracking.",
        "Inconsistent insurer data formats → built a validation and mapping layer with per-row error feedback.",
        "Slow reports on millions of rows → composite indexes and query refactoring (60% faster)."
      ],
      "impact": [
        "Client onboarding reduced from days to under an hour",
        "~70% fewer manual follow-ups for renewals and endorsements",
        "Operations teams freed to focus on sales instead of data entry"
      ],
      "results": [
        {
          "v": "50K+",
          "l": "records per import batch"
        },
        {
          "v": "60%",
          "l": "faster report generation"
        },
        {
          "v": "~70%",
          "l": "less manual follow-up"
        }
      ],
      "github": "",
      "demo": "",
      "nda": true
    },
    {
      "id": "commerce",
      "type": "fullstack",
      "title": "Multi-Vendor Commerce & Bulk Import Engine",
      "category": "E-commerce · SaaS",
      "context": "Client platform · multi-vendor marketplace",
      "domain": "vendor.store/catalog",
      "layout": "store",
      "theme": [
        "#F472B6",
        "#7C5CFF"
      ],
      "summary": "A multi-vendor e-commerce platform with Excel-driven bulk catalog import, a deals engine and automatic Zoho CRM lead sync.",
      "problem": "Vendors spent days uploading products one by one (images, prices, stock), and customer inquiries were lost in inboxes instead of reaching the sales team.",
      "solution": "Designed an Excel bulk-import pipeline that maps product images by filename, validates every row and processes uploads asynchronously. Added multi-vendor storefronts, a deals module and automatic Zoho CRM lead capture.",
      "architecture": [
        "Vendor Dashboard",
        "Laravel API Gateway",
        "Import Service · Excel Parser + Image Mapper",
        "Queue Workers (Redis)",
        "MySQL Catalog + Inventory",
        "Zoho CRM (OAuth 2.0) · Leads"
      ],
      "features": [
        "Bulk import with automatic image mapping by filename",
        "Multi-vendor onboarding, storefronts and vendor-scoped catalogs",
        "Deals engine: discounts, coupons and time-boxed offers",
        "Inventory tracking with low-stock alerts",
        "Inquiry → Zoho CRM lead sync in real time",
        "Role-based admin, vendor and customer experiences"
      ],
      "stack": [
        "Laravel",
        "PHP",
        "MySQL",
        "Laravel Excel",
        "Redis Queues",
        "Zoho CRM API",
        "JavaScript",
        "Bootstrap"
      ],
      "challenges": [
        "Matching thousands of images to rows → normalized filename matching with fallbacks and a missing-image report.",
        "Large uploads blocking requests → background jobs with chunking and live progress.",
        "Duplicate SKUs across vendors → vendor-scoped unique constraints and merge rules."
      ],
      "impact": [
        "Catalog onboarding effort cut by ~90%",
        "Zero manual lead entry for the sales team",
        "New vendors onboard without developer involvement"
      ],
      "results": [
        {
          "v": "10K+",
          "l": "SKUs per upload"
        },
        {
          "v": "~90%",
          "l": "faster catalog setup"
        },
        {
          "v": "100%",
          "l": "inquiries synced to CRM"
        }
      ],
      "github": "",
      "demo": "",
      "nda": true
    },
    {
      "id": "sitebuilder",
      "type": "fullstack",
      "title": "Multi-Tenant Website Builder for Educators",
      "category": "SaaS · Multi-Tenancy",
      "context": "Client platform · creator economy",
      "domain": "educator.site/builder",
      "layout": "site",
      "theme": [
        "#FBBF24",
        "#F472B6"
      ],
      "summary": "A SaaS that lets spiritual educators and astrologers launch a branded website with courses, products and pricing in minutes.",
      "problem": "Independent educators had no affordable way to get a professional website, sell courses and capture leads without hiring a developer.",
      "solution": "Built a multi-tenant Laravel platform where each educator gets a customizable website, course and product catalog, flexible pricing and automatic Zoho CRM lead capture, governed by a 5-tier role model.",
      "architecture": [
        "Tenant Websites (per-educator themes)",
        "Laravel Core · Tenant Resolver",
        "RBAC · 5 role tiers",
        "Course / Product / Pricing Services",
        "MySQL (tenant-scoped)",
        "Zoho CRM Lead Sync"
      ],
      "features": [
        "Branded website per educator with themes and custom pages",
        "Course, product and service catalog management",
        "Flexible pricing: one-time, bundles and discounts",
        "5-tier RBAC: Super Admin, Admin, Trainer, Institute, Student",
        "Role-specific dashboards for enrollments, leads and revenue",
        "Automatic Zoho CRM lead capture tagged per tenant"
      ],
      "stack": [
        "Laravel",
        "PHP",
        "MySQL",
        "Multi-Tenancy",
        "RBAC",
        "Zoho CRM API",
        "Blade",
        "JavaScript"
      ],
      "challenges": [
        "Tenant data isolation → global scopes and tenant-aware policies on every query.",
        "Custom pages without code → template blocks with editable content and themes.",
        "Lead routing per tenant → tenant-tagged CRM sync with retry queue."
      ],
      "impact": [
        "Educators go live in minutes instead of weeks",
        "Recurring SaaS revenue model for the business",
        "Every website inquiry becomes a trackable CRM lead"
      ],
      "results": [
        {
          "v": "5",
          "l": "role tiers, granular permissions"
        },
        {
          "v": "Minutes",
          "l": "to launch a new site"
        },
        {
          "v": "0",
          "l": "dev hours per new tenant"
        }
      ],
      "github": "",
      "demo": "",
      "nda": true
    },
    {
      "id": "lms",
      "type": "fullstack",
      "title": "EdTech Course Management Platform",
      "category": "EdTech · LMS",
      "context": "Client platform · course marketplace",
      "domain": "learn.platform/courses",
      "layout": "dashboard",
      "theme": [
        "#22D3EE",
        "#34D399"
      ],
      "summary": "A role-based course marketplace where trainers and institutes publish courses and every student inquiry flows into Zoho CRM.",
      "problem": "Institutes and independent trainers listed courses across scattered channels, and student inquiries arrived via calls and forms nobody tracked. Leads were lost and response times were slow.",
      "solution": "Delivered a role-based course platform where trainers and institutes self-publish courses, students discover and enquire in one place, and every inquiry is pushed to Zoho CRM in real time with source tracking.",
      "architecture": [
        "Public Course Catalog",
        "Laravel App · Auth + RBAC (5 roles)",
        "Course & Enrollment Services",
        "Inquiry Service → Zoho CRM (OAuth 2.0)",
        "MySQL",
        "Role-based Dashboards"
      ],
      "features": [
        "Self-serve course publishing for trainers and institutes",
        "Granular RBAC for Super Admin, Admin, Trainer, Institute and Student",
        "Real-time Zoho CRM lead creation with source attribution",
        "Personalized dashboards per role",
        "Search and filtering across the course catalog",
        "Responsive, accessible UI"
      ],
      "stack": [
        "Laravel",
        "PHP",
        "MySQL",
        "Zoho CRM API",
        "OAuth 2.0",
        "JavaScript",
        "Bootstrap"
      ],
      "challenges": [
        "Zoho OAuth token expiry breaking sync → automatic token refresh with retry queue and failure alerts.",
        "Overlapping permissions between institutes and trainers → policy-based authorization with explicit ownership rules.",
        "Duplicate inquiries → de-duplication by email and phone before the CRM push."
      ],
      "impact": [
        "Inquiry response time reduced by ~60%",
        "Sales team works from a single source of truth in CRM",
        "Institutes publish without developer support"
      ],
      "results": [
        {
          "v": "~60%",
          "l": "faster inquiry response"
        },
        {
          "v": "5",
          "l": "role-based dashboards"
        },
        {
          "v": "0",
          "l": "manual lead entry"
        }
      ],
      "github": "",
      "demo": "",
      "nda": true
    },
    {
      "id": "realtime",
      "type": "fullstack",
      "title": "Real-Time Live-Match Gaming Platform",
      "category": "Real-Time · Payments · i18n",
      "context": "Hub2Technologies · high-traffic product",
      "domain": "live.match/arena",
      "layout": "live",
      "theme": [
        "#34D399",
        "#22D3EE"
      ],
      "summary": "Live match feeds, secure payments, bot protection and 5+ languages for a high-traffic real-time gaming product.",
      "problem": "During live matches, thousands of users needed instant score and odds updates, while payments and sign-ups were targeted by bots and fraud.",
      "solution": "Built a Node.js WebSocket layer alongside the Laravel core to push sub-second updates. Integrated payment gateways with signed webhooks and idempotency, hardened every form with reCAPTCHA v3 and rate limiting, and shipped full i18n.",
      "architecture": [
        "Live Data Feed",
        "Node.js · Socket.IO Broadcaster",
        "Laravel Core API",
        "Payment Gateway + Signed Webhooks",
        "MySQL + Redis Pub/Sub",
        "Web Clients (5+ languages)"
      ],
      "features": [
        "WebSocket broadcasting of live scores and odds with sub-second latency",
        "Payment gateways with signed webhooks, idempotency keys and reconciliation",
        "Google reCAPTCHA v3, rate limiting and server-side validation",
        "Multi-language UI and content in 5+ languages",
        "E-commerce modules: catalog, cart, checkout and orders",
        "Admin dashboards for matches, users and transactions"
      ],
      "stack": [
        "Laravel",
        "Node.js",
        "Socket.IO",
        "Redis",
        "MySQL",
        "AJAX",
        "Payment APIs",
        "reCAPTCHA v3"
      ],
      "challenges": [
        "Traffic spikes at match start → Redis-backed pub/sub and horizontally scaled Node.js workers.",
        "Duplicate payment callbacks → idempotency keys and a transactional state machine.",
        "Bot sign-ups → layered defence: reCAPTCHA v3 scoring, rate limits and device heuristics."
      ],
      "impact": [
        "Stable live experience during peak match windows",
        "Trustworthy payments with automated reconciliation",
        "Expansion into new regional markets through localization"
      ],
      "results": [
        {
          "v": "\u003c1s",
          "l": "live update latency"
        },
        {
          "v": "99.9%",
          "l": "payment settlement accuracy"
        },
        {
          "v": "~90%",
          "l": "less bot traffic"
        }
      ],
      "github": "",
      "demo": "",
      "nda": true
    },
    {
      "id": "policypilot",
      "type": "ai",
      "title": "PolicyPilot: RAG Copilot for Insurance Docs",
      "category": "RAG · LLM Application",
      "context": "Open-source AI project",
      "domain": "policypilot.ai/chat",
      "layout": "chat",
      "theme": [
        "#7C5CFF",
        "#F472B6"
      ],
      "summary": "Ask questions about complex insurance policies and get cited, grounded answers in seconds, with a fully local mode for sensitive data.",
      "problem": "Insurance policy wordings run 40+ pages. Brokers and support teams spend 15–20 minutes per query hunting for exclusions, waiting periods and riders, and still make mistakes.",
      "solution": "A RAG copilot that ingests policy PDFs, chunks them by structure, indexes them in a vector database and answers with page-level citations. Hybrid retrieval and re-ranking keep answers grounded, and Ollama runs Llama 3 locally when data cannot leave the server.",
      "architecture": [
        "PDF Ingestion · OCR fallback",
        "Structure-aware Chunking + Metadata",
        "Embeddings → ChromaDB / pgvector",
        "Hybrid Retrieval (BM25 + Vector) + Re-rank",
        "LLM (OpenAI · Ollama) with citation prompt",
        "FastAPI Streaming API + Chat UI"
      ],
      "features": [
        "Page-level citations for every answer",
        "Hybrid search with cross-encoder re-ranking",
        "Private mode via Ollama (Llama 3), no data leaves the server",
        "Conversation memory stored in MongoDB",
        "Evaluation harness with 150 curated Q&A pairs",
        "Streaming responses via Server-Sent Events"
      ],
      "stack": [
        "Python",
        "FastAPI",
        "LangChain",
        "OpenAI API",
        "Ollama",
        "ChromaDB",
        "MongoDB",
        "Docker"
      ],
      "keys": [
        "python",
        "fastapi",
        "langchain",
        "openai",
        "ollama",
        "llms",
        "rag",
        "prompt",
        "mongodb",
        "vectordb"
      ],
      "challenges": [
        "Tables and clauses split across chunks → structure-aware chunking with overlap and section metadata.",
        "Hallucinated answers → strict citation prompt, \"I don't know\" fallback and answer-grounding checks.",
        "Latency on local models → quantized models, embedding cache and token streaming."
      ],
      "impact": [
        "Policy lookups go from ~15 minutes to seconds",
        "Answers are auditable through citations, which matters in a regulated domain",
        "Sensitive documents stay on-prem with local LLMs"
      ],
      "results": [
        {
          "v": "90%+",
          "l": "accuracy on eval set"
        },
        {
          "v": "\u003c2s",
          "l": "median streamed response"
        },
        {
          "v": "100%",
          "l": "answers with citations"
        }
      ],
      "github": "https://github.com/yash2208-get/policypilot",
      "demo": ""
    },
    {
      "id": "leadgenie",
      "type": "ai",
      "title": "LeadGenie: Autonomous Lead-Qualification Agent",
      "category": "AI Agents · LangGraph · MCP",
      "context": "Open-source AI project",
      "domain": "leadgenie/graph",
      "layout": "graph",
      "theme": [
        "#22D3EE",
        "#7C5CFF"
      ],
      "summary": "A LangGraph agent that researches, scores and syncs inbound leads to Zoho CRM through MCP tools, with humans approving risky actions.",
      "problem": "Sales teams waste hours researching and qualifying inbound leads manually. Good leads go cold while reps sift through spam.",
      "solution": "A LangGraph agent researches each new lead on the web, scores fit and intent with schema-validated LLM outputs, drafts a personalized reply and syncs everything to Zoho CRM. Tools are exposed through an MCP server, and every write needs human approval.",
      "architecture": [
        "Zoho CRM Webhook (new lead)",
        "LangGraph Planner (stateful graph)",
        "MCP Tools · Web Search · Playwright · CRM",
        "LLM Scoring (structured JSON)",
        "Human-in-the-loop Approval",
        "CRM Update + Email Draft"
      ],
      "features": [
        "Stateful workflow: research → enrich → score → draft → sync",
        "MCP server exposing web search, Playwright browsing and CRM tools",
        "Schema-validated scoring (fit, intent, budget) with evidence links",
        "Human approval before any CRM write or email send",
        "Personalized reply drafts in the brand voice",
        "Tracing of cost, latency and decisions per lead"
      ],
      "stack": [
        "Python",
        "LangGraph",
        "LangChain",
        "OpenAI API",
        "MCP",
        "Playwright",
        "FastAPI",
        "Zoho CRM API"
      ],
      "keys": [
        "python",
        "langgraph",
        "langchain",
        "openai",
        "llms",
        "agents",
        "mcp",
        "prompt",
        "fastapi",
        "playwright",
        "scraping"
      ],
      "challenges": [
        "Agents looping on tool calls → bounded graph with step limits and explicit terminal states.",
        "Inconsistent LLM scores → rubric prompts, few-shot calibration and JSON-schema validation.",
        "Unsafe autonomous actions → approval gates and allow-listed MCP tools."
      ],
      "impact": [
        "Reps focus on qualified conversations instead of research",
        "Faster first response to hot leads",
        "Every decision is explainable with cited evidence"
      ],
      "results": [
        {
          "v": "~75%",
          "l": "less manual triage"
        },
        {
          "v": "\u003c60s",
          "l": "research per lead"
        },
        {
          "v": "100%",
          "l": "schema-valid outputs"
        }
      ],
      "github": "https://github.com/yash2208-get/leadgenie",
      "demo": ""
    },
    {
      "id": "scrapeforge",
      "type": "ai",
      "title": "ScrapeForge: AI Web-Scraping & Extraction Engine",
      "category": "Web Scraping · Data Engineering",
      "context": "Open-source automation project",
      "domain": "scrapeforge/runs",
      "layout": "terminal",
      "theme": [
        "#34D399",
        "#22D3EE"
      ],
      "summary": "Playwright and Selenium workers with proxy rotation plus LLM-powered extraction that turns any product page into clean JSON.",
      "problem": "E-commerce teams track competitor prices manually or with brittle scripts that break whenever a site changes its HTML.",
      "solution": "A distributed scraping engine: Playwright for dynamic pages, Selenium fallback, BeautifulSoup parsing, proxy rotation with retry and backoff, plus LLM schema extraction that turns pages into clean JSON without hand-written selectors.",
      "architecture": [
        "Scheduler (cron) + URL Queue",
        "Workers: Playwright · Selenium fallback",
        "Proxy Rotation · Retry/Backoff · Rate Limits",
        "Parser: BeautifulSoup + LLM schema extraction",
        "MongoDB (raw + normalized)",
        "FastAPI + Price-change Alerts"
      ],
      "features": [
        "Playwright workers for JS-heavy pages with Selenium fallback",
        "Proxy rotation, user-agent pools and exponential backoff",
        "LLM schema extraction → validated JSON (price, stock, variants)",
        "BeautifulSoup fast path for static pages",
        "Respects robots.txt, rate limits and site terms",
        "Change detection, alerts and CSV/JSON exports via FastAPI"
      ],
      "stack": [
        "Python",
        "Playwright",
        "Selenium",
        "BeautifulSoup",
        "OpenAI API",
        "MongoDB",
        "FastAPI",
        "Docker"
      ],
      "keys": [
        "python",
        "playwright",
        "selenium",
        "bs4",
        "scraping",
        "openai",
        "llms",
        "prompt",
        "mongodb",
        "fastapi"
      ],
      "challenges": [
        "Anti-bot blocks → realistic browser profiles, throttling and proxy rotation within site terms.",
        "Layout changes breaking selectors → LLM extraction with schema validation as a self-healing fallback.",
        "LLM cost at scale → call the LLM only when deterministic parsers fail, and cache by page hash."
      ],
      "impact": [
        "Pricing teams react to competitor changes the same day",
        "New sites onboard in under an hour",
        "Clean, structured data ready for analytics"
      ],
      "results": [
        {
          "v": "25K+",
          "l": "pages monitored daily"
        },
        {
          "v": "98%",
          "l": "scrape success rate"
        },
        {
          "v": "\u003c1h",
          "l": "to onboard a new site"
        }
      ],
      "github": "https://github.com/yash2208-get/scrapeforge",
      "demo": ""
    },
    {
      "id": "mcpdev",
      "type": "ai",
      "title": "MCP DevTools: AI Toolkit for Laravel Teams",
      "category": "Model Context Protocol · Dev Tools",
      "context": "Open-source developer tooling",
      "domain": "mcp://devtools",
      "layout": "terminal",
      "theme": [
        "#FBBF24",
        "#7C5CFF"
      ],
      "summary": "An MCP server that gives AI assistants safe, read-only access to logs, databases, Git history and the browser for faster debugging.",
      "problem": "Debugging production issues meant jumping between logs, databases, Git history and the browser. The context switching was slow and error-prone.",
      "solution": "An MCP server that safely exposes read-only database queries, Laravel log search, Git history and Playwright browser checks to AI assistants (Claude Desktop, Cursor, VS Code), with allow-listed SQL, redaction and audit logs.",
      "architecture": [
        "AI Client (Claude Desktop / Cursor)",
        "MCP Server (Python SDK)",
        "Tools: SQL (read-only) · Logs · Git · Browser",
        "Policy Layer: allow-list · PII redaction",
        "Audit Log (MongoDB)"
      ],
      "features": [
        "Read-only SQL tool with allow-listed tables and automatic LIMIT",
        "Laravel log search with time-window and severity filters",
        "Git history and diff tools for \"what changed?\" questions",
        "Playwright tool to reproduce UI bugs and capture screenshots",
        "PII redaction on every tool response",
        "Audit log of every AI tool call"
      ],
      "stack": [
        "Python",
        "MCP SDK",
        "Playwright",
        "MySQL",
        "MongoDB",
        "Docker"
      ],
      "keys": [
        "python",
        "mcp",
        "llms",
        "agents",
        "prompt",
        "playwright",
        "mongodb"
      ],
      "challenges": [
        "Preventing destructive queries → SQL parser allow-list plus a read-only database user.",
        "Leaking sensitive data to LLMs → field-level redaction rules.",
        "Tool sprawl confusing the model → small, well-described tools with typed schemas."
      ],
      "impact": [
        "Faster root-cause analysis during incidents",
        "Safer AI adoption for engineering teams",
        "Reusable pattern for any internal system"
      ],
      "results": [
        {
          "v": "~50%",
          "l": "faster bug triage"
        },
        {
          "v": "8",
          "l": "safe, typed tools"
        },
        {
          "v": "0",
          "l": "write access to prod"
        }
      ],
      "github": "https://github.com/yash2208-get/mcp-devtools",
      "demo": ""
    }
  ]
};
