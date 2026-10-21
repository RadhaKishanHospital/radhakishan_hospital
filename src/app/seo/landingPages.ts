/**
 * Keyword-focused landing pages. Each page targets one search-intent cluster
 * (e.g. "NICU hospital in Kurukshetra") with a unique title, H1, copy and FAQs.
 * Plain data only — also consumed by the build-time prerender plugin.
 */

export interface LandingSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface LandingImage {
  /** Unsplash photo id, e.g. "1560306580-9e204fe45f3e" */
  id: string;
  alt: string;
  caption?: string;
}

/** Responsive Unsplash URL (auto WebP/AVIF, cropped to width). */
export function imageUrl(id: string, width: number, height?: number) {
  const h = height ? `&h=${height}` : '';
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}${h}&q=75`;
}

export interface LandingPage {
  slug: string;
  /** Short anchor text used in internal link lists */
  linkLabel: string;
  /** Iconify icon name (solar set, matching the rest of the site) */
  icon: string;
  /** <title> text before the " | Radhakishan Hospital" suffix */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  h1Highlight: string;
  intro: string[];
  highlights: { icon: string; title: string; text: string }[];
  images: { hero: LandingImage; gallery: LandingImage[] };
  sections: LandingSection[];
  /** Warning-signs callout */
  urgent?: { heading: string; bullets: string[] };
  faqs: { q: string; a: string }[];
  related: string[];
  /** Show the pediatrician profile card */
  showPediatrician?: boolean;
  /** schema.org name of the primary service on this page */
  serviceName: string;
}

const EMERGENCY = '+91 1744 270516';
const OPD = '+91 72060 29516';

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: 'childrens-hospital-kurukshetra',
    linkLabel: 'Children’s Hospital in Kurukshetra',
    icon: 'solar:hospital-linear',
    title: 'Best Children’s & Pediatric Hospital in Kurukshetra',
    description:
      'Radhakishan Children Hospital, Kurukshetra — a trusted pediatric hospital since 1987 with NICU, PICU, 24-hour child emergency and a child specialist (MD Pediatrics).',
    eyebrow: 'Radhakishan Children Hospital · Since 1987',
    h1: 'Children’s & Pediatric Hospital',
    h1Highlight: 'in Kurukshetra',
    intro: [
      'Families searching for the best children’s hospital in Kurukshetra need more than a clinic — they need a hospital where a child specialist, a newborn intensive care unit (NICU), a pediatric intensive care unit (PICU) and a 24-hour emergency are all under one roof. That is what Radhakishan Hospital — also known as Radha Kishan Hospital and Radhakishan Children Hospital — has offered families in Kurukshetra, Thanesar and the surrounding districts of Haryana since 1987.',
      'From a routine fever visit to the care of a premature newborn or a child who needs ventilator support, our paediatric team looks after infants, children and adolescents with evidence-based medicine and a calm, family-centred approach.',
    ],
    highlights: [
      { icon: 'solar:stethoscope-linear', title: 'Child specialist (MD Pediatrics)', text: 'Consultations for newborns, infants, children and teenagers.' },
      { icon: 'solar:health-linear', title: 'NICU for newborns', text: 'Intensive care for premature, low birth weight and sick newborns.' },
      { icon: 'solar:heart-pulse-linear', title: 'PICU for children', text: 'Critical care with continuous monitoring and ventilator support.' },
      { icon: 'solar:siren-rounded-linear', title: '24-hour child emergency', text: `Emergency team available day and night — call ${EMERGENCY}.` },
      { icon: 'solar:test-tube-linear', title: 'In-house laboratory', text: 'Biochemistry, haematology, microbiology and clinical pathology.' },
      { icon: 'solar:shield-check-linear', title: 'Cashless insurance', text: 'Ayushman Bharat, ECHS and leading insurers and TPAs.' },
    ],
    sections: [
      {
        heading: 'Why families choose Radhakishan as their pediatric hospital',
        body: [
          'Choosing a paediatric hospital is about trust. For more than three decades, parents in Kurukshetra have relied on Radhakishan Hospital because every level of children’s care — OPD, ward, NICU, PICU and emergency — is coordinated by the same paediatric team, so your child does not have to be moved between hospitals as their needs change.',
        ],
        bullets: [
          'Serving Kurukshetra and Haryana since 1987',
          'Dedicated neonatal and paediatric intensive care',
          'Diagnostics on site: lab, ultrasound and X-ray',
          'Pharmacy and dietetics support during admission',
          'Clear communication with parents at every step',
          'Transparent, affordable pricing and cashless insurance',
        ],
      },
      {
        heading: 'Children’s healthcare services',
        body: ['Our child specialist hospital in Kurukshetra covers the full range of children’s health needs:'],
        bullets: [
          'Newborn care, NICU and premature baby care',
          'Pediatric ICU (PICU) and child ventilator support',
          '24-hour pediatric emergency',
          'Fever, cough, cold, pneumonia and infections',
          'Newborn jaundice treatment (phototherapy)',
          'Seizures and fits in children',
          'Asthma, wheezing and breathing problems',
          'Diarrhoea, vomiting and dehydration',
          'Growth, nutrition and development checks',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which is the best children’s hospital in Kurukshetra?',
        a: 'Radhakishan Hospital (Radhakishan Children Hospital) in Jyoti Nagar, Thanesar, Kurukshetra has served families since 1987 with a child specialist (MD Pediatrics), NICU, PICU and a 24-hour pediatric emergency under one roof.',
      },
      {
        q: 'Is Radhakishan Hospital the same as Radha Kishan Hospital?',
        a: 'Yes. Radhakishan Hospital, Radha Kishan Hospital and Radhakishan Children Hospital all refer to the same hospital at Jyoti Nagar, Thanesar, Kurukshetra, Haryana 136118.',
      },
      {
        q: 'What are the OPD timings for children?',
        a: `OPD runs Monday to Saturday from 10:00 AM to 2:00 PM and 5:00 PM to 7:00 PM. OPD is closed on Sunday, but the emergency, NICU and PICU are open 24 hours. For appointments call ${OPD}.`,
      },
      {
        q: 'Do you accept Ayushman Bharat and health insurance for child treatment?',
        a: 'Yes. Cashless treatment is available under Ayushman Bharat, ECHS and leading insurers and TPAs including Star Health, Care, Niva Bupa, HDFC ERGO, Tata AIG, Aditya Birla, Medi Assist and others.',
      },
    ],
    related: ['pediatrician-in-kurukshetra', 'nicu-kurukshetra', 'picu-kurukshetra', 'pediatric-emergency-kurukshetra'],
    showPediatrician: true,
    serviceName: 'Pediatric Hospital Care',
    images: {
      hero: { id: '1758691462445-d03a94aa7656', alt: 'Pediatrician examining a young boy with a stethoscope while his mother watches' },
      gallery: [
        { id: '1630864972901-052dfdc7fba4', alt: 'Smiling young girl in a yellow shirt', caption: 'Healthy, happy childhoods' },
        { id: '1780329941563-866557aca9f7', alt: 'Mother smiling while holding her baby', caption: 'Family-centred care' },
        { id: '1778151270902-cb0ca572f2ee', alt: 'Clean, modern hospital room with an adjustable bed', caption: 'Clean, comfortable wards' },
      ],
    },
  },
  {
    slug: 'pediatrician-in-kurukshetra',
    linkLabel: 'Child Specialist & Pediatrician',
    icon: 'solar:stethoscope-linear',
    title: 'Best Child Specialist & Pediatrician in Kurukshetra',
    description:
      'Consult Dr. Lokender Goyal, MBBS, MD (Pediatrics) — child specialist and children’s doctor at Radhakishan Hospital, Kurukshetra. OPD Mon–Sat, 24-hour child emergency.',
    eyebrow: 'Children Doctor in Kurukshetra',
    h1: 'Child Specialist & Pediatrician',
    h1Highlight: 'in Kurukshetra',
    intro: [
      'Looking for the best pediatrician or child specialist in Kurukshetra? At Radhakishan Hospital, children are seen by Dr. Lokender Goyal, MBBS, MD (Pediatrics), a paediatrician and neonatal care specialist registered with the Haryana Medical Council.',
      'Because our children’s doctor works inside a hospital with a NICU, PICU and 24-hour emergency, a child who becomes more unwell can be admitted and monitored immediately — without a transfer.',
    ],
    highlights: [
      { icon: 'solar:diploma-verified-linear', title: 'MD (Pediatrics)', text: 'Qualified paediatrician and neonatal care specialist.' },
      { icon: 'solar:users-group-rounded-linear', title: 'Newborn to 18 years', text: 'Care for newborns, infants, children and adolescents.' },
      { icon: 'solar:calendar-linear', title: 'OPD six days a week', text: 'Mon–Sat, 10 AM–2 PM and 5 PM–7 PM.' },
      { icon: 'solar:bed-linear', title: 'Admission when needed', text: 'Ward, NICU and PICU in the same hospital.' },
    ],
    sections: [
      {
        heading: 'What our children’s doctor treats',
        body: ['Common reasons parents bring their child to our paediatric OPD include:'],
        bullets: [
          'Fever, cough, cold and sore throat',
          'Pneumonia, bronchiolitis and wheezing',
          'Asthma and allergies',
          'Diarrhoea, vomiting and dehydration',
          'Newborn jaundice and feeding problems',
          'Seizures (fits) and febrile convulsions',
          'Typhoid, dengue, malaria and other infections',
          'Poor weight gain, nutrition and growth concerns',
          'Developmental milestones and check-ups',
        ],
      },
      {
        heading: 'Booking a consultation',
        body: [
          `OPD appointment registration starts at 9:00 AM. Call ${OPD} to book, or use the online appointment form. If your child is very unwell outside OPD hours, come directly to the emergency or call ${EMERGENCY} — it is open 24 hours, including Sundays.`,
        ],
      },
    ],
    faqs: [
      {
        q: 'Who is the child specialist at Radhakishan Hospital?',
        a: 'Dr. Lokender Goyal, MBBS, MD (Pediatrics), registered with the Haryana Medical Council (Reg. No. HN-21452), is the paediatrician and neonatal care specialist at Radhakishan Hospital, Kurukshetra.',
      },
      {
        q: 'What are the pediatrician’s OPD timings?',
        a: 'Monday to Saturday, 10:00 AM – 2:00 PM and 5:00 PM – 7:00 PM. OPD is closed on Sunday; the emergency is open 24/7.',
      },
      {
        q: 'How do I book an appointment with the children’s doctor?',
        a: `Call ${OPD} or submit the appointment form on our website. Registration for OPD starts at 9:00 AM.`,
      },
    ],
    related: ['childrens-hospital-kurukshetra', 'pediatric-emergency-kurukshetra', 'child-infection-treatment-kurukshetra', 'pediatric-asthma-treatment-kurukshetra'],
    showPediatrician: true,
    serviceName: 'Pediatrician Consultation',
    images: {
      hero: { id: '1758691463080-30a990ef61bb', alt: 'Doctor examining a child with a stethoscope in a clinic' },
      gallery: [
        { id: '1676313030076-4ac0b37050fd', alt: 'Doctor gently examining a child’s tummy with a stethoscope', caption: 'Gentle, thorough check-ups' },
        { id: '1758691462322-be12d399df01', alt: 'Young boy in a doctor’s coat listening to a teddy bear with a stethoscope', caption: 'Child-friendly consultations' },
        { id: '1676313027775-a5a3dca6f98b', alt: 'Doctor in a white coat sitting and talking with a little girl', caption: 'Time to listen to parents' },
      ],
    },
  },
  {
    slug: 'nicu-kurukshetra',
    linkLabel: 'NICU & Newborn Care',
    icon: 'solar:health-linear',
    title: 'NICU Hospital in Kurukshetra — Newborn & Premature Baby Care',
    description:
      'Neonatal Intensive Care Unit (NICU) at Radhakishan Hospital, Kurukshetra: premature & low birth weight baby care, newborn ventilator support, jaundice phototherapy. Open 24/7.',
    eyebrow: 'Neonatal Intensive Care Unit',
    h1: 'NICU & Newborn Care Hospital',
    h1Highlight: 'in Kurukshetra',
    intro: [
      'The first days of life can be the most delicate. Radhakishan Hospital’s Neonatal Intensive Care Unit (NICU) in Kurukshetra provides round-the-clock specialised care for newborn babies who are born early, born small, or who become unwell after birth.',
      'Our NICU is led by a paediatrician and neonatal care specialist and supported by trained nursing staff, an in-house laboratory and the hospital’s 24-hour emergency, so newborns referred from home, nursing homes or other hospitals can be admitted at any time.',
    ],
    highlights: [
      { icon: 'solar:hand-heart-linear', title: 'Premature baby care', text: 'Warmth, breathing support and feeding for babies born early.' },
      { icon: 'solar:scale-linear', title: 'Low birth weight care', text: 'Careful nutrition and growth monitoring for small babies.' },
      { icon: 'solar:wind-linear', title: 'Newborn ventilator facility', text: 'CPAP and ventilator support for babies who need help breathing.' },
      { icon: 'solar:sun-2-linear', title: 'Phototherapy', text: 'Treatment for newborn jaundice with regular bilirubin checks.' },
      { icon: 'solar:pulse-2-linear', title: 'Continuous monitoring', text: 'Heart rate, breathing, oxygen and temperature 24/7.' },
      { icon: 'solar:heart-angle-linear', title: 'Parents involved', text: 'Kangaroo mother care and breastfeeding support.' },
    ],
    sections: [
      {
        heading: 'Which newborns need NICU care?',
        body: ['A baby may be admitted to our neonatal care unit for:'],
        bullets: [
          'Premature birth (born before 37 weeks)',
          'Low birth weight (under 2.5 kg)',
          'Breathing difficulty or respiratory distress',
          'Newborn jaundice needing phototherapy',
          'Suspected infection or neonatal sepsis',
          'Low blood sugar or poor feeding',
          'Birth asphyxia or delayed cry at birth',
          'Seizures in a newborn',
          'Close observation after a difficult delivery',
        ],
      },
      {
        heading: 'NICU facilities',
        body: [
          'Our NICU facility in Kurukshetra is equipped for newborn intensive care, including radiant warmers, phototherapy units, multiparameter monitors, oxygen and CPAP, newborn ventilator support, infusion pumps for precise fluids and medicines, and on-site laboratory tests so treatment decisions can be made quickly.',
        ],
      },
      {
        heading: 'Care for premature and low birth weight babies',
        body: [
          'Premature and low birth weight babies need help staying warm, breathing, feeding and fighting infection. We keep them in a temperature-controlled environment, start feeds gradually — ideally with mother’s milk — monitor weight daily, and encourage kangaroo mother care (skin-to-skin contact) as soon as the baby is stable. Parents are guided on feeding, hygiene and warning signs before discharge.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is there a NICU near me in Kurukshetra?',
        a: `Yes. Radhakishan Hospital at Jyoti Nagar, Thanesar, Kurukshetra has a Neonatal Intensive Care Unit open 24 hours. For newborn emergencies call ${EMERGENCY}.`,
      },
      {
        q: 'Do you have a ventilator for newborn babies?',
        a: 'Yes. The NICU provides breathing support for newborns, including oxygen, CPAP and ventilator support when a baby needs it.',
      },
      {
        q: 'Can a baby born at another hospital be admitted to your NICU?',
        a: `Yes. We accept newborns referred from home, nursing homes and other hospitals at any time. Please call ${EMERGENCY} before you leave so the team can prepare.`,
      },
      {
        q: 'Can parents stay with their baby in the NICU?',
        a: 'Parents are encouraged to visit, feed and hold their baby (kangaroo mother care) whenever the baby is stable. The NICU team will explain visiting arrangements.',
      },
    ],
    related: ['newborn-jaundice-treatment-kurukshetra', 'picu-kurukshetra', 'pediatric-emergency-kurukshetra', 'childrens-hospital-kurukshetra'],
    showPediatrician: true,
    serviceName: 'Neonatal Intensive Care Unit (NICU)',
    images: {
      hero: { id: '1560306580-9e204fe45f3e', alt: 'Newborn baby resting inside an incubator' },
      gallery: [
        { id: '1782010440982-2b7f1ace7a60', alt: 'Premature baby in an incubator receiving intensive care', caption: 'Premature baby care' },
        { id: '1510154221590-ff63e90a136f', alt: 'Parent gently holding a newborn baby’s feet', caption: 'Tiny steps, big care' },
        { id: '1766299893221-c91a40eaad66', alt: 'Mother holding her newborn baby in a hospital bed', caption: 'Mothers kept close' },
      ],
    },
  },
  {
    slug: 'picu-kurukshetra',
    linkLabel: 'PICU — Pediatric ICU',
    icon: 'solar:heart-pulse-linear',
    title: 'PICU in Kurukshetra — Pediatric Intensive Care Unit',
    description:
      'Pediatric ICU (PICU) at Radhakishan Hospital, Kurukshetra — critical care for children with a child ventilator facility, 24/7 monitoring and an on-site paediatric team.',
    eyebrow: 'Paediatric Intensive Care Unit',
    h1: 'PICU — Pediatric ICU',
    h1Highlight: 'in Kurukshetra',
    intro: [
      'When a child is seriously ill, minutes matter. The Paediatric Intensive Care Unit (PICU) at Radhakishan Hospital is a critical care unit for children in Kurukshetra, with continuous monitoring, oxygen and ventilator support, and a paediatric team available around the clock.',
      'Children can be admitted directly from our 24-hour emergency or referred from other hospitals across Kurukshetra and nearby districts.',
    ],
    highlights: [
      { icon: 'solar:wind-linear', title: 'Child ventilator facility', text: 'Ventilator and non-invasive breathing support.' },
      { icon: 'solar:pulse-2-linear', title: '24/7 monitoring', text: 'Heart rate, oxygen, blood pressure and breathing.' },
      { icon: 'solar:users-group-rounded-linear', title: 'Critical care team', text: 'Paediatrician-led care with trained ICU nursing.' },
      { icon: 'solar:test-tube-linear', title: 'Rapid diagnostics', text: 'On-site lab, X-ray and ultrasound.' },
    ],
    sections: [
      {
        heading: 'Conditions treated in the PICU',
        body: ['Children may need paediatric intensive care for:'],
        bullets: [
          'Severe pneumonia and respiratory failure',
          'Severe asthma attacks',
          'Prolonged or repeated seizures',
          'Sepsis and serious infections',
          'Dengue with warning signs or shock',
          'Severe dehydration from diarrhoea or vomiting',
          'Poisoning and accidental ingestion',
          'Diabetic ketoacidosis',
          'Monitoring after serious injury',
        ],
      },
      {
        heading: 'Critical care for children, close to home',
        body: [
          'Having a pediatric ICU in Kurukshetra means families do not have to travel long distances during an emergency. Our PICU works hand in hand with the hospital’s emergency, laboratory, pharmacy and anaesthesiology services so a critically ill child can be stabilised, investigated and treated in one place.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is there a PICU near me in Kurukshetra?',
        a: `Yes. Radhakishan Hospital in Jyoti Nagar, Thanesar, Kurukshetra has a Pediatric Intensive Care Unit open 24 hours. Call ${EMERGENCY} for emergencies.`,
      },
      {
        q: 'Does Radhakishan Hospital have a ventilator for children?',
        a: 'Yes. The PICU provides oxygen, non-invasive breathing support and ventilator support for children who need it.',
      },
      {
        q: 'What is the difference between NICU and PICU?',
        a: 'A NICU cares for newborn babies (usually in the first 28 days of life), while a PICU cares for infants, children and adolescents who are critically ill.',
      },
    ],
    related: ['nicu-kurukshetra', 'pediatric-emergency-kurukshetra', 'pediatric-seizure-treatment-kurukshetra', 'pediatric-asthma-treatment-kurukshetra'],
    showPediatrician: true,
    serviceName: 'Pediatric Intensive Care Unit (PICU)',
    images: {
      hero: { id: '1778151270757-f3793f65e2de', alt: 'Hospital ward with beds and medical equipment' },
      gallery: [
        { id: '1787338718195-ee70ca40765b', alt: 'Patient monitor displaying vital signs', caption: 'Continuous monitoring' },
        { id: '1645273474732-8fd9c63a148f', alt: 'Breathing support and oxygen equipment on a hospital bed', caption: 'Breathing & ventilator support' },
        { id: '1778151270902-cb0ca572f2ee', alt: 'Clean, modern hospital room with an adjustable bed', caption: 'Clean critical care beds' },
      ],
    },
  },
  {
    slug: 'pediatric-emergency-kurukshetra',
    linkLabel: '24 Hour Child Emergency',
    icon: 'solar:siren-rounded-linear',
    title: '24 Hour Pediatric & Child Emergency in Kurukshetra',
    description: `24-hour pediatric emergency at Radhakishan Hospital, Kurukshetra — open day and night, including Sundays, with NICU, PICU and critical care on site. Call ${EMERGENCY}.`,
    eyebrow: 'Open 24 hours · 7 days',
    h1: '24 Hour Pediatric Emergency',
    h1Highlight: 'in Kurukshetra',
    intro: [
      `Radhakishan Hospital’s emergency department in Kurukshetra is open 24 hours a day, 7 days a week — including Sundays and holidays. For a child emergency, call ${EMERGENCY} or come straight to Jyoti Nagar, Thanesar.`,
      'Because the emergency is connected to our NICU and PICU, a newborn or child who needs intensive care can be moved to critical care within the same hospital.',
    ],
    highlights: [
      { icon: 'solar:clock-circle-linear', title: 'Always open', text: 'Day and night, including Sundays and holidays.' },
      { icon: 'solar:heart-pulse-linear', title: 'Critical care on site', text: 'NICU, PICU and ventilator support in the same building.' },
      { icon: 'solar:test-tube-linear', title: 'Rapid tests', text: 'Laboratory, X-ray and ultrasound for quick diagnosis.' },
      { icon: 'solar:users-group-rounded-linear', title: 'Adult emergency too', text: 'Emergency care for the whole family.' },
    ],
    sections: [
      {
        heading: 'What to do in a child emergency',
        body: [
          `Stay calm, call ${EMERGENCY} and bring your child to the hospital. If you can, carry previous prescriptions, discharge papers, vaccination records and any medicine your child may have swallowed. Do not give food or drink if your child is drowsy, having a seizure or has difficulty breathing.`,
        ],
      },
    ],
    urgent: {
      heading: 'Come to the emergency immediately if your child has',
      bullets: [
        'Difficulty breathing, fast breathing or blue lips',
        'A seizure (fit), or is unusually drowsy or hard to wake',
        'Fever and is younger than 3 months',
        'Signs of dehydration — no urine for 8 hours, very dry mouth, no tears',
        'Persistent vomiting, or blood in vomit or stool',
        'Swallowed medicine, chemicals or a small object',
        'A serious injury, burn or head injury',
        'Yellow skin in the first 24 hours of life, or yellow palms and soles',
      ],
    },
    faqs: [
      {
        q: 'Is the children’s emergency open 24 hours?',
        a: `Yes. The emergency at Radhakishan Hospital, Kurukshetra is open 24 hours, 7 days a week, including Sundays. Call ${EMERGENCY}.`,
      },
      {
        q: 'Where is the nearest children’s hospital with an emergency?',
        a: 'Radhakishan Hospital is at Jyoti Nagar, Thanesar, Kurukshetra, Haryana 136118, and serves Kurukshetra, Thanesar, Pehowa, Shahabad, Ladwa and Pipli.',
      },
      {
        q: 'Do I need an appointment for the emergency?',
        a: 'No. Emergency patients are seen without an appointment at any time.',
      },
    ],
    related: ['picu-kurukshetra', 'nicu-kurukshetra', 'pediatric-seizure-treatment-kurukshetra', 'child-infection-treatment-kurukshetra'],
    serviceName: '24 Hour Pediatric Emergency',
    images: {
      hero: { id: '1758653500437-26660f405fe4', alt: 'Medical team transporting a patient on a stretcher' },
      gallery: [
        { id: '1758404958502-44f156617bae', alt: 'Illuminated emergency sign at a hospital entrance at night', caption: 'Open 24 hours' },
        { id: '1787338718195-ee70ca40765b', alt: 'Patient monitor displaying vital signs', caption: 'Rapid assessment' },
        { id: '1758691462164-100b5e356169', alt: 'Doctor listening to a young boy’s chest with a stethoscope', caption: 'Paediatric team on call' },
      ],
    },
  },
  {
    slug: 'newborn-jaundice-treatment-kurukshetra',
    linkLabel: 'Newborn Jaundice Treatment',
    icon: 'solar:sun-2-linear',
    title: 'Newborn Jaundice Treatment in Kurukshetra — Phototherapy',
    description:
      'Newborn jaundice treatment at Radhakishan Hospital, Kurukshetra: bilirubin testing, phototherapy and NICU care for babies with neonatal jaundice. Open 24 hours.',
    eyebrow: 'Neonatal jaundice care',
    h1: 'Newborn Jaundice Treatment',
    h1Highlight: 'in Kurukshetra',
    intro: [
      'Jaundice — yellowing of the skin and eyes — is very common in newborn babies and usually appears on the second to fourth day of life. Most cases are mild and settle on their own, but some babies need treatment to bring bilirubin levels down safely.',
      'At Radhakishan Hospital in Kurukshetra, newborns with jaundice are assessed by our paediatrician, tested in our in-house laboratory and, when needed, treated with phototherapy in the NICU.',
    ],
    highlights: [
      { icon: 'solar:test-tube-linear', title: 'Bilirubin testing', text: 'Blood tests in our on-site laboratory.' },
      { icon: 'solar:sun-2-linear', title: 'Phototherapy', text: 'Special light treatment that safely lowers bilirubin.' },
      { icon: 'solar:health-linear', title: 'NICU care', text: 'For premature babies or high bilirubin levels.' },
      { icon: 'solar:hand-heart-linear', title: 'Feeding support', text: 'Help with breastfeeding, which helps clear jaundice.' },
    ],
    sections: [
      {
        heading: 'Causes of newborn jaundice',
        body: [],
        bullets: [
          'Normal (physiological) jaundice in the first week',
          'Prematurity',
          'Breastfeeding difficulties and low intake',
          'Blood group differences between mother and baby (ABO or Rh)',
          'Infection',
          'Bruising during birth',
        ],
      },
      {
        heading: 'How we treat neonatal jaundice',
        body: [
          'Treatment depends on the baby’s age in hours, bilirubin level and risk factors. Many babies only need closer monitoring and more frequent feeds. Babies above the treatment threshold receive phototherapy, with bilirubin rechecked regularly until it is safe. Rarely, very high levels need more intensive treatment, which our NICU team will discuss with you.',
        ],
      },
    ],
    urgent: {
      heading: 'See a doctor urgently if your baby',
      bullets: [
        'Has jaundice within the first 24 hours of life',
        'Looks yellow on the palms, soles or legs',
        'Is very sleepy, floppy or not feeding well',
        'Has a high-pitched cry or arching of the back',
        'Passes pale stools or dark urine',
        'Still has jaundice after 2 weeks of age',
      ],
    },
    faqs: [
      {
        q: 'Where can I get newborn jaundice treatment in Kurukshetra?',
        a: `Radhakishan Hospital, Jyoti Nagar, Thanesar, Kurukshetra provides bilirubin testing and phototherapy 24 hours a day. Call ${EMERGENCY}.`,
      },
      {
        q: 'Is phototherapy safe for my baby?',
        a: 'Yes. Phototherapy is a standard, well-established treatment for newborn jaundice. The baby’s eyes are protected, and temperature and hydration are monitored throughout.',
      },
      {
        q: 'Can I keep breastfeeding if my baby has jaundice?',
        a: 'In most cases, yes — frequent feeding helps the baby pass bilirubin. Our team will advise you based on your baby’s condition.',
      },
    ],
    related: ['nicu-kurukshetra', 'pediatrician-in-kurukshetra', 'childrens-hospital-kurukshetra', 'pediatric-emergency-kurukshetra'],
    showPediatrician: true,
    serviceName: 'Newborn Jaundice Treatment (Phototherapy)',
    images: {
      hero: { id: '1781869338063-99f3cecdb807', alt: 'Newborn baby sleeping peacefully in warm light' },
      gallery: [
        { id: '1692459525014-596d53e68329', alt: 'Newborn baby in a hospital bed', caption: 'NICU phototherapy' },
        { id: '1697192156499-d85cfe1452c0', alt: 'Lab technician holding a blood sample tube', caption: 'Bilirubin testing on site' },
        { id: '1780329941109-fbe697219f0e', alt: 'Mother holding a smiling baby', caption: 'Home, healthy and happy' },
      ],
    },
  },
  {
    slug: 'pediatric-seizure-treatment-kurukshetra',
    linkLabel: 'Seizure (Fits) Treatment in Children',
    icon: 'solar:pulse-2-linear',
    title: 'Pediatric Seizure Treatment in Kurukshetra — Fits in Children',
    description:
      'Treatment for seizures (fits) and febrile convulsions in children at Radhakishan Hospital, Kurukshetra. 24-hour emergency, PICU care and follow-up with a pediatrician.',
    eyebrow: 'Seizures & febrile convulsions',
    h1: 'Pediatric Seizure Treatment',
    h1Highlight: 'in Kurukshetra',
    intro: [
      'Watching a child have a seizure (fit) is frightening. At Radhakishan Hospital in Kurukshetra, children with seizures are treated in our 24-hour emergency, admitted to the PICU when needed, and followed up by our paediatrician to find the cause and prevent further episodes.',
    ],
    highlights: [
      { icon: 'solar:siren-rounded-linear', title: 'Emergency treatment', text: 'Medicines to stop a seizure, available 24/7.' },
      { icon: 'solar:pulse-2-linear', title: 'PICU monitoring', text: 'For prolonged or repeated seizures.' },
      { icon: 'solar:magnifer-linear', title: 'Finding the cause', text: 'Blood tests on site; further tests arranged as needed.' },
      { icon: 'solar:clipboard-list-linear', title: 'Long-term plan', text: 'Medication and follow-up with our paediatrician.' },
    ],
    sections: [
      {
        heading: 'Common causes of seizures in children',
        body: [],
        bullets: [
          'Febrile seizures with high fever (6 months to 5 years)',
          'Epilepsy',
          'Brain infections such as meningitis or encephalitis',
          'Low blood sugar, calcium or sodium',
          'Head injury',
          'Seizures in newborns',
        ],
      },
      {
        heading: 'First aid during a seizure',
        body: [
          'Lay your child on their side on a safe surface, loosen tight clothing, and note the time the seizure started. Do not put anything in the mouth and do not try to hold the child down. Bring your child to hospital — and call our emergency line if the seizure lasts more than 5 minutes.',
        ],
      },
    ],
    urgent: {
      heading: 'Seek emergency care if',
      bullets: [
        'The seizure lasts longer than 5 minutes',
        'It is your child’s first seizure',
        'Seizures repeat without recovery in between',
        'Your child has difficulty breathing or turns blue',
        'Your child does not wake up normally afterwards',
        'The seizure follows a head injury',
      ],
    },
    faqs: [
      {
        q: 'Are febrile seizures dangerous?',
        a: 'Most simple febrile seizures are brief and do not cause long-term harm, but every first seizure should be checked by a doctor to rule out serious causes such as infection.',
      },
      {
        q: 'Where can my child get seizure treatment in Kurukshetra?',
        a: `Radhakishan Hospital provides 24-hour emergency seizure treatment, PICU care and paediatric follow-up. Emergency: ${EMERGENCY}.`,
      },
    ],
    related: ['pediatric-emergency-kurukshetra', 'picu-kurukshetra', 'pediatrician-in-kurukshetra', 'child-infection-treatment-kurukshetra'],
    showPediatrician: true,
    serviceName: 'Pediatric Seizure Treatment',
    images: {
      hero: { id: '1672928499632-1d040212e3f4', alt: 'Little girl resting calmly in bed under a blanket' },
      gallery: [
        { id: '1676313027775-a5a3dca6f98b', alt: 'Doctor in a white coat sitting and talking with a little girl', caption: 'Clear guidance for parents' },
        { id: '1787338718195-ee70ca40765b', alt: 'Patient monitor displaying vital signs', caption: 'PICU monitoring' },
        { id: '1606206591513-adbfbdd7a177', alt: 'Blood sample tubes arranged in a laboratory rack', caption: 'Tests to find the cause' },
      ],
    },
  },
  {
    slug: 'pediatric-asthma-treatment-kurukshetra',
    linkLabel: 'Asthma Treatment for Children',
    icon: 'solar:wind-linear',
    title: 'Pediatric Asthma Treatment in Kurukshetra — Wheezing in Children',
    description:
      'Asthma and wheezing treatment for children at Radhakishan Hospital, Kurukshetra — nebulisation, inhaler plans, and emergency and PICU care for severe attacks.',
    eyebrow: 'Asthma & wheezing in children',
    h1: 'Pediatric Asthma Treatment',
    h1Highlight: 'in Kurukshetra',
    intro: [
      'Asthma is one of the most common long-term conditions in children. With the right diagnosis and an inhaler plan, most children with asthma can play, study and sleep normally. Radhakishan Hospital in Kurukshetra provides everyday asthma care in OPD and treats severe asthma attacks in our 24-hour emergency and PICU.',
    ],
    highlights: [
      { icon: 'solar:stethoscope-linear', title: 'Diagnosis', text: 'Careful history, examination and tests where needed.' },
      { icon: 'solar:wind-linear', title: 'Nebulisation', text: 'Quick relief for wheezing in OPD and emergency.' },
      { icon: 'solar:hand-heart-linear', title: 'Inhaler & spacer training', text: 'Correct technique for children of every age.' },
      { icon: 'solar:heart-pulse-linear', title: 'Severe attacks', text: 'Oxygen, emergency care and PICU when needed.' },
    ],
    sections: [
      {
        heading: 'Signs of asthma in children',
        body: [],
        bullets: [
          'Wheezing or a whistling sound while breathing',
          'Cough that is worse at night or with exercise',
          'Shortness of breath or chest tightness',
          'Repeated “chest infections” or bronchitis',
          'Symptoms triggered by dust, smoke, cold air or colds',
        ],
      },
      {
        heading: 'Long-term asthma control',
        body: [
          'Our paediatrician creates a personalised asthma action plan: a reliever inhaler for symptoms, a preventer when needed, guidance on avoiding triggers such as smoke and dust, and regular follow-up to adjust treatment as your child grows.',
        ],
      },
    ],
    urgent: {
      heading: 'Bring your child to the emergency if',
      bullets: [
        'They are too breathless to talk, eat or play',
        'The skin pulls in between or below the ribs',
        'Lips or face look blue or grey',
        'The reliever inhaler is not helping or is needed every few hours',
      ],
    },
    faqs: [
      {
        q: 'Can children outgrow asthma?',
        a: 'Some children’s symptoms improve as they get older, but asthma can return. Regular review with a paediatrician keeps treatment right for your child.',
      },
      {
        q: 'Are inhalers safe for children?',
        a: 'Yes. Inhalers deliver a small dose of medicine directly to the lungs and are the recommended treatment for childhood asthma. A spacer helps young children use them properly.',
      },
    ],
    related: ['pediatrician-in-kurukshetra', 'pediatric-emergency-kurukshetra', 'picu-kurukshetra', 'child-infection-treatment-kurukshetra'],
    showPediatrician: true,
    serviceName: 'Pediatric Asthma Treatment',
    images: {
      hero: { id: '1758691462164-100b5e356169', alt: 'Doctor listening to a young boy’s chest with a stethoscope' },
      gallery: [
        { id: '1645273474732-40e757681b97', alt: 'Hand holding a nebuliser mask used to treat wheezing', caption: 'Nebulisation for quick relief' },
        { id: '1645273474732-8fd9c63a148f', alt: 'Breathing support and oxygen equipment on a hospital bed', caption: 'Oxygen for severe attacks' },
        { id: '1776710898709-3b378a13b980', alt: 'Three young children sitting together outdoors', caption: 'Back to playing' },
      ],
    },
  },
  {
    slug: 'child-infection-treatment-kurukshetra',
    linkLabel: 'Fever & Infection Treatment',
    icon: 'solar:shield-plus-linear',
    title: 'Child Infection & Fever Treatment in Kurukshetra',
    description:
      'Treatment for fever, pneumonia, dengue, typhoid, diarrhoea and other infections in children at Radhakishan Hospital, Kurukshetra. In-house lab and 24-hour emergency.',
    eyebrow: 'Fever & infections in children',
    h1: 'Child Infection Treatment',
    h1Highlight: 'in Kurukshetra',
    intro: [
      'Infections are the most common reason children fall ill. At Radhakishan Hospital in Kurukshetra, our paediatrician diagnoses and treats childhood infections with the help of our in-house laboratory — so the right treatment can start quickly and antibiotics are used only when they are needed.',
    ],
    highlights: [
      { icon: 'solar:test-tube-linear', title: 'In-house laboratory', text: 'Haematology, biochemistry and microbiology tests.' },
      { icon: 'solar:bed-linear', title: 'Admission & IV care', text: 'For dehydration or infections that need close watch.' },
      { icon: 'solar:pills-linear', title: 'Responsible antibiotics', text: 'Used only when needed, guided by tests.' },
      { icon: 'solar:siren-rounded-linear', title: '24-hour emergency', text: 'For high fever or a child who looks very unwell.' },
    ],
    sections: [
      {
        heading: 'Infections we commonly treat',
        body: [],
        bullets: [
          'Viral fever, cough and cold',
          'Pneumonia and bronchiolitis',
          'Dengue, typhoid and malaria',
          'Diarrhoea, vomiting and dehydration',
          'Urinary tract infections',
          'Ear, throat and skin infections',
          'Neonatal sepsis in newborns',
        ],
      },
    ],
    urgent: {
      heading: 'Seek urgent care if your child',
      bullets: [
        'Is younger than 3 months and has a fever',
        'Is breathing fast or with difficulty',
        'Is unusually drowsy, irritable or floppy',
        'Is not drinking or has passed little urine',
        'Has a rash that does not fade when pressed',
        'Has a seizure with fever',
      ],
    },
    faqs: [
      {
        q: 'When should I worry about my child’s fever?',
        a: 'See a doctor promptly if your baby is under 3 months, the fever lasts more than 2–3 days, or your child is drowsy, breathing fast, not drinking, or has a rash or seizure.',
      },
      {
        q: 'Can dengue and typhoid tests be done at the hospital?',
        a: 'Yes. Our in-house laboratory performs blood tests used to diagnose and monitor common infections. Ask our team about specific tests.',
      },
    ],
    related: ['pediatrician-in-kurukshetra', 'pediatric-emergency-kurukshetra', 'picu-kurukshetra', 'childrens-hospital-kurukshetra'],
    showPediatrician: true,
    serviceName: 'Child Infection Treatment',
    images: {
      hero: { id: '1779299996338-adc5000d3425', alt: 'Child with a fever-cooling patch resting on a parent’s lap' },
      gallery: [
        { id: '1585437896043-ddf644a92aaf', alt: 'Digital thermometer for checking a child’s temperature', caption: 'Fever assessment' },
        { id: '1606206591513-adbfbdd7a177', alt: 'Blood sample tubes arranged in a laboratory rack', caption: 'In-house laboratory' },
        { id: '1676313030076-4ac0b37050fd', alt: 'Doctor gently examining a child’s tummy with a stethoscope', caption: 'Paediatric examination' },
      ],
    },
  },
];

export const LANDING_PAGE_BY_SLUG: Record<string, LandingPage> = Object.fromEntries(
  LANDING_PAGES.map((p) => [p.slug, p]),
);

type HindiPageCopy = Pick<
  LandingPage,
  'linkLabel' | 'title' | 'description' | 'eyebrow' | 'h1' | 'h1Highlight' | 'intro'
>;

const HINDI_PAGE_COPY: Record<string, HindiPageCopy> = {
  'childrens-hospital-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में बच्चों का अस्पताल',
    title: 'कुरुक्षेत्र में बच्चों और बाल चिकित्सा का श्रेष्ठ अस्पताल',
    description: 'राधाकिशन चिल्ड्रन हॉस्पिटल, कुरुक्षेत्र में नवजात और बाल चिकित्सा की भरोसेमंद देखभाल।',
    eyebrow: 'राधाकिशन चिल्ड्रन हॉस्पिटल · 1987 से',
    h1: 'बच्चों और बाल चिकित्सा का अस्पताल',
    h1Highlight: 'कुरुक्षेत्र में',
    intro: [
      'परिवारों को बच्चों के लिए केवल क्लिनिक नहीं, बल्कि ऐसा अस्पताल चाहिए जहाँ बाल विशेषज्ञ, NICU, PICU और 24 घंटे की आपातकालीन सेवा एक ही जगह उपलब्ध हो। राधाकिशन अस्पताल 1987 से कुरुक्षेत्र, थानेसर और आसपास के परिवारों की सेवा कर रहा है।',
      'सामान्य बुखार से लेकर समय से पहले जन्मे नवजात या वेंटिलेटर सहायता की आवश्यकता वाले बच्चे तक, हमारी बाल चिकित्सा टीम शिशुओं, बच्चों और किशोरों की परिवार-केंद्रित देखभाल करती है।',
    ],
  },
  'pediatrician-in-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में बाल विशेषज्ञ',
    title: 'कुरुक्षेत्र में श्रेष्ठ बाल विशेषज्ञ और शिशु रोग विशेषज्ञ',
    description: 'राधाकिशन अस्पताल, कुरुक्षेत्र में बच्चों के डॉक्टर से परामर्श और 24 घंटे बाल आपातकालीन सेवा।',
    eyebrow: 'कुरुक्षेत्र में बच्चों के डॉक्टर',
    h1: 'बाल विशेषज्ञ और शिशु रोग विशेषज्ञ',
    h1Highlight: 'कुरुक्षेत्र में',
    intro: [
      'अपने बच्चे के लिए अनुभवी और भरोसेमंद बाल विशेषज्ञ की तलाश है? राधाकिशन अस्पताल में नवजात शिशुओं, बच्चों और किशोरों के लिए विशेषज्ञ परामर्श उपलब्ध है।',
      'बच्चे की जांच, टीकाकरण, पोषण, विकास, सामान्य बीमारी और गंभीर लक्षणों के लिए हमारी टीम परिवारों को स्पष्ट सलाह और उपचार योजना देती है।',
    ],
  },
  'nicu-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में NICU',
    title: 'कुरुक्षेत्र में NICU और नवजात शिशु की देखभाल',
    description: 'राधाकिशन अस्पताल में समय से पहले जन्मे और बीमार नवजात शिशुओं के लिए NICU देखभाल।',
    eyebrow: 'नवजात गहन चिकित्सा · कुरुक्षेत्र',
    h1: 'नवजात शिशु की गहन देखभाल',
    h1Highlight: 'कुरुक्षेत्र में NICU',
    intro: [
      'समय से पहले जन्मे, कम वजन वाले या अतिरिक्त निगरानी की आवश्यकता वाले नवजात शिशुओं के लिए राधाकिशन अस्पताल में NICU सुविधा उपलब्ध है।',
      'हमारी टीम सांस लेने में कठिनाई, संक्रमण, पीलिया, कम रक्त शर्करा और अन्य नवजात समस्याओं में निरंतर निगरानी और परिवार-केंद्रित देखभाल देती है।',
    ],
  },
  'picu-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में PICU',
    title: 'कुरुक्षेत्र में PICU और बाल गहन चिकित्सा',
    description: 'राधाकिशन अस्पताल में गंभीर रूप से बीमार बच्चों के लिए PICU और निरंतर निगरानी।',
    eyebrow: 'बाल गहन चिकित्सा · कुरुक्षेत्र',
    h1: 'बच्चों की गहन चिकित्सा',
    h1Highlight: 'कुरुक्षेत्र में PICU',
    intro: [
      'गंभीर बीमारी या चोट में बच्चे को तुरंत विशेषज्ञ निगरानी और सहायता चाहिए। राधाकिशन अस्पताल का PICU बच्चों के लिए समर्पित गहन चिकित्सा सुविधा है।',
      'हमारी टीम सांस की परेशानी, गंभीर संक्रमण, दौरे और अन्य आपात स्थितियों में लगातार निगरानी, आवश्यक जांच और उपचार प्रदान करती है।',
    ],
  },
  'pediatric-emergency-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में बाल आपातकाल',
    title: 'कुरुक्षेत्र में 24 घंटे बाल आपातकालीन सेवा',
    description: 'राधाकिशन अस्पताल में बच्चों और नवजात शिशुओं के लिए 24 घंटे आपातकालीन चिकित्सा सहायता।',
    eyebrow: '24 घंटे बाल आपातकाल · कुरुक्षेत्र',
    h1: 'बाल आपातकालीन सेवा',
    h1Highlight: '24 घंटे उपलब्ध',
    intro: [
      'बच्चों की आपात स्थिति किसी भी समय हो सकती है। राधाकिशन अस्पताल में 24 घंटे बाल आपातकालीन सेवा, विशेषज्ञ टीम और आवश्यक प्रारंभिक सहायता उपलब्ध है।',
      'तेज बुखार, सांस लेने में कठिनाई, दौरे, चोट, निर्जलीकरण या अचानक बिगड़ती स्थिति में तुरंत अस्पताल आएँ या आपातकालीन नंबर पर कॉल करें।',
    ],
  },
  'newborn-jaundice-treatment-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में नवजात पीलिया उपचार',
    title: 'कुरुक्षेत्र में नवजात पीलिया का उपचार',
    description: 'राधाकिशन अस्पताल में नवजात पीलिया की जांच, निगरानी और विशेषज्ञ उपचार।',
    eyebrow: 'नवजात पीलिया · कुरुक्षेत्र',
    h1: 'नवजात पीलिया का उपचार',
    h1Highlight: 'कुरुक्षेत्र में',
    intro: [
      'नवजात शिशुओं में पीलिया सामान्य हो सकता है, लेकिन कुछ बच्चों को जांच और उपचार की आवश्यकता होती है। हमारी बाल चिकित्सा टीम सुरक्षित और समय पर मूल्यांकन करती है।',
      'बिलीरुबिन की जांच, नियमित निगरानी और आवश्यकता पड़ने पर फोटोथेरेपी जैसी सुविधाएँ अस्पताल में उपलब्ध हैं।',
    ],
  },
  'pediatric-seizure-treatment-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में बच्चों के दौरे का उपचार',
    title: 'कुरुक्षेत्र में बच्चों के दौरे और फिट का उपचार',
    description: 'बच्चों में दौरे और फिट के मूल्यांकन तथा उपचार के लिए राधाकिशन अस्पताल की बाल चिकित्सा सेवा।',
    eyebrow: 'बच्चों में दौरे · कुरुक्षेत्र',
    h1: 'बच्चों में दौरे और फिट का उपचार',
    h1Highlight: 'कुरुक्षेत्र में',
    intro: [
      'बच्चे को पहली बार दौरा पड़ने पर परिवार के लिए यह बहुत चिंताजनक हो सकता है। राधाकिशन अस्पताल में बाल विशेषज्ञ कारण का मूल्यांकन कर उचित उपचार और आगे की योजना बताते हैं।',
      'दौरे के दौरान बच्चे को सुरक्षित रखें और मुँह में कुछ न डालें। दौरा लंबा चले, बार-बार आए या सांस में परेशानी हो तो तुरंत आपातकालीन सहायता लें।',
    ],
  },
  'pediatric-asthma-treatment-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में बच्चों का अस्थमा उपचार',
    title: 'कुरुक्षेत्र में बच्चों के अस्थमा और सांस की समस्या का उपचार',
    description: 'राधाकिशन अस्पताल में बच्चों के अस्थमा, घरघराहट और सांस की परेशानी की विशेषज्ञ देखभाल।',
    eyebrow: 'बाल श्वसन देखभाल · कुरुक्षेत्र',
    h1: 'बच्चों का अस्थमा और सांस की देखभाल',
    h1Highlight: 'कुरुक्षेत्र में',
    intro: [
      'अस्थमा और घरघराहट बच्चों की नींद, खेल और रोजमर्रा की गतिविधियों को प्रभावित कर सकती है। हमारी टीम लक्षणों का मूल्यांकन कर बच्चे के लिए स्पष्ट उपचार योजना बनाती है।',
      'सांस लेने में बहुत कठिनाई, होंठ नीले पड़ना या बच्चा बोल न पाना आपात संकेत हैं। ऐसी स्थिति में तुरंत अस्पताल आएँ।',
    ],
  },
  'child-infection-treatment-kurukshetra': {
    linkLabel: 'कुरुक्षेत्र में बच्चों के संक्रमण का उपचार',
    title: 'कुरुक्षेत्र में बच्चों के संक्रमण और बुखार का उपचार',
    description: 'राधाकिशन अस्पताल में बच्चों के बुखार, संक्रमण, डेंगू और टाइफाइड के मूल्यांकन की सुविधा।',
    eyebrow: 'बाल संक्रमण देखभाल · कुरुक्षेत्र',
    h1: 'बच्चों के संक्रमण और बुखार का उपचार',
    h1Highlight: 'कुरुक्षेत्र में',
    intro: [
      'बुखार बच्चों में सामान्य है, लेकिन लगातार बुखार या अन्य लक्षणों में बाल विशेषज्ञ की सलाह जरूरी है। राधाकिशन अस्पताल में जांच और उपचार एक ही जगह उपलब्ध हैं।',
      'हमारी टीम बुखार, खांसी, संक्रमण, उल्टी, दस्त और निर्जलीकरण में बच्चे की स्थिति के अनुसार सुरक्षित उपचार और घर पर देखभाल की सलाह देती है।',
    ],
  },
};

export function getLandingPage(slug: string, language: string): LandingPage {
  const page = LANDING_PAGE_BY_SLUG[slug];
  if (!page) {
    throw new Error(`Unknown landing page slug: ${slug}`);
  }
  if (language !== 'hi') return page;

  const copy = HINDI_PAGE_COPY[slug];
  if (!copy) return page;

  return {
    ...page,
    ...copy,
    highlights: page.highlights.map((highlight) => ({
      ...highlight,
      title: 'विशेषज्ञ देखभाल',
      text: 'अनुभवी टीम द्वारा सुरक्षित, सहानुभूतिपूर्ण और परिवार-केंद्रित देखभाल।',
    })),
    sections: page.sections.map((section) => ({
      ...section,
      heading: 'आपके बच्चे के लिए समर्पित देखभाल',
      body: ['हमारी टीम आवश्यक जांच, उपचार और आगे की देखभाल के बारे में परिवार को सरल भाषा में समझाती है।'],
      bullets: section.bullets?.map(() => 'विशेषज्ञ चिकित्सा देखभाल और निरंतर निगरानी'),
    })),
    urgent: page.urgent
      ? {
          heading: 'इन लक्षणों में तुरंत आपातकालीन सहायता लें',
          bullets: page.urgent.bullets.map(() => 'बच्चे की स्थिति अचानक बिगड़ना या सांस लेने में परेशानी'),
        }
      : undefined,
    faqs: page.faqs.map((faq) => ({
      q: 'बच्चे के लिए अस्पताल में कौन-सी सुविधा उपलब्ध है?',
      a: 'राधाकिशन अस्पताल में बाल विशेषज्ञ, आवश्यक जांच, उपचार और 24 घंटे की आपातकालीन सहायता उपलब्ध है।',
    })),
  };
}
