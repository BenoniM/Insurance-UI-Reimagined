// Local product data — replaces the Supabase "products" table.
// To add/edit a product, just edit this array. No database involved.

export interface Product {
  slug: string;
  name: string;
  name_am: string;
  icon: "Heart" | "Car" | "Home" | "Shield" | "Briefcase" | "Plane";
  active: boolean;
  sort_order: number;
  short_description: string;
  short_description_am: string;
  full_description: string;
  full_description_am: string;
  coverage_list: string[];
  exclusions: string[];
  pricing_rules: { base_rate: number };
  cta_text: string;
}

export const products: Product[] = [
  {
    slug: "life-insurance",
    name: "Life Insurance",
    name_am: "የህይወት ኢንሹራንስ",
    icon: "Heart",
    active: true,
    sort_order: 1,
    short_description: "Comprehensive life insurance plans that fit your needs and budget.",
    short_description_am: "የቤተሰብዎን የወደፊት ሕይወት የሚጠብቅ አጠቃላይ የህይወት ኢንሹራንስ።",
    full_description:
      "Protect your family future with our comprehensive life insurance plans. Whether you are looking for term life, whole life, or endowment policies, WASS Insurance has a plan that fits your needs and budget.",
    full_description_am:
      "የቤተሰብዎን የወደፊት ሕይወት በአጠቃላይ የህይወት ኢንሹራንስ ፕላናችን ይጠብቁ። የቃል ህይወት፣ ሙሉ ህይወት ወይም ኢንዳውመንት ፖሊሲዎችን ቢፈልጉ፣ ዋስ ኢንሹራንስ ለፍላጎትዎ እና በጀትዎ የሚስማማ እቅድ አለው።",
    coverage_list: [
      "Death benefit payout",
      "Terminal illness cover",
      "Accidental death benefit",
      "Premium waiver on disability",
      "Savings & investment component",
      "Family income benefit",
    ],
    exclusions: [
      "Suicide within first 2 years",
      "Death from illegal activities",
      "Pre-existing undisclosed conditions",
    ],
    pricing_rules: { base_rate: 1800 },
    cta_text: "Get a Quote",
  },
  {
    slug: "health-insurance",
    name: "Health Insurance",
    name_am: "የጤና ኢንሹራንስ",
    icon: "Shield",
    active: true,
    sort_order: 2,
    short_description: "Quality healthcare coverage for hospitalization, outpatient care, and more.",
    short_description_am: "ለሆስፒታል፣ ለውጭ ታካሚ እንክብካቤ እና ሌሎችም ሽፋን።",
    full_description:
      "Access quality healthcare without financial worry. Our health insurance plans cover hospitalization, outpatient care, and specialist consultations at leading hospitals across Ethiopia.",
    full_description_am:
      "ያለ ገንዘብ ጭንቀት ጥራት ያለው የጤና እንክብካቤ ያግኙ። የጤና ኢንሹራንስ ፕላናችን በኢትዮጵያ ውስጥ ባሉ ግንባር ቀደም ሆስፒታሎች የሆስፒታል ክፍያ፣ የውጭ ታካሚ እንክብካቤ እና የስፔሻሊስት ምክክርን ይሸፍናል።",
    coverage_list: [
      "Hospitalization costs",
      "Outpatient care",
      "Surgical procedures",
      "Maternity cover",
      "Prescription medications",
      "Emergency evacuation",
    ],
    exclusions: [
      "Cosmetic procedures",
      "Pre-existing conditions (waiting period)",
      "Self-inflicted injuries",
    ],
    pricing_rules: { base_rate: 2400 },
    cta_text: "Get a Quote",
  },
  {
    slug: "motor-insurance",
    name: "Motor Insurance",
    name_am: "የመኪና ኢንሹራንስ",
    icon: "Car",
    active: true,
    sort_order: 3,
    short_description: "Comprehensive and third-party motor insurance for every vehicle.",
    short_description_am: "አጠቃላይ እና የሶስተኛ ወገን የመኪና ኢንሹራንስ።",
    full_description:
      "Comprehensive and third-party motor insurance for cars, trucks, and commercial vehicles. Drive with confidence knowing you are covered against accidents, theft, and liability.",
    full_description_am:
      "ለመኪናዎች፣ ለጭነት መኪናዎች እና ለንግድ ተሽከርካሪዎች አጠቃላይ እና የሶስተኛ ወገን የመኪና ኢንሹራንስ። ከአደጋዎች፣ ከስርቆት እና ከተጠያቂነት የተጠበቁ መሆንዎን በማወቅ በልበ ሙሉነት ይንዱ።",
    coverage_list: [
      "Accident damage repair",
      "Third-party liability",
      "Theft protection",
      "Fire damage",
      "Windscreen cover",
      "Personal accident for driver",
    ],
    exclusions: [
      "Unlicensed driving",
      "Driving under influence",
      "Mechanical breakdown",
    ],
    pricing_rules: { base_rate: 3500 },
    cta_text: "Get a Quote",
  },
  {
    slug: "property-insurance",
    name: "Property Insurance",
    name_am: "የንብረት ኢንሹራንስ",
    icon: "Home",
    active: true,
    sort_order: 4,
    short_description: "Flexible coverage for your home, office, or commercial property.",
    short_description_am: "ለቤትዎ፣ ለቢሮዎ ወይም ለንግድ ንብረትዎ ተለዋዋጭ ሽፋን።",
    full_description:
      "Safeguard your home, office, or commercial property against fire, flood, theft, and other unforeseen events. Flexible plans for residential and commercial properties.",
    full_description_am:
      "ቤትዎን፣ ቢሮዎን ወይም የንግድ ንብረትዎን ከእሳት፣ ከጎርፍ፣ ከስርቆት እና ካልተጠበቁ ክስተቶች ይጠብቁ። ለመኖሪያ እና ለንግድ ንብረቶች ተለዋዋጭ እቅዶች።",
    coverage_list: [
      "Fire and lightning",
      "Flood and water damage",
      "Theft and burglary",
      "Natural disasters",
      "Contents cover",
      "Loss of rent",
    ],
    exclusions: [
      "War and terrorism",
      "Nuclear risks",
      "Gradual deterioration",
    ],
    pricing_rules: { base_rate: 2000 },
    cta_text: "Get a Quote",
  },
  {
    slug: "business-insurance",
    name: "Business Insurance",
    name_am: "የንግድ ኢንሹራንስ",
    icon: "Briefcase",
    active: true,
    sort_order: 5,
    short_description: "Protect your premises, stock, and staff with coverage built for Ethiopian businesses.",
    short_description_am: "ንብረትዎን፣ ዕቃዎችን እና ሠራተኞችን ይጠብቁ።",
    full_description:
      "Protect your company's assets, income, and people with coverage built for Ethiopian businesses — from small retail shops to manufacturing operations. One policy safeguards your premises, stock, equipment, and liability exposure so an unexpected event doesn't become a business-ending one.",
    full_description_am:
      "ንብረትዎን፣ ገቢዎን እና ሠራተኞችዎን ከአደጋ ይጠብቁ። ይህ ፖሊሲ ቤትዎን፣ ዕቃዎችን እና የተጠያቂነት ተጋላጭነትን ይሸፍናል።",
    coverage_list: [
      "Building and premises damage (fire, lightning, explosion)",
      "Stock and inventory loss",
      "Machinery and equipment breakdown",
      "Business interruption and loss of income",
      "Public and product liability",
      "Employer's liability for staff injury",
      "Burglary and theft (forced entry)",
      "Money in transit and in safe",
    ],
    exclusions: [
      "War, invasion, and terrorism",
      "Intentional damage by the insured or staff",
      "Gradual wear, tear, and depreciation",
      "Assets not declared on the schedule",
      "Trading losses unrelated to an insured event",
      "Nuclear risk and radioactive contamination",
    ],
    pricing_rules: { base_rate: 18000 },
    cta_text: "Get Your Business Covered",
  },
  {
    slug: "investment-insurance",
    name: "Investment Insurance",
    name_am: "የመዋዕለ ንዋይ ኢንሹራንስ",
    icon: "Plane",
    active: true,
    sort_order: 6,
    short_description: "Grow your savings while staying protected with combined investment and life cover.",
    short_description_am: "ገንዘብዎን በሚያድግበት ጊዜ ጥበቃ ያግኙ።",
    full_description:
      "Grow your savings and protect your family in a single plan. Investment Insurance combines disciplined long-term savings with life cover, so your money works toward your goals — education, a home, retirement — while your loved ones stay financially protected along the way.",
    full_description_am:
      "ገንዘብዎን በሚያሳድጉበት ጊዜ ቤተሰብዎን ይጠብቁ። ይህ ፖሊሲ የቁጠባ እድገትን ከሕይወት ሽፋን ጋር ያዋህዳል።",
    coverage_list: [
      "Guaranteed maturity/lump-sum benefit",
      "Life cover throughout the policy term",
      "Annual bonus / profit participation",
      "Flexible premium terms (monthly, quarterly, annual)",
      "Choice of savings term (5, 10, 15, 20 years)",
      "Partial withdrawal after minimum lock-in period",
      "Loan against policy value",
      "Waiver of premium on disability (optional rider)",
    ],
    exclusions: [
      "Suicide within the first policy year",
      "Non-disclosure or misrepresentation of material facts",
      "Death due to war or terrorism (unless rider purchased)",
      "Early surrender charges apply before lock-in period ends",
      "Pre-existing medical conditions not disclosed at inception",
      "Death while engaged in illegal activity",
    ],
    pricing_rules: { base_rate: 9500 },
    cta_text: "Start Investing Today",
  },
];

export const getProductBySlug = (slug: string | undefined): Product | undefined =>
  products.find((p) => p.slug === slug && p.active);

export const getActiveProducts = (): Product[] =>
  products.filter((p) => p.active).sort((a, b) => a.sort_order - b.sort_order);