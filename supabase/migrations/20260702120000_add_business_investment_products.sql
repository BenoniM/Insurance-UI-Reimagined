-- Adds Business Insurance and Investment Insurance to the products table.
-- Adjust sort_order to place them where you want in the grid (here: after
-- the existing four, so 5 and 6 — check your current max sort_order first).

insert into products (
  slug, name, name_am, icon, active, sort_order,
  short_description, short_description_am,
  full_description, full_description_am,
  coverage_list, exclusions, pricing_rules, cta_text
)
values
(
  'business-insurance',
  'Business Insurance',
  'የንግድ ኢንሹራንስ',
  'Briefcase',
  true,
  5,
  'Protect your premises, stock, and staff with coverage built for Ethiopian businesses.',
  'ንብረትዎን፣ ዕቃዎችን እና ሠራተኞችን ይጠብቁ።',
  'Protect your company''s assets, income, and people with coverage built for Ethiopian businesses — from small retail shops to manufacturing operations. One policy safeguards your premises, stock, equipment, and liability exposure so an unexpected event doesn''t become a business-ending one.',
  'ንብረትዎን፣ ገቢዎን እና ሠራተኞችዎን ከአደጋ ይጠብቁ። ይህ ፖሊሲ ቤትዎን፣ ዕቃዎችን እና የተጠያቂነት ተጋላጭነትን ይሸፍናል።',
  '[
    "Building and premises damage (fire, lightning, explosion)",
    "Stock and inventory loss",
    "Machinery and equipment breakdown",
    "Business interruption and loss of income",
    "Public and product liability",
    "Employer''s liability for staff injury",
    "Burglary and theft (forced entry)",
    "Money in transit and in safe",
    "Fidelity guarantee (employee dishonesty)",
    "Goods in transit",
    "Cyber liability (optional add-on)",
    "Professional indemnity (optional add-on)"
  ]'::jsonb,
  '[
    "War, invasion, and terrorism",
    "Intentional damage by the insured or staff",
    "Gradual wear, tear, and depreciation",
    "Assets not declared on the schedule",
    "Trading losses unrelated to an insured event",
    "Nuclear risk and radioactive contamination",
    "Fines, penalties, and contractual liabilities",
    "Losses from unlicensed or illegal business activity"
  ]'::jsonb,
  '{"base_rate": 18000}'::jsonb,
  'Get Your Business Covered'
),
(
  'investment-insurance',
  'Investment Insurance',
  'የመዋዕለ ንዋይ ኢንሹራንስ',
  'Plane',
  true,
  6,
  'Grow your savings while staying protected with combined investment and life cover.',
  'ገንዘብዎን በሚያድግበት ጊዜ ጥበቃ ያግኙ።',
  'Grow your savings and protect your family in a single plan. Investment Insurance combines disciplined long-term savings with life cover, so your money works toward your goals — education, a home, retirement — while your loved ones stay financially protected along the way.',
  'ገንዘብዎን በሚያሳድጉበት ጊዜ ቤተሰብዎን ይጠብቁ። ይህ ፖሊሲ የቁጠባ እድገትን ከሕይወት ሽፋን ጋር ያዋህዳል።',
  '[
    "Guaranteed maturity/lump-sum benefit",
    "Life cover throughout the policy term",
    "Annual bonus / profit participation",
    "Flexible premium terms (monthly, quarterly, annual)",
    "Choice of savings term (5, 10, 15, 20 years)",
    "Partial withdrawal after minimum lock-in period",
    "Loan against policy value",
    "Waiver of premium on disability (optional rider)",
    "Critical illness rider (optional)",
    "Tax-advantaged long-term savings",
    "Nominee/beneficiary designation"
  ]'::jsonb,
  '[
    "Suicide within the first policy year",
    "Non-disclosure or misrepresentation of material facts",
    "Death due to war or terrorism (unless rider purchased)",
    "Early surrender charges apply before lock-in period ends",
    "Pre-existing medical conditions not disclosed at inception",
    "Death while engaged in illegal activity",
    "Losses from investment market fluctuations beyond guaranteed portion"
  ]'::jsonb,
  '{"base_rate": 9500}'::jsonb,
  'Start Investing Today'
);