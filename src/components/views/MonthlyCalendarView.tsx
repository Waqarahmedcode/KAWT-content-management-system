import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Filter,
  Download,
  Share2,
  Clock,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Printer,
  Copy,
  Plus,
} from 'lucide-react';
import { MonthlyCalendarDay, geminiService } from '../../services/geminiService';
import { Post, OFFICIAL_DOCTORS, OFFICIAL_MEDICAL_CAMPS } from '../../data/seedData';

interface MonthlyCalendarViewProps {
  onSchedulePost: (dayItem: MonthlyCalendarDay) => void;
  onNotify: (msg: string) => void;
}

// 31 Comprehensive Days Preloaded for October 2026 covering all important days and real KAWT data
const OCTOBER_2026_SCHEDULE: MonthlyCalendarDay[] = [
  {
    date: '1 Oct',
    dayOfWeek: 'Thursday',
    platform: 'instagram',
    contentType: 'Medical Awareness',
    topic: 'World Heart Health & Breast Cancer Awareness Month Kickoff',
    caption: 'October is Breast Cancer Awareness Month. Early screening saves lives. Dr. Sajida Nadeem and Dr. Somreen Zahra (Sonologist) are offering subsidized consultations at Khidmat-e-Alam Medical Center, Nazimabad. UAN: 1111528',
    urduCaption: 'اکتوبر: بریسٹ کینسر سے آگاہی کا مہینہ۔ بروقت تشخیص زندگیاں بچاتی ہے۔ خدمتِ عالم میڈیکل سینٹر ناظم آباد میں ماہر لیڈی ڈاکٹرز اور جدید الٹراساؤنڈ کی سہولت دستیاب ہے۔',
    visualPrompt: 'Create a professional NGO healthcare social media design for Khidmat-e-Alam Welfare Trust. Clean, dignified pastel pink and medical teal infographic banner, official KAWT logo, compassionate female Pakistani doctor consulting patient with privacy and respect. Contact: UAN 1111528.',
    status: 'Scheduled',
    assignedTo: 'Fatima Zahra',
  },
  {
    date: '2 Oct',
    dayOfWeek: 'Friday',
    platform: 'facebook',
    contentType: 'Donation Campaign',
    topic: 'Jumma Mubarak: Friday Sadqah & Thatta Medical Relief',
    caption: 'Jumma Mubarak! In our Thatta camp, 53% of patients were mothers, children, and elderly suffering from waterborne illnesses. Dedicate your Friday Sadqah to fund free life-saving medicines. 100% Zakat eligible. UAN: 1111528.',
    urduCaption: 'جمعہ مبارک! ٹھٹھہ کے پسماندہ دیہی علاقوں میں 548 مریضوں کو مفت علاج اور ادویات فراہم کی گئیں۔ آج کے بابرکت دن اپنا صدقہ اور زکوٰۃ دکھی انسانیت کے لیے وقف کریں۔',
    visualPrompt: 'Heartwarming documentary photo of an elderly Pakistani villager receiving free medicine with a warm smile of gratitude, shaded relief tent, official Khidmat-e-Alam Welfare Trust verified banking details in footer. Style: Trustworthy, emotional but respectful.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '3 Oct',
    dayOfWeek: 'Saturday',
    platform: 'linkedin',
    contentType: 'CSR Report',
    topic: 'Healthcare Equity: Consolidated 2026 Medical Camps Audit',
    caption: 'Consolidated Operations Report: 2,318 patients treated across 5 camps (Thatta, Hub, Golimar, Baldiya) with 22,309 medicines dispensed. 75% funded through segregated Zakat audits. Partner with KAWT for corporate CSR health initiatives.',
    urduCaption: 'خدمتِ عالم ویلفیئر ٹرسٹ کی شفاف کارکردگی رپورٹ: 5 میڈیکل کیمپس، 2,318 مریض اور 22,309 مفت ادویات کی تقسیم۔ شفافیت اور مستحقین کی خدمت ہماری اولین ترجیح ہے۔',
    visualPrompt: 'Executive CSR infographic showing clean statistical breakdown of 2,318 patients, 75% Zakat compliance, and map of Karachi, Hub, and Thatta locations. Clean navy and medical red corporate branding with KAWT logo.',
    status: 'Approved',
    assignedTo: 'Tariq Mehmood',
  },
  {
    date: '4 Oct',
    dayOfWeek: 'Sunday',
    platform: 'youtube',
    contentType: 'Doctor Spotlight',
    topic: 'World Cerebral Palsy Day: Pediatric Neurological Care',
    caption: 'On World Cerebral Palsy Day, Senior Pediatrician Dr. Ishwar Lohana explains early developmental milestones and childhood muscular weakness warning signs. Consult Dr. Ishwar Lohana Mon-Sat at Nazimabad Medical Center.',
    urduCaption: 'ورلڈ سیریبرل پالسی ڈے: بچوں میں کمزوری اور ذہنی نشوونما کے مسائل پر ماہر اطفال ڈاکٹر ایشور لوہانہ کی رہنمائی۔ خدمتِ عالم میڈیکل سینٹر ناظم آباد۔',
    visualPrompt: 'YouTube video thumbnail featuring Dr. Ishwar Lohana examining a young child with empathy, bold title text: "CHILD GROWTH & PALSY WARNING SIGNS", KAWT logo in top corner, UAN 1111528.',
    status: 'Review',
    assignedTo: 'Zainab Qureshi',
  },
  {
    date: '5 Oct',
    dayOfWeek: 'Monday',
    platform: 'tiktok',
    contentType: 'Reel / Short',
    topic: 'Dr. Shahnawaz on Stomach Acidity & Water Contamination',
    caption: 'Over 29% of patients in our Karachi and Thatta camps suffered from acute gastric acidity. Gastroenterologist Dr. Shahnawaz shares 3 simple prevention tips. Available Mon, Tue, Thu 12-2 PM at Nazimabad Medical Center.',
    urduCaption: 'معدے کی جلن اور بدہضمی سے کیسے بچیں؟ ماہر امراضِ معدہ و جگر ڈاکٹر شاہنواز کے 3 مفید مشورے۔ ٹوکن فیس صرف 1,000 روپے۔ ناظم آباد کراچی۔',
    visualPrompt: 'Dynamic vertical short video format: Dr. Shahnawaz speaking in hospital clinic with clear graphic overlays showing clean drinking water and dietary advice, closing with OPD timings and UAN 1111528.',
    status: 'Approved',
    assignedTo: 'Zainab Qureshi',
  },
  {
    date: '6 Oct',
    dayOfWeek: 'Tuesday',
    platform: 'facebook',
    contentType: 'Medical Camp Update',
    topic: 'Galaxy Town Hub Balochistan: 1,196 Beneficiaries Reached',
    caption: 'Did you know? In Hub, Balochistan, over 82% of camp funding went directly to Zakat medicines. See how your donations reached the families of industrial laborers at Jamia-tul-Shariah Al-Uloom.',
    urduCaption: 'حب، بلوچستان کے صنعتی مزدوروں کے لیے طبی ریلیف: 1,196 مریضوں کا مفت علاج اور 21,390 ادویات کی تقسیم۔ آپ کا تعاون ان کے لیے امید کی کرن ہے۔',
    visualPrompt: 'Realistic documentary style photo of volunteer pharmacist organizing essential medicine boxes in organized camp dispensary, official KAWT banners in background. Clean layout with verified stats.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '7 Oct',
    dayOfWeek: 'Wednesday',
    platform: 'instagram',
    contentType: 'Doctor Spotlight',
    topic: 'Dermatology Care: Dr. Jaywanti Jha & Dr. Khalid Ahmed',
    caption: 'Skin infections, scabies, and fungal conditions were rampant in rural Thatta and Baldiya Town. Meet our consultant dermatologists providing specialized skin care at Nazimabad Medical Center.',
    urduCaption: 'جلد کی الرجی، خارش اور انفیکشن کا علاج: ڈاکٹر جے ونتی جھا (پیر و جمعہ 5 تا 6 بجے) اور ڈاکٹر خالد احمد (جمعرات 8:30 تا 9:30 بجے)۔ فیس صرف 300 تا 700 روپے۔',
    visualPrompt: 'Instagram clean aesthetic carousel slide 1: Professional doctor profile portrait with clean clinical background, consulting hours, and consultation fee. Slide 2: Prevention tips for humid climate skin rashes.',
    status: 'Draft',
    assignedTo: 'Fatima Zahra',
  },
  {
    date: '8 Oct',
    dayOfWeek: 'Thursday',
    platform: 'facebook',
    contentType: 'Medical Awareness',
    topic: 'World Sight Day: Vision Protection & Diabetic Retinopathy',
    caption: 'World Sight Day 2026: Protect your eyesight. Uncontrolled diabetes is leading to vision impairment in thousands across Karachi. Schedule routine screening at Khidmat-e-Alam Medical Center.',
    urduCaption: 'ورلڈ سائٹ ڈے: آنکھوں کی بینائی کی حفاظت کریں۔ شوگر اور بلڈ پریشر کا وقت پر معائنہ آپ کی آنکھوں کو اندھے پن سے بچا سکتا ہے۔ خدمتِ عالم میڈیکل سینٹر، ناظم آباد۔',
    visualPrompt: 'Professional NGO healthcare social media poster showing optometrist examining an elderly patient’s eyes, clean modern layout, UAN 1111528, www.khidmat-e-alam.org.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '9 Oct',
    dayOfWeek: 'Friday',
    platform: 'instagram',
    contentType: 'Donation Campaign',
    topic: 'Jumma Sadqah: Sponsor 1 Patient Medication Package for Rs. 875',
    caption: 'Our audited average cost per patient in free medical camps is just PKR 875 (including consultation, diagnostics, and full medicine course). How many patients will you sponsor this Friday?',
    urduCaption: 'جمعہ مبارک: صرف 875 روپے میں ایک مستحق مریض کا مکمل معائنہ، ٹیسٹ اور مفت ادویات کا کفیل بنیں۔ 100 فیصد زکوٰۃ قابلِ اطلاق۔',
    visualPrompt: 'Minimalist impactful social graphic: "PKR 875 = 1 Patient Full Treatment & Medicines". KAWT official logo, verified Meezan Bank and HBL account details, UAN 1111528.',
    status: 'Scheduled',
    assignedTo: 'Fatima Zahra',
  },
  {
    date: '10 Oct',
    dayOfWeek: 'Saturday',
    platform: 'linkedin',
    contentType: 'Medical Awareness',
    topic: 'World Mental Health Day: Addressing Caregiver & Chronic Illness Stress',
    caption: 'On World Mental Health Day, KAWT emphasizes the psychological toll of chronic disease on low-income families. Learn how our holistic community medical camps screen for neurological weakness and anxiety.',
    urduCaption: 'عالمی یومِ دماغی صحت: دائمی بیماریوں اور غربت کے شکار خاندانوں کی ذہنی صحت کا خیال رکھیں۔ ہمدردی اور باوقار علاج ہماری اولین ترجیح ہے۔',
    visualPrompt: 'Thoughtful, compassionate healthcare professional listening to an elderly caregiver, soft natural daylight, respectful non-sensational angle, LinkedIn executive format.',
    status: 'Approved',
    assignedTo: 'Tariq Mehmood',
  },
  {
    date: '11 Oct',
    dayOfWeek: 'Sunday',
    platform: 'tiktok',
    contentType: 'Community Story',
    topic: 'A Mother in Thatta: Restoring Health for 3 Children',
    caption: 'Mai Sakina brought her 3 children suffering from acute dehydration to our Thatta medical camp. Thanks to your Zakat, all three received free antibiotics and ORS. Watch their story of hope.',
    urduCaption: 'ٹھٹھہ کے پسماندہ گوٹھ سے ایک ماں کی کہانی: آپ کی زکوٰۃ سے 3 بیمار بچوں کو مفت ادویات اور نئی زندگی ملی۔ دکھی دلوں کا سہارا بنیے۔',
    visualPrompt: 'Uplifting vertical short clip: Mother smiling with healthy children after receiving medical consultation, warm color grading, respectful framing, clear voiceover.',
    status: 'Review',
    assignedTo: 'Zainab Qureshi',
  },
  {
    date: '12 Oct',
    dayOfWeek: 'Monday',
    platform: 'facebook',
    contentType: 'Medical Awareness',
    topic: 'World Arthritis Day: Back & Joint Pain Management',
    caption: 'World Arthritis Day: Over 27% of patients examined in our Purana Golimar & Baldiya Town camps suffered from severe joint and back pain. Consultant Physician Dr. Arjun Kumar explains bone and joint care.',
    urduCaption: 'ورلڈ آرتھرائٹس ڈے: جوڑوں اور کمر کے درد کا علاج۔ پورانا گولی مار اور بلدیہ ٹاؤن کیمپس میں 27 فیصد مریض ہڈیوں اور جوڑوں کے درد میں مبتلا پائے گئے۔ ڈاکٹر ارجن کمار سے رجوع کریں۔',
    visualPrompt: 'Educational anatomical graphic showing joint health, overlaid with clear Urdu/English advice by Dr. Arjun Kumar, Khidmat-e-Alam Medical Center OPD schedule: Mon, Fri, Sat, Sun 4-7 PM.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '13 Oct',
    dayOfWeek: 'Tuesday',
    platform: 'instagram',
    contentType: 'Doctor Spotlight',
    topic: 'Urgent Care Night Clinic: Dr. Ashok Kumar & Dr. Arshad',
    caption: 'Medical emergencies don’t keep office hours. Our Nazimabad Urgent Care Unit is open all night (8:00 PM – 8:00 AM) with Dr. Ashok Kumar and Dr. Arshad. Consultation fee: Rs. 500 only.',
    urduCaption: 'رات کے وقت ایمرجنسی طبی امداد: ڈاکٹر اشوک کمار اور ڈاکٹر ارشد رات 8:00 تا صبح 8:00 بجے تک الرٹ ہیں۔ فیس صرف 500 روپے۔ ناظم آباد کراچی۔',
    visualPrompt: 'Clean nighttime clinic photograph of illuminated reception and emergency triage room, modern typography highlighting 8 PM - 8 AM and Rs. 500 fee, UAN 1111528.',
    status: 'Approved',
    assignedTo: 'Fatima Zahra',
  },
  {
    date: '14 Oct',
    dayOfWeek: 'Wednesday',
    platform: 'youtube',
    contentType: 'Doctor Spotlight',
    topic: 'Ultrasound Diagnostics: What Expecting Mothers Need to Know',
    caption: 'Consultant Sonologist Dr. Somreen Zahra explains the critical importance of timely obstetric ultrasound scans in detecting fetal complications. Available Mon-Sat 10 AM-1 PM at Nazimabad Medical Center.',
    urduCaption: 'حاملہ ماؤں کے لیے الٹراساؤنڈ کی اہمیت: ڈاکٹر ثمرین زہرہ (ماہر سونولوجسٹ) کی تفصیلی رہنمائی۔ خدمتِ عالم میڈیکل سینٹر، ناظم آباد، کراچی۔',
    visualPrompt: 'High-definition YouTube thumbnail: Dr. Somreen Zahra demonstrating ultrasound scanner, title banner "PREGNANCY ULTRASOUND GUIDE", official KAWT logo.',
    status: 'Draft',
    assignedTo: 'Zainab Qureshi',
  },
  {
    date: '15 Oct',
    dayOfWeek: 'Thursday',
    platform: 'facebook',
    contentType: 'Medical Awareness',
    topic: 'Global Handwashing Day & Rural Hygiene Awareness',
    caption: 'Global Handwashing Day: Over 22% of pediatric camp cases in Thatta and Hub were preventable waterborne and intestinal infections. Safe water and clean hands save lives. Learn about KAWT prevention initiatives.',
    urduCaption: 'عالمی یومِ صفائی ہاتھ: صابن سے ہاتھ دھونا پیٹ اور گلے کی 50 فیصد بیماریوں سے بچاتا ہے۔ ٹھٹھہ اور بلوچستان کے کیمپس میں صفائی کی آگاہی سیشنز۔',
    visualPrompt: 'Clean educational poster showing proper 6-step handwashing technique with bilingual Urdu/English labels, sponsored by Khidmat-e-Alam Welfare Trust.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '16 Oct',
    dayOfWeek: 'Friday',
    platform: 'facebook',
    contentType: 'Donation Campaign',
    topic: 'World Food Day & Friday Sadqah: Pediatric Malnutrition Relief',
    caption: 'World Food Day 2026: 38% of all patients in our 2026 free medical camps were children under 12, with widespread nutritional anemia and vitamin deficiencies. Dedicate your Friday Sadqah to child health packages.',
    urduCaption: 'ورلڈ فوڈ ڈے اور جمعہ مبارک: ہمارے کیمپس میں 880 معصوم بچوں کا معائنہ کیا گیا جن میں خوراک کی کمی اور آئرن ڈیفیشنسی عام تھی۔ معصوم بچوں کے علاج میں حصہ لیجیے۔',
    visualPrompt: 'Documentary portrait of a smiling young boy holding vitamins provided free by KAWT team, surrounded by gentle warm light, official donation accounts in clean bar at bottom.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '17 Oct',
    dayOfWeek: 'Saturday',
    platform: 'linkedin',
    contentType: 'CSR Report',
    topic: 'Pharmaceutical Supply Chain & Zakat Separation at KAWT',
    caption: 'Transparency in Welfare Medicine Procurement: In 2026, KAWT dispensed 22,309 therapeutic medicine units across 39 generic groups. All Zakat funds are segregated in dedicated ledgers for audited medicine dispensing.',
    urduCaption: 'ادویات کی خریداری اور زکوٰۃ کی کڑی جانچ پڑتال: خدمتِ عالم ویلفیئر ٹرسٹ میں زکوٰۃ کے فنڈز کو صرف اور صرف مستحق مریضوں کی میڈیسنز پر خرچ کیا جاتا ہے۔',
    visualPrompt: 'Professional supply chain and pharmacy quality inspection graphic showing batch-verified medicine packages, audited ledger icon, and corporate partnership contact details.',
    status: 'Approved',
    assignedTo: 'Tariq Mehmood',
  },
  {
    date: '18 Oct',
    dayOfWeek: 'Sunday',
    platform: 'instagram',
    contentType: 'Community Story',
    topic: 'Volunteer Spotlight: 49 Heroes Behind the 2026 Camps',
    caption: 'Behind 2,318 treated patients were 49 passionate volunteers and 19 doctors who braved extreme heat in Hub and Thatta. Meet the dedicated youth making healthcare accessible for all.',
    urduCaption: 'خدمت کے گمنام ہیرو: 49 رضا کار اور 19 ڈاکٹرز جنہوں نے حب اور ٹھٹھہ کی سخت گرمی میں مریضوں کی خدمت کی۔ خدمتِ عالم رضاکار فورس کو سلام۔',
    visualPrompt: 'Group photo of enthusiastic, diverse young volunteers in clean branded KAWT vests smiling at the conclusion of a successful camp day. Authentic, warm, community-centered.',
    status: 'Review',
    assignedTo: 'Fatima Zahra',
  },
  {
    date: '19 Oct',
    dayOfWeek: 'Monday',
    platform: 'tiktok',
    contentType: 'Reel / Short',
    topic: 'How Free Consultation Tokens Work at Nazimabad Medical Center',
    caption: 'Need to see a specialist? Here is a simple 30-second walkthrough on how to get an OPD token for General Physician, Pediatrician, Gynecologist, or Sonologist at 351 Usmania Society, Nazimabad. UAN: 1111528.',
    urduCaption: 'خدمتِ عالم میڈیکل سینٹر میں ٹوکن کیسے حاصل کریں؟ ناظم آباد نمبر 1 کراچی میں سستے اور معیاری علاج کا آسان طریقہ۔ ہیلپ لائن: 1111528۔',
    visualPrompt: 'Snappy first-person POV video walking into clean, air-conditioned reception desk, polite receptionist issuing token, quick cut to doctor consultation room, ending with UAN 1111528.',
    status: 'Approved',
    assignedTo: 'Zainab Qureshi',
  },
  {
    date: '20 Oct',
    dayOfWeek: 'Tuesday',
    platform: 'facebook',
    contentType: 'Medical Awareness',
    topic: 'World Osteoporosis Day: Bone Density & Calcium for Women',
    caption: 'World Osteoporosis Day: Calcium & Vitamin D deficiencies were among the top dispensed medications in all 5 camps. Dr. Nadia Shehzad (Gynecologist) shares bone health advice for women over 35.',
    urduCaption: 'ورلڈ آسٹیوپوروسس ڈے: ہڈیوں کی کمزوری اور کیلشیم کی کمی سے بچاؤ۔ 35 سال سے زائد عمر کی خواتین کے لیے ڈاکٹر نادیہ شہزاد کے خصوصی طبی مشورے۔',
    visualPrompt: 'Modern medical infographic illustrating dietary calcium sources and walking habits, featuring Dr. Nadia Shehzad consultation schedule: Mon & Wed 12-2 PM at Nazimabad Medical Center.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '21 Oct',
    dayOfWeek: 'Wednesday',
    platform: 'instagram',
    contentType: 'Doctor Spotlight',
    topic: 'General Physician Services: Dr. Umair Ali & Dr. Layakat',
    caption: 'Routine health checks prevent acute hospitalizations. Meet Dr. Umair Ali (Mon-Sat 9 PM-12 AM, Fee: Rs. 600) and Dr. Layakat (Mon-Sat 8 AM-2 PM, Fee: Rs. 500) at Nazimabad Medical Center.',
    urduCaption: 'ماہر جنرل فزیشنز: ڈاکٹر عمیر علی (رات 9 تا 12 بجے) اور ڈاکٹر لیاقت (صبح 8 تا دوپہر 2 بجے)۔ فیس صرف 500 تا 600 روپے۔ ناظم آباد کراچی۔',
    visualPrompt: 'Dual doctor spotlight card showing Dr. Umair Ali and Dr. Layakat with professional portraits, shift timings, and subsidized fees. Deep red and navy brand theme.',
    status: 'Draft',
    assignedTo: 'Fatima Zahra',
  },
  {
    date: '22 Oct',
    dayOfWeek: 'Thursday',
    platform: 'facebook',
    contentType: 'Medical Camp Update',
    topic: 'Purana Golimar Retrospective: 320 Urban Squatter Families Treated',
    caption: 'Revisiting FMC-01 at Old KMC Quarters, Purana Golimar: Over 208 female patients received free gynecological and general medical screening. Transparent reporting builds community trust.',
    urduCaption: 'پرانا گولی مار کیمپ کی جھلکیاں: 320 مریض جن میں 208 خواتین شامل تھیں، مفت چیک اپ اور ادویات فراہم کی گئیں۔ آپ کے عطیات کی شفاف رپورٹنگ۔',
    visualPrompt: 'Impact report card with photo of Purana Golimar camp registration desk, key numbers (320 patients, 5,162 medicines, Rs. 804 cost per patient), KAWT logo.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '23 Oct',
    dayOfWeek: 'Friday',
    platform: 'facebook',
    contentType: 'Donation Campaign',
    topic: 'Friday Appeal: Sponsor Free Medical Camp in Rural Sindh',
    caption: 'Jumma Mubarak: Following the success of our Thatta camp, KAWT is preparing FMC-06 for coastal Sindh. A donation of PKR 250,000 sponsors a complete camp treating 300+ rural villagers.',
    urduCaption: 'جمعہ کا مبارک دن: سندھ کے پسماندہ دیہات میں اگلا فری میڈیکل کیمپ سپانسر کریں۔ 300 مریضوں کی زندگیوں میں شفا کی کرن بنیں۔ زکوٰۃ و صدقات قابلِ قبول۔',
    visualPrompt: 'Emotional respectful appeal graphic showing rural Sindh landscape with mobile medical team vehicle, clear call to action, verified bank accounts and UAN 1111528.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '24 Oct',
    dayOfWeek: 'Saturday',
    platform: 'youtube',
    contentType: 'Medical Awareness',
    topic: 'World Polio Day: Protecting Every Pakistani Child',
    caption: 'World Polio Day 2026: Pakistan’s ongoing fight against poliovirus. Senior Pediatrician Dr. Naveed Khan dispels myths and highlights routine vaccination schedules for infants.',
    urduCaption: 'ورلڈ پولیو ڈے: ہر بچے کو پولیو کے قطرے ضرور پلائیں۔ ڈاکٹر نوید خان (فیملی فزیشن و ماہر اطفال) کا والدین کے نام خصوصی پیغام۔ خدمتِ عالم میڈیکل سینٹر۔',
    visualPrompt: 'YouTube video thumbnail with Dr. Naveed Khan administering oral drops to child, bold Urdu/English title: "POLIO FREE PAKISTAN: DR. NAVEED KHAN", KAWT logo.',
    status: 'Review',
    assignedTo: 'Zainab Qureshi',
  },
  {
    date: '25 Oct',
    dayOfWeek: 'Sunday',
    platform: 'linkedin',
    contentType: 'CSR Report',
    topic: 'Primary Care Infrastructure vs Emergency Overburden in Karachi',
    caption: 'Why subsidized neighborhood medical centers like KAWT Nazimabad are the bedrock of Pakistan’s healthcare system: preventing emergency hospital overflow through early interventions.',
    urduCaption: 'پرائمری ہیلتھ کیئر کا کردار: خدمتِ عالم میڈیکل سینٹر ناظم آباد کس طرح بڑے ہسپتالوں کے ایمرجنسی وارڈز کا بوجھ کم کر رہا ہے۔ تجزیاتی رپورٹ۔',
    visualPrompt: 'LinkedIn clean analytical data card illustrating patient flow through primary outpatient care versus tertiary hospital burden. Professional CSR aesthetic.',
    status: 'Approved',
    assignedTo: 'Tariq Mehmood',
  },
  {
    date: '26 Oct',
    dayOfWeek: 'Monday',
    platform: 'tiktok',
    contentType: 'Reel / Short',
    topic: 'Behind the Scenes: How 22,309 Medicine Units Were Packed & Sorted',
    caption: 'Ever wondered how medicine is packed for 600 patients in the middle of Balochistan? Watch our volunteers and pharmacists organize 48 therapeutic lines with 100% accuracy.',
    urduCaption: 'کیمپ کی ادویات کیسے پیک ہوتی ہیں؟ 22,309 میڈیسنز کی شفاف پیکنگ اور ڈسٹری بیوشن کی بیک اسٹیج ویڈیو۔ خدمتِ عالم ویلفیئر ٹرسٹ۔',
    visualPrompt: 'Fast-paced, satisfying montage of blister packs being categorized, labeled with Urdu dosage instructions, and packed into sterile camp crates with energetic background audio.',
    status: 'Approved',
    assignedTo: 'Zainab Qureshi',
  },
  {
    date: '27 Oct',
    dayOfWeek: 'Tuesday',
    platform: 'instagram',
    contentType: 'Doctor Spotlight',
    topic: 'Subsidized Consultation Fees: Why Healthcare Must Remain Affordable',
    caption: 'At Khidmat-e-Alam Medical Center, specialist consultation starts at just Rs. 300 to Rs. 1,000, with Urgent Care at Rs. 500. Quality healthcare is a human right, not a luxury.',
    urduCaption: 'معیاری علاج ہر ایک کا حق ہے! خدمتِ عالم میڈیکل سینٹر میں ماہر ڈاکٹرز کی فیس صرف 300 تا 1,000 روپے۔ ناظم آباد نمبر 1 کراچی۔ ہیلپ لائن: 1111528۔',
    visualPrompt: 'Instagram gallery graphic listing full transparent fee schedule for all 15 doctors in clean typography, official address 351 Usmania Society Nazimabad.',
    status: 'Scheduled',
    assignedTo: 'Fatima Zahra',
  },
  {
    date: '28 Oct',
    dayOfWeek: 'Wednesday',
    platform: 'facebook',
    contentType: 'Medical Camp Update',
    topic: 'Yousuf Goath Baldiya Town: Serving Industrial Workers',
    caption: 'Highlighting FMC-02 in Baldiya Town: 254 patients examined, with industrial laborers receiving specialized orthopedic pain relief and gastrointestinal medicines. Read full report.',
    urduCaption: 'یوسف گوٹھ بلدیہ ٹاؤن میڈیکل کیمپ: محنت کشوں اور مزدوروں کے لیے جوڑوں کے درد اور معدے کے امراض کا مفت علاج۔ خدمتِ عالم ویلفیئر ٹرسٹ۔',
    visualPrompt: 'Camp doctor warmly palpating the shoulder of a working-class patient, respectful documentary photography style, official KAWT watermark and verified numbers.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '29 Oct',
    dayOfWeek: 'Thursday',
    platform: 'facebook',
    contentType: 'Medical Awareness',
    topic: 'World Stroke Day: Fast Detection Saves Brain Cells',
    caption: 'World Stroke Day 2026: Remember F.A.S.T. (Face drooping, Arm weakness, Speech difficulty, Time to call). Consultant Physician Dr. Arjun Kumar warns against delaying stroke signs.',
    urduCaption: 'ورلڈ فالج ڈے (World Stroke Day): فالج کی علامات اور بروقت بچاؤ۔ چہرے کا ٹیڑھا ہونا، بازو کی کمزوری اور بولنے میں دشواری فوری ہسپتال پہنچنے کی علامت ہے۔',
    visualPrompt: 'Medical graphic explaining the FAST acronym in bold Urdu and English, emergency contact numbers, and Khidmat-e-Alam Medical Center urgent care info.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '30 Oct',
    dayOfWeek: 'Friday',
    platform: 'facebook',
    contentType: 'Donation Campaign',
    topic: 'End of Month Zakat Reconciliation: How Every Rupee Was Accounted For',
    caption: 'Jumma Mubarak: Transparent accountability is the soul of charity. As October closes, review our verified camp expenditures and fund our November maternal & dialysis missions.',
    urduCaption: 'جمعہ مبارک: پائی پائی کا حساب۔ اکتوبر کا مہینہ ختم ہونے پر اپنے زکوٰۃ و صدقات کے اثرات دیکھیں۔ نومبر کے فری کیمپس کے لیے اپنا حصہ ڈالیں۔',
    visualPrompt: 'Trustee financial certificate preview graphic with clean seals of approval, Meezan Bank and HBL IBAN numbers, official website link www.khidmat-e-alam.org.',
    status: 'Scheduled',
    assignedTo: 'Bilal Khan',
  },
  {
    date: '31 Oct',
    dayOfWeek: 'Saturday',
    platform: 'instagram',
    contentType: 'Community Story',
    topic: 'October Impact Recap: 1 Month, Thousands of Lives Touched',
    caption: 'October Impact Summary: Over 800 patients seen at Nazimabad Medical Center, 2 upcoming medical camps planned, and 30 days of health awareness. Thank you to our donors and doctors!',
    urduCaption: 'اکتوبر کا ماہانہ خلاصہ: سینکڑوں مریضوں کا علاج، 15 ڈاکٹرز کی انتھک محنت اور آپ کا بے لوث تعاون۔ خدمت کا یہ سفر جاری رہے گا، ان شاء اللہ۔',
    visualPrompt: 'Carousel collage of best photos from October clinics and camps, overlaid with "OCTOBER 2026 IMPACT RECAP", grateful closing message from General Secretary Waqar Ahmed.',
    status: 'Scheduled',
    assignedTo: 'Fatima Zahra',
  },
];

export const MonthlyCalendarView: React.FC<MonthlyCalendarViewProps> = ({
  onSchedulePost,
  onNotify,
}) => {
  const [calendarDays, setCalendarDays] = useState<MonthlyCalendarDay[]>(OCTOBER_2026_SCHEDULE);
  const [selectedMonth, setSelectedMonth] = useState('October');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'cards' | 'weeks'>('table');
  const [selectedDayDetail, setSelectedDayDetail] = useState<MonthlyCalendarDay | null>(null);

  // Gemini AI Calendar Generator
  const handleRegenerateWithGemini = async () => {
    setIsGenerating(true);
    onNotify(`Gemini is formulating a 30-day multi-platform content calendar for ${selectedMonth} ${selectedYear}...`);
    try {
      const res = await geminiService.generateMonthlyCalendar({
        month: selectedMonth,
        year: parseInt(selectedYear, 10),
        focusPriorities:
          'Incorporate all 15 doctors from Nazimabad Medical Center, the 5 free medical camps (Thatta, Hub, Golimar), and official international health days.',
      });
      if (res.data?.calendar && res.data.calendar.length > 0) {
        setCalendarDays(res.data.calendar);
        onNotify(`Successfully generated ${res.data.calendar.length} days of scheduled content with Gemini!`);
      } else {
        onNotify('Retained preloaded comprehensive schedule.');
      }
    } catch (err: any) {
      onNotify(err.message || 'AI Calendar generation failed; keeping current plan.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter days
  const filteredDays = calendarDays.filter((d) => {
    const matchesPlatform = selectedPlatform === 'all' || d.platform === selectedPlatform;
    const matchesStatus = selectedStatus === 'all' || d.status === selectedStatus;
    const matchesSearch =
      searchTerm === '' ||
      d.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.urduCaption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.date.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const getPlatformChip = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <span className="chip fb">FB Facebook</span>;
      case 'instagram':
        return <span className="chip ig">IG Instagram</span>;
      case 'linkedin':
        return <span className="chip li">LI LinkedIn</span>;
      case 'tiktok':
        return <span className="chip tt">TT TikTok</span>;
      case 'youtube':
        return <span className="chip yt">YT YouTube</span>;
      default:
        return <span className="chip">{platform}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[var(--green-soft)] text-[var(--green)]">Published</span>;
      case 'Scheduled':
        return <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[var(--blue)]/10 text-[var(--blue)]">Scheduled</span>;
      case 'Approved':
        return <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[var(--amber-soft)] text-[var(--amber)]">Approved</span>;
      case 'Review':
        return <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[var(--red-soft)] text-[var(--red)]">In Review</span>;
      default:
        return <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[var(--card2)] text-[var(--muted)]">Draft</span>;
    }
  };

  return (
    <div className="view space-y-6">
      {/* Top Header */}
      <div className="head">
        <div>
          <span className="eyebrow">Enterprise Social Content Management</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5">
            <Calendar className="w-7 h-7 text-[var(--red)]" />
            <span>Monthly Content Calendar</span>
          </h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            30-day comprehensive multi-platform release schedule for Khidmat-e-Alam Welfare Trust. Aligned with official medical camp reports, doctor OPD rosters, and global healthcare observance days.
          </p>
        </div>

        <div className="row flex items-center gap-2 flex-wrap">
          <button
            onClick={handleRegenerateWithGemini}
            disabled={isGenerating}
            className="btn primary flex items-center gap-1.5"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Gemini Generating...' : 'Regenerate Month with Gemini'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="btn flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Export Calendar</span>
          </button>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="card p-4 flex flex-wrap items-center justify-between gap-3 text-[12.5px]">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Month selector */}
          <div className="flex items-center gap-1 font-semibold text-[var(--ink)]">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-[var(--card2)] border border-[var(--sep)] rounded-lg px-2.5 py-1.5 font-bold"
            >
              <option value="October">October 2026</option>
              <option value="November">November 2026</option>
              <option value="December">December 2026</option>
              <option value="September">September 2026</option>
            </select>
          </div>

          {/* Platform filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-[var(--card2)] border border-[var(--sep)] rounded-lg px-2.5 py-1.5"
          >
            <option value="all">All Platforms (FB, IG, LI, TT, YT)</option>
            <option value="facebook">Facebook Only</option>
            <option value="instagram">Instagram Only</option>
            <option value="linkedin">LinkedIn Only</option>
            <option value="tiktok">TikTok Only</option>
            <option value="youtube">YouTube Only</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[var(--card2)] border border-[var(--sep)] rounded-lg px-2.5 py-1.5"
          >
            <option value="all">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Approved">Approved</option>
            <option value="Review">In Review</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {/* Search bar & View mode */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-3 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search topic, doctor, camp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg pl-8 pr-3 py-1.5 text-[12px]"
            />
          </div>

          <div className="seg">
            <button
              onClick={() => setActiveTab('table')}
              aria-pressed={activeTab === 'table'}
            >
              Table View
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              aria-pressed={activeTab === 'cards'}
            >
              Card View
            </button>
          </div>
        </div>
      </div>

      {/* Main Calendar View: Table Mode (Prompt Format) */}
      {activeTab === 'table' && (
        <div className="card overflow-hidden">
          <div className="card-h bg-[var(--card2)] py-2.5 px-4 flex justify-between items-center text-[12px] text-[var(--muted)]">
            <span className="font-semibold text-[var(--ink)]">
              Showing {filteredDays.length} of {calendarDays.length} scheduled content items for {selectedMonth}
            </span>
            <span>Table Structure: Date · Platform · Content Type · Topic · Caption · Visual Prompt · Status</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px] border-collapse">
              <thead>
                <tr className="border-b border-[var(--sep)] bg-[var(--card)] font-bold text-[11px] uppercase tracking-wider text-[var(--muted)]">
                  <th className="py-3 px-3.5 whitespace-nowrap">Date</th>
                  <th className="py-3 px-3.5">Platform</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Content Type</th>
                  <th className="py-3 px-4 min-w-[200px]">Topic & Hook</th>
                  <th className="py-3 px-4 min-w-[280px]">Caption & Copy (Urdu / English)</th>
                  <th className="py-3 px-4 min-w-[240px]">Visual Prompt (AI Brief)</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sep2)]">
                {filteredDays.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[var(--card2)] transition-colors group cursor-pointer"
                    onClick={() => setSelectedDayDetail(item)}
                  >
                    {/* Date */}
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <div className="font-bold text-[var(--ink)]">{item.date}</div>
                      <div className="text-[11px] text-[var(--muted)]">{item.dayOfWeek}</div>
                    </td>

                    {/* Platform */}
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      {getPlatformChip(item.platform)}
                    </td>

                    {/* Content Type */}
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <span className="font-medium text-[var(--ink2)] bg-[var(--card2)] px-2 py-0.5 rounded border border-[var(--sep2)] text-[11.5px]">
                        {item.contentType}
                      </span>
                    </td>

                    {/* Topic */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-[var(--ink)] line-clamp-2">
                        {item.topic}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-0.5 flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-[var(--green)]" />
                        <span>{item.assignedTo}</span>
                      </div>
                    </td>

                    {/* Caption */}
                    <td className="py-3 px-4">
                      <div className="line-clamp-2 text-[var(--ink2)] leading-snug">
                        {item.caption}
                      </div>
                      {item.urduCaption && (
                        <div className="urdu text-[12px] text-[var(--ink)] mt-1 line-clamp-1 opacity-80">
                          {item.urduCaption}
                        </div>
                      )}
                    </td>

                    {/* Visual Prompt */}
                    <td className="py-3 px-4">
                      <div className="line-clamp-2 text-[11.5px] font-mono text-[var(--muted)] bg-[var(--card2)] p-1.5 rounded border border-[var(--sep2)]">
                        {item.visualPrompt}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          onSchedulePost(item);
                          onNotify(`Pushed ${item.date} (${item.topic}) into active Daily Planner!`);
                        }}
                        className="btn sm green text-white flex items-center gap-1"
                        title="Convert to full post in Daily Planner"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Deploy Post</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Card Mode */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDays.map((item, idx) => (
            <div
              key={idx}
              className="card p-4 space-y-3 hover:border-[var(--sep)] transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => setSelectedDayDetail(item)}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[15px] text-[var(--ink)]">{item.date}</span>
                    <span className="text-[11px] text-[var(--muted)]">({item.dayOfWeek})</span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <div className="flex items-center gap-2">
                  {getPlatformChip(item.platform)}
                  <span className="text-[11px] font-semibold text-[var(--muted)] bg-[var(--card2)] px-2 py-0.5 rounded">
                    {item.contentType}
                  </span>
                </div>

                <h3 className="font-bold text-[14px] text-[var(--ink)] line-clamp-2">{item.topic}</h3>

                <p className="text-[12px] text-[var(--ink2)] line-clamp-3 leading-relaxed">
                  {item.caption}
                </p>

                {item.urduCaption && (
                  <p className="urdu text-[12.5px] text-[var(--ink)] line-clamp-2 bg-[var(--card2)] p-2 rounded-lg">
                    {item.urduCaption}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[var(--sep2)] flex justify-between items-center text-[11.5px]">
                <span className="text-[var(--muted)] flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-[var(--green)]" />
                  {item.assignedTo}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSchedulePost(item);
                    onNotify(`Pushed ${item.date} into active Daily Planner!`);
                  }}
                  className="btn sm text-[11px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3 text-[var(--green)]" />
                  <span>Deploy</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Day Inspector Modal */}
      {selectedDayDetail && (
        <div className="scrim center" onClick={() => setSelectedDayDetail(null)}>
          <div
            className="modal max-w-2xl w-full space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-[var(--sep2)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-[var(--red)]">{selectedDayDetail.date} ({selectedDayDetail.dayOfWeek})</span>
                  {getPlatformChip(selectedDayDetail.platform)}
                  {getStatusBadge(selectedDayDetail.status)}
                </div>
                <h2 className="text-lg font-bold text-[var(--ink)] mt-1">{selectedDayDetail.topic}</h2>
              </div>
              <button onClick={() => setSelectedDayDetail(null)} className="iconbtn">✕</button>
            </div>

            <div className="space-y-3 text-[12.5px]">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-1">
                  English Caption & Copy:
                </label>
                <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] leading-relaxed text-[var(--ink)]">
                  {selectedDayDetail.caption}
                </div>
              </div>

              {selectedDayDetail.urduCaption && (
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-1">
                    اردو کیپشن (Urdu Nastaliq):
                  </label>
                  <div className="urdu p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] text-[14px] leading-loose text-[var(--ink)]">
                    {selectedDayDetail.urduCaption}
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-1">
                  AI Image Generation Prompt (Design Brief):
                </label>
                <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep)] font-mono text-[11.5px] text-[var(--ink2)]">
                  {selectedDayDetail.visualPrompt}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[var(--sep2)] text-[12px]">
                <span className="text-[var(--muted)]">
                  Assigned Team Member: <b>{selectedDayDetail.assignedTo}</b>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${selectedDayDetail.topic}\n\n${selectedDayDetail.urduCaption}\n\n${selectedDayDetail.caption}\n\nVisual Prompt:\n${selectedDayDetail.visualPrompt}`
                      );
                      onNotify('Copied full post plan to clipboard');
                    }}
                    className="btn sm flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All</span>
                  </button>
                  <button
                    onClick={() => {
                      onSchedulePost(selectedDayDetail);
                      setSelectedDayDetail(null);
                      onNotify(`Scheduled ${selectedDayDetail.date} into Daily Content!`);
                    }}
                    className="btn sm green text-white flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Deploy into Production</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
