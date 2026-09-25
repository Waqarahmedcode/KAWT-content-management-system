import React, { useState } from 'react';
import {
  Post,
  DefinedTopic,
  DEFINED_TOPICS_LIST,
  autoTagPostContent,
} from '../../data/seedData';
import { geminiService } from '../../services/geminiService';
import {
  Sparkles,
  Calendar,
  Clock,
  User,
  Copy,
  Check,
  Edit3,
  Trash2,
  Filter,
  CheckCircle,
  AlertCircle,
  Eye,
  Languages,
  Wand2,
  FileCheck,
  Tags,
  Tag,
  Zap,
} from 'lucide-react';

interface DailyViewProps {
  posts: Post[];
  onOpenNewPost: () => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onFastEditWithGemini: (post: Post, instruction: string) => void;
  onAuditWithGemini: (post: Post) => void;
  onNotify: (msg: string) => void;
  onUpdatePostTopics?: (postId: string, topics: DefinedTopic[]) => void;
}

export const DailyView: React.FC<DailyViewProps> = ({
  posts,
  onOpenNewPost,
  onEditPost,
  onDeletePost,
  onFastEditWithGemini,
  onAuditWithGemini,
  onNotify,
  onUpdatePostTopics,
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(posts[0] || null);
  const [activeLangTab, setActiveLangTab] = useState<'both' | 'urdu' | 'english'>('both');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isAutoTagging, setIsAutoTagging] = useState<boolean>(false);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (platformFilter !== 'all' && post.platform !== platformFilter) return false;
    if (statusFilter !== 'all' && post.status !== statusFilter) return false;
    if (topicFilter !== 'all') {
      const pTopics = post.topics && post.topics.length > 0 ? post.topics : autoTagPostContent(post);
      if (!pTopics.includes(topicFilter as DefinedTopic)) return false;
    }
    return true;
  });

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    onNotify(`Copied ${fieldName} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
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

  const handleAutoTagSelectedPost = async () => {
    if (!selectedPost) return;
    setIsAutoTagging(true);
    onNotify('Analyzing post with Gemini classification AI...');
    try {
      const res = await geminiService.autoTagPost({
        title: selectedPost.title,
        englishText: selectedPost.englishText,
        urduText: selectedPost.urduText,
        campaignName: selectedPost.campaignName,
        hook: selectedPost.hook,
        callToAction: selectedPost.callToAction,
        hashtags: selectedPost.hashtags,
      });

      if (res.topics && res.topics.length > 0) {
        if (onUpdatePostTopics) {
          onUpdatePostTopics(selectedPost.id, res.topics);
        }
        setSelectedPost({ ...selectedPost, topics: res.topics });
        onNotify(`Tagged as: ${res.topics.join(', ')} (${res.source === 'gemini' ? 'Gemini AI' : 'Rule Taxonomy'})`);
      }
    } catch (err: any) {
      onNotify(err.message || 'Auto-tagging failed');
    } finally {
      setIsAutoTagging(false);
    }
  };

  const handleToggleTopicOnSelectedPost = (topicId: DefinedTopic) => {
    if (!selectedPost) return;
    const currentTopics =
      selectedPost.topics && selectedPost.topics.length > 0
        ? selectedPost.topics
        : autoTagPostContent(selectedPost);

    const nextTopics = currentTopics.includes(topicId)
      ? currentTopics.filter((t) => t !== topicId)
      : [...currentTopics, topicId];

    if (onUpdatePostTopics) {
      onUpdatePostTopics(selectedPost.id, nextTopics);
    }
    setSelectedPost({ ...selectedPost, topics: nextTopics });
    onNotify(`Updated topic tags for "${selectedPost.title}"`);
  };

  return (
    <div className="view space-y-5">
      {/* Top Header */}
      <div className="head">
        <div>
          <span className="eyebrow">Multi-Channel Social Timeline</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Daily Post Planner</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Review bilingual copy, verify Zakat compliance, preview visual briefs, and filter by defined topics.
          </p>
        </div>
        <div className="row">
          <button onClick={onOpenNewPost} className="btn primary">
            <span>+ Create New Post</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card p-3 space-y-3 bg-[var(--card)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Platform tabs */}
          <div className="seg">
            {['all', 'facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'].map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                aria-pressed={platformFilter === p}
                className="capitalize"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[var(--muted)] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Status:</span>
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[12.5px] py-1 px-2.5 rounded-lg bg-[var(--card2)] border border-[var(--sep)]"
            >
              <option value="all">All Statuses ({posts.length})</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Review">In Review</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Topic Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[var(--sep2)]">
          <span className="text-[11.5px] text-[var(--muted)] font-semibold flex items-center gap-1 mr-1">
            <Tags className="w-3 h-3 text-[var(--red)]" />
            <span>Topic:</span>
          </span>

          <button
            onClick={() => setTopicFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              topicFilter === 'all'
                ? 'bg-[var(--ink)] text-[var(--card)]'
                : 'bg-[var(--card2)] text-[var(--ink2)] border border-[var(--sep)] hover:bg-[var(--card)]'
            }`}
          >
            All Topics
          </button>

          {DEFINED_TOPICS_LIST.map((topic) => {
            const isSelected = topicFilter === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setTopicFilter(isSelected ? 'all' : topic.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 border ${
                  isSelected
                    ? 'ring-1 ring-offset-1 font-bold'
                    : 'bg-[var(--card2)] text-[var(--ink2)] border-[var(--sep)] hover:border-current'
                }`}
                style={{
                  borderColor: isSelected ? topic.colorHex : undefined,
                  backgroundColor: isSelected ? topic.bgHex : undefined,
                  color: isSelected ? topic.colorHex : undefined,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: topic.colorHex }}
                />
                <span>{topic.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-column layout: Left post list, Right detail viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Post Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex justify-between items-center px-1 text-[12px] text-[var(--muted)]">
            <span>Showing {filteredPosts.length} posts</span>
            <span>Sorted by date</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="empty">No posts match the selected filters.</div>
          ) : (
            filteredPosts.map((post) => {
              const isSelected = selectedPost?.id === post.id;
              const resolvedTopics =
                post.topics && post.topics.length > 0
                  ? post.topics
                  : autoTagPostContent(post);

              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`card p-4 cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'border-[var(--red)] ring-2 ring-[var(--red-soft)] shadow-md'
                      : 'hover:border-[var(--sep)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={getPlatformChipClass(post.platform)}>
                        {post.platform.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-[var(--muted)] bg-[var(--card2)] px-2 py-0.5 rounded font-medium">
                        {post.format}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        post.status === 'Published'
                          ? 'bg-[var(--green-soft)] text-[var(--green)]'
                          : post.status === 'Scheduled'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'bg-[var(--amber-soft)] text-[var(--amber)]'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <h3 className="font-semibold text-[14px] text-[var(--ink)] leading-snug line-clamp-1">
                    {post.title}
                  </h3>

                  {/* Topic Badges on Card */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {resolvedTopics.slice(0, 3).map((topicId) => {
                      const meta = getTopicMeta(topicId);
                      if (!meta) return null;
                      return (
                        <span
                          key={topicId}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1"
                          style={{
                            backgroundColor: meta.bgHex,
                            borderColor: meta.borderHex,
                            color: meta.colorHex,
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
                  </div>

                  <div className="text-[12px] text-[var(--muted)] line-clamp-2">
                    {post.hook}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[var(--muted)] pt-2 border-t border-[var(--sep2)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date} · {post.time}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium text-[var(--ink2)]">
                      <User className="w-3 h-3" />
                      <span>{post.assignedTo}</span>
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Post Deep Inspector & Gemini Intelligence (7 cols) */}
        <div className="lg:col-span-7">
          {selectedPost ? (
            <div className="card p-5 space-y-5 sticky top-20">
              {/* Card top banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--sep2)] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={getPlatformChipClass(selectedPost.platform)}>
                      {selectedPost.platform.toUpperCase()}
                    </span>
                    <span className="text-[11.5px] text-[var(--muted)] font-medium">
                      Campaign: <b>{selectedPost.campaignName}</b>
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[var(--ink)]">{selectedPost.title}</h2>
                  <div className="text-[11.5px] text-[var(--muted)] flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Scheduled for {selectedPost.date} at {selectedPost.time}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>By {selectedPost.assignedTo}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditPost(selectedPost)}
                    className="btn sm"
                    title="Edit Post"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDeletePost(selectedPost.id)}
                    className="btn sm hover:text-[var(--red)]"
                    title="Delete Post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Topic Categorization Section for Selected Post */}
              <div className="p-3.5 rounded-xl bg-[var(--card2)] border border-[var(--sep)] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Tags className="w-4 h-4 text-[var(--red)]" />
                    <span className="text-[12.5px] font-bold text-[var(--ink)]">
                      Topic Categorization
                    </span>
                  </div>

                  <button
                    onClick={handleAutoTagSelectedPost}
                    disabled={isAutoTagging}
                    className="btn sm bg-[var(--card)] hover:border-[var(--red)] flex items-center gap-1 text-[11.5px]"
                  >
                    <Zap className={`w-3.5 h-3.5 text-[var(--amber)] ${isAutoTagging ? 'animate-spin' : ''}`} />
                    <span>{isAutoTagging ? 'Auto-Tagging...' : 'Auto-Detect with AI'}</span>
                  </button>
                </div>

                {/* Clickable Topic Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {DEFINED_TOPICS_LIST.map((topic) => {
                    const currentTopics =
                      selectedPost.topics && selectedPost.topics.length > 0
                        ? selectedPost.topics
                        : autoTagPostContent(selectedPost);
                    const isActive = currentTopics.includes(topic.id);

                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleToggleTopicOnSelectedPost(topic.id)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'ring-2 ring-offset-1 shadow-xs font-bold'
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
              </div>

              {/* Gemini Intelligence Action Bar */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--red-soft)] via-[var(--card2)] to-[var(--green-soft)] border border-[var(--sep)] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--red)]">
                    <Sparkles className="w-4 h-4" />
                    <span>Gemini Post Intelligence</span>
                  </div>
                  <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[var(--muted)]">
                    Real-time AI Actions
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => onAuditWithGemini(selectedPost)}
                    className="btn sm bg-[var(--card)] hover:border-[var(--red)] flex items-center gap-1 text-[12px]"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-[var(--green)]" />
                    <span>Audit Tone & Zakat Compliance</span>
                  </button>

                  <button
                    onClick={() => onFastEditWithGemini(selectedPost, 'Make this post more emotionally urgent for critical patient care while preserving dignity.')}
                    className="btn sm bg-[var(--card)] hover:border-[var(--red)] flex items-center gap-1 text-[12px]"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-[var(--blue)]" />
                    <span>Make More Urgent</span>
                  </button>

                  <button
                    onClick={() => onFastEditWithGemini(selectedPost, 'Translate and enhance the Urdu copy with high-literary Nastaliq Islamic welfare vocabulary.')}
                    className="btn sm bg-[var(--card)] hover:border-[var(--red)] flex items-center gap-1 text-[12px]"
                  >
                    <Languages className="w-3.5 h-3.5 text-[var(--amber)]" />
                    <span>Enhance Urdu Copy</span>
                  </button>

                  <button
                    onClick={() => onFastEditWithGemini(selectedPost, 'Append verified official KAWT bank transfer and Raast ID donation footer.')}
                    className="btn sm bg-[var(--card)] hover:border-[var(--red)] flex items-center gap-1 text-[12px]"
                  >
                    <span>+ Add Bank Footer</span>
                  </button>
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center justify-between border-b border-[var(--sep2)] pb-2">
                <div className="seg">
                  <button
                    onClick={() => setActiveLangTab('both')}
                    aria-pressed={activeLangTab === 'both'}
                  >
                    Bilingual View
                  </button>
                  <button
                    onClick={() => setActiveLangTab('urdu')}
                    aria-pressed={activeLangTab === 'urdu'}
                  >
                    اردو متن (Urdu)
                  </button>
                  <button
                    onClick={() => setActiveLangTab('english')}
                    aria-pressed={activeLangTab === 'english'}
                  >
                    English Copy
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(`${selectedPost.urduText}\n\n---\n\n${selectedPost.englishText}\n\n${selectedPost.hashtags.join(' ')}`, 'Full Post')}
                    className="btn sm text-[11.5px]"
                  >
                    {copiedField === 'Full Post' ? <Check className="w-3.5 h-3.5 text-[var(--green)]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Full Post</span>
                  </button>
                </div>
              </div>

              {/* Post Content Display */}
              <div className="space-y-4">
                {/* Urdu Section */}
                {(activeLangTab === 'both' || activeLangTab === 'urdu') && (
                  <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-2 relative">
                    <div className="flex items-center justify-between text-[11.5px] font-semibold text-[var(--muted)]">
                      <span>اردو کیپشن (Urdu Nastaliq)</span>
                      <button
                        onClick={() => handleCopy(selectedPost.urduText, 'Urdu')}
                        className="hover:text-[var(--ink)] flex items-center gap-1"
                      >
                        {copiedField === 'Urdu' ? <Check className="w-3 h-3 text-[var(--green)]" /> : <Copy className="w-3 h-3" />}
                        <span>Copy Urdu</span>
                      </button>
                    </div>
                    <p className="urdu text-[15px] leading-loose text-[var(--ink)] whitespace-pre-wrap select-text">
                      {selectedPost.urduText}
                    </p>
                  </div>
                )}

                {/* English Section */}
                {(activeLangTab === 'both' || activeLangTab === 'english') && (
                  <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-2 relative">
                    <div className="flex items-center justify-between text-[11.5px] font-semibold text-[var(--muted)]">
                      <span>English Social Caption</span>
                      <button
                        onClick={() => handleCopy(selectedPost.englishText, 'English')}
                        className="hover:text-[var(--ink)] flex items-center gap-1"
                      >
                        {copiedField === 'English' ? <Check className="w-3 h-3 text-[var(--green)]" /> : <Copy className="w-3 h-3" />}
                        <span>Copy English</span>
                      </button>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[var(--ink)] whitespace-pre-wrap select-text">
                      {selectedPost.englishText}
                    </p>
                  </div>
                )}

                {/* Call to action & hashtags */}
                <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep)] space-y-2 text-[12.5px]">
                  <div>
                    <span className="font-semibold text-[var(--muted)] text-[11px] uppercase tracking-wider block">
                      Call to Action (Donation / Helpline)
                    </span>
                    <span className="text-[var(--ink)] font-medium">{selectedPost.callToAction}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-[var(--muted)] text-[11px] uppercase tracking-wider block mb-1">
                      Hashtags
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPost.hashtags.map((h, i) => (
                        <span key={i} className="text-[11.5px] text-[var(--blue)] bg-blue-500/10 px-2 py-0.5 rounded-md font-mono">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Direction / Prompt for Designer */}
                <div className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] text-[12.5px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--muted)] text-[11px] uppercase tracking-wider">
                      Visual Direction & Image Prompt
                    </span>
                    <button
                      onClick={() => handleCopy(selectedPost.visualPrompt, 'Visual Prompt')}
                      className="text-[11px] text-[var(--muted)] hover:text-[var(--ink)] flex items-center gap-1"
                    >
                      {copiedField === 'Visual Prompt' ? <Check className="w-3 h-3 text-[var(--green)]" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Prompt</span>
                    </button>
                  </div>
                  <p className="italic text-[var(--ink2)] text-[12px]">
                    "{selectedPost.visualPrompt}"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center text-[var(--muted)]">
              Select a post on the left to inspect and polish.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
