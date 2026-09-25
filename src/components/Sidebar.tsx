import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Calendar,
  HeartHandshake,
  Stethoscope,
  Sparkles,
  CheckSquare,
  Users,
  BarChart3,
  BookOpen,
  Printer,
  ShieldCheck,
  Palette,
  FileSpreadsheet,
  Award,
} from 'lucide-react';

import { KawtLogo } from './KawtLogo';

export type ViewMode =
  | 'overview'
  | 'monthly-calendar'
  | 'visual-studio'
  | 'branded-templates'
  | 'doctors-camps'
  | 'daily'
  | 'calendar'
  | 'campaigns'
  | 'opd'
  | 'prompts'
  | 'tasks'
  | 'team'
  | 'analytics'
  | 'brief'
  | 'print';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  postCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView, postCount }) => {
  const mainNavItems = [
    { id: 'overview' as ViewMode, label: 'Overview', icon: LayoutDashboard },
    { id: 'branded-templates' as ViewMode, label: 'Branded Templates & AI', icon: Palette, badge: 'New', highlight: true },
    { id: 'monthly-calendar' as ViewMode, label: 'Monthly Calendar', icon: FileSpreadsheet, badge: '31 Days', highlight: true },
    { id: 'visual-studio' as ViewMode, label: 'Visual Creative Studio', icon: Sparkles },
    { id: 'doctors-camps' as ViewMode, label: 'Doctors & Camps Data', icon: Stethoscope, badge: '15 Docs' },
    { id: 'daily' as ViewMode, label: 'Daily Planner', icon: CalendarDays, badge: postCount },
    { id: 'calendar' as ViewMode, label: 'Calendar Grid', icon: Calendar },
  ];

  const welfareNavItems = [
    { id: 'campaigns' as ViewMode, label: 'Welfare Campaigns', icon: HeartHandshake },
    { id: 'opd' as ViewMode, label: 'OPD Clinics & Notice', icon: Award },
    { id: 'prompts' as ViewMode, label: 'Gemini AI Studio', icon: Sparkles },
    { id: 'tasks' as ViewMode, label: 'Task Workflow', icon: CheckSquare },
  ];

  const adminNavItems = [
    { id: 'team' as ViewMode, label: 'Creative Team', icon: Users },
    { id: 'analytics' as ViewMode, label: 'Impact Analytics', icon: BarChart3 },
    { id: 'brief' as ViewMode, label: 'Brand Kit & Policy', icon: BookOpen },
    { id: 'print' as ViewMode, label: 'Print Run-Sheet', icon: Printer },
  ];

  return (
    <aside className="side select-none overflow-y-auto">
      {/* Brand */}
      <div className="brand cursor-pointer" onClick={() => onSelectView('overview')}>
        <div aria-hidden="true" className="mark bg-transparent shadow-none p-0">
          <KawtLogo variant="emblem" size={32} />
        </div>
        <div>
          <b className="leading-tight text-[14px] block font-bold text-[var(--ink)]">KAWT Content Studio</b>
          <small className="text-[11px] text-[var(--muted)] flex items-center gap-1">
            <span>Khidmat-e-Alam Trust</span>
            <ShieldCheck className="w-3 h-3 text-[var(--green)] inline" />
          </small>
        </div>
      </div>

      {/* Prominent Monthly Content Calendar Action Button */}
      <div className="px-2 mb-3">
        <button
          onClick={() => onSelectView('monthly-calendar')}
          className={`w-full py-2 px-3 rounded-xl font-bold text-[12.5px] flex items-center justify-between transition-all ${
            currentView === 'monthly-calendar'
              ? 'bg-[var(--red)] text-white shadow-md'
              : 'bg-[var(--red-soft)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Monthly Calendar</span>
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/10">
            30 Days
          </span>
        </button>
      </div>

      {/* Main Content Planning */}
      <nav className="nav space-y-0.5">
        <div className="nav-label">Publishing & Creatives</div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center justify-between ${
                item.highlight && !isActive ? 'text-[var(--red)] font-semibold' : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--red)]' : ''}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[var(--red-soft)] text-[var(--red)]'
                      : 'bg-[var(--card2)] text-[var(--muted)]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="nav-label pt-3">Medical Operations</div>
        {welfareNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--red)]' : ''}`} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}

        <div className="nav-label pt-3">Governance & Standards</div>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--red)]' : ''}`} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Sync Footer */}
      <div className="side-foot border-t border-[var(--sep2)] pt-3 mt-4 text-[11.5px]">
        <div className="sync">
          <span className="dot on" />
          <span>Gemini AI Connected</span>
        </div>
        <span className="font-mono text-[10.5px] text-[var(--muted)]">UAN: 1111528</span>
      </div>
    </aside>
  );
};
