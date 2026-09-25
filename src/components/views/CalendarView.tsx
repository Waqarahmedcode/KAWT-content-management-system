import React, { useState } from 'react';
import { Post } from '../../data/seedData';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Calendar as CalendarIcon,
  X,
  ArrowRight,
} from 'lucide-react';

interface CalendarViewProps {
  posts: Post[];
  onOpenNewPostWithDate: (date: string) => void;
  onSelectPost: (post: Post) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  posts,
  onOpenNewPostWithDate,
  onSelectPost,
}) => {
  // Current view year & month (Default September 2026 based on seed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 0-indexed: 8 is September
  const [selectedDayDate, setSelectedDayDate] = useState<string | null>('2026-09-24');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Build calendar matrix
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday, 1 is Monday
  // Adjust to start on Monday:
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const totalCells = Math.ceil((daysInMonth + startOffset) / 7) * 7;

  const calendarDays = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - startOffset + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      const monthStr = String(currentMonth + 1).padStart(2, '0');
      const dayStr = String(dayNumber).padStart(2, '0');
      const dateString = `${currentYear}-${monthStr}-${dayStr}`;
      const dayPosts = posts.filter((p) => p.date === dateString);
      calendarDays.push({
        dayNumber,
        dateString,
        isCurrentMonth: true,
        posts: dayPosts,
      });
    } else {
      calendarDays.push({
        dayNumber: null,
        dateString: '',
        isCurrentMonth: false,
        posts: [],
      });
    }
  }

  const selectedPosts = posts.filter((p) => p.date === selectedDayDate);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook': return '#1877F2';
      case 'instagram': return '#D62F6E';
      case 'linkedin': return '#0A66C2';
      case 'tiktok': return '#1B1B1F';
      case 'youtube': return '#E4120A';
      default: return '#767C88';
    }
  };

  return (
    <div className="view space-y-5">
      {/* Top Header */}
      <div className="head">
        <div>
          <span className="eyebrow">Editorial Rhythm</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Content Calendar</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Plan, balance, and schedule multi-channel releases across health awareness and welfare milestones.
          </p>
        </div>

        <div className="row flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[var(--card)] border border-[var(--sep)] rounded-xl p-1 shadow-sm">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-[var(--card2)] text-[var(--ink)]"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-[14px] px-3 text-[var(--ink)]">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-[var(--card2)] text-[var(--ink)]"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onOpenNewPostWithDate(selectedDayDate || '2026-09-24')}
            className="btn primary"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Calendar Grid (8 cols) + Day Details Drawer (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Calendar Matrix (8 cols) */}
        <div className="lg:col-span-8 card p-4">
          <div className="cal">
            {/* Weekdays */}
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((wd) => (
              <div key={wd} className="wd text-center font-bold">
                {wd}
              </div>
            ))}

            {/* Day Cells */}
            {calendarDays.map((cell, idx) => {
              if (!cell.isCurrentMonth || !cell.dayNumber) {
                return <div key={idx} className="day out bg-[var(--card2)]/40 opacity-30"></div>;
              }

              const isSelected = selectedDayDate === cell.dateString;
              const isToday = cell.dateString === '2026-09-24';

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDayDate(cell.dateString)}
                  className={`day text-left flex flex-col justify-between ${
                    isSelected ? 'ring-2 ring-[var(--red)] bg-[var(--card)] shadow-md' : ''
                  } ${isToday ? 'today' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`num font-semibold ${isToday ? 'bg-[var(--red)] text-white' : ''}`}>
                      {cell.dayNumber}
                    </span>
                    {cell.posts.length > 0 && (
                      <span className="text-[10px] font-bold text-[var(--muted)]">
                        {cell.posts.length}
                      </span>
                    )}
                  </div>

                  {/* Post Badges */}
                  <div className="space-y-1 w-full my-1 overflow-hidden">
                    {cell.posts.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        className="ev truncate text-[10.5px] px-1.5 py-0.5 rounded font-medium flex items-center gap-1"
                        style={{
                          backgroundColor: `${getPlatformColor(p.platform)}18`,
                          color: getPlatformColor(p.platform),
                        }}
                        title={p.title}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-none"
                          style={{ backgroundColor: getPlatformColor(p.platform) }}
                        ></span>
                        <span className="truncate">{p.title}</span>
                      </div>
                    ))}
                    {cell.posts.length > 2 && (
                      <div className="text-[9.5px] text-[var(--muted)] font-semibold pl-1">
                        +{cell.posts.length - 2} more
                      </div>
                    )}
                  </div>

                  <div className="cnt text-[10px] text-[var(--muted)]">
                    {isToday && <span className="text-[var(--red)] font-semibold">Today</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Inspector (4 cols) */}
        <div className="lg:col-span-4 card p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--sep2)] pb-3">
            <div>
              <div className="eyebrow">Day Schedule</div>
              <h3 className="font-bold text-[16px] text-[var(--ink)]">
                {selectedDayDate || 'Select a day'}
              </h3>
            </div>
            <button
              onClick={() => onOpenNewPostWithDate(selectedDayDate || '2026-09-24')}
              className="btn sm green text-white"
              title="Add post on this date"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {selectedPosts.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <CalendarIcon className="w-8 h-8 text-[var(--muted)] mx-auto opacity-50" />
              <div className="text-[13px] text-[var(--muted)]">No posts scheduled on this date.</div>
              <button
                onClick={() => onOpenNewPostWithDate(selectedDayDate || '2026-09-24')}
                className="btn sm primary inline-flex"
              >
                Schedule Content
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] hover:border-[var(--sep)] cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11.5px]">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getPlatformColor(post.platform) }}
                      ></span>
                      <span style={{ color: getPlatformColor(post.platform) }}>
                        {post.platform}
                      </span>
                    </div>
                    <span className="text-[var(--muted)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.time}</span>
                    </span>
                  </div>

                  <h4 className="font-semibold text-[13.5px] text-[var(--ink)] group-hover:text-[var(--red)] transition-colors">
                    {post.title}
                  </h4>

                  <p className="text-[12px] text-[var(--ink2)] line-clamp-2">
                    {post.hook}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[var(--muted)] pt-2 border-t border-[var(--sep2)]">
                    <span>{post.campaignName}</span>
                    <span className="text-[var(--red)] font-medium flex items-center gap-0.5">
                      View Post <ArrowRight className="w-3 h-3" />
                    </span>
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
