import React from 'react';
import { ViewMode } from './Sidebar';
import { Sparkles, Moon, Sun, Plus, Search, Calendar, FileSpreadsheet } from 'lucide-react';

interface TopbarProps {
  currentView: ViewMode;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenQuickAi: () => void;
  onOpenMonthlyCalendar: () => void;
  onOpenNewPost: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentView,
  theme,
  onToggleTheme,
  onOpenQuickAi,
  onOpenMonthlyCalendar,
  onOpenNewPost,
  searchQuery,
  onSearchChange,
}) => {
  const titles: Record<ViewMode, { title: string; meta: string }> = {
    overview: { title: 'Executive Overview', meta: 'Weekly Content Health & Campaign Impact' },
    'branded-templates': { title: 'Branded Templates & AI Image Studio', meta: 'Medical Camp Headers, Carousel Frames & Gemini 3.1 Synthesis' },
    'monthly-calendar': { title: 'Monthly Content Calendar', meta: 'Full 30-Day Multi-Platform Release Schedule' },
    'visual-studio': { title: 'Visual Creative Studio', meta: 'AI Image Prompts, Carousel Layouts & Reel Scripts' },
    'doctors-camps': { title: 'Doctors & Camps Data', meta: '15 Specialists & 2026 Free Medical Camps Roster' },
    daily: { title: 'Daily Post Planner', meta: 'Multi-Channel Timeline & Urdu/English Copy' },
    calendar: { title: 'Calendar Grid', meta: 'Monthly Schedule & Awareness Days' },
    campaigns: { title: 'Welfare Campaigns', meta: 'Donation Appeals, Targets & Strategy' },
    opd: { title: 'Free OPD & Medical Camps', meta: 'Hospital Timetables & Patient Notices' },
    prompts: { title: 'Gemini AI Studio', meta: 'Bilingual Copywriting, Tone & Zakat Audit' },
    tasks: { title: 'Production Tasks', meta: 'Graphic Design, Video & Approval Workflow' },
    team: { title: 'Creative Team Roster', meta: 'Roles, Responsibilities & Assignments' },
    analytics: { title: 'Impact Analytics', meta: 'Engagement, Reach & Donor Conversions' },
    brief: { title: 'Brand Kit & Policy', meta: 'Verified Bank Accounts & Zakat Charter' },
    print: { title: 'Printable Run-Sheet', meta: 'Weekly Trustee & Team Distribution' },
  };

  const current = titles[currentView] || { title: 'Content Studio', meta: '' };

  return (
    <div className="topbar select-none">
      <div className="crumb min-w-0">
        <b className="truncate text-[14px] text-[var(--ink)]">{current.title}</b>
        <span className="hidden sm:inline-block text-[12px] text-[var(--muted)] truncate">· {current.meta}</span>
      </div>

      <div className="row flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block w-44 lg:w-56">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
          <input
            type="text"
            placeholder="Search copy, camp..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="text-[12px] py-1.5 pl-8 pr-2 rounded-lg bg-[var(--card2)] border border-[var(--sep)] w-full focus:outline-none"
          />
        </div>

        {/* Dedicated "Monthly Content Calendar" Button (Requested Feature) */}
        <button
          onClick={onOpenMonthlyCalendar}
          className={`btn sm flex items-center gap-1.5 transition-all ${
            currentView === 'monthly-calendar'
              ? 'bg-[var(--red)] text-white border-[var(--red)]'
              : 'hover:border-[var(--red)] text-[var(--ink)]'
          }`}
          title="Open Complete Monthly Content Plan"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--red)]" />
          <span className="font-semibold text-[11.5px]">Monthly Content Calendar</span>
        </button>

        {/* Quick AI Action button */}
        <button
          onClick={onOpenQuickAi}
          className="btn sm flex items-center gap-1.5 bg-gradient-to-r from-[var(--card)] to-[var(--red-soft)] border-[var(--sep)] hover:border-[var(--red)] text-[var(--ink)]"
          title="Open Gemini AI Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--red)]" />
          <span className="font-semibold text-[11.5px] hidden sm:inline">AI Studio</span>
        </button>

        {/* New Post button */}
        <button
          onClick={onOpenNewPost}
          className="btn sm green text-white flex items-center gap-1"
          title="Create New Social Post"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="font-semibold text-[11.5px]">New Post</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="iconbtn"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
