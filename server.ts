import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client utility
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to select model based on preference/task
function getModel(preferred?: string, fallback = 'gemini-3.8-flash'): string {
  if (preferred === 'gemini-3.1-flash-lite') return 'gemini-3.1-flash-lite';
  if (preferred === 'gemini-3.1-pro-preview') return 'gemini-3.1-pro-preview';
  if (preferred === 'gemini-3.5-flash') return 'gemini-3.8-flash'; // map to 3.8-flash
  return fallback;
}

// 1. Health & Config status
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    timestamp: new Date().toISOString(),
  });
});

// 2. Generate Content (Multi-platform, Bilingual Urdu/English)
app.post('/api/gemini/generate', async (req: Request, res: Response) => {
  try {
    const {
      prompt,
      taskType = 'post',
      platform = 'facebook',
      language = 'both',
      campaign = 'General Welfare & OPD',
      tone = 'Inspiring & Dignified',
      modelPreference = 'gemini-3.8-flash',
    } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const modelName = getModel(modelPreference, 'gemini-3.8-flash');

    const systemInstruction = `You are the lead bilingual content strategist and copywriter for Khidmat-e-Alam Welfare Trust (KAWT), a premier non-profit welfare and healthcare trust in Pakistan.
KAWT provides:
- Free Hospital OPDs (Eye clinics & Cataract surgery, Dialysis unit, Cardiology, Pediatrics, Gynecology, General Medicine, Diagnostic Lab, Blood Bank)
- Humanitarian Relief: Ration distributions, Clean RO Drinking Water filtration plants, Ramadan Iftar & Sahoor food boxes, Thalassemia children support, Mobile medical dispensaries.

Guidelines:
1. Always maintain dignity and respect for patients and beneficiaries (never dehumanize or show pity). Emphasize hope, community solidarity (خدمتِ خلق), and life-changing impact.
2. For charity appeals, clearly highlight Sadqah (صدقہ) and Zakat (زکوٰۃ) eligibility, with clear calls to action.
3. For Urdu copy, produce authentic, eloquent, and grammatically impeccable Urdu in Arabic script (نستعلیق / نسخ style vocabulary like عطیات، کارِ خیر، شفا، امید کی کرن).
4. For English copy, produce punchy, modern, emotion-driven social media copy suitable for ${platform}.
5. Return your output as valid JSON matching this schema:
{
  "title": "Short catchy title",
  "urduText": "Urdu version of the post/script with proper paragraph breaks and emotional resonance",
  "englishText": "English version of the post/script formatted for the target platform",
  "hashtags": ["#KAWT", "#KhidmateAlam", "#FreeHealthcare", "#ZakatEligible", "#SadqahJariyah"],
  "callToAction": "Direct donation CTA with bank transfer / helpline prompt",
  "visualPrompt": "Detailed art direction / photo prompt for the graphic designer or photographer (dignified, natural warm lighting, authentic Pakistani setting)",
  "hook": "Eye-catching opening hook line"
}`;

    const userPrompt = `Task Type: ${taskType}
Target Platform: ${platform}
Preferred Language: ${language}
Related Campaign: ${campaign}
Desired Tone: ${tone}
User Request & Context:
${prompt}

Output strictly valid JSON with the specified schema without Markdown fences if possible, or inside a clean json block.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      // Fallback clean
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data, modelUsed: modelName });
  } catch (error: any) {
    console.error('Gemini Generate Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate content with Gemini',
    });
  }
});

// 3. Analyze Content (Dignity, Zakat Compliance, Tone & Engagement Audit)
app.post('/api/gemini/analyze', async (req: Request, res: Response) => {
  try {
    const { content, platform = 'general', campaign = '' } = req.body;

    if (!content) {
      res.status(400).json({ error: 'Content is required for analysis' });
      return;
    }

    const modelName = getModel(req.body.modelPreference, 'gemini-3.8-flash');

    const systemInstruction = `You are a Senior Welfare Trust Editorial Director & Islamic Philanthropy Specialist auditing social media copy for Khidmat-e-Alam Welfare Trust (KAWT).
Audit the given draft against 5 dimensions:
1. Beneficiary Dignity & Ethical Framing: Does it preserve the honor of poor patients or children? Avoid sensationalized sorrow or degrading imagery.
2. Zakat & Sadqah Compliance: Is the distinction between Zakat and General Sadqah clear? Is there transparency in how funds are used?
3. Call-To-Action (CTA) & Conversion Strength: Are banking details, helpline, or online portal instructions clear?
4. Linguistic Quality (Urdu/English): Is phrasing natural, emotive, grammatically correct, and culturally authentic?
5. Platform Optimization: Appropriate length, structure, emojis, hooks, and hashtags for ${platform}.

Return strictly JSON with:
{
  "overallScore": number (0-100),
  "scores": {
    "dignity": number (0-100),
    "zakatClarity": number (0-100),
    "ctaStrength": number (0-100),
    "linguisticQuality": number (0-100),
    "platformSuitability": number (0-100)
  },
  "summary": "2-3 sentence executive assessment",
  "strengths": ["point 1", "point 2"],
  "improvements": ["actionable improvement 1", "actionable improvement 2"],
  "enhancedVersion": {
    "english": "Polished improved English text",
    "urdu": "Polished improved Urdu text"
  }
}`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Campaign: ${campaign}\nPlatform: ${platform}\n\nDraft Content to Audit:\n${content}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data, modelUsed: modelName });
  } catch (error: any) {
    console.error('Gemini Analyze Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to analyze content with Gemini',
    });
  }
});

// 4. Quick Smart Edit & Transform (Flash-lite for speed)
app.post('/api/gemini/edit', async (req: Request, res: Response) => {
  try {
    const { originalText, instruction, modelPreference = 'gemini-3.1-flash-lite' } = req.body;

    if (!originalText || !instruction) {
      res.status(400).json({ error: 'originalText and instruction are required' });
      return;
    }

    const modelName = getModel(modelPreference, 'gemini-3.1-flash-lite');

    const systemInstruction = `You are a rapid copy editor for Khidmat-e-Alam Welfare Trust (KAWT).
Perform the requested modification on the draft text while keeping KAWT's warm, credible, and dignified voice.
Return strictly JSON with:
{
  "editedText": "The modified text",
  "urduText": "Urdu version if relevant, or Urdu equivalent",
  "changesMade": "Brief explanation of what was updated"
}`;

    const prompt = `Original Text:\n${originalText}\n\nInstruction:\n${instruction}`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data, modelUsed: modelName });
  } catch (error: any) {
    console.error('Gemini Edit Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to edit content with Gemini',
    });
  }
});

// 5. Campaign Strategy & Content Calendar Planner
app.post('/api/gemini/campaign-plan', async (req: Request, res: Response) => {
  try {
    const {
      campaignName,
      targetGoal,
      durationDays = 7,
      focusArea = 'Healthcare & Ration',
      keyMessage = '',
      modelPreference = 'gemini-3.8-flash',
    } = req.body;

    if (!campaignName) {
      res.status(400).json({ error: 'campaignName is required' });
      return;
    }

    const modelName = getModel(modelPreference, 'gemini-3.8-flash');

    const systemInstruction = `You are the Chief Campaign Architect for Khidmat-e-Alam Welfare Trust.
Formulate a coherent, multi-day digital campaign plan that drives awareness, trust, and donations for KAWT.
Return strictly JSON matching:
{
  "campaignTitle": string,
  "strategicNarrative": string,
  "targetAudience": string,
  "keyUrduTagline": string,
  "keyEnglishTagline": string,
  "days": [
    {
      "dayNumber": number,
      "theme": string,
      "platform": "facebook" | "instagram" | "linkedin" | "tiktok" | "youtube",
      "format": "Carousel" | "Reel / Video" | "Story" | "Single Image" | "Infographic",
      "hookEnglish": string,
      "hookUrdu": string,
      "postConcept": string,
      "cta": string
    }
  ]
}`;

    const prompt = `Campaign Name: ${campaignName}
Fundraising Target / Goal: ${targetGoal || 'Community outreach and donor support'}
Duration: ${durationDays} days
Focus Area: ${focusArea}
Specific Directives: ${keyMessage || 'Build anticipation, highlight real beneficiary impact, showcase facility transparency, and issue an urgent final appeal.'}`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data, modelUsed: modelName });
  } catch (error: any) {
    console.error('Gemini Campaign Plan Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate campaign plan with Gemini',
    });
  }
});

// 6. Medical OPD Clinic Notice & Patient Alert Generator
app.post('/api/gemini/opd-notice', async (req: Request, res: Response) => {
  try {
    const { clinicName, doctorName, timing, days, location, specialServices, isFree = true } = req.body;

    const modelName = 'gemini-3.1-flash-lite';

    const systemInstruction = `You are the Hospital Communications Officer for KAWT Free Medical Trust.
Produce clean, patient-friendly announcements in both Urdu and English for a free medical OPD clinic or specialized camp.
Output JSON:
{
  "urduNotice": "Clear, readable Urdu announcement for WhatsApp groups, banner print, and social media",
  "englishNotice": "Clear English announcement for social media",
  "bulletPoints": ["Free medicines provided", "Token distribution starts at 8:00 AM", ...],
  "socialCaption": "Short punchy social media caption with location and emergency contact info"
}`;

    const prompt = `Clinic/Camp: ${clinicName}
Consultant/Doctor: ${doctorName || 'Senior Medical Specialists'}
Timings: ${timing || '9:00 AM to 2:00 PM'}
Days: ${days || 'Monday through Saturday'}
Facility Location: ${location || 'Khidmat-e-Alam Medical Center, 351, Usmania Society, B Road, Nazimabad, Karachi'}
Services: ${specialServices || 'Free Consultation, Free Essential Medicines, Lab Tests at discount'}
Free Of Cost: ${isFree ? 'Yes, completely free for deserving patients' : 'Subsidized'}`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Gemini OPD Notice Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate OPD notice with Gemini',
    });
  }
});

// 7. Visual Creative & AI Design Prompt Generator
app.post('/api/gemini/visual-creative', async (req: Request, res: Response) => {
  try {
    const {
      topic,
      platform = 'instagram',
      creativeType = 'carousel',
      targetAudience = 'Community donors, patients, and healthcare partners',
      doctorOrCampName,
      keyStats,
    } = req.body;

    const modelName = 'gemini-3.8-flash';

    const systemInstruction = `You are the Lead Art Director and Visual Content Strategist for Khidmat-e-Alam Welfare Trust (KAWT).
Official Branding Requirements:
- Brand: Khidmat-e-Alam Welfare Trust
- Facility: Khidmat-e-Alam Medical Center (351, Usmania Society, B Road, Nazimabad, Karachi)
- UAN: 1111528 | Web: www.khidmat-e-alam.org
- Brand Colors: Deep Medical Red (#C3202F), Healing Emerald Green (#0C7A4A), Trust Navy (#12305B), Clean White
- Identity: Dignified Pakistani healthcare NGO, transparent, humanitarian, zero sensationalism or exploitative poverty tropes.

Return strictly JSON matching:
{
  "headline": string,
  "supportingText": string,
  "impactMessage": string,
  "callToAction": string,
  "contactBlock": string,
  "aiImagePrompt": {
    "prompt": "Create a professional NGO healthcare social media design for Khidmat-e-Alam Welfare Trust...",
    "requirements": string[],
    "style": string,
    "avoid": string[],
    "aspectRatio": "1:1" | "9:16" | "16:9" | "4:5",
    "lightingAndColor": string
  },
  "carouselSlides": [
    {
      "slideNumber": number,
      "slideTitle": string,
      "visualDescription": string,
      "onScreenText": string,
      "captionSnippet": string
    }
  ],
  "reelScript": {
    "hook": string,
    "totalDurationSeconds": number,
    "scenes": [
      {
        "timeRange": string,
        "visualScene": string,
        "onScreenText": string,
        "voiceoverUrdu": string,
        "voiceoverEnglish": string
      }
    ],
    "coverDesignPrompt": string,
    "audioRecommendation": string
  },
  "storyLayout": {
    "interactiveStickers": string[],
    "textLayers": string[],
    "swipeUpOrLinkCta": string
  }
}`;

    const prompt = `Generate a complete multi-format visual design package for KAWT:
Topic: ${topic || 'Free Medical Camp Impact and Doctor Specialist Services'}
Platform Target: ${platform}
Creative Format: ${creativeType}
Doctor or Camp Focus: ${doctorOrCampName || 'Khidmat-e-Alam Medical Center Specialist OPD'}
Real Context / Statistics: ${keyStats || 'Over 2,318 patients treated across 5 major medical camps (Thatta, Hub Balochistan, Purana Golimar, Baldiya Town) with 22,309 free medicine units distributed. 15 OPD specialist doctors available daily at Nazimabad Karachi.'}
Target Audience: ${targetAudience}`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data, modelUsed: modelName });
  } catch (error: any) {
    console.error('Gemini Visual Creative Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate visual creative with Gemini',
    });
  }
});

// 8. Monthly Content Calendar Generator (Full Month Schedule with Important Days)
app.post('/api/gemini/monthly-calendar', async (req: Request, res: Response) => {
  try {
    const {
      month = 'October',
      year = 2026,
      focusPriorities = 'Highlight Free Medical Camps (Thatta, Hub, Golimar), Doctors OPD Roster (Pediatrics, Gynecology, Dermatology, Urgent Care), and International Health Days',
    } = req.body;

    const modelName = 'gemini-3.8-flash';

    const systemInstruction = `You are the Chief Social Media Director for Khidmat-e-Alam Welfare Trust (KAWT).
Generate a comprehensive multi-platform monthly calendar plan.
Incorporate real KAWT facts:
- Medical Center: 351, Usmania Society, B Road, Nazimabad, Karachi (UAN: 1111528)
- 15 Doctors: Dr. Ishwar Lohana, Dr. Naveed Khan, Dr. Arjun Kumar, Dr. Shahnawaz, Dr. Binesh Bakai, Dr. Sajida Nadeem, Dr. Nadia Shehzad, Dr. Jaywanti Jha, Dr. Khalid Ahmed, Dr. Umair Ali, Dr. Somreen Zahra, Dr. Layakat, Dr. Ashok Kumar, Dr. Arshad.
- Real 2026 Camps Data: 2,318 patients, 22,309 medicines, 5 free camps (Purana Golimar, Baldiya Town, Galaxy Town Hub 1 & 2, Thatta Sindh). 75% Zakat funded for medicines.
- Observance Days in October:
  * 1 Oct: World Heart Health / Breast Cancer Awareness Month Kickoff
  * 4 Oct: World Cerebral Palsy Day
  * 8 Oct: World Sight Day
  * 10 Oct: World Mental Health Day
  * 12 Oct: World Arthritis Day
  * 15 Oct: Global Handwashing Day / Rural Women's Day
  * 16 Oct: World Food Day
  * 20 Oct: World Osteoporosis Day
  * 24 Oct: World Polio Day
  * 29 Oct: World Stroke Day
  * Every Friday: Jumma Sadqah & Zakat reflections

Return strictly JSON matching:
{
  "month": string,
  "year": number,
  "strategicGoal": string,
  "platformDistribution": {
    "facebook": string,
    "instagram": string,
    "linkedin": string,
    "youtube": string,
    "tiktok": string
  },
  "calendar": [
    {
      "date": string,
      "dayOfWeek": string,
      "platform": "facebook" | "instagram" | "linkedin" | "tiktok" | "youtube",
      "contentType": "Medical Awareness" | "Medical Camp Update" | "Donation Campaign" | "Community Story" | "Doctor Spotlight" | "Reel / Short" | "CSR Report",
      "topic": string,
      "caption": string,
      "urduCaption": string,
      "visualPrompt": string,
      "status": "Scheduled" | "Approved" | "Review" | "Draft",
      "assignedTo": "Social Media Manager" | "Content Creator" | "Video Manager" | "Copywriter" | "Medical Advisor"
    }
  ]
}`;

    const prompt = `Generate a rich 30-day content calendar for ${month} ${year}.
Focus Directives: ${focusPriorities}.
Include all important international health days, medical camp transparency updates, and doctor OPD announcements.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data, modelUsed: modelName });
  } catch (error: any) {
    console.error('Gemini Monthly Calendar Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate monthly calendar with Gemini',
    });
  }
});

// 8.5 Auto-Tag Post Categorization using Gemini
app.post('/api/gemini/auto-tag', async (req: Request, res: Response) => {
  try {
    const {
      title = '',
      englishText = '',
      urduText = '',
      campaignName = '',
      hook = '',
      callToAction = '',
      hashtags = [],
    } = req.body;

    const systemInstruction = `You are the lead healthcare taxonomy and social media classification AI for Khidmat-e-Alam Welfare Trust (KAWT).
You must analyze the social media post content (in English, Urdu, or bilingual) and classify it into one or more of these EXACT defined topics:
- "Zakat" (Shariah-compliant Zakat appeals, 100% donation policy, charity, Sadqah, financial transparency)
- "Medical" (Specialist doctors, OPD clinics, consultations, diagnostic prescriptions, clinical services)
- "Emergency" (24/7 urgent night care, acute trauma, sudden fevers, midnight clinic, emergency relief)
- "Free Camp" (Rural or peri-urban outreach free medical camps, Thatta, Hub, Golimar, mobile clinics)
- "Diagnostics" (Ultrasound, sonology, pathology tests, lab screening, blood work)
- "Maternal & Child" (Pediatrics, child health, gynecology, antenatal maternal care, neonatal support)
- "Awareness" (Health awareness days like World Heart Day, preventive tips, disease warning signs)
- "Community" (Clean drinking water RO plants, food rations, volunteer mobilization, community welfare)

Rules:
1. Assign ONLY topics from the exact list above.
2. Select between 1 and 4 relevant topics that genuinely apply.
3. Determine the primary dominant topic.
4. Provide a confidence score (0.0 to 1.0) for each matched topic.
5. Provide a brief 1-sentence rationale in English explaining why these topics were assigned.

Return strictly valid JSON matching this schema:
{
  "topics": ["Medical", "Zakat"],
  "primaryTopic": "Medical",
  "confidence": {
    "Medical": 0.95,
    "Zakat": 0.88
  },
  "rationale": "Explanation for classification"
}`;

    const userPrompt = `Classify this KAWT social media post into defined topics:
Title: ${title}
English Text: ${englishText}
Urdu Text: ${urduText}
Campaign: ${campaignName}
Hook: ${hook}
CTA: ${callToAction}
Hashtags: ${Array.isArray(hashtags) ? hashtags.join(' ') : hashtags}`;

    let response;
    let modelUsed = 'gemini-3.8-flash';
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });
    } catch (e1) {
      console.warn('gemini-3.8-flash busy/failed, attempting gemini-3.1-flash-lite fallback...', e1);
      try {
        modelUsed = 'gemini-3.1-flash-lite';
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: userPrompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });
      } catch (e2) {
        console.warn('Gemini models unavailable, executing server-side taxonomy rule classifier:', e2);
        // Resilient deterministic rule matching
        const text = `${title} ${englishText} ${urduText} ${campaignName} ${hook} ${callToAction}`.toLowerCase();
        const matched: string[] = [];
        if (text.includes('zakat') || text.includes('زکوٰۃ') || text.includes('sadqah') || text.includes('صدقہ') || text.includes('donation')) matched.push('Zakat');
        if (text.includes('doctor') || text.includes('dr.') || text.includes('opd') || text.includes('ڈاکٹر') || text.includes('clinic') || text.includes('medicine')) matched.push('Medical');
        if (text.includes('emergency') || text.includes('urgent') || text.includes('ایمرجنسی') || text.includes('24/7') || text.includes('night clinic')) matched.push('Emergency');
        if (text.includes('camp') || text.includes('کیمپ') || text.includes('thatta') || text.includes('hub')) matched.push('Free Camp');
        if (text.includes('ultrasound') || text.includes('lab') || text.includes('الٹراساؤنڈ') || text.includes('sonolog')) matched.push('Diagnostics');
        if (text.includes('pediatric') || text.includes('child') || text.includes('gynecolog') || text.includes('ماں') || text.includes('اطفال')) matched.push('Maternal & Child');
        if (text.includes('awareness') || text.includes('prevention') || text.includes('world heart') || text.includes('آگاہی')) matched.push('Awareness');
        if (text.includes('water') || text.includes('ration') || text.includes('volunteer') || text.includes('relief')) matched.push('Community');
        if (matched.length === 0) matched.push('Medical');

        return res.json({
          success: true,
          data: {
            topics: matched,
            primaryTopic: matched[0],
            confidence: Object.fromEntries(matched.map((m) => [m, 0.92])),
            rationale: 'Categorized via KAWT healthcare taxonomy based on recognized keywords and campaign context.',
          },
          modelUsed: 'rule-taxonomy',
        });
      }
    }

    const rawText = response?.text || '{}';
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    res.json({ success: true, data, modelUsed });
  } catch (error: any) {
    console.error('Gemini Auto-Tag Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to auto-tag post with Gemini',
    });
  }
});

// 9. AI Image Generation & Editing using Gemini Vision / Image Models
app.post('/api/gemini/generate-image', async (req: Request, res: Response) => {
  try {
    const {
      prompt,
      referenceImage,
      aspectRatio = '1:1',
      imageSize = '1K',
      modelPreference = 'gemini-3.1-flash-image',
    } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Text prompt is required' });
      return;
    }

    // Supported aspect ratios
    const validRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
    const chosenAspect = validRatios.includes(aspectRatio) ? aspectRatio : '1:1';

    // Model selection (gemini-3.1-flash-image or fallback)
    const modelToUse = modelPreference === 'gemini-3.1-flash-lite-image' 
      ? 'gemini-3.1-flash-lite-image' 
      : 'gemini-3.1-flash-image';

    const fullPrompt = `You are designing a high-resolution professional graphic for Khidmat-e-Alam Welfare Trust (KAWT).
Brand colors: Deep Medical Red (#C3202F), Healing Emerald Green (#0C7A4A), Trust Navy (#12305B), and clean white.
Requirements: Professional NGO healthcare aesthetic, clean layout, respectful dignity-first imagery, realistic documentary photography or clean vector framing.
Prompt details: ${prompt}`;

    let contents: any;
    if (referenceImage) {
      let base64Data = referenceImage;
      let mimeType = 'image/png';
      if (referenceImage.startsWith('data:')) {
        const parts = referenceImage.split(',');
        mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
        base64Data = parts[1];
      }

      contents = {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      };
    } else {
      contents = {
        parts: [{ text: fullPrompt }],
      };
    }

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents,
      config: {
        imageConfig: {
          aspectRatio: chosenAspect as any,
          imageSize: imageSize as any,
        },
      },
    });

    let imageUrl = '';
    let textFeedback = '';

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          const mime = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          textFeedback += part.text + '\n';
        }
      }
    }

    if (!imageUrl) {
      throw new Error(textFeedback || 'No image part returned from Gemini model');
    }

    res.json({
      success: true,
      imageUrl,
      feedback: textFeedback.trim(),
      modelUsed: modelToUse,
    });
  } catch (error: any) {
    console.error('Gemini Image Generation Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate image with Gemini',
    });
  }
});

// Mount Vite or static dist
async function setupServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KAWT Content Studio server running at http://0.0.0.0:${PORT}`);
  });
}

setupServer();
