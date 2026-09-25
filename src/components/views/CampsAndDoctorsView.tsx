import React, { useState } from 'react';
import {
  Stethoscope,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  Phone,
  Globe,
  Share2,
  HeartHandshake,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import {
  OFFICIAL_DOCTORS,
  OFFICIAL_MEDICAL_CAMPS,
  CONSOLIDATED_CAMP_STATS,
  BRAND_KIT,
  Doctor,
  FreeMedicalCamp,
} from '../../data/seedData';

interface CampsAndDoctorsViewProps {
  onGeneratePostForDoctor: (doc: Doctor) => void;
  onGeneratePostForCamp: (camp: FreeMedicalCamp) => void;
  onNotify: (msg: string) => void;
}

export const CampsAndDoctorsView: React.FC<CampsAndDoctorsViewProps> = ({
  onGeneratePostForDoctor,
  onGeneratePostForCamp,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<'doctors' | 'camps' | 'center'>('doctors');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedCampCode, setSelectedCampCode] = useState<string>('all');

  const specialties = ['all', ...Array.from(new Set(OFFICIAL_DOCTORS.map((d) => d.specialty)))];

  const filteredDoctors = OFFICIAL_DOCTORS.filter((d) =>
    selectedSpecialty === 'all' ? true : d.specialty === selectedSpecialty
  );

  const filteredCamps = OFFICIAL_MEDICAL_CAMPS.filter((c) =>
    selectedCampCode === 'all' ? true : c.campCode === selectedCampCode
  );

  return (
    <div className="view space-y-6">
      {/* Head */}
      <div className="head">
        <div>
          <span className="eyebrow">Institutional Medical Operations Database</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5">
            <Stethoscope className="w-7 h-7 text-[var(--red)]" />
            <span>Doctors Schedule & Medical Camps Roster</span>
          </h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Verified institutional data for Khidmat-e-Alam Medical Center (15 OPD doctors, 24/7 Urgent Care) and 2026 Consolidated Free Medical Camps (2,318 patients across Thatta, Hub Balochistan, Purana Golimar, and Baldiya Town).
          </p>
        </div>

        <div className="seg">
          <button
            onClick={() => setActiveTab('doctors')}
            aria-pressed={activeTab === 'doctors'}
          >
            15 Specialist Doctors ({OFFICIAL_DOCTORS.length})
          </button>
          <button
            onClick={() => setActiveTab('camps')}
            aria-pressed={activeTab === 'camps'}
          >
            5 Free Medical Camps (2026)
          </button>
          <button
            onClick={() => setActiveTab('center')}
            aria-pressed={activeTab === 'center'}
          >
            Medical Center Facility & UAN
          </button>
        </div>
      </div>

      {/* TAB 1: 15 DOCTORS OPD SCHEDULE (From user image) */}
      {activeTab === 'doctors' && (
        <div className="space-y-4">
          <div className="card p-4 flex flex-wrap items-center justify-between gap-3 text-[12.5px]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[var(--ink)]">Filter by Specialty:</span>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="bg-[var(--card2)] border border-[var(--sep)] rounded-lg px-2.5 py-1 text-[12px]"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s === 'all' ? 'All Specialties' : s}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[12px] text-[var(--muted)]">
              Showing {filteredDoctors.length} doctors at 351, Usmania Society, Nazimabad Karachi
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className={`card p-4 space-y-3 flex flex-col justify-between hover:border-[var(--sep)] transition-all ${
                  doc.isUrgentCare ? 'border-l-4 border-l-[var(--red)]' : ''
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[15px] text-[var(--ink)]">{doc.name}</h3>
                      <span className="text-[11.5px] font-semibold text-[var(--green)]">
                        {doc.specialty}
                      </span>
                    </div>
                    <span className="font-mono text-[12px] font-bold text-[var(--red)] bg-[var(--red-soft)] px-2 py-0.5 rounded">
                      {doc.consultationFee}
                    </span>
                  </div>

                  <div className="space-y-1 text-[12px] text-[var(--ink2)] bg-[var(--card2)] p-2.5 rounded-xl border border-[var(--sep2)]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--muted)] flex-none" />
                      <span>{doc.opdDays}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--muted)] flex-none" />
                      <span className="font-semibold text-[var(--ink)]">{doc.opdTimings}</span>
                    </div>
                  </div>

                  <div className="text-[11.5px] text-[var(--muted)] flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-none" />
                    <span className="truncate">{doc.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--sep2)] flex justify-between items-center">
                  <span className="text-[11px] font-mono text-[var(--muted)]">
                    UAN: 1111528
                  </span>
                  <button
                    onClick={() => {
                      onGeneratePostForDoctor(doc);
                      onNotify(`Formulated creative brief for ${doc.name}`);
                    }}
                    className="btn sm green text-white flex items-center gap-1 text-[11.5px]"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Generate Post</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 5 FREE MEDICAL CAMPS (From 2026 PDF Report) */}
      {activeTab === 'camps' && (
        <div className="space-y-6">
          {/* Executive KPI Banner */}
          <div className="card p-5 bg-gradient-to-r from-[var(--card)] via-[var(--card2)] to-[var(--card)] border border-[var(--sep)]">
            <h3 className="font-bold text-[14px] uppercase tracking-wider text-[var(--muted)] mb-3">
              Consolidated 2026 Free Medical Camps Programme Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
              <div className="p-2.5 bg-[var(--card)] rounded-xl border border-[var(--sep2)]">
                <span className="text-[11px] text-[var(--muted)] block">Total Camps</span>
                <span className="text-xl font-bold font-mono text-[var(--ink)]">{CONSOLIDATED_CAMP_STATS.totalCamps}</span>
              </div>
              <div className="p-2.5 bg-[var(--card)] rounded-xl border border-[var(--sep2)]">
                <span className="text-[11px] text-[var(--muted)] block">Patients Served</span>
                <span className="text-xl font-bold font-mono text-[var(--red)]">{CONSOLIDATED_CAMP_STATS.totalPatientsServed.toLocaleString()}</span>
              </div>
              <div className="p-2.5 bg-[var(--card)] rounded-xl border border-[var(--sep2)]">
                <span className="text-[11px] text-[var(--muted)] block">Total Budget (PKR)</span>
                <span className="text-xl font-bold font-mono text-[var(--ink)]">2.03M</span>
              </div>
              <div className="p-2.5 bg-[var(--card)] rounded-xl border border-[var(--sep2)]">
                <span className="text-[11px] text-[var(--muted)] block">Zakat Fund (75%)</span>
                <span className="text-xl font-bold font-mono text-[var(--green)]">PKR 1.52M</span>
              </div>
              <div className="p-2.5 bg-[var(--card)] rounded-xl border border-[var(--sep2)]">
                <span className="text-[11px] text-[var(--muted)] block">Medicine Units</span>
                <span className="text-xl font-bold font-mono text-[var(--ink)]">{CONSOLIDATED_CAMP_STATS.totalMedicineUnitsDistributed.toLocaleString()}</span>
              </div>
              <div className="p-2.5 bg-[var(--card)] rounded-xl border border-[var(--sep2)]">
                <span className="text-[11px] text-[var(--muted)] block">Doctors Mobilized</span>
                <span className="text-xl font-bold font-mono text-[var(--blue)]">{CONSOLIDATED_CAMP_STATS.doctorsMobilized}</span>
              </div>
              <div className="p-2.5 bg-[var(--card)] rounded-xl border border-[var(--sep2)]">
                <span className="text-[11px] text-[var(--muted)] block">Volunteers</span>
                <span className="text-xl font-bold font-mono text-[var(--amber)]">{CONSOLIDATED_CAMP_STATS.volunteersMobilized}</span>
              </div>
            </div>
          </div>

          {/* Individual Camp Cards */}
          <div className="space-y-4">
            {OFFICIAL_MEDICAL_CAMPS.map((camp) => (
              <div key={camp.campCode} className="card p-5 space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-2 border-b border-[var(--sep2)] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="chip primary font-mono font-bold">{camp.campCode}</span>
                      <h3 className="font-bold text-[17px] text-[var(--ink)]">{camp.name}</h3>
                    </div>
                    <div className="text-[12px] text-[var(--muted)] mt-1 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--red)]" />
                        <b>{camp.location}</b> ({camp.address})
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {camp.date}
                      </span>
                      <span>·</span>
                      <span>Project Lead: <b>{camp.organizer}</b></span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onGeneratePostForCamp(camp);
                      onNotify(`Created transparency post brief for ${camp.name}`);
                    }}
                    className="btn sm green text-white flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Camp Story</span>
                  </button>
                </div>

                {/* Patient Demographic Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-center text-[12px]">
                  <div className="p-2 bg-[var(--card2)] rounded-lg">
                    <span className="text-[10.5px] text-[var(--muted)] uppercase block">Total Patients</span>
                    <b className="text-[14px] text-[var(--ink)] font-mono">{camp.patientsServed}</b>
                  </div>
                  <div className="p-2 bg-[var(--card2)] rounded-lg">
                    <span className="text-[10.5px] text-[var(--muted)] uppercase block">Children (&lt;12)</span>
                    <b className="text-[14px] text-[var(--blue)] font-mono">{camp.demographics.children}</b>
                  </div>
                  <div className="p-2 bg-[var(--card2)] rounded-lg">
                    <span className="text-[10.5px] text-[var(--muted)] uppercase block">Female Patients</span>
                    <b className="text-[14px] text-[var(--ink)] font-mono">{camp.demographics.female}</b>
                  </div>
                  <div className="p-2 bg-[var(--card2)] rounded-lg">
                    <span className="text-[10.5px] text-[var(--muted)] uppercase block">Elderly (60+)</span>
                    <b className="text-[14px] text-[var(--amber)] font-mono">{camp.demographics.elderly}</b>
                  </div>
                  <div className="p-2 bg-[var(--card2)] rounded-lg">
                    <span className="text-[10.5px] text-[var(--muted)] uppercase block">Zakat Fund</span>
                    <b className="text-[14px] text-[var(--green)] font-mono">
                      PKR {(camp.financials.zakatFund / 1000).toFixed(0)}k ({camp.financials.zakatPct}%)
                    </b>
                  </div>
                  <div className="p-2 bg-[var(--card2)] rounded-lg">
                    <span className="text-[10.5px] text-[var(--muted)] uppercase block">Cost / Patient</span>
                    <b className="text-[14px] text-[var(--red)] font-mono">PKR {camp.financials.costPerPatient}</b>
                  </div>
                </div>

                {/* Disease Profile and Clinical notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px]">
                  <div className="p-3 bg-[var(--card2)] rounded-xl border border-[var(--sep2)] space-y-1.5">
                    <span className="font-bold text-[var(--ink)] block">Top Clinical Diagnoses:</span>
                    <div className="space-y-1">
                      {camp.topDiseases.map((d, i) => (
                        <div key={i} className="flex justify-between items-center text-[11.5px]">
                          <span className="text-[var(--ink2)]">{d.condition}</span>
                          <span className="font-mono font-semibold text-[var(--muted)]">{d.sharePct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[var(--card2)] rounded-xl border border-[var(--sep2)] space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-[var(--ink)] block">Field Operations & Zakat Note:</span>
                      <p className="text-[11.5px] text-[var(--ink2)] leading-relaxed italic mt-1">
                        "{camp.notes}"
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[var(--sep2)] text-[11px] text-[var(--green)] font-medium">
                      ✓ 100% Segregated Medicine Ledger Audited
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MEDICAL CENTER FACILITY & CHANNELS */}
      {activeTab === 'center' && (
        <div className="space-y-6">
          <div className="card p-6 space-y-5">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <span className="eyebrow">Main Outpatient Healthcare Complex</span>
                <h2 className="text-xl font-bold text-[var(--ink)]">{BRAND_KIT.medicalCenterName}</h2>
                <p className="text-[13px] text-[var(--ink2)] mt-1">
                  Specialist Outpatient Clinics, 24/7 Urgent Care, Ultrasound Diagnostic Sonography, and Free Medicine Waqf.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={BRAND_KIT.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary flex items-center gap-1.5 text-[12px]"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
              <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block">Physical Address</span>
                <div className="font-bold text-[var(--ink)]">{BRAND_KIT.address}</div>
                <div className="text-[11.5px] text-[var(--muted)]">Accessible from Liaquatabad, Golimar, and North Nazimabad</div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block">Unified Helpline</span>
                <div className="font-extrabold text-[18px] text-[var(--red)] font-mono">{BRAND_KIT.uan}</div>
                <div className="text-[11.5px] text-[var(--muted)]">24/7 Token Desks & Urgent Care Admissions</div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block">Lead Project Director</span>
                <div className="font-bold text-[var(--ink)]">Waqar Ahmed</div>
                <div className="text-[11.5px] text-[var(--green)] font-medium">Khidmat-e-Alam Welfare Trust</div>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-4 border-t border-[var(--sep2)] space-y-3">
              <h3 className="font-bold text-[14px] text-[var(--ink)]">
                Official Connected Social Media Channels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-[12px]">
                <a
                  href={BRAND_KIT.socialMedia.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-between text-[#1877F2] font-semibold hover:bg-[#1877F2]/15 transition-all"
                >
                  <span>Facebook Page</span>
                  <Share2 className="w-3.5 h-3.5" />
                </a>

                <a
                  href={BRAND_KIT.socialMedia.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#D62F6E]/10 border border-[#D62F6E]/20 flex items-center justify-between text-[#D62F6E] font-semibold hover:bg-[#D62F6E]/15 transition-all"
                >
                  <span>Instagram</span>
                  <Share2 className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://${BRAND_KIT.socialMedia.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-between text-[#0A66C2] font-semibold hover:bg-[#0A66C2]/15 transition-all"
                >
                  <span>LinkedIn Trust</span>
                  <Share2 className="w-3.5 h-3.5" />
                </a>

                <a
                  href={BRAND_KIT.socialMedia.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#E4120A]/10 border border-[#E4120A]/20 flex items-center justify-between text-[#E4120A] font-semibold hover:bg-[#E4120A]/15 transition-all"
                >
                  <span>YouTube Channel</span>
                  <Share2 className="w-3.5 h-3.5" />
                </a>

                <a
                  href={BRAND_KIT.socialMedia.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep)] flex items-center justify-between text-[var(--ink)] font-semibold hover:bg-[var(--card)] transition-all"
                >
                  <span>TikTok Channel</span>
                  <Share2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
