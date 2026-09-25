import React, { useState } from 'react';
import { Post, Campaign } from '../../data/seedData';
import {
  BarChart3,
  TrendingUp,
  Share2,
  Heart,
  Eye,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface AnalyticsViewProps {
  posts: Post[];
  campaigns: Campaign[];
  onNotify: (msg: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ posts, campaigns, onNotify }) => {
  // Aggregate metrics
  const totalViews = posts.reduce((acc, p) => acc + (p.metrics?.views || 1200), 0);
  const totalLikes = posts.reduce((acc, p) => acc + (p.metrics?.likes || 45), 0);
  const totalShares = posts.reduce((acc, p) => acc + (p.metrics?.shares || 12), 0);
  const totalDonationsLinked = posts.reduce((acc, p) => acc + (p.metrics?.donationsLinked || 0), 0);

  const platformBreakdown = [
    { name: 'Facebook', share: 44, color: '#1877F2', audience: 'Family donors, community leaders, local volunteers' },
    { name: 'Instagram', share: 28, color: '#D62F6E', audience: 'Youth, university societies, creative diaspora' },
    { name: 'LinkedIn', share: 14, color: '#0A66C2', audience: 'Corporate CSR heads, tech firms, bank executives' },
    { name: 'TikTok / Shorts', share: 14, color: '#1B1B1F', audience: 'Viral health education, young volunteers' },
  ];

  return (
    <div className="view space-y-6">
      {/* Head */}
      <div className="head">
        <div>
          <span className="eyebrow">Impact & Donor Conversion Metrics</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics & Performance</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Measuring social reach, audience empathy, and direct digital donations generated through transparent storytelling.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid g4">
        <div className="card stat">
          <div className="k">
            <Eye className="w-4 h-4 text-[var(--blue)]" />
            <span>Digital Impressions</span>
          </div>
          <div className="v font-mono">{(totalViews / 1000).toFixed(1)}K</div>
          <div className="n text-[var(--green)] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.6% vs last month</span>
          </div>
        </div>

        <div className="card stat">
          <div className="k">
            <Heart className="w-4 h-4 text-[var(--red)]" />
            <span>Engaged Supporters</span>
          </div>
          <div className="v font-mono">{(totalLikes + totalShares).toLocaleString()}</div>
          <div className="n text-[var(--ink2)]">
            Likes, comments & shares
          </div>
        </div>

        <div className="card stat">
          <div className="k">
            <Share2 className="w-4 h-4 text-[var(--green)]" />
            <span>Community Shares</span>
          </div>
          <div className="v font-mono">{totalShares.toLocaleString()}</div>
          <div className="n text-[var(--muted)]">
            WhatsApp & social forwards
          </div>
        </div>

        <div className="card stat">
          <div className="k">
            <DollarSign className="w-4 h-4 text-[var(--amber)]" />
            <span>Tracked Digital Donations</span>
          </div>
          <div className="v font-mono">PKR {(totalDonationsLinked / 1000).toFixed(0)}K</div>
          <div className="n text-[var(--green)]">
            Directly from social appeals
          </div>
        </div>
      </div>

      {/* 2-col analytics breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Share */}
        <div className="card p-5 space-y-4">
          <div className="card-h">
            <div>
              <h3 className="font-bold text-[16px] text-[var(--ink)]">Channel Distribution</h3>
              <p className="text-[12px] text-[var(--muted)]">Share of donor inquiries by platform</p>
            </div>
          </div>

          <div className="space-y-4">
            {platformBreakdown.map((p) => (
              <div key={p.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-[12.5px]">
                  <span className="font-semibold text-[var(--ink)] flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    ></span>
                    {p.name}
                  </span>
                  <span className="font-mono text-[var(--muted)] font-semibold">{p.share}%</span>
                </div>
                <div className="bar">
                  <i
                    style={{
                      width: `${p.share}%`,
                      backgroundColor: p.color,
                    }}
                  ></i>
                </div>
                <div className="text-[11.5px] text-[var(--muted)]">{p.audience}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gemini AI Strategic Content Advisor */}
        <div className="card p-5 space-y-4 bg-gradient-to-br from-[var(--card)] via-[var(--card)] to-[var(--red-soft)] border border-[var(--sep)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--red-soft)] flex items-center justify-center text-[var(--red)]">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[var(--ink)]">Gemini Strategic Insights</h3>
              <p className="text-[12px] text-[var(--muted)]">Automated content optimization recommendations</p>
            </div>
          </div>

          <div className="space-y-3 text-[12.5px] text-[var(--ink2)] leading-relaxed">
            <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep2)] space-y-1">
              <b className="text-[var(--ink)] text-[13px] block">1. Peak Donor Conversion Window:</b>
              <span>
                Social donation link clicks spike significantly between <b>9:30 PM and 11:30 PM</b> on weeknights and <b>Friday 1:30 PM</b> following Jumma prayers. Schedule emergency cataract and dialysis appeals in this window.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep2)] space-y-1">
              <b className="text-[var(--ink)] text-[13px] block">2. Beneficiary Dignity Drives 3.2x Higher Trust:</b>
              <span>
                Posts showcasing patient recovery and smiles (like Baba Noor Muhammad) generated <b>320% more verified donations</b> than sensationalized distress photos. Donors strongly value respectful transparency.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--sep2)] space-y-1">
              <b className="text-[var(--ink)] text-[13px] block">3. Clear Zakat Cost-Breakdown:</b>
              <span>
                Carousels with explicit itemized costs (e.g. <i>"PKR 7,500 = 1 complete cataract lens + phaco surgery"</i>) convert 4x faster than general donation appeals.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
