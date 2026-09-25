import React, { useState } from 'react';
import { BRAND_KIT } from '../../data/seedData';
import {
  BookOpen,
  Copy,
  Check,
  Building,
  ShieldCheck,
  CheckCircle2,
  FileText,
  CreditCard,
  Phone,
  Globe,
} from 'lucide-react';

interface BriefViewProps {
  onNotify: (msg: string) => void;
}

export const BriefView: React.FC<BriefViewProps> = ({ onNotify }) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(title);
    onNotify(`Copied ${title} to clipboard`);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="view space-y-6">
      {/* Head */}
      <div className="head">
        <div>
          <span className="eyebrow">Institutional Standards & Legal Framework</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Brand Kit & Donor Policy</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Verified bank accounts, Shariah compliance charter, and official copy snippets for all KAWT communication.
          </p>
        </div>
      </div>

      {/* Trust Registration & Helplines Banner */}
      <div className="card p-5 bg-gradient-to-r from-[var(--card)] via-[var(--card2)] to-[var(--card)] border border-[var(--sep)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider block">
              Legal Non-Profit Registration
            </span>
            <div className="font-bold text-[var(--ink)]">{BRAND_KIT.registrationNo}</div>
            <div className="text-[11.5px] text-[var(--green)] font-medium">{BRAND_KIT.taxExemption}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider block">
              Helpline & Emergency Contact
            </span>
            <div className="font-bold text-[var(--ink)] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[var(--red)]" />
              <span>{BRAND_KIT.helpline}</span>
            </div>
            <div className="text-[11.5px] text-[var(--muted)]">24/7 Ambulance & Patient Desks</div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider block">
              Official Portal & Transparency
            </span>
            <div className="font-bold text-[var(--blue)] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>{BRAND_KIT.officialWebsite}</span>
            </div>
            <div className="text-[11.5px] text-[var(--muted)]">Audited Financial Reports Available</div>
          </div>
        </div>
      </div>

      {/* Verified Bank Accounts (1-Click Copy for Social Posts) */}
      <div className="card p-5 space-y-4">
        <div className="card-h">
          <div>
            <h3 className="font-bold text-[16px] text-[var(--ink)]">
              Verified Banking Channels (Zakat & Donations)
            </h3>
            <p className="text-[12px] text-[var(--muted)]">
              Copy directly into social captions and WhatsApp broadcasts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BRAND_KIT.accounts.map((acc, i) => {
            const formatted = `Bank: ${acc.bank}\nAccount Title: ${acc.title}\nAccount No: ${acc.accountNo}\nIBAN: ${acc.iban}\nBranch: ${acc.branch}`;
            return (
              <div
                key={i}
                className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-2.5 relative group hover:border-[var(--sep)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-[14px] text-[var(--ink)]">
                    <CreditCard className="w-4 h-4 text-[var(--red)]" />
                    <span>{acc.bank}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(formatted, acc.bank)}
                    className="btn sm flex items-center gap-1 text-[11.5px]"
                  >
                    {copiedAccount === acc.bank ? (
                      <Check className="w-3.5 h-3.5 text-[var(--green)]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy Info</span>
                  </button>
                </div>

                <div className="space-y-1 text-[12px] font-mono text-[var(--ink2)]">
                  <div>
                    <span className="text-[var(--muted)] font-sans">Title: </span>
                    <b>{acc.title}</b>
                  </div>
                  <div>
                    <span className="text-[var(--muted)] font-sans">A/C: </span>
                    <b className="text-[var(--ink)]">{acc.accountNo}</b>
                  </div>
                  <div className="truncate">
                    <span className="text-[var(--muted)] font-sans">IBAN: </span>
                    <span>{acc.iban}</span>
                  </div>
                  <div className="text-[11px] text-[var(--muted)] font-sans pt-1">
                    {acc.branch}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shariah & Ethical Editorial Guidelines */}
      <div className="card p-5 space-y-4">
        <h3 className="font-bold text-[16px] text-[var(--ink)]">
          Core Editorial & Shariah Guidelines
        </h3>

        <div className="space-y-3">
          {BRAND_KIT.guidelines.map((g, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] text-[13px] text-[var(--ink2)]"
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--green)] flex-none mt-0.5" />
              <span>{g}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
