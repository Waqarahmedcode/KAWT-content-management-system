import { DefinedTopic, autoTagPostContent, DEFINED_TOPICS_LIST } from '../data/seedData';

export interface GenerateRequest {
  prompt: string;
  taskType?: 'post' | 'script' | 'hashtags' | 'appeal' | 'carousel' | 'whatsapp';
  platform?: 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube' | 'all';
  language?: 'both' | 'urdu' | 'english';
  campaign?: string;
  tone?: string;
  modelPreference?: 'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview';
}

export interface GenerateResult {
  title: string;
  urduText: string;
  englishText: string;
  hashtags: string[];
  callToAction: string;
  visualPrompt: string;
  hook?: string;
}

export interface AnalyzeResult {
  overallScore: number;
  scores: {
    dignity: number;
    zakatClarity: number;
    ctaStrength: number;
    linguisticQuality: number;
    platformSuitability: number;
  };
  summary: string;
  strengths: string[];
  improvements: string[];
  enhancedVersion?: {
    english: string;
    urdu: string;
  };
}

export interface EditResult {
  editedText: string;
  urduText?: string;
  changesMade: string;
}

export interface CampaignPlanResult {
  campaignTitle: string;
  strategicNarrative: string;
  targetAudience: string;
  keyUrduTagline: string;
  keyEnglishTagline: string;
  days: Array<{
    dayNumber: number;
    theme: string;
    platform: 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube';
    format: string;
    hookEnglish: string;
    hookUrdu: string;
    postConcept: string;
    cta: string;
  }>;
}

export interface OpdNoticeResult {
  urduNotice: string;
  englishNotice: string;
  bulletPoints: string[];
  socialCaption: string;
}

export interface VisualCreativeResult {
  headline: string;
  supportingText: string;
  impactMessage: string;
  callToAction: string;
  contactBlock: string;
  aiImagePrompt: {
    prompt: string;
    requirements: string[];
    style: string;
    avoid: string[];
    aspectRatio: string;
    lightingAndColor: string;
  };
  carouselSlides?: Array<{
    slideNumber: number;
    slideTitle: string;
    visualDescription: string;
    onScreenText: string;
    captionSnippet: string;
  }>;
  reelScript?: {
    hook: string;
    totalDurationSeconds: number;
    scenes: Array<{
      timeRange: string;
      visualScene: string;
      onScreenText: string;
      voiceoverUrdu: string;
      voiceoverEnglish: string;
    }>;
    coverDesignPrompt: string;
    audioRecommendation: string;
  };
  storyLayout?: {
    interactiveStickers: string[];
    textLayers: string[];
    swipeUpOrLinkCta: string;
  };
}

export interface MonthlyCalendarDay {
  date: string;
  dayOfWeek: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube';
  contentType: 'Medical Awareness' | 'Medical Camp Update' | 'Donation Campaign' | 'Community Story' | 'Doctor Spotlight' | 'Reel / Short' | 'CSR Report';
  topic: string;
  caption: string;
  urduCaption: string;
  visualPrompt: string;
  status: 'Scheduled' | 'Approved' | 'Review' | 'Draft' | 'Published';
  assignedTo: string;
}

export interface MonthlyCalendarResult {
  month: string;
  year: number;
  strategicGoal: string;
  platformDistribution: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };
  calendar: MonthlyCalendarDay[];
}

export const geminiService = {
  async checkHealth(): Promise<{ hasApiKey: boolean }> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch {
      return { hasApiKey: false };
    }
  },

  async generateContent(params: GenerateRequest): Promise<{ success: boolean; data: GenerateResult; modelUsed: string }> {
    const res = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate content' }));
      throw new Error(err.error || 'Server error occurred while calling Gemini');
    }

    return await res.json();
  },

  async generatePostCopy(params: {
    topic: string;
    platform: string;
    tone?: string;
    zakatEligible?: boolean;
    campaignFocus?: string;
    specificStats?: string;
  }): Promise<{ success: boolean; data: GenerateResult; modelUsed: string }> {
    return this.generateContent({
      prompt: params.specificStats ? `${params.topic} - ${params.specificStats}` : params.topic,
      platform: (params.platform as any) || 'facebook',
      language: 'both',
      campaign: params.campaignFocus,
      tone: params.tone || 'dignified, transparent humanitarian',
    });
  },

  async analyzeContent(content: string, platform = 'general', campaign = '', modelPreference?: string): Promise<{ success: boolean; data: AnalyzeResult; modelUsed: string }> {
    const res = await fetch('/api/gemini/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, platform, campaign, modelPreference }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to analyze content' }));
      throw new Error(err.error || 'Server error occurred while analyzing content');
    }

    return await res.json();
  },

  async editContent(originalText: string, instruction: string, modelPreference = 'gemini-3.1-flash-lite'): Promise<{ success: boolean; data: EditResult; modelUsed: string }> {
    const res = await fetch('/api/gemini/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalText, instruction, modelPreference }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to edit content' }));
      throw new Error(err.error || 'Server error occurred while editing with Gemini');
    }

    return await res.json();
  },

  async generateCampaignPlan(params: {
    campaignName: string;
    targetGoal?: string;
    durationDays?: number;
    focusArea?: string;
    keyMessage?: string;
    modelPreference?: string;
  }): Promise<{ success: boolean; data: CampaignPlanResult; modelUsed: string }> {
    const res = await fetch('/api/gemini/campaign-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate campaign plan' }));
      throw new Error(err.error || 'Server error occurred while planning campaign');
    }

    return await res.json();
  },

  async generateOpdNotice(params: {
    clinicName: string;
    doctorName?: string;
    timing?: string;
    days?: string;
    location?: string;
    specialServices?: string;
    isFree?: boolean;
  }): Promise<{ success: boolean; data: OpdNoticeResult }> {
    const res = await fetch('/api/gemini/opd-notice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate OPD notice' }));
      throw new Error(err.error || 'Server error occurred while generating OPD notice');
    }

    return await res.json();
  },

  async generateVisualCreative(params: {
    topic: string;
    platform?: string;
    creativeType?: string;
    targetAudience?: string;
    doctorOrCampName?: string;
    keyStats?: string;
  }): Promise<{ success: boolean; data: VisualCreativeResult; modelUsed: string }> {
    const res = await fetch('/api/gemini/visual-creative', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate visual creative' }));
      throw new Error(err.error || 'Server error occurred while generating visual creative');
    }

    return await res.json();
  },

  async generateMonthlyCalendar(params: {
    month?: string;
    year?: number;
    focusPriorities?: string;
  }): Promise<{ success: boolean; data: MonthlyCalendarResult; modelUsed: string }> {
    const res = await fetch('/api/gemini/monthly-calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate monthly calendar' }));
      throw new Error(err.error || 'Server error occurred while generating monthly calendar');
    }

    return await res.json();
  },

  async generateImage(params: {
    prompt: string;
    referenceImage?: string;
    aspectRatio?: '1:1' | '16:9' | '4:3' | '3:4' | '9:16';
    imageSize?: '512px' | '1K' | '2K';
    modelPreference?: 'gemini-3.1-flash-image' | 'gemini-3.1-flash-lite-image';
  }): Promise<{ success: boolean; imageUrl: string; feedback: string; modelUsed: string }> {
    const res = await fetch('/api/gemini/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate image' }));
      throw new Error(err.error || 'Server error occurred while generating image');
    }

    return await res.json();
  },

  async autoTagPost(params: {
    title?: string;
    englishText?: string;
    urduText?: string;
    campaignName?: string;
    hook?: string;
    callToAction?: string;
    hashtags?: string[];
  }): Promise<{
    success: boolean;
    topics: DefinedTopic[];
    primaryTopic?: DefinedTopic;
    confidence?: Record<string, number>;
    rationale?: string;
    source: 'gemini' | 'rules';
  }> {
    try {
      const res = await fetch('/api/gemini/auto-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data.topics) && json.data.topics.length > 0) {
          // Validate valid topics
          const validSet = new Set(DEFINED_TOPICS_LIST.map((t) => t.id));
          const validatedTopics = json.data.topics.filter((t: string) => validSet.has(t as DefinedTopic)) as DefinedTopic[];
          if (validatedTopics.length > 0) {
            return {
              success: true,
              topics: validatedTopics,
              primaryTopic: json.data.primaryTopic,
              confidence: json.data.confidence,
              rationale: json.data.rationale,
              source: 'gemini',
            };
          }
        }
      }
    } catch (err) {
      console.warn('Gemini auto-tag fetch failed, using rule-based categorization:', err);
    }

    // High quality deterministic fallback
    const ruleTopics = autoTagPostContent(params);
    return {
      success: true,
      topics: ruleTopics,
      primaryTopic: ruleTopics[0],
      rationale: `Classified via KAWT healthcare taxonomy based on recognized clinical, charity, and emergency keywords.`,
      source: 'rules',
    };
  },
};
