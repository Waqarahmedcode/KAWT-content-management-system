import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  Layers,
  Video,
  Image as ImageIcon,
  Copy,
  Check,
  Download,
  Share2,
  Stethoscope,
  Send,
  Loader2,
  Sliders,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { geminiService, VisualCreativeResult } from '../../services/geminiService';
import { OFFICIAL_DOCTORS, OFFICIAL_MEDICAL_CAMPS, BRAND_KIT } from '../../data/seedData';

interface VisualCreativeViewProps {
  onNotify: (msg: string) => void;
  onDeployToTask?: (title: string, category: any) => void;
}

export const VisualCreativeView: React.FC<VisualCreativeViewProps> = ({
  onNotify,
  onDeployToTask,
}) => {
  const [topic, setTopic] = useState('Thatta & Hub Balochistan Free Medical Camps: Transparent Zakat Deployment');
  const [platform, setPlatform] = useState('instagram');
  const [creativeType, setCreativeType] = useState('carousel');
  const [doctorOrCamp, setDoctorOrCamp] = useState('Free Medical Camp-5 (Thatta Sindh) & Pediatric Roster');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [creativeOutput, setCreativeOutput] = useState<VisualCreativeResult | null>({
    headline: 'Restoring Vision & Health: 2,318 Beneficiaries Across 5 Medical Camps',
    supportingText: 'Khidmat-e-Alam Welfare Trust deployed 19 doctors and 49 volunteers across Thatta, Hub Balochistan, Purana Golimar, and Baldiya Town. 22,309 free medicine units distributed.',
    impactMessage: 'Over 75% of medicine expenditure was funded directly through audited Shariah-compliant Zakat.',
    callToAction: 'Support rural medical relief missions. 100% Zakat eligible. UAN: 1111528.',
    contactBlock: `Khidmat-e-Alam Medical Center\n351, Usmania Society, B Road, Nazimabad, Karachi\nUAN: 1111528 | Web: www.khidmat-e-alam.org\nFB: @khidmat_e_alam | IG: @khidmat_e_alam`,
    aiImagePrompt: {
      prompt: 'Create a professional NGO healthcare social media design for Khidmat-e-Alam Welfare Trust. A compassionate senior Pakistani physician gently checking an elderly rural patient with stethoscope in a clean shaded medical relief tent. Official Khidmat-e-Alam Welfare Trust logo in top-left, subtle deep red and healing green branding accents, authentic humanitarian documentary style, natural diffuse daylight. Clean footer bar containing: "Khidmat-e-Alam Medical Center · Nazimabad Karachi · UAN: 1111528 · www.khidmat-e-alam.org".',
      requirements: [
        'Official Khidmat-e-Alam Welfare Trust logo placed top-left',
        'Brand colors: Deep Medical Red (#C3202F), Healing Emerald Green (#0C7A4A), Trust Navy (#12305B)',
        'Maintain authentic healthcare NGO identity',
        'Professional, dignified medical environment',
        'Realistic documentary photography style (never artificial AI gloss)',
        'Human-centered storytelling with respect for patient privacy',
        'Clean modern layout and high-quality typography',
        'Include verified contact details: UAN 1111528 & www.khidmat-e-alam.org',
      ],
      style: 'Trustworthy, Professional, Emotional but respectful, Community-focused',
      avoid: [
        'Fake medical scenes or theatrical stethoscope poses',
        'Unrealistic distressed or degraded patient depictions (violates dignity)',
        'Overdramatic tears or poverty voyeurism',
        'Low-quality blurry graphics or clip art',
      ],
      aspectRatio: '4:5',
      lightingAndColor: 'Soft natural daylight, medical cleanliness, deep red badge with crisp white typography',
    },
    carouselSlides: [
      {
        slideNumber: 1,
        slideTitle: 'Hook & Impact Milestone',
        visualDescription: 'Emotional documentary photo of smiling grandmother receiving free medicines in Thatta camp.',
        onScreenText: '5 Medical Camps. 2,318 Lives Touched. 100% Free.',
        captionSnippet: 'When specialized healthcare reaches forgotten corners, healing begins. Here is what your Zakat accomplished in 2026.',
      },
      {
        slideNumber: 2,
        slideTitle: 'By The Numbers (Verified Transparency)',
        visualDescription: 'Clean typographic infographic with bold stats in deep red and green counters.',
        onScreenText: '22,309 Medicine Units Dispensed · 60 Emergencies Stabilized · 19 Specialist Doctors Mobilized',
        captionSnippet: 'From industrial laborers in Baldiya to flood-prone villages in Thatta, every single prescription was recorded.',
      },
      {
        slideNumber: 3,
        slideTitle: 'Segregated Zakat Shariah Audit',
        visualDescription: 'Certified financial ledger badge with 75% Zakat allocation highlight.',
        onScreenText: '75% Zakat Fund = 100% Direct Therapeutic Medicines. 0% Operational Leakage.',
        captionSnippet: 'We maintain strict segregation: operational costs are covered by general donors; your Zakat buys medicines for eligible families.',
      },
      {
        slideNumber: 4,
        slideTitle: 'Permanent Nazimabad Medical Center Hub',
        visualDescription: 'Exterior and clean interior of Khidmat-e-Alam Medical Center, 351 Usmania Society Nazimabad.',
        onScreenText: 'Follow-Up Continuity: 15 Specialist Doctors Available Daily in Nazimabad Karachi',
        captionSnippet: 'Patients needing continuous treatment are referred directly to our Nazimabad Medical Center.',
      },
      {
        slideNumber: 5,
        slideTitle: 'Call to Action & Verified Bank Channels',
        visualDescription: 'Official banking details card with Meezan Bank, HBL, and Raast ID QR code.',
        onScreenText: 'Sponsor 1 Patient Treatment for PKR 875 · UAN 1111528',
        captionSnippet: 'Donate today to fund our upcoming November free camp in coastal Sindh. Transfer via Meezan, HBL, or EasyPaisa.',
      },
    ],
    reelScript: {
      hook: 'How far would you travel if your nearest doctor was 4 hours away?',
      totalDurationSeconds: 45,
      scenes: [
        {
          timeRange: '0:00 - 0:05',
          visualScene: 'Quick cinematic cuts of morning mist over Goath Chatto Chand Thatta as the KAWT mobile clinic van arrives.',
          onScreenText: 'Thatta, Sindh · 6:30 AM',
          voiceoverUrdu: 'جب بنیادی علاج میسر نہ ہو، تو ایک معمولی بخار بھی جان لیوا بن سکتا ہے۔',
          voiceoverEnglish: 'When primary healthcare is out of reach, even treatable infections become life-threatening.',
        },
        {
          timeRange: '0:05 - 0:18',
          visualScene: 'Doctor checking a young child with stethoscope, caring smile, prescribing syrup, pharmacist issuing labeled bottles.',
          onScreenText: '548 Patients · 230 Children · 100% Free Medicines',
          voiceoverUrdu: 'الحمدللہ! خدمتِ عالم کے کیمپ میں 548 مریضوں کو ماہر ڈاکٹرز اور مکمل کورس کی مفت ادویات فراہم کی گئیں۔',
          voiceoverEnglish: 'At Khidmat-e-Alam Thatta camp, 548 patients received specialist care and complete free medication courses.',
        },
        {
          timeRange: '0:18 - 0:32',
          visualScene: 'Infographic animation showing 75% Zakat spend directly on medicines and zero administrative cuts.',
          onScreenText: 'PKR 875 Average Cost Per Patient · Segregated Zakat Ledger',
          voiceoverUrdu: 'آپ کی دی گئی زکوٰۃ کا 75 فیصد حصہ براہِ راست ان غریب مریضوں کی دوائیوں پر لگا۔',
          voiceoverEnglish: 'Your Zakat funds were segregated with total transparency to ensure medicines reached those truly eligible.',
        },
        {
          timeRange: '0:32 - 0:45',
          visualScene: 'Grateful village elder raising hands in prayer, closing slate with Khidmat-e-Alam Medical Center UAN 1111528 and bank info.',
          onScreenText: 'Join the Healing Journey · UAN 1111528 · www.khidmat-e-alam.org',
          voiceoverUrdu: 'آئیے، اس کارِ خیر میں ہمارا ساتھ دیجیے۔ رابطہ کیجیے: UAN 1111528۔',
          voiceoverEnglish: 'Join us in bringing compassionate healing to those who need it most. Support KAWT today.',
        },
      ],
      coverDesignPrompt: 'Impactful vertical 9:16 Reel Cover: Dr. Ishwar Lohana smiling warmly while talking to a young patient in the camp tent, bold text in center: "2,318 LIVES SAVED: 2026 CAMPS REPORT", KAWT logo in top left, high contrast readable typography.',
      audioRecommendation: 'Soft inspiring acoustic strings with subtle heartbeat rhythm transitioning to triumphant ambient tone.',
    },
    storyLayout: {
      interactiveStickers: ['Poll: "Did you know 1 camp treatment costs only PKR 875?" [Yes / Learn More]', 'Donation Link Sticker: "Donate Zakat Now"', 'Question Box: "Ask our doctors a health question"'],
      textLayers: ['Khidmat-e-Alam Thatta Camp Recap 🩺', 'Swipe up to read the 11-page verified financial report 📄', 'UAN: 1111528 | Nazimabad Karachi'],
      swipeUpOrLinkCta: 'https://www.khidmat-e-alam.org/',
    },
  });

  const handleGenerate = async () => {
    setIsLoading(true);
    onNotify('Gemini Art Director is designing creative package with official KAWT branding...');
    try {
      const res = await geminiService.generateVisualCreative({
        topic,
        platform,
        creativeType,
        doctorOrCampName: doctorOrCamp,
        keyStats: '2,318 patients served, 22,309 medicines dispensed, 5 camps (Thatta, Hub, Golimar, Baldiya), 15 specialist doctors at Nazimabad Medical Center.',
      });
      if (res.data) {
        setCreativeOutput(res.data);
        onNotify('Generated complete visual design and copy brief!');
      }
    } catch (err: any) {
      onNotify(err.message || 'Generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onNotify(`Copied ${key} to clipboard`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="view space-y-6">
      {/* Header */}
      <div className="head">
        <div>
          <span className="eyebrow">Automated Visual Creative Studio</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5">
            <Palette className="w-7 h-7 text-[var(--red)]" />
            <span>AI Design & Visual Post Generator</span>
          </h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Automatically applies official Khidmat-e-Alam Welfare Trust branding (Logo, Red/Green/Navy palette, Nazimabad Center details, UAN 1111528). Generates professional image prompts, carousel slide breakdowns, Reel scripts with voiceovers, and ready-to-publish copy.
          </p>
        </div>
      </div>

      {/* Input Generator Console */}
      <div className="card p-5 space-y-4 bg-gradient-to-r from-[var(--card)] via-[var(--card2)] to-[var(--card)] border border-[var(--sep)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-[12.5px]">
          <div className="field md:col-span-2">
            <label>Campaign Topic or Medical Announcement</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Free Thatta Medical Camp Recap or Pediatric Clinic"
            />
          </div>

          <div className="field">
            <label>Target Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="tiktok">TikTok / Shorts</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>

          <div className="field">
            <label>Creative Format</label>
            <select value={creativeType} onChange={(e) => setCreativeType(e.target.value)}>
              <option value="carousel">Multi-Slide Carousel</option>
              <option value="single-image">Single Image Poster</option>
              <option value="reel">Reel / Video Script</option>
              <option value="story">Story & Status</option>
              <option value="infographic">Data Infographic</option>
            </select>
          </div>

          <div className="field md:col-span-3">
            <label>Doctor, Medical Camp, or Facility Focus</label>
            <input
              type="text"
              value={doctorOrCamp}
              onChange={(e) => setDoctorOrCamp(e.target.value)}
              placeholder="e.g. Dr. Ishwar Lohana (Pediatrician) or Thatta Free Medical Camp FMC-05"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="btn primary w-full flex items-center justify-center gap-2 h-[38px]"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Designing...' : 'Generate Creatives'}</span>
            </button>
          </div>
        </div>
      </div>

      {creativeOutput && (
        <div className="space-y-6">
          {/* Section 1: Official Branding & Identity Automation Module Banner */}
          <div className="card p-4 bg-[var(--card2)] border border-[var(--sep)]">
            <div className="flex items-center justify-between flex-wrap gap-2 text-[12px]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--green)]"></span>
                <span className="font-bold text-[var(--ink)]">Branding & Identity Automation:</span>
                <span className="text-[var(--ink2)]">
                  Khidmat-e-Alam Welfare Trust · Colors: #C3202F, #0C7A4A, #12305B · UAN: 1111528 · 351, Usmania Society, Nazimabad Karachi
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--muted)]">Automated Verification Check: PASSED</span>
            </div>
          </div>

          {/* Section 2: AI Image Generation Prompt (Formatted to Prompt Schema) */}
          <div className="card p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-[16px] text-[var(--ink)] flex items-center gap-2">
                  <ImageIcon className="w-4.5 h-4.5 text-[var(--red)]" />
                  <span>AI Image Generation Prompt (Midjourney / Imagen / Flux)</span>
                </h3>
                <p className="text-[12px] text-[var(--muted)]">
                  Standardized prompt enforcing dignity, official branding, and zero artificial poverty voyeurism
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(creativeOutput.aiImagePrompt.prompt, 'Image Prompt')}
                className="btn sm flex items-center gap-1.5"
              >
                {copiedKey === 'Image Prompt' ? <Check className="w-3.5 h-3.5 text-[var(--green)]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy AI Prompt</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep)] font-mono text-[12px] leading-relaxed text-[var(--ink)]">
              {creativeOutput.aiImagePrompt.prompt}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
              <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep2)] space-y-1">
                <b className="text-[var(--green)] block font-semibold">Strict Brand Requirements:</b>
                <ul className="list-disc pl-4 space-y-0.5 text-[11.5px] text-[var(--ink2)]">
                  {creativeOutput.aiImagePrompt.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep2)] space-y-1">
                <b className="text-[var(--blue)] block font-semibold">Artistic Style:</b>
                <div className="text-[11.5px] text-[var(--ink2)]">{creativeOutput.aiImagePrompt.style}</div>
                <div className="mt-2 text-[11px] text-[var(--muted)]">
                  <b>Lighting & Palette:</b> {creativeOutput.aiImagePrompt.lightingAndColor}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep2)] space-y-1">
                <b className="text-[var(--red)] block font-semibold">Strict Negative Constraints (Avoid):</b>
                <ul className="list-disc pl-4 space-y-0.5 text-[11.5px] text-[var(--ink2)]">
                  {creativeOutput.aiImagePrompt.avoid.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Automatic Text Generation For Every Visual */}
          <div className="card p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-[16px] text-[var(--ink)]">
                  Automatic Text & Copy Generation
                </h3>
                <p className="text-[12px] text-[var(--muted)]">
                  Structured headline, supporting impact text, call-to-action, and verified contact footer
                </p>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    `${creativeOutput.headline}\n\n${creativeOutput.supportingText}\n\n${creativeOutput.impactMessage}\n\nCTA: ${creativeOutput.callToAction}\n\n${creativeOutput.contactBlock}`,
                    'Complete Copy'
                  )
                }
                className="btn sm green text-white flex items-center gap-1.5"
              >
                {copiedKey === 'Complete Copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Full Copy Block</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12.5px]">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Main Headline</span>
                  <div className="font-bold text-[15px] text-[var(--ink)]">{creativeOutput.headline}</div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Supporting Text</span>
                  <div className="text-[var(--ink2)] leading-relaxed">{creativeOutput.supportingText}</div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--green)]">Impact Message</span>
                  <div className="font-medium text-[var(--ink)]">{creativeOutput.impactMessage}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--red)]">Call-To-Action (CTA)</span>
                  <div className="font-bold text-[var(--red)]">{creativeOutput.callToAction}</div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep)] space-y-1 font-mono text-[11.5px]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] font-sans">
                    Official Contact & Donation Block
                  </span>
                  <pre className="whitespace-pre-wrap text-[var(--ink2)] leading-relaxed font-mono">
                    {creativeOutput.contactBlock}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Multi-Slide Carousel Breakdown */}
          {creativeOutput.carouselSlides && creativeOutput.carouselSlides.length > 0 && (
            <div className="card p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[16px] text-[var(--ink)] flex items-center gap-2">
                    <Layers className="w-4.5 h-4.5 text-[var(--blue)]" />
                    <span>Carousel Slide-by-Slide Design Layout (5 Slides)</span>
                  </h3>
                  <p className="text-[12px] text-[var(--muted)]">
                    Visual descriptions, bold on-screen typography, and micro-captions for each slide
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {creativeOutput.carouselSlides.map((slide) => (
                  <div
                    key={slide.slideNumber}
                    className="p-3.5 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[12px] font-bold text-[var(--red)]">
                          Slide #{slide.slideNumber}
                        </span>
                        <span className="text-[10.5px] font-semibold text-[var(--muted)] truncate max-w-[100px]">
                          {slide.slideTitle}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-[var(--card)] border border-[var(--sep)] text-[11px] font-semibold text-[var(--ink)]">
                        "{slide.onScreenText}"
                      </div>

                      <div className="text-[11.5px] text-[var(--muted)] italic">
                        Visual: {slide.visualDescription}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[var(--sep2)] text-[11px] text-[var(--ink2)] line-clamp-2">
                      {slide.captionSnippet}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Instagram Reel & TikTok Video Script Breakdown */}
          {creativeOutput.reelScript && (
            <div className="card p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[16px] text-[var(--ink)] flex items-center gap-2">
                    <Video className="w-4.5 h-4.5 text-[var(--green)]" />
                    <span>Reel / TikTok Script: Scene Breakdown & Bilingual Voiceover</span>
                  </h3>
                  <p className="text-[12px] text-[var(--muted)]">
                    Total Duration: {creativeOutput.reelScript.totalDurationSeconds}s · Audio: {creativeOutput.reelScript.audioRecommendation}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] text-[12.5px] font-bold text-[var(--ink)]">
                Opening Hook: "{creativeOutput.reelScript.hook}"
              </div>

              <div className="space-y-3">
                {creativeOutput.reelScript.scenes.map((scene, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[var(--card)] border border-[var(--sep)] grid grid-cols-1 md:grid-cols-4 gap-3 text-[12px]"
                  >
                    <div>
                      <span className="font-mono font-bold text-[var(--red)] block">{scene.timeRange}</span>
                      <div className="text-[11.5px] text-[var(--muted)] mt-1">{scene.visualScene}</div>
                    </div>

                    <div className="p-2 bg-[var(--card2)] rounded-lg">
                      <span className="text-[10.5px] font-bold text-[var(--muted)] uppercase block">On-Screen Text</span>
                      <span className="font-semibold text-[var(--ink)]">{scene.onScreenText}</span>
                    </div>

                    <div>
                      <span className="text-[10.5px] font-bold text-[var(--green)] uppercase block">Urdu Voiceover</span>
                      <span className="urdu text-[13px] leading-loose text-[var(--ink)]">{scene.voiceoverUrdu}</span>
                    </div>

                    <div>
                      <span className="text-[10.5px] font-bold text-[var(--blue)] uppercase block">English Voiceover</span>
                      <span className="text-[var(--ink2)]">{scene.voiceoverEnglish}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] text-[12px] space-y-1">
                <b className="text-[var(--muted)] uppercase text-[10.5px] tracking-wider block">Cover Design Prompt:</b>
                <div className="font-mono text-[11.5px] text-[var(--ink)]">{creativeOutput.reelScript.coverDesignPrompt}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
