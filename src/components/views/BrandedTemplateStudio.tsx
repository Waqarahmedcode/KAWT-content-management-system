import React, { useState, useRef } from 'react';
import { KawtLogo } from '../KawtLogo';
import { OFFICIAL_DOCTORS, OFFICIAL_MEDICAL_CAMPS, BRAND_KIT, Doctor, FreeMedicalCamp } from '../../data/seedData';
import { geminiService } from '../../services/geminiService';
import {
  Palette,
  Download,
  Copy,
  Sparkles,
  Layers,
  Check,
  RefreshCw,
  Sliders,
  Image as ImageIcon,
  Share2,
  Stethoscope,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  HeartHandshake,
  Maximize2,
  ChevronRight,
  Upload,
  AlertCircle,
} from 'lucide-react';

export type TemplateType =
  | 'camp-poster-header'
  | 'carousel-cover'
  | 'carousel-slide'
  | 'doctor-spotlight'
  | 'urgent-care-banner';

interface BrandedTemplateStudioProps {
  onNotify: (msg: string) => void;
  onDeployToPost?: (title: string, format: string, promptText: string) => void;
}

export const BrandedTemplateStudio: React.FC<BrandedTemplateStudioProps> = ({
  onNotify,
  onDeployToPost,
}) => {
  // Active sub-tab: 'templates' or 'ai-generator'
  const [activeTab, setActiveTab] = useState<'templates' | 'ai-generator'>('templates');

  // Template customizer state
  const [templateType, setTemplateType] = useState<TemplateType>('camp-poster-header');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3'>('16:9');
  const [selectedCamp, setSelectedCamp] = useState<FreeMedicalCamp>(OFFICIAL_MEDICAL_CAMPS[0]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(OFFICIAL_DOCTORS[0]);
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [slideNumber, setSlideNumber] = useState(2);
  const [slideTotal, setSlideTotal] = useState(5);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // AI Image Generation state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiAspect, setAiAspect] = useState<'1:1' | '16:9' | '4:3' | '3:4'>('1:1');
  const [aiModel, setAiModel] = useState<'gemini-3.1-flash-image' | 'gemini-3.1-flash-lite-image'>('gemini-3.1-flash-image');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [generatedAiImage, setGeneratedAiImage] = useState<string | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Canvas ref for exporting templates
  const templateCanvasRef = useRef<HTMLDivElement | null>(null);

  // Template selector cards
  const templateOptions = [
    {
      id: 'camp-poster-header' as TemplateType,
      title: 'Medical Camp Poster Header',
      desc: '16:9 / 4:3 Banner Header with official KAWT seal, bilingual title & Zakat verification',
      ratio: '16:9' as const,
      icon: MapPin,
    },
    {
      id: 'carousel-cover' as TemplateType,
      title: 'Instagram Carousel Cover Frame',
      desc: '1:1 Square Cover with logo badge, framing portal for doctor/camp & swipe prompt',
      ratio: '1:1' as const,
      icon: Layers,
    },
    {
      id: 'carousel-slide' as TemplateType,
      title: 'Carousel Content Slide Frame',
      desc: '1:1 Slide layout with slide counter #02, crescent watermark & clinical metric boxes',
      ratio: '1:1' as const,
      icon: ImageIcon,
    },
    {
      id: 'doctor-spotlight' as TemplateType,
      title: 'Doctor Specialist OPD Banner',
      desc: 'Specialist showcase frame with physician portal, OPD schedule & consultation fee',
      ratio: '16:9' as const,
      icon: Stethoscope,
    },
    {
      id: 'urgent-care-banner' as TemplateType,
      title: '24/7 Urgent Care Clinic Alert',
      desc: 'High-contrast emergency medical notice for Nazimabad Center Night OPD',
      ratio: '16:9' as const,
      icon: ShieldCheck,
    },
  ];

  // AI Prompt Presets
  const promptPresets = [
    {
      title: 'Thatta Free Medical Camp Documentary',
      prompt: 'A warm, photorealistic documentary photograph for Khidmat-e-Alam Welfare Trust. A Pakistani male physician in clean white lab coat and stethoscope consulting an elderly patient at a rural free medical camp in Thatta Sindh. Professional healthcare NGO setting, respectful and dignified atmosphere, soft natural morning sunlight, clean medical equipment.',
      aspect: '16:9' as const,
    },
    {
      title: 'Pediatric Care at Nazimabad Medical Center',
      prompt: 'High-quality documentary photo for Khidmat-e-Alam Medical Center Nazimabad. A caring female pediatrician smiling gently while examining a young Pakistani child with an otoscope. Modern clean pediatric consultation room, warm medical lighting, dignified healthcare environment.',
      aspect: '1:1' as const,
    },
    {
      title: 'Free Pharmacy Medicine Dispensing',
      prompt: 'Documentary style photograph for an NGO healthcare trust. Professional pharmacist in clean medical uniform carefully handing verified essential medicines in branded Khidmat-e-Alam paper pharmacy bags to an underprivileged mother. Transparent, organized pharmacy shelves in background.',
      aspect: '1:1' as const,
    },
    {
      title: 'Physician Professional Portrait Banner',
      prompt: 'Professional medical specialist studio portrait for Khidmat-e-Alam Medical Center. Confident, friendly Pakistani doctor in white coat with folded arms, stethoscope draped over shoulders, subtle deep crimson (#C3202F) and emerald green (#0C7A4A) hospital interior backdrop.',
      aspect: '16:9' as const,
    },
  ];

  // Handle template type change
  const handleSelectTemplate = (t: TemplateType) => {
    setTemplateType(t);
    const opt = templateOptions.find((o) => o.id === t);
    if (opt) setAspectRatio(opt.ratio);
  };

  // Handle AI image generation
  const handleGenerateAiImage = async (customPrompt?: string) => {
    const textToRun = customPrompt || aiPrompt;
    if (!textToRun.trim()) {
      onNotify('Please enter a descriptive prompt');
      return;
    }

    setIsGeneratingAi(true);
    setAiFeedback(null);
    onNotify('Gemini 3.1 is synthesizing branded visual...');

    try {
      const res = await geminiService.generateImage({
        prompt: textToRun,
        aspectRatio: aiAspect,
        imageSize: '1K',
        referenceImage: referenceImage || undefined,
        modelPreference: aiModel,
      });

      if (res.imageUrl) {
        setGeneratedAiImage(res.imageUrl);
        setAiFeedback(res.feedback || 'Image successfully generated with official KAWT color palette.');
        onNotify('Branded image generated successfully!');
      } else {
        throw new Error('No image returned from Gemini');
      }
    } catch (err: any) {
      console.warn('AI Image Generation notice:', err);
      onNotify('Using High-Definition KAWT SVG vector template renderer.');
      // If quota or API limit is reached, create a high-DPI rendered canvas image as a reliable fallback
      renderFallbackCanvasImage(textToRun);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Fallback high-DPI canvas generator so users ALWAYS get a usable template image
  const renderFallbackCanvasImage = (promptText: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = aiAspect === '16:9' ? 675 : aiAspect === '4:3' ? 900 : 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient (Deep Medical Red & Trust Navy accents)
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#12305B');
    grad.addColorStop(0.4, '#0A1B33');
    grad.addColorStop(1, '#1A080A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Red and Green decorative arcs
    ctx.strokeStyle = '#C3202F';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(canvas.width * 0.85, canvas.height * 0.3, 300, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#0C7A4A';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(canvas.width * 0.85, canvas.height * 0.3, 340, 0, Math.PI * 2);
    ctx.stroke();

    // Top logo bar
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.fillText('KHIDMAT-E-ALAM WELFARE TRUST', 80, 100);

    ctx.fillStyle = '#C3202F';
    ctx.fillRect(80, 115, 300, 4);

    ctx.fillStyle = '#35C97F';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText('OFFICIAL BRANDED SOCIAL CREATIVE', 80, 155);

    // Prompt content preview
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 44px Arial, sans-serif';
    const lines = [
      promptText.length > 50 ? promptText.slice(0, 50) + '...' : promptText,
      'Nazimabad Medical Center · Karachi',
      'Free Medical Relief Camps 2026',
    ];
    let y = 300;
    lines.forEach((line) => {
      ctx.fillText(line, 80, y);
      y += 60;
    });

    // Badges
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(80, canvas.height - 180, 450, 90);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText('UAN: 1111528 | 100% ZAKAT AUDITED', 105, canvas.height - 125);

    const fallbackUrl = canvas.toDataURL('image/png');
    setGeneratedAiImage(fallbackUrl);
    setAiFeedback('Rendered using KAWT high-fidelity vector template engine.');
  };

  // Handle reference image upload
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setReferenceImage(reader.result);
        onNotify('Reference image loaded for AI editing');
      }
    };
    reader.readAsDataURL(file);
  };

  // Download template image
  const handleDownloadTemplate = () => {
    if (!templateCanvasRef.current) return;
    onNotify('Preparing high-resolution template download...');

    // Create a client canvas capture
    const svgData = templateCanvasRef.current.innerHTML;
    const canvas = document.createElement('canvas');
    const width = aspectRatio === '16:9' ? 1280 : aspectRatio === '4:3' ? 1024 : 1080;
    const height = aspectRatio === '16:9' ? 720 : aspectRatio === '4:3' ? 768 : 1080;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Create download link
    const a = document.createElement('a');
    a.download = `KAWT_${templateType}_${Date.now()}.png`;
    
    // If we have an AI generated image, download that directly
    if (generatedAiImage && activeTab === 'ai-generator') {
      a.href = generatedAiImage;
      a.click();
      onNotify('Downloaded AI generated image!');
      return;
    }

    // Fallback export render
    renderFallbackCanvasImage(customTitle || selectedCamp.name);
    setTimeout(() => {
      if (generatedAiImage) {
        a.href = generatedAiImage;
        a.click();
      }
    }, 200);
  };

  // Copy template details to clipboard
  const handleCopyPrompt = () => {
    const promptToCopy = `Create a professional NGO healthcare social media design for Khidmat-e-Alam Welfare Trust (KAWT).
Template Type: ${templateType}
Brand Colors: Deep Medical Red (#C3202F), Healing Emerald Green (#0C7A4A), Trust Navy (#12305B), Clean White.
Official Logo Placement: Top-left corner circular emblem with clasped hands & red crescent.
Header Text: ${customTitle || selectedCamp.name}
Sub-Header: ${customSubtitle || selectedCamp.location}
Contact: 351, Usmania Society, B Road, Nazimabad, Karachi | UAN: 1111528 | www.khidmat-e-alam.org
Dignity Guidelines: Professional, respectful, zero sensationalism.`;

    navigator.clipboard.writeText(promptToCopy);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
    onNotify('Template specification copied to clipboard!');
  };

  return (
    <div className="view space-y-6">
      {/* Top Header */}
      <div className="head">
        <div>
          <span className="eyebrow">Branding & Identity Automation · Khidmat-e-Alam Welfare Trust</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Branded Social Media Template Studio</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Create pixel-perfect medical camp poster headers, Instagram carousel frames, and doctor OPD spotlights strictly adhering to the KAWT brand kit.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="row flex items-center gap-2 bg-[var(--card2)] p-1 rounded-xl border border-[var(--sep)]">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 rounded-lg text-[12.5px] font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'templates'
                ? 'bg-[var(--card)] text-[var(--ink)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[var(--red)]" />
            <span>Branded Templates</span>
          </button>
          <button
            onClick={() => setActiveTab('ai-generator')}
            className={`px-3 py-1.5 rounded-lg text-[12.5px] font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'ai-generator'
                ? 'bg-[var(--card)] text-[var(--ink)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--green)]" />
            <span>AI Image Creator (Gemini 3.1)</span>
          </button>
        </div>
      </div>

      {/* Brand Color Guidelines Bar */}
      <div className="card p-3 bg-gradient-to-r from-[var(--card)] to-[var(--card2)] border border-[var(--sep)] flex flex-wrap items-center justify-between gap-3 text-[12px]">
        <div className="flex items-center gap-3">
          <KawtLogo variant="emblem" size={32} />
          <div>
            <b className="text-[var(--ink)]">Official KAWT Identity Rules:</b>
            <span className="text-[var(--muted)] ml-1">Logo must appear in the top-left; deep red header bands; emerald green badges; UAN 1111528 footer.</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#C3202F]/10 border border-[#C3202F]/30 text-[#C3202F] font-mono text-[11px] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C3202F]"></span>
            <span>#C3202F Red</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0C7A4A]/10 border border-[#0C7A4A]/30 text-[#0C7A4A] font-mono text-[11px] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0C7A4A]"></span>
            <span>#0C7A4A Green</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#12305B]/10 border border-[#12305B]/30 text-[#12305B] dark:text-blue-300 font-mono text-[11px] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12305B]"></span>
            <span>#12305B Navy</span>
          </div>
        </div>
      </div>

      {/* TAB 1: BRANDED TEMPLATES STUDIO */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Template Selection & Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Template Archetype Selector */}
            <div className="card p-4 space-y-3">
              <h3 className="font-bold text-[14px] text-[var(--ink)] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--red)]" />
                <span>Select Template Format</span>
              </h3>

              <div className="space-y-2">
                {templateOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = templateType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectTemplate(opt.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-[var(--red-soft)] border-[var(--red)] text-[var(--ink)] shadow-sm'
                          : 'bg-[var(--card)] border-[var(--sep)] hover:border-[var(--muted)] text-[var(--ink2)]'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? 'bg-[var(--red)] text-white' : 'bg-[var(--card2)] text-[var(--muted)]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[13px] leading-tight text-[var(--ink)]">
                          {opt.title}
                        </div>
                        <p className="text-[11.5px] text-[var(--muted)] mt-1 line-clamp-2 leading-snug">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer Controls */}
            <div className="card p-4 space-y-3.5 text-[12.5px]">
              <h3 className="font-bold text-[14px] text-[var(--ink)] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[var(--green)]" />
                <span>Customize Template Content</span>
              </h3>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-[11.5px] font-semibold text-[var(--muted)] mb-1">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['16:9', '1:1', '4:3'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setAspectRatio(r)}
                      className={`py-1.5 rounded-lg border text-center font-mono font-bold text-[11.5px] transition-all ${
                        aspectRatio === r
                          ? 'border-[var(--red)] bg-[var(--red-soft)] text-[var(--red)]'
                          : 'border-[var(--sep)] text-[var(--muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Camp Selection if Camp Poster or Carousel */}
              {(templateType === 'camp-poster-header' || templateType === 'carousel-cover' || templateType === 'carousel-slide') && (
                <div>
                  <label className="block text-[11.5px] font-semibold text-[var(--muted)] mb-1">
                    Select Medical Camp
                  </label>
                  <select
                    value={selectedCamp.campCode}
                    onChange={(e) => {
                      const found = OFFICIAL_MEDICAL_CAMPS.find((c: FreeMedicalCamp) => c.campCode === e.target.value);
                      if (found) setSelectedCamp(found);
                    }}
                    className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg p-2 text-[12.5px] focus:outline-none"
                  >
                    {OFFICIAL_MEDICAL_CAMPS.map((camp: FreeMedicalCamp) => (
                      <option key={camp.campCode} value={camp.campCode}>
                        {camp.name} ({camp.location})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Doctor Selection if Doctor Spotlight */}
              {templateType === 'doctor-spotlight' && (
                <div>
                  <label className="block text-[11.5px] font-semibold text-[var(--muted)] mb-1">
                    Select Specialist Doctor
                  </label>
                  <select
                    value={selectedDoctor.id}
                    onChange={(e) => {
                      const found = OFFICIAL_DOCTORS.find((d) => d.id === e.target.value);
                      if (found) setSelectedDoctor(found);
                    }}
                    className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg p-2 text-[12.5px] focus:outline-none"
                  >
                    {OFFICIAL_DOCTORS.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - {doc.specialty} ({doc.opdTimings})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Slide Numbers if Carousel Slide */}
              {templateType === 'carousel-slide' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11.5px] font-semibold text-[var(--muted)] mb-1">
                      Current Slide #
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={slideNumber}
                      onChange={(e) => setSlideNumber(parseInt(e.target.value, 10) || 1)}
                      className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg p-2 text-[12.5px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11.5px] font-semibold text-[var(--muted)] mb-1">
                      Total Slides
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={10}
                      value={slideTotal}
                      onChange={(e) => setSlideTotal(parseInt(e.target.value, 10) || 5)}
                      className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg p-2 text-[12.5px]"
                    />
                  </div>
                </div>
              )}

              {/* Custom Headline Override */}
              <div>
                <label className="block text-[11.5px] font-semibold text-[var(--muted)] mb-1">
                  Custom Headline (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Free Eye Screening & Cataract Camp"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg p-2 text-[12.5px]"
                />
              </div>

              {/* Custom Subtitle / Venue */}
              <div>
                <label className="block text-[11.5px] font-semibold text-[var(--muted)] mb-1">
                  Custom Subtitle / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Makli Thatta Sindh · 9:00 AM to 5:00 PM"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg p-2 text-[12.5px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleDownloadTemplate}
                  className="btn primary w-full flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-Res PNG</span>
                </button>

                <button
                  onClick={handleCopyPrompt}
                  className="btn w-full flex items-center justify-center gap-1.5"
                >
                  {copiedSuccess ? <Check className="w-4 h-4 text-[var(--green)]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSuccess ? 'Copied Specs!' : 'Copy Template Spec'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live High-Fidelity Canvas Template Preview (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="card p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--sep2)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--red)] animate-pulse"></span>
                  <h3 className="font-bold text-[14.5px] text-[var(--ink)]">
                    Live Branded Frame Preview ({aspectRatio})
                  </h3>
                </div>
                <div className="text-[11.5px] font-mono text-[var(--muted)]">
                  Brand Kit: #C3202F · #0C7A4A · #12305B
                </div>
              </div>

              {/* Live Canvas Viewport Container */}
              <div className="flex items-center justify-center bg-[#0e1117] p-4 sm:p-6 rounded-2xl overflow-hidden shadow-inner">
                <div
                  ref={templateCanvasRef}
                  className={`w-full max-w-[620px] transition-all duration-300 relative shadow-2xl rounded-xl overflow-hidden border border-white/20 select-none ${
                    aspectRatio === '16:9'
                      ? 'aspect-video'
                      : aspectRatio === '4:3'
                      ? 'aspect-[4/3]'
                      : 'aspect-square'
                  }`}
                  style={{ backgroundColor: '#FFFFFF', color: '#14161A' }}
                >
                  {/* ============================================================ */}
                  {/* 1. MEDICAL CAMP POSTER HEADER */}
                  {/* ============================================================ */}
                  {templateType === 'camp-poster-header' && (
                    <div className="h-full flex flex-col justify-between relative p-6 sm:p-8 bg-gradient-to-br from-white via-[#FAF9F5] to-[#EEF2F6]">
                      {/* Background Watermark */}
                      <div className="absolute right-[-40px] top-[-40px] opacity-[0.04] pointer-events-none">
                        <KawtLogo variant="emblem" size={360} />
                      </div>

                      {/* Header Topbar: Official Logo in Top-Left (User requirement) */}
                      <div className="flex items-center justify-between relative z-10 border-b-2 border-[#C3202F]/20 pb-3">
                        <KawtLogo variant="horizontal" size={46} showText={true} />
                        <div className="text-right">
                          <span className="inline-block bg-[#0C7A4A] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            100% Free Medicines
                          </span>
                          <p className="text-[10px] text-gray-500 font-mono mt-0.5">Zakat Audited Ledger</p>
                        </div>
                      </div>

                      {/* Main Title & Hero Banner */}
                      <div className="my-auto space-y-2 relative z-10 py-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#C3202F] text-white text-[11px] font-extrabold px-2 py-0.5 rounded">
                            FREE MEDICAL CAMP
                          </span>
                          <span className="urdu text-[13px] font-bold text-[#C3202F]">
                            مفت میڈیکل ریلیف کیمپ
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#14161A] tracking-tight leading-tight">
                          {customTitle || selectedCamp.name}
                        </h2>

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#454A53] font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#C3202F] flex-none" />
                          <span>{customSubtitle || selectedCamp.location}</span>
                        </div>

                        {/* Camp Impact Badges */}
                        <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                          <div className="bg-white/80 border border-gray-200 rounded-lg p-1.5 shadow-xs">
                            <span className="block text-[10px] text-gray-500 uppercase">Patients Treated</span>
                            <b className="text-sm font-bold text-[#C3202F]">{selectedCamp.patientsServed} Free</b>
                          </div>
                          <div className="bg-white/80 border border-gray-200 rounded-lg p-1.5 shadow-xs">
                            <span className="block text-[10px] text-gray-500 uppercase">Medicines Given</span>
                            <b className="text-sm font-bold text-[#0C7A4A]">{selectedCamp.medicinesDistributed} Units</b>
                          </div>
                          <div className="bg-white/80 border border-gray-200 rounded-lg p-1.5 shadow-xs">
                            <span className="block text-[10px] text-gray-500 uppercase">Zakat Funded</span>
                            <b className="text-sm font-bold text-[#12305B]">{selectedCamp.financials.zakatPct}% Shariah</b>
                          </div>
                        </div>
                      </div>

                      {/* Official Footer Banner with Address & UAN */}
                      <div className="relative z-10 pt-2 border-t border-gray-200 flex items-center justify-between text-[10.5px] text-[#454A53]">
                        <div className="truncate">
                          <b>Central Hospital:</b> 351, Usmania Society, B Road, Nazimabad Karachi
                        </div>
                        <div className="font-extrabold text-[#C3202F] font-mono text-[12px] flex-none">
                          UAN: 1111528
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ============================================================ */}
                  {/* 2. INSTAGRAM CAROUSEL COVER FRAME (1:1) */}
                  {/* ============================================================ */}
                  {templateType === 'carousel-cover' && (
                    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-[#FAF9F5] via-white to-[#F0F4F8] relative">
                      {/* Top Brand Bar */}
                      <div className="flex items-center justify-between relative z-10">
                        <KawtLogo variant="horizontal" size={44} showText={true} />
                        <span className="bg-[#12305B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                          SWIPE 1/5 ➔
                        </span>
                      </div>

                      {/* Center Viewport Frame (Simulating photo slot) */}
                      <div className="my-auto relative rounded-xl border-2 border-dashed border-[#C3202F]/40 p-4 bg-white/70 shadow-sm text-center space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-full bg-[#C3202F]/10 text-[#C3202F] flex items-center justify-center">
                          <Stethoscope className="w-6 h-6" />
                        </div>
                        <span className="bg-[#C3202F] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                          FIELD REPORT · SINDH & BALOCHISTAN
                        </span>
                        <h2 className="text-lg sm:text-xl font-black text-[#14161A] leading-tight">
                          {customTitle || `${selectedCamp.name}: ${selectedCamp.patientsServed} Patients Served Free`}
                        </h2>
                        <p className="text-xs text-[#454A53]">
                          {customSubtitle || `Verified Free Camp at ${selectedCamp.location}`}
                        </p>
                      </div>

                      {/* Official Crimson Footer */}
                      <div className="bg-[#C3202F] text-white -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-3 flex items-center justify-between text-[11px] font-semibold">
                        <span>Khidmat-e-Alam Medical Center · Nazimabad</span>
                        <span className="font-mono font-bold">UAN: 1111528</span>
                      </div>
                    </div>
                  )}

                  {/* ============================================================ */}
                  {/* 3. INSTAGRAM CAROUSEL CONTENT SLIDE FRAME */}
                  {/* ============================================================ */}
                  {templateType === 'carousel-slide' && (
                    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-white relative">
                      {/* Watermark */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <KawtLogo variant="emblem" size={400} />
                      </div>

                      {/* Header bar with Slide Counter */}
                      <div className="flex items-center justify-between relative z-10 border-b border-gray-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <KawtLogo variant="emblem" size={32} />
                          <span className="text-[12px] font-bold text-[#14161A]">Khidmat-e-Alam Trust</span>
                        </div>
                        <span className="bg-[#0C7A4A] text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                          Slide {slideNumber} / {slideTotal}
                        </span>
                      </div>

                      {/* Content Body */}
                      <div className="my-auto space-y-3 relative z-10">
                        <span className="text-[#C3202F] font-bold text-[11px] tracking-wider uppercase block">
                          Patient Demographics & Clinical Impact
                        </span>
                        <h3 className="text-xl font-bold text-[#14161A] leading-snug">
                          {customTitle || `Free Medical Treatment at ${selectedCamp.name}`}
                        </h3>

                        <div className="space-y-2 text-xs text-[#454A53]">
                          <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex justify-between">
                            <span>Infants & Children Treated:</span>
                            <b className="text-[#C3202F]">{selectedCamp.demographics.children} Patients</b>
                          </div>
                          <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex justify-between">
                            <span>Female Beneficiaries:</span>
                            <b className="text-[#0C7A4A]">{selectedCamp.demographics.female} Patients</b>
                          </div>
                          <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex justify-between">
                            <span>Specialist Doctors on Site:</span>
                            <b>{selectedCamp.clinicalTeam.doctors} Specialists</b>
                          </div>
                        </div>
                      </div>

                      {/* Slide Footer */}
                      <div className="relative z-10 border-t border-gray-100 pt-2 flex items-center justify-between text-[10.5px] text-gray-500">
                        <span>100% Zakat spent on prescription medicines</span>
                        <span className="font-mono font-bold text-[#C3202F]">UAN: 1111528</span>
                      </div>
                    </div>
                  )}

                  {/* ============================================================ */}
                  {/* 4. DOCTOR SPOTLIGHT FRAME */}
                  {/* ============================================================ */}
                  {templateType === 'doctor-spotlight' && (
                    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-white to-[#F6F8FB] relative">
                      {/* Top Bar with KAWT Logo */}
                      <div className="flex items-center justify-between relative z-10 border-b border-gray-200 pb-2">
                        <KawtLogo variant="horizontal" size={42} showText={true} />
                        <span className="bg-[#0C7A4A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          Specialist OPD
                        </span>
                      </div>

                      {/* Doctor Profile Layout */}
                      <div className="my-auto grid grid-cols-3 gap-4 items-center relative z-10">
                        {/* Doctor Avatar Framing Portal */}
                        <div className="col-span-1 flex flex-col items-center">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#C3202F] p-1 bg-white shadow-md flex items-center justify-center text-[#12305B]">
                            <Stethoscope className="w-12 h-12 text-[#C3202F]" />
                          </div>
                          <span className="text-[10px] font-bold text-[#0C7A4A] mt-2 font-mono text-center">
                            {selectedDoctor.location}
                          </span>
                        </div>

                        {/* Doctor Details */}
                        <div className="col-span-2 space-y-1.5">
                          <span className="text-[11px] font-bold text-[#C3202F] tracking-wide uppercase block">
                            {selectedDoctor.specialty}
                          </span>
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#14161A] leading-tight">
                            {selectedDoctor.name}
                          </h3>
                          <div className="text-[11px] text-[#454A53] space-y-1">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              <span>{selectedDoctor.opdDays}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              <span>{selectedDoctor.opdTimings}</span>
                            </div>
                            <div className="pt-1 font-bold text-[#0C7A4A]">
                              Consultation Fee: {selectedDoctor.consultationFee}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="relative z-10 border-t border-gray-200 pt-2 flex items-center justify-between text-[10.5px] text-[#454A53]">
                        <span>351, Usmania Society, B Road, Nazimabad Karachi</span>
                        <b className="text-[#C3202F] font-mono text-[12px]">Token: UAN 1111528</b>
                      </div>
                    </div>
                  )}

                  {/* ============================================================ */}
                  {/* 5. URGENT CARE NIGHT CLINIC BANNER */}
                  {/* ============================================================ */}
                  {templateType === 'urgent-care-banner' && (
                    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-[#0F141C] text-white relative">
                      <div className="flex items-center justify-between relative z-10 border-b border-white/10 pb-2">
                        <KawtLogo variant="white" size={42} showText={true} />
                        <span className="bg-[#C3202F] text-white text-[10.5px] font-extrabold px-2.5 py-0.5 rounded animate-pulse">
                          24/7 OPEN
                        </span>
                      </div>

                      <div className="my-auto space-y-2 relative z-10">
                        <span className="text-[#35C97F] font-bold text-[11px] tracking-wider uppercase block">
                          NIGHT CLINIC & EMERGENCY CARE
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          Khidmat-e-Alam 24-Hour Urgent Care
                        </h2>
                        <p className="text-xs text-gray-300">
                          Emergency medical officers on duty throughout the night: Dr. Ashok Kumar & Dr. Arshad
                        </p>
                        <div className="pt-1 flex items-center gap-3 text-xs font-mono">
                          <span className="px-2 py-1 rounded bg-white/10 text-white font-bold">
                            Token: Rs. 500 Subsidized
                          </span>
                          <span className="text-[#35C97F]">Life-Saving Pharmacy Active</span>
                        </div>
                      </div>

                      <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between text-[11px] text-gray-400">
                        <span>351, Usmania Society, B Road, Nazimabad Karachi</span>
                        <b className="text-[#FF6066] font-mono text-[12.5px]">Helpline: 1111528</b>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Controls Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[12px] text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--green)]" />
                  <span>Strictly enforces official KAWT Red (#C3202F) and Green (#0C7A4A)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onDeployToPost) {
                        onDeployToPost(
                          customTitle || selectedCamp.name,
                          templateType === 'carousel-cover' ? 'Carousel' : 'Single Image',
                          `Visual template created for ${templateType}`
                        );
                        onNotify('Template added to Daily Post queue!');
                      }
                    }}
                    className="btn sm green text-white flex items-center gap-1 text-[11.5px]"
                  >
                    <span>Deploy to Post</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI IMAGE CREATOR & EDITOR (Gemini 3.1) */}
      {activeTab === 'ai-generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Prompt Input, Controls & Reference Image (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="card p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[14px] text-[var(--ink)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--red)]" />
                  <span>AI Image Generator & Editor</span>
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--red-soft)] text-[var(--red)]">
                  gemini-3.1-flash-image
                </span>
              </div>

              {/* Text Prompt Area */}
              <div>
                <label className="block text-[11.5px] font-semibold text-[var(--muted)] mb-1">
                  Design Prompt (Describe the NGO scene or medical context)
                </label>
                <textarea
                  rows={4}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Free medical camp in Thatta Sindh with doctor examining patient in dignified NGO setting, official KAWT deep red and emerald green accents, high resolution photography..."
                  className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-xl p-3 text-[12.5px] focus:outline-none focus:border-[var(--red)]"
                />
              </div>

              {/* Aspect Ratio & Model Selector */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={aiAspect}
                    onChange={(e) => setAiAspect(e.target.value as any)}
                    className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg p-2 text-[12px]"
                  >
                    <option value="1:1">1:1 (Square Post / Carousel)</option>
                    <option value="16:9">16:9 (Landscape Banner / Video)</option>
                    <option value="4:3">4:3 (Poster Header)</option>
                    <option value="3:4">3:4 (Portrait Feed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] mb-1">
                    Image Model
                  </label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value as any)}
                    className="w-full bg-[var(--card2)] border border-[var(--sep)] rounded-lg p-2 text-[12px]"
                  >
                    <option value="gemini-3.1-flash-image">gemini-3.1-flash-image (High Quality)</option>
                    <option value="gemini-3.1-flash-lite-image">gemini-3.1-flash-lite-image (Fast)</option>
                  </select>
                </div>
              </div>

              {/* Optional Reference Image for Editing */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-[var(--muted)]">
                    Reference Image (Optional Image-to-Image Edit)
                  </label>
                  {referenceImage && (
                    <button
                      onClick={() => setReferenceImage(null)}
                      className="text-[11px] text-[var(--red)] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn sm w-full flex items-center justify-center gap-1.5 text-[12px]"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{referenceImage ? 'Change Reference Image' : 'Upload Image / Logo to Edit'}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    className="hidden"
                  />
                </div>

                {referenceImage && (
                  <div className="mt-2 relative w-16 h-16 rounded-lg overflow-hidden border border-[var(--sep)]">
                    <img
                      src={referenceImage}
                      alt="Reference"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                disabled={isGeneratingAi}
                onClick={() => handleGenerateAiImage()}
                className="btn primary w-full py-2.5 flex items-center justify-center gap-2 font-bold"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing with Gemini 3.1...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Branded Image</span>
                  </>
                )}
              </button>
            </div>

            {/* Curated NGO Prompt Presets */}
            <div className="card p-4 space-y-2.5">
              <h4 className="font-bold text-[13px] text-[var(--ink)] flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-[var(--green)]" />
                <span>KAWT Brand Prompt Presets</span>
              </h4>

              <div className="space-y-1.5">
                {promptPresets.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setAiPrompt(preset.prompt);
                      setAiAspect(preset.aspect);
                    }}
                    className="p-2 rounded-lg border border-[var(--sep)] bg-[var(--card)] hover:border-[var(--red)] cursor-pointer transition-all text-left"
                  >
                    <div className="font-semibold text-[12px] text-[var(--ink)] flex items-center justify-between">
                      <span>{preset.title}</span>
                      <span className="text-[10px] font-mono text-[var(--muted)]">{preset.aspect}</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted)] line-clamp-1 mt-0.5">
                      {preset.prompt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Image Generation Result & Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="card p-5 space-y-4 min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--sep2)]">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[var(--red)]" />
                    <h3 className="font-bold text-[14.5px] text-[var(--ink)]">
                      AI Generated Output Preview
                    </h3>
                  </div>

                  {generatedAiImage && (
                    <button
                      onClick={handleDownloadTemplate}
                      className="btn sm flex items-center gap-1.5 text-[11.5px]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PNG</span>
                    </button>
                  )}
                </div>

                {/* Display Canvas or Placeholder */}
                <div className="mt-4 flex items-center justify-center bg-[#0b0d11] rounded-2xl min-h-[360px] p-4 relative overflow-hidden">
                  {isGeneratingAi ? (
                    <div className="text-center space-y-3 py-16">
                      <RefreshCw className="w-8 h-8 text-[var(--red)] animate-spin mx-auto" />
                      <p className="font-semibold text-[13.5px] text-white">
                        Gemini is synthesizing high-resolution branded creative...
                      </p>
                      <p className="text-[12px] text-gray-400 max-w-sm">
                        Applying official Khidmat-e-Alam color palette, respectful humanitarian dignity, and clean composition.
                      </p>
                    </div>
                  ) : generatedAiImage ? (
                    <div className="relative max-w-full max-h-[480px] rounded-xl overflow-hidden shadow-2xl">
                      <img
                        src={generatedAiImage}
                        alt="AI Generated Social Media Creative"
                        className="max-w-full max-h-[480px] object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="text-center space-y-3 py-16 text-gray-400">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-400">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <b className="text-white text-[14px] block">No Generated Image Yet</b>
                      <p className="text-[12px] max-w-sm text-gray-400">
                        Pick one of the KAWT presets on the left or type your custom prompt to generate or edit a branded template image.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback & Deployment */}
              {aiFeedback && (
                <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep)] text-[12px] text-[var(--ink2)] flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--green)] flex-none mt-0.5" />
                  <div>
                    <b className="text-[var(--ink)]">AI Synthesis Note:</b>
                    <span className="ml-1">{aiFeedback}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
