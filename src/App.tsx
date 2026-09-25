import React, { useState, useEffect } from 'react';
import { ViewMode, Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { OverviewView } from './components/views/OverviewView';
import { BrandedTemplateStudio } from './components/views/BrandedTemplateStudio';
import { MonthlyCalendarView } from './components/views/MonthlyCalendarView';
import { VisualCreativeView } from './components/views/VisualCreativeView';
import { CampsAndDoctorsView } from './components/views/CampsAndDoctorsView';
import { DailyView } from './components/views/DailyView';
import { CalendarView } from './components/views/CalendarView';
import { CampaignsView } from './components/views/CampaignsView';
import { OpdView } from './components/views/OpdView';
import { PromptsView } from './components/views/PromptsView';
import { TaskDashboardView } from './components/views/TaskDashboardView';
import { TeamView } from './components/views/TeamView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { BriefView } from './components/views/BriefView';
import { PrintView } from './components/views/PrintView';
import { PostModal, AuditModal } from './components/Modals';
import {
  Post,
  Campaign,
  OpdClinic,
  TaskItem,
  TeamMember,
  Doctor,
  FreeMedicalCamp,
  INITIAL_POSTS,
  INITIAL_CAMPAIGNS,
  INITIAL_OPD_CLINICS,
  INITIAL_TASKS,
  INITIAL_TEAM_MEMBERS,
  DefinedTopic,
  autoTagPostContent,
} from './data/seedData';
import { MonthlyCalendarDay, geminiService } from './services/geminiService';
import { Check, Sparkles, X } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Navigation state
  const [currentView, setCurrentView] = useState<ViewMode>('overview');

  // Data states
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [opdClinics, setOpdClinics] = useState<OpdClinic[]>(INITIAL_OPD_CLINICS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postDefaultDate, setPostDefaultDate] = useState<string>('2026-09-24');
  const [auditingPost, setAuditingPost] = useState<Post | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize theme
  useEffect(() => {
    const saved = localStorage.getItem('kawt_theme') as 'light' | 'dark';
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const handleToggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('kawt_theme', next);
  };

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4500);
  };

  // Filtered posts based on search query
  const displayedPosts = posts.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.englishText.toLowerCase().includes(q) ||
      p.urduText.toLowerCase().includes(q) ||
      p.campaignName.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  // Handle saving post (create or edit)
  const handleSavePost = (postData: Omit<Post, 'id'>, existingId?: string) => {
    if (existingId) {
      setPosts((prev) => prev.map((p) => (p.id === existingId ? { ...postData, id: existingId } : p)));
      notify('Post updated successfully');
    } else {
      const newPost: Post = {
        ...postData,
        id: `post-${Date.now()}`,
      };
      setPosts((prev) => [newPost, ...prev]);
      notify('New post created & scheduled');
    }
    setShowPostModal(false);
    setEditingPost(null);
  };

  // Convert Monthly Calendar Day item into an active Post
  const handleSchedulePostFromCalendar = (dayItem: MonthlyCalendarDay) => {
    const rawPostData = {
      title: `${dayItem.topic} (${dayItem.date})`,
      englishText: dayItem.caption,
      urduText: dayItem.urduCaption || dayItem.caption,
      hook: dayItem.topic,
      campaignName: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
    };

    const newPost: Post = {
      id: `cal-post-${Date.now()}`,
      title: rawPostData.title,
      date: '2026-10-' + (parseInt(dayItem.date, 10) < 10 ? '0' + parseInt(dayItem.date, 10) : parseInt(dayItem.date, 10)),
      time: '11:00 AM',
      platform: dayItem.platform,
      status: dayItem.status === 'Published' ? 'Published' : 'Scheduled',
      format: dayItem.platform === 'tiktok' || dayItem.platform === 'youtube' ? 'Reel / Video' : 'Single Image',
      campaignId: 'camp-1',
      campaignName: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
      urduText: dayItem.urduCaption || dayItem.caption,
      englishText: dayItem.caption,
      hook: dayItem.topic,
      callToAction: 'Support free healthcare for deserving patients. 100% Zakat eligible. UAN: 1111528.',
      hashtags: ['#KhidmatEAlam', '#KAWT', '#FreeHealthcare', '#ZakatEligible', `#${dayItem.platform}`],
      assignedTo: dayItem.assignedTo,
      visualPrompt: dayItem.visualPrompt,
      targetAudience: 'Families, donors, community members',
      topics: autoTagPostContent(rawPostData),
      metrics: { views: 0, likes: 0, shares: 0, comments: 0, donationsLinked: 0 },
    };

    setPosts((prev) => [newPost, ...prev]);
    notify(`Added ${dayItem.date} (${dayItem.topic}) to production queue!`);
  };

  // Generate Doctor post
  const handleGeneratePostForDoctor = (doc: Doctor) => {
    const docSpecialtyTopics: DefinedTopic[] = ['Medical'];
    if (doc.specialty.toLowerCase().includes('pediatric')) {
      docSpecialtyTopics.push('Maternal & Child');
    }
    if (doc.specialty.toLowerCase().includes('gynecolog')) {
      docSpecialtyTopics.push('Maternal & Child');
    }
    if (doc.specialty.toLowerCase().includes('sonolog') || doc.specialty.toLowerCase().includes('ultrasound')) {
      docSpecialtyTopics.push('Diagnostics');
    }
    if (doc.specialty.toLowerCase().includes('urgent')) {
      docSpecialtyTopics.push('Emergency');
    }

    const newPost: Post = {
      id: `doc-post-${Date.now()}`,
      title: `${doc.name} - ${doc.specialty} OPD Clinic`,
      date: '2026-10-05',
      time: '04:00 PM',
      platform: 'instagram',
      status: 'Scheduled',
      format: 'Carousel',
      campaignId: 'camp-2',
      campaignName: 'Nazimabad Medical Center Specialist OPD & Urgent Care',
      hook: `Meet our specialist: ${doc.name} (${doc.specialty})`,
      urduText: `خدمتِ عالم میڈیکل سینٹر، ناظم آباد کراچی میں ${doc.name} (${doc.specialty}) کے کلینک کے اوقات:
${doc.opdDays}
اوقات: ${doc.opdTimings}
فیس: ${doc.consultationFee}

📍 پتہ: 351 عثمانیہ سوسائٹی، بی روڈ، ناظم آباد، کراچی
ٹوکن و معلومات: UAN 1111528`,
      englishText: `Consult ${doc.name} (${doc.specialty}) at Khidmat-e-Alam Medical Center Nazimabad Karachi:
Days: ${doc.opdDays}
Timings: ${doc.opdTimings}
Consultation Fee: ${doc.consultationFee}

Location: 351, Usmania Society, B Road, Nazimabad, Karachi
UAN: 1111528 | www.khidmat-e-alam.org`,
      callToAction: `Book consultation token with ${doc.name} or call UAN 1111528.`,
      hashtags: ['#KAWTMedicalCenter', '#DoctorKarachi', '#SpecialistOPD', '#HealthcareForAll'],
      assignedTo: 'Fatima Zahra',
      visualPrompt: `Create a professional NGO healthcare social media carousel for Khidmat-e-Alam Welfare Trust. Slide 1: Professional doctor profile card of ${doc.name} in doctor coat with stethoscope. Slide 2: OPD timings (${doc.opdTimings}), consultation fee (${doc.consultationFee}), and clinic room. Clean medical red and green branding with official KAWT logo and UAN 1111528.`,
      targetAudience: 'Patients and families in Nazimabad, Liaquatabad, and Central Karachi',
      topics: docSpecialtyTopics,
    };

    setPosts((prev) => [newPost, ...prev]);
    setEditingPost(newPost);
    setShowPostModal(true);
  };

  // Generate Camp post
  const handleGeneratePostForCamp = (camp: FreeMedicalCamp) => {
    const newPost: Post = {
      id: `camp-post-${Date.now()}`,
      title: `${camp.name}: ${camp.patientsServed} Patients Treated Free`,
      date: '2026-10-06',
      time: '12:00 PM',
      platform: 'facebook',
      status: 'Scheduled',
      format: 'Single Image',
      campaignId: 'camp-1',
      campaignName: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
      hook: `${camp.patientsServed} مریضوں کا مفت معائنہ اور ${camp.medicinesDistributed} مفت ادویات کی تقسیم!`,
      urduText: `الحمدللہ! خدمتِ عالم ویلفیئر ٹرسٹ کے تحت ${camp.name} (${camp.location}) کی رپورٹ:
• کل مریض: ${camp.patientsServed} (بچے: ${camp.demographics.children}، خواتین: ${camp.demographics.female})
• مفت ادویات تقسیم: ${camp.medicinesDistributed}
• زکوٰۃ فنڈ کا حصہ: ${camp.financials.zakatPct}% (PKR ${camp.financials.zakatFund.toLocaleString()})
• فی مریض اوسط خرچ: PKR ${camp.financials.costPerPatient}

آپ کی زکوٰۃ کا ایک ایک روپیہ مستحقین کی مفت ادویات پر خرچ ہوا۔
رابطہ: UAN 1111528 | www.khidmat-e-alam.org`,
      englishText: `Verified Impact Report: ${camp.name} (${camp.location})
• Total Patients: ${camp.patientsServed} (Children: ${camp.demographics.children}, Female: ${camp.demographics.female})
• Medicines Dispensed: ${camp.medicinesDistributed} units
• Shariah Zakat Allocation: ${camp.financials.zakatPct}% (PKR ${camp.financials.zakatFund.toLocaleString()})
• Average Cost Per Beneficiary: PKR ${camp.financials.costPerPatient}

100% of Zakat was spent on essential therapeutic medicines.
Contact: 351, Usmania Society, B Road, Nazimabad, Karachi | UAN: 1111528 | www.khidmat-e-alam.org`,
      callToAction: 'Support rural and underprivileged free medical camps. 100% Zakat eligible.',
      hashtags: ['#KhidmatEAlam', '#MedicalCampReport', '#FreeMedicine', '#ZakatAudited', '#KarachiRelief'],
      assignedTo: 'Bilal Khan',
      visualPrompt: `Create a professional NGO healthcare impact infographic for Khidmat-e-Alam Welfare Trust. Title: "${camp.name} Report". Bold stat badges: ${camp.patientsServed} Patients, ${camp.medicinesDistributed} Medicines, ${camp.financials.zakatPct}% Zakat funded. Clean deep medical red and navy aesthetic with official KAWT logo and UAN 1111528.`,
      targetAudience: 'Philanthropists, Zakat donors, overseas Pakistanis',
      topics: ['Free Camp', 'Medical', 'Zakat'],
    };

    setPosts((prev) => [newPost, ...prev]);
    setEditingPost(newPost);
    setShowPostModal(true);
  };

  // Auto-tag all posts action
  const handleAutoTagAllPosts = () => {
    setPosts((prev) =>
      prev.map((p) => {
        const detected = autoTagPostContent(p);
        return {
          ...p,
          topics: detected,
        };
      })
    );
    notify(`Auto-tagged all ${posts.length} posts across defined healthcare & charity topics!`);
  };

  // Update specific post topics
  const handleUpdatePostTopics = (postId: string, newTopics: DefinedTopic[]) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, topics: newTopics } : p))
    );
  };

  // Fast edit single post with Gemini
  const handleFastEditWithGemini = async (post: Post, promptInstruction: string) => {
    notify('Gemini is refining copy...');
    try {
      const res = await geminiService.generatePostCopy({
        topic: post.title,
        platform: post.platform,
        tone: 'Transparent, Humanitarian, Dignified',
        zakatEligible: true,
        campaignFocus: post.campaignName,
        specificStats: promptInstruction,
      });

      if (res.data) {
        setPosts((prev) =>
          prev.map((p) => {
            if (p.id === post.id) {
              return {
                ...p,
                urduText: res.data.urduText || p.urduText,
                englishText: res.data.englishText || p.englishText,
                hook: res.data.hook || p.hook,
                callToAction: res.data.callToAction || p.callToAction,
                hashtags: res.data.hashtags || p.hashtags,
              };
            }
            return p;
          })
        );
        notify('Post successfully refined with Gemini!');
      }
    } catch (err: any) {
      notify(err.message || 'Gemini edit failed');
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    notify('Post removed');
  };

  // Task Handlers
  const handleAddTask = (newTask: Omit<TaskItem, 'id'>) => {
    const task: TaskItem = {
      ...newTask,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [task, ...prev]);
    notify('New creative task assigned');
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskItem['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    notify(`Task status moved to ${newStatus}`);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    notify('Task removed');
  };

  return (
    <div className="app">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--sep)] shadow-lg text-[13px] font-medium text-[var(--ink)] animate-fade-in">
          <Sparkles className="w-4 h-4 text-[var(--red)]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-[var(--muted)] hover:text-[var(--ink)]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        postCount={posts.length}
      />

      {/* Main Content Pane */}
      <main className="main">
        <Topbar
          currentView={currentView}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenQuickAi={() => setCurrentView('prompts')}
          onOpenMonthlyCalendar={() => setCurrentView('monthly-calendar')}
          onOpenNewPost={() => {
            setEditingPost(null);
            setPostDefaultDate('2026-09-24');
            setShowPostModal(true);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="content">
          {/* Executive Overview */}
          {currentView === 'overview' && (
            <OverviewView
              posts={displayedPosts}
              campaigns={campaigns}
              opdClinics={opdClinics}
              onSelectView={setCurrentView}
              onOpenNewPost={() => {
                setEditingPost(null);
                setShowPostModal(true);
              }}
              onOpenQuickAi={(initialPrompt) => {
                setCurrentView('prompts');
              }}
              onSelectPost={(post) => {
                setCurrentView('daily');
              }}
              onNotify={notify}
              onAutoTagAll={handleAutoTagAllPosts}
            />
          )}

          {/* Branded Templates & AI Image Studio */}
          {currentView === 'branded-templates' && (
            <BrandedTemplateStudio
              onNotify={notify}
              onDeployToPost={(title, format, promptText) => {
                const newPost: Post = {
                  id: `post-${Date.now()}`,
                  title: `${title} (Branded Graphic)`,
                  date: '2026-10-02',
                  time: '11:00 AM',
                  platform: format === 'Carousel' ? 'instagram' : 'facebook',
                  status: 'Scheduled',
                  format: format as any,
                  campaignId: 'camp-1',
                  campaignName: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
                  hook: title,
                  urduText: `خدمتِ عالم ویلفیئر ٹرسٹ کے تحت مفت میڈیکل کیمپ: ${title}۔ مستحق مریضوں کا مفت علاج اور مفت ادویات۔ UAN: 1111528`,
                  englishText: `Khidmat-e-Alam Welfare Trust: ${title}. 100% Free Consultation and Essential Medicines for Deserving Patients. Central Hospital: 351 Usmania Society, B Road, Nazimabad Karachi. UAN: 1111528.`,
                  callToAction: 'Support rural and underprivileged free medical camps. 100% Zakat eligible. UAN: 1111528.',
                  hashtags: ['#KhidmatEAlam', '#KAWT', '#FreeMedicalCamp', '#ZakatAudited', '#KarachiHealthcare'],
                  assignedTo: 'Fatima Zahra',
                  visualPrompt: promptText,
                  targetAudience: 'Community, patients, and philanthropists',
                  topics: autoTagPostContent({
                    title,
                    englishText: title,
                    hook: title,
                    campaignName: 'Free Medical Camps 2026 (Karachi, Hub & Thatta)',
                  }),
                  metrics: { views: 0, likes: 0, shares: 0, comments: 0, donationsLinked: 0 },
                };
                setPosts((prev) => [newPost, ...prev]);
                setCurrentView('daily');
              }}
            />
          )}

          {/* Monthly Content Calendar (30-day plan requested by user) */}
          {currentView === 'monthly-calendar' && (
            <MonthlyCalendarView
              onSchedulePost={handleSchedulePostFromCalendar}
              onNotify={notify}
            />
          )}

          {/* Visual Creative Studio (AI prompts, carousels, reel scripts) */}
          {currentView === 'visual-studio' && (
            <VisualCreativeView
              onNotify={notify}
              onDeployToTask={(title, cat) => {
                handleAddTask({
                  title,
                  category: cat,
                  assignedTo: 'Fatima Zahra',
                  role: 'Content Creator',
                  priority: 'High',
                  status: 'Draft',
                  dueDate: '2026-10-05',
                });
              }}
            />
          )}

          {/* Doctors Roster & Free Medical Camps Archive */}
          {currentView === 'doctors-camps' && (
            <CampsAndDoctorsView
              onGeneratePostForDoctor={handleGeneratePostForDoctor}
              onGeneratePostForCamp={handleGeneratePostForCamp}
              onNotify={notify}
            />
          )}

          {/* Daily Post Planner */}
          {currentView === 'daily' && (
            <DailyView
              posts={displayedPosts}
              onOpenNewPost={() => {
                setEditingPost(null);
                setShowPostModal(true);
              }}
              onEditPost={(p) => {
                setEditingPost(p);
                setShowPostModal(true);
              }}
              onDeletePost={handleDeletePost}
              onFastEditWithGemini={handleFastEditWithGemini}
              onAuditWithGemini={(p) => setAuditingPost(p)}
              onNotify={notify}
              onUpdatePostTopics={handleUpdatePostTopics}
            />
          )}

          {/* Calendar Grid View */}
          {currentView === 'calendar' && (
            <CalendarView
              posts={displayedPosts}
              onOpenNewPostWithDate={(d) => {
                setEditingPost(null);
                setPostDefaultDate(d);
                setShowPostModal(true);
              }}
              onSelectPost={(p) => {
                setEditingPost(p);
                setShowPostModal(true);
              }}
            />
          )}

          {/* Welfare Campaigns */}
          {currentView === 'campaigns' && (
            <CampaignsView
              campaigns={campaigns}
              posts={posts}
              onOpenNewPost={() => {
                setEditingPost(null);
                setShowPostModal(true);
              }}
              onNotify={notify}
            />
          )}

          {/* Free OPD Clinics */}
          {currentView === 'opd' && (
            <OpdView opdClinics={opdClinics} onNotify={notify} />
          )}

          {/* Gemini AI Studio */}
          {currentView === 'prompts' && (
            <PromptsView
              campaigns={campaigns}
              onAddPostFromAi={(aiPost) => {
                const newId = `post-${Date.now()}`;
                setPosts((prev) => [{ ...aiPost, id: newId }, ...prev]);
                setCurrentView('daily');
              }}
              onNotify={notify}
            />
          )}

          {/* Production Tasks */}
          {currentView === 'tasks' && (
            <TaskDashboardView
              tasks={tasks}
              teamMembers={teamMembers}
              onAddTask={handleAddTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onDeleteTask={handleDeleteTask}
              onNotify={notify}
            />
          )}

          {/* Team Roster */}
          {currentView === 'team' && (
            <TeamView teamMembers={teamMembers} onNotify={notify} />
          )}

          {/* Analytics */}
          {currentView === 'analytics' && (
            <AnalyticsView posts={posts} campaigns={campaigns} onNotify={notify} />
          )}

          {/* Brand Kit & Policies */}
          {currentView === 'brief' && <BriefView onNotify={notify} />}

          {/* Printable Run Sheet */}
          {currentView === 'print' && (
            <PrintView posts={posts} campaigns={campaigns} opdClinics={opdClinics} />
          )}
        </div>
      </main>

      {/* Post Creator / Editor Modal */}
      {showPostModal && (
        <PostModal
          postToEdit={editingPost}
          defaultDate={postDefaultDate}
          campaigns={campaigns}
          teamMembers={teamMembers}
          onSave={handleSavePost}
          onClose={() => {
            setShowPostModal(false);
            setEditingPost(null);
          }}
          onNotify={notify}
        />
      )}

      {/* Post Dignity & Zakat Audit Modal */}
      {auditingPost && (
        <AuditModal
          post={auditingPost}
          onClose={() => setAuditingPost(null)}
          onApplyRewrite={(newUrdu, newEnglish) => {
            if (newUrdu || newEnglish) {
              setPosts((prev) =>
                prev.map((p) => {
                  if (p.id === auditingPost.id) {
                    return {
                      ...p,
                      urduText: newUrdu || p.urduText,
                      englishText: newEnglish || p.englishText,
                    };
                  }
                  return p;
                })
              );
              notify('Applied rewritten copy to post');
            }
          }}
          onNotify={notify}
        />
      )}
    </div>
  );
}
