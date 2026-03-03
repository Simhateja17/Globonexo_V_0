-- ============================================================
-- Globonexo CMS Seed Data
-- Populates CMS tables with existing hardcoded content
-- ============================================================

-- ===================== SERVICES =====================
INSERT INTO services (title, description, icon, sort_order, is_active) VALUES
  (
    'Outstanding Standing solutions',
    'Expertise in staff augmentation, dedicated teams, EOR (Employer of Record), and PEO (Professional Employer Organization) models.',
    '/images/services/laptop.png',
    0,
    true
  ),
  (
    'Custom Solutions for Unique Needs',
    'Bespoke IT and software solutions designed to address specific challenges and goals. Emphasis on scalability, innovation, and alignment with business strategies.',
    '/images/services/bars-chart.png',
    1,
    true
  ),
  (
    'Software Testing Services',
    'Comprehensive QA and testing services to ensure robust, high-performance, and error-free software. Specialized in manual, automated, and performance testing for diverse industries.',
    '/images/services/building.png',
    2,
    true
  ),
  (
    'Cost Efficiency',
    'Save on recruitment and operational costs without compromising on quality.',
    '/images/services/terminal.png',
    3,
    true
  )
ON CONFLICT DO NOTHING;

-- ===================== TEAM MEMBERS =====================
INSERT INTO team_members (name, role, bio, photo_url, sort_order, is_active) VALUES
  (
    'Talia Taylor',
    'Digital Marketing Director @ Quantum',
    NULL,
    '/images/bodhi-dymas.webp',
    0,
    true
  ),
  (
    'Talia Taylor',
    'Digital Marketing Director @ Quantum',
    NULL,
    '/images/bodhi-dymas.webp',
    1,
    true
  ),
  (
    'Talia Taylor',
    'Digital Marketing Director @ Quantum',
    NULL,
    '/images/bodhi-dymas.webp',
    2,
    true
  )
ON CONFLICT DO NOTHING;

-- ===================== TESTIMONIALS =====================
INSERT INTO testimonials (author_name, author_role, author_company, content, rating, sort_order, is_active) VALUES
  (
    'Talia Taylor',
    'Digital Marketing Director',
    'Quantum',
    'Globonexo transformed our digital strategy completely. Their team delivered a scalable platform that increased our conversion rates by 40% within the first quarter. The collaboration was seamless from day one.',
    5,
    0,
    true
  ),
  (
    'Marcus Chen',
    'VP of Engineering',
    'Nexora',
    'Working with Globonexo has been a game-changer for our engineering team. They provided top-tier talent that integrated perfectly with our workflows and helped us ship critical features ahead of schedule.',
    5,
    1,
    true
  ),
  (
    'Sarah Mitchell',
    'COO',
    'Verdant Systems',
    'The AI-driven solutions Globonexo implemented reduced our operational costs by 35%. Their practical approach to automation meant we saw real results without unnecessary complexity.',
    5,
    2,
    true
  )
ON CONFLICT DO NOTHING;

-- ===================== FAQS =====================
INSERT INTO faqs (question, answer, sort_order, is_active) VALUES
  (
    'What services does Globonexo offer?',
    'We provide IT consulting, product development, team augmentation, and AI-driven automation solutions. Our services span across web and mobile development, cloud architecture, and digital transformation.',
    0,
    true
  ),
  (
    'How does Globonexo ensure project quality?',
    'We follow industry-standard methodologies with rigorous code reviews, automated testing, and continuous integration. Our teams maintain transparent communication and regular progress updates throughout every engagement.',
    1,
    true
  ),
  (
    'What industries do you specialize in?',
    'We work across fintech, healthcare, e-commerce, SaaS, and enterprise sectors. Our diverse experience allows us to bring cross-industry insights and best practices to every project.',
    2,
    true
  ),
  (
    'How quickly can you scale a development team?',
    'We can onboard skilled professionals within 1-2 weeks depending on the role requirements. Our talent pool across India and Eastern Europe ensures we find the right fit for your project needs.',
    3,
    true
  ),
  (
    'What engagement models do you offer?',
    'We offer flexible models including dedicated teams, time & materials, and fixed-price engagements. Each model is designed to give you full transparency, predictable costs, and the ability to scale as needed.',
    4,
    true
  )
ON CONFLICT DO NOTHING;

-- ===================== HERO SECTIONS =====================

-- Home: Main hero
INSERT INTO hero_sections (page_key, section_key, title, subtitle, description, cta_text, cta_link, extra_data, sort_order, is_active) VALUES
  (
    'home', 'hero',
    'International IT & AI Expert Hub For Your Universal Success',
    NULL,
    'Globonexo is an international IT consulting company that helps European businesses grow through AI-driven technologies and strong engineering expertise. We partner closely with organisations to build intelligent, efficient, and future-ready systems, using AI, automation, and modern IT practices to drive real business results and long-term growth.',
    'Join Us',
    '/join',
    '{"cta2_text": "Schedule a Consultation", "cta2_link": "/consultation"}',
    0,
    true
  ),

  -- Home: Services section header
  (
    'home', 'services',
    'What are we offering?',
    'At Globonexo, we deliver IT services designed to improve performance, reliability, and scalability. Our consultants collaborate closely with clients to integrate AI where it creates measurable business impact.',
    NULL,
    NULL,
    NULL,
    NULL,
    1,
    true
  ),

  -- Home: Features section
  (
    'home', 'features',
    'The Best IT Solutions Since 2015',
    NULL,
    'At Globonexo, we implement innovative IT solutions focused on the evolution, adaptation, and growth of your business.',
    'Join Now',
    '#',
    '{"body2": "Our emphasis on quality, efficiency, and long-term partnerships ensures that every project delivers tangible results and lasting success.", "stats": [{"value": "9", "label": "Countries"}, {"value": "3", "label": "Continents"}, {"value": "320", "label": "IT talents in our pool"}, {"value": "15", "label": "Industries"}]}',
    2,
    true
  ),

  -- Home: Why Choose section
  (
    'home', 'why-choose',
    'Why our clients choose Globonexo',
    'We enable seamless collaboration by applying AI-driven tools, intelligent automation, and modern IT architectures. Our focus on quality, innovation, and long-term value helps businesses achieve faster decision-making, improved efficiency, and stronger competitive positioning.',
    NULL,
    NULL,
    NULL,
    '{"cards": [{"title": "Proven Technical Expertise", "description": "Our team brings strong engineering foundations and hands-on experience across consulting, product development, and team augmentation. We focus on building solutions that work in real business environments."}, {"title": "Global Talent, Local Alignment", "description": "We provide access to skilled professionals from India and Eastern Europe who work in sync with your business context, ensuring smooth collaboration, clear communication, and reliable execution."}, {"title": "Cost - Effective Delivery", "description": "Our delivery models help optimize costs without compromising on quality, security, or timelines, giving you predictable outcomes and better control over IT spend."}, {"title": "Flexibility and Scalability", "description": "Scale teams and services based on your project needs, whether short-term support or long-term collaboration, with full transparency and control."}, {"title": "Practical Use of Automation & AI", "description": "We apply automation and AI selectively where they improve efficiency, accuracy, or decision-making, focusing on measurable impact rather than experimentation."}]}',
    3,
    true
  ),

  -- Home: Testimonials section header
  (
    'home', 'testimonials',
    'Customer Testimonials',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    4,
    true
  ),

  -- Home: FAQ section header
  (
    'home', 'faq',
    'Frequently Asked Questions',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    5,
    true
  ),

  -- Home: Contact section header
  (
    'home', 'contact',
    'Contact Us for any questions',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    6,
    true
  ),

  -- Home: Global Presence section
  (
    'home', 'global-presence',
    'Global Presence',
    NULL,
    NULL,
    NULL,
    NULL,
    '{"map_image": "/images/map.webp"}',
    7,
    true
  ),

  -- About: Hero
  (
    'about', 'hero',
    'About us',
    'The best IT solution since 2015',
    'Although, final stages of the internal network gives a complete experience of The Parameter of Speculative Environment',
    'Join Now',
    '#',
    '{"body2": "At Globonexo, we implement innovative IT solutions focused on the evolution, adaptation, and growth of your business. From outstaffing and product development to AI-driven automation, we deliver custom technology that scales with your ambitions.", "illustration": "/images/about-illustration.webp"}',
    0,
    true
  ),

  -- About: Journey section
  (
    'about', 'journey',
    'The journey and Background of the Company',
    NULL,
    NULL,
    NULL,
    NULL,
    '{"paragraphs": ["Globonexo was born out of a shared vision between two passionate entrepreneurs in Warsaw, Poland. After countless discussions, deep research, and leveraging our international experience and expertise, we recognised a growing need – businesses across Europe and the U.S. required skilled IT talent to drive innovation, but access to top developers was often limited by local availability and high costs.", "This insight prompted us to start Globonexo: a company that unites businesses with global IT talent through strategic outstaffing solutions. From its very beginning, our goal was to bridge the gap between companies and talented engineers with the help of the development services from our Indian, Polish, Ukrainian, and Moldovan centres with high-quality service providers.", "Starting as an idea over brainstorming sessions in Warsaw, the company has grown into a firm serving clients from various industries such as automotive, fintech, healthcare, and manufacturing.", "Our story at Globonexo is that of collaboration, growth, and global connectivity. We believe that innovation knows no borders, and by empowering companies with the right talent, we help them unlock new possibilities and scale to greater heights.", "This is just the beginning – and we are excited to grow alongside our clients, partners, and dedicated team of developers worldwide."]}',
    1,
    true
  ),

  -- About: Executives section
  (
    'about', 'executives',
    'Bios and photos of key executives and managers',
    'Meet the talented individuals who drive our company forward with their expertise and dedication.',
    NULL,
    NULL,
    NULL,
    NULL,
    2,
    true
  ),

  -- Services: Hero
  (
    'services', 'hero',
    'Software Testing',
    NULL,
    'Ensure flawless performance with our comprehensive software testing solutions.',
    NULL,
    NULL,
    NULL,
    0,
    true
  ),

  -- Services: End-to-End section
  (
    'services', 'end-to-end',
    'End-to-End Software Testing Solutions',
    NULL,
    'Our comprehensive testing services cover every aspect of your software development lifecycle. From unit testing to integration testing, we ensure your applications perform flawlessly under all conditions.',
    'Get Started',
    '#',
    '{"body2": "We employ industry-leading methodologies and tools to identify and eliminate bugs before they reach your users, saving you time and resources while maintaining the highest quality standards.", "illustration": "/images/first_illustration.webp"}',
    1,
    true
  ),

  -- Services: Automated testing (left illustration)
  (
    'services', 'automated-left',
    'Automated Testing for Continuous Delivery',
    NULL,
    'Our comprehensive testing services cover every aspect of your software development lifecycle. From unit testing to integration testing, we ensure your applications perform flawlessly under all conditions.',
    'Learn Now',
    '#',
    '{"body2": "We employ industry-leading methodologies and tools to identify and eliminate bugs before they reach your users, saving you time and resources while maintaining the highest quality standards.", "illustration": "/images/second_illustration.webp"}',
    2,
    true
  ),

  -- Services: Automated testing (right illustration)
  (
    'services', 'automated-right',
    'Automated Testing for Continuous Delivery',
    NULL,
    'Accelerate your release cycles with our automated testing solutions. We build robust test suites that integrate seamlessly with your CI/CD pipeline, enabling faster and more reliable deployments.',
    'Learn Now',
    '#',
    '{"body2": "Our automation experts work with leading frameworks like Selenium, Cypress, and Playwright to create maintainable and scalable test automation that grows with your application.", "illustration": "/images/third_illustration.webp"}',
    3,
    true
  ),

  -- Blogs: Hero
  (
    'blogs', 'hero',
    'Our Blog',
    'Insights, tutorials, and updates from the Globonexo team.',
    NULL,
    NULL,
    NULL,
    NULL,
    0,
    true
  ),

  -- Global Presence: Hero
  (
    'global-presence', 'hero',
    'Global Presence',
    NULL,
    'Explore our international footprint across Europe, India, and North America.',
    NULL,
    NULL,
    '{"map_image": "/images/map.webp"}',
    0,
    true
  )
ON CONFLICT (page_key, section_key) DO NOTHING;

-- ===================== UPDATE SITE SETTINGS =====================
-- Update with actual company data from the hardcoded contact section
UPDATE site_settings
SET value = '{"name": "Globonexo", "tagline": "International IT & AI Expert Hub For Your Universal Success", "email": "contact.global@globonexo.com", "phone": "+49 711 123456", "address": "Headquarters: Koenigstr. 10c, 70173 Stuttgart, Germany"}'
WHERE key = 'company';
