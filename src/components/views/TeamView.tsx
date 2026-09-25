import React from 'react';
import { TeamMember } from '../../data/seedData';
import { Users, Mail, Phone, CheckCircle, Clock, ShieldCheck, Briefcase } from 'lucide-react';

interface TeamViewProps {
  teamMembers: TeamMember[];
  onNotify: (msg: string) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ teamMembers, onNotify }) => {
  return (
    <div className="view space-y-6">
      {/* Head */}
      <div className="head">
        <div>
          <span className="eyebrow">Content Operations Guild</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Creative Team & Roles</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Dedicated copywriters, graphic designers, video editors, and Shariah compliance officers managing KAWT communication.
          </p>
        </div>
      </div>

      {/* Team Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="card p-5 space-y-4 hover:border-[var(--sep)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="avatar w-12 h-12 text-white font-bold text-base flex-none"
                  style={{ backgroundColor: member.avatarColor }}
                >
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[15.5px] text-[var(--ink)] truncate">{member.name}</h3>
                  <div className="text-[12px] text-[var(--muted)] flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{member.department}</span>
                  </div>
                </div>
              </div>

              <div className="text-[12.5px] font-semibold text-[var(--ink2)] bg-[var(--card2)] p-2.5 rounded-xl border border-[var(--sep2)]">
                {member.role}
              </div>

              <div className="space-y-1.5 text-[12px] text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-none" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-none" />
                  <span>{member.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--sep2)] flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-1.5 text-[var(--amber)] font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{member.activeTasks} Active Tasks</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--green)] font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{member.completedTasks} Done</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
