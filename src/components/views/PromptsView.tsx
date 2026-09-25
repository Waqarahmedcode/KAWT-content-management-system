import React, { useState } from 'react';
import { Post, Campaign } from '../../data/seedData';
import {
  geminiService,
  GenerateResult,
  AnalyzeResult,
  EditResult,
} from '../../services/geminiService';
import {
  Sparkles,
  Wand2,
  FileCheck,
  Languages,
  Image as ImageIcon,
  Copy,
  Check,
  Loader2,
  Send,
  PlusCircle,
  TrendingUp,
  Cpu,
} from 'lucide-react';

interface PromptsViewProps {
  campaigns: Campaign[];
  onAddPostFromAi: (post: Omit<Post, 'id'>) => void;
  onNotify: (msg: string) => void;
}

export const PromptsView: React.FC<PromptsViewProps> = ({
  campaigns,
  onAddPostFromAi,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'audit' | 'edit' | 'art'>('generate');
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview'>('gemini-3.8-flash');

  // Generator states
  const [genPlatform, setGenPlatform] = useState<'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube'>('facebook');
  const [genTone, setGenTone] = useState('Inspiring & Dignified');
  const [genCampaign, setGenCampaign] = useState(campaigns[0]?.title || 'General Welfare & Healthcare');
  const [genPrompt, setGenPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genResult, setGenResult] = useState<GenerateResult | null>(null);

  // Auditor states
  const [auditText, setAuditText] = useState('');
  const [auditPlatform, setAuditPlatform] = useState('facebook');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AnalyzeResult | null>(null);

  // Quick Edit states
  const [editText, setEditText] = useState('');
  const [editInstruction, setEditInstruction] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editResult, setEditResult] = useState<EditResult | null>(null);

  // Copied indicator
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onNotify(`Copied ${key} to clipboard`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Run Generator
  const handleGenerate = async (presetPrompt?: string) => {
    const promptToUse = presetPrompt || genPrompt;
    if (!promptToUse.trim()) return;
    setIsGenerating(true);
    setGenResult(null);
    try {
      const res = await geminiService.generateContent({
        prompt: promptToUse,
        platform: genPlatform,
        campaign: genCampaign,
        tone: genTone,
        modelPreference: selectedModel,
      });
      setGenResult(res.data);
      onNotify(`Generated bilingual content with ${res.modelUsed}!`);
    } catch (err: any) {
      onNotify(err.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  // Run Audit
  const handleAudit = async () => {
    if (!auditText.trim()) return;
    setIsAuditing(true);
    setAuditResult(null);
    try {
      const res = await geminiService.analyzeContent(
        auditText,
        auditPlatform,
        genCampaign,
        selectedModel
      );
      setAuditResult(res.data);
      onNotify('Content audit completed!');
    } catch (err: any) {
      onNotify(err.message || 'Audit failed');
    } finally {
      setIsAuditing(false);
    }
  };

  // Run Edit
  const handleEdit = async (instructionToUse?: string) => {
    const inst = instructionToUse || editInstruction;
    if (!editText.trim() || !inst.trim()) return;
    setIsEditing(true);
    setEditResult(null);
    try {
      const res = await geminiService.editContent(editText, inst, 'gemini-3.1-flash-lite');
      setEditResult(res.data);
      onNotify('Gemini fast edit applied!');
    } catch (err: any) {
      onNotify(err.message || 'Edit failed');
    } finally {
      setIsEditing(false);
    }
  };

  // Save generated content to calendar
  const handleSaveToCalendar = () => {
    if (!genResult) return;
    onAddPostFromAi({
      title: genResult.title,
      date: new Date().toISOString().split('T')[0],
      time: '05:00 PM',
      platform: genPlatform,
      status: 'Scheduled',
      format: genPlatform === 'instagram' ? 'Carousel' : 'Single Image',
      campaignId: campaigns[0]?.id || 'camp-1',
      campaignName: genCampaign,
      urduText: genResult.urduText,
      englishText: genResult.englishText,
      hook: genResult.hook || genResult.title,
      callToAction: genResult.callToAction,
      hashtags: genResult.hashtags || ['#KAWT', '#ZakatEligible'],
      assignedTo: 'Bilal Khan',
      visualPrompt: genResult.visualPrompt,
      targetAudience: 'Philanthropic community, local & overseas donors',
    });
    onNotify('Post saved directly to Schedule!');
  };

  return (
    <div className="view space-y-6">
      {/* Head */}
      <div className="head">
        <div>
          <span className="eyebrow">Artificial Intelligence Laboratory</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gemini AI Studio</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Powered by Google Gemini to produce authentic Urdu/English copy, preserve beneficiary dignity, and enforce Zakat compliance.
          </p>
        </div>

        {/* Model Selector Pill */}
        <div className="flex items-center gap-2 bg-[var(--card)] border border-[var(--sep)] rounded-xl px-3 py-1.5 shadow-sm text-[12px]">
          <Cpu className="w-4 h-4 text-[var(--red)]" />
          <span className="font-semibold text-[var(--muted)]">Model:</span>
          <select
            value={selectedModel}
            onChange={(e: any) => setSelectedModel(e.target.value)}
            className="bg-transparent font-medium text-[var(--ink)] border-0 focus:outline-none cursor-pointer"
          >
            <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended / Balanced)</option>
            <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra Fast / Quick Edits)</option>
            <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Deep Complex Reasoning)</option>
          </select>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="seg">
        <button
          onClick={() => setActiveTab('generate')}
          aria-pressed={activeTab === 'generate'}
          className="flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-[var(--red)]" />
          <span>Bilingual Copywriter</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          aria-pressed={activeTab === 'audit'}
          className="flex items-center gap-1.5"
        >
          <FileCheck className="w-4 h-4 text-[var(--green)]" />
          <span>Dignity & Zakat Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          aria-pressed={activeTab === 'edit'}
          className="flex items-center gap-1.5"
        >
          <Wand2 className="w-4 h-4 text-[var(--blue)]" />
          <span>Smart Quick Editor</span>
        </button>
      </div>

      {/* TAB 1: BILINGUAL COPYWRITER */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Config Panel (5 cols) */}
          <div className="lg:col-span-5 card p-5 space-y-4">
            <h3 className="font-bold text-[15px] text-[var(--ink)]">Content Parameters</h3>

            <div className="space-y-3 text-[12.5px]">
              <div className="field">
                <label>Platform Target</label>
                <select
                  value={genPlatform}
                  onChange={(e: any) => setGenPlatform(e.target.value)}
                >
                  <option value="facebook">Facebook (Story & Long-form Appeal)</option>
                  <option value="instagram">Instagram (Carousel & Reels Caption)</option>
                  <option value="linkedin">LinkedIn (CSR & Organizational Transparency)</option>
                  <option value="tiktok">TikTok / Shorts (Fast-paced Video Script)</option>
                  <option value="youtube">YouTube (Community Post / Description)</option>
                </select>
              </div>

              <div className="field">
                <label>Associated Campaign</label>
                <select
                  value={genCampaign}
                  onChange={(e) => setGenCampaign(e.target.value)}
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                  <option value="General Hospital OPD & Blood Support">General Hospital OPD & Blood Support</option>
                </select>
              </div>

              <div className="field">
                <label>Tone of Voice</label>
                <select
                  value={genTone}
                  onChange={(e) => setGenTone(e.target.value)}
                >
                  <option value="Inspiring & Dignified">Inspiring & Dignified (No pity, celebrate life)</option>
                  <option value="Urgent Medical Appeal">Urgent Medical Appeal (Critical patient case)</option>
                  <option value="Gratitude & Donor Transparency">Gratitude & Transparency (Showing results)</option>
                  <option value="Islamic Wisdom & Jumma Reflection">Islamic Wisdom & Jumma Sadqah Reflection</option>
                  <option value="Doctor Health Tip">Doctor Health Tip (Educational & Preventive)</option>
                </select>
              </div>

              <div className="field">
                <label>Brief / Topic Request</label>
                <textarea
                  rows={4}
                  value={genPrompt}
                  onChange={(e) => setGenPrompt(e.target.value)}
                  placeholder="e.g. Write a moving post about an 8-year-old child whose vision was saved through free corneal treatment. Highlight donor kindness and invite community to sponsor tests."
                />
              </div>

              {/* Template chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-[var(--muted)]">Suggested Prompts:</span>
                <div className="flex flex-col gap-1.5 text-[11.5px]">
                  <button
                    onClick={() => {
                      setGenPrompt('Announce the upcoming Free Cataract Phaco Surgery Camp this Saturday. Emphasize that all tests, imported lenses, and medicines are 100% free.');
                      handleGenerate('Announce the upcoming Free Cataract Phaco Surgery Camp this Saturday. Emphasize that all tests, imported lenses, and medicines are 100% free.');
                    }}
                    className="text-left p-1.5 rounded-lg bg-[var(--card2)] hover:bg-[var(--sep2)] truncate text-[var(--ink2)]"
                  >
                    • Free Cataract Phaco Camp Announcement
                  </button>
                  <button
                    onClick={() => {
                      setGenPrompt('A heartfelt appeal for Dialysis Waqf Fund: Explain that 65 kidney patients need 2 dialysis sessions every week to survive. 1 session is PKR 5,500.');
                      handleGenerate('A heartfelt appeal for Dialysis Waqf Fund: Explain that 65 kidney patients need 2 dialysis sessions every week to survive. 1 session is PKR 5,500.');
                    }}
                    className="text-left p-1.5 rounded-lg bg-[var(--card2)] hover:bg-[var(--sep2)] truncate text-[var(--ink2)]"
                  >
                    • Dialysis Machine Waqf Appeal
                  </button>
                  <button
                    onClick={() => {
                      setGenPrompt('Friday Jumma reminder on the virtues of feeding fasting and hungry families through KAWT Monthly Ration Packs.');
                      handleGenerate('Friday Jumma reminder on the virtues of feeding fasting and hungry families through KAWT Monthly Ration Packs.');
                    }}
                    className="text-left p-1.5 rounded-lg bg-[var(--card2)] hover:bg-[var(--sep2)] truncate text-[var(--ink2)]"
                  >
                    • Friday Sadqah & Ration Distribution
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleGenerate()}
                disabled={isGenerating || !genPrompt.trim()}
                className="w-full btn primary py-2.5 flex items-center justify-center gap-2 text-[13px] mt-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini is Crafting Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Bilingual Package</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Result Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {genResult ? (
              <div className="card p-5 space-y-5 animate-fade-in">
                <div className="flex items-center justify-between border-b border-[var(--sep2)] pb-3">
                  <div>
                    <span className="eyebrow">Generated Asset</span>
                    <h3 className="font-bold text-[16px] text-[var(--ink)]">{genResult.title}</h3>
                  </div>
                  <button
                    onClick={handleSaveToCalendar}
                    className="btn sm green text-white flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add to Content Schedule</span>
                  </button>
                </div>

                {/* Urdu Version */}
                <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-2">
                  <div className="flex items-center justify-between text-[11.5px] font-semibold text-[var(--muted)]">
                    <span>اردو متن (Urdu Copy - Arabic/Nastaliq)</span>
                    <button
                      onClick={() => handleCopy(genResult.urduText, 'Urdu Text')}
                      className="hover:text-[var(--ink)] flex items-center gap-1"
                    >
                      {copiedKey === 'Urdu Text' ? <Check className="w-3.5 h-3.5 text-[var(--green)]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="urdu text-[15px] leading-loose text-[var(--ink)] whitespace-pre-wrap select-text">
                    {genResult.urduText}
                  </p>
                </div>

                {/* English Version */}
                <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-2">
                  <div className="flex items-center justify-between text-[11.5px] font-semibold text-[var(--muted)]">
                    <span>English Social Media Copy</span>
                    <button
                      onClick={() => handleCopy(genResult.englishText, 'English Text')}
                      className="hover:text-[var(--ink)] flex items-center gap-1"
                    >
                      {copiedKey === 'English Text' ? <Check className="w-3.5 h-3.5 text-[var(--green)]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="text-[13px] leading-relaxed text-[var(--ink)] whitespace-pre-wrap select-text">
                    {genResult.englishText}
                  </p>
                </div>

                {/* CTA & Hashtags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
                  <div className="p-3 rounded-lg bg-[var(--card)] border border-[var(--sep)]">
                    <span className="font-semibold text-[var(--muted)] text-[11px] uppercase block mb-1">
                      Call to Action (CTA)
                    </span>
                    <span className="text-[var(--ink)] font-medium">{genResult.callToAction}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[var(--card)] border border-[var(--sep)]">
                    <span className="font-semibold text-[var(--muted)] text-[11px] uppercase block mb-1">
                      Hashtags
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {genResult.hashtags?.map((h, i) => (
                        <span key={i} className="text-[11px] text-[var(--blue)] font-mono">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Art Direction */}
                <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] text-[12px] space-y-1">
                  <span className="font-semibold text-[var(--muted)] text-[11px] uppercase block">
                    Visual Direction / Imagen Prompt for Graphic Team:
                  </span>
                  <p className="italic text-[var(--ink2)]">"{genResult.visualPrompt}"</p>
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center text-[var(--muted)] space-y-3">
                <Sparkles className="w-8 h-8 mx-auto text-[var(--muted)] opacity-50" />
                <div className="text-[14px]">
                  Enter a topic or select a prompt on the left, then click <b>Generate Bilingual Package</b>.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DIGNITY & ZAKAT COMPLIANCE AUDIT */}
      {activeTab === 'audit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 card p-5 space-y-4">
            <h3 className="font-bold text-[15px] text-[var(--ink)]">Paste Content to Audit</h3>
            <p className="text-[12px] text-[var(--muted)]">
              Audits beneficiary dignity, Zakat eligibility clarity, emotional authenticity, and engagement potential.
            </p>

            <div className="space-y-3 text-[12.5px]">
              <div className="field">
                <label>Platform Target</label>
                <select
                  value={auditPlatform}
                  onChange={(e) => setAuditPlatform(e.target.value)}
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="general">General Social Appeal</option>
                </select>
              </div>

              <div className="field">
                <label>Draft Content (Urdu or English)</label>
                <textarea
                  rows={8}
                  value={auditText}
                  onChange={(e) => setAuditText(e.target.value)}
                  placeholder="Paste your draft post here to run the comprehensive compliance and dignity check..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setAuditText(
                      'غریب اور لاچار مریض ہسپتال کے باہر رو رہے ہیں۔ ان کی مدد کریں ورنہ وہ مر جائیں گے۔ برائے مہربانی فوری پیسے بھیجیں۔'
                    )
                  }
                  className="btn sm text-[11px]"
                >
                  Load Sample (Needs Dignity Fix)
                </button>
              </div>

              <button
                onClick={handleAudit}
                disabled={isAuditing || !auditText.trim()}
                className="w-full btn primary py-2.5 flex items-center justify-center gap-2 text-[13px]"
              >
                {isAuditing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Auditing Tone & Zakat Compliance...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Run Dignity & Compliance Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {auditResult ? (
              <div className="card p-5 space-y-5 animate-fade-in">
                {/* Overall Score */}
                <div className="flex items-center justify-between border-b border-[var(--sep2)] pb-4">
                  <div>
                    <span className="eyebrow">Audit Verdict</span>
                    <h3 className="font-bold text-[18px] text-[var(--ink)]">
                      Compliance & Tone Assessment
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-[var(--red)] font-mono">
                      {auditResult.overallScore}/100
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--muted)]">
                      {auditResult.overallScore >= 80
                        ? 'Excellent Quality'
                        : auditResult.overallScore >= 60
                        ? 'Acceptable (Needs Revisions)'
                        : 'Critical Changes Required'}
                    </span>
                  </div>
                </div>

                <p className="text-[13px] text-[var(--ink)] leading-relaxed italic bg-[var(--card2)] p-3 rounded-lg border border-[var(--sep2)]">
                  "{auditResult.summary}"
                </p>

                {/* Score Breakdown Bars */}
                {auditResult.scores && (
                  <div className="space-y-2 text-[12px]">
                    <span className="font-semibold text-[var(--muted)] text-[11px] uppercase tracking-wider block">
                      5-Dimension Breakdown:
                    </span>
                    <div className="space-y-2">
                      {Object.entries(auditResult.scores).map(([k, val]) => (
                        <div key={k} className="space-y-1">
                          <div className="flex justify-between font-medium text-[var(--ink2)] capitalize">
                            <span>{k.replace(/([A-Z])/g, ' $1')}</span>
                            <span>{val}/100</span>
                          </div>
                          <div className="bar">
                            <i
                              style={{
                                width: `${val}%`,
                                backgroundColor:
                                  val >= 80 ? 'var(--green)' : val >= 60 ? 'var(--blue)' : 'var(--red)',
                              }}
                            ></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
                  <div className="p-3 rounded-xl bg-[var(--green-soft)] border border-[var(--green)]/20 space-y-1.5">
                    <span className="font-bold text-[var(--green)] block text-[11.5px]">
                      Key Strengths:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-[var(--ink)] text-[12px]">
                      {auditResult.strengths?.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--red-soft)] border border-[var(--red)]/20 space-y-1.5">
                    <span className="font-bold text-[var(--red)] block text-[11.5px]">
                      Recommended Revisions:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-[var(--ink)] text-[12px]">
                      {auditResult.improvements?.map((im, idx) => (
                        <li key={idx}>{im}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enhanced Rewrite */}
                {auditResult.enhancedVersion && (
                  <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--sep)] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[13px] text-[var(--ink)] flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[var(--red)]" />
                        <span>Gemini Dignity-Honoring Rewrite</span>
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(
                            `${auditResult.enhancedVersion?.urdu}\n\n---\n\n${auditResult.enhancedVersion?.english}`,
                            'Polished Rewrite'
                          )
                        }
                        className="btn sm text-[11.5px]"
                      >
                        {copiedKey === 'Polished Rewrite' ? <Check className="w-3.5 h-3.5 text-[var(--green)]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Rewrite</span>
                      </button>
                    </div>

                    {auditResult.enhancedVersion.urdu && (
                      <div className="urdu text-[14.5px] leading-loose text-[var(--ink)] p-3 bg-[var(--card2)] rounded-lg">
                        {auditResult.enhancedVersion.urdu}
                      </div>
                    )}

                    {auditResult.enhancedVersion.english && (
                      <div className="text-[12.5px] leading-relaxed text-[var(--ink2)] p-3 bg-[var(--card2)] rounded-lg">
                        {auditResult.enhancedVersion.english}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-12 text-center text-[var(--muted)] space-y-3">
                <FileCheck className="w-8 h-8 mx-auto text-[var(--muted)] opacity-50" />
                <div className="text-[14px]">
                  Paste any social post on the left to audit its Islamic charity compliance, tone, and beneficiary dignity.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SMART QUICK EDITOR */}
      {activeTab === 'edit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 card p-5 space-y-4">
            <h3 className="font-bold text-[15px] text-[var(--ink)]">Original Content</h3>

            <div className="space-y-3 text-[12.5px]">
              <div className="field">
                <label>Draft Text</label>
                <textarea
                  rows={6}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Paste text you want to quickly edit, polish, or rewrite..."
                />
              </div>

              <div className="field">
                <label>Edit Instruction</label>
                <input
                  type="text"
                  value={editInstruction}
                  onChange={(e) => setEditInstruction(e.target.value)}
                  placeholder="e.g. Translate to Urdu with poetic dignity"
                />
              </div>

              {/* Fast presets */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-[var(--muted)]">1-Click Fast Presets (Gemini Flash-Lite):</span>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    onClick={() => {
                      setEditInstruction('Make this post more urgent for an emergency medical case while maintaining respect.');
                      handleEdit('Make this post more urgent for an emergency medical case while maintaining respect.');
                    }}
                    className="text-left p-2 rounded-lg bg-[var(--card2)] hover:bg-[var(--sep2)] text-[12px] flex items-center justify-between"
                  >
                    <span>⚡ Make Urgently Compelling</span>
                    <Wand2 className="w-3.5 h-3.5 text-[var(--red)]" />
                  </button>

                  <button
                    onClick={() => {
                      setEditInstruction('Translate and localize into elegant Urdu in Arabic script for Facebook.');
                      handleEdit('Translate and localize into elegant Urdu in Arabic script for Facebook.');
                    }}
                    className="text-left p-2 rounded-lg bg-[var(--card2)] hover:bg-[var(--sep2)] text-[12px] flex items-center justify-between"
                  >
                    <span>⚡ Translate into Eloquent Urdu</span>
                    <Languages className="w-3.5 h-3.5 text-[var(--green)]" />
                  </button>

                  <button
                    onClick={() => {
                      setEditInstruction('Shorten for Instagram caption: use 3 punchy bullet points and 5 relevant hashtags.');
                      handleEdit('Shorten for Instagram caption: use 3 punchy bullet points and 5 relevant hashtags.');
                    }}
                    className="text-left p-2 rounded-lg bg-[var(--card2)] hover:bg-[var(--sep2)] text-[12px] flex items-center justify-between"
                  >
                    <span>⚡ Condense for Instagram Carousel</span>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--blue)]" />
                  </button>

                  <button
                    onClick={() => {
                      setEditInstruction('Append official verified KAWT bank accounts (Meezan, HBL, Raast ID) and Zakat statement.');
                      handleEdit('Append official verified KAWT bank accounts (Meezan, HBL, Raast ID) and Zakat statement.');
                    }}
                    className="text-left p-2 rounded-lg bg-[var(--card2)] hover:bg-[var(--sep2)] text-[12px] flex items-center justify-between"
                  >
                    <span>⚡ Append Official Bank Donation Footer</span>
                    <Check className="w-3.5 h-3.5 text-[var(--amber)]" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleEdit()}
                disabled={isEditing || !editText.trim() || !editInstruction.trim()}
                className="w-full btn primary py-2.5 flex items-center justify-center gap-2 text-[13px]"
              >
                {isEditing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Applying Quick Edit...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Apply Custom Edit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {editResult ? (
              <div className="card p-5 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-[var(--sep2)] pb-3">
                  <div>
                    <span className="eyebrow">Modified Output</span>
                    <h3 className="font-bold text-[16px] text-[var(--ink)]">
                      {editResult.changesMade || 'Updated Content'}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCopy(editResult.editedText, 'Edited Copy')}
                    className="btn sm"
                  >
                    {copiedKey === 'Edited Copy' ? <Check className="w-3.5 h-3.5 text-[var(--green)]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Text</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] text-[13px] leading-relaxed whitespace-pre-wrap select-text">
                  {editResult.editedText}
                </div>

                {editResult.urduText && (
                  <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--sep)] space-y-2">
                    <span className="text-[11.5px] font-semibold text-[var(--muted)]">Urdu Version:</span>
                    <p className="urdu text-[15px] leading-loose text-[var(--ink)] whitespace-pre-wrap select-text">
                      {editResult.urduText}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-12 text-center text-[var(--muted)] space-y-3">
                <Wand2 className="w-8 h-8 mx-auto text-[var(--muted)] opacity-50" />
                <div className="text-[14px]">
                  Use fast presets to instantly translate, condense, or add official bank details.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
