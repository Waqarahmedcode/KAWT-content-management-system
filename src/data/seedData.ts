export type DefinedTopic =
  | 'Zakat'
  | 'Medical'
  | 'Emergency'
  | 'Free Camp'
  | 'Diagnostics'
  | 'Maternal & Child'
  | 'Awareness'
  | 'Community';

export interface TopicMeta {
  id: DefinedTopic;
  label: string;
  urduLabel: string;
  description: string;
  badgeClass: string;
  colorHex: string;
  bgHex: string;
  borderHex: string;
  keywords: string[];
}

export const DEFINED_TOPICS_LIST: TopicMeta[] = [
  {
    id: 'Zakat',
    label: 'Zakat & Charity',
    urduLabel: 'زکوٰۃ و صدقات',
    description: '100% Shariah-compliant Zakat appeals, donation campaigns & financial transparency',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    colorHex: '#0C7A4A',
    bgHex: '#EBF7EE',
    borderHex: '#A3D9B5',
    keywords: [
      'zakat', 'sadqah', 'donation', 'donations', 'charity', 'fund', 'fundraiser', 'shariah', 'nisab', 'eligible',
      'زکوٰۃ', 'صدقہ', 'عطیات', 'مستحق', 'خیرات', 'فنڈ', 'صدقات', 'حقدار', 'عطیہ'
    ],
  },
  {
    id: 'Medical',
    label: 'Medical & OPD',
    urduLabel: 'طبی علاج و او پی ڈی',
    description: 'Specialist doctors, outpatient clinics, consultations, and prescription medicines',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    colorHex: '#C3202F',
    bgHex: '#FDF2F2',
    borderHex: '#F8B4B4',
    keywords: [
      'doctor', 'dr.', 'physician', 'opd', 'clinic', 'specialist', 'consultation', 'consult', 'prescription', 'medicine', 'medicines', 'hospital', 'patient', 'treatment', 'steth',
      'ڈاکٹر', 'او پی ڈی', 'طبی', 'علاج', 'ادویات', 'مریض', 'معائنہ', 'کلینک', 'ہسپتال', 'نسخہ'
    ],
  },
  {
    id: 'Emergency',
    label: 'Emergency Care',
    urduLabel: 'ایمرجنسی و فوری نگہداشت',
    description: '24/7 urgent night care, acute trauma, sudden fever, midnight clinic',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    colorHex: '#D97706',
    bgHex: '#FEF3C7',
    borderHex: '#FCD34D',
    keywords: [
      'emergency', 'urgent', 'urgent care', 'night care', 'night clinic', '24/7', '24 hours', 'acute', 'trauma', 'distress', 'fever', 'dehydration', 'midnight', 'critical',
      'ایمرجنسی', 'فوری', 'ارجنٹ', 'حادثہ', 'شدید', 'رات کے وقت', '24 گھنٹے', 'ہنگامی'
    ],
  },
  {
    id: 'Free Camp',
    label: 'Free Medical Camps',
    urduLabel: 'مفت میڈیکل کیمپ',
    description: 'Outreach free medical camps in Thatta, Hub Balochistan, and underprivileged settlements',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
    colorHex: '#0D9488',
    bgHex: '#CCFBF1',
    borderHex: '#5EEAD4',
    keywords: [
      'camp', 'medical camp', 'free camp', 'camps', 'thatta', 'hub', 'golimar', 'baldiya', 'outreach', 'rural', 'chatto chand', 'fmc',
      'کیمپ', 'مفت کیمپ', 'گوٹھ', 'دیہی', 'ٹھٹھہ', 'حب', 'پسماندہ'
    ],
  },
  {
    id: 'Diagnostics',
    label: 'Diagnostics & Labs',
    urduLabel: 'تشخیص و لیبارٹری',
    description: 'Diagnostic ultrasound, pathology tests, vital screening, and blood work',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    colorHex: '#4F46E5',
    bgHex: '#EEF2FF',
    borderHex: '#C7D2FE',
    keywords: [
      'ultrasound', 'lab', 'laboratory', 'sonology', 'sonologist', 'diagnostics', 'diagnostic', 'blood test', 'screening', 'ecg', 'radiology',
      'الٹراساؤنڈ', 'لیب', 'تشخیص', 'ٹیسٹ', 'لیبارٹری', 'خون', 'اسکریننگ'
    ],
  },
  {
    id: 'Maternal & Child',
    label: 'Maternal & Child Health',
    urduLabel: 'ماں اور بچہ',
    description: 'Pediatric care for infants and children, gynecological and antenatal maternal health',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    colorHex: '#9333EA',
    bgHex: '#FAF5FF',
    borderHex: '#E9D5FF',
    keywords: [
      'pediatric', 'pediatrician', 'child', 'children', 'infant', 'baby', 'gynecology', 'gynecologist', 'maternal', 'mother', 'mothers', 'pregnant', 'pregnancy', 'antenatal',
      'بچے', 'اطفال', 'ماں', 'حاملہ', 'خواتین', 'نوزائیدہ', 'زچہ و بچہ', 'امراض نسواں'
    ],
  },
  {
    id: 'Awareness',
    label: 'Health Awareness',
    urduLabel: 'آگاہی و احتیاطی تدابیر',
    description: 'International health days, preventive measures, disease symptom guides, and public tips',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
    colorHex: '#0284C7',
    bgHex: '#E0F2FE',
    borderHex: '#BAE6FD',
    keywords: [
      'awareness', 'prevention', 'tips', 'warning signs', 'world heart day', 'world sight day', 'hygiene', 'handwashing', 'breast cancer', 'mental health', 'education', 'lifestyle',
      'آگاہی', 'احتیاط', 'علامات', 'عالمی یوم', 'صحت مند', 'رہنمائی', 'حفاظتی'
    ],
  },
  {
    id: 'Community',
    label: 'Community & Relief',
    urduLabel: 'خدمتِ خلق و فلاح',
    description: 'Clean RO drinking water, ration packages, volunteer mobilization, and disaster relief',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    colorHex: '#2563EB',
    bgHex: '#EFF6FF',
    borderHex: '#BFDBFE',
    keywords: [
      'volunteer', 'volunteers', 'community', 'ration', 'clean water', 'ro plant', 'food', 'iftar', 'solidarity', 'relief', 'welfare', 'flood',
      'خدمت', 'رضاکار', 'راشن', 'صاف پانی', 'امدادی', 'فلاح', 'سماجی'
    ],
  },
];

export function autoTagPostContent(post: {
  title?: string;
  urduText?: string;
  englishText?: string;
  hook?: string;
  campaignName?: string;
  visualPrompt?: string;
  hashtags?: string[];
  callToAction?: string;
}): DefinedTopic[] {
  const combinedText = [
    post.title || '',
    post.urduText || '',
    post.englishText || '',
    post.hook || '',
    post.campaignName || '',
    post.visualPrompt || '',
    (post.hashtags || []).join(' '),
    post.callToAction || '',
  ]
    .join(' ')
    .toLowerCase();

  const matched: DefinedTopic[] = [];

  for (const topic of DEFINED_TOPICS_LIST) {
    let score = 0;
    for (const kw of topic.keywords) {
      const lowerKw = kw.toLowerCase();
      if (combinedText.includes(lowerKw)) {
        score++;
      }
    }

    // Specific domain boosting rules
    if (topic.id === 'Zakat') {
      if (
        combinedText.includes('zakat') ||
        combinedText.includes('زکوٰۃ') ||
        combinedText.includes('sadqah') ||
        combinedText.includes('صدقہ') ||
        combinedText.includes('100% zakat')
      ) {
        score += 2;
      }
    }
    if (topic.id === 'Medical') {
      if (
        combinedText.includes('doctor') ||
        combinedText.includes('dr.') ||
        combinedText.includes('opd') ||
        combinedText.includes('ڈاکٹر') ||
        combinedText.includes('physician') ||
        combinedText.includes('clinic')
      ) {
        score += 2;
      }
    }
    if (topic.id === 'Emergency') {
      if (
        combinedText.includes('urgent') ||
        combinedText.includes('emergency') ||
        combinedText.includes('ایمرجنسی') ||
        combinedText.includes('24/7') ||
        combinedText.includes('night clinic') ||
        combinedText.includes('night care')
      ) {
        score += 3;
      }
    }
    if (topic.id === 'Free Camp') {
      if (
        combinedText.includes('medical camp') ||
        combinedText.includes('free camp') ||
        combinedText.includes('کیمپ') ||
        combinedText.includes('thatta') ||
        combinedText.includes('hub')
      ) {
        score += 3;
      }
    }
    if (topic.id === 'Diagnostics') {
      if (
        combinedText.includes('ultrasound') ||
        combinedText.includes('sonolog') ||
        combinedText.includes('الٹراساؤنڈ') ||
        combinedText.includes('lab test') ||
        combinedText.includes('pathology')
      ) {
        score += 3;
      }
    }
    if (topic.id === 'Maternal & Child') {
      if (
        combinedText.includes('pediatric') ||
        combinedText.includes('child') ||
        combinedText.includes('gynecolog') ||
        combinedText.includes('اطفال') ||
        combinedText.includes('ماں')
      ) {
        score += 3;
      }
    }
    if (topic.id === 'Awareness') {
      if (
        combinedText.includes('awareness') ||
        combinedText.includes('world heart') ||
        combinedText.includes('world sight') ||
        combinedText.includes('آگاہی') ||
        combinedText.includes('prevention')
      ) {
        score += 3;
      }
    }

    if (score >= 2 || (score >= 1 && ['Emergency', 'Diagnostics', 'Awareness'].includes(topic.id))) {
      matched.push(topic.id);
    }
  }

  // Fallback: If nothing matched, default to 'Medical'
  if (matched.length === 0) {
    matched.push('Medical');
  }

  return matched;
}

export interface Post {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube';
  status: 'Draft' | 'In Review' | 'Scheduled' | 'Published';
  format: 'Single Image' | 'Carousel' | 'Reel / Video' | 'Story' | 'Infographic';
  campaignId: string;
  campaignName: string;
  urduText: string;
  englishText: string;
  hook: string;
  callToAction: string;
  hashtags: string[];
  assignedTo: string;
  visualPrompt: string;
  targetAudience: string;
  topics?: DefinedTopic[];
  metrics?: {
    views?: number;
    likes: number;
    shares: number;
    comments: number;
    donationsLinked: number; // PKR
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  opdDays: string;
  opdTimings: string;
  consultationFee: string;
  location: string;
  isUrgentCare?: boolean;
}

export interface FreeMedicalCamp {
  campCode: string;
  name: string;
  date: string;
  location: string;
  address: string;
  partnerOrg?: string;
  organizer: string;
  patientsServed: number;
  demographics: {
    male: number;
    female: number;
    children: number;
    adults: number;
    elderly: number;
    emergency: number;
    referrals: number;
    pregnant?: number;
  };
  clinicalTeam: {
    doctors: number;
    nurses: number;
    paramedics: number;
    volunteers: number;
    pharmacists: number;
    labTechs: number;
  };
  topDiseases: Array<{ condition: string; sharePct: number }>;
  financials: {
    totalBudget: number; // PKR
    zakatFund: number;
    zakatPct: number;
    operationalBudget: number;
    costPerPatient: number;
  };
  medicinesDistributed: number;
  notes: string;
}

export interface Campaign {
  id: string;
  title: string;
  urduTitle: string;
  category: 'Free Medical Camps' | 'Specialist OPD' | 'Emergency Healthcare' | 'Maternal & Child Health' | 'Diagnostics & Labs';
  targetAmount: number; // PKR
  raisedAmount: number; // PKR
  beneficiariesServed: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  description: string;
  urduDescription: string;
  zakatEligible: boolean;
  accentColor: string;
  hashtags: string[];
}

export interface OpdClinic {
  id: string;
  name: string;
  urduName: string;
  doctorName: string;
  doctorTitle: string;
  days: string;
  timings: string;
  location: string;
  dailyCapacity: number;
  isFree: boolean;
  services: string[];
  urgentAlert?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  platform?: 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube';
  assignedTo: string;
  role: 'Social Media Manager' | 'Content Creator' | 'Video Manager' | 'Copywriter' | 'Medical Advisor';
  category: 'Copywriting' | 'Design' | 'Video Editing' | 'Translation' | 'Approval';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Idea' | 'Draft' | 'Designing' | 'Review' | 'Approved' | 'Scheduled' | 'Published';
  dueDate: string;
  relatedCampaign?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarColor: string;
  email: string;
  phone: string;
  activeTasks: number;
  completedTasks: number;
}

// 1. ALL 15 DOCTORS FROM OFFICIAL OPD SCHEDULE (Nazimabad Medical Center)
export const OFFICIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ishwar Lohana',
    specialty: 'Pediatrician',
    opdDays: 'Monday to Saturday',
    opdTimings: '12:00 PM – 3:00 PM & 9:30 PM – 11:00 PM',
    consultationFee: 'Rs. 1,000',
    location: 'Khidmat-e-Alam Medical Center, 351, Usmania Society, B Road, Nazimabad No. 1, Karachi',
  },
  {
    id: 'doc-2',
    name: 'Dr. Naveed Khan',
    specialty: 'Family Physician, Pediatrician',
    opdDays: 'Monday to Saturday',
    opdTimings: '8:30 PM – 11:00 PM',
    consultationFee: 'Rs. 800',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-3',
    name: 'Dr. Arjun Kumar',
    specialty: 'Consultant Physician',
    opdDays: 'Monday, Friday, Saturday & Sunday',
    opdTimings: '4:00 PM – 7:00 PM / 6:00 PM – 8:00 PM',
    consultationFee: 'Rs. 1,000',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-4',
    name: 'Dr. Shahnawaz',
    specialty: 'Gastroenterologist',
    opdDays: 'Monday, Tuesday & Thursday',
    opdTimings: '12:00 PM – 2:00 PM',
    consultationFee: 'Rs. 1,000',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-5',
    name: 'Dr. Binesh Bakai',
    specialty: 'Pediatrician',
    opdDays: 'Monday to Saturday',
    opdTimings: '7:30 PM – 10:00 PM',
    consultationFee: 'Rs. 800',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-6',
    name: 'Dr. Sajida Nadeem',
    specialty: 'Gynecologist',
    opdDays: 'Monday, Wednesday & Friday',
    opdTimings: '4:00 PM – 7:00 PM',
    consultationFee: 'Rs. 1,000',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-7',
    name: 'Dr. Nadia Shehzad',
    specialty: 'Gynecologist',
    opdDays: 'Monday & Wednesday',
    opdTimings: '12:00 PM – 2:00 PM',
    consultationFee: 'Rs. 700',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-8',
    name: 'Dr. Jaywanti Jha',
    specialty: 'Dermatologist',
    opdDays: 'Monday & Friday',
    opdTimings: '5:00 PM – 6:00 PM',
    consultationFee: 'Rs. 700',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-9',
    name: 'Dr. Khalid Ahmed',
    specialty: 'Dermatologist',
    opdDays: 'Thursday',
    opdTimings: '8:30 PM – 9:30 PM',
    consultationFee: 'Rs. 300',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-10',
    name: 'Dr. Umair Ali',
    specialty: 'General Physician',
    opdDays: 'Monday to Saturday',
    opdTimings: '9:00 PM – 12:00 AM',
    consultationFee: 'Rs. 600',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-11',
    name: 'Dr. Somreen Zahra',
    specialty: 'Sonologist (Ultrasound Diagnostics)',
    opdDays: 'Monday to Saturday',
    opdTimings: '10:00 AM – 1:00 PM',
    consultationFee: 'Ultrasound Charges Only',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
  },
  {
    id: 'doc-12',
    name: 'Dr. Layakat',
    specialty: 'General Physician (Urgent Care)',
    opdDays: 'Monday to Saturday',
    opdTimings: '8:00 AM – 2:00 PM',
    consultationFee: 'Rs. 500',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
    isUrgentCare: true,
  },
  {
    id: 'doc-13',
    name: 'Dr. Shahnawaz (Urgent Care)',
    specialty: 'General Physician (Urgent Care)',
    opdDays: 'Monday to Saturday',
    opdTimings: '2:00 PM – 8:00 PM',
    consultationFee: 'Rs. 500',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
    isUrgentCare: true,
  },
  {
    id: 'doc-14',
    name: 'Dr. Ashok Kumar',
    specialty: 'General Physician (Urgent Care - Night)',
    opdDays: 'Alternate Nights',
    opdTimings: '8:00 PM – 8:00 AM',
    consultationFee: 'Rs. 500',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
    isUrgentCare: true,
  },
  {
    id: 'doc-15',
    name: 'Dr. Arshad',
    specialty: 'General Physician (Urgent Care - Night)',
    opdDays: 'Alternate Nights',
    opdTimings: '8:00 PM – 8:00 AM',
    consultationFee: 'Rs. 500',
    location: 'Khidmat-e-Alam Medical Center, Nazimabad, Karachi',
    isUrgentCare: true,
  },
];

// 2. ALL 5 OFFICIAL FREE MEDICAL CAMPS (From Complete Report 2026)
export const OFFICIAL_MEDICAL_CAMPS: FreeMedicalCamp[] = [
  {
    campCode: 'FMC-01',
    name: 'Purana Golimar Free Medical Camp',
    date: '2026-04-26',
    location: 'Purana Golimar, Karachi Central',
    address: 'Old KMC Quarters, Near Mewa Shah Qabrustan, Purana Golimar, Karachi',
    partnerOrg: 'KMC Community Wing',
    organizer: 'Waqar Ahmed',
    patientsServed: 320,
    demographics: {
      male: 102,
      female: 208,
      children: 124,
      adults: 163,
      elderly: 13,
      emergency: 30,
      referrals: 30,
      pregnant: 12,
    },
    clinicalTeam: {
      doctors: 3,
      nurses: 4,
      paramedics: 0,
      volunteers: 8,
      pharmacists: 1,
      labTechs: 1,
    },
    topDiseases: [
      { condition: 'Gastric & Acidity', sharePct: 29 },
      { condition: 'Back & Joint Pain', sharePct: 27 },
      { condition: 'Neurological & Weakness', sharePct: 18 },
      { condition: 'Respiratory & Allergy', sharePct: 17 },
      { condition: 'Other Conditions', sharePct: 9 },
    ],
    financials: {
      totalBudget: 257500,
      zakatFund: 181000,
      zakatPct: 70,
      operationalBudget: 76500,
      costPerPatient: 804,
    },
    medicinesDistributed: 5162,
    notes: 'First camp of 2026. High female and child turnout. 70% budget applied directly on Zakat-compliant medicines.',
  },
  {
    campCode: 'FMC-02',
    name: 'Yousuf Goath Baldiya Town Medical Camp',
    date: '2026-06-14',
    location: 'Baldiya Town, Karachi West',
    address: 'Yousuf Goath Community Center, Baldiya Town, Karachi',
    partnerOrg: 'Baldiya Town Community',
    organizer: 'Waqar Ahmed',
    patientsServed: 254,
    demographics: {
      male: 148,
      female: 106,
      children: 74,
      adults: 168,
      elderly: 9,
      emergency: 7,
      referrals: 20,
      pregnant: 6,
    },
    clinicalTeam: {
      doctors: 3,
      nurses: 5,
      paramedics: 2,
      volunteers: 8,
      pharmacists: 1,
      labTechs: 1,
    },
    topDiseases: [
      { condition: 'Gastric & Acidity', sharePct: 29 },
      { condition: 'Back & Joint Pain', sharePct: 27 },
      { condition: 'Neurological & Weakness', sharePct: 18 },
      { condition: 'Respiratory & Allergy', sharePct: 17 },
      { condition: 'Other Conditions', sharePct: 9 },
    ],
    financials: {
      totalBudget: 243360,
      zakatFund: 177560,
      zakatPct: 73,
      operationalBudget: 65800,
      costPerPatient: 957,
    },
    medicinesDistributed: 5557,
    notes: 'High musculoskeletal and gastrointestinal disease burden among industrial laborers and families.',
  },
  {
    campCode: 'FMC-03',
    name: 'Galaxy Town Free Medical Camp – 3',
    date: '2026-07-05',
    location: 'Galaxy Town, Hub, Balochistan',
    address: 'Jamia-tul-Shariah Al-Uloom, Galaxy Town, Hub, Balochistan',
    partnerOrg: 'Jamia-tul-Shariah Al-Uloom',
    organizer: 'Waqar Ahmed',
    patientsServed: 577,
    demographics: {
      male: 313,
      female: 264,
      children: 184,
      adults: 335,
      elderly: 58,
      emergency: 20,
      referrals: 0,
    },
    clinicalTeam: {
      doctors: 4,
      nurses: 4,
      paramedics: 3,
      volunteers: 10,
      pharmacists: 4,
      labTechs: 4,
    },
    topDiseases: [
      { condition: 'Pain, Fever & Body Aches', sharePct: 25 },
      { condition: 'Respiratory, Cold & Allergy', sharePct: 20 },
      { condition: 'Gastric, Acidity & Indigestion', sharePct: 15 },
      { condition: 'Bacterial Infections', sharePct: 15 },
      { condition: 'Diarrhea & Intestinal Infections', sharePct: 10 },
      { condition: 'Nutritional Deficiency', sharePct: 8 },
      { condition: 'Skin & Fungal Conditions', sharePct: 5 },
    ],
    financials: {
      totalBudget: 505160,
      zakatFund: 401260,
      zakatPct: 79,
      operationalBudget: 103900,
      costPerPatient: 875,
    },
    medicinesDistributed: 11590,
    notes: '577 patients in one day. 19-member clinical team + 10 volunteers. 31.9% children under 12. 79.4% budget on medicines.',
  },
  {
    campCode: 'FMC-04',
    name: 'Free Medical Camp-4 – Galaxy Town',
    date: '2026-07-26',
    location: 'Galaxy Town, Hub, Balochistan',
    address: 'Jamia-tul-Shariah Al-Uloom, Galaxy Town, Hub, Balochistan',
    partnerOrg: 'Jamia-tul-Shariah Al-Uloom',
    organizer: 'Waqar Ahmed',
    patientsServed: 619,
    demographics: {
      male: 228,
      female: 102,
      children: 268,
      adults: 330,
      elderly: 21,
      emergency: 0,
      referrals: 0,
    },
    clinicalTeam: {
      doctors: 5,
      nurses: 0,
      paramedics: 0,
      volunteers: 15,
      pharmacists: 0,
      labTechs: 0,
    },
    topDiseases: [
      { condition: 'Nutrition, Multivitamins & Bone Health', sharePct: 19 },
      { condition: 'Pain, Fever & Musculoskeletal', sharePct: 17 },
      { condition: 'Gastrointestinal, Acidity & ORS', sharePct: 17 },
      { condition: 'Dermatology & Skin Disease', sharePct: 15 },
      { condition: 'Antimicrobial & Anti-Infective', sharePct: 15 },
      { condition: 'Allergies, Respiratory & Antihistamines', sharePct: 10 },
      { condition: 'Cardiovascular & Anorectal', sharePct: 7 },
    ],
    financials: {
      totalBudget: 605851,
      zakatFund: 497291,
      zakatPct: 82,
      operationalBudget: 108560,
      costPerPatient: 979,
    },
    medicinesDistributed: 9800,
    notes: 'Scaled up follow-up camp in Hub, Balochistan. 82.08% Zakat medicine coverage across 39 generic therapeutic groups and 48 lines.',
  },
  {
    campCode: 'FMC-05',
    name: 'Free Medical Camp-5 – Thatta',
    date: '2026-08-16',
    location: 'Thatta, Sindh',
    address: 'Goath Chatto Chand, Pang/Panjh Mori, Thatta, Sindh',
    organizer: 'Waqar Ahmed',
    patientsServed: 548,
    demographics: {
      male: 130,
      female: 130,
      children: 230,
      adults: 260,
      elderly: 58,
      emergency: 3,
      referrals: 0,
    },
    clinicalTeam: {
      doctors: 4,
      nurses: 4,
      paramedics: 2,
      volunteers: 8,
      pharmacists: 2,
      labTechs: 2,
    },
    topDiseases: [
      { condition: 'Waterborne GI & Dehydration', sharePct: 32 },
      { condition: 'Malaria & High Seasonal Fever', sharePct: 24 },
      { condition: 'Malnutrition & Pediatric Anemia', sharePct: 22 },
      { condition: 'Skin & Scabies Fungal Infections', sharePct: 14 },
      { condition: 'Chronic Respiratory Illness', sharePct: 8 },
    ],
    financials: {
      totalBudget: 419506,
      zakatFund: 267806,
      zakatPct: 64,
      operationalBudget: 151700,
      costPerPatient: 766,
    },
    medicinesDistributed: 7400,
    notes: 'Underdeveloped rural coastal community with high river-flood hazard classification. 42% children and 11% elderly (53% vulnerable).',
  },
];

export const CONSOLIDATED_CAMP_STATS = {
  totalCamps: 5,
  totalPatientsServed: 2318,
  totalBudgetPKR: 2031377,
  zakatFundPKR: 1524917,
  zakatPercentage: 75,
  generalDonationsPKR: 506460,
  generalPercentage: 25,
  totalMedicineUnitsDistributed: 22309,
  emergenciesStabilized: 60,
  doctorsMobilized: 19,
  volunteersMobilized: 49,
  averagePatientsPerCamp: 464,
  demographics: {
    male: 921,
    malePct: 40,
    female: 810,
    femalePct: 35,
    children: 880,
    childrenPct: 38,
    elderly: 159,
    elderlyPct: 7,
  },
};

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
    urduTitle: 'مفت میڈیکل کیمپس پروگرام 2026 - خدمتِ عالم ٹرسٹ',
    category: 'Free Medical Camps',
    targetAmount: 3000000,
    raisedAmount: 2031377,
    beneficiariesServed: 2318,
    startDate: '2026-04-01',
    endDate: '2026-10-31',
    status: 'Active',
    description: 'Providing specialist consultations, diagnostic screening, and 100% free complete-course medicines across marginalized areas (Thatta, Hub Balochistan, Purana Golimar, Baldiya Town).',
    urduDescription: '2,318 سے زائد غریب اور دیہی مریضوں کا مفت معائنہ، 22,309 امپورٹڈ و معیاری ادویات کی مفت فراہمی۔ صدقہ و زکوٰۃ کا شفاف استعمال۔',
    zakatEligible: true,
    accentColor: '#C3202F',
    hashtags: ['#KAWTMedicalCamps', '#FreeHealthcare', '#ZakatEligible', '#KarachiCharity', '#SindhRelief'],
  },
  {
    id: 'camp-2',
    title: 'Nazimabad Medical Center Specialist OPD & Urgent Care',
    urduTitle: 'خدمتِ عالم میڈیکل سینٹر - ناظم آباد سپیشلسٹ او پی ڈی',
    category: 'Specialist OPD',
    targetAmount: 2500000,
    raisedAmount: 1950000,
    beneficiariesServed: 3400,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'Active',
    description: '15 renowned doctors providing subsidized and free specialist care (Pediatrics, Gynecology, Gastroenterology, Dermatology, General Medicine, and 24/7 Urgent Care).',
    urduDescription: '15 ماہر ڈاکٹرز کی زیرِ نگرانی روزانہ سینکڑوں مریضوں کو سستی اور مفت علاج کی سہولت۔ ناظم آباد کراچی۔',
    zakatEligible: true,
    accentColor: '#0C7A4A',
    hashtags: ['#KAWTMedicalCenter', '#NazimabadOPD', '#DoctorSchedule', '#HealthcareForAll'],
  },
  {
    id: 'camp-3',
    title: 'Maternal, Child & Ultrasound Diagnostic Waqf',
    urduTitle: 'ماں اور بچے کی صحت و الٹراساؤنڈ فنڈ',
    category: 'Maternal & Child Health',
    targetAmount: 1800000,
    raisedAmount: 1420000,
    beneficiariesServed: 950,
    startDate: '2026-05-01',
    endDate: '2026-11-30',
    status: 'Active',
    description: 'Dedicated Gynecologists (Dr. Sajida Nadeem, Dr. Nadia Shehzad) and Sonologist (Dr. Somreen Zahra) serving low-income expecting mothers with free tests and nutritional support.',
    urduDescription: 'حاملہ خواتین اور نوزائیدہ بچوں کے لیے مفت چیک اپ، الٹراساؤنڈ اور ادویات کی فراہمی۔',
    zakatEligible: true,
    accentColor: '#12305B',
    hashtags: ['#MaternalHealth', '#ChildCare', '#KAWTGynecology', '#UltrasoundWaqf'],
  },
  {
    id: 'camp-4',
    title: 'Emergency Night Clinic & Urgent Care Fund',
    urduTitle: 'ارجنٹ کیئر و ایمرجنسی نائٹ کلینک فنڈ',
    category: 'Emergency Healthcare',
    targetAmount: 1500000,
    raisedAmount: 1100000,
    beneficiariesServed: 1450,
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    status: 'Active',
    description: 'Round-the-clock urgent care covered by Dr. Ashok Kumar and Dr. Arshad for sudden trauma, high-grade fevers, and acute distress with subsidized token fee.',
    urduDescription: 'رات کے وقت غریب اور سفید پوش افراد کے لیے بروقت ایمرجنسی طبی امداد۔',
    zakatEligible: true,
    accentColor: '#B0680A',
    hashtags: ['#UrgentCare', '#EmergencyMedicine', '#KAWTNightClinic', '#KarachiEmergency'],
  },
];

// Preloaded rich posts reflecting actual doctors, camps and awareness days
export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Thatta Free Medical Camp: 548 Patients Received Free Care',
    date: '2026-09-24',
    time: '11:00 AM',
    platform: 'facebook',
    status: 'Published',
    format: 'Single Image',
    campaignId: 'camp-1',
    campaignName: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
    topics: ['Free Camp', 'Medical', 'Zakat'],
    hook: '548 دیہی مریض جن میں 53 فیصد مائیں، بچے اور بزرگ تھے، انہیں ماہر ڈاکٹرز اور مفت ادویات پہنچائی گئیں۔',
    urduText: `الحمدللہ! خدمتِ عالم ویلفیئر ٹرسٹ (KAWT) کے تحت گوٹھ چھٹو چاند (پنج موری، ٹھٹھہ، سندھ) میں پانچویں فری میڈیکل کیمپ کا کامیاب انعقاد۔

سیلاب سے متاثرہ اور پسماندہ ساحلی علاقے کے 548 مریضوں کا مکمل طبی معائنہ کیا گیا جن میں 230 بچے اور 58 بزرگ شامل تھے۔
مریضوں میں پیٹ کے امراض، ملیریا، شدید بخار اور بچوں میں خون کی کمی کے کیسز سامنے آئے۔ تمام مریضوں کو مکمل کورس کی معیاری ادویات بالکل مفت فراہم کی گئیں۔

آپ کی زکوٰۃ کا 100 فیصد حصہ براہِ راست مستحق مریضوں کی ادویات پر خرچ ہوتا ہے۔

📍 رابطہ و عطیات:
خدمتِ عالم میڈیکل سینٹر، 351 عثمانیہ سوسائٹی، بی روڈ، ناظم آباد، کراچی
UAN: 1111528 | www.khidmat-e-alam.org`,
    englishText: `Alhamdulillah! Khidmat-e-Alam Welfare Trust successfully concluded its 5th Free Medical Camp at Goath Chatto Chand, Pang Mori, Thatta, Sindh.

A total of 548 patients were treated by our specialist doctors, with vulnerable groups (children and elderly) comprising 53% of all beneficiaries. Over 7,400 units of life-saving medicines were distributed completely free of charge.

75% of our medical camp funding comes from Shariah-compliant Zakat, spent exclusively on patient medicines.

Support accessible healthcare:
Khidmat-e-Alam Medical Center, 351 Usmania Society, B Road, Nazimabad, Karachi
UAN: 1111528 | www.khidmat-e-alam.org`,
    callToAction: 'Support free medical relief camps in rural Sindh and Balochistan. 100% Zakat applicable.',
    hashtags: ['#KhidmatEAlam', '#ThattaMedicalCamp', '#FreeHealthcare', '#ZakatEligible', '#PakistanNGO'],
    assignedTo: 'Bilal Khan',
    visualPrompt: 'Create a professional NGO healthcare social media design for Khidmat-e-Alam Welfare Trust. Respectful documentary photo of a compassionate Pakistani physician consulting an elderly patient at the Thatta medical camp, clean shaded tent, official KAWT red-and-green banner in background, clear medical atmosphere with UAN 1111528 in footer. Style: Trustworthy, professional, community-focused.',
    targetAudience: 'Philanthropic families, corporate CSR partners, overseas Pakistani donors',
    metrics: { views: 24200, likes: 1840, shares: 312, comments: 96, donationsLinked: 215000 },
  },
  {
    id: 'post-2',
    title: 'Dr. Ishwar Lohana & Dr. Binesh Bakai: Pediatric Health Roster (Carousel)',
    date: '2026-09-25',
    time: '04:30 PM',
    platform: 'instagram',
    status: 'Scheduled',
    format: 'Carousel',
    campaignId: 'camp-2',
    campaignName: 'Nazimabad Medical Center Specialist OPD & Urgent Care',
    topics: ['Medical', 'Maternal & Child'],
    hook: 'Because every child deserves world-class pediatric care at accessible consultation fees.',
    urduText: `ناظم آباد کراچی میں بچوں کی نگہداشت کا بااعتماد مرکز: خدمتِ عالم میڈیکل سینٹر!
ہمارے شعبہ اطفال (Pediatrics) میں سینئر ماہرین امراضِ اطفال اپنی خدمات پیش کر رہے ہیں:

👨‍⚕️ ڈاکٹر ایشور لوہانہ (Pediatrician)
پیر تا ہفتہ: دوپہر 12:00 تا 3:00 بجے اور رات 9:30 تا 11:00 بجے
فیس: صرف 1,000 روپے۔

👨‍⚕️ ڈاکٹر بنیش بکائی (Pediatrician)
پیر تا ہفتہ: شام 7:30 تا رات 10:00 بجے
فیس: صرف 800 روپے۔

👨‍⚕️ ڈاکٹر نوید خان (Family Physician & Pediatrician)
پیر تا ہفتہ: رات 8:30 تا 11:00 بجے
فیس: صرف 800 روپے۔

📍 351، عثمانیہ سوسائٹی، بی روڈ، ناظم آباد نمبر 1، کراچی
📞 ٹوکن و معلومات کے لیے رابطہ کریں: UAN 1111528`,
    englishText: `Trusted Child Healthcare in Nazimabad: Khidmat-e-Alam Medical Center Specialist Pediatrics OPD!

Meet our dedicated Child Specialists:
• Dr. Ishwar Lohana: Mon–Sat 12:00 PM – 3:00 PM & 9:30 PM – 11:00 PM (Fee: Rs. 1,000)
• Dr. Binesh Bakai: Mon–Sat 7:30 PM – 10:00 PM (Fee: Rs. 800)
• Dr. Naveed Khan: Mon–Sat 8:30 PM – 11:00 PM (Fee: Rs. 800)

Comprehensive pediatric growth monitoring, acute childhood infections, nutrition counseling, and emergency care under one roof.

Visit us: 351, Usmania Society, B Road, Nazimabad, Karachi
UAN: 1111528 | www.khidmat-e-alam.org`,
    callToAction: 'Book child specialist token or support pediatric medication fund.',
    hashtags: ['#KAWTMedicalCenter', '#PediatricianKarachi', '#ChildHealth', '#NazimabadDoctors', '#HealthcareNGO'],
    assignedTo: 'Fatima Zahra',
    visualPrompt: 'Create a professional NGO healthcare 5-slide carousel design for Khidmat-e-Alam Welfare Trust. Slide 1: Warm pediatrician in clean clinic gently checking young child with stethoscope. Slides 2-4: Clear typographic doctor profile cards featuring Dr. Ishwar Lohana, Dr. Binesh Bakai, and Dr. Naveed Khan with official schedule and consultation fees. Slide 5: Address and UAN 1111528 contact card. Style: Modern medical infographic, clean deep red and teal green branding.',
    targetAudience: 'Parents, families in Nazimabad, Liaquatabad, and North Karachi',
    metrics: { likes: 840, shares: 140, comments: 42, donationsLinked: 65000 },
  },
  {
    id: 'post-3',
    title: 'Hub Balochistan Impact: 1,196 Patients Treated Across 2 Camps',
    date: '2026-09-26',
    time: '10:00 AM',
    platform: 'linkedin',
    status: 'Scheduled',
    format: 'Single Image',
    campaignId: 'camp-1',
    campaignName: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
    topics: ['Free Camp', 'Medical', 'Zakat', 'Community'],
    hook: 'Corporate CSR & Healthcare Equity: How KAWT Mobilized 19 Healthcare Professionals to Industrial Hub, Balochistan.',
    urduText: `حب، بلوچستان کے صنعتی مزدوروں اور پسماندہ خاندانوں تک معیاری علاج کی رسائی!
خدمتِ عالم ویلفیئر ٹرسٹ نے جامعہ شریعہ العلوم (گیلیکسی ٹاؤن، حب) میں 2 میگا میڈیکل کیمپس کے دوران 1,196 مریضوں کا علاج کیا۔

21,390 مفت ادویات کے یونٹس تقسیم کیے گئے اور 82 فیصد بجٹ براہِ راست مستحق مریضوں کی میڈیسنز پر صرف ہوا۔
ہم اپنے تمام کارپوریٹ پارٹنرز اور مخیر حضرات کے شکر گزار ہیں جن کے تعاون سے یہ سنگِ میل حاصل ہوا۔`,
    englishText: `Healthcare Equity in Industrial Peripheries: Khidmat-e-Alam Welfare Trust (KAWT) mobilized 19 medical professionals across 2 extensive medical camp phases at Galaxy Town, Hub, Balochistan.

Key Operational Milestones:
• 1,196 Patients treated across FMC-03 & FMC-04
• 21,390 Units of therapeutic medicines dispensed 100% free
• 82% of camp expenditure deployed directly on essential medicines through segregated Zakat audits
• Zero patient referrals required on-site thanks to specialist diagnostics

Partner with KAWT for transparent, audited CSR healthcare interventions.
Facility: 351, Usmania Society, B Road, Nazimabad, Karachi | UAN: 1111528 | www.khidmat-e-alam.org`,
    callToAction: 'Read full 11-page verified Post-Camp Operations Report. Inquire about CSR co-sponsorships.',
    hashtags: ['#CorporateSocialResponsibility', '#HealthcareImpact', '#BalochistanHealth', '#KAWT', '#Transparency'],
    assignedTo: 'Tariq Mehmood',
    visualPrompt: 'Executive CSR infographic banner featuring clean aerial-angle documentary shot of organized medical camp triage at Galaxy Town Hub, paired with key verified data points (1,196 patients, 21,390 medicines, 82% Zakat medicine allocation). Clean professional layout, navy and medical red tones, official Khidmat-e-Alam Welfare Trust logo.',
    targetAudience: 'CSR executives, institutional funders, pharmaceutical donors',
  },
  {
    id: 'post-4',
    title: 'Urgent Night Care (8 PM to 8 AM) at Nazimabad Medical Center',
    date: '2026-09-27',
    time: '07:30 PM',
    platform: 'tiktok',
    status: 'Scheduled',
    format: 'Reel / Video',
    campaignId: 'camp-4',
    campaignName: 'Emergency Night Clinic & Urgent Care Fund',
    topics: ['Emergency', 'Medical'],
    hook: 'رات کو اچانک بخار یا ایمرجنسی میں کہاں جائیں؟ ناظم آباد میں 24 گھنٹے ڈاکٹرز دستیاب ہیں!',
    urduText: `رات کے وقت اچانک طبیعت بگڑ جائے تو پریشان نہ ہوں!
خدمتِ عالم میڈیکل سینٹر (ناظم آباد، کراچی) میں ارجنٹ کیئر ڈاکٹرز رات 8:00 بجے سے صبح 8:00 بجے تک الرٹ رہتے ہیں۔

👨‍⚕️ ڈاکٹر اشوک کمار (General Physician - Urgent Care)
👨‍⚕️ ڈاکٹر ارشد (General Physician - Urgent Care)
ٹوکن فیس: صرف 500 روپے۔

📍 351، عثمانیہ سوسائٹی، بی روڈ، ناظم آباد نمبر 1، کراچی
ہیلپ لائن: UAN 1111528`,
    englishText: `Sudden midnight fever, acute dehydration, or medical emergency in Nazimabad?
Khidmat-e-Alam Medical Center Urgent Care runs through the night (8:00 PM – 8:00 AM) with Dr. Ashok Kumar and Dr. Arshad on duty.
Accessible consultation fee: Rs. 500 only.

Address: 351, Usmania Society, B Road, Nazimabad, Karachi
UAN: 1111528 | www.khidmat-e-alam.org`,
    callToAction: 'Save this video or share with family in Nazimabad and Liaquatabad.',
    hashtags: ['#EmergencyDoctor', '#KarachiDoctors', '#NazimabadClinic', '#UrgentCare', '#KAWTHealth'],
    assignedTo: 'Zainab Qureshi',
    visualPrompt: 'Fast-paced vertical TikTok/Reel video script: 0-3s quick visual hook outside illuminated Khidmat-e-Alam Medical Center building at night. 3-8s reassuring doctor checking patient blood pressure with calm empathy. 8-15s clean on-screen text listing timings, Rs. 500 fee, address in Nazimabad, and UAN 1111528. Energetic but caring voiceover.',
    targetAudience: 'Youth, local Karachi residents, families needing late-night medical options',
  },
  {
    id: 'post-5',
    title: 'Dr. Sajida Nadeem & Dr. Somreen Zahra: Women Health & Ultrasound',
    date: '2026-09-28',
    time: '02:00 PM',
    platform: 'facebook',
    status: 'In Review',
    format: 'Single Image',
    campaignId: 'camp-3',
    campaignName: 'Maternal, Child & Ultrasound Diagnostic Waqf',
    topics: ['Medical', 'Maternal & Child', 'Diagnostics'],
    hook: 'خواتین کی صحت: مستند گائناکالوجسٹ اور جدید الٹراساؤنڈ کی سہولت ایک ہی چھت تلے۔',
    urduText: `خدمتِ عالم میڈیکل سینٹر میں خواتین کی باوقار اور پرائیویٹ صحت کا مکمل انتظام:

👩‍⚕️ ڈاکٹر ساجدہ ندیم (Gynecologist)
پیر، بدھ، جمعہ: شام 4:00 تا 7:00 بجے (فیس: 1,000 روپے۔)

👩‍⚕️ ڈاکٹر نادیہ شہزاد (Gynecologist)
پیر اور بدھ: دوپہر 12:00 تا 2:00 بجے (فیس: 700 روپے۔)

👩‍⚕️ ڈاکٹر ثمرین زہرہ (Sonologist - Ultrasound)
پیر تا ہفتہ: صبح 10:00 تا دوپہر 1:00 بجے (صرف الٹراساؤنڈ چارجز)

خواتین اور حاملہ ماؤں کے لیے علیحدہ ویٹنگ ایریا اور مکمل رازداری کے ساتھ معائنہ۔
پتہ: 351، عثمانیہ سوسائٹی، بی روڈ، ناظم آباد، کراچی
UAN: 1111528 | www.khidmat-e-alam.org`,
    englishText: `Comprehensive Women's Healthcare & Diagnostic Ultrasound at Khidmat-e-Alam Medical Center:

• Dr. Sajida Nadeem (Gynecologist): Mon, Wed, Fri 4:00 PM – 7:00 PM (Fee: Rs. 1,000)
• Dr. Nadia Shehzad (Gynecologist): Mon & Wed 12:00 PM – 2:00 PM (Fee: Rs. 700)
• Dr. Somreen Zahra (Sonologist): Mon–Sat 10:00 AM – 1:00 PM (Ultrasound Charges Only)

Dedicated female clinical wing providing respectful antenatal care, pelvic diagnostics, and maternal wellness.

Location: 351, Usmania Society, B Road, Nazimabad, Karachi
UAN: 1111528 | www.khidmat-e-alam.org`,
    callToAction: 'Book consultation or sponsor maternal ultrasound for a deserving mother.',
    hashtags: ['#MaternalHealth', '#GynecologistKarachi', '#UltrasoundClinic', '#KAWTMedicalCenter', '#WomenHealth'],
    assignedTo: 'Fatima Zahra',
    visualPrompt: 'Professional healthcare graphic showing modern ultrasound screening unit and female physician consulting patient with utmost privacy and dignity. Clean typography, soft pastel teal and medical red accents, clear doctor days and timings, UAN 1111528 in prominent footer bar.',
    targetAudience: 'Women, mothers, families seeking affordable female specialist care',
  },
  {
    id: 'post-6',
    title: 'World Heart Day Special: Dr. Arjun Kumar on Cardiovascular Health',
    date: '2026-09-29',
    time: '11:30 AM',
    platform: 'youtube',
    status: 'Scheduled',
    format: 'Reel / Video',
    campaignId: 'camp-2',
    campaignName: 'Nazimabad Medical Center Specialist OPD & Urgent Care',
    topics: ['Awareness', 'Medical'],
    hook: 'World Heart Day 2026: 3 Silent Warning Signs of Heart Attack You Should Never Ignore.',
    urduText: `عالمی یومِ قلب (World Heart Day) پر ڈاکٹر ارجن کمار (کنسلٹنٹ فزیشن، خدمتِ عالم میڈیکل سینٹر) کا خصوصی پیغام:
بلڈ پریشر اور شوگر دل کے امراض کی سب سے خاموش اور خطرناک وجوہات ہیں۔
بروقت معائنہ اور طرزِ زندگی میں چھوٹی تبدیلیاں آپ کو جان لیوا دورے سے بچا سکتی ہیں۔

ہمارے کیمپس میں 2,318 مریضوں میں سے 1,000 سے زائد میں بلڈ پریشر کی سطح 130/86 سے زائد ریکارڈ ہوئی۔ اپنے دل کا معائنہ لازمی کروائیں۔

ڈاکٹر ارجن کمار او پی ڈی ٹائمنگز:
پیر، جمعہ، ہفتہ اور اتوار: شام 4:00 تا 7:00 بجے
خدمتِ عالم میڈیکل سینٹر، ناظم آباد، کراچی | UAN 1111528`,
    englishText: `On World Heart Day 2026, Consultant Physician Dr. Arjun Kumar shares vital insights on cardiovascular risk factors in South Asia.
Our 2026 medical camp data across 2,318 patients revealed average BP readings of 132/86 mmHg with prevalent unmanaged hypertension.

Consult Dr. Arjun Kumar at Khidmat-e-Alam Medical Center:
Days: Mon, Fri, Sat & Sun (4:00 PM – 7:00 PM / 6:00 PM – 8:00 PM | Fee: Rs. 1,000)
351, Usmania Society, B Road, Nazimabad, Karachi | UAN: 1111528 | www.khidmat-e-alam.org`,
    callToAction: 'Watch full doctor interview and schedule your routine cardiovascular screening.',
    hashtags: ['#WorldHeartDay', '#CardiologyTips', '#HypertensionAwareness', '#DrArjunKumar', '#KAWTDoctors'],
    assignedTo: 'Zainab Qureshi',
    visualPrompt: 'High quality YouTube thumbnail with Dr. Arjun Kumar in white coat with stethoscope, clear high-contrast typography: "WORLD HEART DAY: 3 SILENT SIGNS", official Khidmat-e-Alam logo in top corner, clean medical background.',
    targetAudience: 'Health conscious adults, families with hypertensive patients',
  },
  {
    id: 'post-7',
    title: 'Clean RO Drinking Water & Emergency Ration Relief in Peri-Urban Karachi',
    date: '2026-09-30',
    time: '03:00 PM',
    platform: 'facebook',
    status: 'Scheduled',
    format: 'Single Image',
    campaignId: 'camp-1',
    campaignName: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
    topics: ['Community', 'Zakat'],
    hook: 'صاف پانی اور راشن: پانی کی کمی اور ملاوٹ والے پانی سے پیدا ہونے والے ہیپاٹائٹس اور پیٹ کے امراض کا سدِ باب۔',
    urduText: `پانی زندگی ہے اور صدقہ جاریہ کا بہترین ذریعہ!
خدمتِ عالم ویلفیئر ٹرسٹ کے تحت پسماندہ گوٹھوں میں مفت صاف فلٹر شدہ پینے کا پانی اور مستحق خاندانوں میں راشن کی تقسیم جاری ہے۔
آپ کے صدقات اور زکوٰۃ سے سینکڑوں بچے ہیضہ، ٹائیفائیڈ اور گردوں کے امراض سے محفوظ ہو رہے ہیں۔
ہمارے فلاحی مشن کا حصہ بنیں۔
رابطہ: UAN 1111528 | www.khidmat-e-alam.org`,
    englishText: `Clean Water is Healthcare Prevention: Preventing water-borne epidemics through KAWT community RO filtration units and dry ration family support in peri-urban Karachi.
100% of your Zakat and Sadqah Jariyah delivers verified clean water access and nutrition packages to vulnerable households.
Helpline: UAN 1111528 | www.khidmat-e-alam.org`,
    callToAction: 'Support community clean water and ration funds. 100% Zakat verified.',
    hashtags: ['#CleanWaterRelief', '#SadqahJariyah', '#ZakatEligible', '#KAWTWelfare', '#CommunitySupport'],
    assignedTo: 'Bilal Khan',
    visualPrompt: 'Documentary style photo of young Pakistani children happily collecting clean water in containers from KAWT RO water filtration station. Dignified, warm afternoon lighting, official KAWT branding.',
    targetAudience: 'Donors, overseas Pakistanis, charity supporters',
    metrics: { views: 18000, likes: 920, shares: 145, comments: 55, donationsLinked: 110000 },
  },
  {
    id: 'post-8',
    title: 'Diagnostic Lab & Ultrasound Transparency: Subsidized Pathology for All',
    date: '2026-10-01',
    time: '12:30 PM',
    platform: 'linkedin',
    status: 'Scheduled',
    format: 'Infographic',
    campaignId: 'camp-3',
    campaignName: 'Maternal, Child & Ultrasound Diagnostic Waqf',
    topics: ['Diagnostics', 'Medical', 'Zakat'],
    hook: 'Accurate clinical diagnostics is the foundation of effective healthcare equity.',
    urduText: `علاج سے پہلے بروقت اور درست تشخیص:
خدمتِ عالم میڈیکل سینٹر میں جدید الٹراساؤنڈ اور پیتھالوجی لیب ٹیسٹس انتہائی رعایتی نرخوں پر اور مستحقین کے لیے زکوٰۃ فنڈ کے ذریعے 100% مفت دستیاب ہیں۔
ڈاکٹر ثمرین زہرہ (Sonologist) صبح 10:00 تا دوپہر 1:00 بجے معائنہ کرتی ہیں۔
ناظم آباد نمبر 1، کراچی۔ UAN: 1111528`,
    englishText: `Bridging the Diagnostic Divide: Subsidized and Zakat-covered Ultrasound and Pathology at Khidmat-e-Alam Medical Center Nazimabad.
Early diagnosis saves lives and reduces long-term hospitalization costs for low-income families.
Diagnostic Department: 351, Usmania Society, B Road, Nazimabad, Karachi | UAN: 1111528`,
    callToAction: 'Sponsor diagnostic testing vouchers for deserving patients. Zakat audited.',
    hashtags: ['#DiagnosticsMatter', '#UltrasoundClinic', '#ZakatHealthcare', '#HealthcareEquity', '#KAWTCenter'],
    assignedTo: 'Tariq Mehmood',
    visualPrompt: 'Modern infographic showcasing pathology diagnostic equipment, ultrasound transducer, and clinical report flow with transparent pricing breakdown and 100% Zakat coverage tag. Deep red and crisp white branding.',
    targetAudience: 'CSR leads, healthcare philanthropists, middle-class families in Karachi',
    metrics: { views: 12500, likes: 620, shares: 88, comments: 24, donationsLinked: 85000 },
  },
];

export const INITIAL_OPD_CLINICS: OpdClinic[] = [
  {
    id: 'opd-1',
    name: 'Pediatric Specialist Clinic (Dr. Ishwar & Dr. Binesh)',
    urduName: 'شعبہ امراضِ اطفال و بچوں کے امراض',
    doctorName: 'Dr. Ishwar Lohana / Dr. Binesh Bakai / Dr. Naveed Khan',
    doctorTitle: 'Senior Pediatricians & Family Physicians',
    days: 'Monday to Saturday',
    timings: 'Morning & Evening Shifts (12:00 PM – 11:00 PM)',
    location: 'Khidmat-e-Alam Medical Center, 351 Usmania Society, B Road, Nazimabad, Karachi',
    dailyCapacity: 80,
    isFree: false,
    services: ['Growth & Nutrition Monitoring', 'Acute Infection Management', 'Vaccination Support', 'Subsidized Fee Rs. 800 - 1,000'],
    urgentAlert: 'High pediatric turnout noted in recent camp reports (38% of all beneficiaries were children under 12).',
  },
  {
    id: 'opd-2',
    name: 'Consultant Medicine & Gastroenterology Clinic',
    urduName: 'شعبہ جنرل میڈیسن و معدہ و جگر',
    doctorName: 'Dr. Arjun Kumar & Dr. Shahnawaz',
    doctorTitle: 'Consultant Physician & Gastroenterologist',
    days: 'Mon, Tue, Thu, Fri, Sat, Sun',
    timings: '12:00 PM – 2:00 PM & 4:00 PM – 8:00 PM',
    location: 'Khidmat-e-Alam Medical Center, 1st Floor, Room 102',
    dailyCapacity: 65,
    isFree: false,
    services: ['GI & Acidity Treatment', 'Hypertension & Diabetes Management', 'ECG', 'Subsidized Fee Rs. 1,000'],
  },
  {
    id: 'opd-3',
    name: 'Maternal & Women Healthcare Clinic',
    urduName: 'شعبہ امراضِ نسواں و زچہ و بچہ',
    doctorName: 'Dr. Sajida Nadeem & Dr. Nadia Shehzad',
    doctorTitle: 'Consultant Gynecologists & Obstetricians',
    days: 'Monday, Wednesday, Friday',
    timings: '12:00 PM – 2:00 PM & 4:00 PM – 7:00 PM',
    location: 'Khidmat-e-Alam Medical Center, Women Wing, 2nd Floor',
    dailyCapacity: 50,
    isFree: false,
    services: ['Antenatal Checkups', 'Pelvic Diagnostics', 'Maternal Counseling', 'Subsidized Fee Rs. 700 - 1,000'],
  },
  {
    id: 'opd-4',
    name: 'Diagnostic Ultrasound & Imaging Unit',
    urduName: 'شعبہ الٹراساؤنڈ و تشخیصی امیجنگ',
    doctorName: 'Dr. Somreen Zahra',
    doctorTitle: 'Consultant Sonologist',
    days: 'Monday to Saturday',
    timings: '10:00 AM – 1:00 PM',
    location: 'Diagnostics Center, Ground Floor',
    dailyCapacity: 40,
    isFree: false,
    services: ['Abdominal Ultrasound', 'Pelvic & Obstetric Sonography', 'Digital Reports', 'Ultrasound Charges Only'],
  },
  {
    id: 'opd-5',
    name: '24/7 Urgent Care & Emergency Night Unit',
    urduName: 'ارجنٹ کیئر و 24 گھنٹے ایمرجنسی خدمات',
    doctorName: 'Dr. Layakat, Dr. Shahnawaz, Dr. Ashok Kumar, Dr. Arshad',
    doctorTitle: 'General Physicians & Urgent Care Officers',
    days: '24 Hours / 7 Days a Week (Day, Evening & Alternate Night Shifts)',
    timings: 'Round-the-clock (Day: 8 AM-8 PM | Night: 8 PM-8 AM)',
    location: 'Urgent Care Bay, Main Entrance Ground Floor',
    dailyCapacity: 120,
    isFree: false,
    services: ['Acute Trauma Stabilization', 'IV Cannulation & Fluids', 'Blood Sugar & BP Screening', 'Fee Rs. 500 Only'],
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Publish Thatta Free Medical Camp impact infographic on Facebook & LinkedIn',
    platform: 'facebook',
    assignedTo: 'Bilal Khan',
    role: 'Social Media Manager',
    category: 'Copywriting',
    priority: 'High',
    status: 'Approved',
    dueDate: '2026-09-24',
    relatedCampaign: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
  },
  {
    id: 'task-2',
    title: 'Design 5-slide Instagram carousel for Dr. Ishwar Lohana & Dr. Binesh Bakai pediatric clinic',
    platform: 'instagram',
    assignedTo: 'Fatima Zahra',
    role: 'Content Creator',
    category: 'Design',
    priority: 'High',
    status: 'Designing',
    dueDate: '2026-09-25',
    relatedCampaign: 'Nazimabad Medical Center Specialist OPD & Urgent Care',
  },
  {
    id: 'task-3',
    title: 'Film and edit 45-second TikTok on 24/7 Urgent Care Night Clinic (Dr. Ashok Kumar)',
    platform: 'tiktok',
    assignedTo: 'Zainab Qureshi',
    role: 'Video Manager',
    category: 'Video Editing',
    priority: 'High',
    status: 'Review',
    dueDate: '2026-09-26',
    relatedCampaign: 'Emergency Night Clinic & Urgent Care Fund',
  },
  {
    id: 'task-4',
    title: 'Draft LinkedIn CSR report highlighting 1,196 patients treated at Galaxy Town Hub, Balochistan',
    platform: 'linkedin',
    assignedTo: 'Tariq Mehmood',
    role: 'Medical Advisor',
    category: 'Copywriting',
    priority: 'Medium',
    status: 'Draft',
    dueDate: '2026-09-26',
    relatedCampaign: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
  },
  {
    id: 'task-5',
    title: 'Record Dr. Arjun Kumar interview for World Heart Day (Cardiovascular prevention in Pakistan)',
    platform: 'youtube',
    assignedTo: 'Zainab Qureshi',
    role: 'Video Manager',
    category: 'Video Editing',
    priority: 'High',
    status: 'Scheduled',
    dueDate: '2026-09-28',
    relatedCampaign: 'Nazimabad Medical Center Specialist OPD & Urgent Care',
  },
  {
    id: 'task-6',
    title: 'Medical accuracy & Zakat compliance review for October Breast Cancer Awareness campaign',
    platform: 'instagram',
    assignedTo: 'Areeba Sheikh',
    role: 'Medical Advisor',
    category: 'Approval',
    priority: 'Medium',
    status: 'Idea',
    dueDate: '2026-09-29',
  },
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Bilal Khan',
    role: 'Lead Content Strategist & Urdu Copywriter',
    department: 'Communications & Social Media',
    avatarColor: '#C3202F',
    email: 'bilal.khan@khidmat-e-alam.org',
    phone: '+92 300 2345678',
    activeTasks: 3,
    completedTasks: 48,
  },
  {
    id: 'member-2',
    name: 'Fatima Zahra',
    role: 'Senior Visual & Graphic Designer',
    department: 'Creative Lab',
    avatarColor: '#0C7A4A',
    email: 'fatima.z@khidmat-e-alam.org',
    phone: '+92 321 8765432',
    activeTasks: 4,
    completedTasks: 41,
  },
  {
    id: 'member-3',
    name: 'Zainab Qureshi',
    role: 'Video Producer & Short-Form Lead',
    department: 'Media Unit',
    avatarColor: '#12305B',
    email: 'zainab.q@khidmat-e-alam.org',
    phone: '+92 333 4567890',
    activeTasks: 3,
    completedTasks: 34,
  },
  {
    id: 'member-4',
    name: 'Tariq Mehmood',
    role: 'Head of Donor Relations & CSR Compliance',
    department: 'Executive Trust',
    avatarColor: '#B0680A',
    email: 'tariq.m@khidmat-e-alam.org',
    phone: '+92 302 9988776',
    activeTasks: 2,
    completedTasks: 56,
  },
  {
    id: 'member-5',
    name: 'Areeba Sheikh',
    role: 'Social Media & Community Outreach Manager',
    department: 'Digital Outreach',
    avatarColor: '#0A6CDA',
    email: 'areeba.s@khidmat-e-alam.org',
    phone: '+92 315 1122334',
    activeTasks: 3,
    completedTasks: 39,
  },
  {
    id: 'member-6',
    name: 'Waqar Ahmed',
    role: 'General Secretary & Medical Camps Project Director',
    department: 'Executive Directorate',
    avatarColor: '#0C7A4A',
    email: 'waqaraahmed0123@gmail.com',
    phone: 'UAN: 1111528',
    activeTasks: 2,
    completedTasks: 62,
  },
];

export const BRAND_KIT = {
  trustNameEnglish: 'Khidmat-e-Alam Welfare Trust (KAWT)',
  trustNameUrdu: 'خدمتِ عالم ویلفیئر ٹرسٹ (رجسٹرڈ)',
  medicalCenterName: 'Khidmat-e-Alam Medical Center',
  registrationNo: 'KAR-TRUST-REG-984/2018',
  taxExemption: 'FBR Tax Exempt under Section 2(36) & 61/159',
  address: '351, Usmania Society, B Road, Nazimabad No. 1, Karachi, Pakistan',
  uan: '1111528',
  helpline: 'UAN: 1111528 / +92 300 1234567',
  officialWebsite: 'https://www.khidmat-e-alam.org/',
  socialMedia: {
    facebook: 'https://www.facebook.com/photo/?fbid=976039685144004&set=a.138985558849425',
    instagram: 'https://www.instagram.com/khidmat_e_alam?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw%3D%3D',
    linkedin: 'https://www.linkedin.com/in/khidmat-e-alam-welfare-trust-28607b437',
    youtube: 'https://www.youtube.com/@Khidmat-e-AlamWelfareTrust-1',
    tiktok: 'https://www.tiktok.com/@khidmat.e.alam',
  },
  accounts: [
    { bank: 'Meezan Bank Limited', title: 'Khidmat e Alam Welfare Trust', accountNo: '0102-0103456789', iban: 'PK42MEZN0001020103456789', branch: 'Gulshan-e-Iqbal Branch, Karachi' },
    { bank: 'Habib Bank Limited (HBL)', title: 'Khidmat e Alam Welfare Trust', accountNo: '1234-7901234503', iban: 'PK88HABB0012347901234503', branch: 'North Nazimabad Branch, Karachi' },
    { bank: 'EasyPaisa & JazzCash', title: 'KAWT Official Relief', accountNo: '0300-1234567', iban: 'Merchant ID: 44921', branch: 'Direct Mobile Wallet' },
    { bank: 'Raast Digital Pay', title: 'KAWT Raast ID', accountNo: '03001234567', iban: 'Direct SBP Raast Gateway', branch: 'Instant Fee-Free Transfer' },
  ],
  guidelines: [
    'Always protect the human dignity and self-esteem (عزتِ نفس) of beneficiaries; never portray them as helpless beggars.',
    'Clearly separate Sadqah, General Donations, and Zakat funds in financial copy (In 2026 camps, 75% was Zakat for medicines).',
    'Include official Khidmat-e-Alam Medical Center address (351, Usmania Society, B Road, Nazimabad, Karachi) and UAN: 1111528 in contact footers.',
    'Always mention official social links (FB, IG, LinkedIn, YouTube, TikTok) and website www.khidmat-e-alam.org.',
    'Ensure all medical camp statistics cited match official post-camp reports (Thatta, Hub, Purana Golimar, Baldiya Town).',
  ],
};
