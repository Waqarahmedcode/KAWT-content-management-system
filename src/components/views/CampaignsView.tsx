import React, { useState } from 'react';
import { Campaign, Post } from '../../data/seedData';
import { geminiService, CampaignPlanResult } from '../../services/geminiService';
import {
  HeartHandshake,
  Sparkles,
  Plus,
  Calendar,
  Users,
  CheckCircle2,
  Share2,
  DollarSign,
  TrendingUp,
  FileText,
  Loader2,
  X,
  ArrowRight,
} from 'lucide-react';

interface CampaignsViewProps {
  campaigns: Campaign[];
  posts: Post[];
  onOpenNewPost: () => void;
  onNotify: (msg: string) => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  posts,
  onOpenNewPost,
  onNotify,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(campaigns[0] || null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const [aiPlanResult, setAiPlanResult] = useState<CampaignPlanResult | null>(null);

  // Form states for AI Campaign Planner
  const [campNameInput, setCampNameInput] = useState('');
  const [campGoalInput, setCampGoalInput] = useState('PKR 3,500,000 for 500 patient treatments');
  const [campDaysInput, setCampDaysInput] = useState(7);
  const [campFocusInput, setCampFocusInput] = useState('Free Healthcare & Medicine');
  const [campDirectiveInput, setCampDirectiveInput] = useState('Highlight real impact stories, medical transparency, and Zakat eligibility');

  const handleLaunchAiStrategist = (camp?: Campaign) => {
    if (camp) {
      setCampNameInput(camp.title);
      setCampGoalInput(`PKR ${(camp.targetAmount / 1000000).toFixed(1)} Million`);
      setCampFocusInput(camp.category);
    } else {
      setCampNameInput('Emergency Flood Relief Medical Mission 2026');
      setCampGoalInput('PKR 5,000,000');
    }
    setAiPlanResult(null);
    setShowAiModal(true);
  };

  const handleGeneratePlan = async () => {
    if (!campNameInput.trim()) return;
    setIsPlanning(true);
    try {
      const res = await geminiService.generateCampaignPlan({
        campaignName: campNameInput,
        targetGoal: campGoalInput,
        durationDays: campDaysInput,
        focusArea: campFocusInput,
        keyMessage: campDirectiveInput,
      });
      setAiPlanResult(res.data);
      onNotify('Gemini formulated 7-day campaign strategy!');
    } catch (err: any) {
      onNotify(err.message || 'Failed to generate campaign plan');
    } finally {
      setIsPlanning(false);
    }
  };

  return (
    <div className="view space-y-6">
      {/* Head */}
      <div className="head">
        <div>
          <span className="eyebrow">Welfare & Humanitarian Appeals</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Active Welfare Campaigns</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Transparently track funding progress, donor storytelling, and Zakat-eligible humanitarian healthcare programs.
          </p>
        </div>
        <div className="row">
          <button onClick={() => handleLaunchAiStrategist()} className="btn primary">
            <Sparkles className="w-4 h-4" />
            <span>AI Campaign Strategist</span>
          </button>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((camp) => {
          const pct = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));
          const linkedPosts = posts.filter((p) => p.campaignId === camp.id);

          return (
            <div
              key={camp.id}
              className="card p-5 space-y-4 hover:border-[var(--sep)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${camp.accentColor}15`,
                      color: camp.accentColor,
                    }}
                  >
                    {camp.category}
                  </span>
                  {camp.zakatEligible && (
                    <span className="text-[10.5px] font-bold uppercase tracking-wider bg-[var(--green-soft)] text-[var(--green)] px-2 py-0.5 rounded">
                      Zakat Eligible
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-[16px] text-[var(--ink)] leading-snug">{camp.title}</h3>
                <div className="urdu text-[14px] text-[var(--muted)] font-medium leading-relaxed">
                  {camp.urduTitle}
                </div>

                <p className="text-[12.5px] text-[var(--ink2)] line-clamp-3 leading-relaxed">
                  {camp.description}
                </p>
              </div>

              {/* Progress and KPIs */}
              <div className="space-y-3 pt-3 border-t border-[var(--sep2)]">
                <div>
                  <div className="flex justify-between items-center text-[12px] mb-1.5">
                    <span className="font-semibold text-[var(--ink)]">{pct}% Funded</span>
                    <span className="text-[var(--muted)] font-mono">
                      PKR {(camp.raisedAmount / 1000000).toFixed(2)}M / {(camp.targetAmount / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="bar">
                    <i
                      style={{
                        width: `${pct}%`,
                        backgroundColor: camp.accentColor,
                      }}
                    ></i>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11.5px] text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[var(--green)]" />
                    <span><b>{camp.beneficiariesServed}</b> Treated/Helped</span>
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <FileText className="w-3.5 h-3.5 text-[var(--blue)]" />
                    <span><b>{linkedPosts.length}</b> Posts Active</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleLaunchAiStrategist(camp)}
                    className="flex-1 btn sm border border-[var(--sep)] bg-[var(--card)] hover:border-[var(--red)] flex items-center justify-center gap-1 text-[11.5px]"
                  >
                    <Sparkles className="w-3 h-3 text-[var(--red)]" />
                    <span>AI Sprint Plan</span>
                  </button>
                  <button
                    onClick={onOpenNewPost}
                    className="btn sm green text-white flex items-center gap-1 text-[11.5px]"
                  >
                    <span>+ Add Post</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Campaign Strategist Modal */}
      {showAiModal && (
        <div className="scrim center" onClick={() => setShowAiModal(false)}>
          <div
            className="modal max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mhead flex items-center justify-between border-b border-[var(--sep2)] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--red)]" />
                <div>
                  <h2 className="text-lg font-bold">Gemini AI Campaign Architect</h2>
                  <p className="text-[12px] text-[var(--muted)]">
                    Generates a complete multi-day narrative strategy and bilingual post schedule
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="iconbtn"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Config inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              <div className="field">
                <label>Campaign Title</label>
                <input
                  type="text"
                  value={campNameInput}
                  onChange={(e) => setCampNameInput(e.target.value)}
                  placeholder="e.g. Free Cataract Eye Surgery Camp"
                />
              </div>

              <div className="field">
                <label>Fundraising Target / Impact Goal</label>
                <input
                  type="text"
                  value={campGoalInput}
                  onChange={(e) => setCampGoalInput(e.target.value)}
                  placeholder="e.g. PKR 3,500,000 for 500 surgeries"
                />
              </div>

              <div className="field">
                <label>Duration (Days)</label>
                <select
                  value={campDaysInput}
                  onChange={(e) => setCampDaysInput(parseInt(e.target.value, 10))}
                >
                  <option value={5}>5-Day Intensive Appeal Sprint</option>
                  <option value={7}>7-Day Complete Campaign (Recommended)</option>
                  <option value={10}>10-Day Narrative Rollout</option>
                  <option value={14}>14-Day Full Month Driver</option>
                </select>
              </div>

              <div className="field">
                <label>Core Focus Category</label>
                <select
                  value={campFocusInput}
                  onChange={(e) => setCampFocusInput(e.target.value)}
                >
                  <option value="Healthcare & Cataract Surgeries">Healthcare & Eye Surgeries</option>
                  <option value="Dialysis & Kidney Care">Dialysis & Kidney Care</option>
                  <option value="Ration & Food Security">Ration & Food Security</option>
                  <option value="Clean RO Water Plants">Clean RO Water Plants</option>
                  <option value="Thalassemia Blood Relief">Thalassemia Blood Relief</option>
                </select>
              </div>

              <div className="field sm:col-span-2">
                <label>Strategic Guidelines / Narrative Hooks</label>
                <textarea
                  rows={2}
                  value={campDirectiveInput}
                  onChange={(e) => setCampDirectiveInput(e.target.value)}
                  placeholder="e.g. Highlight donor transparency, dignified beneficiary recovery, and specific Zakat compliance details."
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-[var(--sep2)] pt-3">
              <button
                onClick={() => setShowAiModal(false)}
                className="btn"
              >
                Cancel
              </button>
              <button
                onClick={handleGeneratePlan}
                disabled={isPlanning || !campNameInput.trim()}
                className="btn primary flex items-center gap-1.5"
              >
                {isPlanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Architecting Campaign...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Complete Strategy</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Plan Output */}
            {aiPlanResult && (
              <div className="mt-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--sep)] space-y-4 max-h-96 overflow-y-auto">
                <div className="border-b border-[var(--sep2)] pb-3">
                  <h3 className="font-bold text-[15px] text-[var(--ink)]">
                    {aiPlanResult.campaignTitle}
                  </h3>
                  <p className="text-[12.5px] text-[var(--ink2)] mt-1">
                    {aiPlanResult.strategicNarrative}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[12px]">
                    <span className="urdu font-semibold text-[var(--red)]">
                      {aiPlanResult.keyUrduTagline}
                    </span>
                    <span className="text-[var(--muted)] font-medium">
                      • {aiPlanResult.keyEnglishTagline}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="font-semibold text-[13px] text-[var(--ink)]">
                    Multi-Day Post Schedule ({aiPlanResult.days.length} Days)
                  </div>
                  {aiPlanResult.days.map((d) => (
                    <div
                      key={d.dayNumber}
                      className="p-3 rounded-lg bg-[var(--card2)] border border-[var(--sep2)] text-[12.5px] space-y-1.5"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-[var(--red)]">Day {d.dayNumber}: {d.theme}</span>
                        <div className="flex items-center gap-2">
                          <span className="chip uppercase text-[10px]">{d.platform}</span>
                          <span className="text-[11px] text-[var(--muted)]">{d.format}</span>
                        </div>
                      </div>
                      <div className="urdu text-[13px] text-[var(--ink)]">{d.hookUrdu}</div>
                      <div className="text-[var(--ink2)]">{d.hookEnglish}</div>
                      <div className="text-[11.5px] text-[var(--muted)] italic">
                        Concept: {d.postConcept}
                      </div>
                      <div className="text-[11px] text-[var(--green)] font-semibold">
                        CTA: {d.cta}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
