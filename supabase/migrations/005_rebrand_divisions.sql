-- ============================================================
-- Globonexo Rebrand: Six Divisions + Updated Content
-- Deactivates old "services" (Software Testing) page
-- Seeds 6 division pages: consulting, solutions, talent-pool,
--   defense, research, advertising
-- Updates home + about pages to new positioning
-- ============================================================

-- ===================== DEACTIVATE OLD SERVICES PAGE =====================
UPDATE hero_sections SET is_active = false WHERE page_key = 'services';

-- ===================== UPDATE HOME PAGE =====================

-- Home: Hero
UPDATE hero_sections
SET title = 'Engineering the Future of Intelligence',
    description = 'Globonexo International is a world-leading AI consulting and development company headquartered in Stuttgart, Germany. We empower enterprises and ambitious startups to transform artificial intelligence into measurable business value.',
    extra_data = '{"cta2_text": "Schedule a Consultation", "cta2_link": "/contact"}'
WHERE page_key = 'home' AND section_key = 'hero' AND locale = 'en';

UPDATE hero_sections
SET title = 'Engineering the Future of Intelligence',
    description = 'Globonexo International ist ein weltweit führendes KI-Beratungs- und Entwicklungsunternehmen mit Hauptsitz in Stuttgart. Wir befähigen Unternehmen und ambitionierte Startups, künstliche Intelligenz in messbaren Geschäftswert zu verwandeln.',
    extra_data = '{"cta2_text": "Beratung vereinbaren", "cta2_link": "/contact"}'
WHERE page_key = 'home' AND section_key = 'hero' AND locale = 'de';

-- Home: Services section header
UPDATE hero_sections
SET title = 'The Six Divisions of Globonexo',
    subtitle = 'Globonexo International combines strategy, engineering, research, talent, and secure infrastructure within one integrated global structure.'
WHERE page_key = 'home' AND section_key = 'services' AND locale = 'en';

UPDATE hero_sections
SET title = 'Die sechs Divisionen von Globonexo',
    subtitle = 'Globonexo International vereint Strategie, Engineering, Forschung, Talent und sichere Infrastruktur in einer integrierten globalen Struktur.'
WHERE page_key = 'home' AND section_key = 'services' AND locale = 'de';

-- Home: Features section
UPDATE hero_sections
SET title = 'Six Divisions, One Integrated Global Structure',
    description = 'Globonexo International combines strategy, engineering, research, talent, and secure infrastructure within one integrated global structure — enabling organizations to move from AI ambition to operational reality.',
    extra_data = '{"body2": "AI built with precision. AI delivered at scale. AI that defines the next era of business.", "stats": [{"value": "8", "label": "Global Hubs"}, {"value": "4", "label": "Continents"}, {"value": "6", "label": "Specialized Divisions"}, {"value": "15+", "label": "Industries"}]}'
WHERE page_key = 'home' AND section_key = 'features' AND locale = 'en';

UPDATE hero_sections
SET title = 'Sechs Divisionen, eine integrierte globale Struktur',
    description = 'Globonexo International vereint Strategie, Engineering, Forschung, Talent und sichere Infrastruktur in einer integrierten globalen Struktur — damit Organisationen von KI-Ambitionen zur operativen Realität gelangen.',
    extra_data = '{"body2": "KI mit Präzision gebaut. KI im großen Maßstab geliefert. KI, die die nächste Ära des Business definiert.", "stats": [{"value": "8", "label": "Globale Hubs"}, {"value": "4", "label": "Kontinente"}, {"value": "6", "label": "Spezialisierte Divisionen"}, {"value": "15+", "label": "Branchen"}]}'
WHERE page_key = 'home' AND section_key = 'features' AND locale = 'de';

-- Home: Why Choose section
UPDATE hero_sections
SET title = 'Why enterprises choose Globonexo',
    subtitle = 'We combine strategy, engineering, research, talent, and secure infrastructure within one integrated global structure.',
    extra_data = '{"cards": [{"title": "Production-Ready AI Systems", "description": "We build AI systems that are secure, scalable, compliant, and fully integrated into real business operations — not just prototypes or proofs of concept."}, {"title": "Global Presence, Local Excellence", "description": "Stuttgart headquarters with strategic hubs in Boston, London, Barcelona, Warsaw, Kyiv, Delhi, and Bengaluru — ensuring proximity to clients and access to elite talent worldwide."}, {"title": "Measurable Business Outcomes", "description": "Every engagement is focused on outcomes — efficiency gains, revenue growth, operational resilience, and sustainable competitive advantage."}, {"title": "Six Integrated Divisions", "description": "Consulting, Solutions, Talent Pool, Advertising, Defense, and R&D — all working together within one global structure to deliver comprehensive AI transformation."}, {"title": "Responsible AI by Design", "description": "AI engineered with precision, governed responsibly, and implemented at scale. We build compliance, safety, and transparency into every system from the ground up."}]}'
WHERE page_key = 'home' AND section_key = 'why-choose' AND locale = 'en';

UPDATE hero_sections
SET title = 'Warum Unternehmen Globonexo wählen',
    subtitle = 'Wir vereinen Strategie, Engineering, Forschung, Talent und sichere Infrastruktur in einer integrierten globalen Struktur.',
    extra_data = '{"cards": [{"title": "Produktionsreife KI-Systeme", "description": "Wir bauen KI-Systeme, die sicher, skalierbar, konform und vollständig in reale Geschäftsabläufe integriert sind — nicht nur Prototypen oder Proof-of-Concepts."}, {"title": "Globale Präsenz, lokale Exzellenz", "description": "Hauptsitz in Stuttgart mit strategischen Hubs in Boston, London, Barcelona, Warschau, Kiew, Delhi und Bengaluru."}, {"title": "Messbare Geschäftsergebnisse", "description": "Jedes Engagement konzentriert sich auf Ergebnisse — Effizienzgewinne, Umsatzwachstum, operative Resilienz und nachhaltiger Wettbewerbsvorteil."}, {"title": "Sechs integrierte Divisionen", "description": "Consulting, Solutions, Talent Pool, Advertising, Defense und F&E — alle arbeiten in einer globalen Struktur zusammen."}, {"title": "Verantwortungsvolle KI by Design", "description": "KI mit Präzision engineered, verantwortungsvoll gesteuert und im großen Maßstab implementiert."}]}'
WHERE page_key = 'home' AND section_key = 'why-choose' AND locale = 'de';

-- Home: Global Presence
UPDATE hero_sections
SET title = 'Global Presence',
    extra_data = '{"map_image": "/images/map.webp", "hubs": ["Stuttgart — Global HQ", "Boston — US Sales & Consulting", "London — UK Sales & Consulting", "Barcelona — European Sales & Innovation", "Warsaw — R&D Center", "Kyiv — Talent Pool Hub", "Delhi — Solution Delivery", "Bengaluru — Solution Delivery & Talent"]}'
WHERE page_key = 'home' AND section_key = 'global-presence' AND locale = 'en';

UPDATE hero_sections
SET title = 'Globale Präsenz',
    extra_data = '{"map_image": "/images/map.webp", "hubs": ["Stuttgart — Globaler Hauptsitz", "Boston — US-Vertrieb & Beratung", "London — UK-Vertrieb & Beratung", "Barcelona — Europäischer Vertrieb & Innovation", "Warschau — F&E-Zentrum", "Kiew — Talent-Pool-Hub", "Delhi — Solution Delivery", "Bengaluru — Solution Delivery & Talent"]}'
WHERE page_key = 'home' AND section_key = 'global-presence' AND locale = 'de';

-- ===================== UPDATE ABOUT PAGE =====================

UPDATE hero_sections
SET title = 'About us',
    subtitle = 'Engineering the Future of Intelligence',
    description = 'Globonexo International is a world-leading AI consulting and AI development company headquartered in Stuttgart, Germany. We empower enterprises and ambitious startups to transform artificial intelligence into measurable business value.',
    extra_data = '{"body2": "While many organizations experiment with AI, Globonexo builds production-ready systems that are secure, scalable, compliant, and fully integrated into real business operations. The focus is always on outcomes — efficiency gains, revenue growth, operational resilience, and sustainable competitive advantage.", "illustration": "/images/about-illustration.webp"}'
WHERE page_key = 'about' AND section_key = 'hero' AND locale = 'en';

UPDATE hero_sections
SET title = 'Über uns',
    subtitle = 'Engineering the Future of Intelligence',
    description = 'Globonexo International ist ein weltweit führendes KI-Beratungs- und Entwicklungsunternehmen mit Hauptsitz in Stuttgart. Wir befähigen Unternehmen und ambitionierte Startups, künstliche Intelligenz in messbaren Geschäftswert zu verwandeln.',
    extra_data = '{"body2": "Während viele Organisationen mit KI experimentieren, baut Globonexo produktionsreife Systeme, die sicher, skalierbar, konform und vollständig in reale Geschäftsabläufe integriert sind.", "illustration": "/images/about-illustration.webp"}'
WHERE page_key = 'about' AND section_key = 'hero' AND locale = 'de';

UPDATE hero_sections
SET title = 'A Clear Position in the Global AI Market',
    extra_data = '{"paragraphs": ["Globonexo International was founded with a clear mission: to engineer artificial intelligence with precision, govern it responsibly, and implement it at scale to create lasting impact for enterprises worldwide.", "Headquartered in Stuttgart, Germany, Globonexo has grown into a world-leading AI consulting and development company with six specialized divisions — Consulting, Solutions, Talent Pool, Advertising, Defense, and Research & Development — all working within one integrated global structure.", "Our strategically positioned international hubs in Stuttgart, Boston, London, Barcelona, Warsaw, Kyiv, Delhi, and Bengaluru enable us to serve clients across industries with local expertise and global scale.", "While many organizations experiment with AI, Globonexo builds production-ready systems that are secure, scalable, compliant, and fully integrated into real business operations. The focus is always on outcomes — efficiency gains, revenue growth, operational resilience, and sustainable competitive advantage.", "Globonexo International. Engineering the Future of Intelligence. AI built with precision. AI delivered at scale. AI that defines the next era of business."]}'
WHERE page_key = 'about' AND section_key = 'journey' AND locale = 'en';

UPDATE hero_sections
SET title = 'Eine klare Position im globalen KI-Markt',
    extra_data = '{"paragraphs": ["Globonexo International wurde mit einer klaren Mission gegründet: Künstliche Intelligenz mit Präzision zu entwickeln, verantwortungsvoll zu steuern und im großen Maßstab zu implementieren.", "Mit Hauptsitz in Stuttgart hat sich Globonexo zu einem weltweit führenden KI-Beratungs- und Entwicklungsunternehmen mit sechs spezialisierten Divisionen entwickelt — Consulting, Solutions, Talent Pool, Advertising, Defense und Research & Development.", "Unsere strategisch positionierten internationalen Hubs in Stuttgart, Boston, London, Barcelona, Warschau, Kiew, Delhi und Bengaluru ermöglichen es uns, Kunden branchenübergreifend mit lokaler Expertise und globaler Reichweite zu bedienen.", "Während viele Organisationen mit KI experimentieren, baut Globonexo produktionsreife Systeme, die sicher, skalierbar, konform und vollständig in reale Geschäftsabläufe integriert sind.", "Globonexo International. Engineering the Future of Intelligence. KI mit Präzision gebaut. KI im großen Maßstab geliefert. KI, die die nächste Ära des Business definiert."]}'
WHERE page_key = 'about' AND section_key = 'journey' AND locale = 'de';

-- ===================== UPDATE SERVICES TABLE =====================
-- Replace old service cards with the six divisions

DELETE FROM services WHERE locale = 'en';
DELETE FROM services WHERE locale = 'de';

INSERT INTO services (title, description, icon, sort_order, is_active, locale) VALUES
  ('Globonexo Consulting', 'AI strategies, high-impact use cases, governance frameworks, and transformation roadmaps for structured AI adoption with measurable ROI.', '/images/services/laptop.png', 0, true, 'en'),
  ('Globonexo Solutions', 'Generative AI applications, intelligent automation platforms, predictive analytics engines, and enterprise AI architectures — designed for performance, security, and scalability.', '/images/services/bars-chart.png', 1, true, 'en'),
  ('Globonexo Talent Pool', 'Elite AI engineers, developers, and technology specialists through structured outstaffing models. Scale high-performance teams quickly with strict quality standards.', '/images/services/building.png', 2, true, 'en'),
  ('Globonexo Defense', 'Secure, mission-critical AI systems for environments where resilience, safety, and compliance are essential.', '/images/services/terminal.png', 3, true, 'en'),
  ('Globonexo R&D', 'Applied AI research, evaluation frameworks, reliability enhancement, and performance optimization to ensure technological leadership.', '/images/services/laptop.png', 4, true, 'en'),
  ('Globonexo Advertising', 'AI-powered growth and performance marketing through predictive audience modeling, automated content systems, and advanced analytics.', '/images/services/bars-chart.png', 5, true, 'en'),
  ('Globonexo Consulting', 'KI-Strategien, wirkungsvolle Anwendungsfälle, Governance-Frameworks und Transformations-Roadmaps für strukturierte KI-Einführung mit messbarem ROI.', '/images/services/laptop.png', 0, true, 'de'),
  ('Globonexo Solutions', 'Generative KI-Anwendungen, intelligente Automatisierungsplattformen, prädiktive Analyse-Engines und Enterprise-KI-Architekturen — für Leistung, Sicherheit und Skalierbarkeit.', '/images/services/bars-chart.png', 1, true, 'de'),
  ('Globonexo Talent Pool', 'Elite-KI-Ingenieure, Entwickler und Technologiespezialisten durch strukturierte Outstaffing-Modelle. Hochleistungsteams schnell skalieren.', '/images/services/building.png', 2, true, 'de'),
  ('Globonexo Defense', 'Sichere, missionskritische KI-Systeme für Umgebungen, in denen Resilienz, Sicherheit und Compliance essenziell sind.', '/images/services/terminal.png', 3, true, 'de'),
  ('Globonexo F&E', 'Angewandte KI-Forschung, Evaluierungs-Frameworks, Zuverlässigkeitssteigerung und Performance-Optimierung zur Sicherung der technologischen Führungsposition.', '/images/services/laptop.png', 4, true, 'de'),
  ('Globonexo Advertising', 'KI-gestütztes Growth- und Performance-Marketing durch Predictive Audience Modeling, automatisierte Content-Systeme und fortschrittliche Analytik.', '/images/services/bars-chart.png', 5, true, 'de')
ON CONFLICT DO NOTHING;

-- ===================== SEED DIVISION PAGES =====================
-- Each page has 4 sections: hero, end-to-end, automated-left, automated-right
-- The template component looks for these section_keys

-- ─── CONSULTING (EN) ─────────────────────────────────────────
INSERT INTO hero_sections (page_key, section_key, title, subtitle, description, cta_text, cta_link, extra_data, sort_order, is_active, locale) VALUES
  ('consulting', 'hero',
   'Globonexo Consulting',
   NULL,
   'Most AI initiatives fail not because the technology is wrong, but because the strategy is missing. Globonexo Consulting exists to ensure yours succeeds — with precision, clarity, and measurable outcomes from the very first engagement.',
   NULL, NULL, NULL, 0, true, 'en'),

  ('consulting', 'end-to-end',
   'Where AI Strategy Meets Executive Vision',
   NULL,
   'Globonexo Consulting works shoulder-to-shoulder with executive leadership to define AI strategies that are not theoretical exercises, but actionable blueprints for transformation. We identify the highest-impact use cases hiding in your operations, design governance frameworks that turn compliance into competitive advantage, and build transformation roadmaps with clear milestones and accountability.',
   'Start Your Transformation', '#',
   '{"body2": "The objective is never AI for the sake of AI. It is structured adoption that delivers measurable return on investment — turning boardroom ambitions into production-ready reality. Every recommendation we make is grounded in what actually works at scale.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'en'),

  ('consulting', 'automated-left',
   'Governance Frameworks That Become Your Moat',
   NULL,
   'In a world racing toward AI adoption, the companies that govern it best will win. We architect governance frameworks that make your AI systems transparent, auditable, and fully compliant across every jurisdiction you operate in — from GDPR to the EU AI Act and beyond.',
   'Explore Our Approach', '#',
   '{"body2": "But we go further. Our frameworks don''t just check boxes — they create trust with your customers, unlock new markets that demand responsible AI, and give your leadership the confidence to scale boldly. Compliance isn''t a cost. It''s your competitive edge.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'en'),

  ('consulting', 'automated-right',
   'From Ambition to Operating Reality',
   NULL,
   'The gap between AI ambition and operational reality has swallowed countless initiatives. Our transformation roadmaps close that gap with surgical precision — mapping every use case to business value, sequencing quick wins that build organization-wide momentum, and ensuring every dollar invested generates compounding returns.',
   'Explore Our Approach', '#',
   '{"body2": "We have guided enterprises from first conversation to full-scale deployment, transforming skeptics into champions along the way. Your roadmap isn''t a slide deck — it''s a living system that evolves with your business.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'en'),

-- ─── CONSULTING (DE) ─────────────────────────────────────────
  ('consulting', 'hero',
   'Globonexo Consulting',
   NULL,
   'Die meisten KI-Initiativen scheitern nicht an der Technologie, sondern an der fehlenden Strategie. Globonexo Consulting sorgt dafür, dass Ihre gelingt — mit Präzision, Klarheit und messbaren Ergebnissen vom ersten Engagement an.',
   NULL, NULL, NULL, 0, true, 'de'),

  ('consulting', 'end-to-end',
   'Wo KI-Strategie auf Executive Vision trifft',
   NULL,
   'Globonexo Consulting arbeitet Seite an Seite mit der Geschäftsführung, um KI-Strategien zu definieren, die keine theoretischen Übungen sind, sondern umsetzbare Blaupausen für Transformation. Wir identifizieren die wirkungsvollsten Anwendungsfälle in Ihren Abläufen, gestalten Governance-Frameworks, die Compliance zum Wettbewerbsvorteil machen, und erstellen Transformations-Roadmaps mit klaren Meilensteinen.',
   'Transformation starten', '#',
   '{"body2": "Das Ziel ist niemals KI um der KI willen. Es ist strukturierte Einführung, die messbaren Return on Investment liefert — Vorstandsambitionen werden zur produktionsreifen Realität.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'de'),

  ('consulting', 'automated-left',
   'Governance-Frameworks, die zum Burggraben werden',
   NULL,
   'In einer Welt, die auf KI-Einführung zusteuert, werden die Unternehmen gewinnen, die sie am besten steuern. Wir entwickeln Governance-Frameworks, die Ihre KI-Systeme transparent, überprüfbar und konform machen — von der DSGVO bis zum EU AI Act.',
   'Unseren Ansatz entdecken', '#',
   '{"body2": "Unsere Frameworks setzen nicht nur Häkchen — sie schaffen Vertrauen bei Ihren Kunden, erschließen neue Märkte und geben Ihrer Führung die Zuversicht, mutig zu skalieren. Compliance ist kein Kostenfaktor. Sie ist Ihr Wettbewerbsvorteil.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'de'),

  ('consulting', 'automated-right',
   'Von der Ambition zur operativen Realität',
   NULL,
   'Die Kluft zwischen KI-Ambition und operativer Realität hat unzählige Initiativen verschlungen. Unsere Transformations-Roadmaps schließen diese Lücke mit chirurgischer Präzision — jeder Anwendungsfall wird auf Geschäftswert abgebildet, Quick Wins werden sequenziert.',
   'Unseren Ansatz entdecken', '#',
   '{"body2": "Wir haben Unternehmen vom ersten Gespräch bis zur vollständigen Bereitstellung begleitet und dabei Skeptiker in Verfechter verwandelt. Ihre Roadmap ist kein Foliensatz — sie ist ein lebendes System, das sich mit Ihrem Unternehmen weiterentwickelt.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'de'),

-- ─── SOLUTIONS (EN) ─────────────────────────────────────────
  ('solutions', 'hero',
   'Globonexo Solutions',
   NULL,
   'The world doesn''t need another AI demo. It needs AI that works — in production, at scale, under pressure. Globonexo Solutions builds the systems that enterprises actually deploy, trust, and scale across their most critical operations.',
   NULL, NULL, NULL, 0, true, 'en'),

  ('solutions', 'end-to-end',
   'AI Systems Engineered for the Real World',
   NULL,
   'Globonexo Solutions develops and deploys advanced AI systems that go far beyond proofs of concept. We build generative AI applications that create genuine business value, intelligent automation platforms that eliminate operational bottlenecks, predictive analytics engines that turn raw data into strategic foresight, and enterprise AI architectures designed to evolve with your ambitions.',
   'Build With Us', '#',
   '{"body2": "Every system is engineered for three non-negotiable outcomes: performance that meets production demands, security that satisfies the most rigorous audits, and scalability that grows seamlessly from pilot to enterprise-wide deployment.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'en'),

  ('solutions', 'automated-left',
   'Generative AI That Transforms Operations',
   NULL,
   'The generative AI revolution is here — but capturing its value requires more than plugging in an API. We architect custom LLM deployments, intelligent document processing systems, and automated content engines that are deeply integrated into your workflows, governed by your policies, and optimized for your specific domain.',
   'See Our Solutions', '#',
   '{"body2": "Our intelligent automation platforms don''t just replicate human tasks — they reimagine entire processes. From supply chain orchestration to customer experience personalization, we build automation that compounds in value over time.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'en'),

  ('solutions', 'automated-right',
   'Predictive Intelligence at Enterprise Scale',
   NULL,
   'Your data is either a strategic weapon or an expensive liability. Globonexo Solutions turns it into the former. Our predictive analytics engines surface insights your competitors haven''t found yet, automate decisions that used to require entire departments, and create feedback loops that make your organization smarter with every interaction.',
   'See Our Solutions', '#',
   '{"body2": "Built on battle-tested frameworks with continuous monitoring, automated retraining pipelines, and robust failover architecture — because in production, there are no second chances.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'en'),

-- ─── SOLUTIONS (DE) ─────────────────────────────────────────
  ('solutions', 'hero',
   'Globonexo Solutions',
   NULL,
   'Die Welt braucht keine weitere KI-Demo. Sie braucht KI, die funktioniert — in Produktion, im großen Maßstab, unter Druck. Globonexo Solutions baut die Systeme, die Unternehmen tatsächlich einsetzen, denen sie vertrauen und die sie über ihre kritischsten Operationen skalieren.',
   NULL, NULL, NULL, 0, true, 'de'),

  ('solutions', 'end-to-end',
   'KI-Systeme für die reale Welt entwickelt',
   NULL,
   'Globonexo Solutions entwickelt und implementiert fortschrittliche KI-Systeme, die weit über Machbarkeitsstudien hinausgehen. Wir bauen Generative-AI-Anwendungen, intelligente Automatisierungsplattformen, Predictive-Analytics-Engines und Enterprise-KI-Architekturen, die mit Ihren Ambitionen wachsen.',
   'Mit uns bauen', '#',
   '{"body2": "Jedes System wird für drei nicht verhandelbare Ergebnisse entwickelt: Performance, die Produktionsanforderungen erfüllt, Sicherheit, die strengsten Audits standhält, und Skalierbarkeit vom Piloten bis zur unternehmensweiten Bereitstellung.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'de'),

  ('solutions', 'automated-left',
   'Generative AI, die Abläufe transformiert',
   NULL,
   'Die Generative-AI-Revolution ist da — aber ihren Wert zu erfassen, erfordert mehr als eine API-Anbindung. Wir entwickeln maßgeschneiderte LLM-Deployments, intelligente Dokumentenverarbeitung und automatisierte Content-Engines, die tief in Ihre Workflows integriert sind.',
   'Unsere Lösungen sehen', '#',
   '{"body2": "Unsere intelligenten Automatisierungsplattformen replizieren nicht nur menschliche Aufgaben — sie denken ganze Prozesse neu. Von der Supply-Chain-Orchestrierung bis zur Customer-Experience-Personalisierung bauen wir Automatisierung, die im Wert wächst.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'de'),

  ('solutions', 'automated-right',
   'Prädiktive Intelligenz im Enterprise-Maßstab',
   NULL,
   'Ihre Daten sind entweder eine strategische Waffe oder eine teure Belastung. Globonexo Solutions macht sie zum Ersteren. Unsere Predictive-Analytics-Engines liefern Erkenntnisse, die Ihre Wettbewerber noch nicht gefunden haben.',
   'Unsere Lösungen sehen', '#',
   '{"body2": "Aufgebaut auf kampferprobten Frameworks mit kontinuierlichem Monitoring, automatisierten Retraining-Pipelines und robuster Failover-Architektur — denn in der Produktion gibt es keine zweite Chance.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'de'),

-- ─── TALENT POOL (EN) ────────────────────────────────────────
  ('talent-pool', 'hero',
   'Globonexo Talent Pool',
   NULL,
   'The difference between a good AI initiative and a great one is always the people behind it. Globonexo Talent Pool gives you access to the engineers, architects, and specialists who build what others only imagine — available when you need them, performing from day one.',
   NULL, NULL, NULL, 0, true, 'en'),

  ('talent-pool', 'end-to-end',
   'Elite Engineers Who Ship What Matters',
   NULL,
   'The Globonexo Talent Pool is not a staffing agency with a database. It is a curated network of elite AI engineers, full-stack developers, cloud architects, and technology specialists who have been rigorously vetted across technical depth, problem-solving ability, and the soft skills that make remote collaboration seamless.',
   'Scale Your Team', '#',
   '{"body2": "Through structured outstaffing models, clients can scale high-performance teams in weeks rather than months — without sacrificing the quality standards that matter most.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'en'),

  ('talent-pool', 'automated-left',
   'Outstaffing, Reimagined',
   NULL,
   'Forget everything you know about traditional outstaffing. We''ve rebuilt the model from the ground up — with dedicated teams that embed into your culture, individual specialists who bring exactly the expertise your project demands, and project-based augmentation that scales elastically with your roadmap.',
   'Meet Our Talent', '#',
   '{"body2": "We handle every operational detail — recruitment, onboarding, payroll, local compliance, performance management — across every region we operate in. You focus on the vision. We deliver the people who make it real.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'en'),

  ('talent-pool', 'automated-right',
   'Four Continents. One Standard of Excellence.',
   NULL,
   'Our talent hubs in Warsaw, Kyiv, Delhi, and Bengaluru are not just offices — they are centers of engineering excellence, each with its own specialization and deep local talent ecosystems. Every team member works aligned to your time zone, integrated into your tools, and accountable to your standards.',
   'Meet Our Talent', '#',
   '{"body2": "Dedicated account managers, quarterly performance reviews, continuous upskilling programs, and strict delivery SLAs ensure that distance never compromises quality. Your team in Bengaluru will feel as close as the one down the hall.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'en'),

-- ─── TALENT POOL (DE) ────────────────────────────────────────
  ('talent-pool', 'hero',
   'Globonexo Talent Pool',
   NULL,
   'Der Unterschied zwischen einer guten KI-Initiative und einer großartigen sind immer die Menschen dahinter. Globonexo Talent Pool gibt Ihnen Zugang zu den Ingenieuren, Architekten und Spezialisten, die bauen, was andere nur vorstellen — verfügbar wenn Sie sie brauchen, leistungsfähig vom ersten Tag.',
   NULL, NULL, NULL, 0, true, 'de'),

  ('talent-pool', 'end-to-end',
   'Erstklassige Ingenieure, die liefern was zählt',
   NULL,
   'Der Globonexo Talent Pool ist keine Personalvermittlung mit Datenbank. Es ist ein kuratiertes Netzwerk aus erstklassigen KI-Ingenieuren, Full-Stack-Entwicklern, Cloud-Architekten und Technologiespezialisten, die rigoros geprüft wurden.',
   'Ihr Team skalieren', '#',
   '{"body2": "Durch strukturierte Outstaffing-Modelle können Kunden leistungsstarke Teams in Wochen statt Monaten skalieren — ohne die Qualitätsstandards zu opfern, die am wichtigsten sind.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'de'),

  ('talent-pool', 'automated-left',
   'Outstaffing, neu gedacht',
   NULL,
   'Vergessen Sie alles, was Sie über traditionelles Outstaffing wissen. Wir haben das Modell von Grund auf neu aufgebaut — mit dedizierten Teams, die sich in Ihre Kultur einbetten, individuellen Spezialisten und projektbasierter Verstärkung, die elastisch mit Ihrer Roadmap skaliert.',
   'Unser Talent kennenlernen', '#',
   '{"body2": "Wir übernehmen jedes operative Detail — Rekrutierung, Onboarding, Gehaltsabrechnung, lokale Compliance, Performance-Management — in jeder Region. Sie konzentrieren sich auf die Vision. Wir liefern die Menschen, die sie Realität werden lassen.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'de'),

  ('talent-pool', 'automated-right',
   'Vier Kontinente. Ein Standard der Exzellenz.',
   NULL,
   'Unsere Talent-Hubs in Warschau, Kiew, Delhi und Bengaluru sind nicht nur Büros — sie sind Zentren der Engineering-Exzellenz. Jedes Teammitglied arbeitet in Ihrer Zeitzone, integriert in Ihre Tools und Ihren Standards verpflichtet.',
   'Unser Talent kennenlernen', '#',
   '{"body2": "Dedizierte Account-Manager, quartalsweise Performance-Reviews, kontinuierliche Weiterbildung und strikte Delivery-SLAs stellen sicher, dass Distanz niemals Qualität kompromittiert.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'de'),

-- ─── DEFENSE (EN) ────────────────────────────────────────────
  ('defense', 'hero',
   'Globonexo Defense',
   NULL,
   'When failure is not an option, you need AI that was built to never fail. Globonexo Defense engineers mission-critical intelligence systems for environments where the stakes are absolute — where resilience, safety, and compliance aren''t features, they are requirements.',
   NULL, NULL, NULL, 0, true, 'en'),

  ('defense', 'end-to-end',
   'AI for When the Mission Cannot Fail',
   NULL,
   'Globonexo Defense develops AI systems for environments that demand a higher standard — where a single point of failure can cascade into catastrophe. Our solutions are designed from the ground up for maximum reliability, operating under the strictest security protocols and within clearly defined safety boundaries.',
   'Secure Your Mission', '#',
   '{"body2": "Every system undergoes adversarial testing, formal verification, and compliance auditing that goes far beyond industry standards. We don''t ship until the system has proven itself under conditions more demanding than any it will face in production.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'en'),

  ('defense', 'automated-left',
   'Resilience Engineered Into Every Layer',
   NULL,
   'Our defense-grade AI systems don''t just handle failure gracefully — they anticipate it. Built-in redundancy across compute, data, and decision layers ensures zero-downtime operations even in contested, degraded, or denied environments.',
   'Our Defense Capabilities', '#',
   '{"body2": "From real-time threat detection that processes millions of signals per second to autonomous decision support systems that augment human judgment without replacing it — every solution operates within safety boundaries enforced by formal verification.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'en'),

  ('defense', 'automated-right',
   'Security and Compliance Are Not Features. They Are the Architecture.',
   NULL,
   'At Globonexo Defense, security is not a layer we add — it is the foundation we build on. Zero-trust architecture, end-to-end encryption, hardware-backed key management, and continuous threat monitoring are embedded into every system from the first line of code.',
   'Our Defense Capabilities', '#',
   '{"body2": "We engineer for the most stringent regulatory environments, ensuring full compliance with defense and government standards. When you protect critical infrastructure, anything less than absolute security is unacceptable.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'en'),

-- ─── DEFENSE (DE) ────────────────────────────────────────────
  ('defense', 'hero',
   'Globonexo Defense',
   NULL,
   'Wenn Scheitern keine Option ist, brauchen Sie KI, die gebaut wurde, um niemals zu versagen. Globonexo Defense entwickelt missionskritische Intelligenzsysteme für Umgebungen, in denen die Einsätze absolut sind.',
   NULL, NULL, NULL, 0, true, 'de'),

  ('defense', 'end-to-end',
   'KI für den Fall, dass die Mission nicht scheitern darf',
   NULL,
   'Globonexo Defense entwickelt KI-Systeme für Umgebungen, die einen höheren Standard verlangen — wo ein einzelner Ausfallpunkt zur Katastrophe führen kann. Unsere Lösungen sind von Grund auf für maximale Zuverlässigkeit konzipiert.',
   'Ihre Mission sichern', '#',
   '{"body2": "Jedes System durchläuft Adversarial Testing, formale Verifikation und Compliance-Auditing, das weit über Industriestandards hinausgeht. Wir liefern erst, wenn das System sich unter Bedingungen bewiesen hat, die anspruchsvoller sind als alles in der Produktion.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'de'),

  ('defense', 'automated-left',
   'Resilienz in jeder Schicht engineered',
   NULL,
   'Unsere Defense-Grade-KI-Systeme behandeln Ausfälle nicht nur elegant — sie antizipieren sie. Eingebaute Redundanz über Compute-, Daten- und Entscheidungsebenen gewährleistet Null-Ausfallzeit-Betrieb auch in umkämpften Umgebungen.',
   'Unsere Defense-Fähigkeiten', '#',
   '{"body2": "Von Echtzeit-Bedrohungserkennung, die Millionen Signale pro Sekunde verarbeitet, bis zu autonomen Entscheidungsunterstützungssystemen — jede Lösung operiert innerhalb von Sicherheitsgrenzen, die durch formale Verifikation durchgesetzt werden.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'de'),

  ('defense', 'automated-right',
   'Sicherheit und Compliance sind keine Features. Sie sind die Architektur.',
   NULL,
   'Bei Globonexo Defense ist Sicherheit keine Schicht, die wir hinzufügen — sie ist das Fundament, auf dem wir bauen. Zero-Trust-Architektur, Ende-zu-Ende-Verschlüsselung und kontinuierliches Threat-Monitoring sind in jedes System eingebettet.',
   'Unsere Defense-Fähigkeiten', '#',
   '{"body2": "Wir entwickeln für die strengsten regulatorischen Umgebungen und gewährleisten volle Compliance mit Verteidigungs- und Regierungsstandards. Wenn Sie kritische Infrastruktur schützen, ist alles weniger als absolute Sicherheit inakzeptabel.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'de'),

-- ─── RESEARCH (EN) ───────────────────────────────────────────
  ('research', 'hero',
   'Globonexo Research and Development',
   NULL,
   'The future doesn''t arrive on schedule. It arrives when someone builds it. Globonexo R&D is where tomorrow''s AI breakthroughs become today''s production systems — through relentless applied research, rigorous evaluation, and the belief that innovation without deployment is just theory.',
   NULL, NULL, NULL, 0, true, 'en'),

  ('research', 'end-to-end',
   'Where Breakthroughs Become Business Outcomes',
   NULL,
   'The Research and Development division is the engine that powers every other Globonexo business unit. Every project is connected to a real-world application, a real business challenge, and a real deployment timeline. Applied AI research, evaluation frameworks, reliability engineering, and performance optimization are the tools we use to maintain technological leadership.',
   'Partner With R&D', '#',
   '{"body2": "Our R&D team operates at the intersection of academic rigor and production urgency. We read the papers, run the experiments, break the assumptions — then we build systems that actually work in the messy reality of enterprise operations.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'en'),

  ('research', 'automated-left',
   'Evaluation That Goes Beyond Benchmarks',
   NULL,
   'Benchmarks are comfortable. Production is not. Our evaluation frameworks measure AI system performance, reliability, and safety under the conditions that actually matter — edge cases, adversarial inputs, data drift, load spikes, and the thousand small failures that benchmarks never test for.',
   'Explore Our Research', '#',
   '{"body2": "We build reliability into AI systems the way aerospace engineers build it into flight systems — through continuous stress testing, formal verification, degradation analysis, and a culture that treats every failure mode as a design input.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'en'),

  ('research', 'automated-right',
   'Performance Optimization as a Discipline',
   NULL,
   'Speed, efficiency, and accuracy are not afterthoughts — they are engineering disciplines. Our R&D team obsesses over inference latency, model compression, quantization strategies, and deployment architectures that squeeze maximum value from every compute dollar.',
   'Explore Our Research', '#',
   '{"body2": "Innovation at Globonexo is systematic. Active research programs in foundation model adaptation, multi-agent systems, retrieval-augmented generation, and edge AI feed directly into every business unit. When we discover something that works, it ships.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'en'),

-- ─── RESEARCH (DE) ───────────────────────────────────────────
  ('research', 'hero',
   'Globonexo Research and Development',
   NULL,
   'Die Zukunft kommt nicht nach Zeitplan. Sie kommt, wenn jemand sie baut. Globonexo R&D ist der Ort, an dem die KI-Durchbrüche von morgen zu den Produktionssystemen von heute werden — durch unermüdliche angewandte Forschung und rigorose Evaluation.',
   NULL, NULL, NULL, 0, true, 'de'),

  ('research', 'end-to-end',
   'Wo Durchbrüche zu Geschäftsergebnissen werden',
   NULL,
   'Die Abteilung Research and Development ist der Motor, der alle anderen Globonexo-Geschäftsbereiche antreibt. Jedes Projekt ist mit einer realen Anwendung, einer echten Geschäftsherausforderung und einem konkreten Deployment-Zeitplan verbunden.',
   'Mit R&D zusammenarbeiten', '#',
   '{"body2": "Unser R&D-Team arbeitet an der Schnittstelle zwischen akademischer Rigorosität und Produktionsdringlichkeit. Wir lesen die Paper, führen die Experimente durch, hinterfragen die Annahmen — und bauen dann Systeme, die in der realen Welt funktionieren.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'de'),

  ('research', 'automated-left',
   'Evaluation, die über Benchmarks hinausgeht',
   NULL,
   'Benchmarks sind komfortabel. Produktion nicht. Unsere Evaluierungs-Frameworks messen KI-Performance, Zuverlässigkeit und Sicherheit unter den Bedingungen, die wirklich zählen — Edge Cases, adversariale Eingaben, Data Drift und tausend kleine Fehler, die Benchmarks nie testen.',
   'Unsere Forschung entdecken', '#',
   '{"body2": "Wir bauen Zuverlässigkeit in KI-Systeme ein wie Luft- und Raumfahrtingenieure in Flugsysteme — durch kontinuierliches Stresstesting, formale Verifikation und eine Kultur, die jeden Fehlermodus als Design-Input behandelt.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'de'),

  ('research', 'automated-right',
   'Performance-Optimierung als Disziplin',
   NULL,
   'Geschwindigkeit, Effizienz und Genauigkeit sind keine Nebensache — sie sind Engineering-Disziplinen. Unser R&D-Team optimiert obsessiv Inferenz-Latenz, Modellkompression, Quantisierungsstrategien und Deployment-Architekturen.',
   'Unsere Forschung entdecken', '#',
   '{"body2": "Innovation bei Globonexo ist systematisch. Aktive Forschungsprogramme in Foundation-Model-Adaptation, Multi-Agent-Systemen, Retrieval-Augmented Generation und Edge AI fließen direkt in jeden Geschäftsbereich. Wenn wir etwas entdecken, das funktioniert, wird es ausgeliefert.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'de'),

-- ─── ADVERTISING (EN) ────────────────────────────────────────
  ('advertising', 'hero',
   'Globonexo Advertising',
   NULL,
   'Every wasted ad dollar is a competitor''s opportunity. Globonexo Advertising deploys artificial intelligence where it matters most — turning marketing spend into mathematical precision, audience guesswork into predictive science, and content production into an engine that never sleeps.',
   NULL, NULL, NULL, 0, true, 'en'),

  ('advertising', 'end-to-end',
   'Marketing Where Every Decision Is Intelligent',
   NULL,
   'Globonexo Advertising applies artificial intelligence to growth and performance marketing with a single obsession: measurable outcomes. Through predictive audience modeling that finds your next customer before they know they need you, automated content systems that produce at scale without sacrificing brand integrity, and advanced analytics that trace every conversion back to its source.',
   'Accelerate Your Growth', '#',
   '{"body2": "The result is not incremental improvement — it is a fundamental shift in how marketing operates. Campaigns that learn from every impression. Budgets that optimize themselves in real time. Market positioning that strengthens automatically as your data grows.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'en'),

  ('advertising', 'automated-left',
   'Predictive Audiences: Find Them Before They Find You',
   NULL,
   'Basic segmentation is a rearview mirror — it tells you where your customers were, not where they''re going. Our predictive audience models analyze behavioral patterns, intent signals, competitive movements, and contextual data in real time to identify high-value prospects before your competitors even know they exist.',
   'See the Platform', '#',
   '{"body2": "The models retrain continuously, so your targeting sharpens as markets shift. New segments emerge automatically. Wasted spend drops. Conversion rates compound. Over time, your marketing doesn''t just get better — it gets smarter.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'en'),

  ('advertising', 'automated-right',
   'Content That Scales. Analytics That Illuminate.',
   NULL,
   'The bottleneck in modern marketing isn''t ideas — it''s execution at scale. Our AI-powered content systems produce personalized messaging across every audience segment, channel, and touchpoint while maintaining the brand consistency that builds trust.',
   'See the Platform', '#',
   '{"body2": "And behind every campaign, our advanced analytics platform provides the clarity that transforms good marketers into great ones — end-to-end attribution that reveals true ROI, real-time dashboards, and predictive insights that tell you what to do next. No more gut feelings. Just intelligence.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'en'),

-- ─── ADVERTISING (DE) ────────────────────────────────────────
  ('advertising', 'hero',
   'Globonexo Advertising',
   NULL,
   'Jeder verschwendete Werbe-Euro ist eine Chance für Ihre Wettbewerber. Globonexo Advertising setzt künstliche Intelligenz dort ein, wo es am meisten zählt — Marketingausgaben werden zur mathematischen Präzision, Zielgruppen-Raten zur prädiktiven Wissenschaft.',
   NULL, NULL, NULL, 0, true, 'de'),

  ('advertising', 'end-to-end',
   'Marketing, bei dem jede Entscheidung intelligent ist',
   NULL,
   'Globonexo Advertising wendet künstliche Intelligenz auf Growth- und Performance-Marketing an mit einer einzigen Obsession: messbare Ergebnisse. Durch Predictive Audience Modeling, automatisierte Content-Systeme und fortschrittliche Analytik, die jede Conversion bis zur Quelle zurückverfolgt.',
   'Ihr Wachstum beschleunigen', '#',
   '{"body2": "Das Ergebnis ist keine inkrementelle Verbesserung — es ist ein fundamentaler Wandel. Kampagnen, die aus jeder Impression lernen. Budgets, die sich in Echtzeit selbst optimieren. Marktpositionierung, die sich automatisch stärkt, während Ihre Daten wachsen.", "illustration": "/images/first_illustration.webp"}',
   1, true, 'de'),

  ('advertising', 'automated-left',
   'Prädiktive Zielgruppen: Finden Sie sie, bevor sie Sie finden',
   NULL,
   'Einfache Segmentierung ist ein Rückspiegel — sie zeigt, wo Ihre Kunden waren, nicht wohin sie gehen. Unsere prädiktiven Zielgruppenmodelle analysieren Verhaltensmuster, Intent-Signale und kontextuelle Daten in Echtzeit, um hochwertige Interessenten zu identifizieren, bevor Ihre Wettbewerber es tun.',
   'Die Plattform sehen', '#',
   '{"body2": "Die Modelle trainieren kontinuierlich nach, sodass Ihr Targeting schärfer wird, wenn sich Märkte verschieben. Neue Segmente entstehen automatisch. Verschwendete Ausgaben sinken. Konversionsraten steigen kumulativ.", "illustration": "/images/second_illustration.webp"}',
   2, true, 'de'),

  ('advertising', 'automated-right',
   'Content, der skaliert. Analytik, die erhellt.',
   NULL,
   'Der Engpass im modernen Marketing sind nicht Ideen — es ist die Umsetzung im großen Maßstab. Unsere KI-gestützten Content-Systeme produzieren personalisierte Botschaften über jedes Zielgruppensegment, jeden Kanal und jeden Touchpoint bei gleichbleibender Markenkonsistenz.',
   'Die Plattform sehen', '#',
   '{"body2": "Und hinter jeder Kampagne bietet unsere fortschrittliche Analytics-Plattform die Klarheit, die gute Marketer in großartige verwandelt — End-to-End-Attribution, Echtzeit-Dashboards und prädiktive Insights. Keine Bauchgefühle mehr. Nur Intelligenz.", "illustration": "/images/third_illustration.webp"}',
   3, true, 'de'),

-- ===================== WHY-CHOOSE PER DIVISION (EN) =====================

  ('consulting', 'why-choose',
   'Why Leading Enterprises Trust Globonexo Consulting',
   'We don''t just advise — we architect transformation. Our consultants combine deep technical mastery with real-world operational insight to deliver strategies that actually ship.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "Battle-Tested AI Architects", "description": "Every consultant has delivered enterprise-grade AI systems in production — not just proofs of concept."}, {"title": "Strategy That Ships", "description": "We bridge the gap between boardroom vision and engineering execution with concrete, time-bound roadmaps."}, {"title": "Industry-Specific Playbooks", "description": "Pre-built frameworks for automotive, finance, healthcare, and manufacturing accelerate your time to value."}, {"title": "Vendor-Agnostic Guidance", "description": "We recommend the best technology for your problem, not the one that pays us the highest referral fee."}, {"title": "Measurable ROI from Day One", "description": "Every engagement includes defined success metrics so you can quantify the impact of every euro invested."}]}',
   10, true, 'en'),

  ('solutions', 'why-choose',
   'Why Innovators Choose Globonexo Solutions',
   'We don''t build software and walk away. We engineer intelligent systems that compound in value — platforms that learn, adapt, and scale alongside your ambition.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "Full-Stack AI Engineering", "description": "From data pipelines to production ML models to beautiful interfaces — one team, one vision, zero handoff friction."}, {"title": "Built to Scale from Day One", "description": "Cloud-native architectures designed for millions of users, not just the demo. We engineer for your future, not just your present."}, {"title": "Continuous Intelligence", "description": "Our solutions don''t just process data — they learn from it. Models retrain, dashboards update, and insights sharpen automatically."}, {"title": "Rapid Prototyping, Robust Delivery", "description": "From concept to working prototype in weeks. From prototype to production-grade platform in months."}, {"title": "Transparent, Collaborative Process", "description": "Weekly demos, shared repositories, and open communication — you''re never in the dark about what we''re building."}]}',
   10, true, 'en'),

  ('talent-pool', 'why-choose',
   'Why Companies Scale with Globonexo Talent Pool',
   'We don''t just fill seats — we embed mission-critical engineers who integrate seamlessly into your culture, your codebase, and your deadlines.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "Pre-Vetted Technical Excellence", "description": "Every engineer passes rigorous coding assessments, system design interviews, and cultural alignment reviews before joining your team."}, {"title": "Global Reach, Local Time Zones", "description": "Talent from India, Eastern Europe, and beyond — strategically placed to overlap with your working hours for real-time collaboration."}, {"title": "Flexible Engagement Models", "description": "Staff augmentation, dedicated teams, or project-based squads. Scale up in weeks, scale down without friction."}, {"title": "Retention-Focused Culture", "description": "We invest in our engineers'' growth so they stay engaged and committed to your project long-term — not just until the next offer."}, {"title": "Zero Recruitment Overhead", "description": "No job postings, no screening calls, no onboarding headaches. We handle everything so you can focus on building."}]}',
   10, true, 'en'),

  ('defense', 'why-choose',
   'Why Sovereign Nations Trust Globonexo Defense',
   'In a domain where failure is not an option, we deliver AI systems engineered for the most demanding operational environments on Earth.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "NATO-Grade Security Architecture", "description": "Every system is built from the ground up for classified environments — air-gapped, encrypted, and compliant with the strictest defense standards."}, {"title": "Real-Time Decision Intelligence", "description": "Millisecond-latency AI pipelines that process multi-sensor data streams for situational awareness when every second counts."}, {"title": "Sovereign AI — No Foreign Dependencies", "description": "Models trained, deployed, and operated entirely within your jurisdiction. Your intelligence stays yours."}, {"title": "Battle-Proven Engineering Teams", "description": "Our defense engineers have delivered mission-critical systems for NATO allies and understand the unique constraints of military operations."}, {"title": "Ethical AI Governance Built In", "description": "Human-in-the-loop architectures ensure AI augments human judgment rather than replacing it in high-stakes decisions."}]}',
   10, true, 'en'),

  ('research', 'why-choose',
   'Why Visionaries Partner with Globonexo R&D',
   'We don''t follow research trends — we set them. Our labs push the boundaries of what artificial intelligence can do, then engineer the results into products that work.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "Published, Peer-Reviewed Breakthroughs", "description": "Our researchers contribute to top-tier venues like NeurIPS, ICML, and CVPR — advancing the science, not just applying it."}, {"title": "From Paper to Product Pipeline", "description": "Every research initiative has a clear path to commercial application. We don''t do science for science''s sake."}, {"title": "Cross-Domain Innovation", "description": "Insights from defense inform healthcare. Techniques from advertising sharpen manufacturing. Our divisions cross-pollinate breakthroughs."}, {"title": "State-of-the-Art Infrastructure", "description": "GPU clusters, MLOps pipelines, and experiment tracking platforms that let researchers focus on ideas, not infrastructure."}, {"title": "Open Collaboration Model", "description": "We partner with leading universities and research institutions worldwide, combining academic rigor with commercial urgency."}]}',
   10, true, 'en'),

  ('advertising', 'why-choose',
   'Why Market Leaders Choose Globonexo Advertising',
   'We don''t optimize campaigns — we reinvent them. Our AI-native advertising platform turns every impression into intelligence and every dollar into measurable growth.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "AI-First, Not AI-Bolted-On", "description": "Our platform was built from scratch around machine learning — not a legacy ad tool with AI sprinkled on top."}, {"title": "Predictive Audience Discovery", "description": "Find high-value prospects before your competitors do. Our models identify intent signals invisible to traditional segmentation."}, {"title": "Real-Time Budget Optimization", "description": "Budgets shift automatically across channels, creatives, and audiences based on live performance data — no manual intervention needed."}, {"title": "Creative at Scale", "description": "Generate thousands of personalized ad variations while maintaining brand consistency across every channel and touchpoint."}, {"title": "Full-Funnel Attribution", "description": "End-to-end visibility from first impression to final conversion. No black boxes, no guesswork — just clarity."}]}',
   10, true, 'en'),

-- ===================== WHY-CHOOSE PER DIVISION (DE) =====================

  ('consulting', 'why-choose',
   'Warum führende Unternehmen Globonexo Consulting vertrauen',
   'Wir beraten nicht nur — wir gestalten Transformation. Unsere Berater vereinen tiefes technisches Fachwissen mit operativer Praxiserfahrung für Strategien, die tatsächlich umgesetzt werden.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "Kampferprobte KI-Architekten", "description": "Jeder Berater hat produktionsreife KI-Systeme auf Enterprise-Niveau geliefert — nicht nur Proof-of-Concepts."}, {"title": "Strategie, die liefert", "description": "Wir überbrücken die Lücke zwischen Vorstandsvision und Engineering-Umsetzung mit konkreten, zeitgebundenen Roadmaps."}, {"title": "Branchenspezifische Playbooks", "description": "Vorgefertigte Frameworks für Automotive, Finanzen, Gesundheitswesen und Fertigung beschleunigen Ihre Time-to-Value."}, {"title": "Herstellerunabhängige Beratung", "description": "Wir empfehlen die beste Technologie für Ihr Problem, nicht die mit der höchsten Vermittlungsprovision."}, {"title": "Messbarer ROI ab Tag eins", "description": "Jedes Engagement enthält definierte Erfolgskennzahlen, damit Sie den Impact jedes investierten Euros quantifizieren können."}]}',
   10, true, 'de'),

  ('solutions', 'why-choose',
   'Warum Innovatoren Globonexo Solutions wählen',
   'Wir bauen keine Software und verschwinden. Wir entwickeln intelligente Systeme, die im Wert wachsen — Plattformen, die lernen, sich anpassen und mit Ihrem Ehrgeiz skalieren.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "Full-Stack KI-Engineering", "description": "Von Datenpipelines über Produktions-ML-Modelle bis zu schönen Interfaces — ein Team, eine Vision, null Übergabereibung."}, {"title": "Von Anfang an skalierbar", "description": "Cloud-native Architekturen für Millionen von Nutzern, nicht nur für die Demo. Wir entwickeln für Ihre Zukunft, nicht nur für Ihre Gegenwart."}, {"title": "Kontinuierliche Intelligenz", "description": "Unsere Lösungen verarbeiten nicht nur Daten — sie lernen daraus. Modelle trainieren nach, Dashboards aktualisieren sich, Insights schärfen sich automatisch."}, {"title": "Schnelles Prototyping, robuste Lieferung", "description": "Vom Konzept zum funktionierenden Prototyp in Wochen. Vom Prototyp zur produktionsreifen Plattform in Monaten."}, {"title": "Transparenter, kollaborativer Prozess", "description": "Wöchentliche Demos, geteilte Repositories und offene Kommunikation — Sie sind nie im Dunkeln über das, was wir bauen."}]}',
   10, true, 'de'),

  ('talent-pool', 'why-choose',
   'Warum Unternehmen mit Globonexo Talent Pool skalieren',
   'Wir füllen nicht nur Stellen — wir integrieren missionskritische Ingenieure, die nahtlos in Ihre Kultur, Ihre Codebasis und Ihre Deadlines eingebunden werden.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "Vorab geprüfte technische Exzellenz", "description": "Jeder Ingenieur besteht strenge Coding-Assessments, System-Design-Interviews und kulturelle Alignment-Reviews, bevor er Ihrem Team beitritt."}, {"title": "Globale Reichweite, lokale Zeitzonen", "description": "Talente aus Indien, Osteuropa und darüber hinaus — strategisch platziert für Überschneidung mit Ihren Arbeitszeiten."}, {"title": "Flexible Engagement-Modelle", "description": "Staff Augmentation, dedizierte Teams oder projektbasierte Squads. Skalieren Sie in Wochen hoch, reduzieren Sie ohne Reibung."}, {"title": "Retention-fokussierte Kultur", "description": "Wir investieren in das Wachstum unserer Ingenieure, damit sie engagiert und Ihrem Projekt langfristig verpflichtet bleiben."}, {"title": "Null Recruiting-Overhead", "description": "Keine Stellenanzeigen, keine Screening-Calls, keine Onboarding-Kopfschmerzen. Wir kümmern uns um alles."}]}',
   10, true, 'de'),

  ('defense', 'why-choose',
   'Warum souveräne Nationen Globonexo Defense vertrauen',
   'In einem Bereich, in dem Versagen keine Option ist, liefern wir KI-Systeme für die anspruchsvollsten operativen Umgebungen der Welt.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "NATO-konforme Sicherheitsarchitektur", "description": "Jedes System wird von Grund auf für klassifizierte Umgebungen gebaut — air-gapped, verschlüsselt und konform mit den strengsten Verteidigungsstandards."}, {"title": "Echtzeit-Entscheidungsintelligenz", "description": "KI-Pipelines mit Millisekunden-Latenz, die Multi-Sensor-Datenströme für Situationsbewusstsein verarbeiten, wenn jede Sekunde zählt."}, {"title": "Souveräne KI — keine Auslandsabhängigkeiten", "description": "Modelle werden vollständig innerhalb Ihrer Jurisdiktion trainiert, bereitgestellt und betrieben. Ihre Intelligenz bleibt Ihre."}, {"title": "Kampferprobte Engineering-Teams", "description": "Unsere Defense-Ingenieure haben missionskritische Systeme für NATO-Verbündete geliefert und verstehen die einzigartigen Anforderungen militärischer Operationen."}, {"title": "Eingebaute ethische KI-Governance", "description": "Human-in-the-Loop-Architekturen stellen sicher, dass KI menschliches Urteilsvermögen in kritischen Entscheidungen ergänzt, nicht ersetzt."}]}',
   10, true, 'de'),

  ('research', 'why-choose',
   'Warum Visionäre mit Globonexo R&D zusammenarbeiten',
   'Wir folgen keinen Forschungstrends — wir setzen sie. Unsere Labore erweitern die Grenzen der künstlichen Intelligenz und machen die Ergebnisse zu funktionierenden Produkten.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "Veröffentlichte, peer-reviewte Durchbrüche", "description": "Unsere Forscher tragen zu Top-Venues wie NeurIPS, ICML und CVPR bei — sie treiben die Wissenschaft voran, wenden sie nicht nur an."}, {"title": "Von der Studie zum Produkt", "description": "Jede Forschungsinitiative hat einen klaren Weg zur kommerziellen Anwendung. Wir betreiben keine Wissenschaft um der Wissenschaft willen."}, {"title": "Domänenübergreifende Innovation", "description": "Erkenntnisse aus der Verteidigung fließen ins Gesundheitswesen. Techniken aus der Werbung schärfen die Fertigung. Unsere Divisionen befruchten sich gegenseitig."}, {"title": "Modernste Infrastruktur", "description": "GPU-Cluster, MLOps-Pipelines und Experiment-Tracking-Plattformen, damit sich Forscher auf Ideen konzentrieren können, nicht auf Infrastruktur."}, {"title": "Offenes Kollaborationsmodell", "description": "Wir kooperieren mit führenden Universitäten und Forschungseinrichtungen weltweit und verbinden akademische Strenge mit kommerzieller Dringlichkeit."}]}',
   10, true, 'de'),

  ('advertising', 'why-choose',
   'Warum Marktführer Globonexo Advertising wählen',
   'Wir optimieren keine Kampagnen — wir erfinden sie neu. Unsere KI-native Werbeplattform verwandelt jede Impression in Intelligenz und jeden Euro in messbares Wachstum.',
   NULL, NULL, NULL,
   '{"cards": [{"title": "KI-First, nicht KI-nachgerüstet", "description": "Unsere Plattform wurde von Grund auf um Machine Learning herum gebaut — kein Legacy-Ad-Tool mit aufgesetzter KI."}, {"title": "Prädiktive Zielgruppenentdeckung", "description": "Finden Sie hochwertige Interessenten, bevor es Ihre Wettbewerber tun. Unsere Modelle erkennen Intent-Signale, die traditioneller Segmentierung entgehen."}, {"title": "Echtzeit-Budgetoptimierung", "description": "Budgets verschieben sich automatisch über Kanäle, Creatives und Zielgruppen basierend auf Live-Performance-Daten — kein manuelles Eingreifen nötig."}, {"title": "Kreativität im großen Maßstab", "description": "Generieren Sie Tausende personalisierter Anzeigenvarianten bei gleichbleibender Markenkonsistenz über jeden Kanal und Touchpoint."}, {"title": "Full-Funnel-Attribution", "description": "End-to-End-Sichtbarkeit von der ersten Impression bis zur finalen Konversion. Keine Blackboxes, kein Raten — nur Klarheit."}]}',
   10, true, 'de')

ON CONFLICT (page_key, section_key, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  cta_text = EXCLUDED.cta_text,
  cta_link = EXCLUDED.cta_link,
  extra_data = EXCLUDED.extra_data,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- ===================== UPDATE SITE SETTINGS =====================
UPDATE site_settings
SET value = '{"name": "Globonexo International", "tagline": "Engineering the Future of Intelligence", "email": "contact.global@globonexo.com", "phone": "+49 711 123456", "address": "Headquarters: Königstr. 10c, 70173 Stuttgart, Germany"}'
WHERE key = 'company';
