import React from 'react';
import { HelpCircle, Layers, Activity, ShieldCheck } from 'lucide-react';

interface Props {
  totalQuestions: number;
  totalSets: number;
  activeSessionsCount: number;
}

export const DashboardStats: React.FC<Props> = ({
  totalQuestions,
  totalSets,
  activeSessionsCount,
}) => {
  const stats = [
    {
      label: 'Question Archive',
      value: totalQuestions,
      subtext: '4 Syllabus Sections',
      icon: HelpCircle,
    },
    {
      label: 'Curated Sets',
      value: totalSets,
      subtext: '30 Qs per Set (10E · 10M · 10H)',
      icon: Layers,
    },
    {
      label: 'Active Rooms',
      value: activeSessionsCount,
      subtext: activeSessionsCount > 0 ? 'Live in Progress' : 'No active sessions',
      icon: Activity,
    },
    {
      label: 'Protocol Benchmark',
      value: '20s / Q',
      subtext: 'Integrity Check & Calibration',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="p-5 rounded-lg bg-white border border-[#E8E4DF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
                {stat.label}
              </span>
              <div className="p-1.5 rounded-md bg-[#F5F3F0] text-[#B8860B]">
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
                {stat.value}
              </div>
              <span className="text-[11px] text-[#6B6B6B] mt-1 block font-sans">
                {stat.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
