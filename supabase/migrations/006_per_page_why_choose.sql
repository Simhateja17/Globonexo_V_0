-- ============================================================
-- Per-division "Why Choose" sections
-- Each division page gets unique why-choose content
-- ============================================================

INSERT INTO hero_sections (page_key, section_key, title, subtitle, description, cta_text, cta_link, extra_data, sort_order, is_active, locale) VALUES

-- ===================== EN =====================

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

-- ===================== DE =====================

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
