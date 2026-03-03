-- ============================================================
-- German (de) seed data for all CMS content tables
-- Mirrors the English content with German translations
-- ============================================================

-- ===================== SERVICES (German) =====================
INSERT INTO services (title, description, icon, sort_order, is_active, locale) VALUES
  (
    'Herausragende Personallösungen',
    'Expertise in Personalverstärkung, dedizierten Teams, EOR (Employer of Record) und PEO (Professional Employer Organization) Modellen.',
    '/images/services/laptop.png',
    0,
    true,
    'de'
  ),
  (
    'Maßgeschneiderte Lösungen für individuelle Anforderungen',
    'Individuelle IT- und Softwarelösungen, die auf spezifische Herausforderungen und Ziele zugeschnitten sind. Schwerpunkt auf Skalierbarkeit, Innovation und Ausrichtung an Geschäftsstrategien.',
    '/images/services/bars-chart.png',
    1,
    true,
    'de'
  ),
  (
    'Software-Testdienstleistungen',
    'Umfassende QA- und Testdienstleistungen für robuste, leistungsstarke und fehlerfreie Software. Spezialisiert auf manuelle, automatisierte und Performance-Tests für verschiedene Branchen.',
    '/images/services/building.png',
    2,
    true,
    'de'
  ),
  (
    'Kosteneffizienz',
    'Sparen Sie bei Rekrutierungs- und Betriebskosten, ohne Kompromisse bei der Qualität einzugehen.',
    '/images/services/terminal.png',
    3,
    true,
    'de'
  )
ON CONFLICT DO NOTHING;

-- ===================== TEAM MEMBERS (German) =====================
INSERT INTO team_members (name, role, bio, photo_url, sort_order, is_active, locale) VALUES
  (
    'Talia Taylor',
    'Direktorin für digitales Marketing @ Quantum',
    NULL,
    '/images/bodhi-dymas.webp',
    0,
    true,
    'de'
  ),
  (
    'Talia Taylor',
    'Direktorin für digitales Marketing @ Quantum',
    NULL,
    '/images/bodhi-dymas.webp',
    1,
    true,
    'de'
  ),
  (
    'Talia Taylor',
    'Direktorin für digitales Marketing @ Quantum',
    NULL,
    '/images/bodhi-dymas.webp',
    2,
    true,
    'de'
  )
ON CONFLICT DO NOTHING;

-- ===================== TESTIMONIALS (German) =====================
INSERT INTO testimonials (author_name, author_role, author_company, content, rating, sort_order, is_active, locale) VALUES
  (
    'Talia Taylor',
    'Direktorin für digitales Marketing',
    'Quantum',
    'Globonexo hat unsere digitale Strategie komplett transformiert. Ihr Team lieferte eine skalierbare Plattform, die unsere Konversionsraten im ersten Quartal um 40% steigerte. Die Zusammenarbeit war von Anfang an nahtlos.',
    5,
    0,
    true,
    'de'
  ),
  (
    'Marcus Chen',
    'VP Engineering',
    'Nexora',
    'Die Zusammenarbeit mit Globonexo war ein Wendepunkt für unser Engineering-Team. Sie stellten erstklassige Talente bereit, die sich perfekt in unsere Arbeitsabläufe integrierten und uns halfen, kritische Features vor dem Zeitplan zu liefern.',
    5,
    1,
    true,
    'de'
  ),
  (
    'Sarah Mitchell',
    'COO',
    'Verdant Systems',
    'Die KI-gestützten Lösungen von Globonexo reduzierten unsere Betriebskosten um 35%. Ihr pragmatischer Ansatz zur Automatisierung bedeutete, dass wir echte Ergebnisse ohne unnötige Komplexität sahen.',
    5,
    2,
    true,
    'de'
  )
ON CONFLICT DO NOTHING;

-- ===================== FAQS (German) =====================
INSERT INTO faqs (question, answer, sort_order, is_active, locale) VALUES
  (
    'Welche Dienstleistungen bietet Globonexo an?',
    'Wir bieten IT-Beratung, Produktentwicklung, Team-Verstärkung und KI-gesteuerte Automatisierungslösungen. Unsere Dienstleistungen umfassen Web- und Mobile-Entwicklung, Cloud-Architektur und digitale Transformation.',
    0,
    true,
    'de'
  ),
  (
    'Wie stellt Globonexo die Projektqualität sicher?',
    'Wir folgen branchenüblichen Methoden mit rigorosen Code-Reviews, automatisierten Tests und kontinuierlicher Integration. Unsere Teams pflegen transparente Kommunikation und regelmäßige Fortschrittsupdates während jedes Engagements.',
    1,
    true,
    'de'
  ),
  (
    'Auf welche Branchen sind Sie spezialisiert?',
    'Wir arbeiten in den Bereichen Fintech, Gesundheitswesen, E-Commerce, SaaS und Enterprise. Unsere vielfältige Erfahrung ermöglicht es uns, branchenübergreifende Erkenntnisse und Best Practices in jedes Projekt einzubringen.',
    2,
    true,
    'de'
  ),
  (
    'Wie schnell können Sie ein Entwicklungsteam skalieren?',
    'Wir können qualifizierte Fachkräfte innerhalb von 1-2 Wochen einarbeiten, abhängig von den Rollenanforderungen. Unser Talentpool in Indien und Osteuropa stellt sicher, dass wir die richtige Besetzung für Ihre Projektanforderungen finden.',
    3,
    true,
    'de'
  ),
  (
    'Welche Engagement-Modelle bieten Sie an?',
    'Wir bieten flexible Modelle einschließlich dedizierter Teams, Time & Materials und Festpreis-Engagements. Jedes Modell ist darauf ausgelegt, Ihnen volle Transparenz, vorhersehbare Kosten und die Möglichkeit zur Skalierung zu bieten.',
    4,
    true,
    'de'
  )
ON CONFLICT DO NOTHING;

-- ===================== HERO SECTIONS (German) =====================
INSERT INTO hero_sections (page_key, section_key, title, subtitle, description, cta_text, cta_link, extra_data, sort_order, is_active, locale) VALUES
  -- Home: Main hero
  (
    'home', 'hero',
    'Internationaler IT- & KI-Experten-Hub für Ihren universellen Erfolg',
    NULL,
    'Globonexo ist ein internationales IT-Beratungsunternehmen, das europäischen Unternehmen hilft, durch KI-gesteuerte Technologien und starke Engineering-Expertise zu wachsen. Wir arbeiten eng mit Organisationen zusammen, um intelligente, effiziente und zukunftsfähige Systeme zu entwickeln, die KI, Automatisierung und moderne IT-Praktiken nutzen, um echte Geschäftsergebnisse und langfristiges Wachstum zu erzielen.',
    'Mitmachen',
    '/join',
    '{"cta2_text": "Beratung vereinbaren", "cta2_link": "/consultation"}',
    0,
    true,
    'de'
  ),

  -- Home: Services section header
  (
    'home', 'services',
    'Was bieten wir an?',
    'Bei Globonexo liefern wir IT-Dienstleistungen, die auf Leistung, Zuverlässigkeit und Skalierbarkeit ausgelegt sind. Unsere Berater arbeiten eng mit Kunden zusammen, um KI dort zu integrieren, wo sie messbare geschäftliche Auswirkungen erzielt.',
    NULL,
    NULL,
    NULL,
    NULL,
    1,
    true,
    'de'
  ),

  -- Home: Features section
  (
    'home', 'features',
    'Die besten IT-Lösungen seit 2015',
    NULL,
    'Bei Globonexo setzen wir innovative IT-Lösungen um, die auf die Evolution, Anpassung und das Wachstum Ihres Unternehmens ausgerichtet sind.',
    'Jetzt beitreten',
    '#',
    '{"body2": "Unser Fokus auf Qualität, Effizienz und langfristige Partnerschaften stellt sicher, dass jedes Projekt greifbare Ergebnisse und nachhaltigen Erfolg liefert.", "stats": [{"value": "9", "label": "Länder"}, {"value": "3", "label": "Kontinente"}, {"value": "320", "label": "IT-Talente in unserem Pool"}, {"value": "15", "label": "Branchen"}]}',
    2,
    true,
    'de'
  ),

  -- Home: Why Choose section
  (
    'home', 'why-choose',
    'Warum unsere Kunden Globonexo wählen',
    'Wir ermöglichen nahtlose Zusammenarbeit durch den Einsatz von KI-gesteuerten Tools, intelligenter Automatisierung und modernen IT-Architekturen. Unser Fokus auf Qualität, Innovation und langfristigen Wert hilft Unternehmen, schnellere Entscheidungen, verbesserte Effizienz und stärkere Wettbewerbspositionierung zu erreichen.',
    NULL,
    NULL,
    NULL,
    '{"cards": [{"title": "Bewährte technische Expertise", "description": "Unser Team bringt solide Engineering-Grundlagen und praktische Erfahrung in Beratung, Produktentwicklung und Team-Verstärkung mit. Wir konzentrieren uns auf Lösungen, die in realen Geschäftsumgebungen funktionieren."}, {"title": "Globale Talente, lokale Ausrichtung", "description": "Wir bieten Zugang zu qualifizierten Fachkräften aus Indien und Osteuropa, die im Einklang mit Ihrem Geschäftskontext arbeiten und reibungslose Zusammenarbeit, klare Kommunikation und zuverlässige Ausführung gewährleisten."}, {"title": "Kosteneffiziente Umsetzung", "description": "Unsere Liefermodelle helfen, Kosten zu optimieren, ohne Kompromisse bei Qualität, Sicherheit oder Zeitplänen einzugehen, und bieten Ihnen vorhersehbare Ergebnisse und bessere Kontrolle über IT-Ausgaben."}, {"title": "Flexibilität und Skalierbarkeit", "description": "Skalieren Sie Teams und Dienstleistungen basierend auf Ihren Projektanforderungen, ob kurzfristige Unterstützung oder langfristige Zusammenarbeit, mit voller Transparenz und Kontrolle."}, {"title": "Praktischer Einsatz von Automatisierung & KI", "description": "Wir setzen Automatisierung und KI gezielt dort ein, wo sie Effizienz, Genauigkeit oder Entscheidungsfindung verbessern, mit Fokus auf messbare Auswirkungen statt Experimente."}]}',
    3,
    true,
    'de'
  ),

  -- Home: Testimonials section header
  (
    'home', 'testimonials',
    'Kundenstimmen',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    4,
    true,
    'de'
  ),

  -- Home: FAQ section header
  (
    'home', 'faq',
    'Häufig gestellte Fragen',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    5,
    true,
    'de'
  ),

  -- Home: Contact section header
  (
    'home', 'contact',
    'Kontaktieren Sie uns für Fragen',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    6,
    true,
    'de'
  ),

  -- Home: Global Presence section
  (
    'home', 'global-presence',
    'Globale Präsenz',
    NULL,
    NULL,
    NULL,
    NULL,
    '{"map_image": "/images/map.webp"}',
    7,
    true,
    'de'
  ),

  -- About: Hero
  (
    'about', 'hero',
    'Über uns',
    'Die beste IT-Lösung seit 2015',
    'Bei Globonexo setzen wir innovative IT-Lösungen um, die auf die Evolution, Anpassung und das Wachstum Ihres Unternehmens ausgerichtet sind.',
    'Jetzt beitreten',
    '#',
    '{"body2": "Bei Globonexo implementieren wir innovative IT-Lösungen mit Fokus auf die Evolution, Anpassung und das Wachstum Ihres Unternehmens. Von Outstaffing und Produktentwicklung bis hin zu KI-gesteuerter Automatisierung liefern wir maßgeschneiderte Technologie, die mit Ihren Ambitionen wächst.", "illustration": "/images/about-illustration.webp"}',
    0,
    true,
    'de'
  ),

  -- About: Journey section
  (
    'about', 'journey',
    'Die Reise und Geschichte des Unternehmens',
    NULL,
    NULL,
    NULL,
    NULL,
    '{"paragraphs": ["Globonexo entstand aus einer gemeinsamen Vision zweier leidenschaftlicher Unternehmer in Warschau, Polen. Nach unzähligen Diskussionen, intensiver Recherche und der Nutzung unserer internationalen Erfahrung und Expertise erkannten wir einen wachsenden Bedarf – Unternehmen in Europa und den USA benötigten qualifizierte IT-Talente, um Innovation voranzutreiben, aber der Zugang zu Top-Entwicklern war oft durch lokale Verfügbarkeit und hohe Kosten begrenzt.", "Diese Erkenntnis veranlasste uns, Globonexo zu gründen: ein Unternehmen, das Unternehmen durch strategische Outstaffing-Lösungen mit globalen IT-Talenten verbindet. Von Anfang an war unser Ziel, die Lücke zwischen Unternehmen und talentierten Ingenieuren mit Hilfe der Entwicklungsdienste unserer indischen, polnischen, ukrainischen und moldawischen Zentren mit hochwertigen Dienstleistern zu schließen.", "Was als Idee in Brainstorming-Sitzungen in Warschau begann, ist zu einem Unternehmen gewachsen, das Kunden aus verschiedenen Branchen wie Automobil, Fintech, Gesundheitswesen und Fertigung bedient.", "Unsere Geschichte bei Globonexo ist die von Zusammenarbeit, Wachstum und globaler Vernetzung. Wir glauben, dass Innovation keine Grenzen kennt, und indem wir Unternehmen mit den richtigen Talenten stärken, helfen wir ihnen, neue Möglichkeiten zu erschließen und zu neuen Höhen aufzusteigen.", "Dies ist erst der Anfang – und wir freuen uns darauf, gemeinsam mit unseren Kunden, Partnern und unserem engagierten Team von Entwicklern weltweit zu wachsen."]}',
    1,
    true,
    'de'
  ),

  -- About: Executives section
  (
    'about', 'executives',
    'Biographien und Fotos der wichtigsten Führungskräfte',
    'Lernen Sie die talentierten Persönlichkeiten kennen, die unser Unternehmen mit ihrer Expertise und Hingabe vorantreiben.',
    NULL,
    NULL,
    NULL,
    NULL,
    2,
    true,
    'de'
  ),

  -- Services: Hero
  (
    'services', 'hero',
    'Software-Testing',
    NULL,
    'Stellen Sie einwandfreie Leistung mit unseren umfassenden Software-Testlösungen sicher.',
    NULL,
    NULL,
    NULL,
    0,
    true,
    'de'
  ),

  -- Services: End-to-End section
  (
    'services', 'end-to-end',
    'End-to-End Software-Testlösungen',
    NULL,
    'Unsere umfassenden Testdienstleistungen decken jeden Aspekt Ihres Software-Entwicklungslebenszyklus ab. Von Unit-Tests bis hin zu Integrationstests stellen wir sicher, dass Ihre Anwendungen unter allen Bedingungen einwandfrei funktionieren.',
    'Loslegen',
    '#',
    '{"body2": "Wir setzen branchenführende Methoden und Tools ein, um Fehler zu identifizieren und zu beseitigen, bevor sie Ihre Nutzer erreichen, und sparen Ihnen Zeit und Ressourcen bei gleichzeitiger Einhaltung höchster Qualitätsstandards.", "illustration": "/images/first_illustration.webp"}',
    1,
    true,
    'de'
  ),

  -- Services: Automated testing (left illustration)
  (
    'services', 'automated-left',
    'Automatisiertes Testen für Continuous Delivery',
    NULL,
    'Unsere umfassenden Testdienstleistungen decken jeden Aspekt Ihres Software-Entwicklungslebenszyklus ab. Von Unit-Tests bis hin zu Integrationstests stellen wir sicher, dass Ihre Anwendungen unter allen Bedingungen einwandfrei funktionieren.',
    'Jetzt erfahren',
    '#',
    '{"body2": "Wir setzen branchenführende Methoden und Tools ein, um Fehler zu identifizieren und zu beseitigen, bevor sie Ihre Nutzer erreichen, und sparen Ihnen Zeit und Ressourcen bei gleichzeitiger Einhaltung höchster Qualitätsstandards.", "illustration": "/images/second_illustration.webp"}',
    2,
    true,
    'de'
  ),

  -- Services: Automated testing (right illustration)
  (
    'services', 'automated-right',
    'Automatisiertes Testen für Continuous Delivery',
    NULL,
    'Beschleunigen Sie Ihre Release-Zyklen mit unseren automatisierten Testlösungen. Wir erstellen robuste Test-Suiten, die sich nahtlos in Ihre CI/CD-Pipeline integrieren und schnellere und zuverlässigere Bereitstellungen ermöglichen.',
    'Jetzt erfahren',
    '#',
    '{"body2": "Unsere Automatisierungsexperten arbeiten mit führenden Frameworks wie Selenium, Cypress und Playwright, um wartbare und skalierbare Testautomatisierung zu erstellen, die mit Ihrer Anwendung wächst.", "illustration": "/images/third_illustration.webp"}',
    3,
    true,
    'de'
  ),

  -- Blogs: Hero
  (
    'blogs', 'hero',
    'Unser Blog',
    'Einblicke, Tutorials und Updates vom Globonexo-Team.',
    NULL,
    NULL,
    NULL,
    NULL,
    0,
    true,
    'de'
  ),

  -- Global Presence: Hero
  (
    'global-presence', 'hero',
    'Globale Präsenz',
    NULL,
    'Entdecken Sie unseren internationalen Fußabdruck in Europa, Indien und Nordamerika.',
    NULL,
    NULL,
    '{"map_image": "/images/map.webp"}',
    0,
    true,
    'de'
  )
ON CONFLICT (page_key, section_key, locale) DO NOTHING;
