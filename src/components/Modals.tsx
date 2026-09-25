import React, { useState, useEffect } from 'react';
import {
  Post,
  Campaign,
  TeamMember,
  DefinedTopic,
  DEFINED_TOPICS_LIST,
  autoTagPostContent,
} from '../data/seedData';
import { geminiService, AnalyzeResult, GenerateResult } from '../services/geminiService';
import {
  X,
  Sparkles,
  Loader2,
  FileCheck,
  Check,
  Copy,
  AlertCircle,
  HelpCircle,
  Tags,
  Zap,
} from 'lucide-react';

interface PostModalProps {
  postToEdit?: Post | null;
  defaultDate?: string;
  campaigns: Campaign[];
  teamMembers: TeamMember[];
  onSave: (postData: Omit<Post, 'id'>, existingId?: string) => void;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const PostModal: React.FC<PostModalProps> = ({
  postToEdit,
  defaultDate,
  campaigns,
  teamMembers,
  onSave,
  onClose,
  onNotify,
}) => {
  const [title, setTitle] = useState(postToEdit?.title || '');
  const [date, setDate] = useState(postToEdit?.date || defaultDate || '2026-09-24');
  const [time, setTime] = useState(postToEdit?.time || '11:00 AM');
  const [platform, setPlatform] = useState<Post['platform']>(postToEdit?.platform || 'facebook');
  const [status, setStatus] = useState<Post['status']>(postToEdit?.status || 'Scheduled');
  const [format, setFormat] = useState<Post['format']>(postToEdit?.format || 'Single Image');
  const [campaignId, setCampaignId] = useState(postToEdit?.campaignId || campaigns[0]?.id || 'camp-1');
  const [urduText, setUrduText] = useState(postToEdit?.urduText || '');
  const [englishText, setEnglishText] = useState(postToEdit?.englishText || '');
  const [hook, setHook] = useState(postToEdit?.hook || '');
  const [callToAction, setCallToAction] = useState(
    postToEdit?.callToAction || 'Donate through verified accounts. 100% Zakat applicable.'
  );
  const [hashtagsStr, setHashtagsStr] = useState(
    postToEdit?.hashtags.join(' ') || '#KAWT #ZakatEligible #PakistanWelfare'
  );
  const [assignedTo, setAssignedTo] = useState(postToEdit?.assignedTo || teamMembers[0]?.name || 'Bilal Khan');
  const [visualPrompt, setVisualPrompt] = useState(postToEdit?.visualPrompt || '');

  const selectedCampaignObj = campaigns.find((c) => c.id === campaignId);

  // Topics state
  const [topics, setTopics] = useState<DefinedTopic[]>(
    postToEdit?.topics && postToEdit.topics.length > 0
      ? postToEdit.topics
      : autoTagPostContent({
          title: postToEdit?.title || '',
          urduText: postToEdit?.urduText || '',
          englishText: postToEdit?.englishText || '',
          campaignName: selectedCampaignObj?.title || '',
        })
  );
  const [isAutoTagging, setIsAutoTagging] = useState(false);

  // Gemini assistant within modal
  const [isAiAssisting, setIsAiAssisting] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiBar, setShowAiBar] = useState(false);

  const handleAutoDetectTopics = async () => {
    setIsAutoTagging(true);
    try {
      const res = await geminiService.autoTagPost({
        title,
        englishText,
        urduText,
        campaignName: selectedCampaignObj?.title || '',
        hook,
        callToAction,
        hashtags: hashtagsStr.split(/[\s,]+/).filter(Boolean),
      });
      if (res.topics && res.topics.length > 0) {
        setTopics(res.topics);
        onNotify(`Auto-detected topics: ${res.topics.join(', ')} (${res.source === 'gemini' ? 'Gemini AI' : 'Taxonomy Engine'})`);
      }
    } catch {
      const fallback = autoTagPostContent({
        title,
        englishText,
        urduText,
        hook,
        campaignName: selectedCampaignObj?.title,
      });
      setTopics(fallback);
      onNotify(`Auto-tagged: ${fallback.join(', ')}`);
    } finally {
      setIsAutoTagging(false);
    }
  };

  const handleAiAutoFill = async () => {
    if (!aiPrompt.trim() && !title.trim()) {
      onNotify('Please enter a brief topic or prompt for Gemini');
      return;
    }
    setIsAiAssisting(true);
    try {
      const res = await geminiService.generateContent({
        prompt: aiPrompt || title,
        platform,
        campaign: selectedCampaignObj?.title || 'Healthcare and Welfare',
        tone: 'Inspiring & Dignified',
      });
      const d = res.data;
      if (!title) setTitle(d.title);
      setUrduText(d.urduText);
      setEnglishText(d.englishText);
      if (d.hook) setHook(d.hook);
      if (d.callToAction) setCallToAction(d.callToAction);
      if (d.hashtags?.length) setHashtagsStr(d.hashtags.join(' '));
      if (d.visualPrompt) setVisualPrompt(d.visualPrompt);

      // Auto-tag after generating content
      const detected = autoTagPostContent({
        title: d.title || title,
        urduText: d.urduText,
        englishText: d.englishText,
        hook: d.hook,
        campaignName: selectedCampaignObj?.title,
      });
      setTopics(detected);

      onNotify('Auto-filled copy and classified topics with Gemini!');
      setShowAiBar(false);
    } catch (err: any) {
      onNotify(err.message || 'AI auto-fill failed');
    } finally {
      setIsAiAssisting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const hashtags = hashtagsStr
      .split(/[\s,]+/)
      .map((h) => (h.startsWith('#') ? h : `#${h}`))
      .filter((h) => h.length > 1);

    const resolvedTopics =
      topics.length > 0
        ? topics
        : autoTagPostContent({
            title,
            urduText,
            englishText,
            hook,
            campaignName: selectedCampaignObj?.title,
          });

    onSave(
      {
        title,
        date,
        time,
        platform,
        status,
        format,
        campaignId,
        campaignName: selectedCampaignObj?.title || 'General Welfare',
        urduText,
        englishText,
        hook: hook || title,
        callToAction,
        hashtags,
        assignedTo,
        visualPrompt,
        targetAudience: 'Community donors and general public',
        topics: resolvedTopics,
      },
      postToEdit?.id
    );
  };

  return (
    <div className="scrim center" onClick={onClose}>
      <div
        className="modal max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mhead flex items-center justify-between border-b border-[var(--sep2)] pb-3">
          <div>
            <h2 className="text-lg font-bold text-[var(--ink)]">
              {postToEdit ? 'Edit Social Post' : 'Create New Social Post'}
            </h2>
            <p className="text-[12px] text-[var(--muted)]">
              Manage bilingual copy, channel, and visual direction
            </p>
          </div>
          <button onClick={onClose} className="iconbtn">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gemini Helper Bar */}
        <div className="p-3 bg-[var(--card2)] rounded-xl border border-[var(--sep2)] my-2">
          {!showAiBar ? (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[var(--ink2)] flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-[var(--red)]" />
                <span>Need help writing Urdu/English copy and hooks?</span>
              </span>
              <button
                type="button"
                onClick={() => setShowAiBar(true)}
                className="btn sm primary text-[11.5px] flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-Fill with Gemini</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px] font-semibold text-[var(--red)]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gemini Auto-Fill Assistant</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowAiBar(false)}
                  className="text-[var(--muted)] hover:text-[var(--ink)]"
                >
                  Cancel
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Free Eye Surgery Camp announcement for Facebook with emotional donor appeal..."
                  className="flex-1 bg-[var(--card)] text-[12.5px] py-1.5 px-3 rounded-lg border border-[var(--sep)]"
                />
                <button
                  type="button"
                  onClick={handleAiAutoFill}
                  disabled={isAiAssisting}
                  className="btn sm primary flex items-center gap-1 flex-none"
                >
                  {isAiAssisting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Generate</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 text-[12.5px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="field sm:col-span-2">
              <label>Post Title / Working Headline</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Baba Noor Muhammad Vision Restored"
              />
            </div>

            <div className="field">
              <label>Platform</label>
              <select
                value={platform}
                onChange={(e: any) => setPlatform(e.target.value)}
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="tiktok">TikTok / Shorts</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>

            <div className="field">
              <label>Format</label>
              <select
                value={format}
                onChange={(e: any) => setFormat(e.target.value)}
              >
                <option value="Single Image">Single Image</option>
                <option value="Carousel">Carousel (Multi-slide)</option>
                <option value="Reel / Video">Reel / Video</option>
                <option value="Story">Story / Status</option>
                <option value="Infographic">Infographic</option>
              </select>
            </div>

            <div className="field">
              <label>Scheduled Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Scheduled Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 11:30 AM"
              />
            </div>

            <div className="field">
              <label>Campaign Association</label>
              <select
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Assigned Lead</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.role.split('&')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Status</label>
              <select
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="In Review">In Review</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Published">Published</option>
              </select>
            </div>

            {/* Defined Topics Selector */}
            <div className="field sm:col-span-2 p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep)] space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 font-bold text-[var(--ink)]">
                  <Tags className="w-3.5 h-3.5 text-[var(--red)]" />
                  <span>Topic Categorization (Defined KAWT Taxonomy)</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutoDetectTopics}
                  disabled={isAutoTagging}
                  className="btn sm bg-[var(--card)] hover:border-[var(--red)] text-[11px] flex items-center gap-1 py-1 px-2.5"
                >
                  <Zap className={`w-3 h-3 text-[var(--amber)] ${isAutoTagging ? 'animate-spin' : ''}`} />
                  <span>{isAutoTagging ? 'Detecting...' : '⚡ Auto-Detect Topics'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {DEFINED_TOPICS_LIST.map((topic) => {
                  const isActive = topics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => {
                        setTopics((prev) =>
                          prev.includes(topic.id)
                            ? prev.filter((t) => t !== topic.id)
                            : [...prev, topic.id]
                        );
                      }}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'ring-2 ring-offset-1 font-bold shadow-xs'
                          : 'opacity-50 hover:opacity-100 bg-[var(--card)] text-[var(--muted)] border-[var(--sep)]'
                      }`}
                      style={{
                        backgroundColor: isActive ? topic.bgHex : undefined,
                        borderColor: isActive ? topic.borderHex : undefined,
                        color: isActive ? topic.colorHex : undefined,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: topic.colorHex }}
                      />
                      <span>{topic.label}</span>
                      {isActive && <Check className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[var(--muted)]">
                Selected topics determine dashboard metrics, filtering categories, and donor reporting tags.
              </p>
            </div>

            <div className="field">
              <label>Opening Hook / Sub-headline</label>
              <input
                type="text"
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                placeholder="Attention grabbing line..."
              />
            </div>

            <div className="field sm:col-span-2">
              <label>اردو متن (Urdu Nastaliq Text)</label>
              <textarea
                rows={4}
                className="urdu text-[14px]"
                value={urduText}
                onChange={(e) => setUrduText(e.target.value)}
                placeholder="یہاں اردو کیپشن درج کریں..."
              />
            </div>

            <div className="field sm:col-span-2">
              <label>English Copy</label>
              <textarea
                rows={4}
                value={englishText}
                onChange={(e) => setEnglishText(e.target.value)}
                placeholder="Enter English social media caption..."
              />
            </div>

            <div className="field sm:col-span-2">
              <label>Call to Action (CTA)</label>
              <input
                type="text"
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
                placeholder="e.g. Sponsor 1 Cataract Surgery for PKR 7,500. Zakat & Sadqah 100% applicable."
              />
            </div>

            <div className="field sm:col-span-2">
              <label>Hashtags (Space separated)</label>
              <input
                type="text"
                value={hashtagsStr}
                onChange={(e) => setHashtagsStr(e.target.value)}
                placeholder="#KAWT #ZakatEligible #FreeEyeCamp"
              />
            </div>

            <div className="field sm:col-span-2">
              <label>Visual Direction / Image Prompt for Designer</label>
              <textarea
                rows={2}
                value={visualPrompt}
                onChange={(e) => setVisualPrompt(e.target.value)}
                placeholder="Creative photography brief: lighting, framing, dignity-preserving angle..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[var(--sep2)]">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn green text-white">
              {postToEdit ? 'Save Changes' : 'Schedule Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AuditModal: React.FC<{
  post: Post;
  onClose: () => void;
  onApplyRewrite: (newUrdu?: string, newEnglish?: string) => void;
  onNotify: (msg: string) => void;
}> = ({ post, onClose, onApplyRewrite, onNotify }) => {
  const [loading, setLoading] = useState(true);
  const [auditResult, setAuditResult] = useState<AnalyzeResult | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        const textToAudit = `${post.hook}\n\n${post.urduText}\n\n${post.englishText}\n\n${post.callToAction}`;
        const res = await geminiService.analyzeContent(textToAudit, post.platform, post.campaignName);
        if (isSubscribed) {
          setAuditResult(res.data);
          setLoading(false);
        }
      } catch (err: any) {
        if (isSubscribed) {
          onNotify(err.message || 'Audit failed');
          setLoading(false);
        }
      }
    })();
    return () => {
      isSubscribed = false;
    };
  }, [post]);

  return (
    <div className="scrim center" onClick={onClose}>
      <div
        className="modal max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mhead flex items-center justify-between border-b border-[var(--sep2)] pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[var(--green)]" />
            <div>
              <h2 className="text-lg font-bold">Dignity & Zakat Audit</h2>
              <p className="text-[12px] text-[var(--muted)]">Auditing: {post.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="iconbtn">
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--red)]" />
            <div className="text-[13.5px] font-semibold text-[var(--ink)]">
              Gemini is evaluating Islamic compliance, beneficiary dignity, and tone...
            </div>
          </div>
        ) : auditResult ? (
          <div className="space-y-4 py-2 text-[12.5px]">
            {/* Score Banner */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)]">
              <div>
                <span className="font-semibold text-[var(--muted)] text-[11px] uppercase tracking-wider block">
                  Overall Quality Score
                </span>
                <div className="text-2xl font-extrabold text-[var(--red)] font-mono">
                  {auditResult.overallScore}/100
                </div>
              </div>
              <div className="text-right text-[12px] max-w-xs text-[var(--ink2)]">
                {auditResult.summary}
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[var(--green-soft)] border border-[var(--green)]/20 space-y-1">
                <b className="text-[var(--green)] text-[11.5px] block">Strengths:</b>
                <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-[var(--ink)]">
                  {auditResult.strengths?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[var(--red-soft)] border border-[var(--red)]/20 space-y-1">
                <b className="text-[var(--red)] text-[11.5px] block">Suggested Edits:</b>
                <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-[var(--ink)]">
                  {auditResult.improvements?.map((im, i) => (
                    <li key={i}>{im}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enhanced Rewrite Option */}
            {auditResult.enhancedVersion && (
              <div className="p-3.5 rounded-xl bg-[var(--card)] border border-[var(--sep)] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[12.5px] text-[var(--ink)] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--red)]" />
                    <span>Gemini Dignified Revision</span>
                  </span>
                  <button
                    onClick={() => {
                      onApplyRewrite(
                        auditResult.enhancedVersion?.urdu,
                        auditResult.enhancedVersion?.english
                      );
                      onClose();
                    }}
                    className="btn sm green text-white text-[11.5px]"
                  >
                    Apply Rewrite to Post
                  </button>
                </div>
                {auditResult.enhancedVersion.urdu && (
                  <p className="urdu text-[14px] leading-loose text-[var(--ink)] bg-[var(--card2)] p-2.5 rounded-lg">
                    {auditResult.enhancedVersion.urdu}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button onClick={onClose} className="btn">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-[var(--muted)]">Could not retrieve audit results.</div>
        )}
      </div>
    </div>
  );
};
