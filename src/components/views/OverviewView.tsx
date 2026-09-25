import React, { useState } from 'react';
import {
  Post,
  Campaign,
  OpdClinic,
  CONSOLIDATED_CAMP_STATS,
  OFFICIAL_DOCTORS,
  DefinedTopic,
  DEFINED_TOPICS_LIST,
  autoTagPostContent,
} from '../../data/seedData';
import { ViewMode } from '../Sidebar';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  HeartHandshake,
  Calendar,
  CheckCircle2,
  Share2,
  Stethoscope,
  Copy,
  Clock,
  Palette,
  FileSpreadsheet,
  Users,
  MapPin,
  Tag,
  Tags,
  Filter,
  Zap,
} from 'lucide-react';

interface OverviewViewProps {
  posts: Post[];
  campaigns: Campaign[];
  opdClinics: OpdClinic[];
  onSelectView: (view: ViewMode) => void;
  onOpenNewPost: () => void;
  onOpenQuickAi: (initialPrompt?: string) => void;
  onSelectPost: (post: Post) => void;
  onNotify: (msg: string) => void;
  onAutoTagAll?: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  posts,
  campaigns,
  opdClinics,
  onSelectView,
  onOpenNewPost,
  onOpenQuickAi,
  onSelectPost,
  onNotify,
  onAutoTagAll,
}) => {
  const [quickAiInput, setQuickAiInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<DefinedTopic | 'all'>('all');
  const [isTagging, setIsTagging] = useState(false);

  // Stats calculation
  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === 'Published').length;
  const scheduledCount = posts.filter((p) => p.status === 'Scheduled').length;
  const inReviewCount = posts.filter((p) => p.status === 'In Review').length;

  const totalRaised = campaigns.reduce((acc, c) => acc + c.raisedAmount, 0);
  const totalTarget = campaigns.reduce((acc, c) => acc + c.targetAmount, 0);

  // Urgent clinic alerts
  const urgentAlerts = opdClinics.filter((c) => c.urgentAlert);

  // Topic counts across all posts
  const topicCounts: Record<string, number> = { all: posts.length };
  DEFINED_TOPICS_LIST.forEach((t) => {
    topicCounts[t.id] = posts.filter((p) => {
      const pTopics = p.topics && p.topics.length > 0 ? p.topics : autoTagPostContent(p);
      return pTopics.includes(t.id);
    }).length;
  });

  // Today's & upcoming posts (sorted by date)
  const sortedPosts = [...posts].sort((a, b) => a.date.localeCompare(b.date));

  // Filtered by selected topic
  const filteredPostsByTopic = sortedPosts.filter((p) => {
    if (selectedTopic === 'all') return true;
    const pTopics = p.topics && p.topics.length > 0 ? p.topics : autoTagPostContent(p);
    return pTopics.includes(selectedTopic);
  });

  const displayedQueuePosts = filteredPostsByTopic.slice(0, 7);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAiInput.trim()) return;
    onOpenQuickAi(quickAiInput);
    setQuickAiInput('');
  };

  const handleTriggerAutoTagAll = () => {
    setIsTagging(true);
    if (onAutoTagAll) {
      onAutoTagAll();
    } else {
      onNotify('Auto-tagged all posts across defined healthcare & charity topics!');
    }
    setTimeout(() => {
      setIsTagging(false);
    }, 900);
  };

  const getPlatformChipClass = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'chip fb';
      case 'instagram': return 'chip ig';
      case 'linkedin': return 'chip li';
      case 'tiktok': return 'chip tt';
      case 'youtube': return 'chip yt';
      default: return 'chip';
    }
  };

  const getTopicMeta = (topicId: DefinedTopic) => {
    return DEFINED_TOPICS_LIST.find((t) => t.id === topicId);
  };

  return (
    <div className="view space-y-6">
      {/* Header */}
      <div className="head">
        <div>
          <span className="eyebrow">Enterprise Social CMS · Khidmat-e-Alam Welfare Trust</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Executive Studio Overview</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Consolidated content publishing, 15-doctor OPD schedule at Nazimabad Center, and 2026 medical camp transparency.
          </p>
        </div>

        <div className="row flex items-center gap-2 flex-wrap">
          <button
            onClick={handleTriggerAutoTagAll}
            disabled={isTagging}
            className="btn sm border border-[var(--sep)] bg-[var(--card)] hover:bg-[var(--card2)] text-[12px] flex items-center gap-1.5 shadow-sm text-[var(--ink)]"
            title="Auto-evaluate and assign defined topics across all posts"
          >
            <Zap className={`w-3.5 h-3.5 text-[var(--amber)] ${isTagging ? 'animate-spin' : ''}`} />
            <span>{isTagging ? 'Auto-Tagging...' : 'Auto-Tag All Posts'}</span>
          </button>
          <button
            onClick={() => onSelectView('branded-templates')}
            className="btn green text-white flex items-center gap-1.5 shadow-sm"
          >
            <Palette className="w-4 h-4" />
            <span>Branded Templates & AI</span>
          </button>
          <button
            onClick={() => onSelectView('monthly-calendar')}
            className="btn primary flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Monthly Content Calendar</span>
          </button>
        </div>
      </div>

      {/* Quick AI Command Prompt */}
      <div className="card p-3.5 bg-gradient-to-r from-[var(--card)] via-[var(--card2)] to-[var(--card)] border border-[var(--sep)]">
        <form onSubmit={handleQuickSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Sparkles className="w-4 h-4 text-[var(--red)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={quickAiInput}
              onChange={(e) => setQuickAiInput(e.target.value)}
              placeholder="Ask Gemini: 'Create Instagram carousel for Dr. Ishwar Lohana' or 'Draft Thatta camp Zakat appeal'..."
              className="w-full bg-[var(--card)] text-[13px] pl-9 pr-3 py-2 rounded-xl border border-[var(--sep)] focus:outline-none focus:border-[var(--red)]"
            />
          </div>
          <button type="submit" className="btn green text-white flex items-center gap-1 flex-none text-[12.5px]">
            <span>Instruct AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Top Level Metric Cards (Incorporating 2026 Camp Data) */}
      <div className="grid g4">
        {/* Camp Patients */}
        <div className="card stat cursor-pointer hover:border-[var(--sep)] transition-all" onClick={() => onSelectView('doctors-camps')}>
          <div className="k">
            <Users className="w-4 h-4 text-[var(--red)]" />
            <span>Camp Beneficiaries Served</span>
          </div>
          <div className="v font-mono text-[var(--red)]">
            {CONSOLIDATED_CAMP_STATS.totalPatientsServed.toLocaleString()}
          </div>
          <div className="n text-[var(--green)] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Across 5 Camps (Thatta, Hub, Golimar)</span>
          </div>
        </div>

        {/* Medicines Units */}
        <div className="card stat cursor-pointer hover:border-[var(--sep)] transition-all" onClick={() => onSelectView('doctors-camps')}>
          <div className="k">
            <Stethoscope className="w-4 h-4 text-[var(--blue)]" />
            <span>Free Medicine Units</span>
          </div>
          <div className="v font-mono">
            {CONSOLIDATED_CAMP_STATS.totalMedicineUnitsDistributed.toLocaleString()}
          </div>
          <div className="n text-[var(--ink2)]">
            75% Funded via Segregated Zakat
          </div>
        </div>

        {/* Specialist Doctors Roster */}
        <div className="card stat cursor-pointer hover:border-[var(--sep)] transition-all" onClick={() => onSelectView('doctors-camps')}>
          <div className="k">
            <CheckCircle2 className="w-4 h-4 text-[var(--green)]" />
            <span>Specialist OPD Doctors</span>
          </div>
          <div className="v font-mono">
            {OFFICIAL_DOCTORS.length} Specialists
          </div>
          <div className="n text-[var(--green)]">
            Nazimabad Medical Center · 24/7 Urgent Care
          </div>
        </div>

        {/* Scheduled Posts in Sprint */}
        <div className="card stat cursor-pointer hover:border-[var(--sep)] transition-all" onClick={() => onSelectView('daily')}>
          <div className="k">
            <Calendar className="w-4 h-4 text-[var(--amber)]" />
            <span>Sprint Scheduled Posts</span>
          </div>
          <div className="v font-mono">
            {scheduledCount} Posts
          </div>
          <div className="n text-[var(--muted)]">
            {inReviewCount} in review · {publishedCount} published
          </div>
        </div>
      </div>

      {/* Topic Category Filtering Bar */}
      <div className="card p-4 space-y-3 bg-[var(--card)] border border-[var(--sep)]">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Tags className="w-4 h-4 text-[var(--red)]" />
            <span className="font-bold text-[13.5px] text-[var(--ink)]">Content Topic Categorization & Filter</span>
            <span className="text-[11.5px] text-[var(--muted)]">
              (Filtered: {filteredPostsByTopic.length} of {posts.length} posts)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedTopic !== 'all' && (
              <button
                onClick={() => setSelectedTopic('all')}
                className="text-[11.5px] text-[var(--red)] font-semibold hover:underline"
              >
                Clear Topic Filter
              </button>
            )}
            <span className="text-[11.5px] text-[var(--muted)]">Defined KAWT Taxonomy</span>
          </div>
        </div>

        {/* Topic Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {/* "All" button */}
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all flex items-center gap-1.5 border ${
              selectedTopic === 'all'
                ? 'bg-[var(--ink)] text-[var(--card)] border-[var(--ink)] shadow-sm'
                : 'bg-[var(--card2)] text-[var(--ink2)] border-[var(--sep)] hover:bg-[var(--card)] hover:text-[var(--ink)]'
            }`}
          >
            <span>All Topics</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono ${
              selectedTopic === 'all' ? 'bg-white/20 text-white' : 'bg-[var(--sep)] text-[var(--muted)]'
            }`}>
              {topicCounts.all}
            </span>
          </button>

          {/* Defined Topics buttons */}
          {DEFINED_TOPICS_LIST.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            const count = topicCounts[topic.id] || 0;

            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'ring-2 ring-offset-1 font-bold shadow-sm'
                    : 'bg-[var(--card2)] text-[var(--ink2)] border-[var(--sep)] hover:border-current'
                }`}
                style={{
                  borderColor: isSelected ? topic.colorHex : undefined,
                  backgroundColor: isSelected ? topic.bgHex : undefined,
                  color: isSelected ? topic.colorHex : undefined,
                }}
                title={`${topic.label} (${topic.urduLabel}) - ${topic.description}`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-none"
                  style={{ backgroundColor: topic.colorHex }}
                />
                <span>{topic.label}</span>
                <span className="text-[11px] opacity-75 font-urdu hidden sm:inline">
                  ({topic.urduLabel})
                </span>
                <span
                  className="text-[10px] px-1.5 py-0.2 rounded-full font-mono"
                  style={{
                    backgroundColor: isSelected ? 'rgba(0,0,0,0.08)' : 'var(--sep)',
                    color: isSelected ? topic.colorHex : 'var(--muted)',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Feature Callouts: Monthly Content Calendar & Visual Studio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Content Calendar Card */}
        <div
          onClick={() => onSelectView('monthly-calendar')}
          className="card p-5 space-y-3 cursor-pointer hover:border-[var(--red)] transition-all group bg-gradient-to-br from-[var(--card)] to-[var(--red-soft)]/20"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--red-soft)] text-[var(--red)] flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-[var(--ink)] group-hover:text-[var(--red)] transition-colors">
                  Monthly Content Calendar
                </h3>
                <p className="text-[12px] text-[var(--muted)]">October 2026 · 31 Days Planned</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:translate-x-1 group-hover:text-[var(--red)] transition-all" />
          </div>
          <p className="text-[12.5px] text-[var(--ink2)] leading-relaxed">
            Full 30-day multi-platform content roadmap including World Heart Day, World Sight Day, Breast Cancer Awareness, Global Handwashing Day, and Friday Zakat reflections.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[11.5px] font-semibold text-[var(--red)]">
            <span>Open Calendar Dashboard</span>
            <span>→</span>
          </div>
        </div>

        {/* Visual Creative Studio Card */}
        <div
          onClick={() => onSelectView('visual-studio')}
          className="card p-5 space-y-3 cursor-pointer hover:border-[var(--green)] transition-all group bg-gradient-to-br from-[var(--card)] to-[var(--green-soft)]/20"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--green-soft)] text-[var(--green)] flex items-center justify-center font-bold">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-[var(--ink)] group-hover:text-[var(--green)] transition-colors">
                  Visual Creative Studio
                </h3>
                <p className="text-[12px] text-[var(--muted)]">Automated AI Prompts & Scripts</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:translate-x-1 group-hover:text-[var(--green)] transition-all" />
          </div>
          <p className="text-[12.5px] text-[var(--ink2)] leading-relaxed">
            Generate standardized AI image prompts (Midjourney/Flux), 5-slide carousel breakdowns, Reel scripts with bilingual voiceover, and exportable design briefs.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[11.5px] font-semibold text-[var(--green)]">
            <span>Launch Visual Studio</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scheduled Content Pipeline (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="card-h">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--red)]" />
                <h2 className="text-[15px] font-bold">
                  Active Content Queue {selectedTopic !== 'all' && `· Filtered by "${selectedTopic}"`}
                </h2>
              </div>
              <div className="row flex items-center gap-2">
                {selectedTopic !== 'all' && (
                  <button
                    onClick={() => setSelectedTopic('all')}
                    className="text-[11.5px] text-[var(--muted)] hover:text-[var(--ink)] underline mr-1"
                  >
                    Reset Filter
                  </button>
                )}
                <button
                  onClick={() => onSelectView('daily')}
                  className="btn sm text-[11.5px] flex items-center gap-1"
                >
                  <span>View All ({posts.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {displayedQueuePosts.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Tag className="w-8 h-8 text-[var(--muted)] mx-auto opacity-40" />
                <p className="text-[13px] font-medium text-[var(--ink)]">
                  No posts categorized under "{selectedTopic}" currently.
                </p>
                <p className="text-[12px] text-[var(--muted)]">
                  Click below to create a new post with this topic or clear the filter.
                </p>
                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedTopic('all')}
                    className="btn sm"
                  >
                    View All Topics
                  </button>
                  <button
                    onClick={onOpenNewPost}
                    className="btn sm primary"
                  >
                    + Create Post
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-[var(--sep2)]">
                {displayedQueuePosts.map((post) => {
                  const resolvedTopics =
                    post.topics && post.topics.length > 0
                      ? post.topics
                      : autoTagPostContent(post);

                  return (
                    <div
                      key={post.id}
                      className="postrow cursor-pointer group"
                      onClick={() => onSelectPost(post)}
                    >
                      <div className="time text-[12px] font-mono text-[var(--muted)] flex flex-col">
                        <span className="font-semibold text-[var(--ink)]">{post.date.slice(5)}</span>
                        <span className="text-[11px]">{post.time}</span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={getPlatformChipClass(post.platform)}>
                            {post.platform.toUpperCase()}
                          </span>
                          <span className="text-[11px] font-medium text-[var(--muted)] bg-[var(--card2)] px-2 py-0.5 rounded">
                            {post.format}
                          </span>

                          {/* Render Topic Badges */}
                          {resolvedTopics.slice(0, 3).map((topicId) => {
                            const meta = getTopicMeta(topicId);
                            if (!meta) return null;
                            return (
                              <span
                                key={topicId}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 transition-transform"
                                style={{
                                  backgroundColor: meta.bgHex,
                                  borderColor: meta.borderHex,
                                  color: meta.colorHex,
                                }}
                                title={`${meta.label}: ${meta.description}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTopic(topicId);
                                }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: meta.colorHex }}
                                />
                                <span>{meta.id}</span>
                              </span>
                            );
                          })}

                          <span className="text-[11px] font-semibold text-[var(--red)] truncate ml-auto hidden sm:inline">
                            {post.campaignName}
                          </span>
                        </div>

                        <h4 className="font-bold text-[13.5px] text-[var(--ink)] truncate group-hover:text-[var(--red)] transition-colors">
                          {post.title}
                        </h4>

                        {post.urduText && (
                          <p className="urdu text-[12.5px] text-[var(--ink2)] line-clamp-1 opacity-75">
                            {post.urduText}
                          </p>
                        )}
                      </div>

                      <div className="go flex items-center gap-2 flex-none">
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            post.status === 'Published'
                              ? 'bg-[var(--green-soft)] text-[var(--green)]'
                              : post.status === 'Scheduled'
                              ? 'bg-[var(--blue)]/10 text-[var(--blue)]'
                              : 'bg-[var(--amber-soft)] text-[var(--amber)]'
                          }`}
                        >
                          {post.status}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Topic Distribution & Content Balance Widget */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tags className="w-4 h-4 text-[var(--green)]" />
                <h3 className="font-bold text-[14.5px] text-[var(--ink)]">
                  Content Topic Balance & Portfolio Distribution
                </h3>
              </div>
              <span className="text-[11.5px] text-[var(--muted)]">
                Targeting balanced humanitarian impact
              </span>
            </div>

            <p className="text-[12px] text-[var(--ink2)] leading-relaxed">
              KAWT digital guidelines require a healthy ratio of <b>Medical OPD</b> visibility, <b>Zakat-funded</b> transparency, <b>Emergency</b> availability, and <b>Preventive Health Awareness</b>.
            </p>

            {/* Distribution Horizontal Multi-Segment Bar */}
            <div className="w-full h-3 rounded-full bg-[var(--sep)] overflow-hidden flex shadow-inner">
              {DEFINED_TOPICS_LIST.map((topic) => {
                const count = topicCounts[topic.id] || 0;
                const pct = totalPosts > 0 ? (count / totalPosts) * 100 : 0;
                if (pct <= 0) return null;

                return (
                  <div
                    key={topic.id}
                    style={{
                      width: `${pct}%`,
                      backgroundColor: topic.colorHex,
                    }}
                    title={`${topic.label}: ${count} posts (${pct.toFixed(0)}%)`}
                    className="h-full hover:opacity-85 cursor-pointer transition-opacity"
                    onClick={() => setSelectedTopic(topic.id)}
                  />
                );
              })}
            </div>

            {/* Topic Distribution Grid with Percentage Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {DEFINED_TOPICS_LIST.map((topic) => {
                const count = topicCounts[topic.id] || 0;
                const pct = totalPosts > 0 ? ((count / totalPosts) * 100).toFixed(0) : '0';
                const isSelected = selectedTopic === topic.id;

                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(isSelected ? 'all' : topic.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'ring-2 ring-offset-1 shadow-sm'
                        : 'bg-[var(--card)] border-[var(--sep)] hover:border-[var(--sep2)]'
                    }`}
                    style={{
                      borderColor: isSelected ? topic.colorHex : undefined,
                      backgroundColor: isSelected ? topic.bgHex : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="truncate" style={{ color: topic.colorHex }}>
                        {topic.label}
                      </span>
                      <span className="font-mono text-[var(--ink)]">{pct}%</span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-[var(--muted)]">
                      <span className="font-urdu opacity-80 truncate">{topic.urduLabel}</span>
                      <span className="font-mono font-semibold">{count} posts</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Hospital Facility, Doctors & Alert Summary */}
        <div className="space-y-6">
          {/* Nazimabad Medical Center Info Card */}
          <div className="card p-5 space-y-3.5">
            <div className="flex items-center gap-2 text-[var(--red)]">
              <Stethoscope className="w-4.5 h-4.5" />
              <h3 className="font-bold text-[14.5px] text-[var(--ink)]">Khidmat-e-Alam Medical Center</h3>
            </div>

            <div className="space-y-2 text-[12px] text-[var(--ink2)]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--muted)] flex-none mt-0.5" />
                <span>351, Usmania Society, B Road, Nazimabad, Karachi</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[var(--muted)] flex-none" />
                <span>Urgent Care: <b>24 Hours / 7 Days</b></span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5 text-[var(--green)] flex-none" />
                <span>UAN Helpline: <b className="text-[var(--red)] font-mono text-[13px]">1111528</b></span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--sep2)]">
              <button
                onClick={() => onSelectView('doctors-camps')}
                className="btn sm w-full flex items-center justify-center gap-1.5 text-[12px]"
              >
                <span>View All 15 Doctors Schedules</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Urgent Clinical Alerts */}
          {urgentAlerts.length > 0 && (
            <div className="space-y-3">
              {urgentAlerts.map((clinic) => (
                <div key={clinic.id} className="notice text-[12.5px] space-y-1.5 border-l-4 border-l-[var(--amber)]">
                  <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
                    <AlertTriangle className="w-4 h-4 text-[var(--amber)]" />
                    <span>{clinic.name}</span>
                  </div>
                  <p className="text-[var(--ink2)] text-[12px] leading-relaxed">
                    {clinic.urgentAlert}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-[var(--amber)]">
                    <span>Capacity: {clinic.dailyCapacity} patients/day</span>
                    <button
                      onClick={() => onSelectView('opd')}
                      className="underline hover:text-[var(--ink)]"
                    >
                      Issue Patient Notice →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
