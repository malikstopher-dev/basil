import React, { useState } from 'react';
import { BILLIARD_TABLES } from '../data/billiardsData';
import { BilliardTable } from '../types';
import { Playable3DTable } from './Playable3DTable';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, CheckCircle2, ChevronRight, Sparkles, Shield, Info, Layers, Wrench, Droplets, Wind, CircleDot, ShieldCheck, Thermometer, Award, Gauge, BarChart3, Activity, Compass, Sliders, X, Check, ExternalLink } from 'lucide-react';

interface TableShowcaseProps {
  onSelectTableForBooking: (tableId: string) => void;
}

// Pro Care Maintenance Tips Data
const PRO_CARE_TIPS = [
  {
    id: 1,
    title: 'Avoid Humidity & Direct Sunlight',
    tag: 'Climate Control',
    icon: Droplets,
    shortTip: 'Keep ambient humidity strictly between 45–55%.',
    description: 'Direct sunlight and humidity variations warp hardwood rails, degrade rubber cushion elasticity, and slow down cloth speed. BSS lounges use precision HVAC climate locks.',
    bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'Professional Directional Brushing',
    tag: 'Velvet Nap Care',
    icon: Wind,
    shortTip: 'Brush straight along the nap, baulk to foot spot.',
    description: 'Use a genuine horsehair brush in single straight strokes from the head to foot of the table. Never brush in circular motions, as this disturbs the wool fiber direction.',
    bgImage: 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'Aramith Phenolic Ball Polishing',
    tag: 'Surface Protection',
    icon: CircleDot,
    shortTip: 'Microfiber wipe after every match session.',
    description: 'Chalk residue acts like sandpaper on velvet cloth under friction speeds over 30 km/h. Regular phenolic polishing prevents burn marks and prolongs felt longevity.',
    bgImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    title: 'Bi-Annual Slate Leveling Calibration',
    tag: 'Structural Integrity',
    icon: Wrench,
    shortTip: '0.01mm laser leveling across three-piece slate.',
    description: 'Chassis bolts are torque-checked every 6 months with micro-meter leveling to ensure true zero-bias roll across the entire 45mm Italian slate surface.',
    bgImage: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 5,
    title: 'Cue Shaft & Tip Conditioning',
    tag: 'Equipment Care',
    icon: Award,
    shortTip: 'Beeswax sealing for ash and maple cues.',
    description: 'Regularly burnish cue shafts with specialized leather buffers and beeswax to prevent moisture ingress, sticky residue, and tip mushrooming.',
    bgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 6,
    title: 'Fitted Breathable Covers',
    tag: 'Dust Mitigation',
    icon: ShieldCheck,
    shortTip: 'Cover tables during all off-peak hours.',
    description: 'Deploy fitted heavy-gauge leatherette covers when table lighting canopy is powered off to shield the wool surface from airborne dust and ambient light.',
    bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600'
  },
];

export const TableShowcase: React.FC<TableShowcaseProps> = ({ onSelectTableForBooking }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'championship' | 'english' | 'vip' | 'patio'>('all');
  const [selectedTableModal, setSelectedTableModal] = useState<BilliardTable | null>(null);
  const [selectedStatsTableModal, setSelectedStatsTableModal] = useState<BilliardTable | null>(null);

  const filteredTables = activeTab === 'all'
    ? BILLIARD_TABLES
    : BILLIARD_TABLES.filter(t => t.category === activeTab);

  return (
    <section id="tables" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-[1px] bg-[#b29762]"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
                Tournament & Lounge Specs
              </span>
            </div>

            <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
              Premium Billiards <span className="italic text-[#b29762]">Tables</span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base">
              Hand-selected imported slate, Hainsworth Match wool, and shadowless LED perimeter illumination. Each table delivers consistent roll speed and unmatched responsiveness.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#121212] border border-white/10">
            {[
              { id: 'all', label: 'All Tables' },
              { id: 'championship', label: 'Championship 9ft' },
              { id: 'vip', label: 'Executive VIP' },
              { id: 'english', label: 'English 8-Ball' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#b29762] text-black shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* High-Fidelity Interactive 3D Playable Simulator */}
        <div className="mb-16">
          <Playable3DTable />
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className="group bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={table.imageUrl}
                    alt={table.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />

                  {table.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#b29762] text-black text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {table.badge}
                    </div>
                  )}

                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#0a0a0a] border border-[#b29762] text-[#b29762] text-[11px] font-mono font-bold shadow-lg">
                    {table.hourlyRate}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif italic text-2xl font-normal text-white drop-shadow-md">
                      {table.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body & Specs */}
                <div className="p-6 space-y-4">
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    {table.description}
                  </p>

                  {/* Gold-Accented Technical Specs Strip */}
                  <div className="p-3.5 bg-[#0a0a0a] border border-[#b29762]/40 relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#b29762] flex items-center space-x-1">
                        <Gauge className="w-3 h-3 text-[#b29762]" />
                        <span>Professional Table Metrics</span>
                      </span>
                      <button
                        onClick={() => setSelectedStatsTableModal(table)}
                        className="text-[9px] uppercase tracking-widest font-bold text-white/70 hover:text-[#b29762] transition-colors flex items-center space-x-1"
                      >
                        <span>Full Overlay Specs</span>
                        <ChevronRight className="w-3 h-3 text-[#b29762]" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
                      <div className="bg-[#141414] p-2 border border-white/10">
                        <span className="text-white/40 block text-[8px] uppercase font-bold tracking-wider">Slate</span>
                        <span className="text-white font-bold text-xs">{table.slateThickness.split(' ')[0]}</span>
                      </div>
                      <div className="bg-[#141414] p-2 border border-white/10">
                        <span className="text-white/40 block text-[8px] uppercase font-bold tracking-wider">Cloth Grade</span>
                        <span className="text-[#b29762] font-bold text-[10px] truncate block">
                          {table.stats?.clothGrade ? table.stats.clothGrade.split(' ')[0] : 'Match Wool'}
                        </span>
                      </div>
                      <div className="bg-[#141414] p-2 border border-white/10">
                        <span className="text-white/40 block text-[8px] uppercase font-bold tracking-wider">Cushion Bounce</span>
                        <span className="text-emerald-400 font-bold text-xs">
                          {table.stats?.cushionBounceRating ? table.stats.cushionBounceRating.split(' ')[0] : '9.9/10'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Standard Amenities List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-[#b29762] uppercase tracking-widest block">Included Privileges</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {table.features.map((feat, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-white/70">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#b29762] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onSelectTableForBooking(table.id)}
                  className="w-full sm:flex-1 py-3 px-4 bg-[#b29762] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table</span>
                </button>

                <button
                  onClick={() => setSelectedStatsTableModal(table)}
                  className="w-full sm:w-auto py-3 px-4 bg-[#141414] border border-[#b29762]/60 text-[#b29762] hover:bg-[#b29762] hover:text-black text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <Gauge className="w-4 h-4" />
                  <span>Table Statistics</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Care & Maintenance Tips Section */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-[1px] bg-[#b29762]" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
                  Table Preservation Protocol
                </span>
              </div>

              <h3 className="font-serif font-light text-2xl sm:text-4xl text-white tracking-tight">
                BSS Pro Care & <span className="italic text-[#b29762]">Velvet Maintenance</span>
              </h3>

              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                Every table in Sandton's premier billiards lounge is calibrated to tournament standards. Our technicians follow strict daily care protocols to preserve optimal velocity, velvet nap, and slate levelling.
              </p>
            </div>

            <div className="hidden sm:flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-white/40 bg-[#121212] px-4 py-2 border border-white/10">
              <Shield className="w-3.5 h-3.5 text-[#b29762]" />
              <span>Championship Care Standard</span>
            </div>
          </div>

          {/* Grid of Pro Care Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRO_CARE_TIPS.map((tip, idx) => {
              const IconComponent = tip.icon;
              return (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                  className="bg-[#121212] border border-white/10 hover:border-[#b29762]/50 p-6 space-y-4 transition-all group shadow-xl flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Card Background Picture Overlay */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                      src={tip.bgImage}
                      alt={tip.title}
                      className="w-full h-full object-cover opacity-15 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 filter brightness-75 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/85 to-[#121212]/95" />
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#b29762]/40 text-[#b29762] group-hover:bg-[#b29762] group-hover:text-black transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-bold font-mono text-[#b29762] bg-black/40 px-2 py-0.5 border border-white/10">
                        {tip.tag}
                      </span>
                    </div>

                    <h4 className="font-serif italic text-lg font-normal text-white group-hover:text-[#b29762] transition-colors">
                      {tip.title}
                    </h4>

                    <div className="p-2.5 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 text-[11px] font-medium text-[#b29762]">
                      <span className="text-white/40 text-[9px] block uppercase tracking-wider mb-0.5 font-sans">Quick Rule</span>
                      "{tip.shortTip}"
                    </div>

                    <p className="text-white/70 text-xs leading-relaxed">
                      {tip.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center space-x-2 text-[9px] uppercase tracking-widest text-white/50 relative z-10">
                    <CheckCircle2 className="w-3 h-3 text-[#b29762]" />
                    <span>Verified Lounge Standard</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Care Commitment Footer */}
          <div className="mt-10 p-4 bg-[#121212] border border-[#b29762]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-4 h-4 text-[#b29762] shrink-0" />
              <span className="text-white/80">
                Notice table drag or cushion drift during play? Notify our floor steward for immediate cue ball polishing or iron leveling.
              </span>
            </div>
            <button
              onClick={() => onSelectTableForBooking('t1')}
              className="px-4 py-2 bg-[#b29762] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shrink-0"
            >
              Reserve Refined Table
            </button>
          </div>
        </div>
      </div>

      {/* Gold-Outlined 'Table Statistics' Overlay Info Panel */}
      <AnimatePresence>
        {selectedStatsTableModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-[#090909] border-2 border-[#b29762] shadow-[0_0_60px_rgba(178,151,98,0.35)] p-6 sm:p-8 space-y-6 my-auto"
            >
              {/* Gold Top Accent Beam */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b29762] to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedStatsTableModal(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-black/60 border border-white/15 hover:border-[#b29762] transition-colors"
                title="Close overlay"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Title Section */}
              <div className="space-y-1 pr-10">
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#b29762]">
                  <Gauge className="w-4 h-4 text-[#b29762]" />
                  <span>Technical Specifications & Performance Metrics</span>
                </div>
                <h3 className="font-serif italic text-2xl sm:text-4xl text-white font-normal">
                  {selectedStatsTableModal.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 bg-[#b29762]/20 border border-[#b29762]/50 text-[#b29762] text-[9px] font-bold uppercase tracking-widest">
                    {selectedStatsTableModal.category.toUpperCase()} CATEGORY
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#141414] border border-white/15 text-white/80 text-[10px] font-mono font-bold">
                    {selectedStatsTableModal.hourlyRate}
                  </span>
                </div>
              </div>

              {/* In-Overlay Table Comparison Selector */}
              <div className="p-2 bg-[#121212] border border-white/10 flex flex-wrap gap-1.5 items-center">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 px-2 font-bold">
                  Compare Table:
                </span>
                {BILLIARD_TABLES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedStatsTableModal(t)}
                    className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider transition-all ${
                      selectedStatsTableModal.id === t.id
                        ? 'bg-[#b29762] text-black font-extrabold shadow-md'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {t.name.split(' ')[1]} {t.name.split(' ')[2] || ''}
                  </button>
                ))}
              </div>

              {/* Primary 4 Metric Gauges (Gold Outlined Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Slate Thickness */}
                <div className="p-4 bg-[#121212] border border-[#b29762]/40 relative space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/50">
                      Slate Thickness
                    </span>
                    <Layers className="w-4 h-4 text-[#b29762]" />
                  </div>
                  <div className="text-xl font-bold font-serif text-[#b29762]">
                    {selectedStatsTableModal.slateThickness.split(' ')[0]}
                  </div>
                  <p className="text-[10px] text-white/70 leading-tight">
                    {selectedStatsTableModal.stats?.slateThickness || selectedStatsTableModal.slateThickness}
                  </p>
                  <div className="pt-2">
                    <div className="h-1.5 bg-white/10 w-full rounded-none overflow-hidden">
                      <div className="h-full bg-[#b29762] w-[95%]" />
                    </div>
                    <span className="text-[8px] font-mono text-white/40 block mt-1">
                      Zero-Bias Level Tolerances
                    </span>
                  </div>
                </div>

                {/* 2. Cloth Grade */}
                <div className="p-4 bg-[#121212] border border-[#b29762]/40 relative space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/50">
                      Cloth Grade
                    </span>
                    <Sparkles className="w-4 h-4 text-[#b29762]" />
                  </div>
                  <div className="text-base font-bold font-serif text-white truncate">
                    {selectedStatsTableModal.stats?.clothGrade.split(' ')[0] || 'Hainsworth'}
                  </div>
                  <p className="text-[10px] text-white/70 leading-tight">
                    {selectedStatsTableModal.stats?.clothGrade || selectedStatsTableModal.clothColor}
                  </p>
                  <div className="pt-2">
                    <div className="h-1.5 bg-white/10 w-full rounded-none overflow-hidden">
                      <div className="h-full bg-amber-400 w-[92%]" />
                    </div>
                    <span className="text-[8px] font-mono text-[#b29762] block mt-1 font-bold">
                      {selectedStatsTableModal.stats?.clothVelocityRating || '28.4 km/h Roll Speed'}
                    </span>
                  </div>
                </div>

                {/* 3. Cushion Bounce Rating */}
                <div className="p-4 bg-[#121212] border border-[#b29762]/40 relative space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/50">
                      Cushion Bounce Rating
                    </span>
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl font-bold font-serif text-emerald-400">
                    {selectedStatsTableModal.stats?.cushionBounceRating.split(' ')[0] || '9.9/10'}
                  </div>
                  <p className="text-[10px] text-white/70 leading-tight">
                    {selectedStatsTableModal.stats?.cushionBounceRating || 'Northern K66 Rubber'}
                  </p>
                  <div className="pt-2">
                    <div className="h-1.5 bg-white/10 w-full rounded-none overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[98%]" />
                    </div>
                    <span className="text-[8px] font-mono text-emerald-400/80 block mt-1 font-bold">
                      Match Rebound Elasticity
                    </span>
                  </div>
                </div>

                {/* 4. Leveling Precision */}
                <div className="p-4 bg-[#121212] border border-[#b29762]/40 relative space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/50">
                      Leveling Precision
                    </span>
                    <Wrench className="w-4 h-4 text-[#b29762]" />
                  </div>
                  <div className="text-base font-bold font-serif text-white">
                    {selectedStatsTableModal.stats?.levelingPrecision.split(' ')[0] || '±0.01mm'}
                  </div>
                  <p className="text-[10px] text-white/70 leading-tight">
                    {selectedStatsTableModal.stats?.levelingPrecision || 'Micro-Metric Chassis'}
                  </p>
                  <div className="pt-2">
                    <div className="h-1.5 bg-white/10 w-full rounded-none overflow-hidden">
                      <div className="h-full bg-[#b29762] w-[99%]" />
                    </div>
                    <span className="text-[8px] font-mono text-white/40 block mt-1">
                      Laser Leveling Certification
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Spec Matrix Grid */}
              <div className="p-5 bg-[#0a0a0a] border border-white/10 space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#b29762] block border-b border-white/10 pb-2">
                  Complete Technical Spec Matrix
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-start justify-between p-2.5 bg-[#121212] border border-white/10">
                    <span className="text-white/40 uppercase text-[9px] font-bold">Field Dimensions:</span>
                    <span className="text-white font-mono font-medium">{selectedStatsTableModal.stats?.tableDimensions || '9ft x 4.5ft'}</span>
                  </div>
                  <div className="flex items-start justify-between p-2.5 bg-[#121212] border border-white/10">
                    <span className="text-white/40 uppercase text-[9px] font-bold">Pocket Specification:</span>
                    <span className="text-[#b29762] font-mono font-medium">{selectedStatsTableModal.stats?.pocketSpecs || '118mm Drop Pocket'}</span>
                  </div>
                  <div className="flex items-start justify-between p-2.5 bg-[#121212] border border-white/10">
                    <span className="text-white/40 uppercase text-[9px] font-bold">Chassis Frame Construction:</span>
                    <span className="text-white text-right max-w-[220px] font-medium">{selectedStatsTableModal.stats?.chassisFrame || 'Solid African Mahogany'}</span>
                  </div>
                  <div className="flex items-start justify-between p-2.5 bg-[#121212] border border-white/10">
                    <span className="text-white/40 uppercase text-[9px] font-bold">Lighting Specification:</span>
                    <span className="text-[#b29762] text-right max-w-[220px] font-medium">{selectedStatsTableModal.lighting}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
                <div className="text-[10px] text-white/50 font-mono">
                  All metrics verified by BSS Certified Master Technicians
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const element = document.getElementById('simulator');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                      setSelectedStatsTableModal(null);
                    }}
                    type="button"
                    className="flex-1 sm:flex-none px-5 py-3 bg-[#181818] border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:border-[#b29762] transition-all flex items-center justify-center space-x-2"
                  >
                    <Compass className="w-4 h-4 text-[#b29762]" />
                    <span>Launch 3D Simulator</span>
                  </button>

                  <button
                    onClick={() => {
                      const tableId = selectedStatsTableModal.id;
                      setSelectedStatsTableModal(null);
                      onSelectTableForBooking(tableId);
                    }}
                    type="button"
                    className="flex-1 sm:flex-none px-6 py-3 bg-[#b29762] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve {selectedStatsTableModal.name.split(' ')[1]} Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Standard Detail Modal */}
      {selectedTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0a0a0a] border border-[#b29762]/40 max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#b29762]">Table Specifications</span>
                <h3 className="font-serif italic text-2xl font-normal text-white mt-1">
                  {selectedTableModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTableModal(null)}
                className="text-white/60 hover:text-white p-1 border border-white/20"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedTableModal.imageUrl}
              alt={selectedTableModal.name}
              className="w-full h-48 object-cover border border-white/10"
            />

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              {selectedTableModal.description}
            </p>

            <div className="space-y-2 text-xs text-white/80 bg-[#121212] p-4 border border-white/10">
              <div className="flex justify-between"><span className="text-white/40 uppercase text-[10px]">Rate:</span> <strong className="text-[#b29762]">{selectedTableModal.hourlyRate}</strong></div>
              <div className="flex justify-between"><span className="text-white/40 uppercase text-[10px]">Slate:</span> <span>{selectedTableModal.slateThickness}</span></div>
              <div className="flex justify-between"><span className="text-white/40 uppercase text-[10px]">Cloth:</span> <span>{selectedTableModal.clothColor}</span></div>
              <div className="flex justify-between"><span className="text-white/40 uppercase text-[10px]">Lighting:</span> <span>{selectedTableModal.lighting}</span></div>
              {selectedTableModal.minSpend && (
                <div className="flex justify-between text-[#b29762]"><span className="text-white/40 uppercase text-[10px]">Min Spend:</span> <span>{selectedTableModal.minSpend}</span></div>
              )}
            </div>

            <button
              onClick={() => {
                const id = selectedTableModal.id;
                setSelectedTableModal(null);
                onSelectTableForBooking(id);
              }}
              className="w-full py-3.5 bg-[#b29762] text-black font-bold uppercase text-[11px] tracking-widest hover:bg-white transition-all shadow-lg"
            >
              Book This Table Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

