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
  category: string;
  category_slug: string;
  subcategory: string;
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

export interface NavLeaf {
  label: string;
  label_am: string;
  href: string;
}

export interface NavSubcategory {
  label: string;
  label_am: string;
  href?: string;
  children?: NavLeaf[];
}

export interface NavCategory {
  label: string;
  label_am: string;
  slug: string;
  subcategories: NavSubcategory[];
}

// ─── Raw catalogue (source of truth) ───────────────────────────────────────

type RawLeaf = Omit<
  Product,
  "active" | "sort_order" | "category" | "category_slug" | "subcategory" | "subcategory_slug"
>;

type RawChild = Omit<RawLeaf, "icon">;

interface RawSubcategory {
  name: string;
  name_am: string;
  slug: string;
  icon: Product["icon"];
  leaf?: Omit<RawLeaf, "slug" | "icon">;
  children?: RawChild[];
}

interface RawCategory {
  name: string;
  name_am: string;
  slug: string;
  subcategories: RawSubcategory[];
}

const catalogue: RawCategory[] = [
  // ════════════════════════════════════════════════════════════════════
  // 1. GENERAL INSURANCE
  // ════════════════════════════════════════════════════════════════════
  {
    name: "General Insurance",
    name_am: "አጠቃላይ ኢንሹራንስ",
    slug: "general-insurance",
    subcategories: [
      // 1. Motor Insurance
      {
        name: "Motor Insurance",
        name_am: "የመኪና ኢንሹራንስ",
        slug: "motor-insurance",
        icon: "Car",
        children: [
          {
            slug: "motor-private",
            name: "Motor Private",
            name_am: "የግል ተሽከርካሪ ኢንሹራንስ",
            short_description: "Comprehensive protection for privately owned cars, SUVs, and personal vehicles.",
            short_description_am: "ለግል ባለቤትነት ተሽከርካሪዎች የተሟላ ጥበቃ።",
            full_description:
              "Covers your personal vehicle against accidental damage, fire, theft, and third-party liability, so everyday driving comes with genuine peace of mind.",
            full_description_am:
              "የግል ተሽከርካሪዎን ከድንገተኛ ጉዳት፣ ከእሳት፣ ከስርቆት እና ከሶስተኛ ወገን ተጠያቂነት ይጠብቃል።",
            coverage_list: ["Own-damage accident repair", "Fire and theft", "Third-party liability", "Windscreen cover", "Personal accident for driver"],
            exclusions: ["Unlicensed driving", "Driving under influence", "Racing or reckless driving", "Commercial use of a private vehicle"],
            pricing_rules: { base_rate: 4200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "motor-commercial",
            name: "Motor Commercial",
            name_am: "የንግድ ተሽከርካሪ ኢንሹራንስ",
            short_description: "Cover built for vehicles used in business — vans, pickups, and delivery trucks.",
            short_description_am: "ለንግድ ስራ ለሚያገለግሉ ተሽከርካሪዎች የተዘጋጀ ሽፋን።",
            full_description:
              "Protects commercially used vehicles against accidental damage, fire, theft, and liability arising from business operations on the road.",
            full_description_am:
              "ለንግድ ስራ ጥቅም ላይ ለሚውሉ ተሽከርካሪዎች ከጉዳት፣ ከእሳት፣ ከስርቆት እና ከተጠያቂነት ይጠብቃል።",
            coverage_list: ["Own-damage accident repair", "Fire and theft", "Third-party liability", "Goods-in-transit rider (optional)", "Replacement driver cover"],
            exclusions: ["Unlicensed or unauthorized drivers", "Overloading beyond rated capacity", "Use outside declared business purpose"],
            pricing_rules: { base_rate: 5200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "motor-via-tpr",
            name: "Vehicles Insurance Against Third Party Risks (VIA TPR)",
            name_am: "ተሽከርካሪዎች ከሶስተኛ ወገን አደጋዎች ኢንሹራንስ",
            short_description: "The legally required minimum — covers injury and damage you cause to others.",
            short_description_am: "በህግ የሚያስፈልገው ዝቅተኛ ሽፋን — ለሌሎች የሚደርስ ጉዳት ይሸፍናል።",
            full_description:
              "The mandatory baseline cover for every vehicle on Ethiopian roads, protecting you financially if you injure someone or damage their property.",
            full_description_am:
              "በኢትዮጵያ መንገዶች ላይ ለሚንቀሳቀስ ለእያንዳንዱ ተሽከርካሪ የሚያስፈልግ የግዴታ መሰረታዊ ሽፋን።",
            coverage_list: ["Third-party bodily injury", "Third-party property damage", "Legal liability defense costs"],
            exclusions: ["Damage to your own vehicle", "Driving under influence", "Unlicensed driving"],
            pricing_rules: { base_rate: 1500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "motor-trade",
            name: "Motor Trade",
            name_am: "የተሽከርካሪ ንግድ ኢንሹራንስ",
            short_description: "Cover for dealerships, garages, and workshops handling customers' vehicles.",
            short_description_am: "ለመኪና ማከፋፈያዎች እና ጋራጆች የተዘጋጀ ሽፋን።",
            full_description:
              "Protects motor dealers, repairers, and valet services against liability and damage to vehicles left in their care, custody, and control.",
            full_description_am:
              "ለመኪና ነጋዴዎች እና ጠጋኞች በአደራ ለተያዙ ተሽከርካሪዎች ጉዳት እና ተጠያቂነት ጥበቃ ይሰጣል።",
            coverage_list: ["Road risk cover for trade plates", "Liability for customer vehicles in care", "Premises and forecourt cover", "Employee driving cover"],
            exclusions: ["Vehicles not on trade stock records", "Racing or off-road testing", "Unauthorized private use"],
            pricing_rules: { base_rate: 6000 },
            cta_text: "Get a Quote",
          },
        ],
      },
      // 2. Property Insurance
      {
        name: "Property Insurance",
        name_am: "የንብረት ኢንሹራንስ",
        slug: "property-insurance",
        icon: "Home",
        children: [
          {
            slug: "property-fire-lightning",
            name: "Fire and Lightning",
            name_am: "እሳት እና መብረቅ",
            short_description: "Core protection for buildings and contents against fire and lightning strikes.",
            short_description_am: "ህንፃዎችን እና ይዘቶችን ከእሳት እና ከመብረቅ ይጠብቃል።",
            full_description:
              "The foundational property policy every owner should have — covering direct loss or damage caused by fire and lightning to buildings, stock, and contents.",
            full_description_am:
              "ለህንፃዎች፣ ለዕቃዎች እና ለይዘቶች ከእሳት እና ከመብረቅ ቀጥተኛ ጉዳት የሚሰጥ መሰረታዊ ፖሊሲ።",
            coverage_list: ["Fire damage to buildings", "Lightning strike damage", "Contents and stock cover", "Debris removal after fire"],
            exclusions: ["Arson by the insured", "War and terrorism", "Gradual deterioration", "Undeclared high-value items"],
            pricing_rules: { base_rate: 2000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "property-fire-consequential-loss",
            name: "Fire-Consequential Loss / Business Interruption",
            name_am: "የእሳት ተያያዥ ኪሳራ / የንግድ መስተጓጎል",
            short_description: "Protects lost income and ongoing costs when fire damage halts your business.",
            short_description_am: "እሳት ንግድዎን ሲያስተጓጉል የገቢ ኪሳራን ይሸፍናል።",
            full_description:
              "Complements a fire policy by covering the loss of gross profit and continuing fixed expenses while your business recovers from insured fire damage.",
            full_description_am:
              "ከእሳት ፖሊሲ ጋር ተደምሮ፣ ንግድዎ ከጉዳት እያገገመ ባለበት ወቅት የትርፍ ኪሳራን ይሸፍናል።",
            coverage_list: ["Loss of gross profit", "Continuing fixed costs", "Increased cost of working", "Auditor's fees for claim preparation"],
            exclusions: ["Loss not resulting from an insured fire event", "Delay in resuming trade beyond indemnity period", "Consequential loss unrelated to fire"],
            pricing_rules: { base_rate: 5500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "property-burglary-housebreaking",
            name: "Burglary and Housebreaking",
            name_am: "ስርቆት እና ቤት መስበር",
            short_description: "Covers loss of property from forced entry, burglary, or housebreaking.",
            short_description_am: "በኃይል በመግባት ከሚደርስ ስርቆት ንብረትን ይጠብቃል።",
            full_description:
              "Protects stock, equipment, and personal contents against theft involving forcible and violent entry to your premises.",
            full_description_am:
              "ወደ ግቢዎ በኃይል በመግባት ለሚደረግ ስርቆት ዕቃዎችን እና ንብረቶችን ይሸፍናል።",
            coverage_list: ["Theft with forcible entry", "Damage caused during break-in", "Stock and contents loss", "Safe and strongroom cover (optional)"],
            exclusions: ["Theft without signs of forced entry", "Employee theft (see Fidelity)", "Unoccupied premises over 30 days"],
            pricing_rules: { base_rate: 1800 },
            cta_text: "Get a Quote",
          },
          {
            slug: "property-householders-comprehensive",
            name: "Householders' Comprehensive",
            name_am: "የቤት ባለቤቶች አጠቃላይ ኢንሹራንስ",
            short_description: "All-in-one cover for your home, contents, and family liability.",
            short_description_am: "ለቤትዎ፣ ለይዘቶችዎ እና ለቤተሰብ ተጠያቂነት የተጣመረ ሽፋን።",
            full_description:
              "A single bundled policy protecting the structure of your home, its contents, and your personal liability to visitors and neighbors — simple cover for homeowners.",
            full_description_am:
              "የቤትዎን መዋቅር፣ ይዘቶች እና የግል ተጠያቂነትን በአንድ ፖሊሲ ውስጥ የሚያካትት ሽፋን።",
            coverage_list: ["Building structure cover", "Household contents", "Personal liability to third parties", "Accidental damage to fixtures", "Loss of rent/alternative accommodation"],
            exclusions: ["Wear and tear", "Unoccupied property over 60 days", "Business use of the residence", "Undeclared valuables"],
            pricing_rules: { base_rate: 2500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "property-industrial-all-risks",
            name: "Industrial All Risks",
            name_am: "የኢንዱስትሪ ሁሉንም አደጋዎች ሽፋን",
            short_description: "Broad 'all risks' protection for factories, plants, and industrial premises.",
            short_description_am: "ለፋብሪካዎች እና ለኢንዱስትሪ ግቢዎች ሰፊ ሽፋን።",
            full_description:
              "A single all-risks policy for industrial operations, covering physical loss or damage to buildings, plant, machinery, and stock, plus resulting business interruption.",
            full_description_am:
              "ለኢንዱስትሪ ስራዎች ህንፃዎችን፣ ማሽነሪዎችን እና ዕቃዎችን ከሚደርስ አካላዊ ኪሳራ ወይም ጉዳት የሚሸፍን ፖሊሲ።",
            coverage_list: ["Physical damage to buildings and plant", "Machinery and stock loss", "Business interruption", "Debris removal", "Architects' and surveyors' fees"],
            exclusions: ["War and terrorism", "Wear and tear", "Design defects", "Uninsured perils not scheduled"],
            pricing_rules: { base_rate: 25000 },
            cta_text: "Get a Quote",
          },
        ],
      },
      // 3. Marine Cargo Insurance
      {
        name: "Marine Cargo Insurance",
        name_am: "የባህር ጭነት ኢንሹራንስ",
        slug: "marine-cargo-insurance",
        icon: "Plane",
        children: [
          {
            slug: "marine-cargo-air-sea",
            name: "Marine Cargo (Air/Sea)",
            name_am: "የባህር ጭነት (በአየር/በባህር)",
            short_description: "Covers goods in transit by sea or air against loss or damage.",
            short_description_am: "በባህር ወይም በአየር የሚጓጓዙ ዕቃዎችን ይሸፍናል።",
            full_description:
              "Protects imported and exported goods from the moment they leave the warehouse until they reach their final destination, covering loss or damage in transit by sea or air.",
            full_description_am:
              "የገቢና ወጪ ንግድ ዕቃዎችን ከመጋዘን እስከ መድረሻ ድረስ ከሚደርስ ኪሳራ ወይም ጉዳት ይጠብቃል።",
            coverage_list: ["Loss or damage in transit", "Jettison and washing overboard", "Fire and collision", "General average contribution", "Theft and non-delivery"],
            exclusions: ["Inherent vice of goods", "Inadequate packing", "War risks (unless rider purchased)", "Delay-only losses"],
            pricing_rules: { base_rate: 5000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "marine-hull",
            name: "Marine Hull",
            name_am: "የመርከብ አካል ኢንሹራንስ",
            short_description: "Physical damage cover for vessels, hulls, and marine machinery.",
            short_description_am: "ለመርከቦች እና ለባህር ማሽነሪዎች የአካላዊ ጉዳት ሽፋን።",
            full_description:
              "Covers the hull, machinery, and equipment of vessels against loss or damage from perils of the sea, collision, fire, and other marine risks.",
            full_description_am:
              "የመርከቦችን አካል፣ ማሽነሪ እና መሳሪያ ከባህር አደጋዎች፣ ግጭት እና እሳት ይጠብቃል።",
            coverage_list: ["Hull and machinery damage", "Collision liability", "Fire and explosion", "Salvage charges", "Total loss cover"],
            exclusions: ["Unseaworthy vessels", "War risks (unless rider purchased)", "Wear and tear", "Wilful misconduct of the owner"],
            pricing_rules: { base_rate: 30000 },
            cta_text: "Request a Quote",
          },
        ],
      },
      // 4. Goods in Transit (leaf)
      {
        name: "Goods in Transit (All Risk and Road Risk) Insurance",
        name_am: "የጭነት ትራንዚት ኢንሹራንስ (ሁሉንም አደጋ እና የመንገድ አደጋ)",
        slug: "goods-in-transit",
        icon: "Shield",
        leaf: {
          name: "Goods in Transit (All Risk and Road Risk) Insurance",
          name_am: "የጭነት ትራንዚት ኢንሹራንስ",
          short_description: "Covers domestic goods movement between warehouses, branches, or job sites by road.",
          short_description_am: "በአገር ውስጥ በመጋዘኖች እና ቅርንጫፎች መካከል የጭነት ማንቀሳቀስን ይሸፍናል።",
          full_description:
            "For businesses regularly moving goods between locations within Ethiopia — covers loss or damage during loading, road transit, and unloading, on an all-risk or named-risk basis.",
          full_description_am:
            "በኢትዮጵያ ውስጥ በተደጋጋሚ ዕቃ ለሚያንቀሳቅሱ ንግዶች የተዘጋጀ፣ በመጫን፣ በመንገድ ትራንዚት እና በማራገፍ ወቅት ኪሳራን ይሸፍናል።",
          coverage_list: ["Loss or damage during road transit", "Loading and unloading accidents", "Fire and collision en route", "Theft during transit"],
          exclusions: ["Inadequate securing of load", "War and civil commotion", "Wear and tear", "Delay-only losses"],
          pricing_rules: { base_rate: 2800 },
          cta_text: "Get a Quote",
        },
      },
      // 5. Engineering Insurance
      {
        name: "Engineering Insurance",
        name_am: "የምህንድስና ኢንሹራንስ",
        slug: "engineering-insurance",
        icon: "Briefcase",
        children: [
          {
            slug: "engineering-car",
            name: "Contractors' All Risks (CAR)",
            name_am: "የተቋራጭ ሁሉንም አደጋዎች ሽፋን (CAR)",
            short_description: "Covers construction projects against physical loss or damage from start to handover.",
            short_description_am: "ግንባታ ፕሮጀክቶችን ከመጀመሪያ እስከ ርክክብ ይሸፍናል።",
            full_description:
              "Purpose-built for civil construction projects, covering works, materials, and equipment on site against fire, flood, collapse, and other risks throughout the contract period.",
            full_description_am:
              "ለግንባታ ፕሮጀክቶች የተዘጋጀ፣ በግቢ ውስጥ ያሉ ስራዎችን እና ዕቃዎችን የሚሸፍን ፖሊሲ።",
            coverage_list: ["Material and works damage on site", "Third-party liability during construction", "Plant and equipment cover", "Defects liability period cover"],
            exclusions: ["Faulty design", "War and terrorism", "Wear and tear", "Consequential loss"],
            pricing_rules: { base_rate: 15000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-ear",
            name: "Erection All Risks (EAR)",
            name_am: "የመትከል ሁሉንም አደጋዎች ሽፋን (EAR)",
            short_description: "Covers the erection and installation of plant and machinery against physical loss.",
            short_description_am: "ማሽነሪ የመትከል ስራዎችን ከጉዳት ይሸፍናል።",
            full_description:
              "Protects the installation and erection of machinery, steel structures, and industrial plant against fire, mechanical mishap, and other risks until commissioning.",
            full_description_am:
              "ማሽነሪዎችን እና የብረት አወቃቀሮችን በመትከል ወቅት ከእሳት እና ከሜካኒካል አደጋ ይጠብቃል።",
            coverage_list: ["Erection-phase damage to plant", "Testing and commissioning cover", "Third-party liability during erection", "Surrounding property damage"],
            exclusions: ["Faulty design or workmanship", "War and terrorism", "Wear and tear", "Pre-existing defects"],
            pricing_rules: { base_rate: 14000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-cpm",
            name: "Contractors Plant and Machinery (CPM)",
            name_am: "የተቋራጭ ማሽነሪ እና ዕቃ ኢንሹራንስ (CPM)",
            short_description: "Covers construction plant, cranes, and heavy equipment against damage or theft.",
            short_description_am: "የግንባታ ማሽነሪዎችን እና ከባድ መሳሪያዎችን ይሸፍናል።",
            full_description:
              "Protects excavators, cranes, loaders, and other contractors' plant against accidental damage, fire, and theft, whether on site or in transit between sites.",
            full_description_am:
              "ኤክስካቫተሮችን፣ ክሬኖችን እና ሌሎች የግንባታ መሳሪያዎችን ከጉዳት እና ስርቆት ይጠብቃል።",
            coverage_list: ["Accidental damage to plant", "Fire and theft", "Transit between sites", "Third-party liability while operating"],
            exclusions: ["Wear and tear", "Mechanical or electrical breakdown (see MBD)", "Overloading beyond rated capacity", "Unlicensed operators"],
            pricing_rules: { base_rate: 9500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-eei",
            name: "Electronic Equipment Insurance (EEI)",
            name_am: "የኤሌክትሮኒክስ መሳሪያዎች ኢንሹራንስ",
            short_description: "Covers computers, servers, and sensitive electronic equipment against damage.",
            short_description_am: "ኮምፒውተሮችን እና ስሱ ኤሌክትሮኒክስ መሳሪያዎችን ይሸፍናል።",
            full_description:
              "Designed for offices and IT-dependent businesses, covering computer hardware, servers, and other electronic equipment against fire, power surges, and accidental damage, plus data restoration costs.",
            full_description_am:
              "ለቢሮዎች እና ኮምፒውተር ላይ ለተመሰረቱ ንግዶች የተዘጋጀ፣ ኮምፒውተር መሳሪያዎችን ከጉዳት የሚሸፍን ፖሊሲ።",
            coverage_list: ["Fire and power surge damage", "Accidental damage", "Theft of equipment", "Data restoration costs", "External data media cover"],
            exclusions: ["Software faults", "Wear and tear", "Manufacturer defects", "Unauthorized modifications"],
            pricing_rules: { base_rate: 4500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-mbd",
            name: "Machinery Breakdown (MBD)",
            name_am: "የማሽን ብልሽት ኢንሹራንስ",
            short_description: "Protects against sudden and unforeseen mechanical or electrical breakdown of machinery.",
            short_description_am: "ላልተጠበቀ የማሽን ብልሽት ጥበቃ ይሰጣል።",
            full_description:
              "Covers the cost of repair or replacement when machinery suffers sudden mechanical or electrical failure, helping keep production lines running with minimal downtime.",
            full_description_am:
              "ማሽነሪዎች ድንገተኛ ብልሽት ሲያጋጥማቸው የጥገና ወይም የመተኪያ ወጪን ይሸፍናል።",
            coverage_list: ["Mechanical breakdown repair costs", "Electrical failure", "Explosion of machinery", "Loss of production (optional rider)"],
            exclusions: ["Wear and tear", "Manufacturer defects under warranty", "Gradual deterioration", "Operator negligence"],
            pricing_rules: { base_rate: 8000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-mlop",
            name: "Machinery Loss of Profit (MLOP)",
            name_am: "የማሽን ብልሽት የትርፍ ኪሳራ ኢንሹራንስ",
            short_description: "Covers lost profit resulting from an insured machinery breakdown.",
            short_description_am: "በማሽን ብልሽት ምክንያት የሚደርስ የትርፍ ኪሳራን ይሸፍናል።",
            full_description:
              "Pairs with a Machinery Breakdown policy to cover the loss of gross profit and continuing fixed costs while damaged machinery is repaired or replaced.",
            full_description_am:
              "ከማሽን ብልሽት ፖሊሲ ጋር ተደምሮ፣ ማሽነሪ በሚጠገንበት ወቅት የትርፍ ኪሳራን ይሸፍናል።",
            coverage_list: ["Loss of gross profit", "Continuing fixed expenses", "Increased cost of working", "Extended indemnity period (optional)"],
            exclusions: ["Loss not linked to an insured breakdown", "Delay beyond the indemnity period", "Uninsured machinery"],
            pricing_rules: { base_rate: 7000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-bpv",
            name: "Boiler and Pressure Vessel (B&PV)",
            name_am: "ቦይለር እና ግፊት ዕቃ ኢንሹራንስ",
            short_description: "Covers explosion or collapse of boilers, pressure vessels, and steam plant.",
            short_description_am: "የቦይለር እና የግፊት ዕቃ ፍንዳታን ይሸፍናል።",
            full_description:
              "Protects against sudden and accidental explosion or collapse of boilers, pressure vessels, and associated pipework, including resulting damage to surrounding property.",
            full_description_am:
              "ቦይለርን፣ ግፊት ዕቃዎችን እና ተያያዥ ቧንቧዎችን ከድንገተኛ ፍንዳታ ይጠብቃል።",
            coverage_list: ["Explosion or collapse damage", "Resulting damage to surrounding property", "Third-party liability", "Statutory inspection support"],
            exclusions: ["Wear and tear or corrosion", "Failure to maintain statutory inspections", "Pre-existing defects known at inception"],
            pricing_rules: { base_rate: 11000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "engineering-dos",
            name: "Deterioration of Stock (DOS)",
            name_am: "የክምችት መበላሸት ኢንሹራንስ",
            short_description: "Covers stock spoilage caused by breakdown of refrigeration or cold-storage equipment.",
            short_description_am: "በማቀዝቀዣ ብልሽት ምክንያት ለሚደርስ ክምችት መበላሸት ይሸፍናል።",
            full_description:
              "Protects perishable stock held in cold storage against spoilage resulting from a sudden breakdown of refrigeration machinery or an unforeseen power failure.",
            full_description_am:
              "በቀዝቃዛ ማከማቻ ውስጥ ያለ ተበላሽ ክምችትን ከማቀዝቀዣ ብልሽት ይጠብቃል።",
            coverage_list: ["Stock loss from refrigeration breakdown", "Power failure-related spoilage", "Temperature excursion cover"],
            exclusions: ["Stock past its normal shelf life", "Wear and tear of refrigeration units", "Deliberate power disconnection"],
            pricing_rules: { base_rate: 6500 },
            cta_text: "Get a Quote",
          },
        ],
      },
      // 6. Pecuniary Insurance
      {
        name: "Pecuniary Insurance",
        name_am: "የገንዘብ ኢንሹራንስ",
        slug: "pecuniary-insurance",
        icon: "Shield",
        children: [
          {
            slug: "pecuniary-money",
            name: "Money",
            name_am: "የገንዘብ ኢንሹራንስ",
            short_description: "Covers cash in transit, in the till, and in the safe against loss.",
            short_description_am: "በትራንዚት፣ በካሳ እና በሳጥን ውስጥ ያለ ገንዘብን ይሸፍናል።",
            full_description:
              "Protects your business against loss of money — cash, cheques, and negotiable instruments — while in transit, on premises, or held in a safe overnight.",
            full_description_am:
              "ንግድዎን ገንዘብ በትራንዚት ወይም በግቢ ውስጥ ካለው ኪሳራ ይጠብቃል።",
            coverage_list: ["Money in transit", "Money on premises during business hours", "Money in locked safe overnight", "Personal assault cover for carriers"],
            exclusions: ["Employee dishonesty (see Fidelity)", "Loss from an unlocked or unattended safe", "Shortages found on stocktaking"],
            pricing_rules: { base_rate: 3200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "pecuniary-fidelity",
            name: "Fidelity",
            name_am: "የታማኝነት ኢንሹራንስ",
            short_description: "Protects your business against financial loss caused by employee dishonesty.",
            short_description_am: "ንግድዎን ከሠራተኛ ታማኝነት ማጣት የሚደርስ ኪሳራ ይጠብቃል።",
            full_description:
              "Covers direct financial loss from fraud, theft, or dishonest acts committed by employees in the course of their duties.",
            full_description_am:
              "ሠራተኞች በስራ ላይ ባደረጉት ማጭበርበር ወይም ስርቆት ለሚደርስ ኪሳራ ካሳ ይከፍላል።",
            coverage_list: ["Employee fraud and theft", "Forgery by staff", "Named or blanket position cover", "Investigation cost reimbursement"],
            exclusions: ["Acts discovered after employment ends without prior notice", "Losses known before policy inception", "Non-employee third-party fraud"],
            pricing_rules: { base_rate: 5000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "pecuniary-bid-bond",
            name: "Bid Bond",
            name_am: "የጨረታ ዋስትና",
            short_description: "Guarantees a contractor will honor its tender if awarded the contract.",
            short_description_am: "ተቋራጭ ጨረታውን ካሸነፈ ውሉን እንደሚቀበል ያረጋግጣል።",
            full_description:
              "A guarantee to the project owner that a bidding contractor will sign the contract and provide required securities if selected, compensating the owner if the bidder withdraws.",
            full_description_am:
              "ተቋራጭ ጨረታውን ካሸነፈ በኋላ ውሉን ካልፈጸመ ለባለቤቱ ካሳ ይሰጣል።",
            coverage_list: ["Compensation if bidder withdraws after award", "Cover up to bond percentage of tender value", "Standard tender-period validity"],
            exclusions: ["Bidder's failure due to owner's own default", "Bonds issued outside the stated tender", "Post-award performance failures (see Performance Bond)"],
            pricing_rules: { base_rate: 2000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "pecuniary-performance-bond",
            name: "Performance Bond",
            name_am: "የስራ አፈጻጸም ዋስትና",
            short_description: "Guarantees a contractor will complete a project according to contract terms.",
            short_description_am: "ተቋራጭ ስራውን በውሉ መሰረት እንደሚያጠናቅቅ ያረጋግጣል።",
            full_description:
              "Provides the project owner with financial protection if the contractor fails to perform the contracted works to the agreed standard, timeline, or scope.",
            full_description_am:
              "ተቋራጭ ስራውን በተስማማው ደረጃ ካላጠናቀቀ ለባለቤቱ የገንዘብ ጥበቃ ይሰጣል።",
            coverage_list: ["Compensation for non-performance", "Cover up to bond percentage of contract value", "Support for completion by a replacement contractor"],
            exclusions: ["Delays caused by the project owner", "Force majeure events as defined in the contract", "Defects covered under a separate warranty"],
            pricing_rules: { base_rate: 3500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "pecuniary-advance-payment-bond",
            name: "Advance Payment Bond",
            name_am: "የቅድሚያ ክፍያ ዋስትና",
            short_description: "Secures an advance payment made to a contractor before work begins.",
            short_description_am: "ስራ ከመጀመሩ በፊት ለተቋራጭ የተከፈለ ቅድሚያ ክፍያን ይጠብቃል።",
            full_description:
              "Guarantees repayment of an advance payment if the contractor fails to deliver the corresponding works or services as agreed.",
            full_description_am:
              "ተቋራጭ ስራውን ካልፈጸመ የተከፈለውን ቅድሚያ ገንዘብ መልሶ ለማግኘት ዋስትና ይሰጣል።",
            coverage_list: ["Recovery of unearned advance payment", "Reducing bond value as work progresses", "Cover tied to contract milestones"],
            exclusions: ["Advances not documented in the contract", "Owner-caused delays", "Amounts already offset by completed work"],
            pricing_rules: { base_rate: 2800 },
            cta_text: "Get a Quote",
          },
          {
            slug: "pecuniary-maintenance-bond",
            name: "Maintenance Bond",
            name_am: "የጥገና ዋስትና",
            short_description: "Guarantees defect-free performance during a project's maintenance period.",
            short_description_am: "በጥገና ወቅት ስራው ከጉድለት የፀዳ እንዲሆን ያረጋግጣል።",
            full_description:
              "Covers the project owner if defects appear during the defined maintenance or warranty period following project completion and the contractor fails to remedy them.",
            full_description_am:
              "ከግንባታ በኋላ ባለው የጥገና ወቅት ጉድለቶች ከተከሰቱ እና ተቋራጭ ካላስተካከለ ካሳ ይሰጣል።",
            coverage_list: ["Repair cost recovery for unremedied defects", "Cover through the defined maintenance period", "Third-party remediation support"],
            exclusions: ["Damage from normal wear and tear", "Defects from owner-directed changes", "Issues outside the maintenance period"],
            pricing_rules: { base_rate: 2200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "pecuniary-retention-bond",
            name: "Retention Bond",
            name_am: "የመያዣ ዋስትና",
            short_description: "Lets contractors receive retained payments early, backed by a bond guarantee.",
            short_description_am: "ተቋራጮች የተያዘውን ክፍያ ቀድመው እንዲያገኙ ያስችላል።",
            full_description:
              "Replaces cash retention withheld by the project owner, freeing up contractor cash flow while still guaranteeing the owner's protection against defects.",
            full_description_am:
              "ባለቤቱ የያዘውን ገንዘብ በዋስትና በመተካት ለተቋራጩ የገንዘብ ፍሰት ነፃነት ይሰጣል።",
            coverage_list: ["Release of retained cash to contractor", "Continued defect protection for owner", "Bond value tied to retention percentage"],
            exclusions: ["Disputes over underlying contract terms", "Retention not documented in the contract", "Claims after bond expiry"],
            pricing_rules: { base_rate: 2000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "pecuniary-supply-bond",
            name: "Supply Bond",
            name_am: "የአቅርቦት ዋስትና",
            short_description: "Guarantees a supplier will deliver goods according to a supply contract.",
            short_description_am: "አቅራቢ ዕቃውን በውሉ መሰረት እንደሚያቀርብ ያረጋግጣል።",
            full_description:
              "Protects a buyer if a supplier fails to deliver goods on time, in the agreed quantity, or to the agreed specification under a supply agreement.",
            full_description_am:
              "አቅራቢ ዕቃውን በተስማማው ጊዜ ወይም ጥራት ካላቀረበ ለገዢው ካሳ ይሰጣል።",
            coverage_list: ["Compensation for non-delivery", "Cover for late or partial delivery", "Cover up to bond percentage of contract value"],
            exclusions: ["Force majeure supply disruptions", "Buyer-caused delays", "Disputes over goods specification not in the contract"],
            pricing_rules: { base_rate: 2600 },
            cta_text: "Get a Quote",
          },
        ],
      },
      // 7. Liability Insurance
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
            exclusions: ["Employee injuries (see Workmen's Compensation)", "Intentional acts", "Contractual liability", "Professional advice errors"],
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
            slug: "liability-carriers",
            name: "Carrier's Liability",
            name_am: "የአጓጓዥ ተጠያቂነት ኢንሹራንስ",
            short_description: "Covers a transporter's legal liability for goods lost or damaged in their care.",
            short_description_am: "አጓጓዦችን ለተያዙ ዕቃዎች ጉዳት ተጠያቂነት ይሸፍናል።",
            full_description:
              "Protects freight operators and haulage companies against legal liability for loss or damage to customers' goods while under their care, custody, and control.",
            full_description_am:
              "የጭነት አጓጓዦችን ደንበኞቻቸው ላደራቸው ዕቃ ለሚደርስ ጉዳት ተጠያቂነት ይጠብቃል።",
            coverage_list: ["Liability for goods lost in transit", "Liability for goods damaged in transit", "Legal defense costs", "Cover across declared routes"],
            exclusions: ["Inherent vice of goods carried", "Inadequate packing by shipper", "Unlicensed or unauthorized carriers"],
            pricing_rules: { base_rate: 4000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "liability-directors-officers",
            name: "Directors' & Officers' Liability",
            name_am: "የዳይሬክተሮች እና ኃላፊዎች ተጠያቂነት ኢንሹራንስ",
            short_description: "Protects company leadership from personal liability for management decisions.",
            short_description_am: "የኩባንያ አመራሮችን ከግል ተጠያቂነት ይጠብቃል።",
            full_description:
              "Covers directors and senior officers against claims alleging wrongful acts, errors, or breaches of duty in the course of managing the company.",
            full_description_am:
              "ዳይሬክተሮችን እና ከፍተኛ ኃላፊዎችን ኩባንያውን በማስተዳደር ላይ ላደረጉት ውሳኔ ከሚነሳ ክስ ይጠብቃል።",
            coverage_list: ["Defense costs for wrongful act claims", "Damages awarded against directors", "Regulatory investigation costs", "Employment practices claims (optional rider)"],
            exclusions: ["Fraudulent or criminal acts", "Fines and penalties imposed by regulators", "Known claims before policy inception"],
            pricing_rules: { base_rate: 15000 },
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
          {
            slug: "liability-workmens-compensation",
            name: "Workmen's Compensation Insurance",
            name_am: "የሠራተኛ ካሳ ኢንሹራንስ",
            short_description: "Covers your legal liability to employees injured or disabled while at work.",
            short_description_am: "ሠራተኞች በስራ ላይ ለሚደርስባቸው ጉዳት ተጠያቂነት ይሸፍናል።",
            full_description:
              "Meets your statutory obligation to compensate employees for injury, disability, or death arising out of and in the course of their employment.",
            full_description_am:
              "ሠራተኞች በስራ ምክንያት ለሚደርስባቸው ጉዳት፣ ውለታ ወይም ሞት ካሳ የመስጠት የህግ ግዴታን ይሸፍናል።",
            coverage_list: ["Compensation for workplace injury", "Compensation for permanent disability", "Death benefit to dependents", "Medical expense reimbursement"],
            exclusions: ["Self-inflicted injury", "Injury while under influence at work", "Injury outside the course of employment"],
            pricing_rules: { base_rate: 3000 },
            cta_text: "Get a Quote",
          },
        ],
      },
      // 8. General Accident Insurance
      {
        name: "General Accident Insurance",
        name_am: "አጠቃላይ አደጋ ኢንሹራንስ",
        slug: "general-accident-insurance",
        icon: "Heart",
        children: [
          {
            slug: "personal-accident",
            name: "Personal Accident",
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
          {
            slug: "group-personal-accident",
            name: "Group Personal Accident",
            name_am: "የቡድን የግል አደጋ ኢንሹራንስ",
            short_description: "Bundled personal accident cover for a company's entire workforce.",
            short_description_am: "ለድርጅት ሁሉም ሠራተኞች የተጣመረ የግል አደጋ ሽፋን።",
            full_description:
              "Lets employers provide accidental death and disability cover to all staff under one master policy, with simplified enrollment and consistent benefit levels.",
            full_description_am:
              "አሰሪዎች ለሁሉም ሠራተኞች በአንድ ፖሊሲ ስር የአደጋ ሽፋን እንዲሰጡ ያስችላል።",
            coverage_list: ["Accidental death benefit per employee", "Permanent and temporary disability cover", "Simplified group enrollment", "Consistent benefit tiers by role"],
            exclusions: ["Self-inflicted injury", "Injury while under influence", "Employees below minimum group size", "Hazardous sports (unless declared)"],
            pricing_rules: { base_rate: 700 },
            cta_text: "Cover Your Team",
          },
        ],
      },
      // 9. Political Violence and Terrorism (leaf)
      {
        name: "Political Violence and Terrorism (PVT)",
        name_am: "የፖለቲካ ሁከት እና ሽብርተኝነት ኢንሹራንስ",
        slug: "political-violence-terrorism",
        icon: "Shield",
        leaf: {
          name: "Political Violence and Terrorism (PVT)",
          name_am: "የፖለቲካ ሁከት እና ሽብርተኝነት ኢንሹራንስ",
          short_description: "Covers property damage and business interruption caused by riot, strike, or terrorism.",
          short_description_am: "በሁከት፣ በአድማ ወይም በሽብር ምክንያት ለሚደርስ ጉዳት ይሸፍናል።",
          full_description:
            "Fills the gap left by standard property policies, covering physical damage and resulting business interruption caused by riot, civil commotion, strikes, malicious damage, and acts of terrorism.",
          full_description_am:
            "በተለመደው የንብረት ፖሊሲ ያልተሸፈኑ ከሁከት፣ ከአድማ እና ከሽብር ጥቃት የሚደርሱ ጉዳቶችን ይሸፍናል።",
          coverage_list: ["Riot and civil commotion damage", "Strike-related damage", "Malicious damage", "Terrorism physical damage", "Resulting business interruption"],
          exclusions: ["War between named states", "Nuclear risks", "Confiscation by government authority", "Cyberterrorism without physical damage"],
          pricing_rules: { base_rate: 5000 },
          cta_text: "Get a Quote",
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // 2. MEDICAL INSURANCE
  // ════════════════════════════════════════════════════════════════════
  {
    name: "Medical Insurance",
    name_am: "የጤና ኢንሹራንስ",
    slug: "medical-insurance",
    subcategories: [
      // 1. Individual Medical Insurance
      {
        name: "Individual Medical Insurance",
        name_am: "የግል የጤና ኢንሹራንስ",
        slug: "individual-medical-insurance",
        icon: "Heart",
        leaf: {
          name: "Individual Medical Insurance",
          name_am: "የግል የጤና ኢንሹራንስ",
          short_description: "Flexible healthcare cover for individuals, from essential care to premium medical benefits.",
          short_description_am: "ለግለሰቦች የተዘጋጀ ተለዋዋጭ የጤና ሽፋን።",
          full_description:
            "Individual Medical Insurance gives single policyholders access to reliable healthcare protection, with options for hospitalization, outpatient consultations, emergency treatment, specialist care, diagnostics, and higher-limit benefits based on their needs.",
          full_description_am:
            "የግል የጤና ኢንሹራንስ ለግለሰቦች የሆስፒታል፣ የውጭ ታካሚ፣ ድንገተኛ ሕክምና፣ ስፔሻሊስት እና የምርመራ ሽፋን ይሰጣል።",
          coverage_list: ["Inpatient hospitalization", "Outpatient consultations", "Emergency treatment", "Specialist referrals", "Diagnostic tests", "Prescription medication"],
          exclusions: ["Cosmetic procedures", "Undeclared pre-existing conditions", "Experimental treatment", "Non-medical elective services"],
          pricing_rules: { base_rate: 1200 },
          cta_text: "Get a Quote",
        },
        children: [
          {
            slug: "individual-bronze",
            name: "Bronze Plan",
            name_am: "ብሮንዝ እቅድ",
            short_description: "Essential healthcare cover for individuals who want reliable, affordable protection.",
            short_description_am: "ተመጣጣኝ እና አስተማማኝ መሰረታዊ የጤና ሽፋን።",
            full_description:
              "An entry-level plan covering essential hospitalization and emergency care, giving individuals a dependable healthcare safety net at an accessible price.",
            full_description_am:
              "መሰረታዊ የሆስፒታል እና የአደጋ ጊዜ እንክብካቤን የሚሸፍን የመግቢያ ደረጃ እቅድ።",
            coverage_list: ["Inpatient hospitalization", "Emergency treatment", "Basic diagnostic tests", "Prescription medication (inpatient)"],
            exclusions: ["Outpatient specialist consultations", "Cosmetic procedures", "Pre-existing conditions (waiting period)", "Dental and optical care"],
            pricing_rules: { base_rate: 1200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "individual-silver",
            name: "Silver Plan",
            name_am: "ሲልቨር እቅድ",
            short_description: "Enhanced outpatient and specialist cover on top of essential hospitalization.",
            short_description_am: "ከመሰረታዊ ሽፋን በተጨማሪ የተሻሻለ የውጭ ታካሚ እና ስፔሻሊስት ሽፋን።",
            full_description:
              "Builds on essential cover with outpatient consultations, specialist referrals, and expanded diagnostics — suited to individuals who want more comprehensive day-to-day healthcare access.",
            full_description_am:
              "ከሆስፒታል ሽፋን በተጨማሪ የውጭ ታካሚ ምክክር እና የስፔሻሊስት ሪፈራል ያካትታል።",
            coverage_list: ["Inpatient hospitalization", "Outpatient consultations", "Specialist referrals", "Expanded diagnostic tests", "Prescription medication"],
            exclusions: ["Cosmetic procedures", "Pre-existing conditions (waiting period)", "Elective overseas treatment", "Fertility treatment"],
            pricing_rules: { base_rate: 2000 },
            cta_text: "Get a Quote",
          },
          {
            slug: "individual-gold",
            name: "Gold Plan",
            name_am: "ጎልድ እቅድ",
            short_description: "Comprehensive inpatient and outpatient cover for individuals who want fuller protection.",
            short_description_am: "የተሟላ የሆስፒታል እና የውጭ ታካሚ ሽፋን።",
            full_description:
              "A comprehensive plan combining full inpatient care, outpatient consultations, and preventive checkups, designed for individuals who want peace of mind across most healthcare needs.",
            full_description_am:
              "የተሟላ የሆስፒታል እንክብካቤ፣ የውጭ ታካሚ ምክክር እና የመከላከያ ምርመራ ያካትታል።",
            coverage_list: ["Full inpatient hospitalization", "Outpatient consultations", "Preventive health checkups", "Diagnostic imaging and lab tests", "Prescription medication"],
            exclusions: ["Cosmetic procedures", "Pre-existing conditions (limited waiting period)", "Experimental treatment", "Fertility treatment"],
            pricing_rules: { base_rate: 3200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "individual-platinum",
            name: "Platinum Plan",
            name_am: "ፕላቲኒየም እቅድ",
            short_description: "Premium healthcare cover with higher limits and expanded specialist access.",
            short_description_am: "ከፍተኛ ገደብ እና የተሻለ የስፔሻሊስት ተደራሽነት ያለው ፕሪሚየም ሽፋን።",
            full_description:
              "A premium tier offering higher annual limits, broader specialist and diagnostic access, and priority scheduling at leading facilities across Ethiopia.",
            full_description_am:
              "ከፍተኛ ዓመታዊ ገደብ እና ሰፊ የስፔሻሊስት ተደራሽነት የሚሰጥ ፕሪሚየም ደረጃ።",
            coverage_list: ["Higher annual benefit limits", "Priority appointment scheduling", "Broader specialist network", "Advanced diagnostic imaging", "Private room hospitalization"],
            exclusions: ["Cosmetic procedures (non-reconstructive)", "Pre-existing conditions (short waiting period)", "Experimental treatment"],
            pricing_rules: { base_rate: 4800 },
            cta_text: "Get a Quote",
          },
          {
            slug: "individual-executive",
            name: "Executive Plan",
            name_am: "ኤክስኪዩቲቭ እቅድ",
            short_description: "VIP healthcare and international benefits for individuals who want the very best.",
            short_description_am: "ለከፍተኛ ደረጃ የቪአይፒ የጤና እንክብካቤ እና ዓለም አቀፍ ጥቅማ ጥቅሞች።",
            full_description:
              "The top individual tier, combining VIP local healthcare access with international treatment benefits and emergency evacuation for the most demanding coverage needs.",
            full_description_am:
              "የቪአይፒ የአገር ውስጥ የጤና ተደራሽነት ከዓለም አቀፍ ህክምና ጥቅማ ጥቅም ጋር ያጣምራል።",
            coverage_list: ["VIP hospital access", "International treatment benefit", "Emergency medical evacuation", "Dedicated case management", "Annual executive health screening"],
            exclusions: ["Cosmetic procedures (non-reconstructive)", "War zone travel under advisory", "Non-declared pre-existing conditions"],
            pricing_rules: { base_rate: 9500 },
            cta_text: "Get a Quote",
          },
        ],
      },
      // 2. Family Medical Insurance
      {
        name: "Family Medical Insurance",
        name_am: "የቤተሰብ የጤና ኢንሹራንስ",
        slug: "family-medical-insurance",
        icon: "Heart",
        leaf: {
          name: "Family Medical Insurance",
          name_am: "የቤተሰብ የጤና ኢንሹራንስ",
          short_description: "Shared medical protection for spouses, children, and household members under one policy.",
          short_description_am: "ለቤተሰብ አባላት በአንድ ፖሊሲ የሚሰጥ የጤና ሽፋን።",
          full_description:
            "Family Medical Insurance combines healthcare benefits for the insured member, spouse, and children under one coordinated policy, helping households manage hospitalization, outpatient care, maternity needs, pediatric wellness, and emergency treatment.",
          full_description_am:
            "የቤተሰብ የጤና ኢንሹራንስ ለተሸፈነው ሰው፣ ለትዳር ጋደኛ እና ለልጆች የሆስፒታል፣ የውጭ ታካሚ፣ የወሊድ እና ድንገተኛ ሕክምና ሽፋን ይሰጣል።",
          coverage_list: ["Hospitalization for covered family members", "Outpatient consultations", "Emergency treatment", "Maternity options", "Child wellness and vaccination", "Shared annual benefit management"],
          exclusions: ["Cosmetic procedures", "Undeclared pre-existing conditions", "Fertility treatment unless included", "Experimental treatment"],
          pricing_rules: { base_rate: 2800 },
          cta_text: "Get a Quote",
        },
        children: [
          {
            slug: "family-bronze",
            name: "Family Bronze",
            name_am: "የቤተሰብ ብሮንዝ",
            short_description: "Essential healthcare cover for the insured member, spouse, and children.",
            short_description_am: "ለተሸፈነው ሰው፣ ለትዳር ጓደኛ እና ለልጆች መሰረታዊ ሽፋን።",
            full_description:
              "An entry-level family plan covering essential hospitalization for the insured member, spouse, and children under one shared policy.",
            full_description_am:
              "ለተሸፈነው ቤተሰብ አባል፣ ለትዳር ጓደኛ እና ለልጆች መሰረታዊ የሆስፒታል ሽፋን የሚሰጥ እቅድ።",
            coverage_list: ["Inpatient hospitalization for all members", "Emergency treatment", "Basic diagnostic tests", "Prescription medication (inpatient)"],
            exclusions: ["Outpatient specialist consultations", "Maternity (see optional rider)", "Pre-existing conditions (waiting period)", "Dental and optical care"],
            pricing_rules: { base_rate: 2800 },
            cta_text: "Get a Quote",
          },
          {
            slug: "family-silver",
            name: "Family Silver",
            name_am: "የቤተሰብ ሲልቨር",
            short_description: "Enhanced outpatient cover for the whole household under a shared benefit pool.",
            short_description_am: "ለመላው ቤተሰብ የተሻሻለ የውጭ ታካሚ ሽፋን።",
            full_description:
              "Extends essential family cover with outpatient consultations and pediatric care, so the whole household has access to more than emergency care alone.",
            full_description_am:
              "ከመሰረታዊ ሽፋን በተጨማሪ የውጭ ታካሚ ምክክር እና የህጻናት እንክብካቤ ያካትታል።",
            coverage_list: ["Inpatient hospitalization for all members", "Outpatient consultations", "Pediatric care", "Expanded diagnostic tests"],
            exclusions: ["Maternity (see optional rider)", "Pre-existing conditions (waiting period)", "Fertility treatment", "Cosmetic procedures"],
            pricing_rules: { base_rate: 3800 },
            cta_text: "Get a Quote",
          },
          {
            slug: "family-gold",
            name: "Family Gold",
            name_am: "የቤተሰብ ጎልድ",
            short_description: "Comprehensive inpatient and outpatient cover with maternity benefits included.",
            short_description_am: "የወሊድ ጥቅማ ጥቅም ያካተተ የተሟላ የቤተሰብ ሽፋን።",
            full_description:
              "A comprehensive family plan bundling maternity benefits, pediatric wellness visits, and full inpatient and outpatient cover with a shared annual limit that simplifies budgeting.",
            full_description_am:
              "የወሊድ ጥቅማ ጥቅም፣ የህጻናት ምርመራ እና የተሟላ የሆስፒታል ሽፋን ያካትታል።",
            coverage_list: ["Full inpatient and outpatient cover", "Maternity and newborn care", "Pediatric wellness visits", "Shared annual benefit limit"],
            exclusions: ["Cosmetic procedures", "Pre-existing conditions (limited waiting period)", "Fertility treatment", "Experimental treatment"],
            pricing_rules: { base_rate: 5600 },
            cta_text: "Get a Quote",
          },
          {
            slug: "family-platinum",
            name: "Family Platinum",
            name_am: "የቤተሰብ ፕላቲኒየም",
            short_description: "Premium family healthcare with higher limits and priority specialist access.",
            short_description_am: "ከፍተኛ ገደብ ያለው ፕሪሚየም የቤተሰብ የጤና ሽፋን።",
            full_description:
              "A premium family tier with higher annual limits, priority scheduling, and broader specialist and diagnostic access for every member of the household.",
            full_description_am:
              "ለቤተሰብ አባላት ሁሉ ከፍተኛ ገደብ እና የስፔሻሊስት ተደራሽነት ያለው ፕሪሚየም ደረጃ።",
            coverage_list: ["Higher annual benefit limits", "Priority appointment scheduling", "Maternity and newborn care", "Private room hospitalization", "Broader specialist network"],
            exclusions: ["Cosmetic procedures (non-reconstructive)", "Pre-existing conditions (short waiting period)", "Experimental treatment"],
            pricing_rules: { base_rate: 8200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "family-executive",
            name: "Family Executive",
            name_am: "የቤተሰብ ኤክስኪዩቲቭ",
            short_description: "VIP family healthcare with international treatment benefits and evacuation cover.",
            short_description_am: "ለቤተሰብ የቪአይፒ የጤና እንክብካቤ እና ዓለም አቀፍ ህክምና ጥቅማ ጥቅም።",
            full_description:
              "The top family tier, giving the whole household VIP local access plus international treatment and emergency evacuation benefits for peace of mind wherever life takes you.",
            full_description_am:
              "ለመላው ቤተሰብ የቪአይፒ እንክብካቤ ከዓለም አቀፍ ህክምና ጥቅማ ጥቅም ጋር ያጣምራል።",
            coverage_list: ["VIP hospital access for all members", "International treatment benefit", "Emergency medical evacuation", "Dedicated family case management", "Annual executive health screening"],
            exclusions: ["Cosmetic procedures (non-reconstructive)", "War zone travel under advisory", "Non-declared pre-existing conditions"],
            pricing_rules: { base_rate: 15000 },
            cta_text: "Get a Quote",
          },
        ],
      },
      // 3. Corporate Medical Insurance
      {
        name: "Corporate Medical Insurance",
        name_am: "የድርጅት የጤና ኢንሹራንስ",
        slug: "corporate-medical-insurance",
        icon: "Briefcase",
        leaf: {
          name: "Corporate Medical Insurance",
          name_am: "የድርጅት የጤና ኢንሹራንስ",
          short_description: "Group medical cover for businesses, teams, and organizations of different sizes.",
          short_description_am: "ለድርጅቶች እና ለሠራተኞች የሚሰጥ የቡድን የጤና ሽፋን።",
          full_description:
            "Corporate Medical Insurance helps employers provide structured healthcare benefits for employees and eligible dependents, with options for group hospitalization, outpatient care, wellness programs, account management, and tiered benefits for different staff levels.",
          full_description_am:
            "የድርጅት የጤና ኢንሹራንስ ለሠራተኞች እና ለቤተሰቦቻቸው የቡድን የሆስፒታል፣ የውጭ ታካሚ፣ የደህንነት ፕሮግራም እና በደረጃ የተከፋፈለ ጥቅም ይሰጣል።",
          coverage_list: ["Group hospitalization cover", "Outpatient consultations", "Dependents cover options", "Employee wellness programs", "Tiered staff benefits", "Dedicated account support"],
          exclusions: ["Pre-existing conditions during waiting periods", "Cosmetic procedures", "Employees outside agreed eligibility", "Elective overseas treatment unless authorized"],
          pricing_rules: { base_rate: 1800 },
          cta_text: "Cover Your Team",
        },
        children: [
          {
            slug: "corporate-sme",
            name: "SME Health Plan",
            name_am: "የአነስተኛና መካከለኛ ንግድ የጤና እቅድ",
            short_description: "Affordable group medical cover sized for small and medium-sized businesses.",
            short_description_am: "ለአነስተኛ እና መካከለኛ ንግዶች የተመጣጠነ የቡድን የጤና ሽፋን።",
            full_description:
              "Gives small and medium-sized teams access to quality healthcare without enterprise-level costs, with simple enrollment and administration.",
            full_description_am:
              "ሠራተኞችዎ ያለ ከፍተኛ ወጪ ጥራት ያለው የጤና እንክብካቤ እንዲያገኙ የሚያስችል የቡድን ፖሊሲ።",
            coverage_list: ["Group hospitalization cover", "Outpatient consultations", "Simple enrollment and administration", "Optional dependents cover"],
            exclusions: ["Pre-existing conditions (waiting period)", "Cosmetic procedures", "Employees below minimum group size", "Elective non-emergency procedures abroad"],
            pricing_rules: { base_rate: 1800 },
            cta_text: "Cover Your Team",
          },
          {
            slug: "corporate-bronze",
            name: "Corporate Bronze",
            name_am: "የድርጅት ብሮንዝ",
            short_description: "Essential group medical cover for organizations of any size.",
            short_description_am: "ለማንኛውም መጠን ድርጅቶች መሰረታዊ የቡድን የጤና ሽፋን።",
            full_description:
              "An entry-level corporate plan providing dependable group hospitalization cover, ideal for organizations building out their first employee health benefit.",
            full_description_am:
              "ድርጅቶች የመጀመሪያ የሠራተኛ የጤና ጥቅማ ጥቅም ለመስጠት ተስማሚ የቡድን ፖሊሲ።",
            coverage_list: ["Group hospitalization cover", "Emergency treatment", "Basic diagnostic tests", "Simple claims administration"],
            exclusions: ["Outpatient specialist consultations", "Pre-existing conditions (waiting period)", "Cosmetic procedures"],
            pricing_rules: { base_rate: 2500 },
            cta_text: "Cover Your Team",
          },
          {
            slug: "corporate-silver",
            name: "Corporate Silver",
            name_am: "የድርጅት ሲልቨር",
            short_description: "Enhanced group cover with outpatient benefits for growing organizations.",
            short_description_am: "ለሚያድጉ ድርጅቶች የተሻሻለ የውጭ ታካሚ ጥቅማ ጥቅም ያለው የቡድን ሽፋን።",
            full_description:
              "Adds outpatient consultations and expanded diagnostics to essential group cover, supporting organizations that want a stronger benefits package for staff.",
            full_description_am:
              "ከመሰረታዊ ሽፋን በተጨማሪ የውጭ ታካሚ ምክክር ላደረጉ ድርጅቶች ተስማሚ።",
            coverage_list: ["Group hospitalization cover", "Outpatient consultations", "Expanded diagnostic tests", "Tiered benefits by staff level"],
            exclusions: ["Pre-existing conditions (waiting period)", "Cosmetic procedures", "Fertility treatment"],
            pricing_rules: { base_rate: 3400 },
            cta_text: "Cover Your Team",
          },
          {
            slug: "corporate-gold",
            name: "Corporate Gold",
            name_am: "የድርጅት ጎልድ",
            short_description: "Comprehensive group healthcare with tiered benefits by staff level.",
            short_description_am: "በደረጃ የተከፋፈሉ ጥቅማ ጥቅሞች ያሉት አጠቃላይ የቡድን ሽፋን።",
            full_description:
              "Enterprise-grade group medical cover with tiered benefit structures by staff level and a negotiated provider network, built for organizations with growing workforce needs.",
            full_description_am:
              "በደረጃ የተከፋፈሉ ጥቅማ ጥቅሞች ያሉት፣ ለድርጅቶች የተዘጋጀ ጠንካራ የቡድን ኢንሹራንስ።",
            coverage_list: ["Tiered benefits by staff grade", "Negotiated hospital network", "Dependents and family extension", "Preventive care programs"],
            exclusions: ["Pre-existing conditions (waiting period)", "Cosmetic procedures", "Non-network elective treatment (unless authorized)"],
            pricing_rules: { base_rate: 4800 },
            cta_text: "Talk to Our Corporate Team",
          },
          {
            slug: "corporate-platinum",
            name: "Corporate Platinum",
            name_am: "የድርጅት ፕላቲኒየም",
            short_description: "Premium group healthcare with higher limits and dedicated account management.",
            short_description_am: "ከፍተኛ ገደብ እና ልዩ የአካውንት አስተዳደር ያለው ፕሪሚየም የቡድን ሽፋን።",
            full_description:
              "A premium corporate tier offering higher annual limits, dedicated account management, and wellness programs for organizations that prioritize employee wellbeing.",
            full_description_am:
              "ከፍተኛ ዓመታዊ ገደብ እና የሠራተኛ ደህንነት ፕሮግራሞች ያለው ፕሪሚየም ደረጃ።",
            coverage_list: ["Higher annual benefit limits", "Dedicated account management", "Wellness and preventive care programs", "Priority appointment scheduling"],
            exclusions: ["Pre-existing conditions (short waiting period)", "Cosmetic procedures (non-reconstructive)", "Experimental treatment"],
            pricing_rules: { base_rate: 6500 },
            cta_text: "Talk to Our Corporate Team",
          },
          {
            slug: "corporate-executive",
            name: "Corporate Executive",
            name_am: "የድርጅት ኤክስኪዩቲቭ",
            short_description: "VIP executive healthcare with international benefits for senior leadership teams.",
            short_description_am: "ለከፍተኛ አመራሮች የቪአይፒ የጤና ሽፋን እና ዓለም አቀፍ ጥቅማ ጥቅም።",
            full_description:
              "Designed for senior leadership and key personnel, combining VIP local healthcare access with international treatment benefits and annual executive health screening.",
            full_description_am:
              "ለከፍተኛ አመራሮች እና ቁልፍ ሠራተኞች የተዘጋጀ የቪአይፒ እና ዓለም አቀፍ ጥቅማ ጥቅም ያለው ደረጃ።",
            coverage_list: ["VIP hospital access", "International treatment benefit", "Annual executive health screening", "Dedicated case management", "Emergency medical evacuation"],
            exclusions: ["Cosmetic procedures (non-reconstructive)", "War zone travel under advisory", "Non-declared pre-existing conditions"],
            pricing_rules: { base_rate: 12000 },
            cta_text: "Talk to Our Corporate Team",
          },
        ],
      },
      // 4. Specialized Medical Insurance
      {
        name: "Specialized Medical Insurance",
        name_am: "ልዩ የጤና ኢንሹራንስ",
        slug: "specialized-medical-insurance",
        icon: "Shield",
        leaf: {
          name: "Specialized Medical Insurance",
          name_am: "ልዩ የጤና ኢንሹራንስ",
          short_description: "Focused health cover for specific life stages, conditions, travel needs, and communities.",
          short_description_am: "ለተለያዩ የጤና ፍላጎቶች የተዘጋጀ ልዩ ሽፋን።",
          full_description:
            "Specialized Medical Insurance provides targeted health protection for specific needs such as maternal and child health, senior care, student health, chronic disease management, travel medical emergencies, and affordable micro health coverage.",
          full_description_am:
            "ልዩ የጤና ኢንሹራንስ ለወሊድ እና ሕፃናት፣ ለአዛውንቶች፣ ለተማሪዎች፣ ለዘላቂ በሽታ፣ ለጉዞ ሕክምና እና ለጥቃቅን የጤና ሽፋን ይሰጣል።",
          coverage_list: ["Maternal and child health options", "Senior health cover", "Student health cover", "Chronic disease care", "Travel medical protection", "Micro health insurance"],
          exclusions: ["Cosmetic procedures", "Undeclared pre-existing conditions", "Treatment outside selected benefit scope", "Experimental treatment"],
          pricing_rules: { base_rate: 900 },
          cta_text: "Get a Quote",
        },
        children: [
          {
            slug: "maternal-child-health",
            name: "Maternal & Child Health Insurance",
            name_am: "የእናቶች እና ህጻናት ጤና ኢንሹራንስ",
            short_description: "Targeted cover for maternity, newborn care, and early childhood health needs.",
            short_description_am: "ለወሊድ፣ ለአራስ እንክብካቤ እና ለልጅነት ጤና የተዘጋጀ ሽፋን።",
            full_description:
              "A focused plan covering prenatal checkups, delivery, newborn care, and early childhood vaccinations — built for growing families who want dedicated maternal health support.",
            full_description_am:
              "የቅድመ ወሊድ ምርመራ፣ ወሊድ እና የአራስ እንክብካቤን የሚሸፍን ልዩ እቅድ።",
            coverage_list: ["Prenatal and postnatal checkups", "Delivery costs (normal and C-section)", "Newborn care", "Childhood vaccinations"],
            exclusions: ["Elective fertility treatment", "Pregnancies conceived before policy inception", "Cosmetic procedures"],
            pricing_rules: { base_rate: 4500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "senior-citizen-health",
            name: "Senior Citizen Health Insurance",
            name_am: "የአዛውንት ጤና ኢንሹራንስ",
            short_description: "Healthcare cover tailored to the needs of older adults.",
            short_description_am: "ለአዛውንቶች ፍላጎት የተዘጋጀ የጤና ሽፋን።",
            full_description:
              "Designed around the healthcare realities of older age — covering hospitalization, chronic condition management, and regular health monitoring with age-appropriate benefit design.",
            full_description_am:
              "ከዕድሜ ጋር ተያያዥነት ላላቸው የጤና ፍላጎቶች የተዘጋጀ ሽፋን።",
            coverage_list: ["Inpatient hospitalization", "Chronic condition management", "Regular health monitoring", "Prescription medication"],
            exclusions: ["Cosmetic procedures", "Pre-existing conditions beyond declared list", "Experimental treatment"],
            pricing_rules: { base_rate: 5200 },
            cta_text: "Get a Quote",
          },
          {
            slug: "student-health",
            name: "Student Health Insurance",
            name_am: "የተማሪ ጤና ኢንሹራንስ",
            short_description: "Affordable healthcare cover for students studying locally or abroad.",
            short_description_am: "ለተማሪዎች ተመጣጣኝ የጤና ሽፋን።",
            full_description:
              "Budget-friendly cover for students, providing hospitalization and outpatient access during term time — with options for study-abroad medical benefits.",
            full_description_am:
              "ለተማሪዎች ተስማሚ የሆስፒታል እና የውጭ ታካሚ ሽፋን የሚሰጥ ተመጣጣኝ እቅድ።",
            coverage_list: ["Inpatient hospitalization", "Outpatient consultations", "Emergency treatment", "Study-abroad medical benefit (optional rider)"],
            exclusions: ["Pre-existing conditions (waiting period)", "Cosmetic procedures", "Non-emergency elective treatment abroad"],
            pricing_rules: { base_rate: 900 },
            cta_text: "Get a Quote",
          },
          {
            slug: "chronic-disease-care",
            name: "Chronic Disease Care Plan",
            name_am: "የዘላቂ በሽታ እንክብካቤ እቅድ",
            short_description: "Ongoing management cover for diabetes, hypertension, and other chronic conditions.",
            short_description_am: "ለስኳር በሽታ፣ ለደም ግፊት እና ለሌሎች ዘላቂ በሽታዎች የተከታታይ እንክብካቤ ሽፋን።",
            full_description:
              "Supports individuals living with chronic conditions through regular monitoring, medication cover, and specialist follow-ups designed for long-term disease management.",
            full_description_am:
              "ዘላቂ በሽታ ላለባቸው ግለሰቦች መደበኛ ክትትል እና የመድሃኒት ሽፋን ይሰጣል።",
            coverage_list: ["Regular condition monitoring", "Chronic medication cover", "Specialist follow-up visits", "Diagnostic tests related to the condition"],
            exclusions: ["Conditions diagnosed after a lapse in cover", "Complications from non-adherence to treatment", "Experimental treatment"],
            pricing_rules: { base_rate: 3600 },
            cta_text: "Get a Quote",
          },
          {
            slug: "travel-medical-insurance",
            name: "Travel Medical Insurance",
            name_am: "የጉዞ ህክምና ኢንሹራንስ",
            short_description: "Medical cover for illness or injury while traveling domestically or abroad.",
            short_description_am: "በአገር ውስጥ ወይም በውጭ ጉዞ ወቅት ለሚደርስ ህመም ወይም ጉዳት ሽፋን።",
            full_description:
              "Covers emergency medical treatment, hospitalization, and evacuation while traveling, giving travelers protection outside their usual healthcare network.",
            full_description_am:
              "በጉዞ ወቅት ለሚያስፈልግ ድንገተኛ ህክምና እና ሆስፒታል ገቢነት ሽፋን ይሰጣል።",
            coverage_list: ["Emergency medical treatment abroad", "Hospitalization while traveling", "Emergency medical evacuation", "Trip-related illness cover"],
            exclusions: ["Pre-existing conditions (unless declared)", "Elective treatment against medical advice", "War zones under travel advisory"],
            pricing_rules: { base_rate: 1500 },
            cta_text: "Get a Quote",
          },
          {
            slug: "micro-health-insurance",
            name: "Micro Health Insurance",
            name_am: "ጥቃቅን የጤና ኢንሹራንስ",
            short_description: "Low-cost basic health cover designed for low-income individuals and families.",
            short_description_am: "ለዝቅተኛ ገቢ ግለሰቦች እና ቤተሰቦች የተዘጋጀ ዝቅተኛ ዋጋ ያለው መሰረታዊ የጤና ሽፋን።",
            full_description:
              "Essential health cover at a price point accessible to low-income households — basic hospitalization and outpatient benefits with simple enrollment through community groups and mobile channels.",
            full_description_am:
              "ለዝቅተኛ ገቢ ቤተሰቦች ተደራሽ በሆነ ዋጋ የመሰረታዊ ሆስፒታል እና የውጭ ታካሚ ጥቅማ ጥቅሞችን ይሰጣል።",
            coverage_list: ["Basic hospitalization cover", "Outpatient consultations", "Maternity basic benefit", "Mobile-based premium payment"],
            exclusions: ["Chronic pre-existing conditions", "Elective procedures", "Treatment outside network", "Cosmetic procedures"],
            pricing_rules: { base_rate: 250 },
            cta_text: "Get Affordable Cover",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // 3. OTHERS INSURANCE
  // ════════════════════════════════════════════════════════════════════
  {
    name: "Others Insurance",
    name_am: "ሌሎች ኢንሹራንስ",
    slug: "others-insurance",
    subcategories: [
      {
        name: "All Risk Insurance",
        name_am: "ሁሉንም አደጋ ኢንሹራንስ",
        slug: "all-risk-insurance",
        icon: "Shield",
        leaf: {
          name: "All Risk Insurance",
          name_am: "ሁሉንም አደጋ ኢንሹራንስ",
          short_description: "Broad protection for valuable portable items against loss, theft, or accidental damage.",
          short_description_am: "ውድ ተንቀሳቃሽ ዕቃዎችን ከኪሳራ፣ ከስርቆት ወይም ከድንገተኛ ጉዳት ይጠብቃል።",
          full_description:
            "Covers laptops, cameras, jewelry, and other valuable portable items against loss, theft, or accidental damage — wherever you take them, in Ethiopia or abroad.",
          full_description_am:
            "ላፕቶፖችን፣ ካሜራዎችን እና ጌጣጌጦችን ከኪሳራ ወይም ከድንገተኛ ጉዳት ይጠብቃል።",
          coverage_list: ["Worldwide accidental damage cover", "Theft and loss cover", "Portable electronics and jewelry", "New-for-old replacement (optional rider)"],
          exclusions: ["Wear and tear", "Unattended items in public places", "Mysterious disappearance without evidence", "Items not individually declared"],
          pricing_rules: { base_rate: 1500 },
          cta_text: "Get a Quote",
        },
      },
      {
        name: "Plate Glass",
        name_am: "የመስታወት ኢንሹራንስ",
        slug: "plate-glass-insurance",
        icon: "Home",
        leaf: {
          name: "Plate Glass",
          name_am: "የመስታወት ኢንሹራንስ",
          short_description: "Covers accidental breakage of fixed glass in shopfronts, windows, and display cases.",
          short_description_am: "በሱቅ ፊት እና በመስኮት ላይ ላለ መስታወት ድንገተኛ ስብራት ይሸፍናል።",
          full_description:
            "Protects retailers and property owners against the cost of replacing fixed plate glass in shopfronts, windows, and display cabinets following accidental breakage.",
          full_description_am:
            "ነጋዴዎችን እና ንብረት ባለቤቶችን ለተሰበረ የመስታወት መተኪያ ወጪ ይጠብቃል።",
          coverage_list: ["Accidental breakage of fixed glass", "Replacement and reinstallation costs", "Temporary boarding-up costs", "Signage glass cover (optional rider)"],
          exclusions: ["Breakage during installation or removal", "War and terrorism", "Pre-existing cracks at inception"],
          pricing_rules: { base_rate: 800 },
          cta_text: "Get a Quote",
        },
      },
      {
        name: "Horticulture",
        name_am: "የአትክልት ኢንሹራንስ",
        slug: "horticulture-insurance",
        icon: "Home",
        leaf: {
          name: "Horticulture",
          name_am: "የአትክልት ኢንሹራንስ",
          short_description: "Covers greenhouse crops, nurseries, and horticultural structures against loss.",
          short_description_am: "የግሪንሀውስ ሰብሎችን እና የአትክልት ማከፋፈያዎችን ይጠብቃል።",
          full_description:
            "Protects flower farms, greenhouses, and nurseries against crop and structural loss from fire, storm, hail, and other insured perils affecting horticultural operations.",
          full_description_am:
            "የአበባ እርሻዎችን እና ግሪንሀውሶችን ከእሳት፣ ከማዕበል እና ከበረዶ ጉዳት ይጠብቃል።",
          coverage_list: ["Greenhouse structure damage", "Crop loss from fire and storm", "Hail damage cover", "Irrigation equipment cover (optional rider)"],
          exclusions: ["Disease or pest infestation (unless rider purchased)", "Poor cultivation practices", "Gradual deterioration"],
          pricing_rules: { base_rate: 6000 },
          cta_text: "Get a Quote",
        },
      },
      {
        name: "Travel Insurance",
        name_am: "የጉዞ ኢንሹራንስ",
        slug: "travel-insurance",
        icon: "Plane",
        leaf: {
          name: "Travel Insurance",
          name_am: "የጉዞ ኢንሹራንስ",
          short_description: "Trip protection covering medical emergencies, cancellations, and lost baggage.",
          short_description_am: "የጉዞ ስረዛ፣ የጠፋ ሻንጣ እና የድንገተኛ ህክምና ሽፋን ይሸፍናል።",
          full_description:
            "All-round protection for domestic and international trips — covering emergency medical costs, trip cancellation, delayed or lost baggage, and travel-related liability.",
          full_description_am:
            "ለአገር ውስጥ እና ለውጭ ጉዞ ድንገተኛ ህክምና፣ ስረዛ እና የሻንጣ ኪሳራ ሽፋን ይሰጣል።",
          coverage_list: ["Emergency medical expenses", "Trip cancellation and interruption", "Lost or delayed baggage", "Personal liability while traveling", "Flight delay compensation"],
          exclusions: ["Pre-existing conditions (unless declared)", "Travel against government advisory", "Extreme sports (unless rider purchased)"],
          pricing_rules: { base_rate: 1200 },
          cta_text: "Get a Quote",
        },
      },
      {
        name: "Aviation",
        name_am: "የአቪዬሽን ኢንሹራንስ",
        slug: "aviation-insurance",
        icon: "Plane",
        leaf: {
          name: "Aviation",
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
            icon: sub.icon,
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
