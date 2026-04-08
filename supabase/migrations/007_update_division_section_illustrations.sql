-- ============================================================
-- Replace division section illustrations with per-section SVGs
-- Pages: consulting, solutions, talent-pool, defense, research, advertising
-- Sections: end-to-end, automated-left, automated-right
-- Locales: en, de
-- ============================================================

WITH illustration_map AS (
  SELECT * FROM (
    VALUES
      ('consulting', 'end-to-end', '/images/divisions/consulting-end-to-end.svg'),
      ('consulting', 'automated-left', '/images/divisions/consulting-automated-left.svg'),
      ('consulting', 'automated-right', '/images/divisions/consulting-automated-right.svg'),

      ('solutions', 'end-to-end', '/images/divisions/solutions-end-to-end.svg'),
      ('solutions', 'automated-left', '/images/divisions/solutions-automated-left.svg'),
      ('solutions', 'automated-right', '/images/divisions/solutions-automated-right.svg'),

      ('talent-pool', 'end-to-end', '/images/divisions/talent-pool-end-to-end.svg'),
      ('talent-pool', 'automated-left', '/images/divisions/talent-pool-automated-left.svg'),
      ('talent-pool', 'automated-right', '/images/divisions/talent-pool-automated-right.svg'),

      ('defense', 'end-to-end', '/images/divisions/defense-end-to-end.svg'),
      ('defense', 'automated-left', '/images/divisions/defense-automated-left.svg'),
      ('defense', 'automated-right', '/images/divisions/defense-automated-right.svg'),

      ('research', 'end-to-end', '/images/divisions/research-end-to-end.svg'),
      ('research', 'automated-left', '/images/divisions/research-automated-left.svg'),
      ('research', 'automated-right', '/images/divisions/research-automated-right.svg'),

      ('advertising', 'end-to-end', '/images/divisions/advertising-end-to-end.svg'),
      ('advertising', 'automated-left', '/images/divisions/advertising-automated-left.svg'),
      ('advertising', 'automated-right', '/images/divisions/advertising-automated-right.svg')
  ) AS t(page_key, section_key, illustration_path)
)
UPDATE hero_sections h
SET extra_data = jsonb_set(
  COALESCE(h.extra_data, '{}'::jsonb),
  '{illustration}',
  to_jsonb(m.illustration_path),
  true
)
FROM illustration_map m
WHERE h.page_key = m.page_key
  AND h.section_key = m.section_key
  AND h.locale IN ('en', 'de');
