import React from 'react';
import { Post, Campaign, OpdClinic, BRAND_KIT } from '../../data/seedData';
import { Printer, ShieldCheck, Calendar, Clock, Stethoscope, HeartHandshake } from 'lucide-react';

interface PrintViewProps {
  posts: Post[];
  campaigns: Campaign[];
  opdClinics: OpdClinic[];
}

export const PrintView: React.FC<PrintViewProps> = ({ posts, campaigns, opdClinics }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="view space-y-6">
      {/* Head */}
      <div className="head no-print">
        <div>
          <span className="eyebrow">Weekly Executive Run-Sheet</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Printable Content & Ops Summary</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Formatted for weekly trustee meetings, medical directors, and offline editorial review.
          </p>
        </div>

        <div className="row">
          <button onClick={handlePrint} className="btn primary flex items-center gap-1.5">
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="card p-8 bg-white text-black space-y-6 shadow-sm border border-neutral-200">
        {/* Header */}
        <div className="border-b-2 border-neutral-900 pb-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Khidmat-e-Alam Welfare Trust (KAWT)
            </h1>
            <div className="text-sm font-medium text-neutral-600">
              Content Studio Production Run-Sheet · September/October 2026
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              {BRAND_KIT.registrationNo} · {BRAND_KIT.taxExemption}
            </div>
          </div>
          <div className="text-right text-xs text-neutral-600">
            <div>Generated: {new Date().toLocaleDateString('en-GB')}</div>
            <div>Helpline: {BRAND_KIT.helpline}</div>
            <div>Official: {BRAND_KIT.officialWebsite}</div>
          </div>
        </div>

        {/* Section 1: Welfare Campaigns Snapshot */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-300 pb-1 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <span>1. Active Welfare Campaigns & Zakat Funds</span>
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-400 bg-neutral-100 font-bold">
                <th className="py-1.5 px-2">Campaign Title</th>
                <th className="py-1.5 px-2">Category</th>
                <th className="py-1.5 px-2">Target (PKR)</th>
                <th className="py-1.5 px-2">Raised (PKR)</th>
                <th className="py-1.5 px-2">Status</th>
                <th className="py-1.5 px-2">Zakat OK</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-neutral-200">
                  <td className="py-1.5 px-2 font-semibold">{c.title}</td>
                  <td className="py-1.5 px-2">{c.category}</td>
                  <td className="py-1.5 px-2 font-mono">{(c.targetAmount / 1000).toLocaleString()}k</td>
                  <td className="py-1.5 px-2 font-mono font-bold">{(c.raisedAmount / 1000).toLocaleString()}k</td>
                  <td className="py-1.5 px-2">{c.status}</td>
                  <td className="py-1.5 px-2 font-semibold text-emerald-800">
                    {c.zakatEligible ? 'Yes (100%)' : 'General'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2: Social Media Content Schedule */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-300 pb-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-rose-700" />
            <span>2. Scheduled Multi-Channel Content Release</span>
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-400 bg-neutral-100 font-bold">
                <th className="py-1.5 px-2">Date & Time</th>
                <th className="py-1.5 px-2">Platform</th>
                <th className="py-1.5 px-2">Post Title & Concept</th>
                <th className="py-1.5 px-2">Assigned To</th>
                <th className="py-1.5 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-neutral-200">
                  <td className="py-1.5 px-2 whitespace-nowrap font-mono">
                    {p.date} · {p.time}
                  </td>
                  <td className="py-1.5 px-2 uppercase font-semibold text-[11px]">{p.platform}</td>
                  <td className="py-1.5 px-2">
                    <div className="font-bold">{p.title}</div>
                    <div className="text-[11px] text-neutral-600 line-clamp-1">{p.hook}</div>
                  </td>
                  <td className="py-1.5 px-2">{p.assignedTo}</td>
                  <td className="py-1.5 px-2 font-semibold">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Hospital Free OPD Timetable */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-300 pb-1 flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-blue-700" />
            <span>3. Free OPD Clinics & Patient Schedule</span>
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-400 bg-neutral-100 font-bold">
                <th className="py-1.5 px-2">Clinic & Specialty</th>
                <th className="py-1.5 px-2">Consultant In-Charge</th>
                <th className="py-1.5 px-2">Days & Timings</th>
                <th className="py-1.5 px-2">Daily Cap</th>
                <th className="py-1.5 px-2">Notice / Alert</th>
              </tr>
            </thead>
            <tbody>
              {opdClinics.map((o) => (
                <tr key={o.id} className="border-b border-neutral-200">
                  <td className="py-1.5 px-2 font-semibold">{o.name}</td>
                  <td className="py-1.5 px-2">{o.doctorName}</td>
                  <td className="py-1.5 px-2 font-mono">
                    {o.days} ({o.timings})
                  </td>
                  <td className="py-1.5 px-2">{o.dailyCapacity} pts</td>
                  <td className="py-1.5 px-2 text-[11px] text-neutral-700 italic">
                    {o.urgentAlert || 'Standard Routine'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signatures */}
        <div className="pt-8 border-t border-neutral-300 flex justify-between text-xs text-neutral-700">
          <div>
            <div className="border-t border-neutral-500 w-44 pt-1 font-semibold">
              Content Strategist Signature
            </div>
          </div>
          <div>
            <div className="border-t border-neutral-500 w-44 pt-1 font-semibold">
              Shariah Advisor Signature
            </div>
          </div>
          <div>
            <div className="border-t border-neutral-500 w-44 pt-1 font-semibold">
              Managing Trustee Signature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
