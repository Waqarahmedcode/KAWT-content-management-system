import React, { useState } from 'react';
import { OpdClinic } from '../../data/seedData';
import { geminiService, OpdNoticeResult } from '../../services/geminiService';
import {
  Stethoscope,
  Sparkles,
  Clock,
  Calendar,
  MapPin,
  AlertTriangle,
  Users,
  CheckCircle,
  Copy,
  Check,
  Loader2,
  FileText,
  X,
} from 'lucide-react';

interface OpdViewProps {
  opdClinics: OpdClinic[];
  onNotify: (msg: string) => void;
}

export const OpdView: React.FC<OpdViewProps> = ({ opdClinics, onNotify }) => {
  const [selectedClinic, setSelectedClinic] = useState<OpdClinic>(opdClinics[0]);
  const [showAiNoticeModal, setShowAiNoticeModal] = useState(false);
  const [isGeneratingNotice, setIsGeneratingNotice] = useState(false);
  const [noticeResult, setNoticeResult] = useState<OpdNoticeResult | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleLaunchAiNotice = (clinic: OpdClinic) => {
    setSelectedClinic(clinic);
    setNoticeResult(null);
    setShowAiNoticeModal(true);
  };

  const handleGenerateNotice = async () => {
    setIsGeneratingNotice(true);
    try {
      const res = await geminiService.generateOpdNotice({
        clinicName: selectedClinic.name,
        doctorName: selectedClinic.doctorName,
        timing: selectedClinic.timings,
        days: selectedClinic.days,
        location: selectedClinic.location,
        specialServices: selectedClinic.services.join(', '),
        isFree: selectedClinic.isFree,
      });
      setNoticeResult(res.data);
      onNotify('Generated bilingual patient notice with Gemini!');
    } catch (err: any) {
      onNotify(err.message || 'Failed to generate medical notice');
    } finally {
      setIsGeneratingNotice(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    onNotify(`Copied ${type} to clipboard`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="view space-y-6">
      {/* Head */}
      <div className="head">
        <div>
          <span className="eyebrow">Free Healthcare Network</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Free OPD & Medical Clinics</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Daily hospital clinic schedules, specialist doctor rosters, and instant bilingual patient announcements.
          </p>
        </div>

        <div className="row">
          <button
            onClick={() => handleLaunchAiNotice(selectedClinic)}
            className="btn primary flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Patient Notice</span>
          </button>
        </div>
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {opdClinics.map((clinic) => {
          const isSelected = selectedClinic.id === clinic.id;
          return (
            <div
              key={clinic.id}
              onClick={() => setSelectedClinic(clinic)}
              className={`card p-5 space-y-4 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected ? 'border-[var(--red)] ring-2 ring-[var(--red-soft)]' : 'hover:border-[var(--sep)]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[var(--green-soft)] text-[var(--green)] px-2 py-0.5 rounded">
                    100% Free Service
                  </span>
                  <span className="text-[11px] text-[var(--muted)] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{clinic.dailyCapacity} pts/day</span>
                  </span>
                </div>

                <h3 className="font-bold text-[16px] text-[var(--ink)] leading-snug">{clinic.name}</h3>
                <div className="urdu text-[14px] text-[var(--muted)] font-medium">{clinic.urduName}</div>

                <div className="text-[12.5px] text-[var(--ink)] pt-1 font-semibold flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-[var(--red)]" />
                  <span>{clinic.doctorName}</span>
                </div>
                <div className="text-[11.5px] text-[var(--muted)]">{clinic.doctorTitle}</div>
              </div>

              {/* Schedule details */}
              <div className="space-y-2 pt-3 border-t border-[var(--sep2)] text-[12px]">
                <div className="flex items-center gap-2 text-[var(--ink2)]">
                  <Calendar className="w-3.5 h-3.5 text-[var(--muted)] flex-none" />
                  <span><b>Days:</b> {clinic.days}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--ink2)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--muted)] flex-none" />
                  <span><b>Timings:</b> {clinic.timings}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--ink2)]">
                  <MapPin className="w-3.5 h-3.5 text-[var(--muted)] flex-none" />
                  <span className="truncate">{clinic.location}</span>
                </div>

                {clinic.urgentAlert && (
                  <div className="p-2.5 rounded-lg bg-[var(--amber-soft)] border border-[var(--amber)]/30 text-[11.5px] text-[var(--ink)] flex items-start gap-1.5 mt-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[var(--amber)] flex-none mt-0.5" />
                    <span>{clinic.urgentAlert}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunchAiNotice(clinic);
                    }}
                    className="w-full btn sm border border-[var(--sep)] bg-[var(--card)] hover:border-[var(--red)] flex items-center justify-center gap-1.5 text-[11.5px]"
                  >
                    <Sparkles className="w-3 h-3 text-[var(--red)]" />
                    <span>Draft WhatsApp & Social Notice</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Patient Notice Generator Modal */}
      {showAiNoticeModal && (
        <div className="scrim center" onClick={() => setShowAiNoticeModal(false)}>
          <div
            className="modal max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mhead flex items-center justify-between border-b border-[var(--sep2)] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--red)]" />
                <div>
                  <h2 className="text-lg font-bold">Gemini Medical Camp Notice Writer</h2>
                  <p className="text-[12px] text-[var(--muted)]">
                    Creates clear Urdu & English notices for patients, WhatsApp broadcasts, and clinic boards
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAiNoticeModal(false)}
                className="iconbtn"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[var(--card2)] rounded-xl border border-[var(--sep2)] space-y-2 text-[12.5px]">
              <div className="flex justify-between font-semibold">
                <span>Selected Clinic: {selectedClinic.name}</span>
                <span className="text-[var(--green)]">Free Token Service</span>
              </div>
              <div className="text-[var(--muted)]">
                Timings: {selectedClinic.timings} ({selectedClinic.days})
              </div>
              <div className="text-[var(--muted)]">
                Location: {selectedClinic.location}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAiNoticeModal(false)}
                className="btn"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateNotice}
                disabled={isGeneratingNotice}
                className="btn primary flex items-center gap-1.5"
              >
                {isGeneratingNotice ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Drafting Patient Notices...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Bilingual Notice</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated output */}
            {noticeResult && (
              <div className="space-y-4 pt-3 border-t border-[var(--sep2)]">
                {/* Urdu Notice */}
                <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--sep)] space-y-2">
                  <div className="flex items-center justify-between text-[11.5px] font-semibold text-[var(--muted)]">
                    <span>اردو نوٹس (WhatsApp اور بینر کے لیے)</span>
                    <button
                      onClick={() => handleCopy(noticeResult.urduNotice, 'Urdu Notice')}
                      className="btn sm flex items-center gap-1"
                    >
                      {copiedType === 'Urdu Notice' ? <Check className="w-3 h-3 text-[var(--green)]" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Urdu</span>
                    </button>
                  </div>
                  <p className="urdu text-[15px] leading-loose text-[var(--ink)] whitespace-pre-wrap select-text">
                    {noticeResult.urduNotice}
                  </p>
                </div>

                {/* English Notice */}
                <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--sep)] space-y-2">
                  <div className="flex items-center justify-between text-[11.5px] font-semibold text-[var(--muted)]">
                    <span>English Notice & Social Caption</span>
                    <button
                      onClick={() => handleCopy(noticeResult.englishNotice, 'English Notice')}
                      className="btn sm flex items-center gap-1"
                    >
                      {copiedType === 'English Notice' ? <Check className="w-3 h-3 text-[var(--green)]" /> : <Copy className="w-3 h-3" />}
                      <span>Copy English</span>
                    </button>
                  </div>
                  <p className="text-[13px] leading-relaxed text-[var(--ink)] whitespace-pre-wrap select-text">
                    {noticeResult.englishNotice}
                  </p>
                </div>

                {/* Instructions */}
                {noticeResult.bulletPoints && (
                  <div className="p-3 bg-[var(--card2)] rounded-xl border border-[var(--sep2)] text-[12px] space-y-1">
                    <span className="font-semibold text-[var(--muted)] uppercase tracking-wider text-[10.5px]">
                      Patient Guidelines:
                    </span>
                    <ul className="list-disc pl-5 space-y-0.5 text-[var(--ink)]">
                      {noticeResult.bulletPoints.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
