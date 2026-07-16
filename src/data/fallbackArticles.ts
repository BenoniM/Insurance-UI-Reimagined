export interface FallbackArticle {
  slug: string;
  title: string;
  title_am: string;
  intro: string;
  intro_am: string;
  content: string;
  content_am: string;
  category: string;
  author: string;
  created_at: string;
  published: boolean;
}

export const FALLBACK_ARTICLES: FallbackArticle[] = [
  {
    slug: "understanding-life-insurance-in-ethiopia",
    title: "Understanding Life Insurance in Ethiopia",
    title_am: "በኢትዮጵያ ውስጥ የሕይወት ኢንሹራንስን መረዳት",
    intro:
      "A comprehensive guide to choosing the right life insurance plan for your family needs and financial goals.",
    intro_am:
      "ለቤተሰብዎ ፍላጎቶች እና ፋይናንሺያል ግቦች ትክክለኛውን የሕይወት ኢንሹራንስ ዕቅድ ለመምረጥ ሁሉን አቀፍ መመሪያ።",
    content: `Life insurance is one of the most important financial tools available to Ethiopian families, yet it remains widely misunderstood. Whether you are the sole breadwinner of your household or a dual-income family planning for the future, a life insurance policy provides a safety net that ensures your loved ones are protected even in your absence.

What Is Life Insurance?

Life insurance is a contract between you and an insurer. In exchange for regular premium payments, the insurer agrees to pay a lump sum — called a "death benefit" — to your nominated beneficiaries upon your passing. This payout can cover funeral costs, outstanding debts, children's education expenses, and everyday living costs for years to come.

Types of Life Insurance Available in Ethiopia

Term Life Insurance is the most straightforward and affordable option. It covers you for a specific period — typically 10, 20, or 30 years. If you pass away during the term, your beneficiaries receive the full payout. If you outlive the term, coverage simply ends. This is ideal for young families who want maximum coverage at a lower monthly cost.

Whole Life Insurance provides coverage for your entire lifetime and also builds a cash value component over time. While premiums are higher, the policy doubles as a savings vehicle that you can borrow against or cash out if needed.

Endowment Policies are especially popular in Ethiopia. They combine life cover with a savings goal — for example, paying out a lump sum when your child turns 18 for university fees, regardless of whether you are still alive.

How Much Coverage Do You Need?

A common rule of thumb is to insure yourself for 10 to 15 times your annual income. However, your actual needs depend on your number of dependants, outstanding loans or mortgage, monthly household expenses, future education costs, and existing savings or assets.

WASS Insurance advisors can walk you through a personalised needs analysis at no cost.

Choosing the Right Plan

When comparing policies, look beyond the premium amount. Consider the claim settlement ratio of the insurer, the flexibility to adjust coverage as your family grows, riders that can be added — such as critical illness cover or accidental death benefit — and the ease of the claims process.

WASS Insurance offers a range of life products tailored to Ethiopian families and businesses. Contact us today to schedule a free consultation with one of our licensed advisors.`,
    content_am: `የሕይወት ኢንሹራንስ ለኢትዮጵያ ቤተሰቦች ካሉ በጣም አስፈላጊ ፋይናንሺያል መሳሪያዎች አንዱ ነው፣ ነገር ግን አሁንም በሰፊው ሳይረዳ ቀርቷል። በቤተሰብዎ ውስጥ ብቸኛ ገቢ አፍቃሪ ብትሆኑ ወይም ለወደፊቱ ዕቅድ የምታወጡ ባለ ሁለት ገቢ ቤተሰብ ብትሆኑ፣ የሕይወት ኢንሹራንስ ፖሊሲ ለቅርቦቻችሁ ባላችሁ ጊዜ እንኳ የተጠበቁ መሆናቸውን የሚያረጋግጥ ደህንነት ቀለበት ይሰጣል።

የሕይወት ኢንሹራንስ ምንድን ነው?

የሕይወት ኢንሹራንስ በእርስዎ እና በኢንሹረር መካከል ያለ ውል ነው። መደበኛ ፕሪሚየም ክፍያዎች ምትክ፣ ኢንሹረሩ ሲሞቱ ለሾሙዋቸው ተጠቃሚዎች — "የሞት ጥቅም" ተብሎ የሚጠራ — ትልቅ ክፍያ ለመፈጸም ይስማማል።

በኢትዮጵያ ውስጥ ያሉ የሕይወት ኢንሹራንስ ዓይነቶች

የቃላት ሕይወት ኢንሹራንስ በጣም ቀጥተኛ እና ዋጋ ቅናሽ አማራጭ ነው። ለተወሰነ ጊዜ ያሸፈናል — ብዙውን ጊዜ ለ10፣ 20 ወይም 30 ዓመታት። ዋስ ኢንሹራንስ ለኢትዮጵያ ቤተሰቦች እና ንግዶች ተስማሚ ሆነው የተዘጋጁ የሕይወት ምርቶች ያቀርባል። ዛሬ ያነጋግሩን።`,
    category: "Insurance Awareness Articles",
    author: "WASS Insurance Editorial Team",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
  },
  {
    slug: "5-things-to-know-before-filing-a-claim",
    title: "5 Things to Know Before Filing a Claim",
    title_am: "ክሱን ከማስረከብዎ በፊት ማወቅ ያለብዎ 5 ነገሮች",
    intro:
      "Make the claims process smoother by preparing these essential items before you contact your insurer.",
    intro_am:
      "ኢንሹረርዎን ከማነጋገርዎ በፊት እነዚህን አስፈላጊ ነገሮች በማዘጋጀት የክስ ሂደቱን ያቀልሉ።",
    content: `Filing an insurance claim can feel overwhelming — especially during an already stressful situation. The good news is that a little preparation goes a long way. Here are the five things every WASS Insurance policyholder should know before picking up the phone.

1. Know Your Policy Number and Coverage Details

Before anything else, locate your policy documents. Your policy number is the key reference for every interaction with your insurer. Equally important is understanding exactly what your policy covers — the type of incident, the maximum payout limits, any applicable deductible (the amount you pay out of pocket before insurance kicks in), and any exclusions that might apply. Reviewing these details upfront prevents surprises later in the process.

2. Document Everything Immediately

Time is critical. As soon as an incident occurs — a road accident, a fire, a theft, or a medical event — start documenting. Take clear photographs or video of the damage or scene. Write down a factual timeline of events, including exact dates and times. Collect witness contact details if relevant. For vehicle accidents, obtain a copy of the police report, which is mandatory for motor claims in Ethiopia.

3. Notify Your Insurer Promptly

Most policies require you to notify your insurer within a specific timeframe after an incident — often within 24 to 72 hours. Delayed notification can complicate or even invalidate your claim. Contact WASS Insurance as soon as it is safe to do so. You can reach our claims team via phone, our website, or by visiting any of our branches.

4. Gather Supporting Documents in Advance

Depending on your claim type, you will need different documents. For motor claims: your driving licence, vehicle registration, police report, and repair estimates. For medical claims: hospital admission records, doctor's notes, all original receipts, and a completed claim form. For property claims: a list of damaged or lost items with approximate values, purchase receipts where available, and photographic evidence. Having these ready before your first call significantly speeds up the assessment process.

5. Be Honest and Accurate

This may seem obvious, but it bears repeating. Providing inaccurate information — even unintentionally — can delay your claim and, in serious cases, result in denial. Be thorough, factual, and consistent across all communications. If you are unsure about any detail, say so rather than guessing.

At WASS Insurance, our claims team is here to guide you step by step. We aim to process straightforward claims within 7 working days. Reach out to us at any stage and we will do our best to support you through the process.`,
    content_am: `የኢንሹራንስ ክስ ማስረከብ አስጨናቂ ሊሆን ይችላል — ቀድሞ ውጥረት ባለበት ሁኔታ ላይ ሲሆን በተለይ። ጥሩ ዜናው ትንሽ ዝግጅት ብዙ ርቀት ይሄዳል። ዋስ ኢንሹራንስ ፖሊሲ ያላቸው ሁሉ ስልካቸውን ከመያዛቸው በፊት ማወቅ ያለባቸው አምስቱ ነገሮች ናቸው።

1. የፖሊሲ ቁጥርዎን እና የሽፋን ዝርዝሮችን ያውቁ

ከሁሉ በፊት የፖሊሲ ሰነዶችዎን ያግኙ። የፖሊሲ ቁጥርዎ ከኢንሹረርዎ ጋር ለሚደረጉ ሁሉም ግንኙነቶች ቁልፍ ማጣቀሻ ነው።

2. ሁሉንም ነገር ወዲያውኑ ያስረዱ

ጊዜ ወሳኝ ነው። አደጋ ሲደርስ ወዲያውኑ ፎቶ ወይም ቪዲዮ ይውሰዱ። ዋስ ኢንሹራንስ ያስቻለውን ያህል በፍጥነት ያነጋግሩ። ቀጥ ያሉ ጥያቄዎቻችንን ክሱን ከ7 የሥራ ቀናት ባነሰ ጊዜ ለማስኬድ እናሰናዳዋለን።`,
    category: "Insurance Awareness Articles",
    author: "WASS Insurance Claims Department",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
  },
  {
    slug: "why-every-business-needs-insurance",
    title: "Why Every Business Needs Insurance",
    title_am: "ለምን እያንዳንዱ ንግድ ኢንሹራንስ ያስፈልገዋል",
    intro:
      "From liability protection to employee coverage, discover why insurance is critical for Ethiopian businesses.",
    intro_am:
      "ከተጠያቂነት ጥበቃ እስከ የሠራተኛ ሽፋን፣ ኢንሹራንስ ለኢትዮጵያ ንግዶች ወሳኝ የሆነበትን ምክንያት ያግኙ።",
    content: `Running a business in Ethiopia comes with enormous opportunity — and real risk. Whether you operate a small retail shop in Addis Ababa, a medium-sized construction company in Hawassa, or a growing import-export firm, protecting your enterprise with the right insurance is not optional. It is the foundation of sustainable business.

The Risks No Business Can Ignore

Every day, Ethiopian businesses face risks that can cause serious financial harm: fire or flood damage to premises, theft of stock or equipment, accidents involving employees or customers on-site, vehicle accidents involving company transport, and lawsuits from clients or third parties. Without insurance, a single major incident can wipe out years of hard work overnight.

Property Insurance: Protecting Your Physical Assets

Your premises, equipment, inventory, and machinery represent significant capital investment. Commercial property insurance covers damage or loss caused by fire, flood, break-ins, and other named perils. For businesses that own or lease vehicles, a commercial motor policy is equally essential.

Liability Insurance: Protecting Your Reputation

Public liability insurance covers you if a customer, supplier, or member of the public suffers injury or property damage because of your business operations. In an increasingly litigious environment, even a minor slip-and-fall incident on your premises can result in a costly legal claim. Product liability cover is also important if you manufacture or sell physical goods.

Employee Benefits and Workmen's Compensation

Your staff are your most valuable asset. Group life insurance and medical insurance help you attract and retain talented employees. Workmen's compensation insurance — which is mandatory under Ethiopian labour law for many business categories — covers employees who suffer injury or illness arising from their work. Providing this cover is not only a legal obligation but a sign of a responsible, people-first employer.

Business Interruption Cover

What happens if a fire forces you to close for two months while repairs are carried out? Business interruption insurance covers the income you lose and ongoing expenses such as rent and salaries during the period your operations are halted. This cover is often the difference between a business surviving a disaster or closing permanently.

Getting Started with WASS Insurance

WASS Insurance offers a comprehensive suite of commercial insurance products tailored to the Ethiopian market. Our team of business insurance specialists will assess your specific risks and build a package that gives you complete protection without unnecessary cost. Contact us today for a free business risk assessment and quote.`,
    content_am: `በኢትዮጵያ ውስጥ ንግድ ማካሄድ ትልቅ ዕድል — እና እውነተኛ አደጋ ይዞ ይመጣል። ትክክለኛ ኢንሹራንስ ይዘው ድርጅትዎን መጠበቅ አማራጭ አይደለም። ዛሬ ዋስ ኢንሹራንስን ያነጋግሩ — ለነፃ የንግድ አደጋ ግምገማ እና ዋጋ ቅናሽ።`,
    category: "Company Announcements",
    author: "WASS Insurance Business Solutions Team",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
  },
];
