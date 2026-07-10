// Local product data — replaces the Supabase "products" table.
// Structure: Category -> Subcategory -> (optional) Sub-items.
// Every leaf (deepest level with no children) becomes a real Product page.

export interface Product {
  slug: string;
  name: string;
  name_am: string;
  icon: "Heart" | "Car" | "Home" | "Shield" | "Briefcase" | "Plane";
  active: boolean;
  sort_order: number;
  category: string;       // e.g. "General Insurance"
  category_slug: string;  // e.g. "general-insurance"
  subcategory: string;    // e.g. "Motor Insurance"
  subcategory_slug: string;
  short_description: string;
  short_description_am: string;
  full_description: string;
  full_description_am: string;
  coverage_list: string[];
  exclusions: string[];
  pricing_rules: { base_rate: number };
  cta_text: string;
}

// ─── Nav-facing category tree ──────────────────────────────────────────────
// This is what Navbar.tsx consumes to build the mega-menu.
// `href` always points at a real product page (`/products/:slug`).

export interface NavLeaf {
  label: string;
  label_am: string;
  href: string;
}

export interface NavSubcategory {
  label: string;
  label_am: string;
  href?: string;          // present if the subcategory has no children (it IS a leaf)
  children?: NavLeaf[];    // present if the subcategory has sub-subcategories
}

export interface NavCategory {
  label: string;
  label_am: string;
  slug: string;
  subcategories: NavSubcategory[];
}

// ─── Raw catalogue (source of truth) ───────────────────────────────────────
// Fill in name_am / descriptions / coverage / exclusions with real copy —
// placeholders below follow your existing tone so nothing renders empty.

type RawLeaf = Omit<
  Product,
  "active" | "sort_order" | "category" | "category_slug" | "subcategory" | "subcategory_slug"
>;

// NEW: children never carry their own icon — it's inherited from the subcategory.
// Only omit "icon" here (unlike sub.leaf, children DO need their own slug).
type RawChild = Omit<RawLeaf, "icon">;

interface RawSubcategory {
  name: string;
  name_am: string;
  slug: string;
  icon: Product["icon"];
  leaf?: Omit<RawLeaf, "slug" | "icon">;
  children?: RawChild[];   // ← was RawLeaf[]
}

interface RawCategory {
  name: string;
  name_am: string;
  slug: string;
  subcategories: RawSubcategory[];
}

const catalogue: RawCategory[] = [
  {
    name: "General Insurance",
    name_am: "አጠቃላይ ኢንሹራንስ",
    slug: "general-insurance",
    subcategories: [
      {
        name: "Motor Insurance",
        name_am: "የመኪና ኢንሹራንስ",
        slug: "motor-insurance",
        icon: "Car",
        children: [
          {
            slug: "motor-comprehensive",
            name: "Comprehensive Insurance",
            name_am: "አጠቃላይ ኢንሹራንስ",
            short_description: "Full cover for accidental damage, theft, and third-party liability in one policy.",
            short_description_am: "ከአደጋ፣ ከስርቆት እና ከሶስተኛ ወገን ተጠያቂነት የተሟላ ሽፋን።",
            full_description:
              "Our most complete motor policy — covering accidental damage to your own vehicle as well as third-party injury and property damage, fire, and theft. Built for private car owners who want to drive without worrying about the 'what ifs'.",
            full_description_am:
              "ለራስዎ ተሽከርካሪ ድንገተኛ ጉዳት እንዲሁም ለሶስተኛ ወገን ጉዳት፣ እሳት እና ስርቆት ሽፋን የሚሰጥ የተሟላ ፖሊሲ።",
            coverage_list: [
              "Own-damage accident repair",
              "Third-party injury and property damage",
              "Fire and theft",
              "Windscreen cover",
              "Personal accident for driver",
              "Towing after accident",
            ],
            exclusions: ["Unlicensed driving", "Driving under influence", "Mechanical breakdown", "Racing or reckless driving"],
            pricing_rules: { base_rate: 4200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "motor-third-party",
            name: "Third-Party Insurance",
            name_am: "የሶስተኛ ወገን ኢንሹራንስ",
            short_description: "The legally required minimum — covers injury and damage you cause to others.",
            short_description_am: "በህግ የሚያስፈልገው ዝቅተኛ ሽፋን — ለሌሎች የሚደርስ ጉዳት ይሸፍናል።",
            full_description:
              "The mandatory baseline cover for every vehicle on Ethiopian roads. Protects you financially if you injure someone or damage their property, without covering your own vehicle.",
            full_description_am:
              "በኢትዮጵያ መንገዶች ላይ ለሚንቀሳቀስ እያንዳንዱ ተሽከርካሪ የሚያስፈልግ የግዴታ መሰረታዊ ሽፋን።",
            coverage_list: ["Third-party bodily injury", "Third-party property damage", "Legal liability defense costs"],
            exclusions: ["Damage to your own vehicle", "Driving under influence", "Unlicensed driving"],
            pricing_rules: { base_rate: 1500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "motor-fleet",
            name: "Fleet Insurance",
            name_am: "የፍሊት ኢንሹራንስ",
            short_description: "Consolidated coverage for businesses running multiple vehicles under one policy.",
            short_description_am: "ብዙ ተሽከርካሪዎችን በአንድ ፖሊሲ ስር የሚያስተዳድር ሽፋን።",
            full_description:
              "One policy, one renewal date, one point of contact — for companies operating delivery vans, taxis, or corporate fleets. Volume-based pricing and dedicated claims support keep your vehicles on the road.",
            full_description_am:
              "ለማድረሻ ተሽከርካሪዎች፣ ታክሲዎች ወይም የድርጅት ፍሊት ለሚያንቀሳቅሱ ኩባንያዎች የተዘጋጀ አንድ ፖሊሲ።",
            coverage_list: [
              "Comprehensive and third-party options per vehicle",
              "Volume-based premium discounts",
              "Dedicated fleet claims handling",
              "Replacement vehicle provisions",
              "Driver personal accident cover",
            ],
            exclusions: ["Unlisted drivers", "Vehicles used outside declared purpose", "Unroadworthy vehicles"],
            pricing_rules: { base_rate: 3800 },
            cta_text: "Get Fleet Covered",
          },
        ],
      },
      {
        name: "Property Insurance",
        name_am: "የንብረት ኢንሹራንስ",
        slug: "property-insurance",
        icon: "Home",
        children: [
          {
            slug: "property-fire-allied-perils",
            name: "Fire & Allied Perils",
            name_am: "እሳት እና ተያያዥ አደጋዎች",
            short_description: "Protects buildings and contents against fire, lightning, explosion, and storm damage.",
            short_description_am: "ህንፃዎችን እና ይዘቶችን ከእሳት፣ ከመብረቅ እና ከማዕበል ጉዳት ይጠብቃል።",
            full_description:
              "Core property protection covering fire, lightning, explosion, storm, and related perils for homes, shops, and warehouses — the foundation every property owner should have in place.",
            full_description_am:
              "ለቤቶች፣ ለሱቆች እና ለመጋዘኖች ከእሳት፣ ከመብረቅ፣ ከፍንዳታ እና ተያያዥ አደጋዎች ጋር የተያያዘ መሰረታዊ የንብረት ጥበቃ።",
            coverage_list: ["Fire and lightning", "Explosion", "Storm and tempest", "Riot and strike damage", "Contents cover"],
            exclusions: ["War and terrorism", "Nuclear risks", "Gradual deterioration", "Undeclared assets"],
            pricing_rules: { base_rate: 2200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "property-industrial-all-risks",
            name: "Industrial All Risks",
            name_am: "የኢንዱስትሪ ሁሉንም አደጋዎች ሽፋን",
            short_description: "Broad 'all risks' protection for factories, plants, and industrial premises.",
            short_description_am: "ለፋብሪካዎች እና ለኢንዱስትሪ ግቢዎች ሰፊ ሽፋን።",
            full_description:
              "A single all-risks policy for industrial operations, covering physical loss or damage to buildings, plant, machinery, and stock — plus the business interruption that often follows.",
            full_description_am:
              "ለኢንዱስትሪ ስራዎች ህንፃዎችን፣ ማሽነሪዎችን እና ዕቃዎችን ከሚደርስ አካላዊ ኪሳራ ወይም ጉዳት የሚሸፍን ነጠላ ፖሊሲ።",
            coverage_list: [
              "Physical damage to buildings and plant",
              "Machinery and stock loss",
              "Business interruption",
              "Debris removal",
              "Architects' and surveyors' fees",
            ],
            exclusions: ["War and terrorism", "Wear and tear", "Design defects", "Uninsured perils not scheduled"],
            pricing_rules: { base_rate: 25000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "property-all-risks",
            name: "Property All Risks",
            name_am: "የንብረት ሁሉንም አደጋዎች ሽፋን",
            short_description: "Comprehensive cover for commercial or residential property against unnamed perils.",
            short_description_am: "ላልተጠቀሱ አደጋዎች ለንግድ ወይም ለመኖሪያ ንብረት ሰፊ ሽፋን።",
            full_description:
              "Rather than listing only named perils, this policy covers sudden and unforeseen physical loss or damage to your property unless specifically excluded — broader, simpler protection.",
            full_description_am:
              "በተለይ ካልተገለጹ በስተቀር ድንገተኛ እና ያልተጠበቀ የንብረት ጉዳት ወይም ኪሳራን የሚሸፍን ሰፊ ፖሊሲ።",
            coverage_list: ["Accidental physical loss or damage", "Theft and malicious damage", "Water damage", "Impact damage", "Loss of rent"],
            exclusions: ["Wear and tear", "War and terrorism", "Inherent defects", "Unoccupied premises over 30 days"],
            pricing_rules: { base_rate: 3000 },
            cta_text: "Get a Quote",
          },
        ],
      },
      {
        name: "Engineering Insurance",
        name_am: "የምህንድስና ኢንሹራንስ",
        slug: "engineering-insurance",
        icon: "Briefcase",
        children: [
          {
            slug: "engineering-contractors-all-risks",
            name: "Contractor's All Risks",
            name_am: "የተቋራጭ ሁሉንም አደጋዎች ሽፋን",
            short_description: "Covers construction projects against physical loss or damage from start to handover.",
            short_description_am: "ግንባታ ፕሮጀክቶችን ከመጀመሪያ እስከ ርክክብ ይሸፍናል።",
            full_description:
              "Purpose-built for construction and civil engineering projects, covering works, materials, and equipment on site against fire, flood, collapse, and other risks throughout the contract period.",
            full_description_am:
              "ለግንባታ እና ለሲቪል ምህንድስና ፕሮጀክቶች የተዘጋጀ፣ በግቢ ውስጥ ያሉ ስራዎችን እና ዕቃዎችን የሚሸፍን ፖሊሲ።",
            coverage_list: ["Material and works damage on site", "Third-party liability during construction", "Plant and equipment cover", "Defects liability period cover"],
            exclusions: ["Faulty design", "War and terrorism", "Wear and tear", "Consequential loss"],
            pricing_rules: { base_rate: 15000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-machinery-breakdown",
            name: "Machinery Breakdown",
            name_am: "የማሽን ብልሽት ኢንሹራንስ",
            short_description: "Protects against sudden and unforeseen mechanical or electrical breakdown of machinery.",
            short_description_am: "ላልተጠበቀ የማሽን ብልሽት ጥበቃ ይሰጣል።",
            full_description:
              "Covers the cost of repair or replacement when machinery suffers sudden mechanical or electrical failure — helping keep production lines and operations running with minimal downtime.",
            full_description_am:
              "ማሽነሪዎች ድንገተኛ ብልሽት ሲያጋጥማቸው የጥገና ወይም የመተኪያ ወጪን ይሸፍናል።",
            coverage_list: ["Mechanical breakdown repair costs", "Electrical failure", "Explosion of machinery", "Loss of production (optional rider)"],
            exclusions: ["Wear and tear", "Manufacturer defects under warranty", "Gradual deterioration", "Operator negligence"],
            pricing_rules: { base_rate: 8000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-electronic-equipment",
            name: "Electronic Equipment Insurance",
            name_am: "የኤሌክትሮኒክስ መሳሪያዎች ኢንሹራንስ",
            short_description: "Covers computers, servers, and sensitive electronic equipment against damage.",
            short_description_am: "ኮምፒውተሮችን እና ስሱ ኤሌክትሮኒክስ መሳሪያዎችን ይሸፍናል።",
            full_description:
              "Designed for offices and IT-dependent businesses, covering computer hardware, servers, and other electronic equipment against fire, power surges, and accidental damage — plus data restoration costs.",
            full_description_am:
              "ለቢሮዎች እና ኮምፒውተር ላይ ለተመሰረቱ ንግዶች የተዘጋጀ፣ ኮምፒውተር መሳሪያዎችን ከጉዳት የሚሸፍን ፖሊሲ።",
            coverage_list: ["Fire and power surge damage", "Accidental damage", "Theft of equipment", "Data restoration costs", "External data media cover"],
            exclusions: ["Software faults", "Wear and tear", "Manufacturer defects", "Unauthorized modifications"],
            pricing_rules: { base_rate: 4500 },
            cta_text: "Get a Quote",
          },
        ],
      },
      {
        name: "Marine Insurance",
        name_am: "የባህር ኢንሹራንስ",
        slug: "marine-insurance",
        icon: "Plane",
        children: [
          {
            slug: "marine-cargo",
            name: "Marine Cargo",
            name_am: "የባህር ጭነት ኢንሹራንስ",
            short_description: "Covers goods in transit by sea, air, or land against loss or damage.",
            short_description_am: "በባህር፣ በአየር ወይም በየብስ የሚጓጓዙ ዕቃዎችን ይሸፍናል።",
            full_description:
              "Protects imported and exported goods from the moment they leave the warehouse until they reach their final destination, covering loss or damage from perils of the sea, handling, and transit accidents.",
            full_description_am:
              "የገቢና ወጪ ንግድ ዕቃዎችን ከመጋዘን እስከ መድረሻ ድረስ ከሚደርስ ኪሳራ ወይም ጉዳት ይጠብቃል።",
            coverage_list: ["Loss or damage in transit", "Jettison and washing overboard", "Fire and collision", "General average contribution", "Theft and non-delivery"],
            exclusions: ["Inherent vice of goods", "Inadequate packing", "War risks (unless rider purchased)", "Delay-only losses"],
            pricing_rules: { base_rate: 5000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "marine-transit",
            name: "Transit Insurance",
            name_am: "የትራንዚት ኢንሹራንስ",
            short_description: "Covers domestic goods movement between warehouses, branches, or job sites.",
            short_description_am: "በአገር ውስጥ በመጋዘኖች እና ቅርንጫፎች መካከል ዕቃ ማንቀሳቀስን ይሸፍናል።",
            full_description:
              "For businesses regularly moving goods between locations within Ethiopia — covers loss or damage during loading, road transit, and unloading.",
            full_description_am:
              "በኢትዮጵያ ውስጥ በተደጋጋሚ ዕቃ ለሚያንቀሳቅሱ ንግዶች የተዘጋጀ፣ በመጫን፣ በመንገድ ትራንዚት እና በማራገፍ ወቅት ኪሳራን ይሸፍናል።",
            coverage_list: ["Loss or damage during road transit", "Loading and unloading accidents", "Fire and collision en route", "Theft during transit"],
            exclusions: ["Inadequate securing of load", "War and civil commotion", "Wear and tear", "Delay-only losses"],
            pricing_rules: { base_rate: 2800 },
            cta_text: "Get a Quote",
          },
        ],
      },
      {
        name: "Liability Insurance",
        name_am: "የተጠያቂነት ኢንሹራንስ",
        slug: "liability-insurance",
        icon: "Shield",
        children: [
          {
            slug: "liability-public",
            name: "Public Liability",
            name_am: "የህዝብ ተጠያቂነት ኢንሹራንስ",
            short_description: "Covers claims from third parties injured or whose property is damaged on your premises.",
            short_description_am: "በግቢዎ ላይ ለሚደርስ የሶስተኛ ወገን ጉዳት ወይም የንብረት ጉዳት ይሸፍናል።",
            full_description:
              "Protects your business against claims of injury or property damage suffered by members of the public as a result of your business operations or premises.",
            full_description_am:
              "ንግድዎ በስራው ወይም በግቢው ምክንያት በህዝብ ላይ ለሚደርስ ጉዳት ጥያቄዎችን ይጠብቃል።",
            coverage_list: ["Third-party bodily injury claims", "Third-party property damage claims", "Legal defense costs", "Court attendance costs"],
            exclusions: ["Employee injuries (see Employer's Liability)", "Intentional acts", "Contractual liability", "Professional advice errors"],
            pricing_rules: { base_rate: 6000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "liability-product",
            name: "Product Liability",
            name_am: "የምርት ተጠያቂነት ኢንሹራንስ",
            short_description: "Covers claims arising from injury or damage caused by products you manufacture or sell.",
            short_description_am: "በሚያመርቱት ወይም በሚሸጡት ምርት ምክንያት ለሚደርስ ጉዳት ጥያቄዎችን ይሸፍናል።",
            full_description:
              "For manufacturers, distributors, and retailers — covers legal liability for injury or property damage caused by a defect in a product once it has left your premises.",
            full_description_am:
              "ለአምራቾች እና ለችርቻሮ ንግዶች የተዘጋጀ፣ በምርት ችግር ምክንያት ለሚደርስ ጉዳት የህግ ተጠያቂነትን ይሸፍናል።",
            coverage_list: ["Bodily injury from defective products", "Property damage from defective products", "Product recall costs (optional rider)", "Legal defense costs"],
            exclusions: ["Known defects at time of sale", "Intentional misrepresentation", "Pure financial loss", "Products outside declared use"],
            pricing_rules: { base_rate: 7500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "liability-professional-indemnity",
            name: "Professional Indemnity",
            name_am: "የሙያ ካሳ ኢንሹራንስ",
            short_description: "Covers claims of negligence, errors, or omissions in professional services you provide.",
            short_description_am: "በሙያ አገልግሎትዎ ውስጥ ለሚፈጠር ስህተት ወይም ግድፈት ካሳ ይሸፍናል።",
            full_description:
              "Essential for consultants, engineers, accountants, and other professionals — covers legal costs and damages if a client claims your advice, design, or service caused them financial loss.",
            full_description_am:
              "ለአማካሪዎች፣ ለምህንድስና ባለሙያዎች እና ለሂሳብ ባለሙያዎች የተዘጋጀ፣ በምክር ወይም አገልግሎት ምክንያት ለሚደርስ ኪሳራ ካሳ ይሸፍናል።",
            coverage_list: ["Negligence claims", "Errors and omissions", "Legal defense costs", "Breach of professional duty", "Loss of documents"],
            exclusions: ["Fraudulent or dishonest acts", "Bodily injury or property damage claims", "Fines and penalties", "Known claims before inception"],
            pricing_rules: { base_rate: 9000 },
            cta_text: "Get a Quote",
          },
        ],
      },
      {
        name: "Personal Accident Insurance",
        name_am: "የግል አደጋ ኢንሹራንስ",
        slug: "personal-accident-insurance",
        icon: "Heart",
        leaf: {
          name: "Personal Accident Insurance",
          name_am: "የግል አደጋ ኢንሹራንስ",
          short_description: "Lump-sum payouts for accidental death, disability, or injury — anytime, anywhere.",
          short_description_am: "ለድንገተኛ ሞት፣ ውለታ ወይም ጉዳት ክፍያ ይሰጣል።",
          full_description:
            "A straightforward policy that pays out a lump sum if you suffer accidental death, permanent disability, or temporary disability — on the road, at work, or at home, 24 hours a day.",
          full_description_am:
            "በመንገድ ላይ፣ በስራ ቦታ ወይም በቤት ውስጥ ለሚደርስ ድንገተኛ ሞት ወይም ውለታ የክፍያ ፖሊሲ።",
          coverage_list: ["Accidental death benefit", "Permanent total disability", "Permanent partial disability", "Temporary total disability weekly benefit", "Medical expense reimbursement"],
          exclusions: ["Self-inflicted injury", "Injury while under influence", "Pre-existing disabilities", "Hazardous sports (unless declared)"],
          pricing_rules: { base_rate: 900 },
          cta_text: "Get a Quote",
        },
      },
      {
        name: "Aviation Insurance",
        name_am: "የአቪዬሽን ኢንሹራንስ",
        slug: "aviation-insurance",
        icon: "Plane",
        leaf: {
          name: "Aviation Insurance",
          name_am: "የአቪዬሽን ኢንሹራንስ",
          short_description: "Hull and liability cover for aircraft owners and operators.",
          short_description_am: "ለአውሮፕላን ባለቤቶች እና ኦፕሬተሮች የመርከብ እና የተጠያቂነት ሽፋን።",
          full_description:
            "Specialist cover for aircraft hull damage and third-party/passenger liability, arranged for owners, charter operators, and cargo carriers operating within and beyond Ethiopian airspace.",
          full_description_am:
            "ለአውሮፕላን ጎርፍ ጉዳት እና ለሶስተኛ ወገን/ለተሳፋሪ ተጠያቂነት የተዘጋጀ ልዩ ሽፋን።",
          coverage_list: ["Hull all-risks cover", "Passenger legal liability", "Third-party legal liability", "War and hijacking (optional rider)", "Spares and ground equipment"],
          exclusions: ["Unlicensed pilots", "Non-compliance with airworthiness certificates", "Use outside declared purpose", "Wear and tear"],
          pricing_rules: { base_rate: 60000 },
          cta_text: "Request a Quote",
        },
      },
    ],
  },
  {
    name: "Medical Insurance",
    name_am: "የጤና ኢንሹራንስ",
    slug: "medical-insurance",
    subcategories: [
      {
        name: "Individual Medical Plan",
        name_am: "የግል የጤና እቅድ",
        slug: "individual-medical-plan",
        icon: "Shield",
        leaf: {
          name: "Individual Medical Plan",
          name_am: "የግል የጤና እቅድ",
          short_description: "Personal healthcare cover for hospitalization, outpatient visits, and specialist care.",
          short_description_am: "ለግል የሆስፒታል፣ የውጭ ታካሚ እና የስፔሻሊስት እንክብካቤ ሽፋን።",
          full_description:
            "Tailored cover for individuals who want quality healthcare on their own terms — hospitalization, outpatient consultations, diagnostics, and prescriptions at leading facilities across Ethiopia.",
          full_description_am:
            "ጥራት ያለው የጤና እንክብካቤ ለሚፈልጉ ግለሰቦች የተዘጋጀ የሆስፒታል እና የውጭ ታካሚ ሽፋን።",
          coverage_list: ["Hospitalization costs", "Outpatient consultations", "Diagnostic tests", "Prescription medication", "Emergency treatment"],
          exclusions: ["Cosmetic procedures", "Pre-existing conditions (waiting period)", "Self-inflicted injuries", "Experimental treatment"],
          pricing_rules: { base_rate: 2200 },
          cta_text: "Get a Quote",
        },
      },
      {
        name: "Family Medical Plan",
        name_am: "የቤተሰብ የጤና እቅድ",
        slug: "family-medical-plan",
        icon: "Heart",
        leaf: {
          name: "Family Medical Plan",
          name_am: "የቤተሰብ የጤና እቅድ",
          short_description: "One plan covering you, your spouse, and your children under a shared benefit pool.",
          short_description_am: "እርስዎን፣ የትዳር ጓደኛዎን እና ልጆችዎን በአንድ ላይ የሚሸፍን እቅድ።",
          full_description:
            "A single policy that extends quality healthcare coverage to your whole household, with maternity benefits, pediatric care, and a shared annual benefit limit that makes budgeting simple.",
          full_description_am:
            "ለመላው ቤተሰብዎ ጥራት ያለው የጤና ሽፋን የሚሰጥ ነጠላ ፖሊሲ ከወሊድ ጥቅማ ጥቅሞች ጋር።",
          coverage_list: ["Hospitalization for all members", "Maternity and newborn care", "Pediatric care", "Outpatient consultations", "Dental and optical (optional rider)"],
          exclusions: ["Cosmetic procedures", "Pre-existing conditions (waiting period)", "Fertility treatment", "Experimental treatment"],
          pricing_rules: { base_rate: 5200 },
          cta_text: "Get a Quote",
        },
      },
      {
        name: "SME Employee Medical Plan",
        name_am: "የአነስተኛና መካከለኛ ንግድ ሠራተኛ የጤና እቅድ",
        slug: "sme-employee-medical-plan",
        icon: "Briefcase",
        leaf: {
          name: "SME Employee Medical Plan",
          name_am: "የአነስተኛና መካከለኛ ንግድ ሠራተኛ የጤና እቅድ",
          short_description: "Affordable group medical cover sized for small and medium-sized businesses.",
          short_description_am: "ለአነስተኛ እና መካከለኛ ንግዶች የተመጣጠነ የቡድን የጤና ሽፋን።",
          full_description:
            "Give your team access to quality healthcare without enterprise-level costs. Flexible tiered plans let SMEs offer meaningful medical benefits that help attract and retain staff.",
          full_description_am:
            "ሠራተኞችዎ ያለ ከፍተኛ ወጪ ጥራት ያለው የጤና እንክብካቤ እንዲያገኙ የሚያስችል የቡድን ፖሊሲ።",
          coverage_list: ["Group hospitalization cover", "Outpatient consultations", "Tiered benefit levels by role", "Simple enrollment and administration", "Optional dependents cover"],
          exclusions: ["Pre-existing conditions (waiting period)", "Cosmetic procedures", "Employees below minimum group size", "Elective non-emergency procedures abroad"],
          pricing_rules: { base_rate: 1800 },
          cta_text: "Cover Your Team",
        },
      },
      {
        name: "Corporate Medical Insurance",
        name_am: "የድርጅት የጤና ኢንሹራንስ",
        slug: "corporate-medical-insurance",
        icon: "Briefcase",
        leaf: {
          name: "Corporate Medical Insurance",
          name_am: "የድርጅት የጤና ኢንሹራንስ",
          short_description: "Comprehensive group healthcare for large organizations, with tiered benefits by level.",
          short_description_am: "ለትላልቅ ድርጅቶች አጠቃላይ የቡድን የጤና እንክብካቤ።",
          full_description:
            "Enterprise-grade group medical cover with tiered benefit structures by staff level, negotiated provider networks, and dedicated account management — built for organizations with complex workforce needs.",
          full_description_am:
            "በደረጃ የተከፋፈሉ ጥቅማ ጥቅሞች ያሉት፣ ለትላልቅ ድርጅቶች የተዘጋጀ ጠንካራ የቡድን ኢንሹራንስ።",
          coverage_list: ["Tiered benefits by staff grade", "Negotiated hospital network", "Dependents and family extension", "Dedicated account management", "Wellness and preventive care programs"],
          exclusions: ["Pre-existing conditions (waiting period)", "Cosmetic procedures", "Non-network elective treatment (unless authorized)", "Experimental treatment"],
          pricing_rules: { base_rate: 4000 },
          cta_text: "Talk to Our Corporate Team",
        },
      },
      {
        name: "International Medical Insurance",
        name_am: "ዓለም አቀፍ የጤና ኢንሹራንስ",
        slug: "international-medical-insurance",
        icon: "Plane",
        leaf: {
          name: "International Medical Insurance",
          name_am: "ዓለም አቀፍ የጤና ኢንሹራንስ",
          short_description: "Worldwide healthcare cover for travel, work assignments, and treatment abroad.",
          short_description_am: "ለጉዞ፣ ለውጭ ሥራ ምደባ እና ለውጭ ህክምና ዓለም አቀፍ ሽፋን።",
          full_description:
            "For frequent travelers, expatriates, and anyone who needs healthcare cover that follows them beyond Ethiopia — including access to international hospital networks and emergency evacuation.",
          full_description_am:
            "ከኢትዮጵያ ውጭ የሚደረግ የጤና ሽፋን ለሚያስፈልጋቸው ተጓዦች እና በውጭ ለሚሰሩ ሰዎች የተዘጋጀ።",
          coverage_list: ["Worldwide hospitalization cover", "Emergency medical evacuation", "International hospital network access", "Repatriation of remains", "Trip-related medical emergencies"],
          exclusions: ["Pre-existing conditions (unless declared)", "Elective treatment against medical advice", "War zones under travel advisory", "Cosmetic procedures"],
          pricing_rules: { base_rate: 12000 },
          cta_text: "Get Covered Worldwide",
        },
      },
    ],
  },
  {
    name: "Inclusive Insurance",
    name_am: "አካታች ኢንሹራንስ",
    slug: "inclusive-insurance",
    subcategories: [
      {
        name: "Farmers Insurance",
        name_am: "የገበሬ ኢንሹራንስ",
        slug: "farmers-insurance",
        icon: "Home",
        leaf: {
          name: "Farmers Insurance",
          name_am: "የገበሬ ኢንሹራንስ",
          short_description: "Crop and income protection against drought, flood, and other weather risks.",
          short_description_am: "ከድርቅ፣ ከጎርፍ እና ከሌሎች የአየር ንብረት አደጋዎች ጋር የሰብል ጥበቃ።",
          full_description:
            "Affordable, index-based crop cover designed for smallholder farmers — protecting income against drought, excess rainfall, and other weather events that put a season's harvest at risk.",
          full_description_am:
            "ለአነስተኛ ገበሬዎች የተዘጋጀ፣ ከድርቅ እና ከልክ ያለፈ ዝናብ ጋር የሰብል ገቢን የሚጠብቅ ተመጣጣኝ ፖሊሲ።",
          coverage_list: ["Drought-index payouts", "Excess rainfall cover", "Pest and disease damage (select crops)", "Simplified mobile-based claims"],
          exclusions: ["Poor farming practices", "Undeclared crop types", "War and civil unrest", "Losses outside insured season"],
          pricing_rules: { base_rate: 350 },
          cta_text: "Protect Your Harvest",
        },
      },
      {
        name: "Livestock Insurance",
        name_am: "የከብት ኢንሹራንስ",
        slug: "livestock-insurance",
        icon: "Heart",
        leaf: {
          name: "Livestock Insurance",
          name_am: "የከብት ኢንሹራንስ",
          short_description: "Covers cattle, sheep, and goats against death from disease, accident, or theft.",
          short_description_am: "ከበሽታ፣ ከአደጋ ወይም ከስርቆት የተነሳ ለሚደርስ የከብት ሞት ካሳ ይሸፍናል።",
          full_description:
            "Protects the value of your herd — paying out if insured animals die from disease, accident, or theft, so a single loss doesn't wipe out a household's livelihood.",
          full_description_am:
            "የከብት መንጋዎን ዋጋ ይጠብቃል — ለተሸፈኑ እንስሳት ከበሽታ ወይም ከአደጋ ለሚደርስ ሞት ካሳ ይከፍላል።",
          coverage_list: ["Death from disease", "Death from accident", "Theft of insured animals", "Basic veterinary cost reimbursement (optional rider)"],
          exclusions: ["Unvaccinated animals", "Pre-existing illness at inception", "Negligent care", "Animals outside declared location"],
          pricing_rules: { base_rate: 450 },
          cta_text: "Protect Your Herd",
        },
      },
      {
        name: "Micro Health Insurance",
        name_am: "ጥቃቅን የጤና ኢንሹራንስ",
        slug: "micro-health-insurance",
        icon: "Shield",
        leaf: {
          name: "Micro Health Insurance",
          name_am: "ጥቃቅን የጤና ኢንሹራንስ",
          short_description: "Low-cost basic health cover designed for low-income individuals and families.",
          short_description_am: "ለዝቅተኛ ገቢ ግለሰቦች እና ቤተሰቦች የተዘጋጀ ዝቅተኛ ዋጋ ያለው መሰረታዊ የጤና ሽፋን።",
          full_description:
            "Essential health cover at a price point accessible to low-income households — basic hospitalization and outpatient benefits with simple enrollment through community groups and mobile channels.",
          full_description_am:
            "ለዝቅተኛ ገቢ ቤተሰቦች ተደራሽ በሆነ ዋጋ የመሰረታዊ ሆስፒታል እና የውጭ ታካሚ ጥቅማ ጥቅሞችን ይሰጣል።",
          coverage_list: ["Basic hospitalization cover", "Outpatient consultations", "Maternity basic benefit", "Community group enrollment", "Mobile-based premium payment"],
          exclusions: ["Chronic pre-existing conditions", "Elective procedures", "Treatment outside network", "Cosmetic procedures"],
          pricing_rules: { base_rate: 250 },
          cta_text: "Get Affordable Cover",
        },
      },
      {
        name: "Small Business Protection",
        name_am: "የአነስተኛ ንግድ ጥበቃ",
        slug: "small-business-protection",
        icon: "Briefcase",
        leaf: {
          name: "Small Business Protection",
          name_am: "የአነስተኛ ንግድ ጥበቃ",
          short_description: "Simple, bundled cover for micro and small enterprises against fire, theft, and liability.",
          short_description_am: "ለጥቃቅን እና አነስተኛ ንግዶች ከእሳት፣ ከስርቆት እና ከተጠያቂነት ጥበቃ የሚሰጥ ቀላል ፖሊሲ።",
          full_description:
            "A bundled, easy-to-understand policy for kiosks, small shops, and micro-enterprises — combining fire, theft, and basic liability cover in one affordable package.",
          full_description_am:
            "ለኪዮስኮች፣ ለአነስተኛ ሱቆች እና ለጥቃቅን ንግዶች የተዘጋጀ ተመጣጣኝ የተጣመረ ፖሊሲ።",
          coverage_list: ["Fire and lightning damage", "Theft and burglary", "Basic public liability", "Stock-in-trade cover", "Simplified claims process"],
          exclusions: ["Unregistered businesses", "War and civil unrest", "Gross negligence", "Assets not declared on schedule"],
          pricing_rules: { base_rate: 800 },
          cta_text: "Protect Your Business",
        },
      },
      {
        name: "Community-based Insurance Programs",
        name_am: "የማህበረሰብ ተኮር የኢንሹራንስ ፕሮግራሞች",
        slug: "community-based-insurance-programs",
        icon: "Shield",
        leaf: {
          name: "Community-based Insurance Programs",
          name_am: "የማህበረሰብ ተኮር የኢንሹራንስ ፕሮግራሞች",
          short_description: "Pooled-risk insurance programs designed and priced with community groups.",
          short_description_am: "ከማህበረሰብ ቡድኖች ጋር በጋራ የተነደፉ የተጋላጭነት መጋራት ፕሮግራሞች።",
          full_description:
            "Insurance built together with cooperatives, iddirs, and community associations — pooling risk across a group to make coverage affordable and administration simple for members.",
          full_description_am:
            "ከህብረት ሥራ ማህበራት፣ ከዕድሮች እና ከማህበረሰብ ማህበራት ጋር በጋራ የተነደፈ ኢንሹራንስ።",
          coverage_list: ["Pooled risk group cover", "Funeral and iddir-linked benefits", "Flexible group premium collection", "Community-led claims verification"],
          exclusions: ["Non-members of the scheme", "Pre-existing conditions (unless declared)", "Fraudulent group enrollment", "Events outside scheme rules"],
          pricing_rules: { base_rate: 300 },
          cta_text: "Learn About Community Cover",
        },
      },
    ],
  },
];

// ─── Flatten catalogue into Product[] + build nav tree ────────────────────

const flattenProducts = (): Product[] => {
  const out: Product[] = [];
  let order = 1;

  for (const category of catalogue) {
    for (const sub of category.subcategories) {
      if (sub.leaf) {
        out.push({
          ...sub.leaf,
          slug: sub.slug,
          icon: sub.icon,
          active: true,
          sort_order: order++,
          category: category.name,
          category_slug: category.slug,
          subcategory: sub.name,
          subcategory_slug: sub.slug,
        });
      } else if (sub.children) {
        for (const child of sub.children) {
          out.push({
            ...child,
            icon: sub.icon,   // now correctly the only source of `icon`
            active: true,
            sort_order: order++,
            category: category.name,
            category_slug: category.slug,
            subcategory: sub.name,
            subcategory_slug: sub.slug,
          });
        }
      }
    }
  }
  return out;
};

const buildNavTree = (): NavCategory[] =>
  catalogue.map((category) => ({
    label: category.name,
    label_am: category.name_am,
    slug: category.slug,
    subcategories: category.subcategories.map((sub) => {
      if (sub.leaf) {
        return {
          label: sub.name,
          label_am: sub.name_am,
          href: `/products/${sub.slug}`,
        };
      }
      return {
        label: sub.name,
        label_am: sub.name_am,
        children: (sub.children ?? []).map((child) => ({
          label: child.name,
          label_am: child.name_am,
          href: `/products/${child.slug}`,
        })),
      };
    }),
  }));

export const products: Product[] = flattenProducts();
export const navCategories: NavCategory[] = buildNavTree();

export const getProductBySlug = (slug: string | undefined): Product | undefined =>
  products.find((p) => p.slug === slug && p.active);

export const getActiveProducts = (): Product[] =>
  products.filter((p) => p.active).sort((a, b) => a.sort_order - b.sort_order);

export const getProductsByCategory = (categorySlug: string): Product[] =>
  getActiveProducts().filter((p) => p.category_slug === categorySlug);

export const getProductsBySubcategory = (subcategorySlug: string): Product[] =>
  getActiveProducts().filter((p) => p.subcategory_slug === subcategorySlug);